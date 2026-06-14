import * as state from '../state.js';

// ── Player & Team Link Binding ────────────────────────────────
// These functions attach click handlers to .player-link and .team-link elements.
// The actual profile openers (openPlayerProfile, openTeamProfile) are injected
// via initLinks() to avoid circular imports with feature modules.

let _openPlayerProfile = null;
let _openTeamProfile = null;

export function initLinks({ openPlayerProfile, openTeamProfile }) {
    _openPlayerProfile = openPlayerProfile;
    _openTeamProfile = openTeamProfile;
}

/**
 * Attach click handlers to all .player-link elements inside a container.
 */
export function bindPlayerLinks(container, matches) {
    container.querySelectorAll('.player-link').forEach(el => {
        el.addEventListener('click', e => {
            e.stopPropagation();
            if (_openPlayerProfile) _openPlayerProfile(el.dataset.player, matches);
        });
    });
}

/**
 * Attach click handlers to all .team-link elements inside a container.
 */
export function bindTeamLinks(container) {
    container.querySelectorAll('.team-link').forEach(el => {
        el.addEventListener('click', e => {
            e.stopPropagation();
            if (_openTeamProfile) _openTeamProfile(el.dataset.teamId, state.allMatches);
        });
    });
}
