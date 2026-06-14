# V2 — Code Splitting & Modularization

This document tracks the full V2 migration of the World Cup 2026 PWA from a single monolithic `app.js` (~3,200 lines) + `style.css` (~1,900 lines) into a modular ES-module architecture.

---

## Problem

The app currently lives in a single `app.js` (~3,200 lines) and a single `style.css` (~1,900 lines). This makes it:
- Hard to navigate and find code
- Impossible to tree-shake or lazy-load features
- Difficult for multiple developers to work on simultaneously
- Prone to merge conflicts

## Goals

1. **Split `app.js` into focused ES modules** — each file has one clear responsibility
2. **Split `style.css` into component stylesheets** — each feature has its own CSS
3. **Use native ES modules** (`<script type="module">`) — no bundler required for development
4. **Optional bundler for production** — a simple build step (esbuild or Vite) to bundle for deployment
5. **Zero functionality changes** — pure refactor, everything works exactly the same after

---

## Target File Structure

```
worldcup2026/
├── index.html
├── manifest.json
├── sw.js
├── favicon.ico
├── icons/
│
├── src/
│   ├── main.js                  ← Entry point: imports all modules, calls init()
│   │
│   ├── config/
│   │   ├── api.js               ← API URLs (MATCHES_API, ESPN_INDEX_API, etc.) + LIVE_POLL_MS
│   │   ├── constants.js         ← STAGE_ID, STAGE_LABEL, STATUS_*, FIFA_TO_ALPHA2, TEAM_NAME_HE, ESPN_NAME_MAP, LOCALE_MAP
│   │   ├── strings.js           ← STRINGS object (en/he/ar), t() helper, currentLang, setLang(), dateLocale()
│   │   └── index.js             ← Barrel re-export
│   │
│   ├── state.js                 ← Shared mutable state + setter functions
│   │
│   ├── data/
│   │   ├── helpers.js           ← countryToFlag, getTeamName, normaliseName, normTeam, formatKickoff, formatDateHeading, groupByDate
│   │   ├── fetchers.js          ← fetchMatches, fetchMatchesAr, fetchIsraelChannels, fetchEspnIndex
│   │   ├── timeline.js          ← fetchTimeline, parseTimeline, timelineCache
│   │   ├── lineup.js            ← fetchLineup, parseLineupTeam, lineupCache
│   │   ├── espn-lineup.js       ← fetchEspnLineup, parseEspnRoster, espnLineupCache, MATCH_STAT_KEYS
│   │   ├── espn-stats.js        ← buildEspnStatsCache, espnMatchDetailsCache
│   │   ├── espn-live.js         ← fetchEspnLiveStats, espnDetailsToEvents
│   │   ├── live-scores.js       ← fetchLiveScores, patchLiveCards, start/stop/hasLive/maybeStart poller, initLiveScores
│   │   └── index.js             ← Barrel re-export
│   │
│   ├── ui/
│   │   ├── shell.js             ← showLoading, showError, updateStaticStrings, initLangToggle, initTabs, initFilters, activeMatches
│   │   ├── helpers.js           ← eventRow, playerSpan, teamSpan, shortName
│   │   ├── lineup-pitch.js      ← renderLineup, mergeFieldStatus, lateralSort, pitchHalfHTML, splitIntoRows
│   │   ├── links.js             ← bindPlayerLinks, bindTeamLinks, initLinks
│   │   ├── event-sections.js    ← buildEventSections
│   │   └── index.js             ← Barrel re-export
│   │
│   └── features/
│       ├── profiles.js          ← buildPlayerProfile, openPlayerProfile, openTeamProfile
│       ├── stats.js             ← renderStats, renderPlayerStats, renderTeamStats, leaderboard renderers
│       ├── standings.js         ← computeStandings, computeBestThirds, renderStandings, stopLiveStandingsPoller
│       ├── bracket.js           ← renderBracket, buildBracketCard, initBracket, resolvePlaceholder, bracketGameHTML
│       ├── match-detail.js      ← toggleCard, buildMatchCard, loadTimeline, renderTimeline, live detail, renderMatchStats
│       └── matches.js           ← renderMatches, renderActiveTab, getTodayHeading
│
├── styles/
│   ├── main.css                 ← @import all partials
│   ├── base/
│   │   ├── reset.css
│   │   ├── tokens.css
│   │   └── typography.css
│   ├── layout/
│   │   ├── shell.css
│   │   └── rtl.css
│   ├── components/
│   │   ├── match-card.css
│   │   ├── match-detail.css
│   │   ├── lineup-pitch.css
│   │   ├── standings.css
│   │   ├── bracket.css
│   │   ├── stats.css
│   │   ├── profile.css
│   │   ├── channels.css
│   │   └── live.css
│   └── utilities/
│       ├── animations.css
│       └── scrollbar.css
│
├── DEVLOG.md
├── V2-MIGRATION.md   ← this file
└── README.md
```

---

## Migration Strategy (7 Steps)

### Step 1 — Folder structure + config + state + basic data/UI ✅
- Create `src/` and `styles/` directories with all subdirectories
- Extract pure-data modules: API URLs, constants, strings, state
- Extract basic data helpers (`countryToFlag`, `getTeamName`, `normaliseName`, `normTeam`, `formatKickoff`, `formatDateHeading`, `groupByDate`)
- Extract basic fetchers (`fetchMatches`, `fetchMatchesAr`, `fetchIsraelChannels`, `fetchEspnIndex`)
- Extract UI shell (`showLoading`, `showError`, `initTabs`, `initFilters`, `initLangToggle`, `activeMatches`)
- Keep the existing `app.js` and `style.css` working — nothing breaks

### Step 2 — Extract remaining data-fetching modules (`src/data/`) ✅
- Each fetch function + its cache Map becomes its own module
- `timeline.js`: `fetchTimeline()`, `parseTimeline()`, `timelineCache`
- `lineup.js`: `fetchLineup()`, `parseLineupTeam()`, `lineupCache`
- `espn-lineup.js`: `fetchEspnLineup()`, `parseEspnRoster()`, `espnLineupCache`, `MATCH_STAT_KEYS`
- `espn-stats.js`: `buildEspnStatsCache()`, `espnMatchDetailsCache`
- `espn-live.js`: `fetchEspnLiveStats()`, `espnDetailsToEvents()`
- `live-scores.js`: `fetchLiveScores()`, `patchLiveCards()`, `startLivePoller`, `stopLivePoller`, `hasLiveMatches`, `maybeStartPoller`, `initLiveScores` (DI)

### Step 3 — Extract UI rendering helpers (`src/ui/`) ✅
- `helpers.js`: `eventRow`, `playerSpan`, `teamSpan`, `shortName`
- `lineup-pitch.js`: `renderLineup`, `mergeFieldStatus`, `lateralSort`, `pitchHalfHTML`, `splitIntoRows`
- `links.js`: `bindPlayerLinks`, `bindTeamLinks`, `initLinks` (DI for profile openers)
- `event-sections.js`: `buildEventSections` (shared HTML builder for goals/cards/subs)

### Step 4 — Extract features one by one (`src/features/`) ✅
Extracted the ~50 remaining render functions from `app.js` into 6 feature modules (27 total source files):

**4a — Profiles** (`features/profiles.js`) ✅
- `buildPlayerProfile`, `openPlayerProfile`, `openTeamProfile`
- Dependencies: state (espnStatsCache, espnMatchDetailsCache, espnLiveData), data/helpers, data/espn-lineup, data/espn-stats, config/constants, config/strings

