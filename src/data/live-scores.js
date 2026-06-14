import { ESPN_INDEX_API, LIVE_POLL_MS } from '../config/api.js';
import { STATUS_LIVE, STATUS_FINISHED } from '../config/constants.js';
import { t } from '../config/strings.js';
import * as state from '../state.js';

// ── Live Score Polling ─────────────────────────────────────────
// This module handles the global live-score polling loop.
// Feature-level functions (buildMatchCard, loadTimeline, stopLiveDetailPoller)
// are injected via `initLiveScores()` to avoid circular imports.

let _buildMatchCard = null;
let _loadTimeline = null;
let _stopLiveDetailPoller = null;

export function initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller }) {
    _buildMatchCard = buildMatchCard;
    _loadTimeline = loadTimeline;
    _stopLiveDetailPoller = stopLiveDetailPoller;
}

export async function fetchLiveScores() {
    try {
        const res = await fetch(ESPN_INDEX_API);
        if (!res.ok) return;
        const data = await res.json();
        const events = data.events || [];

        let anyLive = false;

        for (const ev of events) {
            const comp = ev.competitions?.[0];
            if (!comp) continue;
            const status = comp.status;
            const espnState = status?.type?.state || 'pre'; // 'pre', 'in', 'post'
            const clock = status?.displayClock || '';
            const period = status?.period || 0;

            // Build score string
            const competitors = comp.competitors || [];
            const home = competitors.find(c => c.homeAway === 'home');
            const away = competitors.find(c => c.homeAway === 'away');
            const score = `${home?.score ?? 0} – ${away?.score ?? 0}`;

            // Map ESPN event back to FIFA IdMatch via fifaToEspn (reverse lookup)
            const fifaId = [...state.fifaToEspn.entries()].find(([, espnId]) => espnId === ev.id)?.[0];
            if (!fifaId) continue;

            // Format clock: show period prefix for HT / ET / penalties
            const detail = status?.type?.detail || '';
            let displayClock = clock;
            if (/half\s*time/i.test(detail) || (period === 2 && clock === '0:00')) displayClock = t('liveHT');
            else if (/full\s*time/i.test(detail)) displayClock = t('matchFT');
            else if (period === 3 || period === 4) displayClock = `${t('liveET')} ${clock}`;
            else if (period === 5) displayClock = t('livePSO');

            const startDate = ev.date || comp.date || '';
            state.espnLiveData.set(fifaId, { score, clock: displayClock, state: espnState, startDate });
            if (espnState === 'in') anyLive = true;

            const m = state.allMatches.find(m => m.IdMatch === fifaId);
            if (m) {
                if (espnState === 'in') {
                    m.MatchStatus = STATUS_LIVE;
                } else if (espnState === 'post' && m.MatchStatus === STATUS_LIVE) {
                    // Match just ended — flip back to finished and apply final score
                    m.MatchStatus = STATUS_FINISHED;
                    const [hs, as] = score.split('–').map(s => parseInt(s.trim(), 10) || 0);
                    m.HomeTeamScore = hs;
                    m.AwayTeamScore = as;
                    // Stop the live detail poller if this match is currently open
                    if (state.activeCard?.dataset?.matchId === fifaId) {
                        if (_stopLiveDetailPoller) _stopLiveDetailPoller();
                        // Re-render the detail as a finished match
                        const detailEl = state.activeCard.querySelector('.match-detail');
                        if (detailEl && _loadTimeline) _loadTimeline(m, detailEl);
                    }
                }
            }
        }

        patchLiveCards();

        // Stop polling only if nothing is live and nothing starting soon
        const anySoon = [...state.espnLiveData.values()].some(l => l.state === 'pre');
        if (!anyLive && !anySoon) stopLivePoller();

    } catch { /* non-critical */ }
}

export function patchLiveCards() {
    // Only patch while on the Matches tab — avoids touching hidden DOM
    if (state.activeTab !== 'matches') return;

    const now = Date.now();

    for (const [fifaId, live] of state.espnLiveData) {
        const card = document.querySelector(`.match-card[data-match-id="${fifaId}"]`);
        if (!card) continue;

        const m = state.allMatches.find(m => m.IdMatch === fifaId);
        if (!m) continue;

        // Pre-match: show "Starting Soon" on the clock area if within 10 min of kickoff
        if (live.state === 'pre') {
            const kickoff = live.startDate ? new Date(live.startDate).getTime() : new Date(m.Date).getTime();
            const minUntil = (kickoff - now) / 60000;
            if (minUntil <= 10 && minUntil > 0) {
                const clockEl = card.querySelector('.match-clock') || card.querySelector('.match-time');
                if (clockEl) clockEl.textContent = t('liveStartingSoon');
            }
            continue;
        }

        // Post-match: show "Match Ended" briefly
        if (live.state === 'post') {
            const cardIsLive = card.classList.contains('match-card--live');
            if (cardIsLive && _buildMatchCard) {
                const newCard = _buildMatchCard(m);
                card.replaceWith(newCard);
            } else {
                const statusEl = card.querySelector('.match-status--ft');
                if (statusEl) {
                    const kickoff = live.startDate ? new Date(live.startDate).getTime() : new Date(m.Date).getTime();
                    const endApprox = kickoff + 2 * 60 * 60 * 1000;
                    if ((now - endApprox) / 60000 <= 5) {
                        statusEl.textContent = t('liveMatchEnded');
                    }
                }
            }
            continue;
        }

        // In-progress
        if (live.state !== 'in') continue;

        const cardIsLive = card.classList.contains('match-card--live');
        const matchIsLive = m.MatchStatus === STATUS_LIVE;
        const matchIsFinished = m.MatchStatus === STATUS_FINISHED;

        if (_buildMatchCard && ((matchIsFinished && cardIsLive) || (matchIsLive && !cardIsLive))) {
            const newCard = _buildMatchCard(m);
            card.replaceWith(newCard);
            continue;
        }

        if (!cardIsLive) continue;

        // Patch score
        const scoreEl = card.querySelector(`.match-score--live[data-match-id="${fifaId}"]`);
        if (scoreEl && scoreEl.textContent !== live.score) {
            scoreEl.textContent = live.score;
            scoreEl.classList.remove('score-flash');
            void scoreEl.offsetWidth;
            scoreEl.classList.add('score-flash');
        }

        // Patch clock
        const clockEl = card.querySelector(`.match-clock[data-match-id="${fifaId}"]`);
        if (clockEl) clockEl.textContent = live.clock;
    }
}

export function startLivePoller() {
    if (state.livePoller) return; // already running
    fetchLiveScores(); // immediate first tick
    state.setLivePoller(setInterval(fetchLiveScores, LIVE_POLL_MS));
}

export function stopLivePoller() {
    if (state.livePoller) {
        clearInterval(state.livePoller);
        state.setLivePoller(null);
    }
}

export function hasLiveMatches() {
    return state.allMatches.some(m => m.MatchStatus === STATUS_LIVE);
}

export function maybeStartPoller() {
    const now = Date.now();
    const soonLive = state.allMatches.some(m => {
        if (m.MatchStatus === STATUS_LIVE) return true;
        if (m.MatchStatus === STATUS_FINISHED) return false;
        const kickoff = new Date(m.Date).getTime();
        return kickoff <= now + 2 * 60 * 60 * 1000 && kickoff >= now - 2 * 60 * 60 * 1000;
    });
    if (soonLive) startLivePoller();
}
