import { currentLang } from '../config/strings.js';

// ── UI Helpers ────────────────────────────────────────────────

/**
 * Generate an event row (goals, cards, subs) with RTL awareness.
 * Home content goes left in LTR, right in RTL.
 */
export function eventRow(minute, homeContent, awayContent) {
    const isRtl = currentLang === 'he' || currentLang === 'ar';
    const leftContent = isRtl ? awayContent : homeContent;
    const rightContent = isRtl ? homeContent : awayContent;
    const left = leftContent
        ? `<div class="detail-cell-home">${leftContent}</div>`
        : `<div class="detail-cell-empty"></div>`;
    const right = rightContent
        ? `<div class="detail-cell-away">${rightContent}</div>`
        : `<div class="detail-cell-empty"></div>`;
    return `<div class="detail-row">${left}<span class="detail-minute">${minute}</span>${right}</div>`;
}

/**
 * Wrap a player name in a clickable span for player profile.
 */
export function playerSpan(name) {
    return `<span class="player-link" data-player="${name.replace(/"/g, '&quot;')}">${name}</span>`;
}

/**
 * Wrap a team name in a clickable span for team profile.
 */
export function teamSpan(name, teamId) {
    if (!teamId) return name;
    return `<span class="team-link" data-team-id="${teamId}">${name}</span>`;
}

/**
 * Shorten a full name to last name only.
 * "Maxime Crépeau" → "Crépeau", "Neymar" → "Neymar"
 */
export function shortName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    return parts[parts.length - 1];
}