**4b — Stats tab** (`features/stats.js`) ✅
- `renderStats`, `renderPlayerStats`, `renderTeamStats`, `renderTeamLeaderboard`, `renderTeamRows`
- `renderScorers`, `renderAssists`, `renderCleanSheets`, `renderEspnPlayerLeaderboard`
- Constants: `PLAYER_SUBS` (10 entries), `TEAM_SUBS` (12 entries)
- Dependencies: state (activeStatsSection, activePlayerSub, activeTeamSub + setters), data/espn-stats, ui/helpers, ui/links, ui/shell

**4c — Standings** (`features/standings.js`) ✅
- `computeStandings`, `computeBestThirds`, `renderStandings`, `stopLiveStandingsPoller`
- Private: `isGroupStage`, `standingSort`, local `liveStandingsPoller`
- Dependencies: state (espnLiveData, activeTab), data/espn-lineup (espnLineupCache), data/live-scores (hasLiveMatches), ui/helpers (teamSpan), ui/links, ui/shell

**4d — Bracket** (`features/bracket.js`) ✅
- `renderBracket`, `buildBracketCard`, `initBracket` (DI for toggleCard + renderMatches)
- Private: `resolvePlaceholder`, `resolvePlaceholderFlag`, `bracketGameHTML`, `renderBracketR32`, `renderBracketTree`
- Dependencies: state (espnLiveData, activeBracketTab + setter), data/helpers, ui/shell, config/constants, config/strings

**4e — Match detail + live detail** (`features/match-detail.js`) ✅
- `toggleCard`, `buildMatchCard`, `stopLiveDetailPoller`, `loadTimeline`, `patchLiveDetail`
- Private: `buildChannelsRow`, `loadLiveDetail`, `renderLiveDetail`, `buildLiveStatsBar`, `renderTimeline`, `renderMatchStats`
- Dependencies: state (liveDetailPoller, activeCard, israelChannels, allMatches + setters), data/timeline, data/lineup, data/espn-lineup, data/espn-live, ui/helpers, ui/links, ui/event-sections, ui/lineup-pitch, config/api (LIVE_POLL_MS)

**4f — Matches tab** (`features/matches.js`) ✅
- `renderMatches`, `renderActiveTab`
- Private: `getTodayHeading`
- Dependencies: state (activeStageFilter, teamSearchQuery, activeTab, allMatches), data/helpers (getTeamName, groupByDate), features/match-detail, features/standings, features/bracket, features/stats, ui/shell, config/constants (STAGE_ID), config/strings

**DI Wiring in main.js:**
- `initLinks({ openPlayerProfile, openTeamProfile })` — ui/links.js
- `initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller })` — data/live-scores.js
- `initBracket({ toggleCard, renderMatches })` — features/bracket.js

### Step 5 — Wire up entry point + switch over
- Uncomment `init()` in `src/main.js` (already written and correct)
- Remove unused imports from `main.js` (many were imported for verification only)
- In `index.html`: change `<script src="app.js">` to `<script type="module" src="src/main.js">`
- DI wiring is already done (`initLinks`, `initLiveScores`, `initBracket`)
- Verify all tabs work: matches, standings, bracket, stats
- Verify all match states: upcoming, live, finished (with detail panel)
- Verify all 3 languages (EN, HE, AR) including RTL layout
- Verify live polling: score updates, card transitions, detail patching
- Verify profiles: player overlay + team overlay from various entry points
- Once verified: delete `app.js`

### Step 6 — Split CSS
- Create `styles/main.css` with `@import` for each partial
- Move styles methodically: tokens → base → layout → components → utilities
- In `index.html`: change `<link href="style.css">` to `<link href="styles/main.css">`
- Once verified: delete `style.css`

### Step 7 — Verify & clean up
- Final testing: all 3 languages, live/finished/upcoming matches, profiles, bracket
- Update `sw.js` cache list to reference new file paths (`src/` modules, `styles/` partials)
- Bump service worker version (currently `wc2026-v29`)
- Remove empty feature subdirectories (`src/features/matches/`, `standings/`, `bracket/`, `stats/`, `profiles/`, `live/`) — created as scaffolding in Step 1 but we used flat files instead
- Remove any barrel `index.js` files if they're not actually used for convenience imports
- Optional: add esbuild/Vite build step for production bundling
- Optional: move `activeMatches()` from `ui/shell.js` to `state.js` (more logical placement)

### Step 8 — Rebuild README with final architecture ✅
- Completely rewrote `README.md` to reflect the modular architecture
- Full file tree (all 40 source files), data flow diagram, DI explanation
- Install instructions, run locally, deploy workflow, API sources
- Links to DEVLOG.md and V2-MIGRATION.md

---

## Key Principles

1. **No circular dependencies** — data modules never import from feature modules; features import from data + config + ui
2. **One direction of data flow** — state → data → features → DOM
3. **Each file < 300 lines** — if a file grows beyond that, split it further
4. **Named exports only** — makes it obvious what each module provides
5. **No global variables** — everything accessed via imports from `state.js`
6. **CSS follows JS structure** — if there's a `features/bracket/` folder, there's a `styles/components/bracket.css`
7. **Service worker updated last** — only after all files are in their final locations

---

## Step 1 — Completed ✅ (2026-06-15)

### What Was Done

Created the full modular directory structure and extracted the first layer of modules — all pure-data and zero-dependency code that forms the foundation for subsequent feature extraction.

#### Directories Created

```
src/config/
src/data/
src/features/matches/
src/features/live/
src/features/standings/
src/features/bracket/
src/features/stats/
src/features/profiles/
src/ui/
styles/base/
styles/layout/
styles/components/
styles/utilities/
```

#### Files Created (11 modules)

| File | Lines | What It Contains |
|------|-------|-----------------|
| `src/config/api.js` | 9 | All 7 API URL constants (`MATCHES_API`, `MATCHES_API_AR`, `WATCH_API`, `ESPN_INDEX_API`, `TIMELINE_API`, `LINEUP_API`, `ESPN_SUMMARY_API`) + `LIVE_POLL_MS` |
| `src/config/constants.js` | 82 | `FIFA_TO_ALPHA2` (65 country mappings), `TEAM_NAME_HE` (60+ Hebrew team names), `STAGE_LABEL`, `STAGE_ID`, `STATUS_FINISHED`/`STATUS_LIVE`, `LOCALE_MAP`, `ESPN_NAME_MAP` |
| `src/config/strings.js` | 175 | Full `STRINGS` object (en/he/ar — all ~80 keys per language), `currentLang` state variable with `setLang()` setter, `t()` translation helper, `dateLocale()` |
| `src/config/index.js` | 3 | Barrel re-export for convenient `import { ... } from './config/index.js'` |
| `src/state.js` | 47 | All 15 mutable state variables (`allMatches`, `allMatchesAr`, `israelChannels`, `fifaToEspn`, `activeTab`, `activeStageFilter`, `teamSearchQuery`, `activeCard`, `liveDetailPoller`, `activeStatsSection`, `activePlayerSub`, `activeTeamSub`, `espnStatsCache`, `activeBracketTab`, `livePoller`, `espnLiveData`, `liveStandingsPoller`) + 15 setter functions |
| `src/data/helpers.js` | 68 | `countryToFlag`, `getTeamName`, `normaliseName`, `normTeam`, `formatKickoff`, `formatDateHeading`, `groupByDate` |
| `src/data/fetchers.js` | 73 | `fetchMatches`, `fetchIsraelChannels`, `fetchMatchesAr`, `fetchEspnIndex` |
| `src/data/index.js` | 2 | Barrel re-export |
| `src/ui/shell.js` | 100 | `showLoading`, `showError`, `updateStaticStrings`, `showMatchesUI`, `activeMatches`, `initLangToggle`, `initTabs`, `initFilters` |
| `src/ui/index.js` | 1 | Barrel re-export |
| `src/main.js` | 58 | Entry point with architecture documentation, imports from all extracted modules, commented-out `init()` showing how the final wiring will work |

