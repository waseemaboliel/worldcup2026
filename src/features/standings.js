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

// Best-thirds sort (no H2H, overall only):
// pts → GD → GF → fair play → (FIFA ranking omitted)
function bestThirdsSort(a, b) {
    const ptsA = a.w * 3 + a.d, ptsB = b.w * 3 + b.d;
    if (ptsA !== ptsB) return ptsB - ptsA;
    const gdA = a.gf - a.ga, gdB = b.gf - b.ga;
    if (gdA !== gdB) return gdB - gdA;
    if (a.gf !== b.gf) return b.gf - a.gf;
    const fpA = a.yc + a.rc * 3, fpB = b.yc + b.rc * 3;
    return fpA - fpB;
}

// ── FIFA Group Tiebreaker Sort ────────────────────────────────
// Step 1: H2H among tied teams (pts → GD → GF)
// Step 2: Overall (GD → GF → fair play)
// Step 3: FIFA ranking (not available — omitted)

function fifaGroupSort(rows, groupMatches) {
    // Initial sort by total points
    rows.sort((a, b) => (b.w * 3 + b.d) - (a.w * 3 + a.d));

    // Find contiguous groups of teams with same points and resolve ties
    let i = 0;
    while (i < rows.length) {
        const pts = rows[i].w * 3 + rows[i].d;
        let j = i + 1;
        while (j < rows.length && (rows[j].w * 3 + rows[j].d) === pts) j++;

        if (j - i > 1) {
            // Multiple teams with same points — apply FIFA tiebreakers
            const tied = rows.slice(i, j);
            const resolved = resolveWithH2H(tied, groupMatches);
            for (let k = 0; k < resolved.length; k++) {
                rows[i + k] = resolved[k];
            }
        }
        i = j;
    }

    return rows;
}

function resolveWithH2H(teams, groupMatches) {
    const teamIds = new Set(teams.map(t => t.id));

    // Compute H2H mini-table among tied teams
    const h2h = new Map();
    for (const t of teams) {
        h2h.set(t.id, { pts: 0, gf: 0, ga: 0 });
    }

    for (const m of groupMatches) {
        if (m.MatchStatus !== STATUS_FINISHED && m.MatchStatus !== STATUS_LIVE) continue;
        const homeId = m.Home?.IdTeam;
        const awayId = m.Away?.IdTeam;
        if (!teamIds.has(homeId) || !teamIds.has(awayId)) continue;

        let hs, as;
        if (m.MatchStatus === STATUS_LIVE) {
            const liveData = state.espnLiveData.get(m.IdMatch);
            [hs, as] = liveData
                ? liveData.score.split('\u2013').map(s => parseInt(s.trim(), 10) || 0)
                : [m.HomeTeamScore ?? 0, m.AwayTeamScore ?? 0];
        } else {
            hs = m.HomeTeamScore ?? 0;
            as = m.AwayTeamScore ?? 0;
        }

        const home = h2h.get(homeId);
        const away = h2h.get(awayId);

        home.gf += hs; home.ga += as;
        away.gf += as; away.ga += hs;

        if (hs > as) { home.pts += 3; }
        else if (hs < as) { away.pts += 3; }
        else { home.pts += 1; away.pts += 1; }
    }

    // Sort: Step 1 (H2H pts → H2H GD → H2H GF), then Step 2 (overall GD → GF → fair play)
    teams.sort((a, b) => {
        const ha = h2h.get(a.id), hb = h2h.get(b.id);
        // Step 1: H2H
        if (ha.pts !== hb.pts) return hb.pts - ha.pts;
        const h2hGdA = ha.gf - ha.ga, h2hGdB = hb.gf - hb.ga;
        if (h2hGdA !== h2hGdB) return h2hGdB - h2hGdA;
        if (ha.gf !== hb.gf) return hb.gf - ha.gf;
        // Step 2: Overall
        const gdA = a.gf - a.ga, gdB = b.gf - b.ga;
        if (gdA !== gdB) return gdB - gdA;
        if (a.gf !== b.gf) return b.gf - a.gf;
        // Fair play (lower cards = better)
        const fpA = a.yc + a.rc * 3, fpB = b.yc + b.rc * 3;
        return fpA - fpB;
    });

    return teams;
}

// ── Compute standings ─────────────────────────────────────────

