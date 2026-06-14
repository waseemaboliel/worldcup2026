const MATCHES_API = 'https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104';
const MATCHES_API_AR = 'https://api.fifa.com/api/v3/calendar/matches?language=ar-SA&idCompetition=17&idSeason=285023&count=104';
const WATCH_API = 'https://api.fifa.com/api/v3/watch/season/285023?language=en-GB';
const ESPN_INDEX_API = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200';

const STRINGS = {
  en: {
    tabMatches: 'Matches', tabStandings: 'Standings', tabBracket: 'Bracket', tabStats: 'Stats',
    bracketNotStarted: 'Knockout stage has not started yet.',
    bracketTabTree: 'Bracket',
    bracketTBD: 'TBD',
    bracketGroupWinner: (g) => `Group ${g} Winner`,
    bracketGroupSecond: (g) => `Group ${g} Runner-up`,
    bracketBestThird: (g) => `Best 3rd (${g})`,
    bracketWinnerOf: (a, b) => `W(${a} v ${b})`,
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
    // Player stat tabs
    statShots: 'Shots', statOnTarget: 'On Target', statSaves: 'Saves',
    statFouls: 'Fouls', statOffsides: 'Offsides',
    // Team stat tabs
    teamPossession: 'Possession %', teamShots: 'Shots/Game',
    teamOnTarget: 'On Target/Game', teamPasses: 'Passes/Game',
    teamPassAcc: 'Pass Accuracy %', teamTackles: 'Tackles/Game',
    teamInterceptions: 'Interceptions/Game',
    // Leaderboard value labels
    labelShots: 'shots', labelOnTarget: 'on target', labelSaves: 'saves',
    labelFouls: 'fouls', labelOffsides: 'offsides',
    // Match stats panel row labels
    mstatPasses: 'Passes', mstatAccCrosses: 'Accurate Crosses',
    mstatLongBalls: 'Long Balls', mstatClearances: 'Clearances', mstatCorners: 'Corners',
    matchStatsTitle: '📊 Match Stats', topPerformersTitle: '⭐ Top Performers',
    // Live match
    liveBadge: '🟢 LIVE', liveHT: 'HT', liveET: 'ET', livePSO: 'PSO', liveOG: 'OG',
    liveStartingSoon: 'Starting Soon', liveMatchEnded: 'Match Ended',
    livePeriod: (s) => ({ 'First Half': '1st Half', 'Second Half': '2nd Half', 'Half Time': 'Half Time', 'Extra Time': 'ET', 'Penalty Shootout': 'PSO' }[s] || s),
    // Player profile
    profileGoals: 'Goals', profileAssists: 'Assists', profileYellow: 'Yellow Cards', profileRed: 'Red Cards',
    profileTournamentStats: 'Tournament Stats', profileMatchHistory: 'Tournament Events',
    profileOG: 'Own Goal', profileClose: 'Close',
    // Team profile
    teamMatches: 'Matches', teamRecord: 'Record',
    teamWon: 'W', teamDrawn: 'D', teamLost: 'L',
    teamGF: 'GF', teamGA: 'GA',
  },
  he: {
    tabMatches: 'משחקים', tabStandings: 'טבלאות', tabBracket: 'סבב נוקאאוט', tabStats: 'סטטיסטיקה',
    bracketNotStarted: 'שלב הנוקאאוט טרם התחיל.',
    bracketTabTree: 'עץ',
    bracketTBD: 'לא ידוע',
    bracketGroupWinner: (g) => `מקום ראשון בית ${g}`,
    bracketGroupSecond: (g) => `מקום שני בית ${g}`,
    bracketBestThird: (g) => `שלישי טוב (${g})`,
    bracketWinnerOf: (a, b) => `מנצח(${a} נ׳ ${b})`,
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
    // Player stat tabs
    statShots: 'בעיטות', statOnTarget: 'על השער', statSaves: 'הצלות',
    statFouls: 'עבירות', statOffsides: 'נבדלות',
    // Team stat tabs
    teamPossession: 'החזקת כדור %', teamShots: 'בעיטות/משחק',
    teamOnTarget: 'על השער/משחק', teamPasses: 'מסירות/משחק',
    teamPassAcc: 'דיוק מסירות %', teamTackles: 'חטיפות/משחק',
    teamInterceptions: 'יירוטים/משחק',
    // Leaderboard value labels
    labelShots: 'בעיטות', labelOnTarget: 'על השער', labelSaves: 'הצלות',
    labelFouls: 'עבירות', labelOffsides: 'נבדלות',
    // Match stats panel row labels
    mstatPasses: 'מסירות', mstatAccCrosses: 'מסירות רוחביות מדויקות',
    mstatLongBalls: 'כדורים ארוכים', mstatClearances: 'פינויים', mstatCorners: 'קרנות',
    matchStatsTitle: '📊 סטטיסטיקת משחק', topPerformersTitle: '⭐ שחקנים בולטים',
    // Live match
    liveBadge: '🟢 חי', liveHT: 'הפ׳', liveET: 'הא׳', livePSO: 'פנ׳', liveOG: 'גול עצמי',
    liveStartingSoon: 'מתחיל בקרוב', liveMatchEnded: 'המשחק הסתיים',
    livePeriod: (s) => ({ 'First Half': 'מחצית ראשונה', 'Second Half': 'מחצית שנייה', 'Half Time': 'הפסקה', 'Extra Time': 'הארכה', 'Penalty Shootout': 'פנדלים' }[s] || s),
    // Player profile
    profileGoals: 'שערים', profileAssists: 'בישולים', profileYellow: 'כרטיסים צהובים', profileRed: 'כרטיסים אדומים',
    profileTournamentStats: 'סטטיסטיקת טורניר', profileMatchHistory: 'אירועי טורניר',
    profileOG: 'גול עצמי', profileClose: 'סגור',
    // Team profile
    teamMatches: 'משחקים', teamRecord: 'תוצאות',
    teamWon: 'נ', teamDrawn: 'ת', teamLost: 'ה',
    teamGF: 'ש"כ', teamGA: 'ש"ס',
  },
  ar: {
    tabMatches: 'مباريات', tabStandings: 'ترتيب', tabBracket: 'الأدوار الإقصائية', tabStats: 'إحصاءات',
    bracketNotStarted: 'لم تبدأ مرحلة خروج المغلوب بعد.',
    bracketTabTree: 'الجدول',
    bracketTBD: 'غير محدد',
    bracketGroupWinner: (g) => `المركز الأول في المجموعة ${g}`,
    bracketGroupSecond: (g) => `المركز الثاني في المجموعة ${g}`,
    bracketBestThird: (g) => `أفضل ثالث (${g})`,
    bracketWinnerOf: (a, b) => `فائز(${a} ضد ${b})`,
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
    // Player stat tabs
    statShots: 'التسديدات', statOnTarget: 'على المرمى', statSaves: 'التصديات',
    statFouls: 'المخالفات', statOffsides: 'التسلل',
    // Team stat tabs
    teamPossession: 'الاستحواذ %', teamShots: 'تسديدات/مباراة',
    teamOnTarget: 'على المرمى/مباراة', teamPasses: 'تمريرات/مباراة',
    teamPassAcc: 'دقة التمرير %', teamTackles: 'إيقاعات/مباراة',
    teamInterceptions: 'اعتراضات/مباراة',
    // Leaderboard value labels
    labelShots: 'تسديدة', labelOnTarget: 'على المرمى', labelSaves: 'تصدٍّ',
    labelFouls: 'مخالفة', labelOffsides: 'تسلل',
    // Match stats panel row labels
    mstatPasses: 'التمريرات', mstatAccCrosses: 'العرضيات الدقيقة',
    mstatLongBalls: 'الكرات الطويلة', mstatClearances: 'التكتيشات', mstatCorners: 'الركنيات',
    matchStatsTitle: '📊 إحصاءات المباراة', topPerformersTitle: '⭐ أبرز اللاعبين',
    // Live match
    liveBadge: '🟢 مباشر', liveHT: 'ن.و', liveET: 'و.إ', livePSO: 'ر.ج', liveOG: 'هدف عكسي',
    liveStartingSoon: 'يبدأ قريباً', liveMatchEnded: 'انتهت المباراة',
    livePeriod: (s) => ({ 'First Half': 'الشوط الأول', 'Second Half': 'الشوط الثاني', 'Half Time': 'استراحة', 'Extra Time': 'الوقت الإضافي', 'Penalty Shootout': 'ركلات الترجيح' }[s] || s),
    // Player profile
    profileGoals: 'أهداف', profileAssists: 'تمريرات حاسمة', profileYellow: 'بطاقات صفراء', profileRed: 'بطاقات حمراء',
    profileTournamentStats: 'إحصاءات البطولة', profileMatchHistory: 'أحداث البطولة',
    profileOG: 'هدف عكسي', profileClose: 'إغلاق',
    // Team profile
    teamMatches: 'المباريات', teamRecord: 'السجل',
    teamWon: 'ف', teamDrawn: 'ت', teamLost: 'خ',
    teamGF: 'له', teamGA: 'عليه',
  }
};

function t(key, ...args) {
  const s = STRINGS[currentLang]?.[key] ?? STRINGS.en[key];
  return typeof s === 'function' ? s(...args) : (s ?? key);
}

// FIFA 3-letter → ISO 3166-1 alpha-2 (from working calendar project)
const FIFA_TO_ALPHA2 = {
  MEX: 'MX', RSA: 'ZA', KOR: 'KR', CZE: 'CZ', CAN: 'CA', BIH: 'BA', USA: 'US', PAR: 'PY',
  QAT: 'QA', SUI: 'CH', BRA: 'BR', MAR: 'MA', ARG: 'AR', ESP: 'ES', POR: 'PT', FRA: 'FR',
  GER: 'DE', ENG: 'GB', ITA: 'IT', NED: 'NL', BEL: 'BE', URU: 'UY', COL: 'CO', CHI: 'CL',
  ECU: 'EC', PER: 'PE', VEN: 'VE', BOL: 'BO', HON: 'HN', CRC: 'CR', PAN: 'PA', JAM: 'JM',
  TRI: 'TT', NGA: 'NG', GHA: 'GH', CMR: 'CM', SEN: 'SN', CIV: 'CI', EGY: 'EG', ALG: 'DZ',
  TUN: 'TN', MAL: 'ML', BFA: 'BF', ZAM: 'ZM', UGA: 'UG', JPN: 'JP', AUS: 'AU', TUR: 'TR',
  IRN: 'IR', KSA: 'SA', UAE: 'AE', JOR: 'JO', IRQ: 'IQ', ISR: 'IL', UZB: 'UZ', KAZ: 'KZ',
  CHN: 'CN', NZL: 'NZ', POL: 'PL', CRO: 'HR', SRB: 'RS', SVK: 'SK', SVN: 'SI', AUT: 'AT',
  SWE: 'SE', DEN: 'DK', NOR: 'NO', FIN: 'FI', IRL: 'IE', GRE: 'GR', ROU: 'RO', HUN: 'HU',
  UKR: 'UA', GEO: 'GE', ALB: 'AL', MKD: 'MK', MNE: 'ME', VNM: 'VN', THA: 'TH', IDN: 'ID',
  MYS: 'MY', PHI: 'PH', GTM: 'GT', SLV: 'SV', NCA: 'NI', CUB: 'CU', LBN: 'LB', PAL: 'PS',
  KWT: 'KW', BHR: 'BH', OMN: 'OM', YEM: 'YE', SYR: 'SY',
  HAI: 'HT', SCO: 'GB-SCT', CUW: 'CW', CPV: 'CV', COD: 'CD'
};

