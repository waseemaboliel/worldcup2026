const MATCHES_API    = 'https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104';
const MATCHES_API_AR = 'https://api.fifa.com/api/v3/calendar/matches?language=ar-SA&idCompetition=17&idSeason=285023&count=104';
const WATCH_API      = 'https://api.fifa.com/api/v3/watch/season/285023?language=en-GB';
const ESPN_INDEX_API = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200';

const STRINGS = {
  en: {
    tabMatches: 'Matches', tabStandings: 'Standings', tabStats: 'Stats',
    chipAll: 'All', chipGroups: 'Groups', chipR32: 'R32', chipR16: 'R16',
    chipQF: 'QF', chipSF: 'SF', chipFinal: 'Final',
    searchPlaceholder: '🔍  Search team…',
    loadingMatches: 'Loading matches…', loadingComputing: 'Computing…',
    loadingScorers: 'Computing top scorers…', loadingAssists: 'Computing assists…',
    loadingClean: 'Computing clean sheets…',
    errorMatches: 'Could not load matches. Please try again later.',
    errorNoMatches: 'No matches found.',
    errorNoGoals: 'No goals scored yet.', errorNoAssists: 'No assists recorded yet.',
    errorNoClean: 'No clean sheets yet.', errorNoCards: (t) => `No ${t} cards yet.`,
    errorNoData: 'No data yet.',
    detailNoDetails: 'No match details yet — check back after kick-off.',
    detailLoadError: 'Could not load match details.',
    detailNoEvents: 'No detailed events available.',
    detailAttendance: (n) => `👥 ${n} attendance`,
    detailGoals: '⚽ Goals', detailYellow: '🟨 Yellow Cards',
    detailRed: '🟥 Red Cards', detailSubs: '🔄 Substitutions',
    matchVs: 'vs', matchFT: 'FT',
    tvLabel: '📺',
    statsPlayer: '👤 Player Stats', statsTeam: '🏳️ Team Stats',
    statGoals: '⚽ Goals', statAssists: '🎯 Assists', statClean: '🧤 Clean Sheets',
    statYellow: '🟨 Yellow', statRed: '🟥 Red',
    teamGoalsGame: '⚽ Goals/Game', teamConcededGame: '🥅 Conceded/Game',
    teamClean: '🧤 Clean Sheets', teamYellow: '🟨 Yellow Cards', teamRed: '🟥 Red Cards',
    gamesPlayed: (n) => `${n} games played`,
    goalLabel: (n) => `goal${n !== 1 ? 's' : ''}`,
    assistLabel: (n) => `assist${n !== 1 ? 's' : ''}`,
    cleanLabel: (n) => `clean sheet${n !== 1 ? 's' : ''}`,
    standingsToday: '— Today',
    standingsNoData: 'No standings yet.',
    standingsTeam: 'Team',
    stageGroupStage: 'Group Stage',
    stageR32: 'Round of 32',
    stageR16: 'Round of 16',
    stageQF: 'Quarter-final',
    stageSF: 'Semi-final',
    stage3rd: '3rd Place',
    stageFinal: 'Final',
    lineupTitle: '📋 Lineups',
    lineupCoach: 'Coach',
    lineupSubs: 'Substitutes',
    posGK: 'GK', posDEF: 'DEF', posMID: 'MID', posFWD: 'FWD',
  },
  he: {
    tabMatches: 'משחקים', tabStandings: 'טבלאות', tabStats: 'סטטיסטיקה',
    chipAll: 'הכל', chipGroups: 'בתים', chipR32: 'שלב 32', chipR16: 'שלב 16',
    chipQF: 'רבע', chipSF: 'חצי', chipFinal: 'גמר',
    searchPlaceholder: '🔍  חיפוש קבוצה…',
    loadingMatches: 'טוען משחקים…', loadingComputing: 'מחשב…',
    loadingScorers: 'מחשב מלכי שערים…', loadingAssists: 'מחשב בישולים…',
    loadingClean: 'מחשב שמירות אפס…',
    errorMatches: 'לא ניתן לטעון משחקים. נסה שוב מאוחר יותר.',
    errorNoMatches: 'לא נמצאו משחקים.',
    errorNoGoals: 'עדיין לא נכבשו שערים.', errorNoAssists: 'עדיין לא נרשמו בישולים.',
    errorNoClean: 'עדיין אין שמירות אפס.', errorNoCards: (t) => `עדיין אין כרטיסים ${t === 'yellow' ? 'צהובים' : 'אדומים'}.`,
    errorNoData: 'אין נתונים עדיין.',
    detailNoDetails: 'אין פרטי משחק עדיין — חזור לאחר הקיקאוף.',
    detailLoadError: 'לא ניתן לטעון פרטי משחק.',
    detailNoEvents: 'אין אירועים מפורטים.',
    detailAttendance: (n) => `👥 ${n} צופים`,
    detailGoals: '⚽ שערים', detailYellow: '🟨 כרטיסים צהובים',
    detailRed: '🟥 כרטיסים אדומים', detailSubs: '🔄 החלפות',
    matchVs: 'נגד', matchFT: 'סיום',
    tvLabel: '📺',
    statsPlayer: '👤 סטטיסטיקת שחקנים', statsTeam: '🏳️ סטטיסטיקת קבוצות',
    statGoals: '⚽ שערים', statAssists: '🎯 בישולים', statClean: '🧤 שמירות אפס',
    statYellow: '🟨 צהוב', statRed: '🟥 אדום',
    teamGoalsGame: '⚽ שערים/משחק', teamConcededGame: '🥅 ספיגות/משחק',
    teamClean: '🧤 שמירות אפס', teamYellow: '🟨 כרטיסים צהובים', teamRed: '🟥 כרטיסים אדומים',
    gamesPlayed: (n) => `${n} משחקים`,
    goalLabel: (n) => `שער${n !== 1 ? 'ות' : ''}`,
    assistLabel: (n) => `בישול${n !== 1 ? 'ים' : ''}`,
    cleanLabel: (n) => `שמירת אפס${n !== 1 ? '' : ''}`,
    standingsToday: '— היום',
    standingsNoData: 'אין טבלאות עדיין.',
    standingsTeam: 'קבוצה',
    stageGroupStage: 'שלב הבתים',
    stageR32: 'שמינית גמר',
    stageR16: 'שישית עשרה',
    stageQF: 'רבע גמר',
    stageSF: 'חצי גמר',
    stage3rd: 'מקום שלישי',
    stageFinal: 'גמר',
    lineupTitle: '📋 הרכבים',
    lineupCoach: 'מאמן',
    lineupSubs: 'שחקני חילוף',
    posGK: 'שוע', posDEF: 'הגנה', posMID: 'קשר', posFWD: 'התקפה',
  },
  ar: {
    tabMatches: 'مباريات', tabStandings: 'ترتيب', tabStats: 'إحصاءات',
    chipAll: 'الكل', chipGroups: 'المجموعات', chipR32: 'د.32', chipR16: 'د.16',
    chipQF: 'ر.ن', chipSF: 'ن.ن', chipFinal: 'النهائي',
    searchPlaceholder: '🔍  ابحث عن فريق…',
    loadingMatches: 'جاري تحميل المباريات…', loadingComputing: 'جاري الحساب…',
    loadingScorers: 'جاري حساب الهدافين…', loadingAssists: 'جاري حساب التمريرات…',
    loadingClean: 'جاري حساب النظافة…',
    errorMatches: 'تعذّر تحميل المباريات. حاول مرة أخرى لاحقاً.',
    errorNoMatches: 'لا توجد مباريات.',
    errorNoGoals: 'لم تُسجَّل أهداف بعد.', errorNoAssists: 'لا توجد تمريرات حاسمة بعد.',
    errorNoClean: 'لا توجد شباك نظيفة بعد.', errorNoCards: (t) => `لا توجد بطاقات ${t === 'yellow' ? 'صفراء' : 'حمراء'} بعد.`,
    errorNoData: 'لا توجد بيانات بعد.',
    detailNoDetails: 'لا تفاصيل بعد — تحقق بعد انطلاق المباراة.',
    detailLoadError: 'تعذّر تحميل تفاصيل المباراة.',
    detailNoEvents: 'لا توجد أحداث مفصّلة.',
    detailAttendance: (n) => `👥 ${n} مشجع`,
    detailGoals: '⚽ الأهداف', detailYellow: '🟨 البطاقات الصفراء',
    detailRed: '🟥 البطاقات الحمراء', detailSubs: '🔄 التبديلات',
    matchVs: 'ضد', matchFT: 'انتهى',
    tvLabel: '📺',
    statsPlayer: '👤 إحصاءات اللاعبين', statsTeam: '🏳️ إحصاءات الفرق',
    statGoals: '⚽ الأهداف', statAssists: '🎯 التمريرات', statClean: '🧤 الشباك النظيفة',
    statYellow: '🟨 صفراء', statRed: '🟥 حمراء',
    teamGoalsGame: '⚽ أهداف/مباراة', teamConcededGame: '🥅 مستقبل/مباراة',
    teamClean: '🧤 شباك نظيفة', teamYellow: '🟨 بطاقات صفراء', teamRed: '🟥 بطاقات حمراء',
    gamesPlayed: (n) => `${n} مباريات`,
    goalLabel: (n) => `هدف${n !== 1 ? '' : ''}`,
    assistLabel: (n) => `تمريرة حاسمة`,
    cleanLabel: (n) => `شبكة نظيفة`,
    standingsToday: '— اليوم',
    standingsNoData: 'لا يوجد ترتيب بعد.',
    standingsTeam: 'الفريق',
    stageGroupStage: 'دور المجموعات',
    stageR32: 'دور الـ32',
    stageR16: 'دور الـ16',
    stageQF: 'ربع النهائي',
    stageSF: 'نصف النهائي',
    stage3rd: 'المركز الثالث',
    stageFinal: 'النهائي',
    lineupTitle: '📋 التشكيلات',
    lineupCoach: 'المدرب',
    lineupSubs: 'الاحتياطيون',
    posGK: 'حارس', posDEF: 'دفاع', posMID: 'وسط', posFWD: 'هجوم',
  }
};

