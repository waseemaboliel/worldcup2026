/**
 * World Cup 2026 PWA — Modular Entry Point
 *
 * Import graph:
 *   main.js
 *   ├── config/  (api, constants, strings)
 *   ├── state.js
 *   ├── data/    (helpers, fetchers, timeline, lineup, espn-*, live-scores)
 *   ├── ui/      (shell, helpers, lineup-pitch, links, event-sections)
 *   └── features/ (profiles, stats, standings, bracket, match-detail, matches)
 */

import { t } from './config/strings.js';
import * as state from './state.js';
import { fetchMatches, fetchIsraelChannels, fetchMatchesAr, fetchEspnIndex } from './data/fetchers.js';
import { startLivePoller, hasLiveMatches, maybeStartPoller, initLiveScores } from './data/live-scores.js';
import { initLinks } from './ui/links.js';
import {
    showLoading, showError, activeMatches,
    initLangToggle, initTabs, initFilters
} from './ui/shell.js';

// ── Feature modules ───────────────────────────────────────────
import { openPlayerProfile, openTeamProfile } from './features/profiles.js';
import { renderStandings, stopLiveStandingsPoller } from './features/standings.js';
import { renderBracket, initBracket } from './features/bracket.js';
import { toggleCard, buildMatchCard, stopLiveDetailPoller, loadTimeline } from './features/match-detail.js';
import { renderMatches, renderActiveTab } from './features/matches.js';

// ── Dependency Injection wiring ───────────────────────────────
initLinks({ openPlayerProfile, openTeamProfile });
initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller });
initBracket({ toggleCard, renderMatches });

// ── App init ──────────────────────────────────────────────────

async function init() {
    initLangToggle({ renderActiveTab });
    initTabs({ renderActiveTab, renderMatches, stopLiveStandingsPoller, hasLiveMatches, startLivePoller });
    initFilters({ renderMatches });
    showLoading();
    try {
        await Promise.all([
            fetchMatches(),
            fetchIsraelChannels(),
            fetchMatchesAr()
        ]);
        fetchEspnIndex(); // non-blocking
        renderMatches(activeMatches(), true);
        maybeStartPoller();
    } catch (err) {
        console.error(err);
        showError(t('errorMatches'));
    }
}

document.addEventListener('DOMContentLoaded', init);
