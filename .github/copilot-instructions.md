# AI Instructions — World Cup 2026 PWA

## Project Overview

Mobile-first PWA showing all 104 FIFA World Cup 2026 matches — live scores, standings, bracket, stats, player/team profiles. Three languages (EN/HE/AR) with full RTL support. Data from FIFA + ESPN APIs.

## Architecture

- **No frameworks, no bundler, no dependencies** — pure browser-native ES modules + CSS `@import`
- **24 JS modules** in `src/` — entry point is `src/main.js`
- **15 CSS partials** in `styles/` — entry point is `styles/main.css`
- **Service worker** (`sw.js`) pre-caches all files for offline/instant load
- **GitHub Pages** deploys automatically on push to `main`

## Key Rules

1. **Never commit or push** — the user handles all git operations
2. **Always bump SW version** after changing any file (`sw.js` line 1: `const CACHE = 'wc2026-vNN'`)
3. **Add new files to SW SHELL array** in `sw.js` (relative paths like `./styles/new-file.css`)
4. **Use relative paths everywhere** — works on both localhost and GitHub Pages (`./`, not `/worldcup2026/`)
5. **ES modules require HTTP server** — `python3 -m http.server 8080` or `npx serve`

## Where to Find Things

| Task | File(s) |
|------|---------|
| Add a translation key | `src/config/strings.js` — add to EN, HE, AR objects |
| Add a new API endpoint | `src/config/api.js` |
| Add a new state variable | `src/state.js` — add `export let` + `export function setX(v)` |
| Add a new feature tab | `src/features/` + register in `src/ui/shell.js` `initTabs()` + `src/features/matches.js` `renderActiveTab()` |
| Add a new CSS component | `styles/components/new.css` + add `@import` in `styles/main.css` |
| Modify match card layout | `src/features/match-detail.js` (buildMatchCard) + `styles/components/match-card.css` |
| Add a new stat category | `src/features/stats.js` (PLAYER_SUBS or TEAM_SUBS arrays) |
| Fix live polling | `src/data/live-scores.js` |
| Fix lineup/pitch display | `src/ui/lineup-pitch.js` + `styles/components/lineup-pitch.css` |

## Patterns to Follow

- **Dependency Injection** for cross-feature dependencies (avoid circular imports):
  ```js
  // In main.js:
  initLinks({ openPlayerProfile, openTeamProfile });
  initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller });
  initBracket({ toggleCard, renderMatches });
  ```
- **State mutations** always via setters: `state.setActiveTab('standings')`, never direct assignment
- **Live bindings** — import variables directly for reading: `import { allMatches } from '../state.js'`
- **Named exports only** — no default exports anywhere
- **DOM IDs** used by JS: `#matches-list`, `#standings-section`, `#bracket-section`, `#stats-section`, `#tab-matches`, `#tab-standings`, `#tab-bracket`, `#tab-stats`

## Common Pitfalls

- **Duplicate Maps** — if you create a cache Map, make sure only ONE module owns it. The consumer imports from the owner. Don't put a second Map in `state.js`.
- **SW path prefix** — never use `/worldcup2026/` prefix. All paths are relative (`./`).
- **`file://` won't work** — ES modules + CSS `@import` need an HTTP server.
- **RTL** — any new layout must work in `[dir="rtl"]`. Grid/flex with `direction: ltr` for symmetric layouts (scores, pitch). Add overrides in `styles/layout/rtl.css`.
- **Killing port 8080** — `lsof -ti:8080 | xargs kill -9`

## Documentation Files

| File | What It Contains |
|------|-----------------|
| `README.md` | Full file tree, architecture, install/deploy instructions |
| `DEVLOG.md` | Phase-by-phase build history (Phases 1–20), API reference, bugs/fixes |
| `V2-MIGRATION.md` | 8-step migration journal with dependency graphs and design decisions |
