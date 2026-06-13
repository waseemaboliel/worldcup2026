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

## API Reference

### FIFA APIs

| Data | Endpoint |
|---|---|
| All 104 matches (EN) | `https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104` |
| All 104 matches (AR) | `https://api.fifa.com/api/v3/calendar/matches?language=ar-SA&idCompetition=17&idSeason=285023&count=104` |
| Match timeline | `https://api.fifa.com/api/v3/timelines/17/285023/{IdStage}/{IdMatch}?language=en-GB` |
| Match lineup (FIFA) | `https://api.fifa.com/api/v3/live/football/17/285023/{IdStage}/{IdMatch}?language=en-GB` |
| Israel TV channels | `https://api.fifa.com/api/v3/watch/season/285023?language=en-GB` |

**Key facts:**
- `MatchStatus`: `0` = finished, `1` = upcoming
- `IdStage`: group stage = `289273`, R32 = `289287`, R16 = `289288`, QF = `289289`, SF = `289290`, Final = `289291`
- 12 groups (A–L), `IdGroup` from `289275` to `289286`
- `BallPossession` field exists in match API but is always `null` — FIFA does not expose it
- No dedicated standings or scorers API — computed from match/timeline data

**Timeline event types:**
| Type | Meaning |
|---|---|
| 0 | Goal |
| 1 | Assist (appears just before its Goal event) |
| 2 | Yellow card |
| 3 | Red card |
| 5 | Substitution |
| 57 | Goal Prevention (save) — `IdPlayer` is always the goalkeeper |

**Flag emoji:**
- FIFA 3-letter codes mapped to ISO alpha-2 via `FIFA_TO_ALPHA2` in `app.js`
- Base codepoint must be `0x1F1E6` (not `0x1F1E0`)
- Special cases: `HAI`→`HT`, `SCO`→🏴󠁧󠁢󠁳󠁣󠁴󠁿 tag emoji, `CUW`→`CW`, `CPV`→`CV`, `COD`→`CD`

### ESPN Public API (no key required)

| Purpose | Endpoint |
|---|---|
| All 104 event IDs | `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200` |
| Match lineup + formation | `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={espnId}` |

**ESPN roster fields per player:**
| Field | Meaning |
|---|---|
| `starter` | true = starting XI |
| `jersey` | shirt number |
| `athlete.displayName` | full name |
| `position.abbreviation` | granular position: `G`, `LB`, `RB`, `CD-L`, `CD-R`, `LM`, `RM`, `CM-L`, `CM-R`, `CF-L`, `CF-R`, `F` etc. |
| `formationPlace` | pitch slot 1–11; lower numbers = further right within a line |
| `formation` (team level) | e.g. `"4-4-2"` — matches actual tactical setup ✅ |

**Important ESPN quirks:**
- `CM-L`/`CM-R` and `CF-L`/`CF-R` denote foot preference, NOT lateral position — don't sort by suffix
- `formationPlace` is not grouped by row — use position bucket to assign rows, then `formationPlace` descending for left-to-right order within ambiguous positions
- FWD sub-rows (e.g. shadow strikers in `3-4-2-1`): slice by `formationPlace` descending (higher fp = closer to midfield = shadow striker row)

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

### Phase 3 — Match Detail Panel ✅ (2026-06-12)
- Click card → expands inline with fadeIn animation; one card open at a time
- Finished matches: timeline fetched on demand; `timelineCache` Map prevents re-fetching
- Goals with assists, yellow/red cards, substitutions
- Attendance shown at top
- Upcoming matches: "No match details yet"
- Two-column layout: home events always LEFT, minute CENTRE, away events always RIGHT — `direction: ltr` hardcoded so it never flips in RTL. In RTL columns swap so events stay under the correct team

### Phase 4 — Tabs, Standings, Stats, Filters ✅ (2026-06-12)
- Tabs: Matches / Standings / Stats; filter chips + search visible only on Matches tab
- Group standings computed from match scores (no API); 12 groups sorted by Pts → GD → GF; top 2 highlighted green
- Stats tab: Player Stats (Goals, Assists, Clean Sheets, Yellow, Red) + Team Stats (Goals/Game, Conceded/Game, Clean Sheets, Yellow, Red)
- Stage filter chips: All / Groups / R32 / R16 / QF / SF / Final — filter by `IdStage` (language-independent)
- Team search: live, case-insensitive, combines with stage filter

### Phase 5 — Israel TV, PWA, UX Polish ✅ (2026-06-12)
- Israel TV channels shown on every match card (Kan Box always shown green; dedup KAN/KAN 11 and MAKAN/MAKAN 33)
- Auto-scroll to today's date group on load; today label shown in gold
- PWA: `manifest.json` + `sw.js` (cache shell for offline/fast load)

### Phase 6 — Extended Stats ✅ (2026-06-12)
- Player Stats: top scorers, assists, clean sheets (originally from timeline heuristic, replaced in Phase 8b), yellow/red card leaders
- Team Stats: 5 sub-tabs, first 3 from match scores, cards from timelines

### Phase 7 — Multi-language: English / Hebrew / Arabic ✅ (2026-06-13)

