# FIFA World Cup 2026 — Developer Log

This file tracks what has been built, how it works, known bugs, and what's planned next.
Use this as the reference when resuming development in a future session.

> **AI/LLM Note:** Read `.github/copilot-instructions.md` first — it contains the project rules, architecture summary, common patterns, and a quick-reference table for where to find things. That file is designed specifically for AI context.

---

## Project Files (V2 — Modular Architecture)

The app was migrated from a monolithic `app.js` + `style.css` to 40 focused modules.
See `README.md` for the full annotated file tree, or `V2-MIGRATION.md` for the migration journal.

| Path | Purpose |
|---|---|
| `index.html` | App shell, nav, tabs, filter chips, team search input |
| `src/` | 24 JS modules (config, state, data, ui, features) |
| `styles/` | 15 CSS partials (base, layout, components, utilities) |
| `sw.js` | Service worker v32 — caches all files for offline |
| `manifest.json` | PWA config |
| `icons/` | icon-192.png, icon-512.png, apple-touch-icon.png |
| `favicon.ico` | Browser tab icon (16/32/48px) |
| `.github/copilot-instructions.md` | AI-focused project context and rules |

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
| Match lineup / live data | `https://api.fifa.com/api/v3/live/football/17/285023/{IdStage}/{IdMatch}?language=en-GB` |
| Israel TV channels | `https://api.fifa.com/api/v3/watch/season/285023?language=en-GB` |

**Key facts:**
- `MatchStatus`: `0` = finished, `1` = upcoming, `3` = live
- `IdStage`: group stage = `289273`, R32 = `289287`, R16 = `289288`, QF = `289289`, SF = `289290`, 3rd place = `289291`, Final = `289292`
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
| 7 | Period start |
| 12 | Attempt at goal |
| 15 | Offside |
| 16 | Corner |
| 18 | Foul |
| 34 | Own goal — `IdTeam` is the **conceding** team, credit goal to the opposite side |
| 57 | Goal prevention (save) — `IdPlayer` is always the goalkeeper |
| 78 | Resume after interruption |
| 83 | Delay (hydration break etc.) |

**VAR:** No VAR event types exist in the FIFA timeline API. Goals are only pushed after VAR confirmation so disallowed goals never appear.

**Flag emoji:**
- FIFA 3-letter codes mapped to ISO alpha-2 via `FIFA_TO_ALPHA2` in `app.js`
- Base codepoint must be `0x1F1E6` (not `0x1F1E0`)
- Special cases: `HAI`→`HT`, `SCO`→🏴󠁧󠁢󠁳󠁣󠁴󠁿 tag emoji, `CUW`→`CW`, `CPV`→`CV`, `COD`→`CD`

---

### ESPN Public API (no key required)

| Purpose | Endpoint |
|---|---|
| Scoreboard (all events, live clock/score) | `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200` |
| Match summary (lineup, stats, leaders) | `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={espnId}` |

**Scoreboard fields used for live polling:**
| Field | Location | Meaning |
|---|---|---|
| `status.type.state` | `competitions[0]` | `"pre"` / `"in"` / `"post"` |
| `status.displayClock` | `competitions[0]` | `"23'"`, `"45+2'"` |
| `status.type.detail` | `competitions[0]` | `"First Half"`, `"Half Time"`, `"Full Time"` etc. |
| `status.period` | `competitions[0]` | 1=1st half, 2=2nd half, 3/4=ET, 5=PSO |
| `competitors[].score` | `competitions[0]` | live score per team |
| `competitors[].statistics[]` | `competitions[0]` | live possession, shots, passes, fouls etc. |

**Summary fields used:**
| Field | Meaning |
|---|---|
| `rosters[].homeAway` | `"home"` or `"away"` |
| `rosters[].roster[].stats[]` | per-player match stats (goals, assists, shots, saves, cards etc.) |
| `rosters[].roster[].starter` | true = starting XI |
| `rosters[].roster[].formationPlace` | pitch slot 1–11 |
| `rosters[].formation` | e.g. `"4-4-2"` |
| `boxscore.teams[].homeAway` | `"home"` or `"away"` |
| `boxscore.teams[].statistics[]` | team-level match stats (possession, shots, passes, tackles etc.) |
| `leaders[]` | **top-level key** (NOT under boxscore) — top performer per stat category |

