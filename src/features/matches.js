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

function setupMatchesBackTop() {
    let btn = document.querySelector('.matches-back-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'matches-back-top';
        btn.textContent = '↑';
        btn.addEventListener('click', () => {
            if (state.activeCard) {
                state.activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Scroll to next upcoming match (not finished, not live)
                const cards = document.querySelectorAll('.match-card:not(.match-card--finished):not(.match-card--live)');
                if (cards.length > 0) {
                    cards[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
        document.body.appendChild(btn);
    }
    const onScroll = () => {
        btn.classList.toggle('matches-back-top--visible', window.scrollY > 400);
    };
    window.removeEventListener('scroll', window._matchesScrollHandler);
    window._matchesScrollHandler = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

export function removeMatchesBackTop() {
    const btn = document.querySelector('.matches-back-top');
    if (btn) btn.remove();
    if (window._matchesScrollHandler) {
        window.removeEventListener('scroll', window._matchesScrollHandler);
        window._matchesScrollHandler = null;
    }
}

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
    }

    if (scrollToToday) {
        setTimeout(() => {
            // Find the first upcoming match (not finished, not live)
            const nextCard = main.querySelector('.match-card:not(.match-card--finished):not(.match-card--live)');
            if (nextCard) {
                nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // All matches finished — scroll to the end
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    }

    // Back to top / active match button
    setupMatchesBackTop();
}

// ── Render active tab ─────────────────────────────────────────

export function renderActiveTab() {
    if (state.activeTab !== 'matches') removeMatchesBackTop();
    if (state.activeTab === 'matches') renderMatches(activeMatches(), true);
    else if (state.activeTab === 'standings') renderStandings(activeMatches());
    else if (state.activeTab === 'bracket') renderBracket(state.allMatches);
    else if (state.activeTab === 'stats') renderStats(activeMatches());
}