### Challenges Faced

#### 1. ES Module Live Bindings vs Mutable State

**Problem:** In ES modules, `export let x = 5` creates a live binding — but the importing module can only read it, never write it. Our app has ~15 mutable state variables that are read and written from many places (e.g. `allMatches` is set in `init()`, read in `renderMatches()`, `renderStandings()`, `renderBracket()`, `fetchEspnIndex()`, etc.).

**Solution:** Created explicit setter functions for every state variable (e.g. `setAllMatches(v)`). When a module needs to update state, it calls the setter. When reading, it imports the variable directly — ES live bindings ensure it always gets the latest value. This is the idiomatic pattern for mutable shared state in ES modules without introducing a framework.

#### 2. `currentLang` — State or Config?

**Problem:** `currentLang` is both a config-like value (determines which strings to use) and mutable state (changes on language switch). Putting it in `state.js` would create a circular dependency because `strings.js` needs it for `t()`, but `state.js` would need `strings.js` for nothing. Putting it in `strings.js` makes the config module stateful.

**Decision:** Kept `currentLang` in `strings.js` alongside `t()` since they are inseparable — `t()` reads `currentLang` on every call. Exposed `setLang()` for mutation. The `state.js` module does NOT own this variable. `ui/shell.js` calls `setLang()` when the user switches language.

#### 3. Circular Dependency Risk: `data/fetchers.js` ↔ `state.js`

**Problem:** `fetchEspnIndex()` needs to READ `state.allMatches` (to match FIFA matches to ESPN events) and WRITE to `state.fifaToEspn`. Meanwhile `state.js` just holds data — but if we're not careful, a future module could import from both and create cycles.

**Solution:** `data/fetchers.js` imports from `state.js` (one direction only). `state.js` has zero imports — it's a leaf node in the dependency graph. This guarantees no circular dependencies as long as we maintain the rule: state never imports from data/features/ui.

#### 4. `normaliseName` Regex Discrepancy

**Problem:** The original `app.js` used a character class `/[̀-ͯ]/g` to strip combining diacritical marks. This works but is hard to read and fragile across editors (invisible Unicode characters). During extraction, needed to ensure the regex survived copy correctly.

**Solution:** Replaced with the standard Unicode range `[\u0300-\u036f]` (Combining Diacritical Marks block) which is semantically identical, more readable, and editor-safe. Verified with test cases (Türkiye → turkey, Raúl → raul).

#### 5. Deciding What Goes Where: `getTeamName` Uses Both Config and State

**Problem:** `getTeamName(team)` reads `currentLang` (from strings.js) and `TEAM_NAME_HE` (from constants.js). It's a helper function, but it depends on runtime language state. Should it live in `config/`, `data/`, or `ui/`?

**Decision:** Placed in `src/data/helpers.js` — it's a data-transformation function (takes a team object, returns a string). It imports from config modules (one-directional). It doesn't touch the DOM, so it doesn't belong in `ui/`. It doesn't fetch anything, so it's not a "fetcher". Helper is the right classification.

#### 6. Shell UI Functions Need Feature Functions (Circular Risk)

**Problem:** `initTabs()` needs to call `renderActiveTab()`, which calls `renderMatches()`, `renderStandings()`, `renderBracket()`, `renderStats()`. If `ui/shell.js` imports from feature modules, and feature modules import from `ui/`, we get a cycle.

**Solution:** Used dependency injection — `initTabs()`, `initLangToggle()`, and `initFilters()` accept their dependencies as a parameter object:
```js
export function initTabs({ renderActiveTab, renderMatches, stopLiveStandingsPoller, hasLiveMatches, startLivePoller }) { ... }
```
The wiring happens in `main.js`, which is the only module that knows about everything. This keeps `ui/shell.js` completely decoupled from features.

#### 7. Node Syntax Checking for Browser ES Modules

**Problem:** Needed to verify all extracted modules have valid syntax, but Node.js defaults to CommonJS and rejects `export` keywords without `"type": "module"` in `package.json`.

**Solution:** Temporarily created `src/package.json` with `{ "type": "module" }`, ran `node --check` on all files, then removed the file. All 11 modules passed syntax validation. The actual app runs in the browser where ES modules work natively via `<script type="module">`.

### Current State

- **`app.js` remains the production entry point** — nothing is broken, the app works exactly as before
- **`src/` contains the extracted module layer** — ready to be incrementally wired in
- **Next step (Step 2)** will extract the remaining data-fetching modules (`timeline.js`, `lineup.js`, `espn-lineup.js`, `espn-stats.js`, `espn-live.js`) and begin extracting feature rendering logic

### Module Dependency Graph (Current)

```
src/main.js
├── src/config/api.js          (no deps)
├── src/config/constants.js    (no deps)
├── src/config/strings.js      ← imports constants.js (for LOCALE_MAP)
├── src/state.js               (no deps — leaf node)
├── src/data/helpers.js        ← imports config/constants + config/strings
├── src/data/fetchers.js       ← imports config/api + state + data/helpers
└── src/ui/shell.js            ← imports config/strings + state
```

No circular dependencies. All arrows point downward.

---

## Step 2 — Completed ✅ (2026-06-15)

### What Was Done

Extracted all remaining data-fetching modules from `app.js` — every function that talks to an API or manages a data cache now lives in its own module under `src/data/`. This is the heaviest extraction step since it involves complex async logic, caching Maps, and inter-module references.

#### Files Created (6 modules)

| File | Lines | What It Contains |
|------|-------|-----------------|
| `src/data/timeline.js` | 74 | `timelineCache` Map, `fetchTimeline()` (with cache bypass for live), `parseTimeline()` (extracts goals/cards/subs from FIFA event array, handles OGs, penalties, HT subs) |
| `src/data/lineup.js` | 42 | `lineupCache` Map, `parseLineupTeam()` (FIFA player structure → normalized object), `fetchLineup()` (with cache bypass) |
| `src/data/espn-lineup.js` | 107 | `espnLineupCache` Map, `MATCH_STAT_KEYS` array (16 stat keys), `parseEspnRoster()` (ESPN position abbreviation → FIFA-style integer bucket, formation sorting), `fetchEspnLineup()` (fetches summary, parses rosters + boxscore stats + leaders) |
| `src/data/espn-stats.js` | 105 | `espnMatchDetailsCache` Map, `buildEspnStatsCache()` (batches all finished match summaries via `Promise.allSettled`, aggregates per-player stats + per-team stats, tracks GK clean sheets) |
| `src/data/espn-live.js` | 64 | `fetchEspnLiveStats()` (fetches scoreboard, extracts live possession/shots/clock/details for a single match), `espnDetailsToEvents()` (converts ESPN detail objects into standardized goal/card format) |
| `src/data/live-scores.js` | 157 | `fetchLiveScores()` (global poller tick — updates espnLiveData, flips match status, handles end-of-match), `patchLiveCards()` (DOM patching for live scores/clocks/Starting Soon/Match Ended), `startLivePoller()`, `stopLivePoller()`, `hasLiveMatches()`, `maybeStartPoller()`, `initLiveScores()` (DI setup) |

#### Also Updated

| File | Change |
|------|--------|
| `src/data/index.js` | Barrel re-export now includes all 8 data modules |
| `src/main.js` | Updated imports to include all new data modules; updated commented-out feature section |
| `V2-MIGRATION.md` | Merged old Steps 1-3 (already done) and renumbered to 7 total steps |

### Challenges Faced

#### 1. `live-scores.js` Depends on Feature-Level Functions