const TEAM_NAME_HE = {
  // North & Central America + Caribbean
  USA: 'ארצות הברית', CAN: 'קנדה', MEX: 'מקסיקו',
  HON: 'הונדורס', GTM: 'גואטמלה', CRC: 'קוסטה ריקה',
  PAN: 'פנמה', JAM: 'ג׳מייקה', TRI: 'טרינידד וטובגו',
  HAI: 'האיטי', CUB: 'קובה', SLV: 'אל סלבדור', NCA: 'ניקרגואה',
  // South America
  BRA: 'ברזיל', ARG: 'ארגנטינה', URU: 'אורוגוואי', COL: 'קולומביה',
  ECU: 'אקוודור', CHI: 'צ׳ילה', PAR: 'פרגוואי', PER: 'פרו',
  VEN: 'ונצואלה', BOL: 'בוליביה',
  // Europe
  ESP: 'ספרד', FRA: 'צרפת', ENG: 'אנגליה', GER: 'גרמניה',
  POR: 'פורטוגל', NED: 'הולנד', ITA: 'איטליה', BEL: 'בלגיה',
  CRO: 'קרואטיה', SUI: 'שווייץ', AUT: 'אוסטריה', POL: 'פולין',
  SRB: 'סרביה', DEN: 'דנמרק', HUN: 'הונגריה', UKR: 'אוקראינה',
  TUR: 'טורקיה', ROU: 'רומניה', SCO: 'סקוטלנד', GRE: 'יוון',
  SVK: 'סלובקיה', SVN: 'סלובניה', NOR: 'נורווגיה', SWE: 'שוודיה',
  FIN: 'פינלנד', IRL: 'אירלנד', ALB: 'אלבניה', MKD: 'מקדוניה הצפונית',
  MNE: 'מונטנגרו', GEO: 'גאורגיה', CZE: 'צ׳כיה', BIH: 'בוסניה והרצגובינה',
  // Africa
  MAR: 'מרוקו', SEN: 'סנגל', NGA: 'ניגריה', CMR: 'קמרון',
  RSA: 'דרום אפריקה', GHA: 'גאנה', EGY: 'מצרים', TUN: 'תוניסיה',
  CIV: 'חוף השנהב', ALG: 'אלג׳יריה', MAL: 'מאלי', BFA: 'בורקינה פאסו',
  ZAM: 'זמביה', UGA: 'אוגנדה', COD: 'קונגו (קינשסה)', CPV: 'כף ורדה',
  // Asia & Oceania
  JPN: 'יפן', KOR: 'קוריאה הדרומית', IRN: 'איראן', KSA: 'ערב הסעודית',
  AUS: 'אוסטרליה', QAT: 'קטאר', UAE: 'איחוד האמירויות', JOR: 'ירדן',
  IRQ: 'עיראק', ISR: 'ישראל', UZB: 'אוזבקיסטן', KAZ: 'קזחסטן',
  CHN: 'סין', NZL: 'ניו זילנד', VNM: 'וייטנאם', THA: 'תאילנד',
  IDN: 'אינדונזיה', MYS: 'מלזיה', PHI: 'פיליפינים',
  // Middle East (non-Asian slot)
  LBN: 'לבנון', PAL: 'פלסטין', KWT: 'כווית', BHR: 'בחריין',
  OMN: 'עומאן', YEM: 'תימן', SYR: 'סוריה',
  CUW: 'קוראסאו',
};

const STAGE_LABEL = {
  'First Stage': 'stageGroupStage',
  'Round of 32': 'stageR32',
  'Round of 16': 'stageR16',
  'Quarter-final': 'stageQF',
  'Semi-final': 'stageSF',
  'Play-off for third place': 'stage3rd',
  'Final': 'stageFinal',
};

// chip data-stage value → IdStage (language-independent)
const STAGE_ID = {
  'First Stage': '289273',
  'Round of 32': '289287',
  'Round of 16': '289288',
  'Quarter-final': '289289',
  'Semi-final': '289290',
  'Final': '289292',
};

// MatchStatus: 0 = finished, 1 = upcoming, 3 = live (confirmed from API inspection)
const STATUS_FINISHED = 0;
const STATUS_LIVE = 3;

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

let liveDetailPoller = null;

function stopLiveDetailPoller() {
  if (liveDetailPoller) { clearInterval(liveDetailPoller); liveDetailPoller = null; }
}

function toggleCard(card, match) {
  const isOpen = card.classList.contains('match-card--open');

  if (activeCard && activeCard !== card) {
    activeCard.classList.remove('match-card--open');
    activeCard.querySelector('.match-detail')?.remove();
    stopLiveDetailPoller();
  }

  if (isOpen) {
    card.classList.remove('match-card--open');
    card.querySelector('.match-detail')?.remove();
    stopLiveDetailPoller();
    activeCard = null;
    return;
  }

  card.classList.add('match-card--open');
  activeCard = card;

  const isFinished = match.MatchStatus === STATUS_FINISHED;
  const isLive = match.MatchStatus === STATUS_LIVE;
  const detail = document.createElement('div');
  detail.className = 'match-detail';

  if (!isFinished && !isLive) {
    detail.innerHTML = `<p class="detail-empty">${t('detailNoDetails')}</p>`;
    card.appendChild(detail);
    return;
  }

  detail.innerHTML = `<div class="detail-loading"><div class="loading-spinner"></div></div>`;
  card.appendChild(detail);

  if (isLive) {
    loadLiveDetail(match, detail, card);
  } else {
    loadTimeline(match, detail);
  }
}

function buildChannelsRow(matchId) {
  const channels = israelChannels[matchId] || [];
  const kanBox = `<span class="channel-chip channel-chip--kanbox">Kan Box 📱</span>`;
  const rest = channels.map(c => `<span class="channel-chip">${c.Name}</span>`).join('');
  return `<div class="match-channels">📺 ${kanBox}${rest}</div>`;
}

