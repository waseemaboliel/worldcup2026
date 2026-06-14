import { ESPN_INDEX_API } from '../config/api.js';
import { STATUS_FINISHED } from '../config/constants.js';
import * as state from '../state.js';
import { countryToFlag, getTeamName } from './helpers.js';
import { espnLineupCache, fetchEspnLineup } from './espn-lineup.js';

// ── ESPN Stats Cache ───────────────────────────────────────────
// espnMatchDetailsCache: IdMatch → { details[], homeTeamId, awayTeamId }
export const espnMatchDetailsCache = new Map();

export async function buildEspnStatsCache(matches) {
    if (state.espnStatsCache) return state.espnStatsCache;

    const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED && state.fifaToEspn.has(m.IdMatch));

    // Fetch all ESPN summaries in parallel (uses espnLineupCache when already fetched)
    await Promise.allSettled(finishedMatches.map(m => fetchEspnLineup(m)));

    // Fetch ESPN scoreboard once for match details (goals/cards per match)
    try {
        const res = await fetch(ESPN_INDEX_API);
        if (res.ok) {
            const data = await res.json();
            for (const ev of (data.events || [])) {
                // Find the FIFA match ID for this ESPN event
                let fifaId = null;
                for (const [fId, eId] of state.fifaToEspn.entries()) {
                    if (eId === ev.id) { fifaId = fId; break; }
                }
                if (!fifaId) continue;
                const comp = ev.competitions?.[0];
                if (!comp?.details?.length) continue;
                const home = (comp.competitors || []).find(c => c.homeAway === 'home');
                const away = (comp.competitors || []).find(c => c.homeAway === 'away');
                espnMatchDetailsCache.set(fifaId, {
                    details: comp.details,
                    homeTeamId: home?.team?.id || '',
                    awayTeamId: away?.team?.id || '',
                });
            }
        }
    } catch { /* scoreboard unavailable — profiles won't have per-match events */ }

    // playerMap: key → { name, flag, teamName, goals, assists, shots, ... }
    const playerMap = new Map();
    // teamMap: fifaTeamId → { name, flag, played, espnStats: { statName → total } }
    const teamMap = new Map();

    for (const match of finishedMatches) {
        const espnData = espnLineupCache.get(match.IdMatch);
        if (!espnData) continue;

        // Accumulate team stats from boxscore
        for (const side of ['home', 'away']) {
            const fifaTeam = side === 'home' ? match.Home : match.Away;
            const espnStats = side === 'home' ? espnData.homeStats : espnData.awayStats;
            if (!fifaTeam || !espnStats) continue;
            const id = fifaTeam.IdTeam;
            if (!teamMap.has(id)) {
                teamMap.set(id, {
                    name: getTeamName(fifaTeam) || '?',
                    flag: countryToFlag(fifaTeam.IdCountry),
                    played: 0,
                    espnStats: {},
                });
            }
            const entry = teamMap.get(id);
            entry.played++;
            for (const [k, v] of Object.entries(espnStats)) {
                const num = parseFloat(v) || 0;
                entry.espnStats[k] = (entry.espnStats[k] || 0) + num;
            }
        }

        // Accumulate player stats from rosters
        const rosters = espnData.home ? [
            { roster: espnData.home, fifaTeam: match.Home },
            { roster: espnData.away, fifaTeam: match.Away },
        ] : [];

        for (const { roster, fifaTeam } of rosters) {
            const flag = fifaTeam ? countryToFlag(fifaTeam.IdCountry) : '🏳️';
            const teamName = fifaTeam ? (getTeamName(fifaTeam) || '') : '';
            const teamId = fifaTeam?.IdTeam || null;
            for (const p of [...(roster.starters || []), ...(roster.subs || [])]) {
                if (!p.name) continue;
                const key = `${p.name}|${teamName}`;
                const isStarter = (roster.starters || []).includes(p);
                if (!playerMap.has(key)) {
                    playerMap.set(key, { name: p.name, flag, teamName, teamId, position: p.position, goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, saves: 0, yellowCards: 0, redCards: 0, fouls: 0, offsides: 0, cleanSheets: 0, appearances: 0 });
                }
                const e = playerMap.get(key);
                if (p.stats) {
                    e.appearances += p.stats.appearances || 0;
                    e.goals += p.stats.totalGoals || 0;
                    e.assists += p.stats.goalAssists || 0;
                    e.shots += p.stats.totalShots || 0;
                    e.shotsOnTarget += p.stats.shotsOnTarget || 0;
                    e.saves += p.stats.saves || 0;
                    e.yellowCards += p.stats.yellowCards || 0;
                    e.redCards += p.stats.redCards || 0;
                    e.fouls += p.stats.foulsCommitted || 0;
                    e.offsides += p.stats.offsides || 0;
                    // Clean sheet: starter GK who conceded 0 goals
                    if (isStarter && p.position === 0 && (p.stats.goalsConceded || 0) === 0) {
                        e.cleanSheets++;
                    }
                }
            }
        }
    }

    const cache = { playerMap, teamMap };
    state.setEspnStatsCache(cache);
    return cache;
}