**ESPN quirks:**
- `CM-L`/`CM-R` and `CF-L`/`CF-R` denote foot preference, NOT lateral position
- `formationPlace` lower numbers = further right; use descending for left-to-right order
- FWD sub-rows: slice by `formationPlace` descending so shadow strikers appear above lone striker
- `leaders` is a top-level key — `data.leaders`, not `data.boxscore.leaders`
- FIFA↔ESPN name discrepancies handled by `ESPN_NAME_MAP` (Czechia, Türkiye, IR Iran, Cabo Verde etc.)

---

## What's Built

### Phase 14 — Author Credit + V2 Plan ✅ (2026-06-13)
- Added `by Waseem Aboliel` credit line under the subtitle in the nav header
- `.nav-credit` styled in gold at 60% opacity — subtle, not distracting
- `sw.js` bumped to `wc2026-v18` so mobile users pick up the update
- `V2-PLAN.md` added to repo — full Svelte migration roadmap

---

### Phase 1–6 ✅ (2026-06-12)
Core app: match list, match detail (goals/cards/subs), standings, stats, Israel TV channels, PWA, auto-scroll to today.

### Phase 7 — Multi-language: English / Hebrew / Arabic ✅ (2026-06-13)
- `STRINGS` object + `t(key, ...args)` helper covers all UI strings in 3 languages
- `TEAM_NAME_HE` map (48+ teams) for Hebrew team names
- Arabic match data fetched from `ar-SA` endpoint in parallel
- Full RTL layout via `[dir="rtl"]` CSS overrides
- Timeline descriptions always fetched in `en-GB` (Arabic is unparseable for regex)
- `espnStatsCache` invalidated on language switch so team names rebuild correctly

### Phase 8 — Lineups & Pitch View ✅ (2026-06-13)
- FIFA lineup + ESPN lineup fetched in `Promise.all` with timeline — zero extra latency
- `espnLineupCache` + `lineupCache` Maps prevent re-fetching
- Green CSS pitch: away team top half, home team bottom half, facing each other
- Formation parsed into row sizes; `lateralSort()` uses `posAbbr` + `formationPlace` for left-to-right order
- `mergeFieldStatus()` copies FIFA `fieldStatus` into ESPN players by shirt number for live sub tracking

### Phase 9 — Match Stats Panel ✅ (2026-06-13)
- 16 stat bars inside each finished match detail: possession, shots, passes, tackles, cards etc.
- Top Performers strip: best player per category from `data.leaders`
- RTL-aware: columns swap in Hebrew/Arabic. No extra API call — data from ESPN summary already fetched.

### Phase 10 — ESPN-Powered Stats Tab ✅ (2026-06-13)
- `buildEspnStatsCache()` batches all finished ESPN summaries with `Promise.allSettled`
- **Player Stats — 10 leaderboards:** Goals + Assists + Clean Sheets (FIFA), Shots, On Target, Saves, Fouls, Offsides, Yellow, Red (ESPN)
- **Team Stats — 12 leaderboards:** Goals/Game, Conceded/Game, Clean Sheets (FIFA), Possession %, Shots, On Target, Passes, Pass Accuracy, Tackles, Interceptions, Yellow, Red (ESPN)

### Phase 11 — Live Match Updates ✅ (2026-06-13)
- **Data sources:** ESPN scoreboard (clock, score, live stats every 15s) + FIFA timeline (events) + FIFA live endpoint (field status)
- **11a — Live cards:** `MatchStatus === 3` = live. Green border, live score, ticking clock, pulsing `🟢 LIVE` badge. Score flashes gold on change. Pre-match cards upgrade automatically on kick-off.
- **11b — Live detail:** Big score + clock header, live stats bar (possession/shots/fouls), live events (goals/cards/subs), live pitch — all refresh every 15s via `liveDetailPoller`. Patched in place without DOM rebuild.
- **11c — Live pitch field status:** Subbed-off players greyed out (`.pitch-player--off`), subbed-on players green glow (`.pitch-player--on`) with ↑/↓ indicators.
- **11d — Live standings:** `computeStandings` includes live matches using `espnLiveData` scores. Live teams show pulsing `🟢` badge. Standings auto-refresh every 15s via `liveStandingsPoller`.
- **End of match:** When ESPN flips to `state: "post"`, `MatchStatus` is set back to `STATUS_FINISHED`, card replaced with finished layout, live detail poller stops and re-renders as finished match.

