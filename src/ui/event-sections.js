import { t } from '../config/strings.js';
import { eventRow, playerSpan } from './helpers.js';

// ── Event Sections Builder ────────────────────────────────────
// Shared between renderTimeline (finished match) and renderLiveDetail / patchLiveDetail.

/**
 * Build the HTML for match event sections (goals, cards, subs).
 * Returns HTML string with [data-live-events] or [data-live-empty] markers
 * so live patching can replace them in place.
 */
export function buildEventSections(goals, yellowCards, redCards, subs, homeFlag, awayFlag, totalEvents) {
    const sections = [];

    if (goals.length) {
        const rows = goals.map(g => {
            const assist = g.assist ? `<span class="detail-assist">↳ ${playerSpan(g.assist)}</span>` : '';
            const og = g.ownGoal ? ` <span class="detail-og">${t('liveOG')}</span>` : '';
            const pen = g.penalty ? ` <span class="detail-pen">(pen)</span>` : '';
            const cell = `${g.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">⚽ ${playerSpan(g.scorer)}${pen}${og}${assist}</span>`;
            return eventRow(g.minute, g.side === 'home' ? cell : null, g.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailGoals')}</div>${rows}</div>`);
    }
    if (yellowCards.length) {
        const rows = yellowCards.map(c => {
            const cell = `${c.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">🟨 ${playerSpan(c.player)}</span>`;
            return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailYellow')}</div>${rows}</div>`);
    }
    if (redCards.length) {
        const rows = redCards.map(c => {
            const cell = `${c.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">🟥 ${playerSpan(c.player)}</span>`;
            return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailRed')}</div>${rows}</div>`);
    }
    if (subs.length) {
        const rows = subs.map(s => {
            const cell = `${s.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">↑ ${playerSpan(s.playerIn)}</span><span class="detail-sub-out">↓ ${playerSpan(s.playerOut)}</span>`;
            return eventRow(s.minute, s.side === 'home' ? cell : null, s.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailSubs')}</div>${rows}</div>`);
    }

    if (!sections.length) {
        return `<p class="detail-empty" data-live-empty>${t('detailNoEvents')}</p>`;
    }
    return `<div data-live-events>${sections.join('')}</div>`;
}
