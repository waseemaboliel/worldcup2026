const MATCHES_API = 'https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104';

// FIFA 3-letter → ISO 3166-1 alpha-2 (from working calendar project)
const FIFA_TO_ALPHA2 = {
  MEX:'MX',RSA:'ZA',KOR:'KR',CZE:'CZ',CAN:'CA',BIH:'BA',USA:'US',PAR:'PY',
  QAT:'QA',SUI:'CH',BRA:'BR',MAR:'MA',ARG:'AR',ESP:'ES',POR:'PT',FRA:'FR',
  GER:'DE',ENG:'GB',ITA:'IT',NED:'NL',BEL:'BE',URU:'UY',COL:'CO',CHI:'CL',
  ECU:'EC',PER:'PE',VEN:'VE',BOL:'BO',HON:'HN',CRC:'CR',PAN:'PA',JAM:'JM',
  TRI:'TT',NGA:'NG',GHA:'GH',CMR:'CM',SEN:'SN',CIV:'CI',EGY:'EG',ALG:'DZ',
  TUN:'TN',MAL:'ML',BFA:'BF',ZAM:'ZM',UGA:'UG',JPN:'JP',AUS:'AU',TUR:'TR',
  IRN:'IR',KSA:'SA',UAE:'AE',JOR:'JO',IRQ:'IQ',ISR:'IL',UZB:'UZ',KAZ:'KZ',
  CHN:'CN',NZL:'NZ',POL:'PL',CRO:'HR',SRB:'RS',SVK:'SK',SVN:'SI',AUT:'AT',
  SWE:'SE',DEN:'DK',NOR:'NO',FIN:'FI',IRL:'IE',GRE:'GR',ROU:'RO',HUN:'HU',
  UKR:'UA',GEO:'GE',ALB:'AL',MKD:'MK',MNE:'ME',VNM:'VN',THA:'TH',IDN:'ID',
  MYS:'MY',PHI:'PH',GTM:'GT',SLV:'SV',NCA:'NI',CUB:'CU',LBN:'LB',PAL:'PS',
  KWT:'KW',BHR:'BH',OMN:'OM',YEM:'YE',SYR:'SY',
  HAI:'HT',SCO:'GB-SCT',CUW:'CW',CPV:'CV',COD:'CD'
};

const STAGE_LABEL = {
  'First Stage': 'Group Stage',
  'Round of 32': 'Round of 32',
  'Round of 16': 'Round of 16',
  'Quarter-final': 'Quarter-final',
  'Semi-final': 'Semi-final',
  'Play-off for third place': '3rd Place',
  'Final': 'Final'
};

// MatchStatus: 0 = finished, 1 = upcoming (confirmed from API inspection)
const STATUS_FINISHED = 0;

function countryToFlag(fifaCode) {
  if (!fifaCode) return '🏴';
  const alpha2 = FIFA_TO_ALPHA2[fifaCode] || fifaCode;
  if (alpha2 === 'GB-SCT') return '🏴󠁧󠁢󠁳󠁣󠁴󠁿';
  if (!alpha2 || alpha2.length !== 2) return '🏳️';
  const base = 0x1F1E6;
  return String.fromCodePoint(
    base + alpha2.toUpperCase().charCodeAt(0) - 65,
    base + alpha2.toUpperCase().charCodeAt(1) - 65
  );
}

function getTeamName(team) {
  if (!team) return null;
  return team.TeamName?.[0]?.Description || null;
}

function formatKickoff(utcDateStr) {
  const date = new Date(utcDateStr);
  return date.toLocaleTimeString('en-IL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem',
    hour12: false
  });
}

function formatDateHeading(utcDateStr) {
  const date = new Date(utcDateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jerusalem'
  });
}

function groupByDate(matches) {
  const groups = new Map();
  for (const match of matches) {
    const heading = formatDateHeading(match.Date);
    if (!groups.has(heading)) groups.set(heading, []);
    groups.get(heading).push(match);
  }
  return groups;
}

// ── Expand / collapse ──────────────────────────────────────────
let activeCard = null;

