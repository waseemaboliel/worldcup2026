import { LIVE_POLL_MS } from '../config/api.js';
import { STATUS_FINISHED, STATUS_LIVE, STAGE_LABEL } from '../config/constants.js';
import { t, currentLang, dateLocale } from '../config/strings.js';
import * as state from '../state.js';
import { countryToFlag, getTeamName, formatKickoff } from '../data/helpers.js';
import { fetchTimeline, parseTimeline } from '../data/timeline.js';
import { fetchLineup } from '../data/lineup.js';
import { fetchEspnLineup, MATCH_STAT_KEYS } from '../data/espn-lineup.js';
import { fetchEspnLiveStats, espnDetailsToEvents } from '../data/espn-live.js';
import { eventRow, playerSpan, teamSpan } from '../ui/helpers.js';
import { bindPlayerLinks, bindTeamLinks } from '../ui/links.js';
import { buildEventSections } from '../ui/event-sections.js';
import { renderLineup } from '../ui/lineup-pitch.js';

// ── Live detail poller ────────────────────────────────────────

export function stopLiveDetailPoller() {
    if (state.liveDetailPoller) { clearInterval(state.liveDetailPoller); state.setLiveDetailPoller(null); }
}

// ── Toggle card (expand/collapse match detail) ────────────────

