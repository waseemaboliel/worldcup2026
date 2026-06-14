// ── Shared mutable application state ──────────────────────────
// All top-level variables that are read/written across multiple features.

export let allMatches = [];
export let allMatchesAr = [];
export let israelChannels = {}; // IdMatch → channels[]
export const fifaToEspn = new Map(); // FIFA IdMatch → ESPN event ID

export let activeTab = 'matches';
export let activeStageFilter = 'all';
export let teamSearchQuery = '';

export let activeCard = null;
export let liveDetailPoller = null;

export let activeStatsSection = 'player'; // 'player' or 'team'
export let activePlayerSub = 'scorers';
export let activeTeamSub = 'goals-per-game';
export let espnStatsCache = null;
export const espnMatchDetailsCache = new Map();

export let activeBracketTab = 'r32';

export let livePoller = null;
export const espnLiveData = new Map(); // IdMatch → { score, clock, state, startDate }

export let liveStandingsPoller = null;

// ── State setters ─────────────────────────────────────────────
// Using setters so ES module live bindings update correctly.

export function setAllMatches(v) { allMatches = v; }
export function setAllMatchesAr(v) { allMatchesAr = v; }
export function setIsraelChannels(v) { israelChannels = v; }
export function setActiveTab(v) { activeTab = v; }
export function setActiveStageFilter(v) { activeStageFilter = v; }
export function setTeamSearchQuery(v) { teamSearchQuery = v; }
export function setActiveCard(v) { activeCard = v; }
export function setLiveDetailPoller(v) { liveDetailPoller = v; }
export function setActiveStatsSection(v) { activeStatsSection = v; }
export function setActivePlayerSub(v) { activePlayerSub = v; }
export function setActiveTeamSub(v) { activeTeamSub = v; }
export function setEspnStatsCache(v) { espnStatsCache = v; }
export function setActiveBracketTab(v) { activeBracketTab = v; }
export function setLivePoller(v) { livePoller = v; }
export function setLiveStandingsPoller(v) { liveStandingsPoller = v; }
