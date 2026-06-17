// ── Data Constants ─────────────────────────────────────────────

// FIFA 3-letter → ISO 3166-1 alpha-2
export const FIFA_TO_ALPHA2 = {
    MEX: 'MX', RSA: 'ZA', KOR: 'KR', CZE: 'CZ', CAN: 'CA', BIH: 'BA', USA: 'US', PAR: 'PY',
    QAT: 'QA', SUI: 'CH', BRA: 'BR', MAR: 'MA', ARG: 'AR', ESP: 'ES', POR: 'PT', FRA: 'FR',
    GER: 'DE', ENG: 'GB-ENG', ITA: 'IT', NED: 'NL', BEL: 'BE', URU: 'UY', COL: 'CO', CHI: 'CL',
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

export const TEAM_NAME_HE = {
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

export const STAGE_LABEL = {
    'First Stage': 'stageGroupStage',
    'Round of 32': 'stageR32',
    'Round of 16': 'stageR16',
    'Quarter-final': 'stageQF',
    'Semi-final': 'stageSF',
    'Play-off for third place': 'stage3rd',
    'Final': 'stageFinal',
};

// chip data-stage value → IdStage (language-independent)
export const STAGE_ID = {
    'First Stage': '289273',
    'Round of 32': '289287',
    'Round of 16': '289288',
    'Quarter-final': '289289',
    'Semi-final': '289290',
    'Final': '289292',
};

// MatchStatus: 0 = finished, 1 = upcoming, 3 = live
export const STATUS_FINISHED = 0;
export const STATUS_LIVE = 3;

export const LOCALE_MAP = { en: 'en-GB', he: 'he-IL', ar: 'ar-SA' };

// Known name discrepancies between FIFA (en-GB) and ESPN
export const ESPN_NAME_MAP = {
    'czechia': 'czechrepublic',
    'türkiye': 'turkey',
    'ivorycoast': 'cotedivoire',
    'unitedstates': 'usa',
    'korearepublic': 'southkorea',
    'bosniaandherzegovina': 'bosniaherzegovina',
    'iriran': 'iran',
    'caboverde': 'capeverde',
};
