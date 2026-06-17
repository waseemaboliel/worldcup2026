import { STATUS_FINISHED } from '../config/constants.js';
import { t } from '../config/strings.js';
import * as state from '../state.js';
import { countryToFlag, getTeamName } from '../data/helpers.js';
import { buildEspnStatsCache } from '../data/espn-stats.js';
import { playerSpan, teamSpan } from '../ui/helpers.js';
import { bindPlayerLinks, bindTeamLinks } from '../ui/links.js';
import { activeMatches } from '../ui/shell.js';

// ── Sub-tab definitions ───────────────────────────────────────

const PLAYER_SUBS = [
    { key: 'scorers', icon: '⚽', label: () => t('statGoals') },
    { key: 'assists', icon: '🎯', label: () => t('statAssists') },
    { key: 'clean', icon: '🧤', label: () => t('statClean') },
    { key: 'shots', icon: '🎯', label: () => t('statShots') },
    { key: 'shotsOnTarget', icon: '🎯', label: () => t('statOnTarget') },
    { key: 'saves', icon: '🧤', label: () => t('statSaves') },
    { key: 'fouls', icon: '🚫', label: () => t('statFouls') },
    { key: 'offsides', icon: '🚩', label: () => t('statOffsides') },
    { key: 'yellow', icon: '🟨', label: () => t('statYellow') },
    { key: 'red', icon: '🟥', label: () => t('statRed') },
    { key: 'ownGoals', icon: '⚽', label: () => t('statOwnGoals') },
];

const TEAM_SUBS = [
    { key: 'total-goals', icon: '⚽', label: () => t('teamTotalGoals'), espnKey: null, fifa: true },
    { key: 'goals-per-game', icon: '⚽', label: () => t('teamGoalsGame'), espnKey: null, fifa: true },
    { key: 'total-assists', icon: '🎯', label: () => t('teamTotalAssists'), espnKey: null, fifa: true },
    { key: 'assists-per-game', icon: '🎯', label: () => t('teamAssistsGame'), espnKey: null, fifa: true },
    { key: 'total-conceded', icon: '🥅', label: () => t('teamTotalConceded'), espnKey: null, fifa: true },
    { key: 'conceded-per-game', icon: '🥅', label: () => t('teamConcededGame'), espnKey: null, fifa: true },
    { key: 'clean-sheets', icon: '🧤', label: () => t('teamClean'), espnKey: null, fifa: true },
    { key: 'possession', icon: '🔵', label: () => t('teamPossession'), espnKey: 'possessionPct', avg: true },
    { key: 'shots', icon: '🎯', label: () => t('teamShots'), espnKey: 'totalShots', avg: true },
    { key: 'shots-on-target', icon: '🎯', label: () => t('teamOnTarget'), espnKey: 'shotsOnTarget', avg: true },
    { key: 'passes', icon: '📋', label: () => t('teamPasses'), espnKey: 'totalPasses', avg: true },
    { key: 'tackles', icon: '💪', label: () => t('teamTackles'), espnKey: 'effectiveTackles', avg: true },
    { key: 'interceptions', icon: '✋', label: () => t('teamInterceptions'), espnKey: 'interceptions', avg: true },
    { key: 'yellow-cards', icon: '🟨', label: () => t('teamYellow'), espnKey: 'yellowCards' },
    { key: 'red-cards', icon: '🟥', label: () => t('teamRed'), espnKey: 'redCards' },
];

// ── Main entry ────────────────────────────────────────────────

function removeBackToTop() {
    const btn = document.querySelector('.stats-back-top');
    if (btn) btn.remove();
    if (window._statsScrollHandler) {
        window.removeEventListener('scroll', window._statsScrollHandler);
        window._statsScrollHandler = null;
    }
}