function buildMatchCard(match) {
  const isFinished = match.MatchStatus === STATUS_FINISHED;
  const isLive = match.MatchStatus === STATUS_LIVE;
  const homeName = teamSpan(getTeamName(match.Home) || match.PlaceHolderA || 'TBD', match.Home?.IdTeam);
  const awayName = teamSpan(getTeamName(match.Away) || match.PlaceHolderB || 'TBD', match.Away?.IdTeam);
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
  card.className = 'match-card' + (isFinished ? ' match-card--finished' : '') + (isLive ? ' match-card--live' : '');
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
  } else if (isLive) {
    const homeScore = match.HomeTeamScore ?? 0;
    const awayScore = match.AwayTeamScore ?? 0;
    const clock = match.MatchTime || '';
    card.innerHTML = `
      <div class="match-teams">
        <div class="team">
          <span class="flag">${homeFlag}</span>
          <span class="team-name">${homeName}</span>
        </div>
        <div class="match-center">
          <span class="match-score match-score--live" data-match-id="${match.IdMatch}">${homeScore} – ${awayScore}</span>
          <span class="match-clock" data-match-id="${match.IdMatch}">${clock}</span>
        </div>
        <div class="team team--right">
          <span class="flag">${awayFlag}</span>
          <span class="team-name">${awayName}</span>
        </div>
      </div>
      <div class="match-meta">
        <span class="match-venue">${venueStr}</span>
        <span class="match-status match-status--live">${t('liveBadge')}</span>
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
  bindTeamLinks(card);
  return card;
}

// ── Timeline fetch + parse ─────────────────────────────────────
const TIMELINE_API = 'https://api.fifa.com/api/v3/timelines/17/285023/{stage}/{match}?language=en-GB';
const timelineCache = new Map();

async function loadTimeline(match, detail) {
  const cacheKey = match.IdMatch;

  // Fetch timeline, FIFA lineup, ESPN lineup, and ESPN scoreboard details in parallel
  const [events, lineup, espnLineup, espnLive] = await Promise.all([
    fetchTimeline(match, detail),
    fetchLineup(match),
    fetchEspnLineup(match),
    fetchEspnLiveStats(match),
  ]);

  if (events === null) return; // fetchTimeline already rendered the error
  renderTimeline(match, events, lineup, espnLineup, espnLive, detail);
}

// ── Live detail (Phase 11b) ────────────────────────────────────
async function loadLiveDetail(match, detail, card) {
  // Initial load — fetch everything fresh in parallel
  const [events, fifaLineup, espnLineup, espnLive] = await Promise.all([
    fetchTimeline(match, null, true),
    fetchLineup(match, true),
    fetchEspnLineup(match),
    fetchEspnLiveStats(match),
  ]);

  if (!card.classList.contains('match-card--open')) return; // card closed while fetching

  renderLiveDetail(match, events || [], fifaLineup, espnLineup, espnLive, detail);

  // Poll every 10s
  stopLiveDetailPoller();
  liveDetailPoller = setInterval(async () => {
    if (!card.classList.contains('match-card--open')) { stopLiveDetailPoller(); return; }
    if (match.MatchStatus !== STATUS_LIVE) { stopLiveDetailPoller(); return; }

    const [freshEvents, freshFifaLineup, freshEspnLineup, freshEspnLive] = await Promise.all([
      fetchTimeline(match, null, true),
      fetchLineup(match, true),
      fetchEspnLineup(match),
      fetchEspnLiveStats(match),
    ]);

    if (!card.classList.contains('match-card--open')) return;
    patchLiveDetail(match, freshEvents || [], freshFifaLineup, freshEspnLineup, freshEspnLive, detail);
  }, LIVE_POLL_MS);
}

// Fetch ESPN live stats for one match (scoreboard gives us possession/shots live)
async function fetchEspnLiveStats(match) {
  const espnId = fifaToEspn.get(match.IdMatch);
  if (!espnId) return null;
  try {
    const res = await fetch(ESPN_INDEX_API);
    if (!res.ok) return null;
    const data = await res.json();
    const ev = (data.events || []).find(e => e.id === espnId);
    if (!ev) return null;
    const comp = ev.competitions?.[0];
    const boxTeams = comp?.competitors || [];
    // Build stat map from scoreboard competition statistics
    const home = boxTeams.find(c => c.homeAway === 'home');
    const away = boxTeams.find(c => c.homeAway === 'away');
    const parseCompStats = (competitor) => {
      const map = {};
      for (const s of (competitor?.statistics || [])) map[s.name] = s.displayValue;
      return map;
    };
    return {
      homeStats: parseCompStats(home),
      awayStats: parseCompStats(away),
      homeLeaders: [],
      awayLeaders: [],
      clock: comp?.status?.displayClock || '',
      period: comp?.status?.type?.detail || '',
      homeScore: home?.score ?? '0',
      awayScore: away?.score ?? '0',
      details: comp?.details || [],
      homeTeamId: home?.team?.id || '',
      awayTeamId: away?.team?.id || '',
    };
  } catch { return null; }
}

// Convert ESPN scoreboard details to the same event format as parseTimeline output
function espnDetailsToEvents(espnLive) {
  if (!espnLive?.details?.length) return { goals: [], yellowCards: [], redCards: [], subs: [] };
  const goals = [], yellowCards = [], redCards = [];
  for (const d of espnLive.details) {
    const player = d.athletesInvolved?.[0]?.displayName || '';
    const minute = d.clock?.displayValue || '';
    const teamId = d.team?.id || d.athletesInvolved?.[0]?.team?.id || '';
    const side = teamId === espnLive.homeTeamId ? 'home' : teamId === espnLive.awayTeamId ? 'away' : null;

    if (d.scoringPlay && !d.ownGoal) {
      goals.push({ minute, scorer: player, assist: null, side, ownGoal: false, penalty: !!d.penaltyKick });
    } else if (d.ownGoal) {
      // ESPN's team field for OGs = the benefiting team (team that gets the goal)
      goals.push({ minute, scorer: player, assist: null, side, ownGoal: true });
    } else if (d.yellowCard && !d.redCard) {
      yellowCards.push({ minute, player, side });
    } else if (d.redCard) {
      redCards.push({ minute, player, side });
    }
  }
  return { goals, yellowCards, redCards, subs: [] };
}

function renderLiveDetail(match, events, fifaLineup, espnLineup, espnLive, detail) {
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

  const homeId = match.Home?.IdTeam;
  const awayId = match.Away?.IdTeam;
  let goals, yellowCards, redCards, subs;
  const fifaParsed = parseTimeline(events, homeId, awayId);
  subs = fifaParsed.subs;

  if (espnLive?.details?.length) {
    const espnEvents = espnDetailsToEvents(espnLive);
    goals = espnEvents.goals;
    yellowCards = espnEvents.yellowCards;
    redCards = espnEvents.redCards;
  } else {
    goals = fifaParsed.goals;
    yellowCards = fifaParsed.yellowCards;
    redCards = fifaParsed.redCards;
  }

  let html = '';
  html += buildLiveStatsBar(match, espnLive);
  html += buildEventSections(goals, yellowCards, redCards, subs, homeFlag, awayFlag, events.length);

  detail.innerHTML = html;
  bindPlayerLinks(detail, allMatches);

  // Lineup pitch: prefer ESPN lineup (has posAbbr/formationPlace), fall back to FIFA
  if (espnLineup || fifaLineup) {
    detail.appendChild(renderLineup(match, espnLineup, fifaLineup));
  }
}

function buildLiveStatsBar(match, espnLive) {
  if (!espnLive?.homeStats || !espnLive?.awayStats) return '';
  const isRtl = currentLang === 'he' || currentLang === 'ar';
  const leftStats = isRtl ? espnLive.awayStats : espnLive.homeStats;
  const rightStats = isRtl ? espnLive.homeStats : espnLive.awayStats;

  const LIVE_STAT_KEYS = ['possessionPct', 'totalShots', 'shotsOnTarget', 'foulsCommitted', 'wonCorners', 'offsides', 'saves', 'yellowCards', 'redCards'];
  const LIVE_STAT_LABEL = {
    possessionPct: () => t('teamPossession'), totalShots: () => t('statShots'),
    shotsOnTarget: () => t('statOnTarget'), foulsCommitted: () => t('statFouls'),
    wonCorners: () => t('mstatCorners'), offsides: () => t('statOffsides'),
    saves: () => t('statSaves'), yellowCards: () => t('teamYellow'),
    redCards: () => t('teamRed'),
  };

  const rows = LIVE_STAT_KEYS
    .filter(k => leftStats[k] != null && rightStats[k] != null)
    .map(k => {
      const hNum = parseFloat(leftStats[k]) || 0;
      const aNum = parseFloat(rightStats[k]) || 0;
      const total = hNum + aNum;
      const hPct = total > 0 ? Math.round((hNum / total) * 100) : 50;
      const label = LIVE_STAT_LABEL[k] ? LIVE_STAT_LABEL[k]() : k;
      const hDisplay = k === 'possessionPct' ? parseFloat(leftStats[k]).toFixed(1) + '%' : leftStats[k];
      const aDisplay = k === 'possessionPct' ? parseFloat(rightStats[k]).toFixed(1) + '%' : rightStats[k];
      return `
        <div class="mstat-row">
          <span class="mstat-val mstat-val--home">${hDisplay}</span>
          <div class="mstat-center">
            <div class="mstat-label">${label}</div>
            <div class="mstat-bar">
              <div class="mstat-bar-home" style="width:${hPct}%"></div>
              <div class="mstat-bar-away" style="width:${100 - hPct}%"></div>
            </div>
          </div>
          <span class="mstat-val mstat-val--away">${aDisplay}</span>
        </div>`;
    }).join('');

  if (!rows) return '';
  return `<div class="detail-section live-stats-bar" data-live-stats>
    <div class="detail-section-title">${t('matchStatsTitle')}</div>
    ${rows}
  </div>`;
}

function buildEventSections(goals, yellowCards, redCards, subs, homeFlag, awayFlag, totalEvents) {
  const sections = [];

  if (goals.length) {
    const rows = goals.map(g => {
      const assist = g.assist ? `<span class="detail-assist">↳ ${playerSpan(g.assist)}</span>` : '';
      const og = g.ownGoal ? ` <span class="detail-og">${t('liveOG')}</span>` : '';
      const pen = g.penalty ? ` <span class="detail-pen">(pen)</span>` : '';
      const cell = `${g.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">⚽ ${playerSpan(g.scorer)}${pen}${og}${assist}</span>`;
      return eventRow(g.minute, g.side === 'home' ? cell : null, g.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailGoals')}</div>${rows}</div>`);
  }
  if (yellowCards.length) {
    const rows = yellowCards.map(c => {
      const cell = `${c.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">🟨 ${playerSpan(c.player)}</span>`;
      return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailYellow')}</div>${rows}</div>`);
  }
  if (redCards.length) {
    const rows = redCards.map(c => {
      const cell = `${c.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">🟥 ${playerSpan(c.player)}</span>`;
      return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailRed')}</div>${rows}</div>`);
  }
  if (subs.length) {
    const rows = subs.map(s => {
      const cell = `${s.side === 'home' ? homeFlag : awayFlag} <span class="detail-name">↑ ${playerSpan(s.playerIn)}</span><span class="detail-sub-out">↓ ${playerSpan(s.playerOut)}</span>`;
      return eventRow(s.minute, s.side === 'home' ? cell : null, s.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailSubs')}</div>${rows}</div>`);
  }

  if (!sections.length) {
    return `<p class="detail-empty" data-live-empty>${t('detailNoEvents')}</p>`;
  }
  return `<div data-live-events>${sections.join('')}</div>`;
}

function patchLiveDetail(match, events, fifaLineup, espnLineup, espnLive, detail) {
  const homeId = match.Home?.IdTeam;
  const awayId = match.Away?.IdTeam;
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

  // Patch live stats bar
  const statsEl = detail.querySelector('[data-live-stats]');
  const newStatsHTML = buildLiveStatsBar(match, espnLive);
  if (statsEl && newStatsHTML) {
    statsEl.outerHTML = newStatsHTML;
  }

  // Patch events
  const eventsEl = detail.querySelector('[data-live-events]');
  const emptyEl = detail.querySelector('[data-live-empty]');
  let goals, yellowCards, redCards, subs;
  const fifaParsed = parseTimeline(events, homeId, awayId);
  subs = fifaParsed.subs;

  if (espnLive?.details?.length) {
    const espnEvents = espnDetailsToEvents(espnLive);
    goals = espnEvents.goals;
    yellowCards = espnEvents.yellowCards;
    redCards = espnEvents.redCards;
  } else {
    goals = fifaParsed.goals;
    yellowCards = fifaParsed.yellowCards;
    redCards = fifaParsed.redCards;
  }

  const newEventsHTML = buildEventSections(goals, yellowCards, redCards, subs, homeFlag, awayFlag, events.length);
  if (eventsEl) {
    eventsEl.outerHTML = newEventsHTML;
  } else if (emptyEl) {
    emptyEl.outerHTML = newEventsHTML;
  }
  bindPlayerLinks(detail, allMatches);

  // Patch lineup (field status changes every sub)
  const lineupSection = detail.querySelector('.lineup-section');
  if (lineupSection && (espnLineup || fifaLineup)) {
    const fresh = renderLineup(match, espnLineup, fifaLineup);
    lineupSection.replaceWith(fresh);
  }
}

async function fetchTimeline(match, detail, bypassCache = false) {
  const cacheKey = match.IdMatch;
  if (!bypassCache && timelineCache.has(cacheKey)) return timelineCache.get(cacheKey);
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
    if (detail) detail.innerHTML = `<p class="detail-empty">${t('detailLoadError')}</p>`;
    return null;
  }
}

// ── Lineup fetch + parse ───────────────────────────────────────
const LINEUP_API = 'https://api.fifa.com/api/v3/live/football/17/285023/{stage}/{match}?language=en-GB';
const lineupCache = new Map(); // IdMatch → { home, away }

function parseLineupTeam(teamData) {
  if (!teamData) return null;
  const players = teamData.Players || [];
  const toPlayer = p => ({
    id: p.IdPlayer,
    name: p.PlayerName?.[0]?.Description || '',
    shirt: p.ShirtNumber,
    position: p.Position, // 0=GK 1=DEF 2=MID 3=FWD
    status: p.Status,   // 1=starter 2=sub
    fieldStatus: p.FieldStatus, // 0=on pitch 1=subbed off 2=subbed on
  });
  const coach = teamData.Coaches?.[0]?.Name?.[0]?.Description || null;
  return {
    formation: teamData.Tactics || null,
    coach,
    starters: players.filter(p => p.Status === 1).map(toPlayer),
    subs: players.filter(p => p.Status === 2).map(toPlayer),
  };
}

async function fetchLineup(match, bypassCache = false) {
  const cacheKey = match.IdMatch;
  if (!bypassCache && lineupCache.has(cacheKey)) return lineupCache.get(cacheKey);
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
const ESPN_SUMMARY_API = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={espnId}';
const espnLineupCache = new Map(); // IdMatch → { home, away } | null

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
  ['CB', 'CD', 'CD-L', 'CD-R', 'LB', 'RB', 'LWB', 'RWB', 'SW', 'D'].forEach(p => posMap[p] = 1);
  ['CM', 'CM-L', 'CM-R', 'DM', 'AM', 'LM', 'RM', 'CAM', 'CDM', 'MF', 'M'].forEach(p => posMap[p] = 2);
  ['CF', 'CF-L', 'CF-R', 'LW', 'RW', 'SS', 'FW', 'F', 'ST'].forEach(p => posMap[p] = 3);

  const toPlayer = p => {
    const statsArr = p.stats || [];
    const statsMap = {};
    for (const s of statsArr) statsMap[s.name] = s.value ?? 0;
    return {
      name: p.athlete?.displayName || '',
      shirt: p.jersey || '',
      posAbbr: p.position?.abbreviation || '',
      position: posMap[p.position?.abbreviation] ?? 2,
      formationPlace: p.formationPlace ?? null,
      subbedOut: p.subbedOut || false,
      subbedIn: p.subbedIn || false,
      stats: statsMap,
    };
  };

  return {
    formation: roster.formation || null,
    coach: null, // ESPN doesn't expose coach in this endpoint
    starters: players.filter(p => p.starter).sort((a, b) => (a.formationPlace ?? 99) - (b.formationPlace ?? 99)).map(toPlayer),
    subs: players.filter(p => !p.starter).map(toPlayer),
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
    const homeBoxTeam = boxTeams.find(bt => bt.homeAway === 'home');
    const awayBoxTeam = boxTeams.find(bt => bt.homeAway === 'away');
    const parseStats = (boxTeam) => {
      if (!boxTeam) return null;
      const map = {};
      for (const s of (boxTeam.statistics || [])) map[s.name] = s.displayValue;
      return map;
    };

    // Parse per-team leaders — top-level key, NOT nested under boxscore
    const boxLeaders = data.leaders || [];
    const parseLeaders = (homeAway) => {
      const entry = boxLeaders.find(l => {
        const boxTeam = boxTeams.find(bt => bt.homeAway === homeAway);
        return l.team?.id === boxTeam?.team?.id;
      });
      if (!entry) return [];
      return (entry.leaders || []).map(cat => ({
        statName: cat.name,
        statDisplay: cat.displayName,
        player: cat.leaders?.[0]?.athlete?.shortName || null,
        value: cat.leaders?.[0]?.displayValue || null,
      })).filter(c => c.player && c.value);
    };

    const result = {
      home: parseEspnRoster(homeRoster),
      away: parseEspnRoster(awayRoster),
      homeStats: parseStats(homeBoxTeam),
      awayStats: parseStats(awayBoxTeam),
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
      // Regular goal — IdTeam is the scoring team
      const m = desc.match(/^(.+?) \(.*?\) (?:scores|converts)/) || desc.match(/^(.+?) (?:scores|converts)/);
      const penalty = /converts the penalty/i.test(desc) || /converts/i.test(desc);
      goals.push({ minute, scorer: m ? m[1] : desc, assist: assistMap[ev.EventId] || null, side, ownGoal: false, penalty });
    } else if (ev.Type === 34) {
      // Own goal — IdTeam is the team that CONCEDED (the player's own team)
      // so the goal is credited to the OPPOSITE side
      const ownSide = side === 'home' ? 'away' : side === 'away' ? 'home' : null;
      const m = desc.match(/^(.+?) \(.*?\) (?:scores|converts)/) || desc.match(/^(.+?) (?:scores|converts)/);
      goals.push({ minute, scorer: m ? m[1] : desc, assist: null, side: ownSide, ownGoal: true });
    } else if (ev.Type === 2) {
      const m = desc.match(/^(.+?) \(/);
      yellowCards.push({ minute, player: m ? m[1] : desc, side });
    } else if (ev.Type === 3) {
      const m = desc.match(/^(.+?) \(/);
      redCards.push({ minute, player: m ? m[1] : desc, side });
    } else if (ev.Type === 5) {
      const m = desc.match(/^(.+?) \(in\) comes off the bench to replace (.+?) \(out\)/);
      if (m) {
        const playerIn = m[1].replace(/^.*begins\s+/i, '');
        const subMinute = minute || (desc.includes('Before the second half') ? 'HT' : '');
        subs.push({ minute: subMinute, playerIn, playerOut: m[2], side });
      }
    }
  }

  return { goals, yellowCards, redCards, subs };
}

function eventRow(minute, homeContent, awayContent) {
  // In RTL the teams are visually swapped: home is on the right, away on the left.
  // Mirror the columns so events always appear under the correct team.
  const isRtl = currentLang === 'he' || currentLang === 'ar';
  const leftContent = isRtl ? awayContent : homeContent;
  const rightContent = isRtl ? homeContent : awayContent;
  const left = leftContent
    ? `<div class="detail-cell-home">${leftContent}</div>`
    : `<div class="detail-cell-empty"></div>`;
  const right = rightContent
    ? `<div class="detail-cell-away">${rightContent}</div>`
    : `<div class="detail-cell-empty"></div>`;
  return `<div class="detail-row">${left}<span class="detail-minute">${minute}</span>${right}</div>`;
}

function renderTimeline(match, events, lineup, espnLineup, espnLive, detail) {
  const homeId = match.Home?.IdTeam;
  const awayId = match.Away?.IdTeam;
  const attendance = match.Attendance
    ? `<div class="detail-attendance">${t('detailAttendance', Number(match.Attendance).toLocaleString())}</div>`
    : '';
  const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
  const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

  // ESPN is the primary source for goals, cards; FIFA is used only for subs
  let goals, yellowCards, redCards, subs;
  const fifaParsed = parseTimeline(events, homeId, awayId);
  subs = fifaParsed.subs;

  if (espnLive?.details?.length) {
    const espnEvents = espnDetailsToEvents(espnLive);
    goals = espnEvents.goals;
    yellowCards = espnEvents.yellowCards;
    redCards = espnEvents.redCards;
  } else {
    // ESPN unavailable — fall back to FIFA timeline
    goals = fifaParsed.goals;
    yellowCards = fifaParsed.yellowCards;
    redCards = fifaParsed.redCards;
  }

  const sections = [];

  if (goals.length) {
    const rows = goals.map(g => {
      const assist = g.assist ? `<span class="detail-assist">↳ ${playerSpan(g.assist)}</span>` : '';
      const og = g.ownGoal ? ` <span class="detail-og">${t('liveOG')}</span>` : '';
      const pen = g.penalty ? ` <span class="detail-pen">(pen)</span>` : '';
      const content = `<span class="detail-name">⚽ ${playerSpan(g.scorer)}${pen}${og}${assist}</span>`;
      const flag = g.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(g.minute, g.side === 'home' ? cell : null, g.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailGoals')}</div>${rows}</div>`);
  }

  if (yellowCards.length) {
    const rows = yellowCards.map(c => {
      const content = `<span class="detail-name">🟨 ${playerSpan(c.player)}</span>`;
      const flag = c.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailYellow')}</div>${rows}</div>`);
  }

  if (redCards.length) {
    const rows = redCards.map(c => {
      const content = `<span class="detail-name">🟥 ${playerSpan(c.player)}</span>`;
      const flag = c.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailRed')}</div>${rows}</div>`);
  }

  if (subs.length) {
    const rows = subs.map(s => {
      const content = `<span class="detail-name">↑ ${playerSpan(s.playerIn)}</span><span class="detail-sub-out">↓ ${playerSpan(s.playerOut)}</span>`;
      const flag = s.side === 'home' ? homeFlag : awayFlag;
      const cell = `${flag} ${content}`;
      return eventRow(s.minute, s.side === 'home' ? cell : null, s.side === 'away' ? cell : null);
    }).join('');
    sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailSubs')}</div>${rows}</div>`);
  }

  detail.innerHTML = attendance + (sections.length
    ? sections.join('')
    : `<p class="detail-empty">${t('detailNoEvents')}</p>`);

  bindPlayerLinks(detail, allMatches);

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
  const leftStats = isRtl ? espnLineup.awayStats : espnLineup.homeStats;
  const rightStats = isRtl ? espnLineup.homeStats : espnLineup.awayStats;
  const leftLeaders = isRtl ? espnLineup.awayLeaders : espnLineup.homeLeaders;
  const rightLeaders = isRtl ? espnLineup.homeLeaders : espnLineup.awayLeaders;
  const leftTeam = isRtl ? match.Away : match.Home;
  const rightTeam = isRtl ? match.Home : match.Away;

  const homeName = getTeamName(leftTeam) || '';
  const awayName = getTeamName(rightTeam) || '';
  const homeFlag = leftTeam ? countryToFlag(leftTeam.IdCountry) : '';
  const awayFlag = rightTeam ? countryToFlag(rightTeam.IdCountry) : '';

  // Alias back to generic names for the rest of the function
  const homeStats = leftStats;
  const awayStats = rightStats;
  const homeLeaders = leftLeaders;
  const awayLeaders = rightLeaders;

  const STAT_LABEL = {
    possessionPct: () => t('teamPossession'),
    totalShots: () => t('statShots'),
    shotsOnTarget: () => t('statOnTarget'),
    totalPasses: () => t('mstatPasses'),
    passPct: () => t('teamPassAcc'),
    accurateCrosses: () => t('mstatAccCrosses'),
    totalLongBalls: () => t('mstatLongBalls'),
    effectiveTackles: () => t('teamTackles'),
    interceptions: () => t('teamInterceptions'),
    effectiveClearance: () => t('mstatClearances'),
    foulsCommitted: () => t('statFouls'),
    wonCorners: () => t('mstatCorners'),
    offsides: () => t('statOffsides'),
    saves: () => t('statSaves'),
    yellowCards: () => t('teamYellow'),
    redCards: () => t('teamRed'),
  };

  // Build stat bars — only include rows where both teams have a value
  const rows = MATCH_STAT_KEYS
    .filter(key => homeStats[key] != null && awayStats[key] != null)
    .map(key => {
      const hRaw = homeStats[key];
      const aRaw = awayStats[key];
      const label = STAT_LABEL[key] ? STAT_LABEL[key]() : key;

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
        if (['passPct', 'shotPct', 'crossPct', 'longballPct', 'tacklePct'].includes(key)) {
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
    <div class="detail-section-title">${t('matchStatsTitle')}</div>
    <div class="mstat-header">
      <span class="mstat-team-label">${homeFlag} ${homeName}</span>
      <span></span>
      <span class="mstat-team-label mstat-team-label--away">${awayFlag} ${awayName}</span>
    </div>
    ${rows}
    ${leaderRows ? `
      <div class="mstat-leaders-title">${t('topPerformersTitle')}</div>
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
    case 'LB': case 'LWB': case 'LW': case 'LM': return 0; // far left
    case 'CD-L': case 'CB-L': return 1; // left-centre
    case 'G': case 'GK': case 'CD': case 'CB':
    case 'DM': case 'CDM': case 'CM': case 'CAM':
    case 'F': case 'ST': case 'CF': case 'SS': return 2; // centre
    case 'CD-R': case 'CB-R': return 3; // right-centre
    case 'RB': case 'RWB': case 'RW': case 'RM': return 4; // far right
    default: return 2; // unknown → centre, let fp order decide
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
  const formation = teamData.formation || '';

  // Group players by position bucket — this is always correct
  const gk = teamData.starters.filter(p => p.position === 0);
  const defs = teamData.starters.filter(p => p.position === 1);
  const mids = teamData.starters.filter(p => p.position === 2);
  const fwds = teamData.starters.filter(p => p.position === 3);

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
    const chips = players.map(p => {
      // fieldStatus: 0=on pitch, 1=subbed off, 2=subbed on (FIFA live endpoint only)
      const fsClass = p.fieldStatus === 1 ? ' pitch-player--off'
        : p.fieldStatus === 2 ? ' pitch-player--on'
          : '';
      return `
      <div class="pitch-player${fsClass}">
        <div class="pitch-shirt ${shirtClass}">${p.shirt}</div>
        <div class="pitch-name">${shortName(p.name)}${p.fieldStatus === 2 ? ' ↑' : p.fieldStatus === 1 ? ' ↓' : ''}</div>
      </div>`;
    }).join('');
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

function mergeFieldStatus(espn, fifa) {
  // ESPN has better positional data; FIFA has fieldStatus (live sub tracking).
  // Merge fieldStatus from FIFA players into ESPN players by shirt number.
  if (!espn || !fifa) return espn || fifa;
  const merge = (espnTeam, fifaTeam) => {
    if (!espnTeam || !fifaTeam) return espnTeam || fifaTeam;
    const fifaByShirt = new Map();
    for (const p of [...(fifaTeam.starters || []), ...(fifaTeam.subs || [])]) {
      if (p.shirt != null) fifaByShirt.set(String(p.shirt), p.fieldStatus);
    }
    const applyFs = (players) => players.map(p => ({
      ...p,
      fieldStatus: fifaByShirt.get(String(p.shirt)) ?? p.fieldStatus,
    }));
    return { ...espnTeam, starters: applyFs(espnTeam.starters), subs: applyFs(espnTeam.subs) };
  };
  return {
    ...espn,
    home: merge(espn.home, fifa.home),
    away: merge(espn.away, fifa.away),
  };
}

function renderLineup(match, espnLineup, fifaLineup) {
  // Merge ESPN positional data with FIFA fieldStatus for live matches
  const lineup = espnLineup && fifaLineup
    ? mergeFieldStatus(espnLineup, fifaLineup)
    : espnLineup || fifaLineup;
  if (!lineup) return document.createDocumentFragment();

  const isRtl = currentLang === 'he' || currentLang === 'ar';
  // In RTL the home team displays on the right — keep pitch columns consistent with match card
  const leftTeam = isRtl ? lineup.away : lineup.home;
  const rightTeam = isRtl ? lineup.home : lineup.away;
  const leftIsAway = isRtl; // left column is away team in RTL
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
      const hasKan11 = sources.some(s => s.Name === 'KAN 11');
      const hasMakan33 = sources.some(s => s.Name === 'MAKAN 33');
      israelChannels[m.IdMatch] = sources.filter(s => {
        if (s.Name === 'KAN' && hasKan11) return false;
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
  'czechia': 'czechrepublic',
  'türkiye': 'turkey',
  'ivorycoast': 'cotedivoire',
  'unitedstates': 'usa',
  'korearepublic': 'southkorea',
  'bosniaandherzegovina': 'bosniaherzegovina',
  'iriran': 'iran',
  'caboverde': 'capeverde',
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
      const key = `${date}_${[home, away].sort().join('_')}`;
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
    maybeStartPoller();
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
  document.querySelector('.tab[data-tab="matches"]').textContent = t('tabMatches');
  document.querySelector('.tab[data-tab="standings"]').textContent = t('tabStandings');
  document.querySelector('.tab[data-tab="bracket"]').textContent = t('tabBracket');
  document.querySelector('.tab[data-tab="stats"]').textContent = t('tabStats');
  // Filter chips
  document.querySelector('.chip[data-stage="all"]').textContent = t('chipAll');
  document.querySelector('.chip[data-stage="First Stage"]').textContent = t('chipGroups');
  document.querySelector('.chip[data-stage="Round of 32"]').textContent = t('chipR32');
  document.querySelector('.chip[data-stage="Round of 16"]').textContent = t('chipR16');
  document.querySelector('.chip[data-stage="Quarter-final"]').textContent = t('chipQF');
  document.querySelector('.chip[data-stage="Semi-final"]').textContent = t('chipSF');
  document.querySelector('.chip[data-stage="Final"]').textContent = t('chipFinal');
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
  espnStatsCache = null; // team names change per language — rebuild on next stats open
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
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      activeTab = tab.dataset.tab;
      showMatchesUI(activeTab === 'matches');
      // Stop tab-specific pollers when switching away
      if (activeTab !== 'standings') stopLiveStandingsPoller();
      // Scroll to top when switching tabs; matches tab will auto-scroll to today
      window.scrollTo({ top: 0, behavior: 'instant' });
      renderActiveTab();
      // Resume poller when returning to Matches tab; it self-stops when nothing is live
      if (activeTab === 'matches' && hasLiveMatches()) startLivePoller();
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
  if (activeTab === 'matches') renderMatches(activeMatches(), true);
  else if (activeTab === 'standings') renderStandings(activeMatches());
  else if (activeTab === 'bracket') renderBracket(allMatches);
  else if (activeTab === 'stats') renderStats(activeMatches());
}

// ── ESPN stats aggregation ─────────────────────────────────────
// espnStatsCache: null = not built yet, object = ready
let espnStatsCache = null;
// ESPN match details cache: IdMatch → { details[], homeTeamId, awayTeamId }
const espnMatchDetailsCache = new Map();

async function buildEspnStatsCache(matches) {
  if (espnStatsCache) return espnStatsCache;

  const finishedMatches = matches.filter(m => m.MatchStatus === STATUS_FINISHED && fifaToEspn.has(m.IdMatch));

  // Fetch all ESPN summaries in parallel (uses espnLineupCache when already fetched)
  await Promise.allSettled(finishedMatches.map(m => fetchEspnLineup(m)));

  // Fetch ESPN scoreboard once for match details (goals/cards per match)
  try {
    const res = await fetch(ESPN_INDEX_API);
    if (res.ok) {
      const data = await res.json();
      for (const ev of (data.events || [])) {
        // Find the FIFA match ID for this ESPN event
        let fifaId = null;
        for (const [fId, eId] of fifaToEspn.entries()) {
          if (eId === ev.id) { fifaId = fId; break; }
        }
        if (!fifaId) continue;
        const comp = ev.competitions?.[0];
        if (!comp?.details?.length) continue;
        const home = (comp.competitors || []).find(c => c.homeAway === 'home');
        const away = (comp.competitors || []).find(c => c.homeAway === 'away');
        espnMatchDetailsCache.set(fifaId, {
          details: comp.details,
          homeTeamId: home?.team?.id || '',
          awayTeamId: away?.team?.id || '',
        });
      }
    }
  } catch { /* scoreboard unavailable — profiles won't have per-match events */ }

  // playerMap: espnAthleteId → { name, flag, teamName, goals, assists, shots, shotsOnTarget, saves, yellowCards, redCards, fouls, offsides, appearances }
  const playerMap = new Map();
  // teamMap: fifaTeamId → { name, flag, played, espnStats: { statName → total } }
  const teamMap = new Map();

  for (const match of finishedMatches) {
    const espnData = espnLineupCache.get(match.IdMatch);
    if (!espnData) continue;

    // Accumulate team stats from boxscore
    for (const side of ['home', 'away']) {
      const fifaTeam = side === 'home' ? match.Home : match.Away;
      const espnStats = side === 'home' ? espnData.homeStats : espnData.awayStats;
      if (!fifaTeam || !espnStats) continue;
      const id = fifaTeam.IdTeam;
      if (!teamMap.has(id)) {
        teamMap.set(id, {
          name: getTeamName(fifaTeam) || '?',
          flag: countryToFlag(fifaTeam.IdCountry),
          played: 0,
          espnStats: {},
        });
      }
      const entry = teamMap.get(id);
      entry.played++;
      for (const [k, v] of Object.entries(espnStats)) {
        const num = parseFloat(v) || 0;
        entry.espnStats[k] = (entry.espnStats[k] || 0) + num;
      }
    }

    // Accumulate player stats from rosters
    const rosters = espnData.home ? [
      { roster: espnData.home, fifaTeam: match.Home },
      { roster: espnData.away, fifaTeam: match.Away },
    ] : [];

    for (const { roster, fifaTeam } of rosters) {
      const flag = fifaTeam ? countryToFlag(fifaTeam.IdCountry) : '🏳️';
      const teamName = fifaTeam ? (getTeamName(fifaTeam) || '') : '';
      const teamId = fifaTeam?.IdTeam || null;
      for (const p of [...(roster.starters || []), ...(roster.subs || [])]) {
        if (!p.name) continue;
        const key = `${p.name}|${teamName}`;
        const isStarter = (roster.starters || []).includes(p);
        if (!playerMap.has(key)) {
          playerMap.set(key, { name: p.name, flag, teamName, teamId, position: p.position, goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, saves: 0, yellowCards: 0, redCards: 0, fouls: 0, offsides: 0, cleanSheets: 0, appearances: 0 });
        }
        const e = playerMap.get(key);
        if (p.stats) {
          e.appearances += p.stats.appearances || 0;
          e.goals += p.stats.totalGoals || 0;
          e.assists += p.stats.goalAssists || 0;
          e.shots += p.stats.totalShots || 0;
          e.shotsOnTarget += p.stats.shotsOnTarget || 0;
          e.saves += p.stats.saves || 0;
          e.yellowCards += p.stats.yellowCards || 0;
          e.redCards += p.stats.redCards || 0;
          e.fouls += p.stats.foulsCommitted || 0;
          e.offsides += p.stats.offsides || 0;
          // Clean sheet: starter GK who conceded 0 goals
          if (isStarter && p.position === 0 && (p.stats.goalsConceded || 0) === 0) {
            e.cleanSheets++;
          }
        }
      }
    }
  }

  espnStatsCache = { playerMap, teamMap };
  return espnStatsCache;
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

const PLAYER_SUBS = [
  { key: 'scorers', icon: '⚽', label: () => t('statGoals') },
  { key: 'assists', icon: '🎯', label: () => t('statAssists') },
  { key: 'clean', icon: '🧤', label: () => t('statClean') },
  { key: 'shots', icon: '🎯', label: () => t('statShots') },
  { key: 'shotsOnTarget', icon: '🎯', label: () => t('statOnTarget') },
  { key: 'saves', icon: '🧤', label: () => t('statSaves') },
  { key: 'fouls', icon: '🚫', label: () => t('statFouls') },
  { key: 'offsides', icon: '🚩', label: () => t('statOffsides') },
  { key: 'yellow', icon: '🟨', label: () => t('statYellow') },
  { key: 'red', icon: '🟥', label: () => t('statRed') },
];

function renderPlayerStats(matches, container) {
  container.innerHTML = `
    <div class="stats-tabs">
      ${PLAYER_SUBS.map(s => `<button class="stats-tab ${activePlayerSub === s.key ? 'stats-tab--active' : ''}" data-sub="${s.key}">${s.icon} ${s.label()}</button>`).join('')}
    </div>
    <div id="player-stats-content"></div>`;

  container.querySelectorAll('.stats-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activePlayerSub = btn.dataset.sub;
      renderPlayerStats(matches, container);
    });
  });

  const inner = container.querySelector('#player-stats-content');
  if (activePlayerSub === 'scorers') renderScorers(matches, inner);
  else if (activePlayerSub === 'assists') renderAssists(matches, inner);
  else if (activePlayerSub === 'clean') renderCleanSheets(matches, inner);
  else renderEspnPlayerLeaderboard(matches, inner, activePlayerSub);
}

const TEAM_SUBS = [
  { key: 'goals-per-game', icon: '⚽', label: () => t('teamGoalsGame'), espnKey: null, fifa: true },
  { key: 'conceded-per-game', icon: '🥅', label: () => t('teamConcededGame'), espnKey: null, fifa: true },
  { key: 'clean-sheets', icon: '🧤', label: () => t('teamClean'), espnKey: null, fifa: true },
  { key: 'possession', icon: '🔵', label: () => t('teamPossession'), espnKey: 'possessionPct', avg: true },
  { key: 'shots', icon: '🎯', label: () => t('teamShots'), espnKey: 'totalShots', avg: true },
  { key: 'shots-on-target', icon: '🎯', label: () => t('teamOnTarget'), espnKey: 'shotsOnTarget', avg: true },
  { key: 'passes', icon: '📋', label: () => t('teamPasses'), espnKey: 'totalPasses', avg: true },
  { key: 'pass-accuracy', icon: '📋', label: () => t('teamPassAcc'), espnKey: 'passPct', avg: true, pct: true },
  { key: 'tackles', icon: '💪', label: () => t('teamTackles'), espnKey: 'effectiveTackles', avg: true },
  { key: 'interceptions', icon: '✋', label: () => t('teamInterceptions'), espnKey: 'interceptions', avg: true },
  { key: 'yellow-cards', icon: '🟨', label: () => t('teamYellow'), espnKey: 'yellowCards' },
  { key: 'red-cards', icon: '🟥', label: () => t('teamRed'), espnKey: 'redCards' },
];

function renderTeamStats(matches, container) {
  container.innerHTML = `
    <div class="stats-tabs">
      ${TEAM_SUBS.map(s => `<button class="stats-tab ${activeTeamSub === s.key ? 'stats-tab--active' : ''}" data-sub="${s.key}">${s.icon} ${s.label()}</button>`).join('')}
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
  const sub = TEAM_SUBS.find(s => s.key === type);

  // FIFA-computed stats (goals, conceded, clean sheets)
  if (sub?.fifa) {
    const teamMap = new Map();
    const ensure = (team) => {
      if (!team) return null;
      if (!teamMap.has(team.IdTeam)) teamMap.set(team.IdTeam, {
        name: getTeamName(team) || '?', flag: countryToFlag(team.IdCountry),
        played: 0, scored: 0, conceded: 0, cleanSheets: 0,
      });
      return teamMap.get(team.IdTeam);
    };
    for (const m of finishedMatches) {
      const home = ensure(m.Home), away = ensure(m.Away);
      if (!home || !away) continue;
      const hs = m.HomeTeamScore ?? 0, as = m.AwayTeamScore ?? 0;
      home.played++; away.played++;
      home.scored += hs; home.conceded += as;
      away.scored += as; away.conceded += hs;
      if (as === 0) home.cleanSheets++;
      if (hs === 0) away.cleanSheets++;
    }
    const getValue = (t) => type === 'goals-per-game' ? (t.played ? +(t.scored / t.played).toFixed(2) : 0)
      : type === 'conceded-per-game' ? (t.played ? +(t.conceded / t.played).toFixed(2) : 0)
        : t.cleanSheets;
    const label = sub.label();
    const sorted = [...teamMap.values()].filter(tm => tm.played > 0).sort((a, b) => getValue(b) - getValue(a)).slice(0, 20);
    return renderTeamRows(container, sorted, tm => getValue(tm), label);
  }

  // ESPN-computed stats
  const { teamMap } = await buildEspnStatsCache(matches);
  const espnKey = sub?.espnKey;
  if (!espnKey) { container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`; return; }

  const getValue = (team) => {
    const raw = team.espnStats[espnKey] || 0;
    if (sub.pct) return team.played ? +((raw / team.played) * 100).toFixed(1) : 0;
    if (sub.avg) return team.played ? +(raw / team.played).toFixed(2) : 0;
    return raw;
  };
  const fmt = (team) => {
    const v = getValue(team);
    return sub.pct ? v.toFixed(1) + '%' : v;
  };
  const label = sub.label();
  const sorted = [...teamMap.values()].filter(tm => tm.played > 0).sort((a, b) => getValue(b) - getValue(a)).slice(0, 20);
  renderTeamRows(container, sorted, fmt, label);
}

function renderTeamRows(container, sorted, getFmt, label) {
  if (sorted.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`;
    return;
  }
  container.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'scorers-list';
  sorted.forEach((team, i) => {
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
        <div class="scorer-goals">${getFmt(team)}</div>
        <div class="scorer-goals-label">${label}</div>
      </div>`;
    list.appendChild(row);
  });
  container.appendChild(list);
}

// ── Bracket (Phase 12b) ───────────────────────────────────────

// Resolve a PlaceHolder string to a display name using known results
// e.g. "W73" → winner of MatchNumber 73, "1A" → "Group A Winner", "2B" → "Group B Runner-up"
function resolvePlaceholder(ph, allMatches) {
  if (!ph) return t('bracketTBD');

  // "W73" → winner of match number 73
  const winnerMatch = ph.match(/^W(\d+)$/);
  if (winnerMatch) {
    const num = parseInt(winnerMatch[1], 10);
    const src = allMatches.find(m => m.MatchNumber === num);
    if (src && src.MatchStatus === STATUS_FINISHED) {
      const hs = src.HomeTeamScore ?? 0, as = src.AwayTeamScore ?? 0;
      // PSO winner
      if (hs === as) {
        const hp = src.HomeTeamPenaltyScore ?? 0, ap = src.AwayTeamPenaltyScore ?? 0;
        const winner = hp > ap ? src.Home : src.Away;
        return winner ? getTeamName(winner) || ph : ph;
      }
      const winner = hs > as ? src.Home : src.Away;
      return winner ? getTeamName(winner) || ph : ph;
    }
    if (src && src.MatchStatus === STATUS_LIVE) {
      const liveData = espnLiveData.get(src.IdMatch);
      const [hs, as] = liveData
        ? liveData.score.split('–').map(s => parseInt(s.trim(), 10) || 0)
        : [src.HomeTeamScore ?? 0, src.AwayTeamScore ?? 0];
      if (hs !== as) {
        const leader = hs > as ? src.Home : src.Away;
        return leader ? `${getTeamName(leader)} 🟢` : ph;
      }
    }
    // Match not yet played — recursively resolve the slot labels
    if (src) {
      const a = resolvePlaceholder(src.PlaceHolderA, allMatches);
      const b = resolvePlaceholder(src.PlaceHolderB, allMatches);
      return t('bracketWinnerOf', a, b);
    }
    return t('bracketTBD');
  }

  // "1A" → Group A Winner, "2B" → Group B Runner-up, "3ABCDF" → Best 3rd (A/B/C/D/F)
  const groupMatch = ph.match(/^([123])([A-L]+)$/);
  if (groupMatch) {
    const pos = groupMatch[1], groups = groupMatch[2];
    if (pos === '1') return t('bracketGroupWinner', groups);
    if (pos === '2') return t('bracketGroupSecond', groups);
    if (pos === '3') return t('bracketBestThird', groups.split('').join('/'));
  }

  return ph;
}

function resolvePlaceholderFlag(ph, allMatches) {
  const winnerMatch = ph?.match(/^W(\d+)$/);
  if (winnerMatch) {
    const num = parseInt(winnerMatch[1], 10);
    const src = allMatches.find(m => m.MatchNumber === num);
    if (src?.MatchStatus === STATUS_FINISHED) {
      const hs = src.HomeTeamScore ?? 0, as = src.AwayTeamScore ?? 0;
      if (hs === as) {
        const hp = src.HomeTeamPenaltyScore ?? 0, ap = src.AwayTeamPenaltyScore ?? 0;
        const winner = hp > ap ? src.Home : src.Away;
        return winner ? countryToFlag(winner.IdCountry) : '';
      }
      const winner = hs > as ? src.Home : src.Away;
      return winner ? countryToFlag(winner.IdCountry) : '';
    }
  }
  return '';
}

function buildBracketCard(match, allMatches) {
  const isFinished = match.MatchStatus === STATUS_FINISHED;
  const isLive = match.MatchStatus === STATUS_LIVE;

  // Resolve team names + flags
  let homeName, awayName, homeFlag, awayFlag;
  if (match.Home) {
    homeName = getTeamName(match.Home) || resolvePlaceholder(match.PlaceHolderA, allMatches);
    homeFlag = countryToFlag(match.Home.IdCountry);
  } else {
    homeName = resolvePlaceholder(match.PlaceHolderA, allMatches);
    homeFlag = resolvePlaceholderFlag(match.PlaceHolderA, allMatches);
  }
  if (match.Away) {
    awayName = getTeamName(match.Away) || resolvePlaceholder(match.PlaceHolderB, allMatches);
    awayFlag = countryToFlag(match.Away.IdCountry);
  } else {
    awayName = resolvePlaceholder(match.PlaceHolderB, allMatches);
    awayFlag = resolvePlaceholderFlag(match.PlaceHolderB, allMatches);
  }

  const venue = match.Stadium?.Name?.[0]?.Description || '';
  const city = match.Stadium?.CityName?.[0]?.Description || '';
  const venueStr = [venue, city].filter(Boolean).join(' · ');

  const card = document.createElement('article');
  card.className = 'match-card bracket-card' +
    (isFinished ? ' match-card--finished' : '') +
    (isLive ? ' match-card--live' : '');
  card.dataset.matchId = match.IdMatch;

  if (isFinished) {
    const hs = match.HomeTeamScore ?? '';
    const as = match.AwayTeamScore ?? '';
    const pso = (match.HomeTeamPenaltyScore != null && match.AwayTeamPenaltyScore != null)
      ? `<span class="match-pso">(${match.HomeTeamPenaltyScore}–${match.AwayTeamPenaltyScore} ${t('livePSO')})</span>`
      : '';
    // Highlight the winner
    const homeWon = (match.HomeTeamScore > match.AwayTeamScore) ||
      (match.HomeTeamScore === match.AwayTeamScore && match.HomeTeamPenaltyScore > match.AwayTeamPenaltyScore);
    const awayWon = !homeWon;
    card.innerHTML = `
      <div class="match-teams">
        <div class="team${homeWon ? ' bracket-winner' : ''}">
          <span class="flag">${homeFlag}</span>
          <span class="team-name">${homeName}</span>
        </div>
        <div class="match-center">
          <span class="match-score">${hs} – ${as}</span>
          ${pso}
        </div>
        <div class="team team--right${awayWon ? ' bracket-winner' : ''}">
          <span class="flag">${awayFlag}</span>
          <span class="team-name">${awayName}</span>
        </div>
      </div>
      <div class="match-meta">
        <span class="match-venue">${venueStr}</span>
        <span class="match-status match-status--ft">${t('matchFT')}</span>
      </div>`;
  } else if (isLive) {
    const liveData = espnLiveData.get(match.IdMatch);
    const score = liveData?.score || `${match.HomeTeamScore ?? 0} – ${match.AwayTeamScore ?? 0}`;
    const clock = liveData?.clock || match.MatchTime || '';
    card.innerHTML = `
      <div class="match-teams">
        <div class="team">
          <span class="flag">${homeFlag}</span>
          <span class="team-name">${homeName}</span>
        </div>
        <div class="match-center">
          <span class="match-score match-score--live" data-match-id="${match.IdMatch}">${score}</span>
          <span class="match-clock" data-match-id="${match.IdMatch}">${clock}</span>
        </div>
        <div class="team team--right">
          <span class="flag">${awayFlag}</span>
          <span class="team-name">${awayName}</span>
        </div>
      </div>
      <div class="match-meta">
        <span class="match-venue">${venueStr}</span>
        <span class="match-status match-status--live">${t('liveBadge')}</span>
      </div>`;
  } else {
    const kickoff = formatKickoff(match.Date);
    const dateStr = formatDateHeading(match.Date);
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
        <span class="match-group">${dateStr}</span>
      </div>`;
  }

  // Finished and live matches are expandable
  if (isFinished || isLive) {
    card.addEventListener('click', () => toggleCard(card, match));
  }

  return card;
}

let activeBracketTab = 'r32';

function renderBracket(matches) {
  const main = document.querySelector('.main');

  const knockoutMatches = matches.filter(m => m.IdStage !== '289273');
  if (knockoutMatches.length === 0) {
    main.innerHTML = `<div class="error"><div class="error-icon">🏆</div>${t('bracketNotStarted')}</div>`;
    return;
  }

  main.innerHTML = `
    <div class="bracket-tabs">
      <button class="bracket-tab ${activeBracketTab === 'r32' ? 'bracket-tab--active' : ''}" data-btab="r32">${t('stageR32')}</button>
      <button class="bracket-tab ${activeBracketTab === 'tree' ? 'bracket-tab--active' : ''}" data-btab="tree">${t('bracketTabTree')}</button>
    </div>
    <div id="bracket-content"></div>`;

  main.querySelectorAll('.bracket-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeBracketTab = btn.dataset.btab;
      renderBracket(matches);
    });
  });

  const content = main.querySelector('#bracket-content');
  if (activeBracketTab === 'r32') renderBracketR32(matches, content);
  else renderBracketTree(matches, content);
}

// ── Tab 1: R32 list ───────────────────────────────────────────
function renderBracketR32(matches, container) {
  const r32 = matches.filter(m => m.IdStage === '289287').sort((a, b) => a.MatchNumber - b.MatchNumber);
  if (r32.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">📅</div>${t('bracketNotStarted')}</div>`;
    return;
  }
  const wrap = document.createElement('div');
  wrap.className = 'date-group';
  r32.forEach(m => wrap.appendChild(buildBracketCard(m, matches)));
  container.appendChild(wrap);
}

// ── Tab 2: Visual tree R16 → QF → SF → Final ─────────────────
function bracketGameHTML(matchNum, matches) {
  const m = matches.find(x => x.MatchNumber === matchNum);
  if (!m) return `<div class="br-game br-game--empty" data-match="${matchNum}"><div class="br-team"><span class="br-name">${t('bracketTBD')}</span><span class="br-score">–</span></div><div class="br-team"><span class="br-name">${t('bracketTBD')}</span><span class="br-score">–</span></div></div>`;

  const isFinished = m.MatchStatus === STATUS_FINISHED;
  const isLive = m.MatchStatus === STATUS_LIVE;

  let homeName, awayName, homeFlag, awayFlag;
  if (m.Home) {
    homeName = getTeamName(m.Home) || m.PlaceHolderA || t('bracketTBD');
    homeFlag = countryToFlag(m.Home.IdCountry);
  } else {
    homeName = m.PlaceHolderA || t('bracketTBD');
    homeFlag = resolvePlaceholderFlag(m.PlaceHolderA, matches);
  }
  if (m.Away) {
    awayName = getTeamName(m.Away) || m.PlaceHolderB || t('bracketTBD');
    awayFlag = countryToFlag(m.Away.IdCountry);
  } else {
    awayName = m.PlaceHolderB || t('bracketTBD');
    awayFlag = resolvePlaceholderFlag(m.PlaceHolderB, matches);
  }

  let homeScore = '–', awayScore = '–';
  let homeWon = false, awayWon = false;
  let statusClass = 'br-game--upcoming';
  let extraInfo = '';

  if (isFinished) {
    const hs = m.HomeTeamScore ?? 0, as = m.AwayTeamScore ?? 0;
    const hp = m.HomeTeamPenaltyScore ?? -1, ap = m.AwayTeamPenaltyScore ?? -1;
    homeWon = hs > as || (hs === as && hp > ap);
    awayWon = !homeWon;
    homeScore = `${hs}`;
    awayScore = `${as}`;
    statusClass = 'br-game--done';
    if (hp >= 0) extraInfo = `<div class="br-pso">${hp}–${ap} ${t('livePSO')}</div>`;
  } else if (isLive) {
    const liveData = espnLiveData.get(m.IdMatch);
    if (liveData) {
      const parts = liveData.score.split('–');
      homeScore = parts[0]?.trim() || '0';
      awayScore = parts[1]?.trim() || '0';
    } else {
      homeScore = `${m.HomeTeamScore ?? 0}`;
      awayScore = `${m.AwayTeamScore ?? 0}`;
    }
    statusClass = 'br-game--live';
    const clock = liveData?.clock || m.MatchTime || '';
    extraInfo = `<div class="br-live-info"><span class="br-live-dot">●</span>${clock}</div>`;
  } else {
    const kickoff = formatKickoff(m.Date);
    const shortDate = new Date(m.Date).toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', timeZone: 'Asia/Jerusalem' });
    extraInfo = `<div class="br-date">${shortDate} · ${kickoff}</div>`;
  }

  return `<div class="br-game ${statusClass}" data-match="${matchNum}">
    <div class="br-team${homeWon ? ' br-team--won' : ''}${awayWon ? ' br-team--lost' : ''}">
      <span class="br-flag">${homeFlag}</span>
      <span class="br-name">${homeName}</span>
      <span class="br-score">${homeScore}</span>
    </div>
    <div class="br-team${awayWon ? ' br-team--won' : ''}${homeWon ? ' br-team--lost' : ''}">
      <span class="br-flag">${awayFlag}</span>
      <span class="br-name">${awayName}</span>
      <span class="br-score">${awayScore}</span>
    </div>
    ${extraInfo}
  </div>`;
}

function renderBracketTree(matches, container) {
  const byNum = new Map(matches.map(m => [m.MatchNumber, m]));

  // Build each round's games — ordered so visual connectors match actual bracket path:
  // 89+90→QF97, 93+94→QF98, QF97+98→SF101 (top half)
  // 91+92→QF99, 95+96→QF100, QF99+100→SF102 (bottom half)
  const r16Games = [89, 90, 93, 94, 91, 92, 95, 96].map(n => bracketGameHTML(n, matches)).join('');
  const qfGames = [97, 98, 99, 100].map(n => bracketGameHTML(n, matches)).join('');
  const sfGames = [101, 102].map(n => bracketGameHTML(n, matches)).join('');
  const finalGame = bracketGameHTML(104, matches);
  const thirdGame = bracketGameHTML(103, matches);

  // Connector columns: each has N pairs where N = number of games in the next round
  const conn4 = '<div class="br-conn-pair"></div>'.repeat(4);
  const conn2 = '<div class="br-conn-pair"></div>'.repeat(2);
  const conn1 = '<div class="br-conn-pair"></div>';

  container.innerHTML = `
    <div class="br-wrap">
      <div class="br-round-labels">
        <div class="br-label">${t('stageR16')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageQF')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageSF')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageFinal')}</div>
      </div>
      <div class="br-bracket">
        <div class="br-round br-round--r16">${r16Games}</div>
        <div class="br-connector-col">${conn4}</div>
        <div class="br-round br-round--qf">${qfGames}</div>
        <div class="br-connector-col">${conn2}</div>
        <div class="br-round br-round--sf">${sfGames}</div>
        <div class="br-connector-col">${conn1}</div>
        <div class="br-round br-round--final">${finalGame}</div>
      </div>
      <div class="br-third-section">
        <div class="br-third-label">🥉 ${t('stage3rd')}</div>
        ${thirdGame}
      </div>
    </div>`;

  // Make finished/live games clickable → navigate to match detail
  container.querySelectorAll('.br-game[data-match]').forEach(el => {
    const m = byNum.get(parseInt(el.dataset.match, 10));
    if (!m) return;
    if (m.MatchStatus === STATUS_FINISHED || m.MatchStatus === STATUS_LIVE) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        activeTab = 'matches';
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab--active'));
        document.querySelector('.tab[data-tab="matches"]')?.classList.add('tab--active');
        showMatchesUI(true);
        renderMatches(activeMatches());
        setTimeout(() => {
          const card = document.querySelector(`.match-card[data-match-id="${m.IdMatch}"]`);
          if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.click(); }
        }, 100);
      });
    }
  });
}

// ── Standings (computed from match results) ────────────────────
function isGroupStage(match) {
  // IdStage is language-independent; StageName text varies by language
  return match.IdStage === '289273';
}

function standingSort(a, b) {
  const pts = (r) => r.w * 3 + r.d;
  const gd = (r) => r.gf - r.ga;
  // pts → gd → gf → fair play (fewer cards = better) → group position fallback
  return pts(b) - pts(a)
    || gd(b) - gd(a)
    || b.gf - a.gf
    || (a.yc + a.rc * 3) - (b.yc + b.rc * 3); // fewer card points = better
}

function computeStandings(matches) {
  // Key by IdGroup (numeric, language-independent) to guarantee A→L order.
  // Each entry is { label, table } where label is the display name.
  const groups = new Map();

  for (const m of matches) {
    if (!isGroupStage(m)) continue;
    const groupId = m.IdGroup || 'Unknown';
    const label = m.GroupName?.[0]?.Description || 'Unknown';
    if (!groups.has(groupId)) groups.set(groupId, { label, table: new Map() });
    const { table } = groups.get(groupId);

    const addTeam = (team) => {
      if (!team) return;
      const id = team.IdTeam;
      if (!table.has(id)) table.set(id, {
        id, name: getTeamName(team) || '?', flag: countryToFlag(team.IdCountry),
        p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, yc: 0, rc: 0, live: false,
      });
    };
    addTeam(m.Home);
    addTeam(m.Away);

    // Accumulate card data from ESPN stats cache (if available)
    const espnData = espnLineupCache.get(m.IdMatch);
    if (espnData) {
      for (const side of ['home', 'away']) {
        const team = side === 'home' ? m.Home : m.Away;
        const espnStats = side === 'home' ? espnData.homeStats : espnData.awayStats;
        if (!team || !espnStats) continue;
        const entry = table.get(team.IdTeam);
        if (!entry) continue;
        entry.yc += parseFloat(espnStats.yellowCards) || 0;
        entry.rc += parseFloat(espnStats.redCards) || 0;
      }
    }

    // Finished matches — use official scores
    if (m.MatchStatus === STATUS_FINISHED && m.HomeTeamScore != null) {
      const hs = m.HomeTeamScore, as = m.AwayTeamScore;
      const home = table.get(m.Home?.IdTeam);
      const away = table.get(m.Away?.IdTeam);
      if (!home || !away) continue;
      home.p++; away.p++;
      home.gf += hs; home.ga += as;
      away.gf += as; away.ga += hs;
      if (hs > as) { home.w++; away.l++; }
      else if (hs < as) { away.w++; home.l++; }
      else { home.d++; away.d++; }
    }

    // Live matches — use live score from espnLiveData, flag teams as live
    if (m.MatchStatus === STATUS_LIVE) {
      const liveData = espnLiveData.get(m.IdMatch);
      const [hs, as] = liveData
        ? liveData.score.split('–').map(s => parseInt(s.trim(), 10) || 0)
        : [m.HomeTeamScore ?? 0, m.AwayTeamScore ?? 0];

      const home = table.get(m.Home?.IdTeam);
      const away = table.get(m.Away?.IdTeam);
      if (!home || !away) continue;

      home.p++; away.p++;
      home.gf += hs; home.ga += as;
      away.gf += as; away.ga += hs;
      if (hs > as) { home.w++; away.l++; }
      else if (hs < as) { away.w++; home.l++; }
      else { home.d++; away.d++; }

      home.live = true; away.live = true;
    }
  }

  // Sort groups by IdGroup (numeric → A through L), then sort rows within each group
  const sorted = new Map();
  for (const [groupId, { label, table }] of [...groups.entries()].sort((a, b) => a[0] - b[0])) {
    sorted.set(label, [...table.values()].sort(standingSort));
  }
  return sorted;
}

// Returns a Set of team IDs for the 8 best 3rd-place teams across all groups
function computeBestThirds(standings) {
  const thirds = [];
  for (const rows of standings.values()) {
    if (rows.length >= 3) thirds.push(rows[2]); // 3rd place in each group
  }
  // Sort thirds by same tiebreaker chain used in groups
  thirds.sort(standingSort);
  // Top 8 qualify
  return new Set(thirds.slice(0, 8).map(r => r.id));
}

let liveStandingsPoller = null;

function stopLiveStandingsPoller() {
  if (liveStandingsPoller) { clearInterval(liveStandingsPoller); liveStandingsPoller = null; }
}

function renderStandings(matches) {
  const main = document.querySelector('.main');
  const standings = computeStandings(matches);

  if (standings.size === 0) {
    main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('standingsNoData')}</div>`;
    return;
  }

  const bestThirds = computeBestThirds(standings);

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
      if (i < 2) {
        tr.classList.add('qualify');
      } else if (i === 2 && bestThirds.has(row.id)) {
        tr.classList.add('qualify-third');
      }
      if (row.live) tr.classList.add('standings-row--live');
      const liveBadge = row.live ? '<span class="standings-live-badge">🟢</span>' : '';
      tr.innerHTML = `
        <td><span class="standings-pos">${i + 1}</span></td>
        <td><div class="standings-team"><span>${row.flag}</span><span>${teamSpan(row.name, row.id)}</span>${liveBadge}</div></td>
        <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
        <td>${row.gf}</td><td>${row.ga}</td><td>${gd > 0 ? '+' : ''}${gd}</td>
        <td class="standings-pts">${pts}</td>`;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    section.appendChild(table);
    main.appendChild(section);
    bindTeamLinks(section);
  }

  // Auto-refresh standings while live matches are ongoing
  stopLiveStandingsPoller();
  if (hasLiveMatches()) {
    liveStandingsPoller = setInterval(() => {
      if (activeTab !== 'standings') { stopLiveStandingsPoller(); return; }
      if (!hasLiveMatches()) { stopLiveStandingsPoller(); return; }
      renderStandings(activeMatches());
    }, 15000);
  }
}

// ── Top Scorers (from ESPN stats cache) ────────
async function renderScorers(matches, container) {
  const main = container || document.querySelector('.main');
  main.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingScorers')}</div>`;

  const { playerMap } = await buildEspnStatsCache(matches);

  const sorted = [...playerMap.values()]
    .filter(p => p.goals > 0 && p.position !== 0) // exclude GKs
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 20);

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
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.goals}</div>
        <div class="scorer-goals-label">${t('goalLabel', s.goals)}</div>
      </div>`;
    list.appendChild(row);
  });

  bindPlayerLinks(list, activeMatches());
  bindTeamLinks(list);
  main.appendChild(list);
}

// ── Assists (from ESPN stats cache) ─────────────────────────
async function renderAssists(matches, container) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingAssists')}</div>`;

  const { playerMap } = await buildEspnStatsCache(matches);

  const sorted = [...playerMap.values()]
    .filter(p => p.assists > 0)
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 20);

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
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.assists}</div>
        <div class="scorer-goals-label">${t('assistLabel', s.assists)}</div>
      </div>`;
    list.appendChild(row);
  });
  bindPlayerLinks(list, activeMatches());
  bindTeamLinks(list);
  container.appendChild(list);
}

// ── Clean Sheets GK (from ESPN stats cache) ───
async function renderCleanSheets(matches, container) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingClean')}</div>`;

  const { playerMap } = await buildEspnStatsCache(matches);

  const sorted = [...playerMap.values()]
    .filter(p => p.position === 0 && p.cleanSheets > 0)
    .sort((a, b) => b.cleanSheets - a.cleanSheets)
    .slice(0, 20);

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
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s.cleanSheets}</div>
        <div class="scorer-goals-label">${t('cleanLabel', s.cleanSheets)}</div>
      </div>`;
    list.appendChild(row);
  });
  bindPlayerLinks(list, activeMatches());
  bindTeamLinks(list);
  container.appendChild(list);
}

// ── ESPN player leaderboard (shots, saves, cards, fouls, offsides) ──
async function renderEspnPlayerLeaderboard(matches, container, type) {
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div>${t('loadingComputing')}</div>`;

  const { playerMap } = await buildEspnStatsCache(matches);

  const CONFIG = {
    shots: { field: 'shots', icon: '🎯', label: () => t('labelShots') },
    shotsOnTarget: { field: 'shotsOnTarget', icon: '🎯', label: () => t('labelOnTarget') },
    saves: { field: 'saves', icon: '🧤', label: () => t('labelSaves') },
    fouls: { field: 'fouls', icon: '🚫', label: () => t('labelFouls') },
    offsides: { field: 'offsides', icon: '🚩', label: () => t('labelOffsides') },
    yellow: { field: 'yellowCards', icon: '🟨', label: () => '🟨' },
    red: { field: 'redCards', icon: '🟥', label: () => '🟥' },
  };

  const cfg = CONFIG[type];
  if (!cfg) { container.innerHTML = `<div class="error"><div class="error-icon">📊</div>${t('errorNoData')}</div>`; return; }

  const sorted = [...playerMap.values()]
    .filter(p => p[cfg.field] > 0)
    .sort((a, b) => b[cfg.field] - a[cfg.field])
    .slice(0, 20);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="error"><div class="error-icon">${cfg.icon}</div>${t('errorNoData')}</div>`;
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
        <div class="scorer-name">${playerSpan(s.name)}</div>
        <div class="scorer-team">${teamSpan(s.teamName, s.teamId)}</div>
      </div>
      <div>
        <div class="scorer-goals">${s[cfg.field]}</div>
        <div class="scorer-goals-label">${cfg.label()}</div>
      </div>`;
    list.appendChild(row);
  });
  bindPlayerLinks(list, activeMatches());
  bindTeamLinks(list);
  container.appendChild(list);
}

// ── Phase 13: Player Profiles ─────────────────────────────────
// Build a profile for a player entirely from ESPN data.
// Aggregate stats from espnStatsCache.playerMap, per-match events from espnMatchDetailsCache.

function buildPlayerProfile(playerName, matches) {
  const profile = { name: playerName, flag: '', teamName: '', goals: 0, assists: 0, yellowCards: 0, redCards: 0, ownGoals: 0, shots: 0, shotsOnTarget: 0, saves: 0, fouls: 0, offsides: 0, events: [] };
  const lowerName = playerName.toLowerCase();

  // 1) Get aggregate stats from ESPN stats cache
  if (espnStatsCache?.playerMap) {
    for (const [, p] of espnStatsCache.playerMap) {
      if (p.name.toLowerCase() !== lowerName) continue;
      profile.flag = p.flag || '';
      profile.teamName = p.teamName || '';
      profile.goals = p.goals || 0;
      profile.assists = p.assists || 0;
      profile.shots = p.shots || 0;
      profile.shotsOnTarget = p.shotsOnTarget || 0;
      profile.saves = p.saves || 0;
      profile.yellowCards = p.yellowCards || 0;
      profile.redCards = p.redCards || 0;
      profile.fouls = p.fouls || 0;
      profile.offsides = p.offsides || 0;
      break;
    }
  }

  // 2) Build per-match event history from ESPN scoreboard details + roster stats
  for (const match of matches) {
    if (match.MatchStatus !== STATUS_FINISHED) continue;

    const homeName = getTeamName(match.Home) || '';
    const awayName = getTeamName(match.Away) || '';
    const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
    const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';
    const matchLabel = `${homeFlag} ${homeName} ${match.HomeTeamScore}–${match.AwayTeamScore} ${awayFlag} ${awayName}`;
    const matchDate = new Date(match.Date).toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', timeZone: 'Asia/Jerusalem' });

    // Events from scoreboard details (goals, cards)
    const espnDetails = espnMatchDetailsCache.get(match.IdMatch);
    if (espnDetails?.details?.length) {
      for (const d of espnDetails.details) {
        const player = d.athletesInvolved?.[0]?.displayName || '';
        if (player.toLowerCase() !== lowerName) continue;
        const minute = d.clock?.displayValue || '';
        const teamId = d.team?.id || d.athletesInvolved?.[0]?.team?.id || '';
        const side = teamId === espnDetails.homeTeamId ? 'home' : teamId === espnDetails.awayTeamId ? 'away' : null;
        const opponentFlag = side === 'home' ? awayFlag : homeFlag;
        const opponentName = side === 'home' ? awayName : homeName;

        if (d.scoringPlay && !d.ownGoal) {
          profile.events.push({ type: 'goal', minute, matchLabel, matchDate, ownGoal: false, opponentFlag, opponentName });
        } else if (d.ownGoal) {
          profile.ownGoals++;
          profile.events.push({ type: 'goal', minute, matchLabel, matchDate, ownGoal: true, opponentFlag, opponentName });
        } else if (d.yellowCard && !d.redCard) {
          profile.events.push({ type: 'yellow', minute, matchLabel, matchDate, ownGoal: false, opponentFlag, opponentName });
        } else if (d.redCard) {
          profile.events.push({ type: 'red', minute, matchLabel, matchDate, ownGoal: false, opponentFlag, opponentName });
        }
      }
    }

    // Assists from ESPN roster per-match stats (no minute available)
    const espnLineup = espnLineupCache.get(match.IdMatch);
    if (espnLineup) {
      for (const side of ['home', 'away']) {
        const roster = espnLineup[side];
        if (!roster) continue;
        for (const p of [...(roster.starters || []), ...(roster.subs || [])]) {
          if (p.name.toLowerCase() !== lowerName) continue;
          const assistCount = p.stats?.goalAssists || 0;
          if (assistCount > 0) {
            const opponentFlag = side === 'home' ? awayFlag : homeFlag;
            const opponentName = side === 'home' ? awayName : homeName;
            for (let i = 0; i < assistCount; i++) {
              profile.events.push({ type: 'assist', minute: '', matchLabel, matchDate, ownGoal: false, opponentFlag, opponentName });
            }
          }
        }
      }
    }
  }

  return profile;
}

async function openPlayerProfile(playerName, matches) {
  // Remove any existing profile overlay
  document.getElementById('player-profile-overlay')?.remove();

  // Ensure ESPN data is available before building the profile
  await buildEspnStatsCache(matches);

  const profile = buildPlayerProfile(playerName, matches);

  const overlay = document.createElement('div');
  overlay.id = 'player-profile-overlay';
  overlay.className = 'profile-overlay';

  const EVENT_ICONS = { goal: '⚽', assist: '🎯', yellow: '🟨', red: '🟥' };

  const statsHtml = `
    <div class="profile-stats-row">
      ${profile.goals > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.goals}</span><span class="profile-stat-label">⚽ ${t('profileGoals')}</span></div>` : ''}
      ${profile.assists > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.assists}</span><span class="profile-stat-label">🎯 ${t('profileAssists')}</span></div>` : ''}
      ${profile.shots > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.shots}</span><span class="profile-stat-label">🎯 ${t('statShots')}</span></div>` : ''}
      ${profile.shotsOnTarget > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.shotsOnTarget}</span><span class="profile-stat-label">🎯 ${t('statOnTarget')}</span></div>` : ''}
      ${profile.saves > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.saves}</span><span class="profile-stat-label">🧤 ${t('statSaves')}</span></div>` : ''}
      ${profile.yellowCards > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.yellowCards}</span><span class="profile-stat-label">🟨 ${t('profileYellow')}</span></div>` : ''}
      ${profile.redCards > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.redCards}</span><span class="profile-stat-label">🟥 ${t('profileRed')}</span></div>` : ''}
      ${profile.fouls > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.fouls}</span><span class="profile-stat-label">🚫 ${t('statFouls')}</span></div>` : ''}
      ${profile.offsides > 0 ? `<div class="profile-stat"><span class="profile-stat-val">${profile.offsides}</span><span class="profile-stat-label">🚩 ${t('statOffsides')}</span></div>` : ''}
    </div>`;

  const eventsHtml = profile.events.length === 0 ? '' : `
    <div class="profile-section-title">${t('profileMatchHistory')}</div>
    <div class="profile-events">
      ${profile.events.map(ev => `
        <div class="profile-event">
          <span class="profile-event-icon">${EVENT_ICONS[ev.type]}${ev.ownGoal ? ` <span class="profile-og-badge">${t('profileOG')}</span>` : ''}</span>
          <div class="profile-event-detail">
            <span class="profile-event-minute">${ev.minute}'</span>
            <span class="profile-event-match">${ev.matchLabel}</span>
            <span class="profile-event-date">${ev.matchDate}</span>
          </div>
        </div>`).join('')}
    </div>`;

  overlay.innerHTML = `
    <div class="profile-backdrop"></div>
    <div class="profile-card">
      <button class="profile-close" aria-label="${t('profileClose')}">✕</button>
      <div class="profile-header">
        <span class="profile-flag">${profile.flag}</span>
        <div class="profile-identity">
          <div class="profile-name">${profile.name}</div>
          <div class="profile-team">${profile.teamName}</div>
        </div>
      </div>
      ${statsHtml}
      ${eventsHtml}
    </div>`;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector('.profile-close').addEventListener('click', close);
  overlay.querySelector('.profile-backdrop').addEventListener('click', close);
  // Swipe down to dismiss on mobile
  let touchStartY = 0;
  overlay.querySelector('.profile-card').addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  overlay.querySelector('.profile-card').addEventListener('touchend', e => { if (e.changedTouches[0].clientY - touchStartY > 80) close(); }, { passive: true });
}

// Wrap a plain player name string in a tappable span
function playerSpan(name) {
  return `<span class="player-link" data-player="${name.replace(/"/g, '&quot;')}">${name}</span>`;
}

// Attach click handlers to all .player-link elements inside a container
function bindPlayerLinks(container, matches) {
  container.querySelectorAll('.player-link').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      openPlayerProfile(el.dataset.player, matches);
    });
  });
}