---

## Known Bugs (all fixed)

| Bug | Fix |
|---|---|
| Arabic timeline showed raw Arabic descriptions | Always fetch timelines in `en-GB` |
| Stats leaderboards empty in Arabic | Stats always use EN timelines |
| Standings stuck loading in Arabic | Filter by `IdStage` not `StageName` |
| Service worker error on `file://` | Guard `location.hostname !== ''` before SW registration |
| Manifest CORS error on `file://` | Inject `<link rel="manifest">` via JS only when hostname is truthy |
| GK clean sheet name showed as "[Team] GK" | Use FIFA lineup API; starter with `Position === 0` is the GK |
| Own goals not shown | FIFA Type 34 = own goal; `IdTeam` is conceding team — credit to opposite side |
| Match stats panel disappeared after translation | `t =>` lambda shadowed global `t()` in `fetchEspnLineup` — renamed to `bt =>` |
| Top Performers always empty | `leaders` is top-level (`data.leaders`), not `data.boxscore.leaders` |
| Live lineup/subs not showing in live detail | `espnLive` (stats object) was passed as ESPN lineup — now `fetchEspnLineup` called separately |
| Live match stayed as live card after match ended | ESPN `state: "post"` now flips `MatchStatus` back to `STATUS_FINISHED` and rebuilds card |
| Penalty goals not shown in live details | FIFA timeline delays goal events by 5–15min; added ESPN scoreboard `details` fallback |
| Penalty goal regex didn't match | FIFA uses "converts the penalty" — regex now matches `scores\|converts` |

---

## Next Phases

### Phase 12 — Knockout Bracket View + Standings Qualification Fix

#### 12a — Fix standings qualification highlighting ✅ (2026-06-13)

**How R32 qualification works:**
- 48 teams, 12 groups of 4
- 1st + 2nd from every group qualify automatically → 24 teams
- The **8 best 3rd-place teams** across all 12 groups also qualify → 8 teams
- Total: 32 teams in R32

**3rd-place ranking tiebreakers (in order):**
1. Points
2. Goal difference
3. Goals scored
4. Fair play (fewest yellow/red cards)
5. FIFA ranking (last resort)

**What needs fixing in the standings:**
- Currently top 2 rows are highlighted green — correct
- 3rd place is never highlighted — incorrect once group stage is partially/fully done
- Need to compute the best 8 thirds across all 12 groups and highlight those rows in a **different shade** (e.g. light blue/teal) to distinguish "qualified as best third" from "qualified as group winner/runner-up"
- During the group stage this is live/provisional — show it updating in real time
- Teams outside the best 8 thirds show no highlight (eliminated)

**Implementation notes:**
- After `computeStandings` builds all groups, extract all 3rd-place teams into a separate array
- Sort them by the tiebreaker order above (pts → gd → gf → cards)
- Top 8 of that array get a `qualifyThird: true` flag
- Cards data for fair play comes from FIFA timeline (already fetched) or ESPN `boxscore.teams[].statistics.yellowCards` + `redCards`
- In `renderStandings`, add a third CSS class `.qualify-third` for these rows (different colour from `.qualify`)
- Works with live standings too — `espnLiveData` scores already feed into `computeStandings`

#### 12b — Knockout Bracket View ✅ (2026-06-13, redesigned 2026-06-13)
- New **Bracket** tab (between Standings and Stats) with two sub-tabs:
  - **R32:** 16 match cards in list format, same card style as the Matches tab. TBD slots show readable resolved labels — "Group A Winner", "Best 3rd (A/B/C/D/F)" — fully translated in Hebrew/Arabic.
  - **Bracket:** Visual tournament bracket — flexbox columns with CSS connector lines between rounds. R16 → QF → SF → Final converge left to right, 3rd place match shown separately below.
