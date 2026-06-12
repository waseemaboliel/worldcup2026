# FIFA World Cup 2026 — Developer Log

This file tracks what has been built, how it works, known bugs, and what's planned next.
Use this as the reference when resuming development in a future session.

---

## Project Files

| File | Purpose |
|---|---|
| `index.html` | App shell, nav, tabs, filter chips, team search input |
| `style.css` | All styles, design tokens, responsive layout |
| `app.js` | All logic: fetch, parse, render, tabs, filters, standings, stats |
| `manifest.json` | PWA config |
| `sw.js` | Service worker — caches shell files, lets FIFA API calls go to network |
| `icons/` | icon-192.png, icon-512.png, apple-touch-icon.png |
| `favicon.ico` | Browser tab icon (16/32/48px) |

---

## Design Tokens

- **Background:** `#0d0d0d`
- **Accent (gold):** `#c9a84c`
- **Card background:** `#1a1a1a`
- **Border:** `#2a2a2a`
- **Font:** Inter (Google Fonts) — weights 400, 600, 700, 900
- **Max width:** 680px centred
- **Border radius:** 12px cards

---

## FIFA API Reference

| Data | Endpoint |
|---|---|
| All 104 matches | `https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104` |
| Match timeline | `https://api.fifa.com/api/v3/timelines/17/285023/{IdStage}/{IdMatch}?language=en-GB` |
| Israel TV channels | `https://api.fifa.com/api/v3/watch/season/285023?language=en-GB` |

**Key facts:**
- `MatchStatus`: `0` = finished, `1` = upcoming
- `IdStage` group stage: `289273` | Round of 32: `289287`
- 12 groups (A–L), `IdGroup` from `289275` to `289286`
- `BallPossession` field exists in match API but is always `null` — FIFA does not expose it
- No dedicated standings or scorers API — computed from match/timeline data

**Flag emoji:**
- FIFA 3-letter codes mapped to ISO alpha-2 via `FIFA_TO_ALPHA2` in `app.js`
- Base codepoint must be `0x1F1E6` (not `0x1F1E0`) — confirmed bug fix
- Special cases: `HAI`→`HT`, `SCO`→🏴󠁧󠁢󠁳󠁣󠁴󠁿 tag emoji, `CUW`→`CW`, `CPV`→`CV`, `COD`→`CD`

**Timeline event types used:**
| Type | Meaning |
|---|---|
| 0 | Goal |
| 1 | Assist (appears just before its Goal event) |
| 2 | Yellow card |
| 3 | Red card |
| 5 | Substitution |
| 57 | Goal Prevention (save) — `IdPlayer` is always the goalkeeper |

---

## What's Built

### Phase 1 — Shell ✅ (2026-06-12)
- `index.html` with dark theme, Inter font, CSS design tokens
- Sticky nav: trophy emoji, title, subtitle
- Match card: flags, team names, kickoff time or score, venue, badge
- Fully responsive — single column mobile, 680px desktop

### Phase 2 — Match List ✅ (2026-06-12)
- Fetches all 104 matches on page load
- Loading spinner + error state
- Grouped by date in Israel timezone (`Asia/Jerusalem`)
- Upcoming: kickoff time, group badge | Finished: score, PSO if applicable, FT badge

### Phase 3a — Expand/Collapse ✅ (2026-06-12)
- Click card → expands inline with fadeIn animation
- One card open at a time; `toggleCard()` + `activeCard` manage state
- Finished: spinner while timeline loads | Upcoming: "No match details yet"

### Phase 3b — Timeline: Goals ✅ (2026-06-12)
- Fetches timeline API on demand; `timelineCache` Map prevents re-fetching
- Goals: scorer extracted from description, assist paired via Type=1 before Type=0

### Phase 3c — Timeline: Cards & Subs ✅ (2026-06-12)
- Yellow cards, red cards, substitutions in expanded panel
- Subs: ↑ player in / ↓ player out + minute

### Phase 4a — Nav Tabs ✅ (2026-06-12)
- Tabs: Matches / Standings / Stats
- Filter chips + search visible only on Matches tab

### Phase 4b — Group Standings ✅ (2026-06-12)
- Computed from match scores — no standings API exists
- 12 groups sorted by Pts → GD → GF
- Top 2 rows highlighted green (qualification)

### Phase 4c — Top Scorers (now part of Stats tab) ✅ (2026-06-12)
- Computed from timelines; reuses `timelineCache`