function t(key, ...args) {
  const s = STRINGS[currentLang]?.[key] ?? STRINGS.en[key];
  return typeof s === 'function' ? s(...args) : (s ?? key);
}

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

const TEAM_NAME_HE = {
  // North & Central America + Caribbean
  USA:'ארצות הברית', CAN:'קנדה', MEX:'מקסיקו',
  HON:'הונדורס', GTM:'גואטמלה', CRC:'קוסטה ריקה',
  PAN:'פנמה', JAM:'ג׳מייקה', TRI:'טרינידד וטובגו',
  HAI:'האיטי', CUB:'קובה', SLV:'אל סלבדור', NCA:'ניקרגואה',
  // South America
  BRA:'ברזיל', ARG:'ארגנטינה', URU:'אורוגוואי', COL:'קולומביה',
  ECU:'אקוודור', CHI:'צ׳ילה', PAR:'פרגוואי', PER:'פרו',
  VEN:'ונצואלה', BOL:'בוליביה',
  // Europe
  ESP:'ספרד', FRA:'צרפת', ENG:'אנגליה', GER:'גרמניה',
  POR:'פורטוגל', NED:'הולנד', ITA:'איטליה', BEL:'בלגיה',
  CRO:'קרואטיה', SUI:'שווייץ', AUT:'אוסטריה', POL:'פולין',
  SRB:'סרביה', DEN:'דנמרק', HUN:'הונגריה', UKR:'אוקראינה',
  TUR:'טורקיה', ROU:'רומניה', SCO:'סקוטלנד', GRE:'יוון',
  SVK:'סלובקיה', SVN:'סלובניה', NOR:'נורווגיה', SWE:'שוודיה',
  FIN:'פינלנד', IRL:'אירלנד', ALB:'אלבניה', MKD:'מקדוניה הצפונית',
  MNE:'מונטנגרו', GEO:'גאורגיה', CZE:'צ׳כיה', BIH:'בוסניה והרצגובינה',
  // Africa
  MAR:'מרוקו', SEN:'סנגל', NGA:'ניגריה', CMR:'קמרון',
  RSA:'דרום אפריקה', GHA:'גאנה', EGY:'מצרים', TUN:'תוניסיה',
  CIV:'חוף השנהב', ALG:'אלג׳יריה', MAL:'מאלי', BFA:'בורקינה פאסו',
  ZAM:'זמביה', UGA:'אוגנדה', COD:'קונגו (קינשסה)', CPV:'כף ורדה',
  // Asia & Oceania
  JPN:'יפן', KOR:'קוריאה הדרומית', IRN:'איראן', KSA:'ערב הסעודית',
  AUS:'אוסטרליה', QAT:'קטאר', UAE:'איחוד האמירויות', JOR:'ירדן',
  IRQ:'עיראק', ISR:'ישראל', UZB:'אוזבקיסטן', KAZ:'קזחסטן',
  CHN:'סין', NZL:'ניו זילנד', VNM:'וייטנאם', THA:'תאילנד',
  IDN:'אינדונזיה', MYS:'מלזיה', PHI:'פיליפינים',
  // Middle East (non-Asian slot)
  LBN:'לבנון', PAL:'פלסטין', KWT:'כווית', BHR:'בחריין',
  OMN:'עומאן', YEM:'תימן', SYR:'סוריה',
  CUW:'קוראסאו',
};

const STAGE_LABEL = {
  'First Stage':              'stageGroupStage',
  'Round of 32':              'stageR32',
  'Round of 16':              'stageR16',
  'Quarter-final':            'stageQF',
  'Semi-final':               'stageSF',
  'Play-off for third place': 'stage3rd',
  'Final':                    'stageFinal',
};

// chip data-stage value → IdStage (language-independent)
const STAGE_ID = {
  'First Stage':        '289273',
  'Round of 32':        '289287',
  'Round of 16':        '289288',
  'Quarter-final':      '289289',
  'Semi-final':         '289290',
  'Final':              '289291',
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
  if (currentLang === 'he' && team.IdCountry && TEAM_NAME_HE[team.IdCountry]) {
    return TEAM_NAME_HE[team.IdCountry];
  }
  return team.TeamName?.[0]?.Description || null;
}

const LOCALE_MAP = { en: 'en-GB', he: 'he-IL', ar: 'ar-SA' };

function dateLocale() { return LOCALE_MAP[currentLang] || 'en-GB'; }

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
  return date.toLocaleDateString(dateLocale(), {
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
    detail.innerHTML = `<p class="detail-empty">${t('detailNoDetails')}</p>`;
    card.appendChild(detail);
    return;
  }

  detail.innerHTML = `<div class="detail-loading"><div class="loading-spinner"></div></div>`;
  card.appendChild(detail);
  loadTimeline(match, detail);
}