export function toggleCard(card, match) {
    const isOpen = card.classList.contains('match-card--open');

    if (state.activeCard && state.activeCard !== card) {
        state.activeCard.classList.remove('match-card--open');
        state.activeCard.querySelector('.match-detail')?.remove();
        stopLiveDetailPoller();
    }

    if (isOpen) {
        card.classList.remove('match-card--open');
        card.querySelector('.match-detail')?.remove();
        stopLiveDetailPoller();
        state.setActiveCard(null);
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        return;
    }

    card.classList.add('match-card--open');
    state.setActiveCard(card);

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

// ── Channels row ──────────────────────────────────────────────

function buildChannelsRow(matchId) {
    const channels = state.israelChannels[matchId] || [];
    const kanBox = `<span class="channel-chip channel-chip--kanbox">Kan Box \uD83D\uDCF1</span>`;
    const rest = channels.map(c => `<span class="channel-chip">${c.Name}</span>`).join('');
    return `<div class="match-channels">\uD83D\uDCFA ${kanBox}${rest}</div>`;
}

// ── Build match card ──────────────────────────────────────────

export function buildMatchCard(match) {
    const isFinished = match.MatchStatus === STATUS_FINISHED;
    const isLive = match.MatchStatus === STATUS_LIVE;
    const homeName = teamSpan(getTeamName(match.Home) || match.PlaceHolderA || 'TBD', match.Home?.IdTeam);
    const awayName = teamSpan(getTeamName(match.Away) || match.PlaceHolderB || 'TBD', match.Away?.IdTeam);
    const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '\uD83C\uDFF3\uFE0F';
    const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '\uD83C\uDFF3\uFE0F';
    const venue = match.Stadium?.Name?.[0]?.Description || '';
    const city = match.Stadium?.CityName?.[0]?.Description || '';
    const venueStr = [venue, city].filter(Boolean).join(' \u00B7 ');
    const stage = match.StageName?.[0]?.Description || '';
    const group = match.GroupName?.[0]?.Description || '';
    const stageKey = STAGE_LABEL[stage];
    const badgeText = stageKey ? t(stageKey) : stage;
    const isGroup = match.IdStage === '289273';
    const groupText = group && isGroup ? group : badgeText;

    const card = document.createElement('article');
    card.className = 'match-card' + (isFinished ? ' match-card--finished' : '') + (isLive ? ' match-card--live' : '');
    card.dataset.matchId = match.IdMatch;
    card.dataset.idStage = match.IdStage;

    if (isFinished) {
        const homeScore = match.HomeTeamScore ?? '';
        const awayScore = match.AwayTeamScore ?? '';
        const pso = (match.HomeTeamPenaltyScore != null && match.AwayTeamPenaltyScore != null)
            ? `<span class="match-pso">(${match.HomeTeamPenaltyScore}\u2013${match.AwayTeamPenaltyScore} PSO)</span>`
            : '';
        card.innerHTML = `
      <div class="match-teams">
        <div class="team">
          <span class="flag">${homeFlag}</span>
          <span class="team-name">${homeName}</span>
        </div>
        <div class="match-center">
          <span class="match-score">${homeScore} \u2013 ${awayScore}</span>
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
          <span class="match-score match-score--live" data-match-id="${match.IdMatch}">${homeScore} \u2013 ${awayScore}</span>
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

// ── Load timeline (finished match) ────────────────────────────

export async function loadTimeline(match, detail) {
    const [events, lineup, espnLineup, espnLive] = await Promise.all([
        fetchTimeline(match, detail),
        fetchLineup(match),
        fetchEspnLineup(match),
        fetchEspnLiveStats(match),
    ]);

    if (events === null) return;
    renderTimeline(match, events, lineup, espnLineup, espnLive, detail);
}

// ── Load live detail ──────────────────────────────────────────

async function loadLiveDetail(match, detail, card) {
    const [events, fifaLineup, espnLineup, espnLive] = await Promise.all([
        fetchTimeline(match, null, true),
        fetchLineup(match, true),
        fetchEspnLineup(match),
        fetchEspnLiveStats(match),
    ]);

    if (!card.classList.contains('match-card--open')) return;

    renderLiveDetail(match, events || [], fifaLineup, espnLineup, espnLive, detail);

    stopLiveDetailPoller();
    state.setLiveDetailPoller(setInterval(async () => {
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
    }, LIVE_POLL_MS));
}

// ── Render live detail ────────────────────────────────────────

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
    bindPlayerLinks(detail, state.allMatches);

    if (espnLineup || fifaLineup) {
        detail.appendChild(renderLineup(match, espnLineup, fifaLineup));
    }
}

// ── Build live stats bar ──────────────────────────────────────

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

// ── Patch live detail (incremental update) ────────────────────

export function patchLiveDetail(match, events, fifaLineup, espnLineup, espnLive, detail) {
    const homeId = match.Home?.IdTeam;
    const awayId = match.Away?.IdTeam;
    const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
    const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

    const statsEl = detail.querySelector('[data-live-stats]');
    const newStatsHTML = buildLiveStatsBar(match, espnLive);
    if (statsEl && newStatsHTML) {
        statsEl.outerHTML = newStatsHTML;
    }

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
    bindPlayerLinks(detail, state.allMatches);

    const lineupSection = detail.querySelector('.lineup-section');
    if (lineupSection && (espnLineup || fifaLineup)) {
        const fresh = renderLineup(match, espnLineup, fifaLineup);
        lineupSection.replaceWith(fresh);
    }
}

// ── Render timeline (finished match) ──────────────────────────

function renderTimeline(match, events, lineup, espnLineup, espnLive, detail) {
    const homeId = match.Home?.IdTeam;
    const awayId = match.Away?.IdTeam;
    const attendance = match.Attendance
        ? `<div class="detail-attendance">${t('detailAttendance', Number(match.Attendance).toLocaleString())}</div>`
        : '';
    const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
    const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

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

    const sections = [];

    if (goals.length) {
        const rows = goals.map(g => {
            const assist = g.assist ? `<span class="detail-assist">\u21B3 ${playerSpan(g.assist)}</span>` : '';
            const og = g.ownGoal ? ` <span class="detail-og">${t('liveOG')}</span>` : '';
            const pen = g.penalty ? ` <span class="detail-pen">(pen)</span>` : '';
            const content = `<span class="detail-name">\u26BD ${playerSpan(g.scorer)}${pen}${og}${assist}</span>`;
            const flag = g.side === 'home' ? homeFlag : awayFlag;
            const cell = `${flag} ${content}`;
            return eventRow(g.minute, g.side === 'home' ? cell : null, g.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailGoals')}</div>${rows}</div>`);
    }

    if (yellowCards.length) {
        const rows = yellowCards.map(c => {
            const content = `<span class="detail-name">\uD83D\uDFE8 ${playerSpan(c.player)}</span>`;
            const flag = c.side === 'home' ? homeFlag : awayFlag;
            const cell = `${flag} ${content}`;
            return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailYellow')}</div>${rows}</div>`);
    }

    if (redCards.length) {
        const rows = redCards.map(c => {
            const content = `<span class="detail-name">\uD83D\uDFE5 ${playerSpan(c.player)}</span>`;
            const flag = c.side === 'home' ? homeFlag : awayFlag;
            const cell = `${flag} ${content}`;
            return eventRow(c.minute, c.side === 'home' ? cell : null, c.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailRed')}</div>${rows}</div>`);
    }

    if (subs.length) {
        const rows = subs.map(s => {
            const content = `<span class="detail-name">\u2191 ${playerSpan(s.playerIn)}</span><span class="detail-sub-out">\u2193 ${playerSpan(s.playerOut)}</span>`;
            const flag = s.side === 'home' ? homeFlag : awayFlag;
            const cell = `${flag} ${content}`;
            return eventRow(s.minute, s.side === 'home' ? cell : null, s.side === 'away' ? cell : null);
        }).join('');
        sections.push(`<div class="detail-section"><div class="detail-section-title">${t('detailSubs')}</div>${rows}</div>`);
    }

    detail.innerHTML = attendance + (sections.length
        ? sections.join('')
        : `<p class="detail-empty">${t('detailNoEvents')}</p>`);

    bindPlayerLinks(detail, state.allMatches);

    const statsSection = renderMatchStats(match, espnLineup);
    if (statsSection) detail.appendChild(statsSection);

    if (espnLineup || lineup) {
        detail.appendChild(renderLineup(match, espnLineup, lineup));
    }
}

// ── Match stats (post-match) ──────────────────────────────────

function renderMatchStats(match, espnLineup) {
    if (!espnLineup?.homeStats || !espnLineup?.awayStats) return null;

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

    const rows = MATCH_STAT_KEYS
        .filter(key => homeStats[key] != null && awayStats[key] != null)
        .map(key => {
            const hRaw = homeStats[key];
            const aRaw = awayStats[key];
            const label = STAT_LABEL[key] ? STAT_LABEL[key]() : key;

            const hNum = parseFloat(hRaw) || 0;
            const aNum = parseFloat(aRaw) || 0;
            const total = hNum + aNum;
            let hPct = 50, aPct = 50;
            if (total > 0) {
                hPct = Math.round((hNum / total) * 100);
                aPct = 100 - hPct;
            }

            const fmt = (raw, k) => {
                if (['passPct', 'shotPct', 'crossPct', 'longballPct', 'tacklePct'].includes(k)) {
                    return Math.round(parseFloat(raw) * 100) + '%';
                }
                if (k === 'possessionPct') return parseFloat(raw).toFixed(1) + '%';
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