export function renderStats(matches) {
    const main = document.querySelector('.main');
    removeBackToTop();
    main.innerHTML = `
    <div class="stats-section-tabs">
      <button class="stats-section-tab ${state.activeStatsSection === 'player' ? 'stats-section-tab--active' : ''}" data-section="player">${t('statsPlayer')}</button>
      <button class="stats-section-tab ${state.activeStatsSection === 'team' ? 'stats-section-tab--active' : ''}" data-section="team">${t('statsTeam')}</button>
    </div>
    <div id="stats-content"></div>`;

    main.querySelectorAll('.stats-section-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            state.setActiveStatsSection(btn.dataset.section);
            renderStats(matches);
        });
    });

    const content = main.querySelector('#stats-content');
    if (state.activeStatsSection === 'player') renderPlayerStats(matches, content);
    else renderTeamStats(matches, content);
}

// ── Player stats ──────────────────────────────────────────────

function getTeamList(matches) {
    const teams = new Map();
    for (const m of matches) {
        if (m.MatchStatus !== STATUS_FINISHED) continue;
        for (const side of [m.Home, m.Away]) {
            if (!side || teams.has(side.IdTeam)) continue;
            teams.set(side.IdTeam, {
                id: side.IdTeam,
                name: getTeamName(side) || '?',
                flag: countryToFlag(side.IdCountry),
            });
        }
    }
    return [...teams.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function renderPlayerStats(matches, container) {
    const teamList = getTeamList(matches);
    const filterTeam = state.statsTeamFilter;

    container.innerHTML = `
    <div class="stats-team-filter">
      <button class="stats-team-chip ${!filterTeam ? 'stats-team-chip--active' : ''}" data-team="">${t('statsAllTeams')}</button>
      <input class="stats-team-search" type="search" placeholder="🔍 Search team…" autocomplete="off" />
      ${teamList.map(tm => `<button class="stats-team-chip ${filterTeam === tm.id ? 'stats-team-chip--active' : ''}" data-team="${tm.id}">${tm.flag} ${tm.name}</button>`).join('')}
    </div>
    <div class="stats-tabs">
      ${PLAYER_SUBS.map(s => `<button class="stats-tab ${state.activePlayerSub === s.key ? 'stats-tab--active' : ''}" data-sub="${s.key}">${s.icon} ${s.label()}</button>`).join('')}
    </div>
    <div id="player-stats-content"></div>`;

    // Team search filtering
    const searchInput = container.querySelector('.stats-team-search');
    const chips = container.querySelectorAll('.stats-team-chip[data-team]');
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        chips.forEach(chip => {
            if (!chip.dataset.team) { chip.style.display = ''; return; } // "All" always visible
            const name = chip.textContent.toLowerCase();
            chip.style.display = name.includes(q) ? '' : 'none';
        });
    });

    container.querySelectorAll('.stats-team-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            state.setStatsTeamFilter(btn.dataset.team || null);
            renderPlayerStats(matches, container);
        });
    });

    container.querySelectorAll('.stats-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            state.setActivePlayerSub(btn.dataset.sub);
            renderPlayerStats(matches, container);
        });
    });

    const inner = container.querySelector('#player-stats-content');
    if (state.activePlayerSub === 'scorers') renderScorers(matches, inner);
    else if (state.activePlayerSub === 'assists') renderAssists(matches, inner);
    else if (state.activePlayerSub === 'clean') renderCleanSheets(matches, inner);
    else renderEspnPlayerLeaderboard(matches, inner, state.activePlayerSub);

    // Back to top button
    let backBtn = document.querySelector('.stats-back-top');
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.className = 'stats-back-top';
        backBtn.textContent = '↑';
        backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        document.body.appendChild(backBtn);
    }
    const onScroll = () => {
        backBtn.classList.toggle('stats-back-top--visible', window.scrollY > 400);
    };
    window.removeEventListener('scroll', window._statsScrollHandler);
    window._statsScrollHandler = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ── Team stats ────────────────────────────────────────────────