function buildChannelsRow(matchId) {
  const channels = israelChannels[matchId] || [];
  const kanBox = `<span class="channel-chip channel-chip--kanbox">Kan Box 📱</span>`;
  const rest = channels.map(c => `<span class="channel-chip">${c.Name}</span>`).join('');
  return `<div class="match-channels">📺 ${kanBox}${rest}</div>`;
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
  const stageKey = STAGE_LABEL[stage];
  const badgeText = stageKey ? t(stageKey) : stage;
  const groupText = group && isGroupStage(match) ? group : badgeText;

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
        <span class="match-status match-status--ft">${t('matchFT')}</span>
      </div>
      ${buildChannelsRow(match.IdMatch)}`;
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
          <span class="match-vs">${t('matchVs')}</span>
        </div>
        <div class="team team--right">
          <span class="flag">${awayFlag}</span>
          <span class="team-name">${awayName}</span>
        </div>
      </div>
      <div class="match-meta">
        <span class="match-venue">${venueStr}</span>
        <span class="match-group">${groupText}</span>
      </div>
      ${buildChannelsRow(match.IdMatch)}`;
  }

  card.addEventListener('click', () => toggleCard(card, match));
  return card;
}

// ── Timeline fetch + parse ─────────────────────────────────────
const TIMELINE_API  = 'https://api.fifa.com/api/v3/timelines/17/285023/{stage}/{match}?language=en-GB';
const timelineCache = new Map();

async function loadTimeline(match, detail) {
  const cacheKey = match.IdMatch;

  // Fetch timeline, FIFA lineup, and ESPN lineup in parallel
  const [events, lineup, espnLineup] = await Promise.all([
    fetchTimeline(match, detail),
    fetchLineup(match),
    fetchEspnLineup(match),
  ]);

  if (events === null) return; // fetchTimeline already rendered the error
  renderTimeline(match, events, lineup, espnLineup, detail);
}

async function fetchTimeline(match, detail) {
  const cacheKey = match.IdMatch;
  if (timelineCache.has(cacheKey)) return timelineCache.get(cacheKey);
  try {
    const url = TIMELINE_API
      .replace('{stage}', match.IdStage)
      .replace('{match}', match.IdMatch);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const events = data.Event || [];
    timelineCache.set(cacheKey, events);
    return events;
  } catch {
    detail.innerHTML = `<p class="detail-empty">${t('detailLoadError')}</p>`;
    return null;
  }
}

// ── Lineup fetch + parse ───────────────────────────────────────
const LINEUP_API   = 'https://api.fifa.com/api/v3/live/football/17/285023/{stage}/{match}?language=en-GB';
const lineupCache  = new Map(); // IdMatch → { home, away }

function parseLineupTeam(teamData) {
  if (!teamData) return null;
  const players = teamData.Players || [];
  const toPlayer = p => ({
    id:       p.IdPlayer,
    name:     p.PlayerName?.[0]?.Description || '',
    shirt:    p.ShirtNumber,
    position: p.Position, // 0=GK 1=DEF 2=MID 3=FWD
    status:   p.Status,   // 1=starter 2=sub
    fieldStatus: p.FieldStatus, // 0=on pitch 1=subbed off 2=subbed on
  });
  const coach = teamData.Coaches?.[0]?.Name?.[0]?.Description || null;
  return {
    formation: teamData.Tactics || null,
    coach,
    starters: players.filter(p => p.Status === 1).map(toPlayer),
    subs:     players.filter(p => p.Status === 2).map(toPlayer),
  };
}

async function fetchLineup(match) {
  const cacheKey = match.IdMatch;
  if (lineupCache.has(cacheKey)) return lineupCache.get(cacheKey);
  try {
    const url = LINEUP_API
      .replace('{stage}', match.IdStage)
      .replace('{match}', match.IdMatch);
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const lineup = {
      home: parseLineupTeam(data.HomeTeam),
      away: parseLineupTeam(data.AwayTeam),
    };
    lineupCache.set(cacheKey, lineup);
    return lineup;
  } catch {
    return null;
  }
}

// ── ESPN lineup fetch + parse ──────────────────────────────────
const ESPN_SUMMARY_API  = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={espnId}';
const espnLineupCache   = new Map(); // IdMatch → { home, away } | null

// Stats to show in the match stats bar, in display order
const MATCH_STAT_KEYS = [
  'possessionPct',
  'totalShots',
  'shotsOnTarget',
  'totalPasses',
  'passPct',
  'accurateCrosses',
  'totalLongBalls',
  'effectiveTackles',
  'interceptions',
  'effectiveClearance',
  'foulsCommitted',
  'wonCorners',
  'offsides',
  'saves',
  'yellowCards',
  'redCards',
];

function parseEspnRoster(roster) {
  if (!roster) return null;
  const players = roster.roster || [];

  // Map ESPN abbreviated position → FIFA-style integer bucket for grouping
  const posMap = { G: 0, GK: 0 };
  ['CB','CD','CD-L','CD-R','LB','RB','LWB','RWB','SW','D'].forEach(p => posMap[p] = 1);
  ['CM','CM-L','CM-R','DM','AM','LM','RM','CAM','CDM','MF','M'].forEach(p => posMap[p] = 2);
  ['CF','CF-L','CF-R','LW','RW','SS','FW','F','ST'].forEach(p => posMap[p] = 3);

  const toPlayer = p => ({
    name:           p.athlete?.displayName || '',
    shirt:          p.jersey || '',           // normalised to 'shirt' like FIFA
    posAbbr:        p.position?.abbreviation || '',
    position:       posMap[p.position?.abbreviation] ?? 2, // fallback to MID
    formationPlace: p.formationPlace ?? null,
    subbedOut:      p.subbedOut || false,
    subbedIn:       p.subbedIn  || false,
  });

  return {
    formation: roster.formation || null,
    coach:     null, // ESPN doesn't expose coach in this endpoint
    starters:  players.filter(p =>  p.starter).sort((a, b) => (a.formationPlace ?? 99) - (b.formationPlace ?? 99)).map(toPlayer),
    subs:      players.filter(p => !p.starter).map(toPlayer),
  };
}