function toggleCard(card, match) {
  const isOpen = card.classList.contains('match-card--open');

  if (activeCard && activeCard !== card) {
    activeCard.classList.remove('match-card--open');
    activeCard.querySelector('.match-detail')?.remove();
  }

  if (isOpen) {
    card.classList.remove('match-card--open');
    card.querySelector('.match-detail')?.remove();
    activeCard = null;
    return;
  }

  card.classList.add('match-card--open');
  activeCard = card;

  const isFinished = match.MatchStatus === STATUS_FINISHED;
  const detail = document.createElement('div');
  detail.className = 'match-detail';

  if (!isFinished) {
    detail.innerHTML = `<p class="detail-empty">No match details yet — check back after kick-off.</p>`;
    card.appendChild(detail);
    return;
  }

  detail.innerHTML = `<div class="detail-loading"><div class="loading-spinner"></div></div>`;
  card.appendChild(detail);
  loadTimeline(match, detail);
}

function buildMatchCard(match) {
  const isFinished = match.MatchStatus === STATUS_FINISHED;
  const homeName = getTeamName(match.Home) || match.PlaceHolderA || 'TBD';
  const awayName = getTeamName(match.Away) || match.PlaceHolderB || 'TBD';
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '🏳️';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '🏳️';
  const venue = match.Stadium?.Name?.[0]?.Description || '';
  const city = match.Stadium?.CityName?.[0]?.Description || '';
  const venueStr = [venue, city].filter(Boolean).join(' · ');
  const stage = match.StageName?.[0]?.Description || '';
  const group = match.GroupName?.[0]?.Description || '';
  const badgeText = STAGE_LABEL[stage] || stage;
  const groupText = group && stage === 'First Stage' ? group : badgeText;

  const card = document.createElement('article');
  card.className = 'match-card' + (isFinished ? ' match-card--finished' : '');
  card.dataset.matchId = match.IdMatch;
  card.dataset.idStage = match.IdStage;

  if (isFinished) {
    const homeScore = match.HomeTeamScore ?? '';
    const awayScore = match.AwayTeamScore ?? '';
    const pso = (match.HomeTeamPenaltyScore != null && match.AwayTeamPenaltyScore != null)
      ? `<span class="match-pso">(${match.HomeTeamPenaltyScore}–${match.AwayTeamPenaltyScore} PSO)</span>`
      : '';
    card.innerHTML = `
      <div class="match-teams">
        <div class="team">
          <span class="flag">${homeFlag}</span>
          <span class="team-name">${homeName}</span>
        </div>
        <div class="match-center">
          <span class="match-score">${homeScore} – ${awayScore}</span>
          ${pso}
        </div>
        <div class="team team--right">
          <span class="flag">${awayFlag}</span>
          <span class="team-name">${awayName}</span>
        </div>
      </div>
      <div class="match-meta">
        <span class="match-venue">${venueStr}</span>
        <span class="match-status match-status--ft">FT</span>
      </div>`;
  } else {
    const kickoff = formatKickoff(match.Date);
    card.innerHTML = `
      <div class="match-teams">
        <div class="team">
          <span class="flag">${homeFlag}</span>
          <span class="team-name">${homeName}</span>
        </div>
        <div class="match-center">
          <span class="match-time">${kickoff}</span>
          <span class="match-vs">vs</span>
        </div>
        <div class="team team--right">
          <span class="flag">${awayFlag}</span>
          <span class="team-name">${awayName}</span>
        </div>
      </div>
      <div class="match-meta">
        <span class="match-venue">${venueStr}</span>
        <span class="match-group">${groupText}</span>
      </div>`;
  }

  card.addEventListener('click', () => toggleCard(card, match));
  return card;
}

// ── Timeline fetch + parse ─────────────────────────────────────
const TIMELINE_API = 'https://api.fifa.com/api/v3/timelines/17/285023/{stage}/{match}?language=en-GB';
const timelineCache = new Map();

