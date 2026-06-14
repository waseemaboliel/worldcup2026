import { MATCHES_API, MATCHES_API_AR, WATCH_API, ESPN_INDEX_API } from '../config/api.js';
import * as state from '../state.js';
import { normTeam, getTeamName } from './helpers.js';

export async function fetchIsraelChannels() {
    try {
        const res = await fetch(WATCH_API);
        if (!res.ok) return;
        const data = await res.json();
        const israel = (data.Results || []).find(r => r.IdCountry === 'ISR');
        if (!israel) return;
        const channels = {};
        for (const m of (israel.Matches || [])) {
            const sources = m.Sources || [];
            const hasKan11 = sources.some(s => s.Name === 'KAN 11');
            const hasMakan33 = sources.some(s => s.Name === 'MAKAN 33');
            channels[m.IdMatch] = sources.filter(s => {
                if (s.Name === 'KAN' && hasKan11) return false;
                if (s.Name === 'MAKAN' && hasMakan33) return false;
                return true;
            });
        }
        state.setIsraelChannels(channels);
    } catch { /* channels are non-critical */ }
}

export async function fetchMatchesAr() {
    try {
        const res = await fetch(MATCHES_API_AR);
        if (!res.ok) return;
        const data = await res.json();
        state.setAllMatchesAr(data.Results || []);
    } catch { /* non-critical — fall back to EN */ }
}

export async function fetchEspnIndex() {
    try {
        const res = await fetch(ESPN_INDEX_API);
        if (!res.ok) return;
        const data = await res.json();
        const espnEvents = data.events || [];

        // Build a lookup: normKey → espnEventId
        const espnByKey = new Map();
        for (const ev of espnEvents) {
            const comp = ev.competitions?.[0];
            if (!comp) continue;
            const date = ev.date?.slice(0, 10) || '';
            const teams = comp.competitors.map(c => normTeam(c.team?.displayName));
            const key = `${date}_${teams.sort().join('_')}`;
            espnByKey.set(key, ev.id);
        }

        // Match against FIFA allMatches
        for (const m of state.allMatches) {
            const date = m.Date?.slice(0, 10) || '';
            const home = normTeam(getTeamName(m.Home) || m.PlaceHolderA || '');
            const away = normTeam(getTeamName(m.Away) || m.PlaceHolderB || '');
            const key = `${date}_${[home, away].sort().join('_')}`;
            if (espnByKey.has(key)) {
                state.fifaToEspn.set(m.IdMatch, espnByKey.get(key));
            }
        }
    } catch { /* non-critical */ }
}

export async function fetchMatches() {
    const res = await fetch(MATCHES_API);
    if (!res.ok) throw new Error(`FIFA API returned ${res.status}`);
    const data = await res.json();
    const matches = data.Results || [];
    if (matches.length === 0) throw new Error('No matches returned from API');
    state.setAllMatches(matches);
    return matches;
}