function renderTeamStats(matches, container) {
    removeBackToTop();
    container.innerHTML = `
    <div class="stats-tabs">
      ${TEAM_SUBS.map(s => `<button class="stats-tab ${state.activeTeamSub === s.key ? 'stats-tab--active' : ''}" data-sub="${s.key}">${s.icon} ${s.label()}</button>`).join('')}
    </div>
    <div id="team-stats-content"></div>`;

    container.querySelectorAll('.stats-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            state.setActiveTeamSub(btn.dataset.sub);
            renderTeamStats(matches, container);
        });
    });

    const inner = container.querySelector('#team-stats-content');
    renderTeamLeaderboard(matches, inner, state.activeTeamSub);
}

// ── Team leaderboard ──────────────────────────────────────────

async function renderTeamLeaderboard(matches, container, type) {
    container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingComputing')}</div>`;

    const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
    const sub = TEAM_SUBS.find(s => s.key === type);

    // FIFA-computed stats (goals, conceded, clean sheets)
    if (sub?.fifa) {
        const teamMap = new Map();
        const ensure = (team) => {
            if (!team) return null;
            if (!teamMap.has(team.IdTeam)) teamMap.set(team.IdTeam, {
                name: getTeamName(team) || '?', flag: countryToFlag(team.IdCountry),
                played: 0, scored: 0, conceded: 0, cleanSheets: 0,
            });
            return teamMap.get(team.IdTeam);
        };
        for (const m of finishedMatches) {
            const home = ensure(m.Home), away = ensure(m.Away);
            if (!home || !away) continue;
            const hs = m.HomeTeamScore ?? 0, as = m.AwayTeamScore ?? 0;
            home.played++; away.played++;
            home.scored += hs; home.conceded += as;
            away.scored += as; away.conceded += hs;
            if (as === 0) home.cleanSheets++;
            if (hs === 0) away.cleanSheets++;
        }

        // Accumulate assists from ESPN lineup data per team
        if (type === 'total-assists' || type === 'assists-per-game') {
            const { espnLineupCache } = await import('../data/espn-lineup.js');
            for (const m of finishedMatches) {
                const espnData = espnLineupCache.get(m.IdMatch);
                if (!espnData) continue;
                for (const side of ['home', 'away']) {
                    const fifaTeam = side === 'home' ? m.Home : m.Away;
                    if (!fifaTeam || !teamMap.has(fifaTeam.IdTeam)) continue;
                    const entry = teamMap.get(fifaTeam.IdTeam);
                    if (!entry.assists) entry.assists = 0;
                    const roster = espnData[side];
                    if (!roster) continue;
                    for (const p of [...(roster.starters || []), ...(roster.subs || [])]) {
                        entry.assists += p.stats?.goalAssists || 0;
                    }
                }
            }
        }

        const getValue = (tm) => type === 'total-goals' ? tm.scored
            : type === 'goals-per-game' ? (tm.played ? +(tm.scored / tm.played).toFixed(2) : 0)
                : type === 'total-assists' ? (tm.assists || 0)
                    : type === 'assists-per-game' ? (tm.played ? +((tm.assists || 0) / tm.played).toFixed(2) : 0)
                        : type === 'total-conceded' ? tm.conceded
                            : type === 'conceded-per-game' ? (tm.played ? +(tm.conceded / tm.played).toFixed(2) : 0)
                                : tm.cleanSheets;
        const label = sub.label();
        const sorted = [...teamMap.values()].filter(tm => tm.played > 0).sort((a, b) => getValue(b) - getValue(a)).slice(0, 48);
        return renderTeamRows(container, sorted, tm => getValue(tm), label);
    }

    // ESPN-computed stats
    const { teamMap } = await buildEspnStatsCache(matches);
    const espnKey = sub?.espnKey;
    if (!espnKey) { container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`; return; }

    const getValue = (team) => {
        const raw = team.espnStats[espnKey] || 0;
        if (sub.pct) return team.played ? +((raw / team.played) * 100).toFixed(1) : 0;
        if (sub.avg) return team.played ? +(raw / team.played).toFixed(2) : 0;
        return raw;
    };
    const fmt = (team) => {
        const v = getValue(team);
        return sub.pct ? v.toFixed(1) + '%' : v;
    };
    const label = sub.label();
    const sorted = [...teamMap.values()].filter(tm => tm.played > 0).sort((a, b) => getValue(b) - getValue(a)).slice(0, 48);
    renderTeamRows(container, sorted, fmt, label);
}

function renderTeamRows(container, sorted, getFmt, label) {
    if (sorted.length === 0) {
        container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`;
        return;
    }
    container.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'scorers-list';
    sorted.forEach((team, i) => {
        const row = document.createElement('div');
        row.className = 'scorer-row';
        row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${team.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${team.name}</div>
        <div class="scorer-team">${t('gamesPlayed', team.played)}</div>
      </div>
      <div>
        <div class="scorer-goals">${getFmt(team)}</div>
        <div class="scorer-goals-label">${label}</div>
      </div>`;
        list.appendChild(row);
    });
    container.appendChild(list);
}

// ── Player list rendering with "Show more" ────────────────────

const INITIAL_LIMIT = 40;

function renderPlayerList(container, sorted, buildRowHtml) {
    container.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'scorers-list';

    const showInitial = !state.statsTeamFilter && sorted.length > INITIAL_LIMIT;
    const initialItems = showInitial ? sorted.slice(0, INITIAL_LIMIT) : sorted;

    initialItems.forEach((s, i) => {
        const row = document.createElement('div');
        row.className = 'scorer-row';
        row.innerHTML = buildRowHtml(s, i);
        list.appendChild(row);
    });

    bindPlayerLinks(list, activeMatches());
    bindTeamLinks(list);
    container.appendChild(list);

    if (showInitial) {
        let shown = INITIAL_LIMIT;
        const addShowMoreBtn = () => {
            if (shown >= sorted.length) return;
            const btn = document.createElement('button');
            btn.className = 'stats-show-more';
            btn.textContent = t('statsShowMore');
            btn.addEventListener('click', () => {
                btn.remove();
                const next = sorted.slice(shown, shown + INITIAL_LIMIT);
                next.forEach((s, i) => {
                    const row = document.createElement('div');
                    row.className = 'scorer-row';
                    row.innerHTML = buildRowHtml(s, shown + i);
                    list.appendChild(row);
                });
                shown += next.length;
                bindPlayerLinks(list, activeMatches());
                bindTeamLinks(list);
                addShowMoreBtn();
            });
            container.appendChild(btn);
        };
        addShowMoreBtn();
        container.appendChild(btn);
    }
}

// ── Individual player leaderboards ────────────────────────────

async function renderScorers(matches, container) {
    const main = container || document.querySelector('.main');
    main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingScorers')}</div>`;

    const { playerMap } = await buildEspnStatsCache(matches);

    let sorted;
    if (state.statsTeamFilter) {
        sorted = [...playerMap.values()]
            .filter(p => p.teamId === state.statsTeamFilter && p.position !== 0 && p.goals > 0)
            .sort((a, b) => b.goals - a.goals);
    } else {
        sorted = [...playerMap.values()]
            .filter(p => p.goals > 0 && p.position !== 0)
            .sort((a, b) => b.goals - a.goals);
    }

    if (sorted.length === 0) {
        main.innerHTML = `<div class="error"><div class="error-icon">⚽</div>${t('errorNoGoals')}</div>`;
        return;
    }

    renderPlayerList(main, sorted, (s, i) => `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.goals}</div>
        <div class="scorer-goals-label">${t('goalLabel', s.goals)}</div>
      </div>`);
}

async function renderAssists(matches, container) {
    container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingAssists')}</div>`;

    const { playerMap } = await buildEspnStatsCache(matches);

    let sorted;
    if (state.statsTeamFilter) {
        sorted = [...playerMap.values()]
            .filter(p => p.teamId === state.statsTeamFilter && p.assists > 0)
            .sort((a, b) => b.assists - a.assists);
    } else {
        sorted = [...playerMap.values()]
            .filter(p => p.assists > 0)
            .sort((a, b) => b.assists - a.assists);
    }

    if (sorted.length === 0) {
        container.innerHTML = `<div class="error"><div class="error-icon">🎯</div>${t('errorNoAssists')}</div>`;
        return;
    }

    renderPlayerList(container, sorted, (s, i) => `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.assists}</div>
        <div class="scorer-goals-label">${t('assistLabel', s.assists)}</div>
      </div>`);
    bindPlayerLinks(container, activeMatches());
    bindTeamLinks(container);
}

async function renderCleanSheets(matches, container) {
    container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingClean')}</div>`;

    const { playerMap } = await buildEspnStatsCache(matches);

    let sorted;
    if (state.statsTeamFilter) {
        sorted = [...playerMap.values()]
            .filter(p => p.teamId === state.statsTeamFilter && p.position === 0 && p.cleanSheets > 0)
            .sort((a, b) => b.cleanSheets - a.cleanSheets);
    } else {
        sorted = [...playerMap.values()]
            .filter(p => p.position === 0 && p.cleanSheets > 0)
            .sort((a, b) => b.cleanSheets - a.cleanSheets);
    }

    if (sorted.length === 0) {
        container.innerHTML = `<div class="error"><div class="error-icon">🧤</div>${t('errorNoClean')}</div>`;
        return;
    }

    renderPlayerList(container, sorted, (s, i) => `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.cleanSheets}</div>
        <div class="scorer-goals-label">${t('cleanLabel', s.cleanSheets)}</div>
      </div>`);
    bindPlayerLinks(container, activeMatches());
    bindTeamLinks(container);
}

async function renderEspnPlayerLeaderboard(matches, container, type) {
    container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingComputing')}</div>`;

    const { playerMap } = await buildEspnStatsCache(matches);

    const CONFIG = {
        shots: { field: 'shots', icon: '🎯', label: () => t('labelShots') },
        shotsOnTarget: { field: 'shotsOnTarget', icon: '🎯', label: () => t('labelOnTarget') },
        saves: { field: 'saves', icon: '🧤', label: () => t('labelSaves') },
        fouls: { field: 'fouls', icon: '🚫', label: () => t('labelFouls') },
        offsides: { field: 'offsides', icon: '🚩', label: () => t('labelOffsides') },
        yellow: { field: 'yellowCards', icon: '🟨', label: () => '🟨' },
        red: { field: 'redCards', icon: '🟥', label: () => '🟥' },
        ownGoals: { field: 'ownGoals', icon: '⚽', label: () => t('labelOwnGoals') },
    };

    const cfg = CONFIG[type];
    if (!cfg) { container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`; return; }

    let sorted;
    if (state.statsTeamFilter) {
        sorted = [...playerMap.values()]
            .filter(p => p.teamId === state.statsTeamFilter && p[cfg.field] > 0)
            .sort((a, b) => b[cfg.field] - a[cfg.field]);
    } else {
        sorted = [...playerMap.values()]
            .filter(p => p[cfg.field] > 0)
            .sort((a, b) => b[cfg.field] - a[cfg.field]);
    }

    if (sorted.length === 0) {
        container.innerHTML = `<div class="error"><div class="error-icon">${cfg.icon}</div>${t('errorNoData')}</div>`;
        return;
    }

    renderPlayerList(container, sorted, (s, i) => `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s[cfg.field]}</div>
        <div class="scorer-goals-label">${cfg.label()}</div>
      </div>`);
    bindPlayerLinks(container, activeMatches());
    bindTeamLinks(container);
}
