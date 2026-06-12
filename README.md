# 🏆 FIFA World Cup 2026 — Web App

A mobile-first, responsive web app for World Cup 2026 — a mini version of the 365/Sofascore app.
Works on mobile and desktop, hosted for free on GitHub Pages, always up to date from the live FIFA API.
Pure HTML/CSS/JS — no build tools, no Node, no dependencies.

**Live:** [https://waseemaboliel.github.io/worldcup2026](https://waseemaboliel.github.io/worldcup2026)

---

## Project Files

| File | Purpose |
|---|---|
| `index.html` | App shell, nav, tabs, filter chips |
| `style.css` | All styles, design tokens, responsive layout |
| `app.js` | All logic: fetch, parse, render, tabs, filters, standings, scorers |

---

## Design

- **Background:** `#0d0d0d` (near black)
- **Accent:** `#c9a84c` (FIFA gold) — used for times, points, active tabs, active chips
- **Cards:** `#1a1a1a` background, `#2a2a2a` border, 12px border radius
- **Font:** Inter (Google Fonts) — weights 400, 600, 700, 900
- **Layout:** Single column, max-width 680px centred, mobile-first

---

## FIFA API Reference

| Data | Endpoint |
|---|---|
| All 104 matches | `https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104` |
| Match timeline (goals, cards, subs) | `https://api.fifa.com/api/v3/timelines/17/285023/{IdStage}/{IdMatch}?language=en-GB` |
| Israel TV channels | `https://api.fifa.com/api/v3/watch/season/285023?language=en-GB` |

**Key API facts (confirmed from live data):**
- `MatchStatus`: `0` = finished, `1` = upcoming
- No dedicated standings or top scorers API — both computed from match/timeline data
- All dates in UTC — displayed in `Asia/Jerusalem` timezone
- `IdStage` for group stage: `289273` | Round of 32: `289287`
- 12 groups (A–L), `IdGroup` from `289275` to `289286`

**FIFA country code → flag emoji:** Uses `FIFA_TO_ALPHA2` map in `app.js`. Special cases:
- `HAI` → `HT`, `SCO` → 🏴󠁧󠁢󠁳󠁣󠁴󠁿 (tag emoji), `CUW` → `CW`, `CPV` → `CV`, `COD` → `CD`
- Base codepoint must be `0x1F1E6` (not `0x1F1E0`)

**Timeline event types:**
- `0` = Goal, `1` = Assist (always just before its Goal), `2` = Yellow card, `3` = Red card, `5` = Substitution

---

## What's Built

### Phase 1 — Shell ✅ (2026-06-12)
- `index.html` with dark theme, Inter font, CSS design tokens
- Sticky nav with trophy emoji, "World Cup 2026" title, subtitle
- Match card component: flags, team names, kickoff time or score, venue, group/stage badge
- Fully responsive — single column mobile, 680px max-width on desktop

### Phase 2 — Match List ✅ (2026-06-12)
- Fetches all 104 matches from FIFA API on page load
- Loading spinner while fetching, error state on failure
- Matches grouped by date in Israel timezone
- Upcoming: kickoff time (HH:mm Israel), group badge
- Finished: score, PSO if applicable, FT badge
- Fully data-driven — no hardcoded cards

### Phase 3a — Expand/Collapse ✅ (2026-06-12)
- Click any card → expands inline with smooth fadeIn animation
- Click again → collapses; only one card open at a time
- Finished cards show spinner while timeline loads
- Upcoming cards show "No match details yet"
- `toggleCard()` + `activeCard` variable manage state

### Phase 3b — Timeline: Goals ✅ (2026-06-12)
- Fetches timeline API on demand when a finished card is expanded
- `timelineCache` Map — re-opening a card never re-fetches
- Parses goals: scorer from description, assist paired via Type=1 before Type=0
- Shows: team flag + gold minute + scorer name + assist

### Phase 3c — Timeline: Cards & Subs ✅ (2026-06-12)
- Yellow cards, red cards, substitutions in the same expanded panel
- Each type has its own labelled section with emoji header
- Subs: ↑ player in / ↓ player out + minute
- All rows: team flag + gold minute + player name

### Phase 4a — Nav Tabs ✅ (2026-06-12)
- Tab bar: Matches / Standings / Top Scorers
- Active tab: gold text + gold bottom border
- Filter chips visible only on Matches tab
- Each tab re-renders the main area on click

### Phase 4b — Group Standings ✅ (2026-06-12)
- Computed from match results (no FIFA standings API exists)
- All 12 groups sorted by: Pts → GD → GF
- Table: Pos, Flag+Team, P, W, D, L, GF, GA, GD, Pts
- Top 2 rows per group highlighted green (qualification spots)

### Phase 4c — Top Scorers ✅ (2026-06-12)
- Computed from timelines of all finished matches
- Reuses `timelineCache` — already-fetched timelines are free
- Shows top 20: rank, flag, name, team, goal count
- First load fetches all finished match timelines (takes a few seconds)

### Phase 4d — Stage Filter ✅ (2026-06-12)
- Filter chips on Matches tab: All / Groups / R32 / R16 / QF / SF / Final
- Active chip: gold background, black text
- Filters live — no re-fetch

---

## Deployment

Hosted on GitHub Pages — deploys automatically on every `git push` to `main`.

```bash
git add .
git commit -m "your message"
git push
```

---

## Future Features

### Phase 5a — Israel TV Channels on Match Cards ✅ (2026-06-12)
- Fetches Watch API in parallel with matches on page load
- Filters by `IdCountry === "ISR"`, builds `IdMatch → channels[]` map
- Each match card shows clickable channel chips (link to broadcast site)
- Dedup: skip `KAN` if `KAN 11` present; skip `MAKAN` if `MAKAN 33` present
- Channels are non-critical — failures silently ignored, rest of app works fine

### Phase 5b — Scroll to Today on Load
- Auto-scroll to today's date group on page load (Israel timezone)
- Highlight today's date label in gold

### Phase 5c — Attendance in Match Detail
- Show attendance inside expanded detail for finished matches
- Data already in `match.Attendance` — just needs rendering

### Phase 5d — Top Cards Leaderboard
- Yellow card and red card rankings, same approach as top scorers
- Separate ranked lists for yellow and red cards

### Phase 5e — Filter by Team
- Search input on Matches tab
- Type a team name → filters match list to only that team's matches

### Phase 5f — PWA (Add to Home Screen)
- `manifest.json` with app name, theme color, icons
- Service worker to cache shell offline
- Installable on iOS/Android home screen
