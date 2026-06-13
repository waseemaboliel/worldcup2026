# 🏆 FIFA World Cup 2026

A mobile-first web app for World Cup 2026 — live scores, standings, and stats for every match.
Always up to date from the live FIFA API. No login, no ads, no install required.

**Live:** [https://waseemaboliel.github.io/worldcup2026](https://waseemaboliel.github.io/worldcup2026)

---

## Features

- **Matches** — all 104 matches grouped by date, kickoff times in Israel timezone, live scores
- **Expand any match** — goals, assists, yellow/red cards, substitutions, attendance, lineups on a visual pitch
- **Match Stats** — possession, shots, passes, tackles, and 12 more stat categories with proportional bars, plus top performers per match (from ESPN)
- **Standings** — all 12 group tables, updated live from match results
- **Player Stats** — goals, assists, clean sheets, shots, shots on target, saves, fouls, offsides, yellow & red cards (powered by ESPN)
- **Team Stats** — goals/game, conceded/game, clean sheets, possession %, shots, passes, pass accuracy, tackles, interceptions, yellow & red cards (powered by ESPN)
- **Israel TV channels** — shown on every match card (Kan Box, KAN 11, MAKAN 33, Sport 1, etc.)
- **Filter by stage** — Groups, R32, R16, QF, SF, Final
- **Search by team** — type any team name to filter matches
- **Installable** — works as a full-screen app on iPhone and Android
- **Multi-language** — English / עברית / العربية — full RTL support, translated UI, Arabic team names, Hebrew team names, localised dates

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
| `app.js` | All logic: data fetch, rendering, tabs, stats |
| `manifest.json` | PWA config (name, icons, theme) |
| `sw.js` | Service worker — caches app shell for offline/fast load |
| `icons/` | App icons for home screen and browser tab |
