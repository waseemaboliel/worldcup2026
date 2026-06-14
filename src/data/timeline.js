import { TIMELINE_API } from '../config/api.js';
import { t } from '../config/strings.js';

// ── Timeline fetch + parse ─────────────────────────────────────
export const timelineCache = new Map();

export async function fetchTimeline(match, detail, bypassCache = false) {
    const cacheKey = match.IdMatch;
    if (!bypassCache && timelineCache.has(cacheKey)) return timelineCache.get(cacheKey);
    try {
        const url = TIMELINE_API
            .replace('{stage}', match.IdStage)
            .replace('{match}', match.IdMatch);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        const events = data.Event || [];
        timelineCache.set(cacheKey, events);
        return events;
    } catch {
        if (detail) detail.innerHTML = `<p class="detail-empty">${t('detailLoadError')}</p>`;
        return null;
    }
}

export function parseTimeline(events, homeId, awayId) {
    const goals = [], yellowCards = [], redCards = [], subs = [];

    // Build assist map: the Assist event (Type 1) always appears just before its Goal (Type 0)
    const assistMap = {};
    for (let i = 0; i < events.length; i++) {
        if (events[i].Type === 1 && i + 1 < events.length && events[i + 1].Type === 0) {
            const desc = events[i].EventDescription?.[0]?.Description || '';
            const m = desc.match(/Assisted by (.+)\./);
            if (m) assistMap[events[i + 1].EventId] = m[1];
        }
    }

    for (const ev of events) {
        const desc = ev.EventDescription?.[0]?.Description || '';
        const minute = ev.MatchMinute || '';
        const side = ev.IdTeam === homeId ? 'home' : ev.IdTeam === awayId ? 'away' : null;

        if (ev.Type === 0) {
            // Regular goal — IdTeam is the scoring team
            const m = desc.match(/^(.+?) \(.*?\) (?:scores|converts)/) || desc.match(/^(.+?) (?:scores|converts)/);
            const penalty = /converts the penalty/i.test(desc) || /converts/i.test(desc);
            goals.push({ minute, scorer: m ? m[1] : desc, assist: assistMap[ev.EventId] || null, side, ownGoal: false, penalty });
        } else if (ev.Type === 34) {
            // Own goal — IdTeam is the team that CONCEDED (the player's own team)
            // so the goal is credited to the OPPOSITE side
            const ownSide = side === 'home' ? 'away' : side === 'away' ? 'home' : null;
            const m = desc.match(/^(.+?) \(.*?\) (?:scores|converts)/) || desc.match(/^(.+?) (?:scores|converts)/);
            goals.push({ minute, scorer: m ? m[1] : desc, assist: null, side: ownSide, ownGoal: true });
        } else if (ev.Type === 2) {
            const m = desc.match(/^(.+?) \(/);
            yellowCards.push({ minute, player: m ? m[1] : desc, side });
        } else if (ev.Type === 3) {
            const m = desc.match(/^(.+?) \(/);
            redCards.push({ minute, player: m ? m[1] : desc, side });
        } else if (ev.Type === 5) {
            const m = desc.match(/^(.+?) \(in\) comes off the bench to replace (.+?) \(out\)/);
            if (m) {
                const playerIn = m[1].replace(/^.*begins\s+/i, '');
                const subMinute = minute || (desc.includes('Before the second half') ? 'HT' : '');
                subs.push({ minute: subMinute, playerIn, playerOut: m[2], side });
            }
        }
    }

    return { goals, yellowCards, redCards, subs };
}