### Phase 4d — Stage Filter ✅ (2026-06-12)
- Chips: All / Groups / R32 / R16 / QF / SF / Final — filters live

### Phase 5a — Israel TV Channels ✅ (2026-06-12)
- Watch API fetched in parallel with matches on load
- `IdCountry === "ISR"` filter; `IdMatch → channels[]` map
- Kan Box always shown (green chip — streams all matches)
- Dedup: skip `KAN` if `KAN 11` present; skip `MAKAN` if `MAKAN 33` present

### Phase 5b — Scroll to Today ✅ (2026-06-12)
- Auto-scrolls to today's date group on page load
- Today label shown in gold with "— Today" suffix

### Phase 5c — Attendance in Match Detail ✅ (2026-06-12)
- Shown at top of expanded detail for finished matches
- From `match.Attendance`, formatted with thousands separator

### Phase 5d — Stats Tab: Goals / Yellow / Red ✅ (2026-06-12)
- Stats tab with 3 sub-tabs; top 20 leaderboards

### Phase 5e — Filter by Team ✅ (2026-06-12)
- Search input below chips; filters live, case-insensitive
- Combines with stage chips

### Phase 5f — PWA ✅ (2026-06-12)
- `manifest.json` + `sw.js` (cache version: bump on each deploy)
- iOS: Safari → Share → Add to Home Screen
- Android: Chrome install banner

### Phase 6a — Stats Split: Player / Team ✅ (2026-06-12)
- Stats tab has two top-level sections: 👤 Player Stats and 🏳️ Team Stats

### Phase 6b — Player Stats: Assists + Clean Sheets ✅ (2026-06-12)
- Assists: Type 1 events, `IdPlayer` counted per player
- Clean Sheets: Type 57 identifies GK via `IdPlayer`; clean sheet = team conceded 0
- GK name resolved by scanning all named events in the timeline (fouls, cards, corners, subs)

### Phase 6c — Team Stats ✅ (2026-06-12)
- 5 sub-tabs: Goals/Game, Conceded/Game, Clean Sheets, Yellow Cards, Red Cards
- First 3 from match scores; cards from timelines

---

## Known Bugs

### ✅ ~~Arabic Timeline: Raw Description Shown Instead of Player Name~~ — Fixed (2026-06-13)
- **Problem:** Expanded match cards in Arabic showed raw Arabic API strings like "Julian QUINONES(المكسيك) يسجل هدفاً!" instead of just the player name
- **Root cause:** Phase 7d fetched Arabic timelines for the expand panel. `parseTimeline` uses English regex patterns (`/^(.+?) scores/`, `/^(.+?) \(/` etc.) — when they fail to match Arabic text, the raw description string is used as the player name
- **Fix:** Reverted `loadTimeline` to always use the EN timeline (`language=en-GB`). The translated section titles (⚽ الأهداف, 🟨 البطاقات الصفراء etc.) come from `t()` already, so the expand panel is fully translated while player names parse correctly. Removed `TIMELINE_API_AR`, `timelineCacheAr`, `activeCache()`, and `activeTimelineApi()` — no longer needed

### ✅ ~~Stats Empty in Arabic~~ — Fixed (2026-06-13)
- **Problem:** All player/team stat leaderboards showed empty when Arabic was active
- **Root cause:** Phase 7d mistakenly routed stats timeline fetches to `ar-SA`. The stats functions parse player names via English regex (e.g. `/^(.+?) scores/`, `/Assisted by (.+)\./`) — these never match Arabic text, so every event was skipped
- **Fix:** Stats functions always use `timelineCache` + `TIMELINE_API` (en-GB). Only `loadTimeline` (the expand panel) uses `activeCache()` / `activeTimelineApi()` to show descriptions in Arabic

### ✅ ~~Standings Stuck Loading in Arabic~~ — Fixed (2026-06-13)
- **Problem:** Standings tab showed loading spinner forever when Arabic was selected
- **Root cause:** `computeStandings` filtered group-stage matches with `m.StageName[0].Description === 'First Stage'` — that string is in Arabic in the AR dataset, so every match was skipped and the groups map stayed empty
- **Fix:** Replaced all language-dependent stage name comparisons with `IdStage` checks (`'289273'` = group stage). Added `isGroupStage(match)` helper and `STAGE_ID` map so filter chips also work correctly in Arabic

### ✅ ~~Service Worker Error on `file://`~~ — Fixed (2026-06-13)
- **Problem:** `Uncaught TypeError: Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported` in console when opening the HTML as a local file
- **Root cause:** Opening `index.html` directly gives it a `null` origin; `navigator.serviceWorker.register()` throws synchronously in that context
- **Fix:** Added guard `location.hostname !== ''` — SW registration is skipped when there is no real host; works as before on GitHub Pages

