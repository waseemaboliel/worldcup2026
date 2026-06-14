import { t, currentLang, setLang } from '../config/strings.js';
import * as state from '../state.js';

// ── Loading / error states ────────────────────────────────────

export function showLoading() {
    document.querySelector('.main').innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      ${t('loadingMatches')}
    </div>`;
}

export function showError(msg) {
    document.querySelector('.main').innerHTML = `
    <div class="error">
      <div class="error-icon">⚠️</div>
      ${msg}
    </div>`;
}

// ── Static string updates (after lang change) ────────────────

export function updateStaticStrings() {
    document.querySelector('.tab[data-tab="matches"]').textContent = t('tabMatches');
    document.querySelector('.tab[data-tab="standings"]').textContent = t('tabStandings');
    document.querySelector('.tab[data-tab="bracket"]').textContent = t('tabBracket');
    document.querySelector('.tab[data-tab="stats"]').textContent = t('tabStats');
    document.querySelector('.chip[data-stage="all"]').textContent = t('chipAll');
    document.querySelector('.chip[data-stage="First Stage"]').textContent = t('chipGroups');
    document.querySelector('.chip[data-stage="Round of 32"]').textContent = t('chipR32');
    document.querySelector('.chip[data-stage="Round of 16"]').textContent = t('chipR16');
    document.querySelector('.chip[data-stage="Quarter-final"]').textContent = t('chipQF');
    document.querySelector('.chip[data-stage="Semi-final"]').textContent = t('chipSF');
    document.querySelector('.chip[data-stage="Final"]').textContent = t('chipFinal');
    document.getElementById('team-search').placeholder = t('searchPlaceholder');
}

// ── Show/hide matches-specific UI ─────────────────────────────

export function showMatchesUI(show) {
    document.getElementById('filters').style.display = show ? 'flex' : 'none';
    document.getElementById('team-search-wrap').style.display = show ? 'block' : 'none';
}

// ── Active matches helper ─────────────────────────────────────

export function activeMatches() {
    return currentLang === 'ar' && state.allMatchesAr.length > 0
        ? state.allMatchesAr
        : state.allMatches;
}

// ── Language, tab & filter initialisation ─────────────────────
// These need renderActiveTab, renderMatches etc. passed in to avoid circular deps.

export function initLangToggle({ renderActiveTab }) {
    applyLang(currentLang, renderActiveTab);
    document.getElementById('lang-toggle').addEventListener('click', e => {
        const btn = e.target.closest('.lang-btn');
        if (!btn) return;
        applyLang(btn.dataset.lang, renderActiveTab);
    });
}

function applyLang(lang, renderActiveTab) {
    setLang(lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
    });
    state.setEspnStatsCache(null); // team names change per language
    updateStaticStrings();
    if (state.allMatches.length > 0) renderActiveTab();
}

export function initTabs({ renderActiveTab, renderMatches, stopLiveStandingsPoller, hasLiveMatches, startLivePoller }) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
            tab.classList.add('tab--active');
            state.setActiveTab(tab.dataset.tab);
            showMatchesUI(state.activeTab === 'matches');
            if (state.activeTab !== 'standings') stopLiveStandingsPoller();
            window.scrollTo({ top: 0, behavior: 'instant' });
            renderActiveTab();
            if (state.activeTab === 'matches' && hasLiveMatches()) startLivePoller();
        });
    });
}

export function initFilters({ renderMatches }) {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
            chip.classList.add('chip--active');
            state.setActiveStageFilter(chip.dataset.stage);
            renderMatches(activeMatches());
        });
    });

    const searchInput = document.getElementById('team-search');
    searchInput.addEventListener('input', () => {
        state.setTeamSearchQuery(searchInput.value.trim().toLowerCase());
        renderMatches(activeMatches());
    });
}
