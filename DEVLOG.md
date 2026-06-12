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
| Team names | API `en-GB` | API `en-GB` (FIFA has no Hebrew) | API `ar-SA` ✅ |
| Stadium / City / Group / Stage | API `en-GB` | API `en-GB` | API `ar-SA` ✅ |
| UI text (tabs, labels, messages) | Hardcoded EN | Hardcoded HE | Hardcoded AR |
| Timeline event descriptions | API `en-GB` | API `en-GB` | API `ar-SA` ✅ |
| Page direction | LTR | RTL | RTL |

### Phase 7a — Language Toggle UI
- Add `EN / עב / عر` toggle buttons to the top nav
- Clicking a button sets the active language and saves it to `localStorage`
- Sets `dir="rtl"` or `dir="ltr"` on the `<html>` element
- No text or data changes yet — just the toggle mechanism working

### Phase 7b — String System
- Create a `STRINGS` object in `app.js` with keys for every UI text string
- Three sub-objects: `en`, `he`, `ar`
- Strings include: tab labels, filter chip labels, section titles, status badges (FT, vs), loading/error messages, channel label, attendance label, stats labels, empty state messages
- Wire up a `t(key)` helper function that returns the string for the current language
- On language switch, re-render the current tab so all text updates instantly

### Phase 7c — Arabic Match Data
- On page load, fetch matches in both `en-GB` and `ar-SA` in parallel
- Store both as `allMatchesEn` and `allMatchesAr`
- When Arabic is selected, use `allMatchesAr` for rendering — Arabic team names, stadiums, cities, groups, stage names appear on match cards automatically
- English and Hebrew both use `allMatchesEn`

### Phase 7d — Arabic Timeline Data
- When a match card is expanded and Arabic is active, fetch the timeline with `language=ar-SA`
- Cache Arabic timelines separately (`timelineCacheAr`) so switching back to EN doesn't re-fetch
- Goal/card descriptions appear in Arabic when Arabic is selected

### Phase 7e — RTL Layout Polish
- Fine-tune layout for RTL: flip match card team layout (home on right, away on left in RTL)
- Adjust text alignment, badge positions, stats rows, standings table for RTL
- Ensure filter chips scroll correctly in RTL
- Test all tabs and states in both RTL languages