- **Layout:** Each round is a flex column with `justify-content: space-around` so each round's games naturally centre between their feeder matches. Connector columns between rounds draw bracket lines via `::before` (bracket shape) and `::after` (horizontal line).
- **Game cards (`br-game`):** two-row layout per match — each team row shows flag, name, score. Winner row gets gold highlight background, loser row dims. Final match gets special gold border with glow.
- **TBD slots:** show raw FIFA placeholders (`W74`, `1A`, `2B`, `3ABCDF`) instead of recursively expanded labels. Real team names + flags replace them once matches are decided.
- **R16/QF ordering:** `89+90→QF97`, `93+94→QF98`, `QF97+98→SF101` (top half); `91+92→QF99`, `95+96→QF100`, `QF99+100→SF102` (bottom half).
- Always LTR regardless of app language direction.
- Tapping a finished/live game navigates to the Matches tab and opens that match's detail panel.
- `sw.js` bumped to `wc2026-v20`.

### Phase 15 — Tab Scroll Behaviour ✅ (2026-06-13)
- Switching to any tab now scrolls to the top instantly via `window.scrollTo({ top: 0, behavior: 'instant' })`
- Returning to Matches tab auto-scrolls to today's matches (or next match day) every time
- `renderActiveTab()` passes `scrollToToday = true` when rendering Matches tab

### Phase 13 — Player Profiles ✅ (2026-06-13)
- Tap any player name in stats leaderboards or match detail events to open a bottom-sheet profile
- Shows: flag, name, team, stat pills (goals / assists / yellow / red), then full match-by-match event history (minute + match scoreline + date)
- Data sourced entirely from `timelineCache` — no new API needed
- `playerSpan(name)` wraps any name in a tappable `.player-link` span
- `bindPlayerLinks(container, matches)` attaches click handlers after any HTML render
- `buildPlayerProfile(name, matches)` scans all cached timelines and returns structured profile data
- Profile overlay slides up from bottom; close by ✕ button, backdrop tap, or swipe down
- RTL-aware: close button flips side, header padding mirrors, section titles lose uppercase

### Phase 13b — Team Profiles ✅ (2026-06-13)
- Tap any team name anywhere in the app to open a bottom-sheet team profile
- Shows: flag, team name, W/D/L/GF/GA record (from finished matches), then all tournament matches in order
- Each match row shows: opponent flag + name, score (green=win / grey=draw / red=loss), stage, date
- Live matches show live score with 🟢
- `teamSpan(name, teamId)` wraps team names in `.team-link` spans
- `bindTeamLinks(container)` attaches click handlers; called after every render that includes team names
- `openTeamProfile(teamId, matches)` builds and displays the overlay
- Wired in: match cards, standings table, Goals/Assists/Clean Sheets/ESPN leaderboard rows

### Phase 16 — Live Goal Fallback (ESPN details) ✅ (2026-06-13)
- **Problem:** FIFA timeline API delays publishing goal events during live matches (5–15 min lag), so goals don't appear in the live detail view even though the score updates.
- **Solution:** ESPN scoreboard `competitions[0].details` has real-time events (goals, cards) within seconds.
- **`fetchEspnLiveStats`** now also returns `details` array + `homeTeamId`/`awayTeamId` from ESPN scoreboard.
- **`espnDetailsToEvents(espnLive)`** — new helper that converts ESPN details into the same `{ goals, yellowCards, redCards }` format as `parseTimeline`.
- **Fallback logic:** Compare `goals.length` from FIFA against `expectedGoals` (sum of live score). If FIFA has fewer goals than expected → use ESPN goals. Once FIFA catches up, it takes over again (richer data with assists).
- **Cards fallback:** If FIFA has no yellow/red cards yet, use ESPN's. Subs always come from FIFA (ESPN doesn't provide them in `details`).
- **Penalty regex fix:** FIFA descriptions use `"converts the penalty"` — regex now matches both `scores` and `converts` across all parsing functions (parseTimeline, renderScorers, player profiles).