// ── Team Profiles ─────────────────────────────────────────────
function teamSpan(name, teamId) {
  if (!teamId) return name;
  return `<span class="team-link" data-team-id="${teamId}">${name}</span>`;
}

function bindTeamLinks(container) {
  container.querySelectorAll('.team-link').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      openTeamProfile(el.dataset.teamId, allMatches);
    });
  });
}

function openTeamProfile(teamId, matches) {
  document.getElementById('team-profile-overlay')?.remove();

  // Find all matches involving this team
  const teamMatches = matches.filter(m =>
    m.Home?.IdTeam === teamId || m.Away?.IdTeam === teamId
  ).sort((a, b) => new Date(a.Date) - new Date(b.Date));

  if (teamMatches.length === 0) return;

  // Derive team identity from first match that has this team
  const ref = teamMatches[0];
  const teamObj = ref.Home?.IdTeam === teamId ? ref.Home : ref.Away;
  const teamFlag = countryToFlag(teamObj.IdCountry);
  const teamName = getTeamName(teamObj) || '?';

  // Compute record across finished matches
  let w = 0, d = 0, l = 0, gf = 0, ga = 0;
  for (const m of teamMatches) {
    if (m.MatchStatus !== STATUS_FINISHED) continue;
    const isHome = m.Home?.IdTeam === teamId;
    const tf = isHome ? (m.HomeTeamScore ?? 0) : (m.AwayTeamScore ?? 0);
    const ta = isHome ? (m.AwayTeamScore ?? 0) : (m.HomeTeamScore ?? 0);
    gf += tf; ga += ta;
    if (tf > ta) w++;
    else if (tf === ta) d++;
    else l++;
  }

  const recordHtml = (w + d + l) > 0 ? `
    <div class="profile-stats-row">
      <div class="profile-stat"><span class="profile-stat-val">${w}</span><span class="profile-stat-label">${t('teamWon')}</span></div>
      <div class="profile-stat"><span class="profile-stat-val">${d}</span><span class="profile-stat-label">${t('teamDrawn')}</span></div>
      <div class="profile-stat"><span class="profile-stat-val">${l}</span><span class="profile-stat-label">${t('teamLost')}</span></div>
      <div class="profile-stat"><span class="profile-stat-val">${gf}</span><span class="profile-stat-label">${t('teamGF')}</span></div>
      <div class="profile-stat"><span class="profile-stat-val">${ga}</span><span class="profile-stat-label">${t('teamGA')}</span></div>
    </div>` : '';

  const matchRows = teamMatches.map(m => {
    const isHome = m.Home?.IdTeam === teamId;
    const opp = isHome ? m.Away : m.Home;
    const oppFlag = opp ? countryToFlag(opp.IdCountry) : '🏳️';
    const oppName = opp ? (getTeamName(opp) || '?') : '?';
    const date = new Date(m.Date).toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', timeZone: 'Asia/Jerusalem' });

    let scoreStr = '', resultClass = '';
    if (m.MatchStatus === STATUS_FINISHED) {
      const tf = isHome ? m.HomeTeamScore : m.AwayTeamScore;
      const ta = isHome ? m.AwayTeamScore : m.HomeTeamScore;
      scoreStr = `${tf}–${ta}`;
      resultClass = tf > ta ? 'team-match-w' : tf === ta ? 'team-match-d' : 'team-match-l';
    } else if (m.MatchStatus === STATUS_LIVE) {
      const liveData = espnLiveData.get(m.IdMatch);
      const [hs, as] = liveData ? liveData.score.split('–').map(s => parseInt(s.trim(), 10) || 0) : [0, 0];
      const tf = isHome ? hs : as;
      const ta = isHome ? as : hs;
      scoreStr = `${tf}–${ta} 🟢`;
      resultClass = 'team-match-live';
    } else {
      scoreStr = formatKickoff(m.Date);
    }

    const stageKey = STAGE_LABEL[m.StageName?.[0]?.Description || ''];
    const stageBadge = stageKey ? t(stageKey) : (m.GroupName?.[0]?.Description || '');

    return `<div class="team-match-row">
      <div class="team-match-opp">${oppFlag} <span>${oppName}</span></div>
      <div class="team-match-right">
        <span class="team-match-score ${resultClass}">${scoreStr}</span>
        <span class="team-match-stage">${stageBadge} · ${date}</span>
      </div>
    </div>`;
  }).join('');

  const overlay = document.createElement('div');
  overlay.id = 'team-profile-overlay';
  overlay.className = 'profile-overlay';
  overlay.innerHTML = `
    <div class="profile-backdrop"></div>
    <div class="profile-card">
      <button class="profile-close" aria-label="${t('profileClose')}">✕</button>
      <div class="profile-header">
        <span class="profile-flag">${teamFlag}</span>
        <div class="profile-identity">
          <div class="profile-name">${teamName}</div>
        </div>
      </div>
      ${recordHtml}
      <div class="profile-section-title">${t('teamMatches')}</div>
      <div class="profile-events">${matchRows}</div>
    </div>`;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector('.profile-close').addEventListener('click', close);
  overlay.querySelector('.profile-backdrop').addEventListener('click', close);
  let touchStartY = 0;
  overlay.querySelector('.profile-card').addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  overlay.querySelector('.profile-card').addEventListener('touchend', e => { if (e.changedTouches[0].clientY - touchStartY > 80) close(); }, { passive: true });
}