### 🐛 GK Clean Sheet — Name Shows as "[Team] GK"
- **Problem:** Some goalkeepers show as e.g. "Mexico GK" instead of their real name
- **Root cause:** Type 57 (Goal Prevention) descriptions never include the player name — only "The goalkeeper of [Team]". The name lookup scans other event types (fouls, cards, corners, subs) but if the GK never appears in any of those events in a given match, the name can't be resolved
- **Proper fix:** Needs a squad/lineup API that maps `IdPlayer` → player name for each match
- **See next steps below**

---

## Next Steps

### Find and integrate a Squad / Lineup API
- We need an API that returns the starting lineup (or full squad) for each match, including player names and positions
- This would give us `IdPlayer` → name for every player including the GK
- Once we have this, the GK clean sheet bug is fixed completely
- It would also enable future features: starting XI display on match cards, player profile pages, etc.
- **Suggested endpoints to investigate:**
  - `https://api.fifa.com/api/v3/live/football/17/285023/{IdStage}/{IdMatch}?language=en-GB`
  - `https://api.fifa.com/api/v3/lineups/17/285023/{IdStage}/{IdMatch}?language=en-GB`
  - Any FIFA match detail endpoint that returns team sheets

### After squad API is found:
- Fix GK name resolution in clean sheets leaderboard
- Display starting XI inside expanded match cards
- Use player positions to improve stats (e.g. filter goals by outfield players only)

---

## Phase 7 — Multi-language Support (English / Hebrew / Arabic)

### Language support overview

| | English | Hebrew | Arabic |
|---|---|---|---|
| Team names | API `en-GB` | `TEAM_NAME_HE` map ✅ | API `ar-SA` ✅ |
| Stadium / City / Group / Stage | API `en-GB` | API `en-GB` (no Hebrew endpoint) | API `ar-SA` ✅ |
| Stage badges | `STRINGS.en` | `STRINGS.he` ✅ | `STRINGS.ar` ✅ |
| UI text (tabs, labels, messages) | `STRINGS.en` | `STRINGS.he` ✅ | `STRINGS.ar` ✅ |
| Date headings | `en-GB` locale | `he-IL` locale ✅ | `ar-SA` locale ✅ |
| Timeline event descriptions | API `en-GB` | API `en-GB` | API `en-GB` (Arabic unparseable) |
| Page direction | LTR | RTL ✅ | RTL ✅ |

### Phase 7a — Language Toggle UI ✅ (2026-06-13)
- `EN / עב / عر` buttons added to the right of the nav bar via `.lang-toggle` div
- `applyLang(lang)` sets `currentLang`, writes `wc2026-lang` to `localStorage`, toggles `dir`/`lang` on `<html>`, and updates the active button highlight
- `initLangToggle()` restores the saved language on load
- `.nav-inner` uses `justify-content: space-between` so logo stays left and lang buttons stay right in both LTR and RTL — direction-proof

### Phase 7b — String System ✅ (2026-06-13)
- `STRINGS` object in `app.js` — three sub-objects (`en`, `he`, `ar`) covering every UI string: tabs, chips, search placeholder, loading messages, error messages, match card labels (FT, vs), detail section titles (Goals, Yellow Cards, Red Cards, Substitutions, attendance), stats section/sub-tab labels, leaderboard labels (goals, assists, clean sheets), standings header, today suffix
- `t(key, ...args)` helper — returns string for `currentLang`, falls back to `en`, supports function values for plurals/interpolation
- `updateStaticStrings()` patches the static HTML elements (tabs, chips, search placeholder) — called from `applyLang()` on every language switch
- `applyLang()` now also calls `renderActiveTab()` (guarded: only if data is loaded) so dynamic content re-renders instantly on switch
- Fixed naming collision: loop variable `t` in `renderTeamLeaderboard` renamed to `team` throughout to avoid shadowing the `t()` helper

### Phase 7c — Arabic Match Data
- Create a `STRINGS` object in `app.js` with keys for every UI text string
- Three sub-objects: `en`, `he`, `ar`
- Strings include: tab labels, filter chip labels, section titles, status badges (FT, vs), loading/error messages, channel label, attendance label, stats labels, empty state messages
- Wire up a `t(key)` helper function that returns the string for the current language
- On language switch, re-render the current tab so all text updates instantly

