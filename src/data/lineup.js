import { LINEUP_API } from '../config/api.js';

// ── FIFA Lineup fetch + parse ──────────────────────────────────
export const lineupCache = new Map(); // IdMatch → { home, away }

export function parseLineupTeam(teamData) {
    if (!teamData) return null;
    const players = teamData.Players || [];
    const toPlayer = p => ({
        id: p.IdPlayer,
        name: p.PlayerName?.[0]?.Description || '',
        shirt: p.ShirtNumber,
        position: p.Position, // 0=GK 1=DEF 2=MID 3=FWD
        status: p.Status,   // 1=starter 2=sub
        fieldStatus: p.FieldStatus, // 0=on pitch 1=subbed off 2=subbed on
    });
    const coach = teamData.Coaches?.[0]?.Name?.[0]?.Description || null;
    return {
        formation: teamData.Tactics || null,
        coach,
        starters: players.filter(p => p.Status === 1).map(toPlayer),
        subs: players.filter(p => p.Status === 2).map(toPlayer),
    };
}

export async function fetchLineup(match, bypassCache = false) {
    const cacheKey = match.IdMatch;
    if (!bypassCache && lineupCache.has(cacheKey)) return lineupCache.get(cacheKey);
    try {
        const url = LINEUP_API
            .replace('{stage}', match.IdStage)
            .replace('{match}', match.IdMatch);
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const lineup = {
            home: parseLineupTeam(data.HomeTeam),
            away: parseLineupTeam(data.AwayTeam),
        };
        lineupCache.set(cacheKey, lineup);
        return lineup;
    } catch {
        return null;
    }
}