// ── Live polling (Phase 11a) ───────────────────────────────────
let livePoller = null;
const LIVE_POLL_MS = 10000; // 10 seconds

// espnLiveData: IdMatch → { score, clock, state, startDate }
const espnLiveData = new Map();

async function fetchLiveScores() {
  try {
    const res = await fetch(ESPN_INDEX_API);
    if (!res.ok) return;
    const data = await res.json();
    const events = data.events || [];

    let anyLive = false;

    for (const ev of events) {
      const comp = ev.competitions?.[0];
      if (!comp) continue;
      const status = comp.status;
      const state = status?.type?.state || 'pre'; // 'pre', 'in', 'post'
      const clock = status?.displayClock || '';
      const period = status?.period || 0;

      // Build score string
      const competitors = comp.competitors || [];
      const home = competitors.find(c => c.homeAway === 'home');
      const away = competitors.find(c => c.homeAway === 'away');
      const score = `${home?.score ?? 0} – ${away?.score ?? 0}`;

      // Map ESPN event back to FIFA IdMatch via fifaToEspn
      // fifaToEspn is IdMatch→espnId; we need the reverse
      const fifaId = [...fifaToEspn.entries()].find(([, espnId]) => espnId === ev.id)?.[0];
      if (!fifaId) continue;

      // Format clock: show period prefix for HT / ET / penalties
      const detail = status?.type?.detail || '';
      let displayClock = clock;
      if (/half\s*time/i.test(detail) || (period === 2 && clock === '0:00')) displayClock = t('liveHT');
      else if (/full\s*time/i.test(detail)) displayClock = t('matchFT');
      else if (period === 3 || period === 4) displayClock = `${t('liveET')} ${clock}`;
      else if (period === 5) displayClock = t('livePSO');

      const startDate = ev.date || comp.date || '';
      espnLiveData.set(fifaId, { score, clock: displayClock, state, startDate });
      if (state === 'in') anyLive = true;

      const m = allMatches.find(m => m.IdMatch === fifaId);
      if (m) {
        if (state === 'in') {
          m.MatchStatus = STATUS_LIVE;
        } else if (state === 'post' && m.MatchStatus === STATUS_LIVE) {
          // Match just ended — flip back to finished and apply final score
          m.MatchStatus = STATUS_FINISHED;
          const [hs, as] = score.split('–').map(s => parseInt(s.trim(), 10) || 0);
          m.HomeTeamScore = hs;
          m.AwayTeamScore = as;
          // Stop the live detail poller if this match is currently open
          if (activeCard?.dataset?.matchId === fifaId) {
            stopLiveDetailPoller();
            // Re-render the detail as a finished match
            const detail = activeCard.querySelector('.match-detail');
            if (detail) loadTimeline(m, detail);
          }
        }
      }
    }

    patchLiveCards();

    // Stop polling only if nothing is live and nothing starting soon
    const anySoon = [...espnLiveData.values()].some(l => l.state === 'pre');
    if (!anyLive && !anySoon) stopLivePoller();

  } catch { /* non-critical — silently skip */ }
}