**Problem:** `fetchLiveScores()` calls `buildMatchCard(m)` (to replace cards when state changes) and `loadTimeline(m, detail)` (to re-render a finished match detail). These are feature-rendering functions that haven't been extracted yet. If `live-scores.js` imports from `features/`, and `features/` later imports from `data/`, we'd get a circular dependency.

**Solution:** Used the dependency injection pattern — `live-scores.js` exports an `initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller })` function. The entry point (`main.js`) will call this once during init, passing in the actual feature functions. Until then, the module guards all calls with null checks (`if (_buildMatchCard) ...`).

#### 2. `espn-stats.js` Depends on `espn-lineup.js` (Same Layer)

**Problem:** `buildEspnStatsCache()` calls `fetchEspnLineup(m)` for every finished match and reads from `espnLineupCache`. Both live in `src/data/`. Is this a problem?

**Solution:** No — intra-layer imports are fine as long as there's no *cycle*. `espn-lineup.js` has no imports from `espn-stats.js`, so the dependency is one-directional: `espn-stats → espn-lineup`. This is acceptable and intentional — the stats cache is built on top of the lineup data.

#### 3. `fetchEspnLiveStats` Uses `fifaToEspn` from State

**Problem:** `fetchEspnLiveStats(match)` needs `fifaToEspn.get(match.IdMatch)` to find the ESPN event ID. The `fifaToEspn` Map is in `state.js`. But `state.js` is a leaf node (no imports) — so importing from it is safe.

**Decision:** Import `{ fifaToEspn }` directly from `state.js`. Since `fifaToEspn` is a `const Map` (the reference never changes, only the contents), ES module live binding isn't needed — the imported reference always points to the same Map object.

#### 4. Reverse Lookup Pattern in `fetchLiveScores`

**Problem:** `fetchLiveScores` needs to find the FIFA match ID for a given ESPN event ID. The `fifaToEspn` Map is keyed FIFA→ESPN, so the reverse lookup uses `[...fifaToEspn.entries()].find(...)`. This is O(n) per event.

**Decision:** Kept as-is for now. With max 104 matches it's negligible (< 1ms per tick). If performance becomes an issue, a reverse `espnToFifa` Map can be added to `state.js` in a future optimization step.

#### 5. `parseTimeline` — Extracted to `timeline.js` or Stays in Features?

**Problem:** `parseTimeline()` is called from both `renderTimeline()` (match detail feature) and `renderLiveDetail()` (live feature). It's a data-transformation function that takes raw FIFA events and returns structured objects. Should it live in `data/` or `features/`?

**Decision:** Placed in `src/data/timeline.js` alongside `fetchTimeline()`. It's a pure function that transforms API data into a normalized format — this is clearly a data concern, not a rendering concern. Both features import from it.

#### 6. `MATCH_STAT_KEYS` — Config or Data?

**Problem:** The `MATCH_STAT_KEYS` array defines which ESPN stat keys to show in the match stats bar. It's used by rendering functions (`renderMatchStatsPanel`, `buildLiveStatsBar`). Is it configuration or data?

**Decision:** Placed in `src/data/espn-lineup.js` since it's tightly coupled with the ESPN data format (the keys are ESPN-specific stat names). It's exported so feature modules can import it for rendering. It could also live in `config/constants.js`, but keeping it near the ESPN parsing code makes it easier to update if ESPN changes their stat names.

### Current State

- **17 total source files** in `src/` (up from 11)
- **All data-fetching logic extracted** — timeline, lineup, ESPN lineup, ESPN stats, ESPN live, live polling
- **`app.js` remains the production entry point** — still fully functional
- **Next step (Step 3)** will extract UI helpers and begin feature module extraction

### Module Dependency Graph (Updated)

```
src/main.js
├── src/config/api.js              (no deps)
├── src/config/constants.js        (no deps)
├── src/config/strings.js          ← config/constants
├── src/state.js                   (no deps — leaf node)
│
├── src/data/helpers.js            ← config/constants + config/strings
├── src/data/fetchers.js           ← config/api + state + data/helpers
├── src/data/timeline.js           ← config/api + config/strings
├── src/data/lineup.js             ← config/api
├── src/data/espn-lineup.js        ← config/api + state
├── src/data/espn-stats.js         ← config/api + config/constants + state + data/helpers + data/espn-lineup
├── src/data/espn-live.js          ← config/api + state
├── src/data/live-scores.js        ← config/api + config/constants + config/strings + state
│
└── src/ui/shell.js                ← config/strings + state
```

No circular dependencies. All data modules depend only on config + state (downward). `espn-stats` → `espn-lineup` is the only intra-layer dependency (one-directional).

---

## Step 3 — Completed ✅ (2026-06-15)

### What Was Done

Extracted all UI helper functions and rendering utilities from `app.js` into focused modules under `src/ui/`. This includes DOM-generating helpers, the lineup/pitch renderer, player/team link binding, and the shared event-sections builder used by both match detail and live detail views.

#### Files Created (4 modules)

| File | Lines | What It Contains |
|------|-------|-----------------|
| `src/ui/helpers.js` | 46 | `eventRow()` (RTL-aware match event row), `playerSpan()` (clickable player name wrapper), `teamSpan()` (clickable team name wrapper), `shortName()` (full name → last name) |
| `src/ui/lineup-pitch.js` | 168 | `lateralSort()`, `splitIntoRows()`, `pitchHalfHTML()` (generates half-pitch formation), `mergeFieldStatus()` (merges FIFA live sub status into ESPN data), `renderLineup()` (full lineup section as DOM element with pitch + subs) |
| `src/ui/links.js` | 40 | `initLinks()` (DI setup), `bindPlayerLinks()` (attaches click handlers for player profiles), `bindTeamLinks()` (attaches click handlers for team profiles) |
| `src/ui/event-sections.js` | 55 | `buildEventSections()` (shared HTML builder for goals/cards/subs sections — used by both finished-match detail and live-match detail patching) |

#### Also Updated

| File | Change |
|------|--------|
| `src/ui/index.js` | Barrel now re-exports all 5 UI modules (shell + 4 new) |
| `src/main.js` | Added imports for all new UI exports; updated feature placeholder comments to reference Step 4 |

### Challenges Faced

#### 1. `bindPlayerLinks` / `bindTeamLinks` Depend on Profile Feature Functions

**Problem:** `bindPlayerLinks()` calls `openPlayerProfile()`, and `bindTeamLinks()` calls `openTeamProfile()`. These are feature-level functions that will be extracted in Step 4. Importing them directly from `ui/links.js` would create a circular dependency: `features/ → ui/ → features/`.

**Solution:** Same DI pattern used in `live-scores.js` — created `initLinks({ openPlayerProfile, openTeamProfile })` that accepts the feature functions at startup. The link handlers guard with null checks until `main.js` wires them in. This keeps the UI layer completely decoupled from features.

#### 2. `renderLineup` Generates DOM Elements (Not Just HTML Strings)

**Problem:** Unlike the other UI helpers that return HTML strings, `renderLineup()` creates actual DOM elements via `document.createElement()`. This means it can't be used in a non-browser environment (Node.js) without a DOM polyfill.

**Decision:** This is fine — the app is browser-only. `renderLineup()` returns a `div.lineup-section` element that gets appended to the match detail panel. Keeping it as a DOM element (rather than innerHTML) avoids re-parsing complex nested HTML and allows `replaceWith()` for live updates.

#### 3. `pitchHalfHTML` / `lateralOrder` / `splitIntoRows` — Private vs Exported

**Problem:** These are internal implementation details of the pitch renderer. Should they be exported?

