import { currentLang, t } from '../config/strings.js';
import { countryToFlag, getTeamName } from '../data/helpers.js';
import { shortName } from './helpers.js';

// ── Lineup Pitch Rendering ────────────────────────────────────

/**
 * Lateral sort weight — only for positions where ESPN's abbr encodes
 * lateral placement. CM-R/CM-L and CF-R/CF-L are foot-based role names,
 * not positional, so they fall through to formationPlace ordering.
 */
function lateralOrder(posAbbr) {
    const p = (posAbbr || '').toUpperCase();
    switch (p) {
        case 'LB': case 'LWB': case 'LW': case 'LM': return 0;
        case 'CD-L': case 'CB-L': return 1;
        case 'G': case 'GK': case 'CD': case 'CB':
        case 'DM': case 'CDM': case 'CM': case 'CAM':
        case 'F': case 'ST': case 'CF': case 'SS': return 2;
        case 'CD-R': case 'CB-R': return 3;
        case 'RB': case 'RWB': case 'RW': case 'RM': return 4;
        default: return 2;
    }
}

export function lateralSort(players) {
    return [...players].sort((a, b) => {
        const la = lateralOrder(a.posAbbr), lb = lateralOrder(b.posAbbr);
        if (la !== lb) return la - lb;
        return (b.formationPlace ?? 0) - (a.formationPlace ?? 0);
    });
}

function splitIntoRows(players, sizes, reverseOrder = false) {
    if (sizes.length === 1) return [lateralSort(players)];
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

    const gk = teamData.starters.filter(p => p.position === 0);
    const defs = teamData.starters.filter(p => p.position === 1);
    const mids = teamData.starters.filter(p => p.position === 2);
    const fwds = teamData.starters.filter(p => p.position === 3);

    let defRows = [lateralSort(defs)];
    let midRows = [lateralSort(mids)];
    let fwdRows = [lateralSort(fwds)];

    if (formation) {
        const parts = formation.split('-').map(Number);

        let defSizes = [], defSum = 0, di = 0;
        while (di < parts.length && defSum < defs.length) {
            defSum += parts[di];
            defSizes.push(parts[di]);
            di++;
            if (defSum === defs.length) break;
        }
        let fwdSizes = [], fwdSum = 0, fi = parts.length - 1;
        while (fi >= di && fwdSum < fwds.length) {
            fwdSum += parts[fi];
            fwdSizes.unshift(parts[fi]);
            fi--;
            if (fwdSum === fwds.length) break;
        }
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

    if (!isAway) rowHTMLs.reverse();

    const formationBadge = formation
        ? `<div class="pitch-formation">${formation}</div>`
        : '';

    return isAway
        ? `<div class="pitch-half pitch-half--away">${formationBadge}${rowHTMLs.join('')}</div>`
        : `<div class="pitch-half pitch-half--home">${rowHTMLs.join('')}${formationBadge}</div>`;
}

/**
 * Merge ESPN positional data with FIFA fieldStatus for live sub tracking.
 */
export function mergeFieldStatus(espn, fifa) {
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

/**
 * Render the full lineup section (pitch + subs) as a DOM element.
 */
export function renderLineup(match, espnLineup, fifaLineup) {
    const lineup = espnLineup && fifaLineup
        ? mergeFieldStatus(espnLineup, fifaLineup)
        : espnLineup || fifaLineup;
    if (!lineup) return document.createDocumentFragment();

    const isRtl = currentLang === 'he' || currentLang === 'ar';

    const homeName = getTeamName(match.Home) || '';
    const awayName = getTeamName(match.Away) || '';
    const homeFlag = match.Home ? countryToFlag(match.Home.IdCountry) : '';
    const awayFlag = match.Away ? countryToFlag(match.Away.IdCountry) : '';

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