function patchLiveCards() {
  // Only patch while on the Matches tab — avoids touching hidden DOM
  if (activeTab !== 'matches') return;

  const now = Date.now();

  for (const [fifaId, live] of espnLiveData) {
    const card = document.querySelector(`.match-card[data-match-id="${fifaId}"]`);
    if (!card) continue;

    const m = allMatches.find(m => m.IdMatch === fifaId);
    if (!m) continue;

    // Pre-match: show "Starting Soon" on the clock area if within 10 min of kickoff
    if (live.state === 'pre') {
      const kickoff = live.startDate ? new Date(live.startDate).getTime() : new Date(m.Date).getTime();
      const minUntil = (kickoff - now) / 60000;
      if (minUntil <= 10 && minUntil > 0) {
        const clockEl = card.querySelector('.match-clock') || card.querySelector('.match-time');
        if (clockEl) clockEl.textContent = t('liveStartingSoon');
      }
      continue;
    }

    // Post-match: show "Match Ended" for 5 min after the match ends
    if (live.state === 'post') {
      const cardIsLive = card.classList.contains('match-card--live');
      if (cardIsLive) {
        // Rebuild as finished card
        const newCard = buildMatchCard(m);
        card.replaceWith(newCard);
      } else {
        // If already rebuilt as finished, show "Match Ended" briefly
        const statusEl = card.querySelector('.match-status--ft');
        if (statusEl) {
          const kickoff = live.startDate ? new Date(live.startDate).getTime() : new Date(m.Date).getTime();
          const endApprox = kickoff + 2 * 60 * 60 * 1000;
          if ((now - endApprox) / 60000 <= 5) {
            statusEl.textContent = t('liveMatchEnded');
          }
        }
      }
      continue;
    }

    // In-progress
    if (live.state !== 'in') continue;

    // Match just ended or just kicked off — replace card entirely
    const cardIsLive = card.classList.contains('match-card--live');
    const matchIsLive = m.MatchStatus === STATUS_LIVE;
    const matchIsFinished = m.MatchStatus === STATUS_FINISHED;

    if ((matchIsFinished && cardIsLive) || (matchIsLive && !cardIsLive)) {
      const newCard = buildMatchCard(m);
      card.replaceWith(newCard);
      continue;
    }

    if (!cardIsLive) continue;

    // Patch score
    const scoreEl = card.querySelector(`.match-score--live[data-match-id="${fifaId}"]`);
    if (scoreEl && scoreEl.textContent !== live.score) {
      scoreEl.textContent = live.score;
      scoreEl.classList.remove('score-flash');
      void scoreEl.offsetWidth;
      scoreEl.classList.add('score-flash');
    }

    // Patch clock
    const clockEl = card.querySelector(`.match-clock[data-match-id="${fifaId}"]`);
    if (clockEl) clockEl.textContent = live.clock;
  }
}

function startLivePoller() {
  if (livePoller) return; // already running
  fetchLiveScores(); // immediate first tick
  livePoller = setInterval(fetchLiveScores, LIVE_POLL_MS);
}

function stopLivePoller() {
  if (livePoller) { clearInterval(livePoller); livePoller = null; }
}

function hasLiveMatches() {
  return allMatches.some(m => m.MatchStatus === STATUS_LIVE);
}

function maybeStartPoller() {
  // Start if any match is live or starting within the next 2 hours
  const now = Date.now();
  const soonLive = allMatches.some(m => {
    if (m.MatchStatus === STATUS_LIVE) return true;
    if (m.MatchStatus === STATUS_FINISHED) return false;
    const kickoff = new Date(m.Date).getTime();
    return kickoff <= now + 2 * 60 * 60 * 1000 && kickoff >= now - 2 * 60 * 60 * 1000;
  });
  if (soonLive) startLivePoller();
}

document.addEventListener('DOMContentLoaded', init);
