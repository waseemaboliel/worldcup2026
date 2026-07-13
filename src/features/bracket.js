import { STATUS_FINISHED, STATUS_LIVE } from '../config/constants.js';
import { t, dateLocale } from '../config/strings.js';
import * as state from '../state.js';
import { countryToFlag, getTeamName, formatKickoff, formatDateHeading } from '../data/helpers.js';
import { activeMatches, showMatchesUI } from '../ui/shell.js';

// ── Dependency Injection ──────────────────────────────────────
// toggleCard and renderMatches come from other feature modules;
// injected via initBracket() to avoid circular imports.

let _toggleCard = null;
let _renderMatches = null;

export function initBracket({ toggleCard, renderMatches }) {
    _toggleCard = toggleCard;
    _renderMatches = renderMatches;
}

// ── Resolve bracket placeholders ──────────────────────────────

function resolvePlaceholder(ph, allMatches) {
    if (!ph) return t('bracketTBD');

    const winnerMatch = ph.match(/^W(\d+)$/);
    if (winnerMatch) {
        const num = parseInt(winnerMatch[1], 10);
        const src = allMatches.find(m => m.MatchNumber === num);
        if (src && src.MatchStatus === STATUS_FINISHED) {
            const hs = src.HomeTeamScore ?? 0, as = src.AwayTeamScore ?? 0;
            if (hs === as) {
                const hp = src.HomeTeamPenaltyScore ?? 0, ap = src.AwayTeamPenaltyScore ?? 0;
                const winner = hp > ap ? src.Home : src.Away;
                return winner ? getTeamName(winner) || ph : ph;
            }
            const winner = hs > as ? src.Home : src.Away;
            return winner ? getTeamName(winner) || ph : ph;
        }
        if (src && src.MatchStatus === STATUS_LIVE) {
            const liveData = state.espnLiveData.get(src.IdMatch);
            const [hs, as] = liveData
                ? liveData.score.split('\u2013').map(s => parseInt(s.trim(), 10) || 0)
                : [src.HomeTeamScore ?? 0, src.AwayTeamScore ?? 0];
            if (hs !== as) {
                const leader = hs > as ? src.Home : src.Away;
                return leader ? `${getTeamName(leader)} \uD83D\uDFE2` : ph;
            }
        }
        if (src) {
            const a = resolvePlaceholder(src.PlaceHolderA, allMatches);
            const b = resolvePlaceholder(src.PlaceHolderB, allMatches);
            return t('bracketWinnerOf', a, b);
        }
        return t('bracketTBD');
    }

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

// ── Build bracket card ────────────────────────────────────────

export function buildBracketCard(match, allMatches) {
    const isFinished = match.MatchStatus === STATUS_FINISHED;
    const isLive = match.MatchStatus === STATUS_LIVE;

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
    const venueStr = [venue, city].filter(Boolean).join(' \u00B7 ');

    const card = document.createElement('article');
    card.className = 'match-card bracket-card' +
        (isFinished ? ' match-card--finished' : '') +
        (isLive ? ' match-card--live' : '');
    card.dataset.matchId = match.IdMatch;

    if (isFinished) {
        const hs = match.HomeTeamScore ?? '';
        const as = match.AwayTeamScore ?? '';
        const pso = (match.HomeTeamPenaltyScore != null && match.AwayTeamPenaltyScore != null)
            ? `<span class="match-pso">(${match.HomeTeamPenaltyScore}\u2013${match.AwayTeamPenaltyScore} ${t('livePSO')})</span>`
            : '';
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
          <span class="match-score">${hs} \u2013 ${as}</span>
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
        const liveData = state.espnLiveData.get(match.IdMatch);
        const score = liveData?.score || `${match.HomeTeamScore ?? 0} \u2013 ${match.AwayTeamScore ?? 0}`;
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

    if (isFinished || isLive) {
        card.addEventListener('click', () => { if (_toggleCard) _toggleCard(card, match); });
    }

    return card;
}

// ── Bracket game (tree node) ──────────────────────────────────

function bracketGameHTML(matchNum, matches) {
    const m = matches.find(x => x.MatchNumber === matchNum);
    if (!m) return `<div class="br-game br-game--empty" data-match="${matchNum}"><div class="br-team"><span class="br-name">${t('bracketTBD')}</span><span class="br-score">\u2013</span></div><div class="br-team"><span class="br-name">${t('bracketTBD')}</span><span class="br-score">\u2013</span></div></div>`;

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

    let homeScore = '\u2013', awayScore = '\u2013';
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
        if (hp >= 0) extraInfo = `<div class="br-pso">${hp}\u2013${ap} ${t('livePSO')}</div>`;
    } else if (isLive) {
        const liveData = state.espnLiveData.get(m.IdMatch);
        if (liveData) {
            const parts = liveData.score.split('\u2013');
            homeScore = parts[0]?.trim() || '0';
            awayScore = parts[1]?.trim() || '0';
        } else {
            homeScore = `${m.HomeTeamScore ?? 0}`;
            awayScore = `${m.AwayTeamScore ?? 0}`;
        }
        statusClass = 'br-game--live';
        const clock = liveData?.clock || m.MatchTime || '';
        extraInfo = `<div class="br-live-info"><span class="br-live-dot">\u25CF</span>${clock}</div>`;
    } else {
        const kickoff = formatKickoff(m.Date);
        const shortDate = new Date(m.Date).toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', timeZone: 'Asia/Jerusalem' });
        extraInfo = `<div class="br-date">${shortDate} \u00B7 ${kickoff}</div>`;
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

// ── Render bracket ────────────────────────────────────────────

export function renderBracket(matches) {
    const main = document.querySelector('.main');

    const knockoutMatches = matches.filter(m => m.IdStage !== '289273');
    if (knockoutMatches.length === 0) {
        main.innerHTML = `<div class="error"><div class="error-icon">\uD83C\uDFC6</div>${t('bracketNotStarted')}</div>`;
        return;
    }

    main.innerHTML = `<div id="bracket-content"></div>`;
    const content = main.querySelector('#bracket-content');
    renderBracketTree(matches, content);
}

// ── Visual tree R16 → QF → SF → Final ────────────────────────

function renderBracketTree(matches, container) {
    const byNum = new Map(matches.map(m => [m.MatchNumber, m]));

    // R32 games ordered to match R16 bracket position:
    // R16 #89 = W74 vs W77, R16 #90 = W73 vs W75, R16 #93 = W83 vs W84, R16 #94 = W81 vs W82
    // R16 #91 = W76 vs W78, R16 #92 = W79 vs W80, R16 #95 = W86 vs W88, R16 #96 = W85 vs W87
    // R16 order in tree: [89, 90, 93, 94, 91, 92, 95, 96]
    // So R32 order: [74,77, 73,75, 83,84, 81,82, 76,78, 79,80, 86,88, 85,87]
    const r32Nums = [74, 77, 73, 75, 83, 84, 81, 82, 76, 78, 79, 80, 86, 88, 85, 87];
    const r32Games = r32Nums.map(n => bracketGameHTML(n, matches)).join('');
    const r16Games = [89, 90, 93, 94, 91, 92, 95, 96].map(n => bracketGameHTML(n, matches)).join('');
    const qfGames = [97, 98, 99, 100].map(n => bracketGameHTML(n, matches)).join('');
    const sfGames = [101, 102].map(n => bracketGameHTML(n, matches)).join('');
    const finalGame = bracketGameHTML(104, matches);
    const thirdGame = bracketGameHTML(103, matches);

    const conn8 = '<div class="br-conn-pair"></div>'.repeat(8);
    const conn4 = '<div class="br-conn-pair"></div>'.repeat(4);
    const conn2 = '<div class="br-conn-pair"></div>'.repeat(2);
    const conn1 = '<div class="br-conn-pair"></div>';

    container.innerHTML = `
    <div class="br-wrap">
      <div class="br-round-labels">
        <div class="br-label">${t('stageR32')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageR16')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageQF')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageSF')}</div>
        <div class="br-label-spacer"></div>
        <div class="br-label">${t('stageFinal')}</div>
      </div>
      <div class="br-bracket">
        <div class="br-round br-round--r32">${r32Games}</div>
        <div class="br-connector-col">${conn8}</div>
        <div class="br-round br-round--r16">${r16Games}</div>
        <div class="br-connector-col">${conn4}</div>
        <div class="br-round br-round--qf">${qfGames}</div>
        <div class="br-connector-col">${conn2}</div>
        <div class="br-round br-round--sf">${sfGames}</div>
        <div class="br-connector-col">${conn1}</div>
        <div class="br-round br-round--final">${finalGame}</div>
      </div>
      <div class="br-third-section">
        <div class="br-third-label">\uD83E\uDD49 ${t('stage3rd')}</div>
        ${thirdGame}
      </div>
    </div>`;

    // Auto-scroll to SF/Final area
    const sfRound = container.querySelector('.br-round--sf');
    if (sfRound) {
        setTimeout(() => {
            sfRound.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }, 150);
    }

    container.querySelectorAll('.br-game[data-match]').forEach(el => {
        const m = byNum.get(parseInt(el.dataset.match, 10));
        if (!m) return;
        if (m.MatchStatus === STATUS_FINISHED || m.MatchStatus === STATUS_LIVE) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => {
                state.setActiveTab('matches');
                document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab--active'));
                document.querySelector('.tab[data-tab="matches"]')?.classList.add('tab--active');
                showMatchesUI(true);
                if (_renderMatches) _renderMatches(activeMatches());
                setTimeout(() => {
                    const card = document.querySelector(`.match-card[data-match-id="${m.IdMatch}"]`);
                    if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.click(); }
                }, 100);
            });
        }
    });
}
