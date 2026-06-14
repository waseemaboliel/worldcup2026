/**
 * World Cup 2026 PWA — Modular Entry Point (V2)
 *
 * This is the ES module entry point that will eventually replace app.js.
 * Migration is incremental: modules are extracted here while app.js remains
 * the production entry point until all features are ported.
 *
 * Import graph:
 *   main.js
 *   ├── config/  (api, constants, strings)
 *   ├── state.js
 *   ├── data/    (helpers, fetchers)
 *   ├── ui/      (shell)
 *   └── features/
 *       ├── matches/
 *       ├── live/
 *       ├── standings/
 *       ├── bracket/
 *       ├── stats/
 *       └── profiles/
 */

import { t } from './config/strings.js';
import { MATCHES_API } from './config/api.js';
import { STATUS_LIVE, STATUS_FINISHED } from './config/constants.js';
import * as state from './state.js';
import { fetchMatches, fetchIsraelChannels, fetchMatchesAr, fetchEspnIndex } from './data/fetchers.js';
import { fetchTimeline, parseTimeline } from './data/timeline.js';
import { fetchLineup } from './data/lineup.js';
import { fetchEspnLineup, espnLineupCache, MATCH_STAT_KEYS } from './data/espn-lineup.js';
import { buildEspnStatsCache, espnMatchDetailsCache } from './data/espn-stats.js';
import { fetchEspnLiveStats, espnDetailsToEvents } from './data/espn-live.js';
import { fetchLiveScores, startLivePoller, stopLivePoller, hasLiveMatches, maybeStartPoller, initLiveScores } from './data/live-scores.js';
import { eventRow, playerSpan, teamSpan, shortName } from './ui/helpers.js';
import { renderLineup, mergeFieldStatus, lateralSort } from './ui/lineup-pitch.js';
import { bindPlayerLinks, bindTeamLinks, initLinks } from './ui/links.js';
import { buildEventSections } from './ui/event-sections.js';
import {
    showLoading, showError, activeMatches,
    initLangToggle, initTabs, initFilters
} from './ui/shell.js';

// ── Feature modules ───────────────────────────────────────────
import { buildPlayerProfile, openPlayerProfile, openTeamProfile } from './features/profiles.js';
import { renderStats } from './features/stats.js';
import { renderStandings, stopLiveStandingsPoller } from './features/standings.js';
import { renderBracket, initBracket } from './features/bracket.js';
import { toggleCard, buildMatchCard, stopLiveDetailPoller, patchLiveDetail, loadTimeline } from './features/match-detail.js';
import { renderMatches, renderActiveTab } from './features/matches.js';

// ── Dependency Injection wiring ───────────────────────────────
// Inject cross-feature functions to break circular imports.
initLinks({ openPlayerProfile, openTeamProfile });
initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller });
initBracket({ toggleCard, renderMatches });

// ── App init ──────────────────────────────────────────────────

/*
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
*/

// Export for verification / testing
export {
    state,
    renderMatches, renderActiveTab, renderStats, renderStandings, renderBracket,
    buildMatchCard, toggleCard, openPlayerProfile, openTeamProfile,
    stopLiveStandingsPoller, stopLiveDetailPoller,
};
