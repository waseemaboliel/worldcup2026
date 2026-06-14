import { FIFA_TO_ALPHA2, TEAM_NAME_HE, ESPN_NAME_MAP } from '../config/constants.js';
import { currentLang, dateLocale } from '../config/strings.js';

// ── Flag & team helpers ───────────────────────────────────────

export function countryToFlag(fifaCode) {
    if (!fifaCode) return '🏴';
    const alpha2 = FIFA_TO_ALPHA2[fifaCode] || fifaCode;
    if (alpha2 === 'GB-SCT') return '🏴󠁧󠁢󠁳󠁣󠁴󠁿';
    if (!alpha2 || alpha2.length !== 2) return '🏳️';
    const base = 0x1F1E6;
    return String.fromCodePoint(
        base + alpha2.toUpperCase().charCodeAt(0) - 65,
        base + alpha2.toUpperCase().charCodeAt(1) - 65
    );
}

export function getTeamName(team) {
    if (!team) return null;
    if (currentLang === 'he' && team.IdCountry && TEAM_NAME_HE[team.IdCountry]) {
        return TEAM_NAME_HE[team.IdCountry];
    }
    return team.TeamName?.[0]?.Description || null;
}

// ── ESPN name normalisation ───────────────────────────────────

export function normaliseName(name) {
    return (name || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
        .replace(/[^a-z0-9]/g, ''); // strip spaces/punctuation
}

export function normTeam(name) {
    const n = normaliseName(name);
    return ESPN_NAME_MAP[n] || n;
}

// ── Date/time formatting ──────────────────────────────────────

export function formatKickoff(utcDateStr) {
    const date = new Date(utcDateStr);
    return date.toLocaleTimeString('en-IL', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jerusalem',
        hour12: false
    });
}

export function formatDateHeading(utcDateStr) {
    const date = new Date(utcDateStr);
    return date.toLocaleDateString(dateLocale(), {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jerusalem'
    });
}

export function groupByDate(matches) {
    const groups = new Map();
    for (const match of matches) {
        const heading = formatDateHeading(match.Date);
        if (!groups.has(heading)) groups.set(heading, []);
        groups.get(heading).push(match);
    }
    return groups;
}
