import { STATUS_FINISHED, STATUS_LIVE } from '../config/constants.js';
import { t } from '../config/strings.js';
import * as state from '../state.js';
import { countryToFlag, getTeamName } from '../data/helpers.js';
import { espnLineupCache } from '../data/espn-lineup.js';
import { hasLiveMatches } from '../data/live-scores.js';
import { teamSpan } from '../ui/helpers.js';
import { bindTeamLinks } from '../ui/links.js';
import { activeMatches } from '../ui/shell.js';

// ── Helpers ───────────────────────────────────────────────────

function isGroupStage(match) {
    return match.IdStage === '289273';
}

function standingSort(a, b) {
    const pts = (r) => r.w * 3 + r.d;
    const gd = (r) => r.gf - r.ga;
    return pts(b) - pts(a)
        || gd(b) - gd(a)
        || b.gf - a.gf
        || (a.yc + a.rc * 3) - (b.yc + b.rc * 3);
}

// ── Compute standings ─────────────────────────────────────────

export function computeStandings(matches) {
    const groups = new Map();

    for (const m of matches) {
        if (!isGroupStage(m)) continue;
        const groupId = m.IdGroup || 'Unknown';
        const label = m.GroupName?.[0]?.Description || 'Unknown';
        if (!groups.has(groupId)) groups.set(groupId, { label, table: new Map() });
        const { table } = groups.get(groupId);

        const addTeam = (team) => {
            if (!team) return;
            const id = team.IdTeam;
            if (!table.has(id)) table.set(id, {
                id, name: getTeamName(team) || '?', flag: countryToFlag(team.IdCountry),
                p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, yc: 0, rc: 0, live: false,
            });
        };
        addTeam(m.Home);
        addTeam(m.Away);

        // Accumulate card data from ESPN stats cache
        const espnData = espnLineupCache.get(m.IdMatch);
        if (espnData) {
            for (const side of ['home', 'away']) {
                const team = side === 'home' ? m.Home : m.Away;
                const espnStats = side === 'home' ? espnData.homeStats : espnData.awayStats;
                if (!team || !espnStats) continue;
                const entry = table.get(team.IdTeam);
                if (!entry) continue;
                entry.yc += parseFloat(espnStats.yellowCards) || 0;
                entry.rc += parseFloat(espnStats.redCards) || 0;
            }
        }

        if (m.MatchStatus === STATUS_FINISHED && m.HomeTeamScore != null) {
            const hs = m.HomeTeamScore, as = m.AwayTeamScore;
            const home = table.get(m.Home?.IdTeam);
            const away = table.get(m.Away?.IdTeam);
            if (!home || !away) continue;
            home.p++; away.p++;
            home.gf += hs; home.ga += as;
            away.gf += as; away.ga += hs;
            if (hs > as) { home.w++; away.l++; }
            else if (hs < as) { away.w++; home.l++; }
            else { home.d++; away.d++; }
        }

        if (m.MatchStatus === STATUS_LIVE) {
            const liveData = state.espnLiveData.get(m.IdMatch);
            const [hs, as] = liveData
                ? liveData.score.split('\u2013').map(s => parseInt(s.trim(), 10) || 0)
                : [m.HomeTeamScore ?? 0, m.AwayTeamScore ?? 0];

            const home = table.get(m.Home?.IdTeam);
            const away = table.get(m.Away?.IdTeam);
            if (!home || !away) continue;

            home.p++; away.p++;
            home.gf += hs; home.ga += as;
            away.gf += as; away.ga += hs;
            if (hs > as) { home.w++; away.l++; }
            else if (hs < as) { away.w++; home.l++; }
            else { home.d++; away.d++; }

            home.live = true; away.live = true;
        }
    }

    const sorted = new Map();
    for (const [groupId, { label, table }] of [...groups.entries()].sort((a, b) => a[0] - b[0])) {
        sorted.set(label, [...table.values()].sort(standingSort));
    }
    return sorted;
}

export function computeBestThirds(standings) {
    const thirds = [];
    for (const rows of standings.values()) {
        if (rows.length >= 3) thirds.push(rows[2]);
    }
    thirds.sort(standingSort);
    return new Set(thirds.slice(0, 8).map(r => r.id));
}

// ── Live standings poller ─────────────────────────────────────

let liveStandingsPoller = null;

export function stopLiveStandingsPoller() {
    if (liveStandingsPoller) { clearInterval(liveStandingsPoller); liveStandingsPoller = null; }
}

// ── Render ────────────────────────────────────────────────────

export function renderStandings(matches) {
    const main = document.querySelector('.main');
    const standings = computeStandings(matches);

    if (standings.size === 0) {
        main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('standingsNoData')}</div>`;
        return;
    }

    const bestThirds = computeBestThirds(standings);

    main.innerHTML = '';
    for (const [group, rows] of standings) {
        const section = document.createElement('div');
        section.className = 'standings-section';
        section.innerHTML = `<div class="standings-group-title">${group}</div>`;

        const table = document.createElement('table');
        table.className = 'standings-table';
        table.innerHTML = `<thead><tr>
      <th colspan="2">${t('standingsTeam')}</th>
      <th>P</th><th>W</th><th>D</th><th>L</th>
      <th>GF</th><th>GA</th><th>GD</th><th>Pts</th>
    </tr></thead>`;

        const tbody = document.createElement('tbody');
        rows.forEach((row, i) => {
            const pts = row.w * 3 + row.d;
            const gd = row.gf - row.ga;
            const tr = document.createElement('tr');
            if (i < 2) {
                tr.classList.add('qualify');
            } else if (i === 2 && bestThirds.has(row.id)) {
                tr.classList.add('qualify-third');
            }
            if (row.live) tr.classList.add('standings-row--live');
            const liveBadge = row.live ? '<span class="standings-live-badge">\uD83D\uDFE2</span>' : '';
            tr.innerHTML = `
        <td><span class="standings-pos">${i + 1}</span></td>
        <td><div class="standings-team"><span>${row.flag}</span><span>${teamSpan(row.name, row.id)}</span>${liveBadge}</div></td>
        <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
        <td>${row.gf}</td><td>${row.ga}</td><td>${gd > 0 ? '+' : ''}${gd}</td>
        <td class="standings-pts">${pts}</td>`;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        section.appendChild(table);
        main.appendChild(section);
        bindTeamLinks(section);
    }

    stopLiveStandingsPoller();
    if (hasLiveMatches()) {
        liveStandingsPoller = setInterval(() => {
            if (state.activeTab !== 'standings') { stopLiveStandingsPoller(); return; }
            if (!hasLiveMatches()) { stopLiveStandingsPoller(); return; }
            renderStandings(activeMatches());
        }, 15000);
    }
}