### Phase 17 — Unified Player Profiles (FIFA + ESPN) ✅ (2026-06-14)
- **Problem:** Player profiles only showed data from whichever API was already cached. Clicking a player from the Goals tab (FIFA) showed no ESPN stats; clicking from Offsides tab (ESPN) showed no match history.
- **`openPlayerProfile` is now async** — fetches both ESPN stats cache and FIFA timelines on demand before building the profile.
- **`resolvePlayerNames(playerName)`** — builds a Set of all name variants for a player using:
  - Case-insensitive matching against ESPN stats cache
  - Shirt number matching across ESPN/FIFA lineups (same team, same shirt → same player)
  - Bidirectional: works whether input is ESPN name or FIFA name
- **Case-insensitive timeline matching** — `matchesName()` helper lowercases all variants so `"Folarin BALOGUN"` (FIFA) matches `"Folarin Balogun"` (ESPN).
- **Profile now shows ESPN-only stats:** shots, shots on target, saves, fouls, offsides — in addition to FIFA goals/assists/cards with per-match history.
- **ESPN goals/assists fallback removed** — ESPN `totalGoals` is always 0 for GKs (they have a separate `goalsConceded` field), so filtering by `position !== 0` is required in scorers leaderboard.

---

### Phase 18 — ESPN-Primary Migration ✅ (2026-06-14)

**Problem:** FIFA timeline API is unreliable — it regularly misses goals (penalties, late goals) and uses uppercase-only surnames causing name mismatch issues with ESPN data. This forced complex fallback logic and name-bridging code that still doesn't cover all cases (e.g. "RAÚL" vs "Raúl Jiménez").

**Solution:** Make ESPN the single source of truth for all player/event data. Keep FIFA only for what it does uniquely well (match schedule, bracket structure, TV channels).

#### API Responsibilities After Migration

| Feature | Source | API |
|---------|--------|-----|
| Match list (104 matches) | FIFA | `MATCHES_API` |
| Bracket structure | FIFA | `MATCHES_API` |
| TV Channels | FIFA | `WATCH_API` |
| Standings (W/D/L/GF/GA) | FIFA | `MATCHES_API` (computed from scores) |
| Match detail events (goals/cards/subs) | **ESPN** | Scoreboard `details[]` + FIFA timeline for subs |
| Match detail lineup | ESPN + FIFA | `ESPN_SUMMARY_API` + `LINEUP_API` (fieldStatus merge) |
| Match detail stats panel | ESPN | `ESPN_SUMMARY_API` boxscore |
| Live scores/clock | ESPN | `ESPN_INDEX_API` |
| Live events | **ESPN** | Scoreboard `details[]` + FIFA timeline for subs |
| Stats: Top Scorers | **ESPN** | `ESPN_SUMMARY_API` per-player `totalGoals` |
| Stats: Top Assists | **ESPN** | `ESPN_SUMMARY_API` per-player `goalAssists` |
| Stats: Clean Sheets | **ESPN** | GK `goalsConceded === 0` per match |
| Stats: Cards | **ESPN** | `ESPN_SUMMARY_API` per-player `yellowCards`/`redCards` |
| Stats: Player stats | ESPN | Already using ESPN |
| Stats: Team stats | ESPN | Already using ESPN |
| Player profiles | **ESPN** | Aggregated stats + per-match events from `details[]` + assists from roster stats |

#### What was implemented:

- **`renderScorers`** — rewritten to use `espnStatsCache.playerMap` (filters out GKs via `position !== 0`)
- **`renderAssists`** — rewritten to use `espnStatsCache.playerMap.assists`
- **`renderCleanSheets`** — rewritten using `cleanSheets` counter tracked in `buildEspnStatsCache` (starter GK with `goalsConceded === 0`)
- **`buildEspnStatsCache`** — enhanced: now stores `position`, `cleanSheets` per player; fetches ESPN scoreboard once to populate `espnMatchDetailsCache`
- **`espnMatchDetailsCache`** — new Map keyed by FIFA `IdMatch` storing ESPN scoreboard details per match
- **Match detail events** — ESPN `details[]` is now primary for goals/cards; FIFA timeline only used for subs
- **Live detail events** — same ESPN-primary approach in `renderLiveDetail` and `patchLiveDetail`
- **Player profiles** — completely rewritten:
  - `buildPlayerProfile` uses ESPN stats cache for aggregates + `espnMatchDetailsCache` for per-match event history + `espnLineupCache` for per-match assists
  - `openPlayerProfile` only needs to call `buildEspnStatsCache` (no more FIFA timeline fetching)
