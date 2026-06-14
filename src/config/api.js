// ── API Endpoints ──────────────────────────────────────────────
export const MATCHES_API = 'https://api.fifa.com/api/v3/calendar/matches?language=en-GB&idCompetition=17&idSeason=285023&count=104';
export const MATCHES_API_AR = 'https://api.fifa.com/api/v3/calendar/matches?language=ar-SA&idCompetition=17&idSeason=285023&count=104';
export const WATCH_API = 'https://api.fifa.com/api/v3/watch/season/285023?language=en-GB';
export const ESPN_INDEX_API = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200';
export const TIMELINE_API = 'https://api.fifa.com/api/v3/timelines/17/285023/{stage}/{match}?language=en-GB';
export const LINEUP_API = 'https://api.fifa.com/api/v3/live/football/17/285023/{stage}/{match}?language=en-GB';
export const ESPN_SUMMARY_API = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={espnId}';
export const LIVE_POLL_MS = 10000; // 10 seconds
