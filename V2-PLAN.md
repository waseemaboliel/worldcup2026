# FIFA World Cup 2026 — V2 Migration Plan (Vanilla JS → Svelte)

This file is the complete roadmap for rebuilding the app in Svelte.
Current state: one repo, 3 files (`app.js` 3239 lines, `style.css` 1871 lines, `index.html` 70 lines).

---

## Why V2

| Problem in V1 | How V2 fixes it |
|---|---|
| `app.js` is 3239 lines, everything in one file | Split into ~15 focused components |
| Manual DOM patching for live updates | Reactive Svelte stores — update a variable, UI updates automatically |
| Hard to add features without breaking others | Each component is isolated |
| No build tooling — hard to catch bugs early | TypeScript + Vite gives instant feedback |
| Multi-language state managed with globals | A single `language` store, all components react to it |

---

## Tech Decisions

| Choice | Decision | Reason |
|---|---|---|
| Framework | **Svelte 5** | Smallest bundle, no virtual DOM, closest to vanilla JS mentally |
| Build tool | **Vite** | Instant dev server, fast builds, standard Svelte tooling |
| Language | **TypeScript** | Catches bugs early, especially useful for API response shapes |
| Styling | **Keep existing `style.css`** | Already well-structured with design tokens — just move it in |
| Routing | **No router** | App is tab-based, not page-based — Svelte conditional rendering is enough |
| State | **Svelte stores** | Built-in, no extra library needed |
| Hosting | **GitHub Pages** | Same as V1, just add a GitHub Actions build step |
| PWA | **Same `manifest.json` + `sw.js`** | Copy as-is, Vite handles asset paths |

---

## Target File Structure

```
worldcup2026-v2/
├── src/
│   ├── App.svelte                  ← root: tab navigation, language picker, search/filter
│   ├── components/
│   │   ├── MatchCard.svelte        ← single match card (upcoming / finished / live)
│   │   ├── MatchDetail.svelte      ← expanded match: events, lineup, stats
│   │   ├── PitchView.svelte        ← visual formation with player positions
│   │   ├── StatsBars.svelte        ← 16 stat bars + top performers
│   │   ├── Standings.svelte        ← all 12 group tables with qualification colours
│   │   ├── Bracket.svelte          ← R32 list + visual knockout tree
│   │   ├── PlayerProfile.svelte    ← bottom-sheet: player stats + match history
│   │   └── TeamProfile.svelte      ← bottom-sheet: team record + all matches
│   ├── stores/
│   │   ├── matches.js              ← raw match data, live polling, espnLiveData
│   │   ├── language.js             ← current lang, t() helper, STRINGS, TEAM_NAME_HE
│   │   └── standings.js            ← computeStandings(), best-8-thirds logic
│   ├── lib/
│   │   ├── fifa-api.js             ← all FIFA fetch functions
│   │   ├── espn-api.js             ← all ESPN fetch functions
│   │   ├── flags.js                ← FIFA_TO_ALPHA2 map + flagEmoji()
│   │   └── strings.js              ← STRINGS translation object (EN/HE/AR)
│   ├── app.css                     ← existing style.css moved here
│   └── main.js                     ← entry point, mounts App
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       └── apple-touch-icon.png
├── .github/
│   └── workflows/
│       └── deploy.yml              ← build + deploy to GitHub Pages on push to main
├── index.html                      ← Vite entry HTML (minimal, just mounts the app)
├── vite.config.js
├── package.json
└── tsconfig.json
```

---

## Migration Steps

### Step 1 — Set up the new project locally

```bash
# Create the Svelte + Vite project
npm create svelte@latest worldcup2026-v2
# Choose: Skeleton project, TypeScript, no additional tools needed

cd worldcup2026-v2
npm install

# Verify it runs
npm run dev
```

You now have a working Svelte dev server at `localhost:5173`.

---

### Step 2 — Move static assets

Copy these files from V1 into V2 unchanged:

```
V1 source              → V2 destination
-------------------------------------------------
style.css              → src/app.css
favicon.ico            → public/favicon.ico
manifest.json          → public/manifest.json
sw.js                  → public/sw.js
icons/                 → public/icons/
```

In `src/main.js`, import the CSS:
```js
import './app.css';
import App from './App.svelte';
```

---

### Step 3 — Extract lib files (no Svelte yet, pure JS)

These are the easiest because they have no UI — just logic and data.

**`src/lib/flags.js`**
- Cut `FIFA_TO_ALPHA2` map and `flagEmoji()` function from `app.js`

**`src/lib/strings.js`**
- Cut `STRINGS` object and `TEAM_NAME_HE` map from `app.js`

**`src/lib/fifa-api.js`**
- Cut all functions that call `api.fifa.com`:
  - `fetchMatches()`, `fetchTimeline()`, `fetchLiveFifa()`, `fetchTvChannels()`

**`src/lib/espn-api.js`**
- Cut all functions that call `site.api.espn.com`:
  - `fetchEspnScoreboard()`, `fetchEspnSummary()`, `fetchEspnLineup()`

Each file exports its functions. No Svelte-specific code here.

---

### Step 4 — Create Svelte stores

**`src/stores/language.js`**
```js
import { writable, derived } from 'svelte/store';
import { STRINGS, TEAM_NAME_HE } from '../lib/strings.js';

export const lang = writable('en'); // 'en' | 'he' | 'ar'

export const t = derived(lang, ($lang) => (key, ...args) => {
  // same logic as current t() in app.js
});
```