### Phase 7c — Arabic Match Data ✅ (2026-06-13)
- `MATCHES_API_AR` added (`language=ar-SA`)
- `fetchMatchesAr()` fetches Arabic matches in parallel with EN on load; stored in `allMatchesAr`; failure is silent (falls back to EN)
- `activeMatches()` returns `allMatchesAr` when Arabic is active, `allMatches` otherwise
- All render entry points use `activeMatches()` — Arabic team names, stadiums, cities, groups, stage names appear automatically on match cards and standings
- EN and Hebrew both use `allMatches` (en-GB data)
- Stage/group filter chips use `IdStage` (language-independent) rather than EN stage name strings — works in all languages

### Phase 7d — Arabic Timeline Data ✅ (2026-06-13)
- All timelines always fetched in `en-GB` — section titles (⚽ Goals, 🟨 Yellow Cards etc.) are translated via `t()`, player names parse correctly from English regex patterns
- Arabic timeline API was attempted but reverted: Arabic descriptions couldn't be parsed and produced garbage output (see bug fix above)
- Also fixed: `buildMatchCard` was using `stage === 'First Stage'` string comparison for group badge logic — replaced with `isGroupStage(match)` using `IdStage` (language-independent)

### Match Detail — Two-Column Timeline Layout ✅ (2026-06-13)
- Redesigned expanded match panel: attendance and section titles (⚽ Goals, 🟨 Yellow Cards…) centred full-width
- Each event row is a 3-column grid: **home team always LEFT** | **minute centre** | **away team always RIGHT** — `direction: ltr` hardcoded on `.detail-row` so it never flips in RTL
- `eventRow(minute, homeContent, awayContent)` helper builds the row; whichever side is `null` renders an empty placeholder to keep the minute centred
- Event icons moved inline (⚽ / 🟨 / 🟥) so the side column is self-explanatory without the section title

### Phase 7g — Hebrew Country Names ✅ (2026-06-13)
- Added `TEAM_NAME_HE` map in `app.js` — all 48+ qualified teams keyed by FIFA 3-letter code with Hebrew translations (e.g. `MEX:'מקסיקו'`, `BRA:'ברזיל'`, `ESP:'ספרד'` etc.), covering all confederations
- `getTeamName()` now checks `currentLang === 'he'` and returns the Hebrew name from `TEAM_NAME_HE` if available, falling back to the API name otherwise
- Applies everywhere team names appear: match cards, standings, stats leaderboards (team name under player), team stats rows

### Phase 7f — Hebrew Content Improvements ✅ (2026-06-13)
- **Date headings in Hebrew/Arabic:** `formatDateHeading` and `getTodayHeading` now use `LOCALE_MAP` (`he-IL` / `ar-SA`) so weekday and month names are in the correct language via `Intl` — no hardcoded translations needed
- **Stage badges translated:** `STAGE_LABEL` now maps EN API strings to `STRINGS` keys (`stageGroupStage`, `stageR32`, etc.). Hebrew and Arabic translations added for all 7 stages. `buildMatchCard` calls `t(stageKey)` so badges read "שלב הבתים", "רבע גמר" etc. in Hebrew and Arabic equivalents in Arabic
- **`text-transform: uppercase` suppressed in RTL:** Applied `text-transform: none; letter-spacing: 0` to `.date-label`, `.standings-group-title`, `.match-group`, `.match-status`, `.detail-section-title`, `.nav-sub` under `[dir="rtl"]` — uppercasing Hebrew/Arabic is meaningless and garbles the text
- **What stays English (FIFA API limitation):** Team names, stadium/city names, group names (e.g. "Group A"), player names — FIFA provides no Hebrew endpoint

### Phase 7e — RTL Layout Polish ✅ (2026-06-13)
All overrides scoped to `[dir="rtl"]` — zero impact on LTR:
- **Match card:** `border-left` accent flips to `border-right`; home team row mirrors to `row-reverse` + `text-align: right`; away team (`.team--right`) resets to normal `row` so the grid column flip handles it naturally
- **Date label:** `padding-left` → `padding-right`
- **Standings table:** first-child `th` and `td` alignment + padding flipped to right
- **Filter chips:** `direction: rtl` on `.filters` so the scroll starts from the right edge
- **Scorer value label:** `text-align: right` in RTL
- **`text-transform: uppercase` suppressed** on date labels, standings group titles, match group/status badges, nav subtitle, detail section titles — uppercasing is meaningless in Hebrew/Arabic and garbles text
