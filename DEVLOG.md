# FIFA World Cup 2026 — Developer Log

This file tracks what has been built, how it works, known bugs, and what's planned next.
Use this as the reference when resuming development in a future session.

---

## Project Files

| File | Purpose |
|---|---|
| `index.html` | App shell, nav, tabs, filter chips, team search input |
| `style.css` | All styles, design tokens, responsive layout |
| `app.js` | All logic: fetch, parse, render, tabs, filters, standings, stats, live polling |
| `manifest.json` | PWA config |
| `sw.js` | Service worker — caches shell files, lets API calls go to network |
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
| Match lineup / live data | `https://api.fifa.com/api/v3/live/football/17/285023/{IdStage}/{IdMatch}?language=en-GB` |
| Israel TV channels | `https://api.fifa.com/api/v3/watch/season/285023?language=en-GB` |

**Key facts:**
- `MatchStatus`: `0` = finished, `1` = upcoming, `3` = live
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
  - **Bracket:** Visual tournament bracket — top 4 and bottom 4 R16 matches converge through QF and SF to the Final in the centre-right column. 3rd place shown below Final.
- **Layout:** Each round is a flex column with an internal CSS grid (`grid-template-rows: repeat(19, 26px)`). Each `bslot` is placed with `grid-row` so QF slots are vertically centred between their two R16 feeders, SF between QF pairs, and Final between both SFs.
- **Visual bracket slots (`bslot`):** each shows both teams + flag, score (finished) or kickoff time (upcoming). Winner highlighted in gold. Live slots have green border + glow. Upcoming slots dimmed.
- **TBD slots:** show short `W89`/`W90` labels until R32 finishes, then real team names + flags replace them automatically.
- Always LTR regardless of app language direction.
- Tapping a finished/live slot navigates to the Matches tab and opens that match's detail panel.
- Match numbering chain hard-coded: R16 89–96 → QF 97–100 → SF 101–102 → 3rd place 103 / Final 104.
- All round labels use `t()` — translated in all 3 languages.

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