**`src/stores/matches.js`**
```js
import { writable } from 'svelte/store';

export const matches = writable([]);
export const espnLiveData = writable({});
export const timelineCache = writable({});
// live polling functions exported from here
```

**`src/stores/standings.js`**
```js
import { derived } from 'svelte/store';
import { matches, espnLiveData } from './matches.js';

export const standings = derived([matches, espnLiveData], ([$matches, $espnLiveData]) => {
  // computeStandings() logic moved here
  // returns { groups: {...}, best8thirds: [...] }
});
```

---

### Step 5 — Build components one at a time

Do these in order — each one is independently testable before moving to the next.

#### 5a — `MatchCard.svelte`
- Props: `match`, `expanded` (bool)
- Reads: `lang` store, `espnLiveData` store
- Emits: `on:click` to toggle expand
- Contains the HTML currently rendered by `renderMatchCard()` in `app.js`
- Live border, pulsing badge, score flash — handled with Svelte reactive declarations (`$:`)

#### 5b — `StatsBars.svelte`
- Props: `homeTeam`, `awayTeam`, `stats`, `leaders`
- Pure display component — no API calls, no stores
- The 16 stat bars + top performers strip

#### 5c — `PitchView.svelte`
- Props: `homeLineup`, `awayLineup`, `liveFieldStatus`
- Pure display — renders the green pitch with player slots
- `lateralSort()` logic lives inside this component

#### 5d — `MatchDetail.svelte`
- Props: `match`
- Reads: `timelineCache`, `lang` stores
- Fetches timeline + ESPN summary on mount (`onMount`)
- Contains tabs: Events / Lineup / Stats
- Uses `StatsBars` and `PitchView` as children

#### 5e — `Standings.svelte`
- No props — reads `standings` store directly
- Renders all 12 group tables
- `.qualify` (green) and `.qualify-third` (blue) classes already in your CSS

#### 5f — `Bracket.svelte`
- No props — reads `matches` store
- Two sub-tabs: R32 list / visual bracket
- The bracket grid layout comes from your existing CSS

#### 5g — `PlayerProfile.svelte`
- Props: `playerName`, `open` (bool)
- Reads `timelineCache` store to build profile
- Bottom sheet slide-up — use Svelte `transition:fly`

#### 5h — `TeamProfile.svelte`
- Props: `teamId`, `open` (bool)
- Reads `matches` store
- Same bottom sheet pattern as PlayerProfile

---

### Step 6 — Build `App.svelte`

This is the root component — it replaces `index.html` + the tab/nav logic in `app.js`.

```svelte
<script>
  import { onMount } from 'svelte';
  import { lang } from './stores/language.js';
  import { matches, loadMatches, startLivePolling } from './stores/matches.js';
  import MatchCard from './components/MatchCard.svelte';
  import Standings from './components/Standings.svelte';
  import Bracket from './components/Bracket.svelte';
  // etc.

  let activeTab = 'matches'; // 'matches' | 'standings' | 'bracket' | 'stats'
  let expandedMatch = null;
  let activeStageFilter = 'all';
  let searchQuery = '';

  onMount(() => {
    loadMatches();
    startLivePolling();
  });
</script>

<!-- nav tabs, filter chips, search bar, tab content -->
```

---

### Step 7 — Set up GitHub Actions deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

In `vite.config.js`, set the base path to match your GitHub Pages URL:
```js
export default {
  base: '/worldcup2026/',
}
```

---

### Step 8 — Test checklist before going live

- [ ] All 104 matches load on first open
- [ ] Expanding a finished match shows goals, cards, subs
- [ ] Lineups render with correct pitch layout
- [ ] Stat bars show for finished matches
- [ ] Standings show all 12 groups, correct qualification colours
- [ ] Bracket shows R32 list and visual tree
- [ ] Player profile opens from event list and leaderboards
- [ ] Team profile opens from standings and match cards
- [ ] Live match: green border, pulsing badge, score updates every 15s
- [ ] Live standings update every 15s
- [ ] Language switch EN → HE → AR works, layout flips RTL
- [ ] Hebrew team names display correctly
- [ ] Arabic team names display correctly
- [ ] PWA installs on iPhone (Safari → Add to Home Screen)
- [ ] PWA installs on Android (Chrome)
- [ ] Service worker caches app shell

---

### Step 9 — Cut over

1. Rename current repo folder to `worldcup2026-v1` (keep as backup)
2. Rename `worldcup2026-v2` to `worldcup2026`
3. Push to `main` — GitHub Actions builds and deploys automatically
4. Verify live URL still works: `https://waseemaboliel.github.io/worldcup2026`

---

## Effort Estimate

| Step | Estimated time |
|---|---|
| Step 1–2: Project setup + assets | 30 min |
| Step 3: Extract lib files | 1–2 hours |
| Step 4: Stores | 1–2 hours |
| Step 5a–5d: MatchCard, Detail, Pitch, Stats | 3–4 hours |
| Step 5e–5h: Standings, Bracket, Profiles | 3–4 hours |
| Step 6: App.svelte root | 1–2 hours |
| Step 7: GitHub Actions | 30 min |
| Step 8: Testing | 1–2 hours |
| **Total** | **~12–16 hours** |

Work can be done in sessions — each step produces a working checkpoint.

---

## What Does NOT Change in V2

- All API endpoints (FIFA + ESPN) — identical
- All design tokens and CSS — moved as-is
- PWA manifest and service worker — copied as-is
- GitHub Pages hosting URL — identical
- All 3 languages and RTL support — same logic, just in stores
- All features — V2 is a rewrite, not a redesign
