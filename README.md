# 🏆 FIFA World Cup 2026

A mobile-first Progressive Web App for the FIFA World Cup 2026 — live scores, standings, bracket, and stats for all 104 matches. Powered by the FIFA and ESPN APIs. No login, no ads, no install required.

**Live:** [https://waseemaboliel.github.io/worldcup2026](https://waseemaboliel.github.io/worldcup2026)

---

## Features

- **Matches** — all 104 matches grouped by date, kickoff times in Israel timezone
- **Live scores** — scores, clock, and period update every 15 seconds; live matches have a green border and pulsing 🟢 badge
- **Match detail** — expand any match to see goals, assists, yellow/red cards, substitutions, and attendance
- **Lineups** — visual pitch with formation, player positions, and sub tracking (subbed-off greyed, subbed-on in green)
- **Match Stats** — possession, shots, passes, tackles, and 12 more stat bars with top performers per match
- **Standings** — all 12 group tables (A–L) with FIFA H2H tiebreakers, updated live; top 2 highlighted green, best thirds blue; "Qualified to R32" badge for clinched teams; Best Thirds tab ranking all 12 third-placed teams
- **Bracket** — full visual knockout tree (R32 → R16 → QF → SF → Final + 3rd place) in a single scrollable view
- **Player Stats** — goals, assists, clean sheets, shots, on target, saves, fouls, offsides, yellow & red cards
- **Team Stats** — goals/game, conceded/game, clean sheets, possession %, shots, passes, pass accuracy, tackles, interceptions
- **Player profiles** — tap any player name to see tournament goals, assists, and cards with match-by-match history
- **Team profiles** — tap any team name to see W/D/L record and every match played
- **Israel TV channels** — shown on every match card (Kan Box, KAN 11, MAKAN 33, Sport 1, etc.)
- **Filter by stage** — Groups, R32, R16, QF, SF, Final
- **Search by team** — type any team name to filter matches
- **Multi-language** — English / עברית / العربية — full RTL support, translated UI, Hebrew and Arabic team names, localised dates
- **Installable PWA** — works full-screen on iPhone and Android, offline-capable via service worker

---

## Install

### iPhone

1. Open the link in **Safari**
2. Tap **Share** → **Add to Home Screen** → **Add**

### Android

1. Open the link in **Chrome**
2. Tap **Install** (or three-dot menu → **Add to Home Screen**)

---

## Architecture

Pure HTML / CSS / JavaScript — no frameworks, no build tools, no dependencies.

- **JS:** Native ES modules (`<script type="module">`) — the browser resolves all imports
- **CSS:** Native `@import` partials — no preprocessor, no PostCSS
- **Offline:** Service worker pre-caches all files for instant load + offline support
- **Deploy:** GitHub Pages serves static files directly — push to `main` and it's live

### Project Structure

```
worldcup2026/
├── index.html                         App shell (nav, tabs, filters)
│
├── src/                               JavaScript modules (24 files)
│   ├── main.js                        Entry point — imports all, wires DI, runs init()
│   ├── state.js                       Shared mutable state + setter functions
│   ├── config/
│   │   ├── api.js                     API URLs + polling interval
│   │   ├── constants.js               Stage IDs, country maps, team names (HE/AR)
│   │   └── strings.js                 i18n strings (EN/HE/AR), t() helper, lang state
│   ├── data/
│   │   ├── helpers.js                 countryToFlag, getTeamName, formatKickoff, groupByDate
│   │   ├── fetchers.js               fetchMatches, fetchIsraelChannels, fetchEspnIndex
│   │   ├── timeline.js               fetchTimeline, parseTimeline (goals/cards/subs)
│   │   ├── lineup.js                 fetchLineup, parseLineupTeam (FIFA)
│   │   ├── espn-lineup.js            fetchEspnLineup, parseEspnRoster, MATCH_STAT_KEYS
│   │   ├── espn-stats.js             buildEspnStatsCache, espnMatchDetailsCache
│   │   ├── espn-live.js              fetchEspnLiveStats, espnDetailsToEvents
│   │   └── live-scores.js            Live polling, patchLiveCards, initLiveScores (DI)
│   ├── ui/
│   │   ├── shell.js                  showLoading, initTabs, initFilters, initLangToggle
│   │   ├── helpers.js                eventRow, playerSpan, teamSpan, shortName
│   │   ├── lineup-pitch.js           renderLineup (visual pitch with formation)
│   │   ├── links.js                  bindPlayerLinks, bindTeamLinks, initLinks (DI)
│   │   └── event-sections.js         buildEventSections (goals/cards/subs HTML)
│   └── features/
│       ├── matches.js                renderMatches, renderActiveTab
│       ├── match-detail.js           toggleCard, buildMatchCard, live detail, timeline
│       ├── standings.js              computeStandings, renderStandings
│       ├── bracket.js                renderBracket, visual tree, initBracket (DI)
│       ├── stats.js                  renderStats (player + team leaderboards)
│       └── profiles.js               openPlayerProfile, openTeamProfile
│
├── styles/                            CSS partials (15 files)
│   ├── main.css                       @imports all partials in order
│   ├── base/
│   │   ├── reset.css                  Box-sizing, zero margins
│   │   ├── tokens.css                 CSS variables (colors, radius, font)
│   │   └── typography.css             html/body defaults
│   ├── layout/
│   │   ├── shell.css                  Nav, tabs, filters, search, .main container
│   │   └── rtl.css                    All [dir="rtl"] overrides
│   ├── components/
│   │   ├── match-card.css             Cards, teams row, scores, live state, channels
│   │   ├── match-detail.css           Detail panel, event rows, live header
│   │   ├── match-stats.css            Stats bars, leaders, lineup grid
│   │   ├── lineup-pitch.css           Pitch formation, shirts, subs
│   │   ├── standings.css              Group tables, qualify highlights
│   │   ├── bracket.css                Bracket tabs, visual tree, connectors
│   │   ├── stats.css                  Leaderboard tabs + scorer rows
│   │   └── profile.css               Player/team overlay, events list
│   └── utilities/
│       ├── animations.css             @keyframes (pulse, spin, fadeIn, slideUp, scoreFlash)
│       └── scrollbar.css              Loading/error states, responsive tweaks
│
├── sw.js                              Service worker (v32) — caches all files
├── manifest.json                      PWA manifest (name, icons, theme)
├── favicon.ico
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
│
├── DEVLOG.md                          Full dev log — phases 1–20, API docs, design decisions
├── V2-MIGRATION.md                    Migration journal — 8-step plan with detailed notes
└── README.md                          This file
```

### Data Flow

```
FIFA API ─┐                    ┌─ features/matches.js ─── DOM (match cards)
           ├─ data/fetchers ──┤─ features/standings.js ── DOM (group tables)
ESPN API ──┘    ↓              ├─ features/bracket.js ─── DOM (knockout tree)
          data/espn-*          ├─ features/stats.js ───── DOM (leaderboards)
          data/live-scores     └─ features/profiles.js ── DOM (overlays)
               ↓
          state.js (shared)
```

### Dependency Injection

Three DI injection points in `main.js` break potential circular dependencies:

```js
initLinks({ openPlayerProfile, openTeamProfile });
initLiveScores({ buildMatchCard, loadTimeline, stopLiveDetailPoller });
initBracket({ toggleCard, renderMatches });
```

---

## Run Locally

ES modules require an HTTP server (they don't work via `file://`).

```bash
# Python (built into macOS)
python3 -m http.server 8080
# → http://localhost:8080

# Node.js
npx serve
# → http://localhost:3000
```

---

## Deploy

The site is hosted on **GitHub Pages** — push to `main` and it deploys automatically.

After pushing, bump the `CACHE` version in `sw.js` so existing users get the update:

```js
// sw.js line 1
const CACHE = 'wc2026-v32';  // ← increment this
```

---

## APIs

| Source | What It Provides |
|--------|-----------------|
| [FIFA API](https://www.fifa.com) | Match schedule, scores, timelines (goals/cards/subs), lineups, group IDs |
| [ESPN API](https://www.espn.com) | Live scores/clock, player stats, team stats, formation data, match details |
| [Israel TV API](https://www.kan.org.il) | TV channel assignments per match |

---

## Documentation

| File | Description |
|---|---|
| [DEVLOG.md](DEVLOG.md) | Full developer log — every feature built (Phases 1–20), API reference, known bugs and fixes, design decisions |
| [V2-MIGRATION.md](V2-MIGRATION.md) | Modularization journal — 8-step migration from monolithic `app.js` + `style.css` to 40 focused modules |