- **Removed dead code:** `resolvePlayerNames`, `matchesName`, shirt-number name bridging, FIFA timeline scanning in stats tabs

#### Bug fixes in this phase:

- **Penalty name bug** — `(pen)` separated from player name; stored as `penalty: true` flag, displayed outside the clickable `playerSpan`
- **OG side attribution** — ESPN's `team` field for OGs = the benefiting team (not the scorer's team); removed incorrect side flip
- **Halftime sub prefix** — FIFA descriptions like "Before the second half begins FABINHO (in)..." now strip the prefix, showing only "FABINHO" as clickable name; minute shows "HT"
- **"Match History" renamed** — now "Tournament Events" / "אירועי טורניר" / "أحداث البطولة"
- **FIFA `converts` penalty detection** — `parseTimeline` now sets `penalty: true` on goals matching "converts"

---

### Phase 19 — Live Match UX Improvements ✅ (2026-06-15)

**Changes:**

1. **Removed duplicate header in expanded live match** — When expanding a live match card, the detail view no longer repeats the teams/score/clock. The card itself already shows that; the expanded section now starts directly with stats and events.

2. **Match clock states on card:**
   - **Pre-match ("Starting Soon")** — When ESPN reports `state: 'pre'` and kickoff is ≤10 min away, the card's clock/time element shows "Starting Soon" (translated in EN/HE/AR)
   - **Halftime ("HT")** — Detected via regex `/half\s*time/i` on ESPN's `status.type.detail` OR `period === 2 && clock === '0:00'`; card clock shows translated HT text
   - **Post-match ("Match Ended")** — When ESPN reports `state: 'post'`, shown for ~5 min after match ends on the FT status badge

3. **Faster polling** — Global poller and per-match detail poller reduced from 15s to 10s (`LIVE_POLL_MS = 10000`)

4. **Poller stays alive for pre-match** — `stopLivePoller()` now also checks if any ESPN events are in `'pre'` state, keeping the poller running for "Starting Soon" detection

5. **Translations added:** `liveStartingSoon` and `liveMatchEnded` in all 3 languages

**Service worker:** bumped to `wc2026-v28`

---

### Phase 20 — Code Cleanup ✅ (2026-06-15)

- **Removed `BRACKET_ROUNDS`** — 8-line constant defined but never referenced (bracket uses inline logic)
- **Fixed `STAGE_ID['Final']` bug** — Was `289291` (3rd-place match); corrected to `289292` (actual Final)
- **Simplified redundant ternary** in `buildEventSections` — both branches produced the same `t('detailNoEvents')`
- **Removed unused `tvLabel` translation key** — defined in all 3 languages but never called (📺 emoji is hardcoded in `buildChannelsRow`)
- **Service worker:** bumped to `wc2026-v29`

---

### Phase 21 — Stats Enhancements ✅ (2026-06-18)

- **Team filter for Player Stats** — scrollable row of team chips above the stat sub-tabs. Select a team to see ALL its players for the current stat (no limit). Includes a search input to quickly find teams.
- **New state:** `statsTeamFilter` in `state.js` (null = all, teamId = filtered)
- **"Total Conceded"** added to TEAM_SUBS before Conceded/Game (same pattern as Total Goals / Goals per Game)
- **Standings table fix** — added `max-width: 130px` + ellipsis on `.standings-team` to prevent long names (e.g. Bosnia and Herzegovina) from pushing stat columns apart
- **Translations:** `statsAllTeams`, `teamTotalConceded` added to EN, HE, AR
- **Service worker:** bumped to `wc2026-v35`

---

## V2 — Code Splitting & Modularization (In Progress)

> Full migration plan, progress, and technical details: **[V2-MIGRATION.md](V2-MIGRATION.md)**

Splitting the monolithic `app.js` (3,200 lines) + `style.css` (1,900 lines) into focused ES modules under `src/` and CSS partials under `styles/`. Step 1 completed — config, state, data helpers, and UI shell extracted (11 modules). The existing `app.js` remains the working entry point until migration is fully wired.