**Language support:**
| | English | Hebrew | Arabic |
|---|---|---|---|
| Team names | API `en-GB` | `TEAM_NAME_HE` map | API `ar-SA` |
| Stadium / City / Group | API `en-GB` | API `en-GB` (no Hebrew endpoint) | API `ar-SA` |
| Stage badges | `STRINGS.en` | `STRINGS.he` | `STRINGS.ar` |
| UI text | `STRINGS.en` | `STRINGS.he` | `STRINGS.ar` |
| Date headings | `en-GB` locale | `he-IL` locale | `ar-SA` locale |
| Timeline descriptions | API `en-GB` | API `en-GB` | API `en-GB` (Arabic unparseable) |
| Page direction | LTR | RTL | RTL |

- **Toggle:** `EN / עב / عر` buttons right-pinned in nav; `localStorage` persistence; `dir`/`lang` set on `<html>`; nav always LTR (`direction: ltr` on `.nav-inner`)
- **String system:** `STRINGS` object + `t(key, ...args)` helper; covers all UI strings with Hebrew and Arabic translations
- **Arabic match data:** `allMatchesAr` fetched in parallel on load; `activeMatches()` routes to AR data when Arabic active
- **Hebrew team names:** `TEAM_NAME_HE` map (48+ teams keyed by FIFA 3-letter code); `getTeamName()` uses it when `currentLang === 'he'`
- **Hebrew content:** dates via `he-IL` locale (`Intl`); stage badges translated in all 3 languages; `text-transform: uppercase` suppressed in RTL
- **RTL layout:** `[dir="rtl"]` overrides for match card border, team row direction, standings alignment, filter chip scroll, scorer labels

### Phase 8 — Lineups, Pitch View & Clean Sheet Fix ✅ (2026-06-13)

- **Phase 8a — Lineup fetch & cache:** `fetchTimeline` + `fetchLineup` (FIFA) + `fetchEspnLineup` (ESPN) all run in `Promise.all` — zero extra latency. `lineupCache` + `espnLineupCache` Maps prevent re-fetching. FIFA lineup normalised to `{ formation, coach, starters[], subs[] }` with `{ id, name, shirt, position(0-3) }` per player. ESPN lineup normalised to same shape with additional `posAbbr` and `formationPlace`.
- **Phase 8b — Clean sheet fix:** `renderCleanSheets` now uses `fetchLineup` (FIFA) per match; starting GK = `starters.find(p => p.position === 0)`. Keyed by `IdPlayer` so different GKs across matches accumulate separately. No more `[Team] GK` fallback.
- **Phase 8c — ESPN bridge:** `fetchEspnIndex()` fetches all 104 ESPN event IDs once on load, builds `fifaToEspn` Map (`IdMatch → espnEventId`) by matching date + normalised team names. 72/72 named matches bridge correctly. `ESPN_NAME_MAP` handles FIFA↔ESPN name discrepancies (IR Iran, Cabo Verde, Czechia, Türkiye, etc.).
- **Phase 8d — Pitch view:** Green CSS pitch, away team in top half (GK at top, FWD towards centre), home team in bottom half (FWD towards centre, GK at bottom) — teams face each other. Formation string parsed into row sizes (`"3-4-2-1"` → `[1,3,4,2,1]`). Players assigned to rows by position bucket (GK/DEF/MID/FWD), then formation string splits MID and FWD into sub-rows. Within each row: `lateralSort()` uses `lateralOrder(posAbbr)` for unambiguous positions (LB=0, CD-L=1, CD-R=3, RB=4) with `formationPlace` descending as tiebreaker (lower fp = further right in ESPN's scheme). FWD sub-rows sliced by descending fp so shadow strikers (higher fp) appear in their own row above the lone striker. Substitutes shown in two columns below the pitch (home left, away right). Falls back silently if no lineup data available.

---

## Known Bugs (all fixed)

| Bug | Fix |
|---|---|
| Arabic timeline showed raw Arabic descriptions instead of player names | Always fetch timelines in `en-GB`; section titles translated via `t()` |
| Stats leaderboards empty in Arabic | Stats always use EN timelines (name parsing relies on English regex) |
| Standings stuck loading in Arabic | Filter by `IdStage` (language-independent) instead of `StageName` string |
| Service worker error on `file://` | Guard `location.hostname !== ''` before SW registration |
| Manifest CORS error on `file://` | Inject `<link rel="manifest">` via JS only when `location.hostname` is truthy |
| GK clean sheet name showed as "[Team] GK" | Use FIFA lineup API; starter with `Position=0` is always the correct GK |

---

## Future Ideas

### Phase 9 — Live Match Updates
- Auto-refresh scores for in-progress matches (poll the matches API every ~60 seconds)
- Show a 🟢 LIVE badge on match cards when a match is in progress
- Update score and minute in real time without a full page reload
- Only poll when the Matches tab is active and at least one match is currently live

### Phase 10 — Knockout Bracket View
- New tab or sub-view showing the full tournament bracket from R32 onwards
- Visual bracket: each round as a column, matches connect winners left-to-right
- Completed matches show scores; upcoming show TBD with kickoff time
- Clicking a match in the bracket expands it (same detail panel as the Matches tab)

### Phase 11 — Player Profiles
- Tap any player name in the stats leaderboards or expanded match detail to open a profile
- Profile shows: flag, name, team, all goals / assists / cards across the tournament with match and minute
- Back button / close to return to previous view
- Data already available in `timelineCache` — no new API needed

### Phase 12 — Push Notifications (PWA)
- Alert users when a match they care about is about to kick off
- Use the Web Push API via the service worker
- Options: notify for all matches, or only bookmarked teams
- Requires a small backend (push subscription storage) — not purely static
