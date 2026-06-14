import { STAGE_ID } from '../config/constants.js';
import { t, dateLocale } from '../config/strings.js';
import * as state from '../state.js';
import { getTeamName, groupByDate } from '../data/helpers.js';
import { activeMatches } from '../ui/shell.js';
import { buildMatchCard } from './match-detail.js';
import { renderStandings } from './standings.js';
import { renderBracket } from './bracket.js';
import { renderStats } from './stats.js';

// ── Helpers ───────────────────────────────────────────────────

function getTodayHeading() {
    return new Date().toLocaleDateString(dateLocale(), {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        timeZone: 'Asia/Jerusalem'
    });
}

// ── Render matches list ───────────────────────────────────────

export function renderMatches(matches, scrollToToday = false) {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    let filtered = state.activeStageFilter === 'all'
        ? matches
        : matches.filter(m => m.IdStage === STAGE_ID[state.activeStageFilter]);

    if (state.teamSearchQuery) {
        filtered = filtered.filter(m => {
            const home = (getTeamName(m.Home) || m.PlaceHolderA || '').toLowerCase();
            const away = (getTeamName(m.Away) || m.PlaceHolderB || '').toLowerCase();
            return home.includes(state.teamSearchQuery) || away.includes(state.teamSearchQuery);
        });
    }

    if (filtered.length === 0) {
        main.innerHTML = `<div class="error"><div class="error-icon">\uD83D\uDCC5</div>${t('errorNoMatches')}</div>`;
        return;
    }

    const todayHeading = getTodayHeading();
    let todaySection = null;

    const groups = groupByDate(filtered);
    for (const [dateLabel, dayMatches] of groups) {
        const section = document.createElement('section');
        section.className = 'date-group';
        const heading = document.createElement('h2');
        heading.className = 'date-label' + (dateLabel === todayHeading ? ' date-label--today' : '');
        heading.textContent = dateLabel === todayHeading ? `${dateLabel} ${t('standingsToday')}` : dateLabel;
        section.appendChild(heading);
        for (const match of dayMatches) {
            section.appendChild(buildMatchCard(match));
        }
        main.appendChild(section);
        if (dateLabel === todayHeading) todaySection = section;
    }

    if (scrollToToday && todaySection) {
        setTimeout(() => todaySection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
}

// ── Render active tab ─────────────────────────────────────────

export function renderActiveTab() {
    if (state.activeTab === 'matches') renderMatches(activeMatches(), true);
    else if (state.activeTab === 'standings') renderStandings(activeMatches());
    else if (state.activeTab === 'bracket') renderBracket(state.allMatches);
    else if (state.activeTab === 'stats') renderStats(activeMatches());
}
