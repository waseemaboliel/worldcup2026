import { STATUS_FINISHED, STATUS_LIVE, STAGE_LABEL } from '../config/constants.js';
import { t, dateLocale } from '../config/strings.js';
import * as state from '../state.js';
import { countryToFlag, getTeamName, formatKickoff } from '../data/helpers.js';
import { espnLineupCache } from '../data/espn-lineup.js';
import { buildEspnStatsCache, espnMatchDetailsCache } from '../data/espn-stats.js';

// ── Player Profile ────────────────────────────────────────────

export function buildPlayerProfile(playerName, matches) {
    const profile = { name: playerName, flag: '', teamName: '', goals: 0, assists: 0, yellowCards: 0, redCards: 0, ownGoals: 0, shots: 0, shotsOnTarget: 0, saves: 0, fouls: 0, offsides: 0, events: [] };
    const lowerName = playerName.toLowerCase();

    // 1) Get aggregate stats from ESPN stats cache
    if (state.espnStatsCache?.playerMap) {
        for (const [, p] of state.espnStatsCache.playerMap) {
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
        const matchLabel = `${homeFlag} ${homeName} ${match.HomeTeamScore}\u2013${match.AwayTeamScore} ${awayFlag} ${awayName}`;
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

export async function openPlayerProfile(playerName, matches) {
    document.getElementById('player-profile-overlay')?.remove();

    await buildEspnStatsCache(matches);

    const profile = buildPlayerProfile(playerName, matches);

    const overlay = document.createElement('div');
    overlay.id = 'player-profile-overlay';
    overlay.className = 'profile-overlay';

    const EVENT_ICONS = { goal: '\u26BD', assist: '\uD83C\uDFAF', yellow: '\uD83D\uDFE8', red: '\uD83D\uDFE5' };

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
    let touchStartY = 0;
    overlay.querySelector('.profile-card').addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    overlay.querySelector('.profile-card').addEventListener('touchend', e => { if (e.changedTouches[0].clientY - touchStartY > 80) close(); }, { passive: true });
}

// ── Team Profile ──────────────────────────────────────────────

export function openTeamProfile(teamId, matches) {
    document.getElementById('team-profile-overlay')?.remove();

    const teamMatches = matches.filter(m =>
        m.Home?.IdTeam === teamId || m.Away?.IdTeam === teamId
    ).sort((a, b) => new Date(a.Date) - new Date(b.Date));

    if (teamMatches.length === 0) return;

    const ref = teamMatches[0];
    const teamObj = ref.Home?.IdTeam === teamId ? ref.Home : ref.Away;
    const teamFlag = countryToFlag(teamObj.IdCountry);
    const teamName = getTeamName(teamObj) || '?';

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
        const oppFlag = opp ? countryToFlag(opp.IdCountry) : '\uD83C\uDFF3\uFE0F';
        const oppName = opp ? (getTeamName(opp) || '?') : '?';
        const date = new Date(m.Date).toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', timeZone: 'Asia/Jerusalem' });

        let scoreStr = '', resultClass = '';
        if (m.MatchStatus === STATUS_FINISHED) {
            const tf = isHome ? m.HomeTeamScore : m.AwayTeamScore;
            const ta = isHome ? m.AwayTeamScore : m.HomeTeamScore;
            scoreStr = `${tf}\u2013${ta}`;
            resultClass = tf > ta ? 'team-match-w' : tf === ta ? 'team-match-d' : 'team-match-l';
        } else if (m.MatchStatus === STATUS_LIVE) {
            const liveData = state.espnLiveData.get(m.IdMatch);
            const [hs, as] = liveData ? liveData.score.split('\u2013').map(s => parseInt(s.trim(), 10) || 0) : [0, 0];
            const tf = isHome ? hs : as;
            const ta = isHome ? as : hs;
            scoreStr = `${tf}\u2013${ta} \uD83D\uDFE2`;
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
        <span class="team-match-stage">${stageBadge} \u00B7 ${date}</span>
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