async function fetchEspnLineup(match) {
  const cacheKey = match.IdMatch;
  if (espnLineupCache.has(cacheKey)) return espnLineupCache.get(cacheKey);

  const espnId = fifaToEspn.get(match.IdMatch);
  if (!espnId) {
    espnLineupCache.set(cacheKey, null);
    return null;
  }

  try {
    const url = ESPN_SUMMARY_API.replace('{espnId}', espnId);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const rosters = data.rosters || [];
    const homeRoster = rosters.find(r => r.homeAway === 'home');
    const awayRoster = rosters.find(r => r.homeAway === 'away');

    // Parse team-level match stats from boxscore.teams
    const boxTeams = data.boxscore?.teams || [];
    const homeBoxTeam = boxTeams.find(t => t.homeAway === 'home');
    const awayBoxTeam = boxTeams.find(t => t.homeAway === 'away');
    const parseStats = (boxTeam) => {
      if (!boxTeam) return null;
      const map = {};
      for (const s of (boxTeam.statistics || [])) map[s.name] = s.displayValue;
      return map;
    };

    // Parse per-team leaders from boxscore.leaders (top performer per stat category)
    const boxLeaders = data.boxscore?.leaders || [];
    const parseLeaders = (homeAway) => {
      const entry = boxLeaders.find(l => {
        // leaders entries don't have homeAway — match by team id via boxTeams
        const boxTeam = boxTeams.find(t => t.homeAway === homeAway);
        return l.team?.id === boxTeam?.team?.id;
      });
      if (!entry) return [];
      return (entry.leaders || []).map(cat => ({
        statName:    cat.name,
        statDisplay: cat.displayName,
        player:      cat.leaders?.[0]?.athlete?.shortName || null,
        value:       cat.leaders?.[0]?.displayValue || null,
      })).filter(c => c.player && c.value);
    };

    const result = {
      home:        parseEspnRoster(homeRoster),
      away:        parseEspnRoster(awayRoster),
      homeStats:   parseStats(homeBoxTeam),
      awayStats:   parseStats(awayBoxTeam),
      homeLeaders: parseLeaders('home'),
      awayLeaders: parseLeaders('away'),
    };
    espnLineupCache.set(cacheKey, result);
    return result;
  } catch {
    espnLineupCache.set(cacheKey, null);
    return null;
  }
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

function eventRow(minute, homeContent, awayContent) {
  // In RTL the teams are visually swapped: home is on the right, away on the left.
  // Mirror the columns so events always appear under the correct team.
  const isRtl = currentLang === 'he' || currentLang === 'ar';
  const leftContent  = isRtl ? awayContent  : homeContent;
  const rightContent = isRtl ? homeContent  : awayContent;
  const left = leftContent
    ? `<div class="detail-cell-home">${leftContent}</div>`
    : `<div class="detail-cell-empty"></div>`;
  const right = rightContent
    ? `<div class="detail-cell-away">${rightContent}</div>`
    : `<div class="detail-cell-empty"></div>`;
  return `<div class="detail-row">${left}<span class="detail-minute">${minute}</span>${right}</div>`;
}

function renderTimeline(match, events, lineup, espnLineup, detail) {
  const homeId = match.Home?.IdTeam;
  const awayId = match.Away?.IdTeam;
  const attendance = match.Attendance
    ? `<div class="detail-attendance">${t('detailAttendance', Number(match.Attendance).toLocaleString())}</div>`
    : '';
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';
  const { goals, yellowCards, redCards, subs } = parseTimeline(events, homeId, awayId);

  const sections = [];

  if (goals.length) {
    const rows = goals.map(g => {
      const assist = g.assist ? `<span class="detail-assist">↳ ${g.assist}</span>` : '';
      const content = `<span class="detail-name">⚽ ${g.scorer}${assist}</span>`;
      const flag = g.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(g.minute, g.side === 'home' ? cell : null, g.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailGoals')}</div>${rows}</div>`);
  }

  if (yellowCards.length) {
    const rows = yellowCards.map(c => {
      const content = `<span class="detail-name">🟨 ${c.player}</span>`;
      const flag = c.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailYellow')}</div>${rows}</div>`);
  }

  if (redCards.length) {
    const rows = redCards.map(c => {
      const content = `<span class="detail-name">🟥 ${c.player}</span>`;
      const flag = c.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailRed')}</div>${rows}</div>`);
  }

  if (subs.length) {
    const rows = subs.map(s => {
      const content = `<span class="detail-name">↑ ${s.playerIn}</span><span class="detail-sub-out">↓ ${s.playerOut}</span>`;
      const flag = s.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(s.minute, s.side === 'home' ? cell : null, s.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailSubs')}</div>${rows}</div>`);
  }

  detail.innerHTML = attendance + (sections.length
    ? sections.join('')
    : `<p class="detail-empty">${t('detailNoEvents')}</p>`);

  const statsSection = renderMatchStats(match, espnLineup);
  if (statsSection) detail.appendChild(statsSection);

  if (espnLineup || lineup) {
    detail.appendChild(renderLineup(match, espnLineup, lineup));
  }
}

function renderMatchStats(match, espnLineup) {
  if (!espnLineup?.homeStats || !espnLineup?.awayStats) return null;

  // In RTL the home team is displayed on the right, away on the left —
  // swap the data columns to match the visual layout, same as renderLineup does.
  const isRtl = currentLang === 'he' || currentLang === 'ar';
  const leftStats   = isRtl ? espnLineup.awayStats   : espnLineup.homeStats;
  const rightStats  = isRtl ? espnLineup.homeStats   : espnLineup.awayStats;
  const leftLeaders = isRtl ? espnLineup.awayLeaders : espnLineup.homeLeaders;
  const rightLeaders= isRtl ? espnLineup.homeLeaders : espnLineup.awayLeaders;
  const leftTeam    = isRtl ? match.Away : match.Home;
  const rightTeam   = isRtl ? match.Home : match.Away;

  const homeName = getTeamName(leftTeam) || '';
  const awayName = getTeamName(rightTeam) || '';
  const homeFlag = leftTeam  ? countryToFlag(leftTeam.IdCountry)  : '';
  const awayFlag = rightTeam ? countryToFlag(rightTeam.IdCountry) : '';

  // Alias back to generic names for the rest of the function
  const homeStats   = leftStats;
  const awayStats   = rightStats;
  const homeLeaders = leftLeaders;
  const awayLeaders = rightLeaders;

  // Stat label overrides (ESPN labels are already good but some are ALL CAPS)
  const STAT_LABEL = {
    possessionPct:      'Possession %',
    totalShots:         'Shots',
    shotsOnTarget:      'On Target',
    totalPasses:        'Passes',
    passPct:            'Pass Accuracy %',
    accurateCrosses:    'Accurate Crosses',
    totalLongBalls:     'Long Balls',
    effectiveTackles:   'Effective Tackles',
    interceptions:      'Interceptions',
    effectiveClearance: 'Clearances',
    foulsCommitted:     'Fouls',
    wonCorners:         'Corners',
    offsides:           'Offsides',
    saves:              'Saves',
    yellowCards:        'Yellow Cards',
    redCards:           'Red Cards',
  };

  // Build stat bars — only include rows where both teams have a value
  const rows = MATCH_STAT_KEYS
    .filter(key => homeStats[key] != null && awayStats[key] != null)
    .map(key => {
      const hRaw = homeStats[key];
      const aRaw = awayStats[key];
      const label = STAT_LABEL[key] || key;

      // Compute bar width percentages from numeric values
      const hNum = parseFloat(hRaw) || 0;
      const aNum = parseFloat(aRaw) || 0;
      const total = hNum + aNum;
      let hPct = 50, aPct = 50;
      if (total > 0) {
        hPct = Math.round((hNum / total) * 100);
        aPct = 100 - hPct;
      }

      // Format display value: percentages stored as decimals (0.9 → "90%"), whole numbers as-is
      const fmt = (raw, key) => {
        if (['passPct','shotPct','crossPct','longballPct','tacklePct'].includes(key)) {
          return Math.round(parseFloat(raw) * 100) + '%';
        }
        if (key === 'possessionPct') return parseFloat(raw).toFixed(1) + '%';
        return raw;
      };

      const hDisplay = fmt(hRaw, key);
      const aDisplay = fmt(aRaw, key);

      return `
        <div class="mstat-row">
          <span class="mstat-val mstat-val--home">${hDisplay}</span>
          <div class="mstat-center">
            <div class="mstat-label">${label}</div>
            <div class="mstat-bar">
              <div class="mstat-bar-home" style="width:${hPct}%"></div>
              <div class="mstat-bar-away" style="width:${aPct}%"></div>
            </div>
          </div>
          <span class="mstat-val mstat-val--away">${aDisplay}</span>
        </div>`;
    }).join('');

  if (!rows) return null;

  // Top performers from leaders
  const allLeaderCats = new Set([
    ...(homeLeaders || []).map(l => l.statName),
    ...(awayLeaders || []).map(l => l.statName),
  ]);
  const leaderRows = [...allLeaderCats].map(statName => {
    const hl = homeLeaders?.find(l => l.statName === statName);
    const al = awayLeaders?.find(l => l.statName === statName);
    const label = hl?.statDisplay || al?.statDisplay || statName;
    const hCell = hl ? `<span class="mstat-leader-name">${hl.player}</span><span class="mstat-leader-val">${hl.value}</span>` : '';
    const aCell = al ? `<span class="mstat-leader-name">${al.player}</span><span class="mstat-leader-val">${al.value}</span>` : '';
    return `
      <div class="mstat-row mstat-row--leader">
        <div class="mstat-leader-cell mstat-leader-cell--home">${hCell}</div>
        <div class="mstat-center"><div class="mstat-label">${label}</div></div>
        <div class="mstat-leader-cell mstat-leader-cell--away">${aCell}</div>
      </div>`;
  }).join('');

  const section = document.createElement('div');
  section.className = 'detail-section';
  section.innerHTML = `
    <div class="detail-section-title">📊 Match Stats</div>
    <div class="mstat-header">
      <span class="mstat-team-label">${homeFlag} ${homeName}</span>
      <span></span>
      <span class="mstat-team-label mstat-team-label--away">${awayFlag} ${awayName}</span>
    </div>
    ${rows}
    ${leaderRows ? `
      <div class="mstat-leaders-title">⭐ Top Performers</div>
      ${leaderRows}
    ` : ''}`;
  return section;
}

function shortName(fullName) {
  // "Maxime Crépeau" → "Crépeau", "Jonathan David" → "J. David"
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return parts[parts.length - 1]; // last name only
}

// Left-to-right sort weight — ONLY for positions where ESPN's abbr genuinely encodes
// lateral placement. CM-R/CM-L and CF-R/CF-L are foot-based role names, not positional,
// so they are NOT included here and fall through to formationPlace ordering instead.
function lateralOrder(posAbbr) {
  const p = (posAbbr || '').toUpperCase();
  switch (p) {
    case 'LB':  case 'LWB': case 'LW':  case 'LM':  return 0; // far left
    case 'CD-L': case 'CB-L':                         return 1; // left-centre
    case 'G': case 'GK': case 'CD': case 'CB':
    case 'DM': case 'CDM': case 'CM': case 'CAM':
    case 'F': case 'ST': case 'CF': case 'SS':        return 2; // centre
    case 'CD-R': case 'CB-R':                         return 3; // right-centre
    case 'RB':  case 'RWB': case 'RW':  case 'RM':  return 4; // far right
    default:                                           return 2; // unknown → centre, let fp order decide
  }
}

function lateralSort(players) {
  // Sort left-to-right: primary = lateralOrder (unambiguous positions like LB/RB/LM/RM/CD-L/CD-R)
  // Tiebreak = descending formationPlace — ESPN assigns lower fp numbers to right-side players
  return [...players].sort((a, b) => {
    const la = lateralOrder(a.posAbbr), lb = lateralOrder(b.posAbbr);
    if (la !== lb) return la - lb;
    return (b.formationPlace ?? 0) - (a.formationPlace ?? 0); // higher fp = further left
  });
}

function splitIntoRows(players, sizes, reverseOrder = false) {
  if (sizes.length === 1) return [lateralSort(players)];
  // For FWD groups: higher fp = shadow striker (further from goal, closest to mids)
  // so we slice in descending fp order to put the shadow row first, lone striker last
  const byFP = [...players].sort((a, b) =>
    reverseOrder
      ? (b.formationPlace ?? 0) - (a.formationPlace ?? 0)
      : (a.formationPlace ?? 99) - (b.formationPlace ?? 99)
  );
  let i = 0;
  return sizes.map(count => {
    const row = byFP.slice(i, i + count);
    i += count;
    return lateralSort(row);
  });
}

function pitchHalfHTML(teamData, isAway) {
  if (!teamData) return '';
  const shirtClass = isAway ? 'pitch-shirt--away' : '';
  const formation  = teamData.formation || '';

  // Group players by position bucket — this is always correct
  const gk   = teamData.starters.filter(p => p.position === 0);
  const defs  = teamData.starters.filter(p => p.position === 1);
  const mids  = teamData.starters.filter(p => p.position === 2);
  const fwds  = teamData.starters.filter(p => p.position === 3);

  let defRows = [lateralSort(defs)];
  let midRows = [lateralSort(mids)];
  let fwdRows = [lateralSort(fwds)];

  if (formation) {
    const parts = formation.split('-').map(Number);
    // parts = e.g. [3,4,2,1] for "3-4-2-1"
    // Strategy: match parts to groups by count from outside in:
    //   - First part that sums to defs.length → def row sizes
    //   - Last part(s) that sum to fwds.length → fwd row sizes
    //   - Remaining middle parts → mid row sizes

    // Find how many leading parts sum to defs.length
    let defSizes = [], defSum = 0, di = 0;
    while (di < parts.length && defSum < defs.length) {
      defSum += parts[di];
      defSizes.push(parts[di]);
      di++;
      if (defSum === defs.length) break;
    }
    // Find how many trailing parts sum to fwds.length
    let fwdSizes = [], fwdSum = 0, fi = parts.length - 1;
    while (fi >= di && fwdSum < fwds.length) {
      fwdSum += parts[fi];
      fwdSizes.unshift(parts[fi]);
      fi--;
      if (fwdSum === fwds.length) break;
    }
    // Remaining middle parts are for mids
    const midSizes = parts.slice(di, fi + 1);

    if (defSum === defs.length && defSizes.length)
      defRows = splitIntoRows(defs, defSizes);
    if (fwdSum === fwds.length && fwdSizes.length)
      fwdRows = splitIntoRows(fwds, fwdSizes, true);
    if (midSizes.length && midSizes.reduce((s, n) => s + n, 0) === mids.length)
      midRows = splitIntoRows(mids, midSizes);
  }

  const rows = [gk, ...defRows, ...midRows, ...fwdRows].filter(r => r.length);

  const rowHTMLs = rows.map(players => {
    const chips = players.map(p => `
      <div class="pitch-player">
        <div class="pitch-shirt ${shirtClass}">${p.shirt}</div>
        <div class="pitch-name">${shortName(p.name)}</div>
      </div>`).join('');
    return `<div class="pitch-row">${chips}</div>`;
  });

  // Home: GK at bottom (reverse so FWD nearest centre), Away: GK at top
  if (!isAway) rowHTMLs.reverse();

  const formationBadge = formation
    ? `<div class="pitch-formation">${formation}</div>`
    : '';

  return isAway
    ? `<div class="pitch-half pitch-half--away">${formationBadge}${rowHTMLs.join('')}</div>`
    : `<div class="pitch-half pitch-half--home">${rowHTMLs.join('')}${formationBadge}</div>`;
}

function renderLineup(match, espnLineup, fifaLineup) {
  const lineup = espnLineup || fifaLineup;
  if (!lineup) return document.createDocumentFragment();

  const isRtl = currentLang === 'he' || currentLang === 'ar';
  // In RTL the home team displays on the right — keep pitch columns consistent with match card
  const leftTeam  = isRtl ? lineup.away : lineup.home;
  const rightTeam = isRtl ? lineup.home : lineup.away;
  const leftIsAway  = isRtl; // left column is away team in RTL
  const rightIsAway = !isRtl;

  // All starters from both teams for the shared pitch
  const homeName = getTeamName(match.Home) || '';
  const awayName = getTeamName(match.Away) || '';
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

  // Subs: two columns — home left, away right (always, regardless of RTL)
  const subChips = (teamData) =>
    (teamData?.subs || []).map(p =>
      `<div class="pitch-sub-chip"><span>${p.shirt}</span>${shortName(p.name)}</div>`
    ).join('');

  const homeSubs = subChips(lineup.home);
  const awaySubs = subChips(lineup.away);

  const subsHTML = (homeSubs || awaySubs) ? `
    <div class="pitch-subs-wrap">
      <div class="pitch-subs-col">
        <div class="pitch-subs-label">${homeFlag} ${homeName}</div>
        <div class="pitch-subs">${homeSubs}</div>
      </div>
      <div class="pitch-subs-col">
        <div class="pitch-subs-label">${awayFlag} ${awayName}</div>
        <div class="pitch-subs">${awaySubs}</div>
      </div>
    </div>` : '';

  const section = document.createElement('div');
  section.className = 'lineup-section';
  section.innerHTML = `
    <div class="lineup-title">${t('lineupTitle')}</div>
    <div class="pitch-wrap">
      <div class="pitch">
        ${pitchHalfHTML(lineup.away, true)}
        ${pitchHalfHTML(lineup.home, false)}
      </div>
    </div>
    ${subsHTML}`;
  return section;
}

function getTodayHeading() {
  return new Date().toLocaleDateString(dateLocale(), {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'Asia/Jerusalem'
  });
}

function renderMatches(matches, scrollToToday = false) {
  const main = document.querySelector('.main');
  main.innerHTML = '';

  let filtered = activeStageFilter === 'all'
    ? matches
    : matches.filter(m => m.IdStage === STAGE_ID[activeStageFilter]);

  if (teamSearchQuery) {
    filtered = filtered.filter(m => {
      const home = (getTeamName(m.Home) || m.PlaceHolderA || '').toLowerCase();
      const away = (getTeamName(m.Away) || m.PlaceHolderB || '').toLowerCase();
      return home.includes(teamSearchQuery) || away.includes(teamSearchQuery);
    });
  }

  if (filtered.length === 0) {
    main.innerHTML = `<div class="error"><div class="error-icon">📅</div>${t('errorNoMatches')}</div>`;
    return;
  }

  const todayHeading = getTodayHeading();
  let todaySection = null;

  const groups = groupByDate(filtered);
  for (const [dateLabel, dayMatches] of groups) {
    const section = document.createElement('section');
    section.className = 'date-group';
    const heading = document.createElement('h2');
    heading.className = 'date-label' + (dateLabel === todayHeading ? ' date-label--today' : '');
    heading.textContent = dateLabel === todayHeading ? `${dateLabel} ${t('standingsToday')}` : dateLabel;
    section.appendChild(heading);
    for (const match of dayMatches) {
      section.appendChild(buildMatchCard(match));
    }
    main.appendChild(section);
    if (dateLabel === todayHeading) todaySection = section;
  }

  if (scrollToToday && todaySection) {
    setTimeout(() => todaySection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
}

function showLoading() {
  document.querySelector('.main').innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      ${t('loadingMatches')}
    </div>`;
}

function showError(msg) {
  document.querySelector('.main').innerHTML = `
    <div class="error">
      <div class="error-icon">⚠️</div>
      ${msg}
    </div>`;
}

async function fetchIsraelChannels() {
  try {
    const res = await fetch(WATCH_API);
    if (!res.ok) return;
    const data = await res.json();
    const israel = (data.Results || []).find(r => r.IdCountry === 'ISR');
    if (!israel) return;
    for (const m of (israel.Matches || [])) {
      const sources = m.Sources || [];
      const hasKan11    = sources.some(s => s.Name === 'KAN 11');
      const hasMakan33  = sources.some(s => s.Name === 'MAKAN 33');
      israelChannels[m.IdMatch] = sources.filter(s => {
        if (s.Name === 'KAN'   && hasKan11)   return false;
        if (s.Name === 'MAKAN' && hasMakan33) return false;
        return true;
      });
    }
  } catch { /* channels are non-critical — silently skip */ }
}

async function fetchMatchesAr() {
  try {
    const res = await fetch(MATCHES_API_AR);
    if (!res.ok) return;
    const data = await res.json();
    allMatchesAr = data.Results || [];
  } catch { /* non-critical — fall back to EN */ }
}

// Normalise a team name for fuzzy matching across FIFA and ESPN naming differences
function normaliseName(name) {
  return (name || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]/g, ''); // strip spaces/punctuation
}

// Known name discrepancies between FIFA (en-GB) and ESPN
const ESPN_NAME_MAP = {
  'czechia':              'czechrepublic',
  'türkiye':              'turkey',
  'ivorycoast':           'cotedivoire',
  'unitedstates':         'usa',
  'korearepublic':        'southkorea',
  'bosniaandherzegovina': 'bosniaherzegovina',
  'iriran':               'iran',
  'caboverde':            'capeverde',
};

function normTeam(name) {
  const n = normaliseName(name);
  return ESPN_NAME_MAP[n] || n;
}

async function fetchEspnIndex() {
  try {
    const res = await fetch(ESPN_INDEX_API);
    if (!res.ok) return;
    const data = await res.json();
    const espnEvents = data.events || [];

    // Build a lookup: normKey → espnEventId
    const espnByKey = new Map();
    for (const ev of espnEvents) {
      const comp = ev.competitions?.[0];
      if (!comp) continue;
      const date = ev.date?.slice(0, 10) || '';
      const teams = comp.competitors.map(c => normTeam(c.team?.displayName));
      const key = `${date}_${teams.sort().join('_')}`;
      espnByKey.set(key, ev.id);
    }

    // Match against FIFA allMatches
    for (const m of allMatches) {
      const date = m.Date?.slice(0, 10) || '';
      const home = normTeam(getTeamName(m.Home) || m.PlaceHolderA || '');
      const away = normTeam(getTeamName(m.Away) || m.PlaceHolderB || '');
      const key  = `${date}_${[home, away].sort().join('_')}`;
      if (espnByKey.has(key)) {
        fifaToEspn.set(m.IdMatch, espnByKey.get(key));
      }
    }
  } catch { /* non-critical — pitch view won't show if unavailable */ }
}

function activeMatches() {
  return currentLang === 'ar' && allMatchesAr.length > 0 ? allMatchesAr : allMatches;
}

async function init() {
  initLangToggle();
  initTabs();
  initFilters();
  showLoading();
  try {
    const [matchRes] = await Promise.all([
      fetch(MATCHES_API),
      fetchIsraelChannels(),
      fetchMatchesAr()
    ]);
    if (!matchRes.ok) throw new Error(`FIFA API returned ${matchRes.status}`);
    const data = await matchRes.json();
    allMatches = data.Results || [];
    if (allMatches.length === 0) throw new Error('No matches returned from API');
    fetchEspnIndex(); // non-blocking — populates fifaToEspn in the background
    renderMatches(activeMatches(), true);
  } catch (err) {
    console.error(err);
    showError(t('errorMatches'));
  }
}

// ── Tab switching ──────────────────────────────────────────────
let allMatches = [];
let allMatchesAr = [];
let israelChannels = {}; // IdMatch → channels[]
const fifaToEspn = new Map(); // FIFA IdMatch → ESPN event ID
let activeTab = 'matches';
let activeStageFilter = 'all';
let teamSearchQuery = '';
let currentLang = localStorage.getItem('wc2026-lang') || 'en';

function updateStaticStrings() {
  // Tabs
  document.querySelector('.tab[data-tab="matches"]').textContent   = t('tabMatches');
  document.querySelector('.tab[data-tab="standings"]').textContent = t('tabStandings');
  document.querySelector('.tab[data-tab="stats"]').textContent     = t('tabStats');
  // Filter chips
  document.querySelector('.chip[data-stage="all"]').textContent           = t('chipAll');
  document.querySelector('.chip[data-stage="First Stage"]').textContent   = t('chipGroups');
  document.querySelector('.chip[data-stage="Round of 32"]').textContent   = t('chipR32');
  document.querySelector('.chip[data-stage="Round of 16"]').textContent   = t('chipR16');
  document.querySelector('.chip[data-stage="Quarter-final"]').textContent = t('chipQF');
  document.querySelector('.chip[data-stage="Semi-final"]').textContent    = t('chipSF');
  document.querySelector('.chip[data-stage="Final"]').textContent         = t('chipFinal');
  // Search placeholder
  document.getElementById('team-search').placeholder = t('searchPlaceholder');
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('wc2026-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
  });
  updateStaticStrings();
  if (allMatches.length > 0) renderActiveTab();
}

function initLangToggle() {
  applyLang(currentLang);
  document.getElementById('lang-toggle').addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    applyLang(btn.dataset.lang);
  });
}

function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      activeTab = tab.dataset.tab;
      showMatchesUI(activeTab === 'matches');
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
      renderMatches(activeMatches());
    });
  });

  const searchInput = document.getElementById('team-search');
  searchInput.addEventListener('input', () => {
    teamSearchQuery = searchInput.value.trim().toLowerCase();
    renderMatches(activeMatches());
  });
}

function showMatchesUI(show) {
  document.getElementById('filters').style.display = show ? 'flex' : 'none';
  document.getElementById('team-search-wrap').style.display = show ? 'block' : 'none';
}

let activeStatsSection = 'player'; // 'player' or 'team'
let activePlayerSub = 'scorers';
let activeTeamSub = 'goals-per-game';

function renderActiveTab() {
  if (activeTab === 'matches') renderMatches(activeMatches());
  else if (activeTab === 'standings') renderStandings(activeMatches());
  else if (activeTab === 'stats') renderStats(activeMatches());
}

function renderStats(matches) {
  const main = document.querySelector('.main');
  main.innerHTML = `
    <div class="stats-section-tabs">
      <button class="stats-section-tab ${activeStatsSection === 'player' ? 'stats-section-tab--active' : ''}" data-section="player">${t('statsPlayer')}</button>
      <button class="stats-section-tab ${activeStatsSection === 'team' ? 'stats-section-tab--active' : ''}" data-section="team">${t('statsTeam')}</button>
    </div>
    <div id="stats-content"></div>`;

  main.querySelectorAll('.stats-section-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeStatsSection = btn.dataset.section;
      renderStats(matches);
    });
  });

  const content = main.querySelector('#stats-content');
  if (activeStatsSection === 'player') renderPlayerStats(matches, content);
  else renderTeamStats(matches, content);
}

function renderPlayerStats(matches, container) {
  container.innerHTML = `
    <div class="stats-tabs">
      <button class="stats-tab ${activePlayerSub === 'scorers'   ? 'stats-tab--active' : ''}" data-sub="scorers">${t('statGoals')}</button>
      <button class="stats-tab ${activePlayerSub === 'assists'   ? 'stats-tab--active' : ''}" data-sub="assists">${t('statAssists')}</button>
      <button class="stats-tab ${activePlayerSub === 'clean'     ? 'stats-tab--active' : ''}" data-sub="clean">${t('statClean')}</button>
      <button class="stats-tab ${activePlayerSub === 'yellow'    ? 'stats-tab--active' : ''}" data-sub="yellow">${t('statYellow')}</button>
      <button class="stats-tab ${activePlayerSub === 'red'       ? 'stats-tab--active' : ''}" data-sub="red">${t('statRed')}</button>
    </div>
    <div id="player-stats-content"></div>`;

  container.querySelectorAll('.stats-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activePlayerSub = btn.dataset.sub;
      renderPlayerStats(matches, container);
    });
  });

  const inner = container.querySelector('#player-stats-content');
  if      (activePlayerSub === 'scorers') renderScorers(matches, inner);
  else if (activePlayerSub === 'assists') renderAssists(matches, inner);
  else if (activePlayerSub === 'clean')   renderCleanSheets(matches, inner);
  else if (activePlayerSub === 'yellow')  renderCardLeaders(matches, inner, 'yellow');
  else if (activePlayerSub === 'red')     renderCardLeaders(matches, inner, 'red');
}

function renderTeamStats(matches, container) {
  const subs = [
    { key: 'goals-per-game',     label: t('teamGoalsGame') },
    { key: 'conceded-per-game',  label: t('teamConcededGame') },
    { key: 'clean-sheets',       label: t('teamClean') },
    { key: 'yellow-cards',       label: t('teamYellow') },
    { key: 'red-cards',          label: t('teamRed') },
  ];

  container.innerHTML = `
    <div class="stats-tabs">
      ${subs.map(s => `<button class="stats-tab ${activeTeamSub === s.key ? 'stats-tab--active' : ''}" data-sub="${s.key}">${s.label}</button>`).join('')}
    </div>
    <div id="team-stats-content"></div>`;

  container.querySelectorAll('.stats-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTeamSub = btn.dataset.sub;
      renderTeamStats(matches, container);
    });
  });

  const inner = container.querySelector('#team-stats-content');
  renderTeamLeaderboard(matches, inner, activeTeamSub);
}

async function renderTeamLeaderboard(matches, container, type) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingComputing')}</div>`;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
  const teamMap = new Map(); // teamId → { name, flag, played, scored, conceded, cleanSheets, yellow, red }

  const ensureTeam = (team) => {
    if (!team) return;
    if (!teamMap.has(team.IdTeam)) {
      teamMap.set(team.IdTeam, {
        id: team.IdTeam,
        name: getTeamName(team) || '?',
        flag: countryToFlag(team.IdCountry),
        played: 0, scored: 0, conceded: 0, cleanSheets: 0, yellow: 0, red: 0
      });
    }
    return teamMap.get(team.IdTeam);
  };

  // Compute match-based stats
  for (const m of finishedMatches) {
    const home = ensureTeam(m.Home);
    const away = ensureTeam(m.Away);
    if (!home || !away) continue;

    const hs = m.HomeTeamScore ?? 0;
    const as = m.AwayTeamScore ?? 0;

    home.played++;  away.played++;
    home.scored   += hs; home.conceded += as;
    away.scored   += as; away.conceded += hs;
    if (as === 0) home.cleanSheets++;
    if (hs === 0) away.cleanSheets++;
  }

  // Compute card stats from timelines
  if (type === 'yellow-cards' || type === 'red-cards') {
    const cardType = type === 'yellow-cards' ? 2 : 3;
    for (const match of finishedMatches) {
      let events;
      if (timelineCache.has(match.IdMatch)) {
        events = timelineCache.get(match.IdMatch);
      } else {
        try {
          const url = TIMELINE_API.replace('{stage}', match.IdStage).replace('{match}', match.IdMatch);
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          events = data.Event || [];
          timelineCache.set(match.IdMatch, events);
        } catch { continue; }
      }
      for (const ev of events) {
        if (ev.Type !== cardType || !ev.IdTeam) continue;
        const entry = teamMap.get(ev.IdTeam);
        if (!entry) continue;
        if (type === 'yellow-cards') entry.yellow++;
        else entry.red++;
      }
    }
  }

  const getValue = (team, key) => {
    switch (key) {
      case 'goals-per-game':    return team.played ? +(team.scored   / team.played).toFixed(2) : 0;
      case 'conceded-per-game': return team.played ? +(team.conceded / team.played).toFixed(2) : 0;
      case 'clean-sheets':      return team.cleanSheets;
      case 'yellow-cards':      return team.yellow;
      case 'red-cards':         return team.red;
    }
  };

  const getLabel = (key) => {
    switch (key) {
      case 'goals-per-game':    return t('teamGoalsGame');
      case 'conceded-per-game': return t('teamConcededGame');
      case 'clean-sheets':      return t('teamClean');
      case 'yellow-cards':      return '🟨';
      case 'red-cards':         return '🟥';
    }
  };

  const sorted = [...teamMap.values()]
    .filter(team => team.played > 0)
    .sort((a, b) => getValue(b, type) - getValue(a, type))
    .slice(0, 20);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`;
    return;
  }

  container.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';
  sorted.forEach((team, i) => {
    const value = getValue(team, type);
    const label = getLabel(type);
    const row = document.createElement('div');
    row.className = 'scorer-row';
    row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${team.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${team.name}</div>
        <div class="scorer-team">${t('gamesPlayed', team.played)}</div>
      </div>
      <div>
        <div class="scorer-goals">${value}</div>
        <div class="scorer-goals-label">${label}</div>
      </div>`;
    list.appendChild(row);
  });
  container.appendChild(list);
}

// ── Standings (computed from match results) ────────────────────
function isGroupStage(match) {
  // IdStage is language-independent; StageName text varies by language
  return match.IdStage === '289273';
}

function computeStandings(matches) {
  const groups = new Map();

  for (const m of matches) {
    if (!isGroupStage(m)) continue;
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
    main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('standingsNoData')}</div>`;
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
      <th colspan="2">${t('standingsTeam')}</th>
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
async function renderScorers(matches, container) {
  const main = container || document.querySelector('.main');
  main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingScorers')}</div>`;

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
    main.innerHTML = `<div class="error"><div class="error-icon">⚽</div>${t('errorNoGoals')}</div>`;
    return;
  }

  main.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';

  sorted.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'scorer-row';
    row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${s.name}</div>
        <div class="scorer-team">${s.teamName}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.goals}</div>
        <div class="scorer-goals-label">${t('goalLabel', s.goals)}</div>
      </div>`;
    list.appendChild(row);
  });

  main.appendChild(list);
}

// ── Assists (computed from timelines) ─────────────────────────
async function renderAssists(matches, container) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingAssists')}</div>`;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
  const playerMap = new Map();

  for (const match of finishedMatches) {
    let events;
    if (timelineCache.has(match.IdMatch)) {
      events = timelineCache.get(match.IdMatch);
    } else {
      try {
        const url = TIMELINE_API.replace('{stage}', match.IdStage).replace('{match}', match.IdMatch);
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        events = data.Event || [];
        timelineCache.set(match.IdMatch, events);
      } catch { continue; }
    }

    for (const ev of events) {
      if (ev.Type !== 1 || !ev.IdPlayer) continue;
      const desc = ev.EventDescription?.[0]?.Description || '';
      const m = desc.match(/Assisted by (.+)\./);
      const name = m ? m[1] : null;
      if (!name) continue;
      const team = ev.IdTeam === match.Home?.IdTeam ? match.Home : match.Away;
      const flag = team ? countryToFlag(team.IdCountry) : '🏳️';
      const teamName = team ? (getTeamName(team) || '') : '';
      if (!playerMap.has(ev.IdPlayer)) playerMap.set(ev.IdPlayer, { name, flag, teamName, count: 0 });
      playerMap.get(ev.IdPlayer).count++;
    }
  }

  const sorted = [...playerMap.values()].sort((a, b) => b.count - a.count).slice(0, 20);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">🎯</div>${t('errorNoAssists')}</div>`;
    return;
  }

  container.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';
  sorted.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'scorer-row';
    row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${s.name}</div>
        <div class="scorer-team">${s.teamName}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.count}</div>
        <div class="scorer-goals-label">${t('assistLabel', s.count)}</div>
      </div>`;
    list.appendChild(row);
  });
  container.appendChild(list);
}

// ── Clean Sheets GK (from lineup API — starter Position=0 per match) ───
async function renderCleanSheets(matches, container) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingClean')}</div>`;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
  const gkMap = new Map(); // playerId → { name, flag, teamName, count }

  for (const match of finishedMatches) {
    // A clean sheet only exists if at least one team scored 0
    const homeScore = match.HomeTeamScore ?? null;
    const awayScore = match.AwayTeamScore ?? null;
    if (homeScore === null || awayScore === null) continue;
    if (homeScore !== 0 && awayScore !== 0) continue; // no clean sheet in this match

    const lineup = await fetchLineup(match);
    if (!lineup) continue;

    for (const side of ['home', 'away']) {
      const team      = side === 'home' ? match.Home : match.Away;
      const conceded  = side === 'home' ? awayScore  : homeScore;
      if (conceded !== 0) continue; // this side didn't keep a clean sheet

      const lineupSide = lineup[side];
      if (!lineupSide) continue;

      // Starting GK = starter with Position 0
      const gk = lineupSide.starters.find(p => p.position === 0);
      if (!gk || !gk.id) continue;

      const flag     = team ? countryToFlag(team.IdCountry) : '🏳️';
      const teamName = team ? (getTeamName(team) || '') : '';

      if (!gkMap.has(gk.id)) {
        gkMap.set(gk.id, { name: gk.name, flag, teamName, count: 0 });
      }
      gkMap.get(gk.id).count++;
    }
  }

  const sorted = [...gkMap.values()].sort((a, b) => b.count - a.count).slice(0, 20);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">🧤</div>${t('errorNoClean')}</div>`;
    return;
  }

  container.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';
  sorted.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'scorer-row';
    row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${s.name}</div>
        <div class="scorer-team">${s.teamName}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.count}</div>
        <div class="scorer-goals-label">${t('cleanLabel', s.count)}</div>
      </div>`;
    list.appendChild(row);
  });
  container.appendChild(list);
}

// ── Card leaders (computed from timelines) ─────────────────────
async function renderCardLeaders(matches, container, type) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingComputing')}</div>`;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
  const playerMap = new Map();
  const eventType = type === 'yellow' ? 2 : 3;
  const icon = type === 'yellow' ? '🟨' : '🟥';
  const label = type === 'yellow' ? 'yellow' : 'red';

  for (const match of finishedMatches) {
    let events;
    if (timelineCache.has(match.IdMatch)) {
      events = timelineCache.get(match.IdMatch);
    } else {
      try {
        const url = TIMELINE_API.replace('{stage}', match.IdStage).replace('{match}', match.IdMatch);
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        events = data.Event || [];
        timelineCache.set(match.IdMatch, events);
      } catch { continue; }
    }

    for (const ev of events) {
      if (ev.Type !== eventType || !ev.IdPlayer) continue;
      const desc = ev.EventDescription?.[0]?.Description || '';
      const m = desc.match(/^(.+?) \(/);
      const name = m ? m[1] : null;
      if (!name) continue;
      const team = ev.IdTeam === match.Home?.IdTeam ? match.Home : match.Away;
      const flag = team ? countryToFlag(team.IdCountry) : '🏳️';
      const teamName = team ? (getTeamName(team) || '') : '';
      if (!playerMap.has(ev.IdPlayer)) playerMap.set(ev.IdPlayer, { name, flag, teamName, count: 0 });
      playerMap.get(ev.IdPlayer).count++;
    }
  }

  const sorted = [...playerMap.values()].sort((a, b) => b.count - a.count).slice(0, 20);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">${icon}</div>${t('errorNoCards', type)}</div>`;
    return;
  }

  container.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';

  sorted.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'scorer-row';
    row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${s.name}</div>
        <div class="scorer-team">${s.teamName}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.count}</div>
        <div class="scorer-goals-label">${icon}</div>
      </div>`;
    list.appendChild(row);
  });

  container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', init);