export function computeStandings(matches) {
    const groups = new Map();

    for (const m of matches) {
        if (!isGroupStage(m)) continue;
        const groupId = m.IdGroup || 'Unknown';
        const label = m.GroupName?.[0]?.Description || 'Unknown';
        if (!groups.has(groupId)) groups.set(groupId, { label, table: new Map(), matches: [] });
        const group = groups.get(groupId);
        const { table } = group;
        group.matches.push(m);

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
    for (const [groupId, { label, table, matches: gMatches }] of [...groups.entries()].sort((a, b) => a[0] - b[0])) {
        const rows = fifaGroupSort([...table.values()], gMatches);
        sorted.set(label, { rows, matches: gMatches });
    }
    return sorted;
}

export function computeBestThirds(standings) {
    const thirds = [];
    for (const [groupLabel, { rows }] of standings) {
        if (rows.length >= 3) {
            const third = { ...rows[2], group: groupLabel };
            thirds.push(third);
        }
    }
    thirds.sort(bestThirdsSort);
    return thirds;
}

// ── Live standings poller ─────────────────────────────────────

let liveStandingsPoller = null;

export function stopLiveStandingsPoller() {
    if (liveStandingsPoller) { clearInterval(liveStandingsPoller); liveStandingsPoller = null; }
}

// ── Clinched logic (H2H-aware) ────────────────────────────────
// A team clinches top 2 if no combination of remaining results
// can push them below 2nd, considering H2H tiebreakers.

function computeClinched(rows, groupMatches) {
    const clinched = new Set();
    const totalGroupGames = 3;

    // If all teams have played all their games, the group is complete —
    // positions 1 and 2 are final and clinched automatically.
    const groupComplete = rows.every(r => r.p >= totalGroupGames);
    if (groupComplete) {
        if (rows.length >= 1) clinched.add(rows[0].id);
        if (rows.length >= 2) clinched.add(rows[1].id);
        return clinched;
    }

    // Build H2H result map: h2hResult[A][B] = 'win'|'loss'|'draw'|null
    const h2hResult = new Map();
    for (const row of rows) h2hResult.set(row.id, new Map());

    for (const m of groupMatches) {
        if (m.MatchStatus !== STATUS_FINISHED && m.MatchStatus !== STATUS_LIVE) continue;
        const homeId = m.Home?.IdTeam;
        const awayId = m.Away?.IdTeam;
        if (!homeId || !awayId) continue;

        let hs, as;
        if (m.MatchStatus === STATUS_LIVE) {
            const liveData = state.espnLiveData.get(m.IdMatch);
            [hs, as] = liveData
                ? liveData.score.split('\u2013').map(s => parseInt(s.trim(), 10) || 0)
                : [m.HomeTeamScore ?? 0, m.AwayTeamScore ?? 0];
        } else {
            hs = m.HomeTeamScore ?? 0;
            as = m.AwayTeamScore ?? 0;
        }

        if (hs > as) {
            h2hResult.get(homeId)?.set(awayId, 'win');
            h2hResult.get(awayId)?.set(homeId, 'loss');
        } else if (hs < as) {
            h2hResult.get(homeId)?.set(awayId, 'loss');
            h2hResult.get(awayId)?.set(homeId, 'win');
        } else {
            h2hResult.get(homeId)?.set(awayId, 'draw');
            h2hResult.get(awayId)?.set(homeId, 'draw');
        }
    }

    for (const team of rows) {
        if (team.p === 0) continue;

        const worstPts = team.w * 3 + team.d; // lose all remaining
        const otherTeams = rows.filter(r => r.id !== team.id);

        // Count how many teams can finish ABOVE this team
        let canBeAbove = 0;
        for (const other of otherTeams) {
            const otherBestPts = (other.w * 3 + other.d) + (totalGroupGames - other.p) * 3;

            if (otherBestPts > worstPts) {
                // Other can get more points — can finish above
                canBeAbove++;
            } else if (otherBestPts === worstPts) {
                // Same points — check H2H
                const result = h2hResult.get(team.id)?.get(other.id);
                if (result === 'win') {
                    // We beat them H2H — they CANNOT finish above us at equal pts
                } else {
                    // They beat us, drew, or haven't played — they could be above
                    canBeAbove++;
                }
            }
            // otherBestPts < worstPts — they can't reach us
        }

        // If fewer than 2 teams can finish above → guaranteed top 2
        if (canBeAbove < 2) {
            clinched.add(team.id);
        }
    }

    return clinched;
}

// ── Render ────────────────────────────────────────────────────

export function renderStandings(matches) {
    const main = document.querySelector('.main');
    const standings = computeStandings(matches);

    if (standings.size === 0) {
        main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('standingsNoData')}</div>`;
        return;
    }

    // Set nav height for sticky sub-tabs
    const nav = document.querySelector('.nav');
    if (nav) document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');

    main.innerHTML = `
    <div class="standings-sub-tabs">
      <button class="standings-sub-tab ${state.activeStandingsTab === 'groups' ? 'standings-sub-tab--active' : ''}" data-tab="groups">${t('standingsGroups')}</button>
      <button class="standings-sub-tab ${state.activeStandingsTab === 'thirds' ? 'standings-sub-tab--active' : ''}" data-tab="thirds">${t('standingsThirds')}</button>
    </div>
    <div id="standings-content"></div>`;

    main.querySelectorAll('.standings-sub-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            state.setActiveStandingsTab(btn.dataset.tab);
            renderStandings(matches);
        });
    });

    const content = main.querySelector('#standings-content');

    if (state.activeStandingsTab === 'groups') {
        renderGroupStandings(standings, content);
    } else {
        renderBestThirdsTable(standings, content);
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

// ── Render group standings ────────────────────────────────────

function renderGroupStandings(standings, container) {
    const bestThirds = new Set(computeBestThirds(standings).slice(0, 8).map(r => r.id));

    container.innerHTML = '';
    for (const [group, { rows, matches: groupMatches }] of standings) {
        // Don't show qualified badges if any match in this group is still live
        const groupHasLive = groupMatches.some(m => m.MatchStatus === STATUS_LIVE);
        const clinched = groupHasLive ? new Set() : computeClinched(rows, groupMatches);

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
            const qualifiedLabel = clinched.has(row.id) ? `<div class="standings-qualified">${t('standingsQualified')}</div>` : '';

            tr.innerHTML = `
        <td><span class="standings-pos">${i + 1}</span></td>
        <td><div class="standings-team"><span>${row.flag}</span><div class="standings-team-info"><span>${teamSpan(row.name, row.id)}</span>${qualifiedLabel}</div>${liveBadge}</div></td>
        <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
        <td>${row.gf}</td><td>${row.ga}</td><td>${gd > 0 ? '+' : ''}${gd}</td>
        <td class="standings-pts">${pts}</td>`;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        section.appendChild(table);
        container.appendChild(section);
        bindTeamLinks(section);
    }
}

// ── Render best thirds table ──────────────────────────────────

function renderBestThirdsTable(standings, container) {
    const thirds = computeBestThirds(standings);

    if (thirds.length === 0) {
        container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('standingsNoData')}</div>`;
        return;
    }

    container.innerHTML = '';
    const section = document.createElement('div');
    section.className = 'standings-section';

    const table = document.createElement('table');
    table.className = 'standings-table standings-table--thirds';
    table.innerHTML = `<thead><tr>
      <th>${t('standingsRank')}</th>
      <th colspan="2">${t('standingsTeam')}</th>
      <th>P</th><th>W</th><th>D</th><th>L</th>
      <th>GF</th><th>GA</th><th>GD</th><th>Pts</th>
    </tr></thead>`;

    const tbody = document.createElement('tbody');
    thirds.forEach((row, i) => {
        const pts = row.w * 3 + row.d;
        const gd = row.gf - row.ga;
        const tr = document.createElement('tr');
        if (i < 8) {
            tr.classList.add('qualify-third');
        } else {
            tr.classList.add('standings-eliminated');
        }

        const statusBadge = i < 8
            ? `<span class="standings-qualify-badge">${t('standingsQualified')}</span>`
            : `<span class="standings-elim-badge">${t('standingsEliminated')}</span>`;

        tr.innerHTML = `
        <td><span class="standings-pos">${i + 1}</span></td>
        <td><div class="standings-team"><span>${row.flag}</span><span>${teamSpan(row.name, row.id)}</span></div></td>
        <td class="standings-group-badge">${row.group}</td>
        <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
        <td>${row.gf}</td><td>${row.ga}</td><td>${gd > 0 ? '+' : ''}${gd}</td>
        <td class="standings-pts">${pts}</td>`;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    section.appendChild(table);
    container.appendChild(section);
    bindTeamLinks(section);
}
