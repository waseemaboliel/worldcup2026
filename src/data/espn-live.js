import { ESPN_INDEX_API } from '../config/api.js';
import { fifaToEspn } from '../state.js';

// ── ESPN Live Stats (per-match, from scoreboard) ───────────────

export async function fetchEspnLiveStats(match) {
    const espnId = fifaToEspn.get(match.IdMatch);
    if (!espnId) return null;
    try {
        const res = await fetch(ESPN_INDEX_API);
        if (!res.ok) return null;
        const data = await res.json();
        const ev = (data.events || []).find(e => e.id === espnId);
        if (!ev) return null;
        const comp = ev.competitions?.[0];
        const boxTeams = comp?.competitors || [];
        const home = boxTeams.find(c => c.homeAway === 'home');
        const away = boxTeams.find(c => c.homeAway === 'away');
        const parseCompStats = (competitor) => {
            const map = {};
            for (const s of (competitor?.statistics || [])) map[s.name] = s.displayValue;
            return map;
        };
        return {
            homeStats: parseCompStats(home),
            awayStats: parseCompStats(away),
            homeLeaders: [],
            awayLeaders: [],
            clock: comp?.status?.displayClock || '',
            period: comp?.status?.type?.detail || '',
            homeScore: home?.score ?? '0',
            awayScore: away?.score ?? '0',
            details: comp?.details || [],
            homeTeamId: home?.team?.id || '',
            awayTeamId: away?.team?.id || '',
        };
    } catch { return null; }
}

// ── Convert ESPN scoreboard details to event format ─────────────

export function espnDetailsToEvents(espnLive) {
    if (!espnLive?.details?.length) return { goals: [], yellowCards: [], redCards: [], subs: [] };
    const goals = [], yellowCards = [], redCards = [];
    for (const d of espnLive.details) {
        const player = d.athletesInvolved?.[0]?.displayName || '';
        const minute = d.clock?.displayValue || '';
        const teamId = d.team?.id || d.athletesInvolved?.[0]?.team?.id || '';
        const side = teamId === espnLive.homeTeamId ? 'home' : teamId === espnLive.awayTeamId ? 'away' : null;

        if (d.scoringPlay && !d.ownGoal) {
            goals.push({ minute, scorer: player, assist: null, side, ownGoal: false, penalty: !!d.penaltyKick });
        } else if (d.ownGoal) {
            // ESPN's team field for OGs = the benefiting team (team that gets the goal)
            goals.push({ minute, scorer: player, assist: null, side, ownGoal: true });
        } else if (d.yellowCard && !d.redCard) {
            yellowCards.push({ minute, player, side });
        } else if (d.redCard) {
            redCards.push({ minute, player, side });
        }
    }
    return { goals, yellowCards, redCards, subs: [] };
}
