import { ESPN_SUMMARY_API } from '../config/api.js';
import { fifaToEspn } from '../state.js';

// ── ESPN Lineup fetch + parse ──────────────────────────────────
export const espnLineupCache = new Map(); // IdMatch → { home, away, homeStats, awayStats, homeLeaders, awayLeaders } | null

// Stats to show in the match stats bar, in display order
export const MATCH_STAT_KEYS = [
    'possessionPct',
    'totalShots',
    'shotsOnTarget',
    'totalPasses',
    'passPct',
    'accurateCrosses',
    'totalLongBalls',
    'effectiveTackles',
    'interceptions',
    'effectiveClearance',
    'foulsCommitted',
    'wonCorners',
    'offsides',
    'saves',
    'yellowCards',
    'redCards',
];

export function parseEspnRoster(roster) {
    if (!roster) return null;
    const players = roster.roster || [];

    // Map ESPN abbreviated position → FIFA-style integer bucket for grouping
    const posMap = { G: 0, GK: 0 };
    ['CB', 'CD', 'CD-L', 'CD-R', 'LB', 'RB', 'LWB', 'RWB', 'SW', 'D'].forEach(p => posMap[p] = 1);
    ['CM', 'CM-L', 'CM-R', 'DM', 'AM', 'LM', 'RM', 'CAM', 'CDM', 'MF', 'M'].forEach(p => posMap[p] = 2);
    ['CF', 'CF-L', 'CF-R', 'LW', 'RW', 'SS', 'FW', 'F', 'ST'].forEach(p => posMap[p] = 3);

    const toPlayer = p => {
        const statsArr = p.stats || [];
        const statsMap = {};
        for (const s of statsArr) statsMap[s.name] = s.value ?? 0;
        return {
            name: p.athlete?.displayName || '',
            shirt: p.jersey || '',
            posAbbr: p.position?.abbreviation || '',
            position: posMap[p.position?.abbreviation] ?? 2,
            formationPlace: p.formationPlace ?? null,
            subbedOut: p.subbedOut || false,
            subbedIn: p.subbedIn || false,
            stats: statsMap,
        };
    };

    return {
        formation: roster.formation || null,
        coach: null, // ESPN doesn't expose coach in this endpoint
        starters: players.filter(p => p.starter).sort((a, b) => (a.formationPlace ?? 99) - (b.formationPlace ?? 99)).map(toPlayer),
        subs: players.filter(p => !p.starter).map(toPlayer),
    };
}

export async function fetchEspnLineup(match) {
    const cacheKey = match.IdMatch;
    if (espnLineupCache.has(cacheKey)) return espnLineupCache.get(cacheKey);

    const espnId = fifaToEspn.get(match.IdMatch);
    if (!espnId) {
        espnLineupCache.set(cacheKey, null);
        return null;
    }

    try {
        const url = ESPN_SUMMARY_API.replace('{espnId}', espnId);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        const rosters = data.rosters || [];
        const homeRoster = rosters.find(r => r.homeAway === 'home');
        const awayRoster = rosters.find(r => r.homeAway === 'away');

        // Parse team-level match stats from boxscore.teams
        const boxTeams = data.boxscore?.teams || [];
        const homeBoxTeam = boxTeams.find(bt => bt.homeAway === 'home');
        const awayBoxTeam = boxTeams.find(bt => bt.homeAway === 'away');
        const parseStats = (boxTeam) => {
            if (!boxTeam) return null;
            const map = {};
            for (const s of (boxTeam.statistics || [])) map[s.name] = s.displayValue;
            return map;
        };

        // Parse per-team leaders — top-level key, NOT nested under boxscore
        const boxLeaders = data.leaders || [];
        const parseLeaders = (homeAway) => {
            const entry = boxLeaders.find(l => {
                const boxTeam = boxTeams.find(bt => bt.homeAway === homeAway);
                return l.team?.id === boxTeam?.team?.id;
            });
            if (!entry) return [];
            return (entry.leaders || []).map(cat => ({
                statName: cat.name,
                statDisplay: cat.displayName,
                player: cat.leaders?.[0]?.athlete?.shortName || null,
                value: cat.leaders?.[0]?.displayValue || null,
            })).filter(c => c.player && c.value);
        };

        const result = {
            home: parseEspnRoster(homeRoster),
            away: parseEspnRoster(awayRoster),
            homeStats: parseStats(homeBoxTeam),
            awayStats: parseStats(awayBoxTeam),
            homeLeaders: parseLeaders('home'),
            awayLeaders: parseLeaders('away'),
        };
        espnLineupCache.set(cacheKey, result);
        return result;
    } catch {
        espnLineupCache.set(cacheKey, null);
        return null;
    }
}