async function loadTimeline(match, detail) {
  const cacheKey = match.IdMatch;
  let events;

  if (timelineCache.has(cacheKey)) {
    events = timelineCache.get(cacheKey);
  } else {
    try {
      const url = TIMELINE_API
        .replace('{stage}', match.IdStage)
        .replace('{match}', match.IdMatch);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      events = data.Event || [];
      timelineCache.set(cacheKey, events);
    } catch {
      detail.innerHTML = `<p class="detail-empty">Could not load match details.</p>`;
      return;
    }
  }

  renderTimeline(match, events, detail);
}

function parseTimeline(events, homeId, awayId) {
  const goals = [], yellowCards = [], redCards = [], subs = [];

  // Build assist map: the Assist event (Type 1) always appears just before its Goal (Type 0)
  const assistMap = {};
  for (let i = 0; i < events.length; i++) {
    if (events[i].Type === 1 && i + 1 < events.length && events[i + 1].Type === 0) {
      const desc = events[i].EventDescription?.[0]?.Description || '';
      const m = desc.match(/Assisted by (.+)\./);
      if (m) assistMap[events[i + 1].EventId] = m[1];
    }
  }

  for (const ev of events) {
    const desc = ev.EventDescription?.[0]?.Description || '';
    const minute = ev.MatchMinute || '';
    const side = ev.IdTeam === homeId ? 'home' : ev.IdTeam === awayId ? 'away' : null;

    if (ev.Type === 0) {
      const m = desc.match(/^(.+?) \(.*?\) scores/) || desc.match(/^(.+?) scores/);
      goals.push({ minute, scorer: m ? m[1] : desc, assist: assistMap[ev.EventId] || null, side });
    } else if (ev.Type === 2) {
      const m = desc.match(/^(.+?) \(/);
      yellowCards.push({ minute, player: m ? m[1] : desc, side });
    } else if (ev.Type === 3) {
      const m = desc.match(/^(.+?) \(/);
      redCards.push({ minute, player: m ? m[1] : desc, side });
    } else if (ev.Type === 5) {
      const m = desc.match(/^(.+?) \(in\) comes off the bench to replace (.+?) \(out\)/);
      if (m) subs.push({ minute, playerIn: m[1], playerOut: m[2], side });
    }
  }

  return { goals, yellowCards, redCards, subs };
}

function renderTimeline(match, events, detail) {
  const homeId = match.Home?.IdTeam;
  const awayId = match.Away?.IdTeam;
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';
  const { goals, yellowCards, redCards, subs } = parseTimeline(events, homeId, awayId);

  const sections = [];

  if (goals.length) {
    const rows = goals.map(g => {
      const flag = g.side === 'home' ? homeFlag : g.side === 'away' ? awayFlag : '';
      const assist = g.assist ? `<span class="detail-assist">↳ ${g.assist}</span>` : '';
      return `<div class="detail-row">${flag} <span class="detail-minute">${g.minute}</span> <span class="detail-name">${g.scorer}</span>${assist}</div>`;
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">⚽ Goals</div>${rows}</div>`);
  }

  if (yellowCards.length) {
    const rows = yellowCards.map(c => {
      const flag = c.side === 'home' ? homeFlag : c.side === 'away' ? awayFlag : '';
      return `<div class="detail-row">${flag} <span class="detail-minute">${c.minute}</span> <span class="detail-name">${c.player}</span></div>`;
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">🟨 Yellow Cards</div>${rows}</div>`);
  }

  if (redCards.length) {
    const rows = redCards.map(c => {
      const flag = c.side === 'home' ? homeFlag : c.side === 'away' ? awayFlag : '';
      return `<div class="detail-row">${flag} <span class="detail-minute">${c.minute}</span> <span class="detail-name">${c.player}</span></div>`;
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">🟥 Red Cards</div>${rows}</div>`);
  }

  if (subs.length) {
    const rows = subs.map(s => {
      const flag = s.side === 'home' ? homeFlag : s.side === 'away' ? awayFlag : '';
      return `<div class="detail-row">${flag} <span class="detail-minute">${s.minute}</span> <span class="detail-name">↑ ${s.playerIn}</span><span class="detail-sub-out">↓ ${s.playerOut}</span></div>`;
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">🔄 Substitutions</div>${rows}</div>`);
  }

  detail.innerHTML = sections.length
    ? sections.join('')
    : `<p class="detail-empty">No detailed events available.</p>`;
}

function renderMatches(matches) {
  const main = document.querySelector('.main');
  main.innerHTML = '';

  const filtered = activeStageFilter === 'all'
    ? matches
    : matches.filter(m => m.StageName?.[0]?.Description === activeStageFilter);

  if (filtered.length === 0) {
    main.innerHTML = `<div class="error"><div class="error-icon">📅</div>No matches for this stage yet.</div>`;
    return;
  }

  const groups = groupByDate(filtered);
  for (const [dateLabel, dayMatches] of groups) {
    const section = document.createElement('section');
    section.className = 'date-group';
    const heading = document.createElement('h2');
    heading.className = 'date-label';
    heading.textContent = dateLabel;
    section.appendChild(heading);
    for (const match of dayMatches) {
      section.appendChild(buildMatchCard(match));
    }
    main.appendChild(section);
  }
}

function showLoading() {
  document.querySelector('.main').innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      Loading matches…
    </div>`;
}

function showError(msg) {
  document.querySelector('.main').innerHTML = `
    <div class="error">
      <div class="error-icon">⚠️</div>
      ${msg}
    </div>`;
}

async function init() {
  initTabs();
  initFilters();
  showLoading();
  try {
    const res = await fetch(MATCHES_API);
    if (!res.ok) throw new Error(`FIFA API returned ${res.status}`);
    const data = await res.json();
    allMatches = data.Results || [];
    if (allMatches.length === 0) throw new Error('No matches returned from API');
    renderMatches(allMatches);
  } catch (err) {
    console.error(err);
    showError('Could not load matches. Please try again later.');
  }
}

// ── Tab switching ──────────────────────────────────────────────
let allMatches = [];
let activeTab = 'matches';
let activeStageFilter = 'all';

function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      activeTab = tab.dataset.tab;
      document.getElementById('filters').style.display = activeTab === 'matches' ? 'flex' : 'none';
      renderActiveTab();
    });
  });
}

function initFilters() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
      activeStageFilter = chip.dataset.stage;
      renderMatches(allMatches);
    });
  });
}

function renderActiveTab() {
  if (activeTab === 'matches') renderMatches(allMatches);
  else if (activeTab === 'standings') renderStandings(allMatches);
  else if (activeTab === 'scorers') renderScorers(allMatches);
}

// ── Standings (computed from match results) ────────────────────
function computeStandings(matches) {
  const groups = new Map();

  for (const m of matches) {
    if (m.StageName?.[0]?.Description !== 'First Stage') continue;
    const group = m.GroupName?.[0]?.Description || 'Unknown';
    if (!groups.has(group)) groups.set(group, new Map());
    const table = groups.get(group);

    const addTeam = (team) => {
      if (!team) return;
      const id = team.IdTeam;
      if (!table.has(id)) table.set(id, {
        id, name: getTeamName(team) || '?', flag: countryToFlag(team.IdCountry),
        p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0
      });
    };
    addTeam(m.Home);
    addTeam(m.Away);

    if (m.MatchStatus !== STATUS_FINISHED || m.HomeTeamScore == null) continue;

    const hs = m.HomeTeamScore, as = m.AwayTeamScore;
    const home = table.get(m.Home?.IdTeam);
    const away = table.get(m.Away?.IdTeam);
    if (!home || !away) continue;

    home.p++; away.p++;
    home.gf += hs; home.ga += as;
    away.gf += as; away.ga += hs;

    if (hs > as)      { home.w++; away.l++; }
    else if (hs < as) { away.w++; home.l++; }
    else              { home.d++; away.d++; }
  }

  // Sort each group
  const sorted = new Map();
  for (const [group, table] of groups) {
    const rows = [...table.values()].sort((a, b) => {
      const pts = (r) => r.w * 3 + r.d;
      const gd = (r) => r.gf - r.ga;
      return pts(b) - pts(a) || gd(b) - gd(a) || b.gf - a.gf;
    });
    sorted.set(group, rows);
  }
  return sorted;
}

function renderStandings(matches) {
  const main = document.querySelector('.main');
  const standings = computeStandings(matches);

  if (standings.size === 0) {
    main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>No standings yet.</div>`;
    return;
  }

  main.innerHTML = '';
  for (const [group, rows] of standings) {
    const section = document.createElement('div');
    section.className = 'standings-section';
    section.innerHTML = `<div class="standings-group-title">${group}</div>`;

    const table = document.createElement('table');
    table.className = 'standings-table';
    table.innerHTML = `<thead><tr>
      <th colspan="2">Team</th>
      <th>P</th><th>W</th><th>D</th><th>L</th>
      <th>GF</th><th>GA</th><th>GD</th><th>Pts</th>
    </tr></thead>`;

    const tbody = document.createElement('tbody');
    rows.forEach((row, i) => {
      const pts = row.w * 3 + row.d;
      const gd = row.gf - row.ga;
      const tr = document.createElement('tr');
      if (i < 2) tr.classList.add('qualify');
      tr.innerHTML = `
        <td><span class="standings-pos">${i + 1}</span></td>
        <td><div class="standings-team"><span>${row.flag}</span><span>${row.name}</span></div></td>
        <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
        <td>${row.gf}</td><td>${row.ga}</td><td>${gd > 0 ? '+' : ''}${gd}</td>
        <td class="standings-pts">${pts}</td>`;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    section.appendChild(table);
    main.appendChild(section);
  }
}

// ── Top Scorers (computed from already-cached timelines) ────────
async function renderScorers(matches) {
  const main = document.querySelector('.main');
  main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>Computing top scorers…</div>`;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
  const scorerMap = new Map(); // playerId → { name, teamFlag, teamName, goals }

  for (const match of finishedMatches) {
    const cacheKey = match.IdMatch;
    let events;
    if (timelineCache.has(cacheKey)) {
      events = timelineCache.get(cacheKey);
    } else {
      try {
        const url = TIMELINE_API
          .replace('{stage}', match.IdStage)
          .replace('{match}', match.IdMatch);
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        events = data.Event || [];
        timelineCache.set(cacheKey, events);
      } catch { continue; }
    }

    for (const ev of events) {
      if (ev.Type !== 0 || !ev.IdPlayer) continue;
      const desc = ev.EventDescription?.[0]?.Description || '';
      const m = desc.match(/^(.+?) \(.*?\) scores/) || desc.match(/^(.+?) scores/);
      const name = m ? m[1] : null;
      if (!name) continue;

      const team = ev.IdTeam === match.Home?.IdTeam ? match.Home : match.Away;
      const flag = team ? countryToFlag(team.IdCountry) : '🏳️';
      const teamName = team ? (getTeamName(team) || '') : '';

      if (!scorerMap.has(ev.IdPlayer)) {
        scorerMap.set(ev.IdPlayer, { name, flag, teamName, goals: 0 });
      }
      scorerMap.get(ev.IdPlayer).goals++;
    }
  }

  const sorted = [...scorerMap.values()].sort((a, b) => b.goals - a.goals).slice(0, 20);

  if (sorted.length === 0) {
    main.innerHTML = `<div class="error"><div class="error-icon">⚽</div>No goals scored yet.</div>`;
    return;
  }

  main.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';

  sorted.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'scorer-row';
    row.innerHTML = `
      <div class="scorer-rank scorer-rank--top">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${s.name}</div>
        <div class="scorer-team">${s.teamName}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.goals}</div>
        <div class="scorer-goals-label">goal${s.goals !== 1 ? 's' : ''}</div>
      </div>`;
    list.appendChild(row);
  });

  main.appendChild(list);
}

document.addEventListener('DOMContentLoaded', init);
