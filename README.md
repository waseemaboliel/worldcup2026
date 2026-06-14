# 🏆 FIFA World Cup 2026

A mobile-first web app for World Cup 2026 — live scores, standings, bracket, and stats for every match.
Always up to date from the live FIFA and ESPN APIs. No login, no ads, no install required.

**Live:** [https://waseemaboliel.github.io/worldcup2026](https://waseemaboliel.github.io/worldcup2026)

---

## Features

- **Matches** — all 104 matches grouped by date, kickoff times in Israel timezone
- **Live scores** — scores, clock, and period update every 15 seconds during a match; live match card has green border and pulsing 🟢 badge
- **Expand any match** — goals, assists, yellow/red cards, substitutions, attendance; live matches show a real-time score header and stats bar
- **Lineups** — visual pitch with formation, player positions, and sub tracking (subbed-off players greyed, subbed-on in green)
- **Match Stats** — possession, shots, passes, tackles, and 12 more stat bars with top performers per match (ESPN)
- **Standings** — all 12 group tables (A–L), updated live; top 2 highlighted green, best 8 third-place teams highlighted blue
- **Bracket** — Round of 32 match list + visual knockout tree (R16 → QF → SF → Final + 3rd place); tap any finished match to open its detail
- **Player Stats** — goals, assists, clean sheets, shots, on target, saves, fouls, offsides, yellow & red cards (FIFA + ESPN)
- **Team Stats** — goals/game, conceded/game, clean sheets, possession %, shots, passes, pass accuracy, tackles, interceptions, yellow & red cards (ESPN)
- **Player profiles** — tap any player name (in match events or leaderboards) to see their tournament goals, assists, and cards with match-by-match history
- **Team profiles** — tap any team name (in match cards, standings, or leaderboards) to see their W/D/L record and every match they've played
- **Israel TV channels** — shown on every match card (Kan Box, KAN 11, MAKAN 33, Sport 1, etc.)
- **Filter by stage** — Groups, R32, R16, QF, SF, Final
- **Search by team** — type any team name to filter matches
- **Multi-language** — English / עברית / العربية — full RTL support, translated UI, Hebrew and Arabic team names, localised dates
- **Installable** — works as a full-screen PWA on iPhone and Android

---

## Install on iPhone

1. Open [https://waseemaboliel.github.io/worldcup2026](https://waseemaboliel.github.io/worldcup2026) in **Safari**
2. Tap the **Share button** (box with arrow pointing up, bottom toolbar)
3. Tap **Add to Home Screen**
4. Tap **Add**

The app opens full screen with no browser bar, just like a native app.

---

## Install on Android

1. Open the link in **Chrome**
2. Chrome will show a banner at the bottom — tap **Install**
3. Or: tap the three-dot menu → **Add to Home Screen**

---

## Deploy an Update

The site is hosted on GitHub Pages and deploys automatically on every push to `main`.

```bash
git add .
git commit -m "your message"
git push
```

> **Note:** After pushing, bump the `CACHE` version in `sw.js` (e.g. `wc2026-v2` → `wc2026-v3`) so existing users get the latest version instead of the cached one.

---

## Tech Stack

Pure HTML / CSS / JavaScript — no frameworks, no build tools, no dependencies.

| File | Purpose |
|---|---|
| `index.html` | App shell, nav, tabs, filters |
| `style.css` | All styles and design tokens |
| `app.js` | All logic: data fetch, rendering, tabs, stats, live polling |
| `manifest.json` | PWA config (name, icons, theme) |
| `sw.js` | Service worker — caches app shell for offline/fast load |
| `icons/` | App icons for home screen and browser tab |

---

## Documentation

| File | Description |
|---|---|
| [DEVLOG.md](DEVLOG.md) | Full developer log — every feature built (Phases 1–20), API reference, known bugs and fixes, design decisions. The single source of truth for how the app works and what was done. |
| [V2-MIGRATION.md](V2-MIGRATION.md) | V2 modularization plan and progress — splitting the monolithic `app.js` into ES modules. Contains the target file structure, 10-step migration strategy, architectural principles, and detailed completion notes for each step. |
