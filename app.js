const MATCHES_API    = 'https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104';
const MATCHES_API_AR = 'https://api.fifa.com/api/v3/calendar/matches?language=ar-SA&idCompetition=17&idSeason=285023&count=104';
const WATCH_API      = 'https://api.fifa.com/api/v3/watch/season/285023?language=en-GB';

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
      detail.innerHTML = `<p class="detail-empty">${t('detailLoadError')}</p>`;
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

function renderTimeline(match, events, detail) {
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

// ── Clean Sheets GK (computed from timelines + match scores) ───
async function renderCleanSheets(matches, container) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingClean')}</div>`;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED);
  const gkMap = new Map(); // playerId → { name, flag, teamName, count }

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

    // Find GKs from Type 57 (Goal Prevention) — IdPlayer is always the GK
    const gksSeen = new Map(); // teamId → playerId
    for (const ev of events) {
      if (ev.Type !== 57 || !ev.IdPlayer || !ev.IdTeam) continue;
      if (!gksSeen.has(ev.IdTeam)) gksSeen.set(ev.IdTeam, ev.IdPlayer);
    }

    // Build a name lookup: playerId → name, by scanning all named events in this timeline
    const playerNames = new Map();
    for (const ev of events) {
      if (!ev.IdPlayer) continue;
      const desc = ev.EventDescription?.[0]?.Description || '';
      let name = null;
      if (ev.Type === 2 || ev.Type === 3) {
        // "MOKOENA (South Africa) is booked..." or "PLAYER (Team) receives..."
        const m = desc.match(/^([A-ZÁÉÍÓÚÀÈÒÑÜ][^(]+?)\s*\(/);
        if (m) name = m[1].trim();
      } else if (ev.Type === 18) {
        // "MODIBA (South Africa) commits a foul." or "Brian GUTIERREZ (Mexico) commits..."
        const m = desc.match(/^([^(]+?)\s*\(/);
        if (m) name = m[1].trim();
      } else if (ev.Type === 5) {
        // "Thalente MBATHA (in) comes off the bench to replace Lyle FOSTER (out)"
        const mIn  = desc.match(/^(.+?) \(in\)/);
        const mOut = desc.match(/replace (.+?) \(out\)/);
        if (mIn  && ev.IdPlayer)    playerNames.set(ev.IdPlayer,    mIn[1].trim());
        if (mOut && ev.IdSubPlayer) playerNames.set(ev.IdSubPlayer, mOut[1].trim());
        continue;
      } else if (ev.Type === 15 || ev.Type === 16) {
        // "Brian GUTIERREZ (Mexico) takes a corner kick."
        const m = desc.match(/^([^(]+?)\s*\(/);
        if (m) name = m[1].trim();
      }
      if (name && ev.IdPlayer && !playerNames.has(ev.IdPlayer)) {
        playerNames.set(ev.IdPlayer, name);
      }
    }

    // Check clean sheet and record GK
    for (const [teamId, playerId] of gksSeen) {
      const isHome = teamId === match.Home?.IdTeam;
      const conceded = isHome ? match.AwayTeamScore : match.HomeTeamScore;
      if (conceded !== 0) continue;

      const team = isHome ? match.Home : match.Away;
      const flag = team ? countryToFlag(team.IdCountry) : '🏳️';
      const teamName = team ? (getTeamName(team) || '') : '';
      const name = playerNames.get(playerId) || null;

      if (!gkMap.has(playerId)) {
        gkMap.set(playerId, { name, flag, teamName, count: 0 });
      } else if (!gkMap.get(playerId).name && name) {
        gkMap.get(playerId).name = name;
      }
      gkMap.get(playerId).count++;
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
    const displayName = s.name || `${s.teamName} GK`;
    row.innerHTML = `
      <div class="scorer-rank">${i + 1}</div>
      <span class="scorer-flag">${s.flag}</span>
      <div class="scorer-info">
        <div class="scorer-name">${displayName}</div>
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