**Decision:** Only `lateralSort`, `mergeFieldStatus`, and `renderLineup` are exported (they're used by other modules). `pitchHalfHTML`, `lateralOrder`, and `splitIntoRows` are module-private — they're not exported since nothing outside `lineup-pitch.js` needs them. This keeps the public API surface small.

#### 4. `buildEventSections` — UI Module or Feature Module?

**Problem:** `buildEventSections()` is called from both `renderTimeline()` (finished match detail) and `renderLiveDetail()` / `patchLiveDetail()` (live match detail). It generates pure HTML. Should it live in `ui/` or in `features/matches/`?

**Decision:** Placed in `src/ui/event-sections.js`. It's a generic HTML builder that knows nothing about where events come from (could be FIFA timeline or ESPN details). It takes pre-parsed data (goals/cards/subs arrays) and produces HTML. This makes it reusable across both match detail and live detail features without either depending on the other.

#### 5. Import Direction: `ui/lineup-pitch.js` Imports from `data/helpers.js`

**Problem:** `renderLineup()` calls `countryToFlag()` and `getTeamName()` from `data/helpers.js`. This means the UI layer imports from the data layer. Is this an architectural violation?

**Decision:** No — the architectural rule is "no circular dependencies" and "data never imports from features/UI". The direction here is `ui/ → data/helpers` which is fine. `data/helpers.js` is a leaf utility module (flags, names, dates). Many layers need these utilities. The restriction is only that data-fetching modules (`fetchers.js`, `timeline.js`, etc.) never import from `ui/` or `features/`.

### Current State

- **21 total source files** in `src/` (up from 17)
- **All reusable UI utilities extracted** — event rows, player/team links, lineup pitch, event sections
- **`app.js` remains the production entry point** — still fully functional
- **Next step (Step 4)** will extract feature modules (profiles, stats, standings, bracket, matches, live)

### Module Dependency Graph (Updated)

```
src/main.js
├── src/config/api.js              (no deps)
├── src/config/constants.js        (no deps)
├── src/config/strings.js          ← config/constants
├── src/state.js                   (no deps — leaf node)
│
├── src/data/helpers.js            ← config/constants + config/strings
├── src/data/fetchers.js           ← config/api + state + data/helpers
├── src/data/timeline.js           ← config/api + config/strings
├── src/data/lineup.js             ← config/api
├── src/data/espn-lineup.js        ← config/api + state
├── src/data/espn-stats.js         ← config/api + config/constants + state + data/helpers + data/espn-lineup
├── src/data/espn-live.js          ← config/api + state
├── src/data/live-scores.js        ← config/api + config/constants + config/strings + state
│
├── src/ui/shell.js                ← config/strings + state
├── src/ui/helpers.js              ← config/strings
├── src/ui/lineup-pitch.js         ← config/strings + data/helpers + ui/helpers
├── src/ui/links.js                ← state
└── src/ui/event-sections.js       ← config/strings + ui/helpers
```

No circular dependencies. UI modules import from config/state/data (downward only). No module imports from features yet.

---

## Step 4 — Completed ✅ (2026-06-15)

### What Was Done

Extracted all ~50 remaining feature-rendering functions from `app.js` into 6 focused feature modules under `src/features/`. This is the largest extraction step — it covers every tab's render logic, match card construction, match detail (timeline + live), bracket visualization, standings computation, player/team leaderboards, and profile overlays. After this step, every function that was in `app.js` now exists as a properly-scoped ES module.

#### Files Created (6 modules)

| File | Lines | What It Contains |
|------|-------|-----------------|
| `src/features/profiles.js` | 257 | `buildPlayerProfile()` (aggregates stats from espnStatsCache + per-match events from espnMatchDetailsCache + assists from espnLineupCache), `openPlayerProfile()` (async — ensures ESPN cache, builds profile, renders overlay with stats grid + match history), `openTeamProfile()` (filters team's matches, computes W/D/L/GF/GA record, renders overlay with match rows showing scores + live badges + stage labels) |
| `src/features/stats.js` | 362 | `renderStats()` (main entry — player/team section tabs), `renderPlayerStats()` (sub-tabs for 10 categories), `renderTeamStats()` (sub-tabs for 12 categories), `renderTeamLeaderboard()` (FIFA-computed: goals/conceded/clean per game; ESPN-computed: possession/shots/passes/tackles/etc.), `renderTeamRows()` (generic leaderboard row renderer), `renderScorers()`, `renderAssists()`, `renderCleanSheets()`, `renderEspnPlayerLeaderboard()` (generic ESPN player stat leaderboard). Constants: `PLAYER_SUBS` (10 entries), `TEAM_SUBS` (12 entries) |
| `src/features/standings.js` | 183 | `computeStandings()` (groups matches by IdGroup, accumulates results + live scores + ESPN card data, sorts by FIFA tiebreaker chain), `computeBestThirds()` (selects top 8 3rd-place teams), `renderStandings()` (renders all group tables with qualify/qualify-third/live row classes, starts 15s auto-refresh poller when live matches exist), `stopLiveStandingsPoller()`. Private: `isGroupStage()`, `standingSort()` |
| `src/features/bracket.js` | 376 | `renderBracket()` (R32 list tab + visual tree tab, managed via activeBracketTab state), `buildBracketCard()` (full match card for knockout games — handles finished/live/upcoming states + PSO display), `initBracket()` (DI for toggleCard + renderMatches). Private: `resolvePlaceholder()` (recursive — resolves W73/1A/2B/3ABCDF to team names or descriptive labels), `resolvePlaceholderFlag()`, `bracketGameHTML()` (mini game card for tree view), `renderBracketR32()`, `renderBracketTree()` (R16→QF→SF→Final with connector columns + clickable navigation to matches tab) |
| `src/features/match-detail.js` | 553 | `toggleCard()` (expand/collapse match detail panel, manages activeCard state), `buildMatchCard()` (main match card — finished/live/upcoming variants, channels row, team links), `stopLiveDetailPoller()`, `loadTimeline()` (parallel fetch: timeline + lineup + ESPN lineup + ESPN live stats), `patchLiveDetail()` (incremental DOM patching for live events/stats/lineup). Private: `buildChannelsRow()`, `loadLiveDetail()` (initial fetch + starts 10s polling interval), `renderLiveDetail()` (live stats bar + event sections + lineup), `buildLiveStatsBar()` (RTL-aware stat bars with percentages), `renderTimeline()` (finished match — attendance, goals/cards/subs sections, match stats panel, lineup pitch), `renderMatchStats()` (post-match stats bars from ESPN boxscore + top performers from leaders) |
| `src/features/matches.js` | 73 | `renderMatches()` (filters by stage + team search, groups by date, builds cards, scrolls to today), `renderActiveTab()` (dispatches to the active tab's renderer). Private: `getTodayHeading()` |

#### Also Updated

| File | Change |
|------|--------|
| `src/main.js` | Added imports from all 6 feature modules; added DI wiring calls (`initLinks`, `initLiveScores`, `initBracket`); updated exports for verification/testing; updated init() placeholder |
| `V2-MIGRATION.md` | Step 4 summary section (expanded below with this detailed writeup) |

### Dependency Injection Wiring

Three DI injection points in `main.js` resolve cross-feature circular dependencies:

```js
// ui/links.js needs profile openers (features → ui would be circular)
initLinks({ openPlayerProfile, openTeamProfile });

// data/live-scores.js needs feature functions for card rebuilding on state transitions
initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller });

// features/bracket.js needs toggleCard (from match-detail) + renderMatches (from matches)
initBracket({ toggleCard, renderMatches });
```

### Challenges Faced

#### 1. `match-detail.js` Exceeds 300-Line Guideline (553 lines)

**Problem:** The match detail module contains both finished-match rendering (`renderTimeline`, `renderMatchStats`) and live-match rendering (`loadLiveDetail`, `renderLiveDetail`, `buildLiveStatsBar`, `patchLiveDetail`). Together with `toggleCard` and `buildMatchCard`, it's 553 lines — exceeding our 300-line guideline.

**Decision:** Kept as a single module for now. The functions are tightly coupled — `toggleCard` dispatches to either `loadTimeline` or `loadLiveDetail`, both of which share `renderLineup`, `buildChannelsRow`, and the ESPN data pipeline. Splitting would create many cross-imports between the two files with no real decoupling benefit. If it grows further during maintenance, splitting into `match-card.js` + `match-timeline.js` + `live-detail.js` remains straightforward since all functions are already well-scoped.

#### 2. Bracket Tree Click Navigates to Matches Tab (Cross-Feature Interaction)

**Problem:** When clicking a finished/live game in the bracket tree, the app should switch to the Matches tab, scroll to that match, and expand its detail. This requires calling `renderMatches()` (from matches.js), modifying `activeTab` state, and triggering DOM interactions.

**Solution:** Used DI — `initBracket({ toggleCard, renderMatches })` injects these functions. The bracket tree click handler then calls `state.setActiveTab('matches')`, directly manipulates tab UI classes, calls `showMatchesUI(true)`, and uses the injected `_renderMatches()`. A 100ms `setTimeout` ensures the card is rendered before programmatic click/scroll.

#### 3. `buildMatchCard` Calls `isGroupStage()` — Where Does It Live?

**Problem:** `buildMatchCard()` needs `isGroupStage(match)` to determine whether to show group name or stage badge. But `isGroupStage` is also used by `computeStandings()` in `standings.js`. Should it be shared?

**Decision:** Each module uses its own inline check (`match.IdStage === '289273'`). The function is a one-liner so there's no DRY violation worth extracting. `standings.js` keeps its private `isGroupStage()` helper, and `match-detail.js` does the inline check directly. If the stage ID ever changes, it's in `config/constants.js` anyway (as part of `STAGE_ID`).

#### 4. `liveDetailPoller` — State Variable vs Module-Local

**Problem:** The live detail poller interval ID was a module-local `let` in the original `app.js`. In the modular architecture, `stopLiveDetailPoller()` is called from multiple places: from `toggleCard()` (same module), from `live-scores.js` (via DI when a match ends), and from `initTabs()` (via DI when switching tabs). If the interval ID is module-local in `match-detail.js`, the DI'd `stopLiveDetailPoller` function closure captures the right variable. But we also store it in `state.js` for consistency.

**Decision:** Used `state.liveDetailPoller` + `state.setLiveDetailPoller()` — this keeps it consistent with the other pollers (`livePoller`, `liveStandingsPoller`) that are already in state. The exported `stopLiveDetailPoller()` reads/writes via state, so any module that calls it (directly or via DI) will correctly clear the interval.

#### 5. `features/matches.js` Imports from Other Features (Is This OK?)

**Problem:** `renderActiveTab()` in `matches.js` calls `renderStandings()`, `renderBracket()`, `renderStats()`. This means one feature module imports from three others. Is this an architectural concern?

**Decision:** This is fine and intentional. `matches.js` is the "tab dispatcher" — it's the coordination layer that knows which tab to render. The alternative (putting `renderActiveTab` in `main.js`) would be functionally equivalent but less organized. The rule is "no circular deps" — and there are none: standings/bracket/stats never import from matches. The dependency is one-directional: `matches → {standings, bracket, stats}`.

#### 6. Stats Module Uses `activeMatches()` from `ui/shell.js` (Layer Violation?)

**Problem:** `renderScorers()` and other stats renderers call `bindPlayerLinks(list, activeMatches())`. `activeMatches()` is defined in `ui/shell.js`. This means a feature imports from UI. Is this a problem?

**Decision:** `activeMatches()` is a data-selection helper (returns the right match array based on language) that happened to be placed in `shell.js` during Step 1 because it was alongside `initLangToggle`. It could be argued it belongs in `state.js` or `data/helpers.js`. For now, the import direction `features/ → ui/shell` is allowed — it doesn't create a cycle because `shell.js` never imports from features. If this bothers us later, `activeMatches()` can be moved to `state.js`.

#### 7. `bracket.js` Also Exceeds Guidelines (376 lines)

**Problem:** The bracket module handles both the R32 card list and the visual bracket tree, plus all the placeholder resolution logic.

**Decision:** Acceptable for now. The R32/tree views share `resolvePlaceholder`, `resolvePlaceholderFlag`, and `buildBracketCard`. Splitting would require exporting these helpers and creating imports between sub-files. The module is self-contained and cohesive — all functions serve the bracket tab. Left as-is unless it grows.

### Current State

- **27 total source files** in `src/` (up from 21)
- **All feature-rendering logic extracted** — every function from `app.js` now exists as a proper ES module export
- **`app.js` remains the production entry point** — still fully functional, nothing is broken
- **`main.js` has full import graph** — all modules imported, DI wired, init() ready to be uncommented
- **Next step (Step 5)** will uncomment `init()`, switch `index.html` to use `src/main.js`, and delete `app.js`

### Module Dependency Graph (Final)

```
src/main.js                        ← orchestrates everything
│
├── src/config/api.js              (no deps)
├── src/config/constants.js        (no deps)
├── src/config/strings.js          ← config/constants
├── src/state.js                   (no deps — leaf node)
│
├── src/data/helpers.js            ← config/constants + config/strings
├── src/data/fetchers.js           ← config/api + state + data/helpers
├── src/data/timeline.js           ← config/api + config/strings
├── src/data/lineup.js             ← config/api
├── src/data/espn-lineup.js        ← config/api + state
├── src/data/espn-stats.js         ← config/api + config/constants + state + data/helpers + data/espn-lineup
├── src/data/espn-live.js          ← config/api + state
├── src/data/live-scores.js        ← config/api + config/constants + config/strings + state (+ DI from features)
│
├── src/ui/shell.js                ← config/strings + state
├── src/ui/helpers.js              ← config/strings
├── src/ui/lineup-pitch.js         ← config/strings + data/helpers + ui/helpers
├── src/ui/links.js                ← state (+ DI from features)
├── src/ui/event-sections.js       ← config/strings + ui/helpers
│
├── src/features/profiles.js       ← config/constants + config/strings + state + data/helpers + data/espn-lineup + data/espn-stats (espnMatchDetailsCache)
├── src/features/stats.js          ← config/constants + config/strings + state + data/espn-stats + ui/helpers + ui/links + ui/shell
├── src/features/standings.js      ← config/constants + config/strings + state + data/helpers + data/espn-lineup + data/live-scores + ui/helpers + ui/links + ui/shell
├── src/features/bracket.js        ← config/constants + config/strings + state + data/helpers + ui/shell (+ DI from features)
├── src/features/match-detail.js   ← config/api + config/constants + config/strings + state + data/timeline + data/lineup + data/espn-lineup + data/espn-live + ui/helpers + ui/links + ui/event-sections + ui/lineup-pitch
└── src/features/matches.js        ← config/constants + config/strings + state + data/helpers + ui/shell + features/match-detail + features/standings + features/bracket + features/stats
```

No circular dependencies. Three DI injection points break the only potential cycles:
- `ui/links` ← features/profiles (via `initLinks`)
- `data/live-scores` ← features/match-detail (via `initLiveScores`)
- `features/bracket` ← features/match-detail + features/matches (via `initBracket`)

---

## Step 5 — Completed ✅ (2026-06-15)

### What Was Done

Switched the production entry point from the monolithic `app.js` to the modular `src/main.js`. Removed `app.js`, cleaned up scaffolding (empty directories, unused barrel files), and updated the service worker to cache all new module files.

#### Changes Made

| File | Change |
|------|--------|
| `src/main.js` | Uncommented `init()`, removed unused verification imports, removed commented-out code. Now a clean 54-line production entry point |
| `index.html` | Changed `<script src="app.js">` to `<script type="module" src="src/main.js">`; changed SW registration from absolute `/worldcup2026/sw.js` to relative `sw.js`; replaced deprecated `apple-mobile-web-app-capable` meta with `mobile-web-app-capable` |
| `sw.js` | Bumped cache version `wc2026-v29` → `wc2026-v30`; replaced `app.js` with all 24 module files in SHELL; changed all paths from absolute (`/worldcup2026/...`) to relative (`./...`) |
| `src/features/profiles.js` | Fixed import — `espnMatchDetailsCache` now imported from `data/espn-stats.js` (where it's populated) instead of reading empty Map from `state.js` |
| `src/state.js` | Removed dead `espnMatchDetailsCache` export (was never populated) |
| `app.js` | **Deleted** — all 3,200 lines now live in 24 focused module files |

#### Cleanup

| Removed | Reason |
|---------|--------|
| `src/config/index.js` | Barrel re-export never used — modules import directly |
| `src/data/index.js` | Same |
| `src/ui/index.js` | Same |
| `src/features/matches/` (empty dir) | Scaffolding from Step 1 — we used flat files |
| `src/features/live/` (empty dir) | Same |
| `src/features/standings/` (empty dir) | Same |
| `src/features/bracket/` (empty dir) | Same |
| `src/features/stats/` (empty dir) | Same |
| `src/features/profiles/` (empty dir) | Same |

### How the App Runs Now

**GitHub Pages (production):**
- `index.html` loads `<script type="module" src="src/main.js">`
- Browser fetches `main.js`, follows all `import` statements, loads the full module tree
- Service worker pre-caches all 24 modules + static assets for offline PWA support
- Zero configuration — GitHub Pages serves static files, browser handles ES modules natively

**Local development:**
- ES modules require an HTTP server (they don't work via `file://` due to CORS)
- Run: `python3 -m http.server 8080` (built into macOS)
- Or: `npx serve` (if Node.js is available)
- Open: `http://localhost:8080`

### Challenges Faced

#### 1. `init()` DI Parameters Differ from Original `app.js`

**Problem:** The original `app.js` init calls `initLangToggle()`, `initTabs()`, `initFilters()` with no arguments because they used closures over global variables. Our modular version needs to pass rendering functions as DI parameters to avoid circular imports.

**Solution:** The shell functions already accept DI params (designed in Steps 1-3):
```js
initLangToggle({ renderActiveTab });
initTabs({ renderActiveTab, renderMatches, stopLiveStandingsPoller, hasLiveMatches, startLivePoller });
initFilters({ renderMatches });
```

#### 2. Service Worker Paths — Relative Instead of Absolute

**Problem:** GitHub Pages serves this repo at `/worldcup2026/` (not root). Originally the SW SHELL paths used absolute paths with this prefix (`/worldcup2026/index.html`). This caused `Cache.addAll()` failures on localhost because those paths don't exist at root.

**Solution:** Changed all SHELL paths to relative (`./index.html`, `./src/main.js`, etc.) and the SW registration in `index.html` to `navigator.serviceWorker.register('sw.js')` (relative). Since `sw.js` sits at the project root, relative paths resolve correctly on both:
- **Localhost:** `./index.html` → `http://localhost:8080/index.html`
- **GitHub Pages:** `./index.html` → `https://...github.io/worldcup2026/index.html`

The SW scope defaults to the script's directory, so it automatically scopes to `/worldcup2026/` on GitHub Pages.

#### 3. Removing Unused Imports

**Problem:** `main.js` had imports from every module for "verification/testing" during Steps 1-4. These added unnecessary module evaluation overhead at startup.

**Decision:** Removed all imports that aren't actually used in `init()` or the DI wiring. The module tree is still fully loaded because features import from data/ui modules internally — we just don't need to re-import them at the top level. Final `main.js` is 54 lines with only the imports it actually uses.

#### 4. Barrel `index.js` Files — Keep or Remove?

**Problem:** Three barrel re-export files existed (`config/index.js`, `data/index.js`, `ui/index.js`). No module in the project actually imports from them — every import uses direct paths like `'./config/strings.js'`.

**Decision:** Removed all three. Direct imports are clearer (you can see exactly which module provides what) and don't add hidden re-export layers. If we ever add a bundler, tree-shaking handles this regardless.

#### 5. Duplicate `espnMatchDetailsCache` — Bug Fix

**Problem:** Two separate `new Map()` instances existed: one in `state.js` (never populated) and one in `data/espn-stats.js` (actually filled with goal/card data from ESPN scoreboard). `features/profiles.js` was reading from `state.espnMatchDetailsCache` — which was always empty. Result: player profile "Tournament Events" section never showed goals or cards (assists still worked because they come from `espnLineupCache`, which was correctly imported).

**Fix:** Changed `profiles.js` to import `espnMatchDetailsCache` directly from `data/espn-stats.js` (where data is actually written). Removed the dead Map from `state.js`.

#### 6. Deprecated `apple-mobile-web-app-capable` Meta Tag

**Problem:** Chrome console warning: `<meta name="apple-mobile-web-app-capable" content="yes">` is deprecated.

**Fix:** Replaced with `<meta name="mobile-web-app-capable" content="yes">` (the standard non-prefixed version).

### Current State

- **24 source files** in `src/` (down from 27 — removed 3 barrel files)
- **`app.js` deleted** — no longer exists
- **`src/main.js` is the production entry point** — loaded via `<script type="module">`
- **Service worker v30** caches all module files
- **App is fully functional** — tested locally with all matches loading, dates correct, today badge showing, TV channels displaying
- **Next step (Step 6)** will split `style.css` into component partials

---

## Step 6 — Completed ✅ (2026-06-15)

### What Was Done

Split the monolithic `style.css` (1,987 lines) into 14 focused CSS partials under `styles/`, organized by purpose. The browser loads them via CSS `@import` from `styles/main.css`. Zero bundler required.

#### Files Created (14 partials + 1 entry point)

| File | Lines | What It Contains |
|------|-------|-----------------|
| `styles/main.css` | 27 | Master stylesheet — `@import`s all partials in dependency order |
| `styles/base/reset.css` | 9 | Universal box-sizing, zero margins/padding |
| `styles/base/tokens.css` | 14 | CSS custom properties (colors, radius, font) |
| `styles/base/typography.css` | 13 | `html`/`body` base styles |
| `styles/layout/shell.css` | 176 | Nav, language toggle, tabs, filter chips, team search, `.main` container |
| `styles/layout/rtl.css` | 64 | All `[dir="rtl"]` overrides for the layout and components |
| `styles/components/match-card.css` | 175 | Date groups, match card, teams row, center score/time, meta, live card state, TV channels |
| `styles/components/match-detail.css` | 168 | Expanded detail panel, two-column event rows, pitch player field status, live detail header |
| `styles/components/match-stats.css` | 196 | Match stats bars, leaders, lineup list (grid view) |
| `styles/components/lineup-pitch.css` | 130 | Visual pitch formation, shirts, subs chips |
| `styles/components/standings.css` | 90 | Group tables, qualify/third row highlights, live badge |
| `styles/components/bracket.css` | 269 | Bracket tabs, R32 cards, visual tree (connectors, game slots, 3rd place) |
| `styles/components/stats.css` | 112 | Stats section/sub tabs, scorers/leaderboard list rows |
| `styles/components/profile.css` | 230 | Player + team profile overlay (backdrop, card, stats grid, events, match rows, team-link) |
| `styles/utilities/animations.css` | 46 | All `@keyframes`: pulse, spin, fadeIn, slideUp, scoreFlash |
| `styles/utilities/scrollbar.css` | 40 | Loading spinner, error state, responsive media query |

#### Also Updated

| File | Change |
|------|--------|
| `index.html` | `<link href="style.css">` → `<link href="styles/main.css">` |
| `sw.js` | Bumped `wc2026-v31` → `wc2026-v32`; replaced `./style.css` with all 16 CSS file paths in SHELL |
| `README.md` | Updated Tech Stack table (replaced `style.css` row with `styles/` directory breakdown) |
| `style.css` | **Deleted** — all 1,987 lines now live in 14 focused partials |

### CSS Architecture

```
styles/main.css
├── base/reset.css            ← Universal reset
├── base/tokens.css           ← :root CSS variables
├── base/typography.css       ← html, body defaults
│
├── utilities/animations.css  ← @keyframes (loaded early so components can reference them)
│
├── layout/shell.css          ← Nav, tabs, filters, search, .main container
├── layout/rtl.css            ← All [dir="rtl"] overrides
│
├── components/match-card.css     ← Cards, teams, scores, live state, channels
├── components/match-detail.css   ← Expanded detail, event rows, live header
├── components/match-stats.css    ← Stats bars, leaders, lineup grid
├── components/lineup-pitch.css   ← Visual pitch formation
├── components/standings.css      ← Group tables
├── components/bracket.css        ← Bracket tabs + visual tree
├── components/stats.css          ← Leaderboard tabs + rows
├── components/profile.css        ← Player/team overlays
│
└── utilities/scrollbar.css       ← Loading, error, responsive
```

### Design Decisions

#### 1. CSS `@import` vs. Build Tool

Used native CSS `@import` instead of a bundler. Tradeoffs:
- **Pro:** Zero build step, works exactly like the JS modules approach (browser-native)
- **Pro:** GitHub Pages serves it directly, no CI/CD pipeline needed
- **Con:** 16 HTTP requests for CSS on first load (vs 1 if bundled)
- **Mitigated by:** Service worker pre-caches all files. After first visit, all CSS loads from cache instantly. HTTP/2 multiplexing also helps.

#### 2. Animations in a Separate File (Not Inlined)

Moved all `@keyframes` into `utilities/animations.css` loaded before components. This avoids duplicating animations across partials (e.g. `pulse` is used by match-card, standings, bracket, and live detail).

#### 3. RTL as a Separate File

Kept all `[dir="rtl"]` overrides in `layout/rtl.css` rather than co-locating them with each component. Reasoning:
- Easy to audit all RTL rules in one place
- Components stay simpler (only LTR logic)
- Some RTL rules span multiple components (e.g. team rows affect both match-card and standings)

#### 4. `scrollbar.css` Contains Loading/Error/Responsive (Naming)

The V2 plan named this file `scrollbar.css` but it actually contains loading states, error states, and responsive media queries. This is from the original plan's naming. Could be renamed to `states.css` in future but functionally correct as-is.

### Current State

- **14 CSS partials** + 1 entry point in `styles/`
- **24 JS modules** in `src/`
- **`style.css` deleted** — no longer exists
- **Service worker v32** caches all JS and CSS files
- **App fully functional** — all CSS loads correctly via `@import`
- **Zero build step** — pure static files served by any HTTP server

---

## Step 7 — Completed ✅ (2026-06-15)

### What Was Done

Final verification and cleanup pass. Confirmed the entire app works with the modular architecture — both JS (ES modules) and CSS (`@import` partials).

#### Verification Checklist

| Check | Status |
|-------|--------|
| All 16 CSS files serve with HTTP 200 | ✅ |
| All 24 JS modules serve with HTTP 200 | ✅ (verified in Step 5) |
| `index.html` references `styles/main.css` | ✅ |
| `index.html` references `src/main.js` as `type="module"` | ✅ |
| SW registration uses relative path (`sw.js`) | ✅ |
| SW SHELL array includes all CSS + JS paths (relative) | ✅ |
| No stale references to `app.js` in codebase | ✅ (deleted) |
| No stale references to `style.css` in runtime files | ✅ (only in docs) |
| `node --check src/main.js` passes | ✅ |
| Empty scaffolding directories removed | ✅ (done in Step 5) |
| Barrel `index.js` files removed | ✅ (done in Step 5) |
| README Tech Stack table updated | ✅ |

#### Cleanup Already Done (Steps 5-6)

- Empty feature subdirs (`src/features/matches/`, `live/`, `standings/`, `bracket/`, `stats/`, `profiles/`) — removed in Step 5
- Barrel re-exports (`src/config/index.js`, `src/data/index.js`, `src/ui/index.js`) — removed in Step 5
- `app.js` — deleted in Step 5
- `style.css` — deleted in Step 6

#### What Remains (Step 8 — Documentation)

- Add a final complete file tree to `README.md` showing the full project structure
- This is the last step in the migration plan

### Final Architecture Summary

```
worldcup2026/
├── index.html                     ← App shell (loads styles/main.css + src/main.js)
├── styles/
│   ├── main.css                   ← @imports all 14 partials
│   ├── base/                      ← reset, tokens, typography (3 files)
│   ├── layout/                    ← shell, rtl (2 files)
│   ├── components/                ← match-card, match-detail, match-stats, lineup-pitch,
│   │                                 standings, bracket, stats, profile (8 files)
│   └── utilities/                 ← animations, scrollbar (2 files)
├── src/
│   ├── main.js                    ← Entry point (imports all, wires DI, runs init)
│   ├── state.js                   ← Shared mutable state + setters
│   ├── config/                    ← api, constants, strings (3 files)
│   ├── data/                      ← helpers, fetchers, timeline, lineup, espn-* (8 files)
│   ├── ui/                        ← shell, helpers, lineup-pitch, links, event-sections (5 files)
│   └── features/                  ← profiles, stats, standings, bracket, match-detail, matches (6 files)
├── sw.js                          ← Service worker v32 (caches all files)
├── manifest.json                  ← PWA config
├── favicon.ico
├── icons/                         ← PWA icons
├── DEVLOG.md                      ← Full development history
├── V2-MIGRATION.md                ← This file
└── README.md                      ← Project documentation
```

**Total:** 40 source files (24 JS + 15 CSS + 1 HTML) replacing the original 2 monolithic files (`app.js` + `style.css`).
No build step. No bundler. No framework. Pure browser-native ES modules + CSS imports.

---

## Step 8 — Completed ✅ (2026-06-15)

### What Was Done

Completely rebuilt `README.md` to reflect the final modular architecture. The old README documented the monolithic era (`app.js` + `style.css`). The new README documents the current state: 40 source files, ES modules, CSS `@import` partials, and the full project tree.

#### New README Structure

1. **Header** — app description, live link
2. **Features** — full feature list (17 bullet points)
3. **Install** — iPhone + Android instructions (condensed)
4. **Architecture** — tech stack summary, full file tree (annotated), data flow diagram, DI explanation
5. **Run Locally** — `python3` and `npx serve` commands
6. **Deploy** — GitHub Pages workflow + SW cache bump reminder
7. **APIs** — table of data sources (FIFA, ESPN, Israel TV)
8. **Documentation** — links to DEVLOG.md and V2-MIGRATION.md

### Migration Complete 🎉

All 8 steps are done. The V2 migration is complete:

| Step | Description | Status |
|------|-------------|--------|
| 1 | Folder structure + config + state + basic data/UI | ✅ |
| 2 | Extract remaining data-fetching modules | ✅ |
| 3 | Extract UI rendering helpers | ✅ |
| 4 | Extract feature modules | ✅ |
| 5 | Wire up entry point + switch over | ✅ |
| 6 | Split CSS into partials | ✅ |
| 7 | Verify & clean up | ✅ |
| 8 | Rebuild README with final architecture | ✅ |
