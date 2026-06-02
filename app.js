// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════
// 16 players: 11 crewmates, 1 sheriff, 1 engineer, 3 impostors
// Missions are distributed so each is covered ~3 times across all players
// 16 missions total

const crewmatesData = [
  { color: { name: 'Violet',     hex: '#9B59B6', body: '#7D3C98' }, missions: [1, 5, 15]   },
  { color: { name: 'Jaune',      hex: '#F1C40F', body: '#B7950B' }, missions: [11, 12, 14] },
  { color: { name: 'Cyan',       hex: '#1ABC9C', body: '#148F77' }, missions: [4, 11, 14]  },
  { color: { name: 'Noir',       hex: '#555566', body: '#333344' }, missions: [12, 15, 16] },
  { color: { name: 'Gris',       hex: '#95A5A6', body: '#717D7E' }, missions: [7, 13, 15]  },
  { color: { name: 'Bleu',       hex: '#2980B9', body: '#1F618D' }, missions: [2, 3, 10]   },
  { color: { name: 'Marron',     hex: '#A04000', body: '#784212' }, missions: [3, 9, 16]   },
  { color: { name: 'Lilas',      hex: '#AF7AC5', body: '#8E44AD' }, missions: [2, 11, 16]  },
  { color: { name: 'Saumon',     hex: '#FA8072', body: '#D86A5C' }, missions: [3, 5, 6]    },
  { color: { name: 'Vert foncé', hex: '#1a6b3a', body: '#145230' }, missions: [7, 8, 10]   },
  { color: { name: 'Bleu nuit',  hex: '#1a3a6b', body: '#122a52' }, missions: [1, 5, 12]   },
];

const impostorsData = [
  { color: { name: 'Bordeaux', hex: '#8B1A1A', body: '#6B1010' }, missions: [4, 6, 8]   },
  { color: { name: 'Cramoisi', hex: '#B22222', body: '#8B1414' }, missions: [1, 13, 14] },
  { color: { name: 'Écarlate', hex: '#CC1100', body: '#990D00' }, missions: [2, 4, 10]  },
];

const sheriffData = {
  color: { name: 'Marron', hex: '#C68642', body: '#A0522D' },
  missions: [7, 9, 13],
};

const engineerData = {
  color: { name: 'Acier', hex: '#4A90D9', body: '#2471A3' },
  missions: [6, 8, 9],
};

// ═══════════════════════════════════════════════════
// SVG CHARACTERS — Style authentique Among Us
// ═══════════════════════════════════════════════════
function crewmateSVG(bodyColor, helmetColor, isImpostor = false, isSheriff = false, isEngineer = false) {
  // Darken body color for shadow
  const shadow = darken(bodyColor, 0.35);
  const highlight = lighten(bodyColor, 0.15);

  // Finger "shhh" for impostor
  const impostorFinger = isImpostor ? `
    <!-- Main devant la visière (chut) -->
    <g transform="translate(42, 38)">
      <!-- Avant-bras -->
      <path d="M 0 8 Q 2 2 5 0 L 10 -2 Q 13 0 12 4 L 10 10 Q 6 12 2 11 Z"
            fill="${bodyColor}" stroke="${shadow}" stroke-width="1"/>
      <!-- Doigt levé -->
      <path d="M 10 -2 L 11 -12 Q 12 -14 13.5 -13 Q 15 -12 14 -10 L 13 -2 Z"
            fill="${bodyColor}" stroke="${shadow}" stroke-width="1"/>
      <!-- Ongle -->
      <ellipse cx="12.5" cy="-11" rx="1" ry="1.5" fill="${shadow}" opacity="0.5"/>
    </g>
  ` : '';

  // Sheriff — chapeau cowboy détaillé + étoile polie sur la poitrine
  const sheriffHat = isSheriff ? `
    <!-- Ombre projetée du chapeau -->
    <ellipse cx="38" cy="23" rx="29" ry="1.8" fill="#000" opacity="0.28"/>
    <!-- Chapeau de cowboy (agrandi) -->
    <g transform="translate(38, 13) scale(1.3)">
      <!-- Bord large incurvé -->
      <path d="M -22 5
               Q -22 3 -18 3
               Q -10 2.8 0 3
               Q 10 2.8 18 3
               Q 22 3 22 5
               Q 22 6.5 18 7
               Q 0 8.5 -18 7
               Q -22 6.5 -22 5 Z"
            fill="#5C2C0F" stroke="#2d1404" stroke-width="0.7"/>
      <!-- Couronne avec creux central (cattleman crease) -->
      <path d="M -10 4
               Q -11 -3 -7 -7
               Q -3 -10 0 -10
               Q 3 -10 7 -7
               Q 11 -3 10 4 Z"
            fill="#7B3D14" stroke="#2d1404" stroke-width="0.7"/>
      <!-- Pince centrale -->
      <path d="M 0 -8 L 0 4" stroke="#3d1d08" stroke-width="0.6" fill="none" opacity="0.7"/>
      <!-- Reflet sur le cuir -->
      <ellipse cx="-3" cy="-4" rx="2.5" ry="1.2" fill="#a26230" opacity="0.55"/>
      <!-- Bande noire avec petite étoile dorée -->
      <rect x="-10" y="2.2" width="20" height="2" fill="#1a0a04"/>
      <polygon points="0,1.6 0.55,2.6 1.6,2.6 0.75,3.2 1.05,4.2 0,3.6 -1.05,4.2 -0.75,3.2 -1.6,2.6 -0.55,2.6"
               fill="#FFD700"/>
    </g>

    <!-- Étoile de shérif (sur la poitrine) -->
    <g transform="translate(38, 72)">
      <!-- Ombre légère -->
      <polygon points="0.4,-6.6 2.1,-1.8 6.7,-1.8 3.1,1.5 4.4,5.8 0.4,3.4 -3.6,5.8 -2.3,1.5 -6.7,-1.8 -2.1,-1.8"
               fill="#000" opacity="0.3"/>
      <!-- Étoile principale -->
      <polygon points="0,-7 1.8,-2.2 6.7,-2.2 2.8,1.1 4.1,5.5 0,3 -4.1,5.5 -2.8,1.1 -6.7,-2.2 -1.8,-2.2"
               fill="#FFD700" stroke="#8B6914" stroke-width="0.6"/>
      <!-- Cercle central -->
      <circle cx="0" cy="0" r="1.6" fill="none" stroke="#8B6914" stroke-width="0.5"/>
      <circle cx="0" cy="0" r="0.5" fill="#8B6914"/>
      <!-- Reflet métallique -->
      <polygon points="-1.7,-3.5 -0.3,-5 0.3,-2.5 -1.4,-1.8" fill="#FFFAF0" opacity="0.7"/>
    </g>
  ` : '';

  // Engineer — casque de chantier + lampe frontale + ceinture à outils
  const engineerTools = isEngineer ? `
    <!-- Ombre projetée du casque -->
    <ellipse cx="38" cy="24" rx="26" ry="1.8" fill="#000" opacity="0.25"/>
    <!-- Casque de chantier (agrandi) -->
    <g transform="translate(38, 14) scale(1.3)">
      <!-- Bord (visière courte) -->
      <ellipse cx="0" cy="4" rx="20" ry="2.5" fill="#FFA000" stroke="#5d3d00" stroke-width="0.7"/>
      <!-- Coque principale -->
      <path d="M -12 4
               Q -12 -3 -9 -7
               Q -4 -10 0 -10
               Q 4 -10 9 -7
               Q 12 -3 12 4 Z"
            fill="#FFC107" stroke="#5d3d00" stroke-width="0.7"/>
      <!-- Crête centrale -->
      <path d="M 0 -10 L 0 3" stroke="#a36800" stroke-width="0.5" fill="none" opacity="0.55"/>
      <!-- Bande blanche réfléchissante -->
      <path d="M -11 1 Q -7 2 0 2 Q 7 2 11 1" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.85"/>
      <!-- Reflet sur la coque -->
      <ellipse cx="-3.5" cy="-4" rx="3" ry="1.5" fill="#FFE082" opacity="0.6"/>
    </g>

    <!-- Lampe frontale (sur la visière, sous le casque) -->
    <g transform="translate(38, 24)">
      <!-- Boîtier -->
      <rect x="-3.5" y="0" width="7" height="2.5" rx="0.7" fill="#2a2a2a" stroke="#0a0a0a" stroke-width="0.4"/>
      <!-- Optique allumée -->
      <circle cx="0" cy="1.2" r="1" fill="#fff8c4"/>
      <!-- Halo lumineux descendant -->
      <ellipse cx="0" cy="4" rx="4" ry="1.5" fill="#fff8c4" opacity="0.35"/>
      <ellipse cx="0" cy="5.5" rx="5.5" ry="1.8" fill="#fff8c4" opacity="0.15"/>
    </g>

    <!-- Ceinture à outils -->
    <g transform="translate(38, 60)">
      <!-- Bande de cuir -->
      <rect x="-16" y="0" width="32" height="3" fill="#5C2C0F" stroke="#2d1404" stroke-width="0.4"/>
      <!-- Boucle métallique au centre -->
      <rect x="-2.5" y="0.3" width="5" height="2.5" fill="#bbb" stroke="#444" stroke-width="0.3"/>
      <rect x="-1.5" y="1" width="3" height="1.2" fill="#666"/>
      <!-- Clé à molette qui pend (côté droit) -->
      <g transform="translate(10, 3)">
        <rect x="-0.8" y="0" width="1.6" height="5" fill="#888" stroke="#444" stroke-width="0.3"/>
        <path d="M -2.2 -0.4 L 2.2 -0.4 L 2.6 1.3 L 1.2 1.3 L 1.2 0.3 L -1.2 0.3 L -1.2 1.3 L -2.6 1.3 Z"
              fill="#aaa" stroke="#444" stroke-width="0.3"/>
      </g>
      <!-- Tournevis qui pend (côté gauche) -->
      <g transform="translate(-10, 3)">
        <rect x="-0.4" y="0" width="0.8" height="4.5" fill="#666"/>
        <rect x="-1.4" y="-1.6" width="2.8" height="2" rx="0.4" fill="#FF6B00" stroke="#7a3300" stroke-width="0.3"/>
      </g>
    </g>
  ` : '';

  return `<svg viewBox="-4 0 84 95" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="body-clip-${bodyColor.replace('#','')}">
        <path d="M 20 28
                 Q 20 14 38 14
                 Q 56 14 56 28
                 L 56 74
                 Q 56 82 48 82
                 L 46 82
                 L 46 87
                 Q 46 89 44 89
                 L 38 89
                 Q 36 89 36 87
                 L 36 82
                 L 30 82
                 L 30 87
                 Q 30 89 28 89
                 L 22 89
                 Q 20 89 20 87
                 L 20 82
                 Z"/>
      </clipPath>
    </defs>

    <!-- OMBRE SOL -->
    <ellipse cx="38" cy="88" rx="20" ry="2" fill="#000" opacity="0.35"/>

    <!-- SAC À DOS (derrière) -->
    <g>
      <path d="M 54 42
               Q 66 42 66 52
               L 66 68
               Q 66 76 58 76
               L 54 76 Z"
            fill="${shadow}" stroke="#000" stroke-width="1.2"/>
      <!-- Détail sac -->
      <rect x="60" y="48" width="4" height="8" fill="${lighten(shadow, 0.1)}" rx="1"/>
    </g>

    <!-- CORPS PRINCIPAL (forme œuf caractéristique) -->
    <path d="M 20 28
             Q 20 14 38 14
             Q 56 14 56 28
             L 56 74
             Q 56 82 48 82
             L 46 82
             L 46 87
             Q 46 89 44 89
             L 38 89
             Q 36 89 36 87
             L 36 82
             L 30 82
             L 30 87
             Q 30 89 28 89
             L 22 89
             Q 20 89 20 87
             L 20 82
             Z"
          fill="${bodyColor}" stroke="#000" stroke-width="1.5"/>

    <!-- HIGHLIGHT (reflet sur le corps) -->
    <path d="M 24 30
             Q 24 18 34 17
             L 30 28
             Q 28 40 28 60
             L 28 80
             L 24 80 Z"
          fill="${highlight}" opacity="0.5" clip-path="url(#body-clip-${bodyColor.replace('#','')})"/>

    <!-- OMBRE CORPS (côté droit) -->
    <path d="M 48 20
             L 56 28
             L 56 74
             Q 56 82 48 82
             L 46 82
             L 46 87
             L 44 87
             Z"
          fill="${shadow}" opacity="0.4" clip-path="url(#body-clip-${bodyColor.replace('#','')})"/>

    <!-- VISIÈRE (forme large et caractéristique) -->
    <g>
      <!-- Contour visière -->
      <path d="M 25 24
               Q 25 19 30 19
               L 48 19
               Q 53 19 53 24
               L 53 34
               Q 53 39 48 39
               L 30 39
               Q 25 39 25 34
               Z"
            fill="#1a3a5a" stroke="#000" stroke-width="1.2"/>
      <!-- Glass -->
      <path d="M 27 24
               Q 27 21 30 21
               L 48 21
               Q 51 21 51 24
               L 51 33
               Q 51 37 48 37
               L 30 37
               Q 27 37 27 33
               Z"
            fill="${helmetColor}"/>
      <!-- Reflet principal -->
      <path d="M 29 24
               Q 29 22 31 22
               L 38 22
               Q 40 22 40 24
               L 40 30
               Q 40 32 38 32
               L 31 32
               Q 29 32 29 30
               Z"
            fill="white" opacity="0.4"/>
      <!-- Petit reflet supplémentaire -->
      <ellipse cx="47" cy="25" rx="2" ry="3" fill="white" opacity="0.6"/>
    </g>

    ${sheriffHat}
    ${engineerTools}
    ${impostorFinger}
  </svg>`;
}

// Helpers: lighten/darken hex color
function darken(hex, amount) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    Math.max(0, Math.floor(r * (1 - amount))),
    Math.max(0, Math.floor(g * (1 - amount))),
    Math.max(0, Math.floor(b * (1 - amount)))
  );
}
function lighten(hex, amount) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    Math.min(255, Math.floor(r + (255 - r) * amount)),
    Math.min(255, Math.floor(g + (255 - g) * amount)),
    Math.min(255, Math.floor(b + (255 - b) * amount))
  );
}
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return [parseInt(hex.substr(0,2),16), parseInt(hex.substr(2,2),16), parseInt(hex.substr(4,2),16)];
}
function rgbToHex(r, g, b) {
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

// ═══════════════════════════════════════════════════
// BUILD CARDS
// ═══════════════════════════════════════════════════
// Explication courte affichee au dos de la carte (apparait au flip).
// Formulee a la 3e personne, sans pronom personnel.
function getRoleExplanation(type) {
  switch (type) {
    case 'crewmate':
      return `Doit terminer toutes les <strong>missions</strong> dans le temps imparti, ou démasquer tous les Impostors.`;
    case 'impostor':
      return `Doit <strong>éliminer</strong> tous les joueurs sans se faire repérer en touchant leur épaule pour gagner. Gagne également si le timer tombe à zéro.`;
    case 'sheriff':
      return `Possède un <strong>fusil avec une seule balle</strong>. Au moindre soupçon il peut l'utiliser.`;
    case 'engineer':
      return `Peut <strong>réparer</strong> une pièce sabotée et <strong>valider une mission</strong> à la place d'un Crewmate mort.`;
    default:
      return '';
  }
}

function buildCard(type, colorObj, missions, extra = '') {
  const typeLabel = { crewmate: 'CREWMATE', impostor: 'IMPOSTOR', sheriff: 'SHERIFF', engineer: 'INGENIEUR' }[type];
  const isImp  = type === 'impostor';
  const isSher = type === 'sheriff';
  const isEng  = type === 'engineer';
  const helmet = '#7FC8E8';
  const svg    = crewmateSVG(colorObj.body, helmet, isImp, isSher, isEng);
  const numsHTML = missions.map(m => `<span class="mission-num">${m}</span>`).join('');

  return `<div class="card ${type}">
    <div class="card-inner">
      <div class="card-face card-front">
        <div class="color-dot" style="background:${colorObj.hex}"></div>
        <div class="card-title">${typeLabel}</div>
        <div class="char-area">${svg}</div>
        <div class="missions">
          <div class="missions-label">${colorObj.name.toUpperCase()} · MISSIONS</div>
          <div class="missions-nums">${numsHTML}</div>
          ${extra ? `<div class="mission-extra">${extra}</div>` : ''}
        </div>
        <div class="card-back-hint"></div>
      </div>
      <div class="card-face card-explain">
        <div class="card-explain-title">${typeLabel}</div>
        <div class="card-explain-text">${getRoleExplanation(type)}</div>
      </div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════
// POPULATE GRIDS
// ═══════════════════════════════════════════════════
function populateGrids() {
  const cfg = getModeConfig(getCurrentMode());

  let g = 0; // index global du joueur (utilise pour la distribution cyclique en 8j/12j)
  const crewCards = crewmatesData.slice(0, cfg.crew).map((c, i) =>
    buildCard('crewmate', c.color, getCardMissions('crewmate', i, cfg, g++))
  );
  const impCards  = impostorsData.slice(0, cfg.imp).map((c, i) =>
    buildCard('impostor', c.color, getCardMissions('impostor', i, cfg, g++))
  );
  const sherCards = cfg.sheriff
    ? [buildCard('sheriff', sheriffData.color, getCardMissions('sheriff', 0, cfg, g++))]
    : [];
  const engCards  = cfg.engineer
    ? [buildCard('engineer', engineerData.color, getCardMissions('engineer', 0, cfg, g++))]
    : [];

  const allCards = [...crewCards, ...impCards, ...sherCards, ...engCards];

  document.getElementById('all-grid').innerHTML     = allCards.join('');
  document.getElementById('crew-grid').innerHTML    = crewCards.join('');
  document.getElementById('imp-grid').innerHTML     = impCards.join('');
  document.getElementById('sheriff-grid').innerHTML = sherCards.join('');
  document.getElementById('eng-grid').innerHTML     = engCards.join('');
}

const BACK_CARD_HTML = `<div class="card-back">
  <div class="back-inner-corner back-tl"></div>
  <div class="back-inner-corner back-tr"></div>
  <div class="card-back-logo card-back-logo-top">AMONG US</div>
  <svg class="card-back-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#ff6b00" opacity="0.08"/>
    <circle cx="50" cy="50" r="38" fill="#ff6b00" opacity="0.12"/>
    <circle cx="50" cy="50" r="30" fill="#ff6b00" opacity="0.18"/>
    <g stroke="#ff6b00" stroke-width="2" opacity="0.5" stroke-linecap="round">
      <line x1="50" y1="6"  x2="50" y2="14"/>
      <line x1="50" y1="86" x2="50" y2="94"/>
      <line x1="6"  y1="50" x2="14" y2="50"/>
      <line x1="86" y1="50" x2="94" y2="50"/>
      <line x1="18" y1="18" x2="24" y2="24"/>
      <line x1="76" y1="76" x2="82" y2="82"/>
      <line x1="82" y1="18" x2="76" y2="24"/>
      <line x1="24" y1="76" x2="18" y2="82"/>
    </g>
    <g transform="translate(50, 54)">
      <path d="M -18 -14 Q -18 -26 0 -26 Q 18 -26 18 -14 L 18 18 Q 18 24 12 24 L 10 24 L 10 30 L 3 30 L 3 24 L -3 24 L -3 30 L -10 30 L -10 24 L -12 24 Q -18 24 -18 18 Z" fill="#1a0800" stroke="#ff6b00" stroke-width="2"/>
      <path d="M 16 -4 Q 25 -4 25 4 L 25 14 Q 25 19 18 19 L 16 19 Z" fill="#1a0800" stroke="#ff6b00" stroke-width="2"/>
      <rect x="-13" y="-21" width="26" height="13" rx="5" fill="#ff6b00"/>
      <rect x="-10" y="-19" width="10" height="7" rx="2" fill="#ffcc88" opacity="0.6"/>
      <rect x="-3" y="-8" width="6" height="5" rx="2" fill="#ff6b00"/>
      <rect x="-1.5" y="-20" width="3" height="12" rx="1.5" fill="#ff6b00"/>
    </g>
  </svg>
  <div class="card-back-logo card-back-logo-bottom">SHHHHHH</div>
  <div class="back-inner-corner back-bl"></div>
  <div class="back-inner-corner back-br"></div>
</div>`;

// ═══════════════════════════════════════════════════
// IMPRESSION RECTO/VERSO — pages alternées pour duplex
// ═══════════════════════════════════════════════════
function buildPrintPages() {
  const container = document.getElementById('print-pages-container');
  if (!container) return;

  const cfg = getModeConfig(getCurrentMode());

  // Collecte des cartes (recto) selon le mode courant
  let g = 0;
  const allCards = [];
  crewmatesData.slice(0, cfg.crew).forEach((c, i) =>
    allCards.push(buildCard('crewmate', c.color, getCardMissions('crewmate', i, cfg, g++)))
  );
  impostorsData.slice(0, cfg.imp).forEach((c, i) =>
    allCards.push(buildCard('impostor', c.color, getCardMissions('impostor', i, cfg, g++)))
  );
  if (cfg.sheriff) {
    allCards.push(buildCard('sheriff', sheriffData.color, getCardMissions('sheriff', 0, cfg, g++)));
  }
  if (cfg.engineer) {
    allCards.push(buildCard('engineer', engineerData.color, getCardMissions('engineer', 0, cfg, g++)));
  }

  const PER_PAGE = 9;
  let html = '';
  let pageNum = 1;

  for (let i = 0; i < allCards.length; i += PER_PAGE) {
    const chunk = allCards.slice(i, i + PER_PAGE);
    // Le verso est toujours rempli (9 dos par page) meme si la derniere page recto
    // n'a que 7 cartes — pour que les bonhommes + SHHHHHH soient presents partout
    const backsForChunk = Array(PER_PAGE).fill(BACK_CARD_HTML).join('');

    // Recto
    html += `
      <div class="print-page recto">
        <div class="print-page-label">RECTO — PAGE ${pageNum} (${chunk.length} cartes)</div>
        <div class="print-grid">${chunk.join('')}</div>
      </div>
    `;
    pageNum++;

    // Verso (toujours 9 dos pour un fond uniforme et des bonhommes partout)
    html += `
      <div class="print-page verso">
        <div class="print-page-label">VERSO — PAGE ${pageNum} (${PER_PAGE} dos)</div>
        <div class="print-grid">${backsForChunk}</div>
      </div>
    `;
    pageNum++;
  }

  container.innerHTML = html;
}

// ═══════════════════════════════════════════════════
// FICHE QUESTS — construction des lignes
// ═══════════════════════════════════════════════════
// Emplacement physique de chaque mission. Le "floor" (etage/RDC) affiche
// dans la fiche quests est derive de DEFIS.color (source de verite), pas
// stocke ici, pour eviter toute divergence avec la couleur du defi.
const MISSIONS_DATA = [
  { id:1,  room:"Salle de danse"      },
  { id:2,  room:"Couloir Haut"        },
  { id:3,  room:"Salle des 3 marches" },
  { id:4,  room:"Salle Hublot"        },
  { id:5,  room:"Couloir Haut"        },
  { id:6,  room:"Salle de danse"      },
  { id:7,  room:"Salle Hublot"        },
  { id:8,  room:"Salle des 3 marches" },
  { id:9,  room:"Couloir Haut"        },
  { id:10, room:"Salle de danse"      },
  { id:11, room:"Couloir Bas"         },
  { id:12, room:"Grande Salle"        },
  { id:13, room:"Cuisine"             },
  { id:14, room:"Info Jeunes"         },
  { id:15, room:"Salle d'attente"     },
  { id:16, room:"Grande Salle"        },
];

// Etat persiste des cases cochees de la fiche quests, indexe par mode.
// Une case = `${mode}|${missionId}|${idx}` ou idx 0..2 = joueur.
const QUEST_PROGRESS_KEY = 'among-us:quest-progress:v1';
function loadQuestProgress() {
  try { return JSON.parse(localStorage.getItem(QUEST_PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}
function saveQuestProgress(state) {
  localStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(state));
}
function questCheckKey(mode, missionId, idx) {
  return `${mode}|${missionId}|${idx}`;
}

// Roster + etat des joueurs vivants/morts en partie, indexe par mode.
// Clef = `${mode}|${rosterId}`. rosterId = identifiant stable de chaque
// personnage (crewmate-i, impostor-i, sheriff, engineer).
const PLAYERS_STATE_KEY = 'among-us:players:v1';
function loadPlayersState() {
  try { return JSON.parse(localStorage.getItem(PLAYERS_STATE_KEY) || '{}'); }
  catch { return {}; }
}
function savePlayersState(state) {
  localStorage.setItem(PLAYERS_STATE_KEY, JSON.stringify(state));
}
function playerKey(mode, id) { return `${mode}|${id}`; }

// Liste ordonnee des personnages du mode courant (couleur + role + id).
function getCurrentRoster() {
  const cfg = getModeConfig(getCurrentMode());
  const r = [];
  crewmatesData.slice(0, cfg.crew).forEach((c, i) => r.push({ id: `crewmate-${i}`, color: c.color, type: 'crewmate' }));
  impostorsData.slice(0, cfg.imp).forEach((c, i) => r.push({ id: `impostor-${i}`, color: c.color, type: 'impostor' }));
  if (cfg.sheriff) r.push({ id: 'sheriff', color: sheriffData.color, type: 'sheriff' });
  if (cfg.engineer) r.push({ id: 'engineer', color: engineerData.color, type: 'engineer' });
  return r;
}

// HTML des trackers BUZZ / SHERIFF / SABOTAGE, place a la fois sous les
// missions (pour le print/mobile) et a la fin du players-panel (pour
// desktop in-game). Le data-tracker permet de synchroniser les jumeaux
// quand on en clique un.
function getTrackersHTML(mode) {
  const sabotage = getSabotageForMode(mode);
  const sabotageCardHTML = sabotage.used
    ? `
      <div class="tracker-card sabotage-card used">
        <div class="tracker-title">SABOTAGE — DÉCLENCHÉ</div>
        <div class="sabotage-used-missions">
          ${sabotage.missions.map(n => `<span class="sabotage-mission-pill">N°${String(n).padStart(2,'0')}</span>`).join('')}
        </div>
      </div>
    `
    : `
      <div class="tracker-card sabotage-card">
        <div class="tracker-title">SABOTAGE (1 max)</div>
        <button type="button" class="sabotage-btn" onclick="triggerSabotage()">Déclencher</button>
      </div>
    `;
  return `
    <div class="tracker-row">
      <div class="tracker-card">
        <div class="tracker-title">BUZZ RESTANTS</div>
        <div class="tracker-circles">
          <div class="tracker-circle" data-tracker="buzz-1"></div>
          <div class="tracker-circle" data-tracker="buzz-2"></div>
          <div class="tracker-circle" data-tracker="buzz-3"></div>
        </div>
      </div>
      <div class="tracker-card">
        <div class="tracker-title">Balle du Shériff</div>
        <div class="tracker-circles"><div class="tracker-circle" data-tracker="sheriff"></div></div>
      </div>
      ${sabotageCardHTML}
    </div>
  `;
}

// HTML du panneau "Joueurs en vie" : compteur + barre + mini-cartes
// (SVG du personnage + nom de couleur) + trackers en bas.
function renderPlayersPanel() {
  const mode = getCurrentMode();
  const state = loadPlayersState();
  const roster = getCurrentRoster();
  const total = roster.length;
  const alive = roster.filter(p => !state[playerKey(mode, p.id)]).length;
  const pct = total ? Math.round((alive / total) * 100) : 0;
  const helmet = '#7FC8E8';
  const cards = roster.map(p => {
    const dead = !!state[playerKey(mode, p.id)];
    const svg = crewmateSVG(
      p.color.body, helmet,
      p.type === 'impostor', p.type === 'sheriff', p.type === 'engineer'
    );
    return `<button type="button"
        class="player-card${dead ? ' dead' : ''}"
        onclick="togglePlayer('${p.id}')"
        title="${p.color.name}${dead ? ' — éliminé' : ''}"
        aria-label="${p.color.name}${dead ? ' éliminé' : ', cliquer pour éliminer'}">
      <span class="player-card-svg">${svg}</span>
      <span class="player-card-name">${p.color.name}</span>
    </button>`;
  }).join('');
  return `
    <div class="players-panel">
      <div class="players-panel-header">
        <span class="players-panel-title">Joueurs en vie</span>
        <span class="players-panel-count">${alive} / ${total}</span>
      </div>
      <div class="players-panel-progress">
        <div class="players-panel-fill" style="width:${pct}%"></div>
      </div>
      <div class="players-list">${cards}</div>
      ${getTrackersHTML(mode)}
    </div>
  `;
}

// Toggle vivant <-> elimine pour un joueur, rebuild le panneau, et
// declenche la verification des deux conditions de fin de partie :
// parite Impostors (defaite) ou tous Impostors elimines (victoire).
function togglePlayer(id) {
  const mode = getCurrentMode();
  const state = loadPlayersState();
  const key = playerKey(mode, id);
  if (state[key]) delete state[key];
  else state[key] = true;
  savePlayersState(state);
  const panel = document.querySelector('#quest-sheet-content .players-panel');
  if (panel) panel.outerHTML = renderPlayersPanel();
  checkImpostorVictory();
  checkCrewmateVictory();
}

// Victoire automatique des Impostors quand ils sont aussi nombreux que
// les autres joueurs vivants (Crewmates / Sheriff / Engineer).
function checkImpostorVictory() {
  const mode = getCurrentMode();
  const state = loadPlayersState();
  const roster = getCurrentRoster();
  const aliveImps = roster.filter(p =>
    p.type === 'impostor' && !state[playerKey(mode, p.id)]
  ).length;
  const aliveOthers = roster.filter(p =>
    p.type !== 'impostor' && !state[playerKey(mode, p.id)]
  ).length;
  if (aliveImps > 0 && aliveImps >= aliveOthers) {
    showDefeat('parity');
  }
}

// Victoire automatique des Crewmates quand tous les Impostors sont elimines.
function checkCrewmateVictory() {
  const mode = getCurrentMode();
  const state = loadPlayersState();
  const roster = getCurrentRoster();
  const totalImps = roster.filter(p => p.type === 'impostor').length;
  const aliveImps = roster.filter(p =>
    p.type === 'impostor' && !state[playerKey(mode, p.id)]
  ).length;
  if (totalImps > 0 && aliveImps === 0) {
    showVictory('impostors-down');
  }
}

// Etat du sabotage global : 1 declenchement max par partie, 3 missions tirees
// aleatoirement et decoche des leurs cases joueurs.
const SABOTAGE_KEY = 'among-us:sabotage:v1';
function loadSabotage() {
  try { return JSON.parse(localStorage.getItem(SABOTAGE_KEY) || '{}'); }
  catch { return {}; }
}
function saveSabotage(state) {
  localStorage.setItem(SABOTAGE_KEY, JSON.stringify(state));
}
function getSabotageForMode(mode) {
  return loadSabotage()[mode] || { used: false, missions: [] };
}
function setSabotageForMode(mode, value) {
  const all = loadSabotage();
  all[mode] = value;
  saveSabotage(all);
}

function buildQuestSheet() {
  const cfg = getModeConfig(getCurrentMode());
  const mode = getCurrentMode();
  const state = loadQuestProgress();
  const filtered = MISSIONS_DATA.filter(m => m.id <= cfg.missions);
  // Pagination par mode :
  //   8j  -> 1 page (8 missions)
  //   12j -> 2 pages de 6
  //   16j -> 2 pages de 8
  let page1, page2;
  if (filtered.length <= 8) {
    page1 = filtered;
    page2 = [];
  } else {
    const half = Math.ceil(filtered.length / 2);
    page1 = filtered.slice(0, half);
    page2 = filtered.slice(half);
  }

  const isChecked = (missionId, idx) => state[questCheckKey(mode, missionId, idx)] ? ' checked' : '';

  const rowHTML = (m) => `
    <div class="quest-row" data-row-mission="${m.id}">
      <div class="quest-row-num ${MISSION_FLOOR_BY_ID[m.id]}">N°${String(m.id).padStart(2,'0')}</div>
      <div class="quest-row-room">${m.room}</div>
      <div class="quest-checkboxes">
        <div class="quest-checkbox${isChecked(m.id, 0)}" data-mission="${m.id}" data-idx="0" title="Joueur 1"></div>
        <div class="quest-checkbox${isChecked(m.id, 1)}" data-mission="${m.id}" data-idx="1" title="Joueur 2"></div>
        <div class="quest-checkbox${isChecked(m.id, 2)}" data-mission="${m.id}" data-idx="2" title="Joueur 3"></div>
      </div>
    </div>
  `;

  const trackersHTML = getTrackersHTML(mode);

  // Les trackers vont toujours sur la derniere page rendue.
  const pageBlockHTML = (rows, withTrackers) => `
    <div class="quest-floor-block">
      <div class="quest-page-header">
        <div class="quest-page-header-title">QUESTS</div>
        <div class="quest-page-header-meta">Cocher les missions au fur et à mesure</div>
      </div>
      <div class="quest-rows">${rows.map(rowHTML).join('')}</div>
      ${withTrackers ? trackersHTML : ''}
    </div>
  `;

  const html = `
    <div class="quest-main">
      <div class="quest-timer-bar">
        <span class="quest-timer-label">⏱ Temps restant</span>
        <span class="quest-timer-display">40:00</span>
        <button type="button" class="quest-timer-btn" onclick="toggleQuestTimer()" title="Lancer / mettre en pause le timer">▶</button>
      </div>
      <div class="quest-progress">
        <div class="quest-progress-label">
          <span class="quest-progress-title">Progression des missions</span>
          <span class="quest-progress-text">0 / 0</span>
        </div>
        <div class="quest-progress-bar">
          <div class="quest-progress-bar-fill" style="width:0%"></div>
        </div>
      </div>
      <div class="quest-victory" style="display:none">
        <div class="quest-victory-title">CREWMATES WIN</div>
        <div class="quest-victory-sub">Toutes les missions ont été terminées</div>
        <button type="button" class="quest-newgame-btn" onclick="newGame()">Nouvelle Partie</button>
      </div>
      <div class="quest-defeat" style="display:none">
        <div class="quest-defeat-title">IMPOSTORS WIN</div>
        <div class="quest-defeat-sub">Le temps est écoulé</div>
        <button type="button" class="quest-newgame-btn red" onclick="newGame()">Nouvelle Partie</button>
      </div>
      ${pageBlockHTML(page1, page2.length === 0)}
      ${page2.length > 0 ? pageBlockHTML(page2, true) : ''}
    </div>
    ${renderPlayersPanel()}
  `;
  document.getElementById('quest-sheet-content').innerHTML = html;
  updateQuestProgress();
  // Les .tracker-circle (BUZZ, SHERIFF) sont dans le HTML regenere : on reattache
  // les listeners et on restaure l'etat coche depuis localStorage.
  if (typeof initTrackers === 'function') initTrackers();
  // Sync immediate du mini-timer apres rebuild (sinon il affiche 40:00 jusqu'au
  // prochain tick de l'interval).
  if (typeof renderTimer === 'function') {
    const remaining = timerEndAt ? Math.max(0, timerEndAt - Date.now())
                     : timerPausedRemaining != null ? timerPausedRemaining
                     : TIMER_DURATION_MS;
    renderTimer(remaining);
  }
  // Si le timer avait expire avant un reload : reaffiche l'overlay defaite
  if (localStorage.getItem(TIMER_EXPIRED_KEY)) {
    const reason = localStorage.getItem(DEFEAT_REASON_KEY) || 'time';
    showDefeat(reason);
  }
  if (localStorage.getItem(VICTORY_KEY)) {
    const reason = localStorage.getItem(VICTORY_REASON_KEY) || 'missions';
    showVictory(reason);
  }
}

// Met à jour la barre (texte + remplissage) selon les cases joueur cochees.
// Declenche la victoire "missions" lorsque toutes les cases sont cochees.
// Une fois la victoire/defaite declenchee, l'overlay reste jusqu'au newGame().
function updateQuestProgress() {
  const content = document.getElementById('quest-sheet-content');
  if (!content) return;
  const playerBoxes = content.querySelectorAll(
    '.quest-checkbox[data-idx="0"], .quest-checkbox[data-idx="1"], .quest-checkbox[data-idx="2"]'
  );
  const total = playerBoxes.length;
  const done  = Array.from(playerBoxes).filter(b => b.classList.contains('checked')).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  const fill = content.querySelector('.quest-progress-bar-fill');
  const text = content.querySelector('.quest-progress-text');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${done} / ${total}`;

  if (total > 0 && done === total && !localStorage.getItem(VICTORY_KEY)) {
    showVictory('missions');
  }
}

// Nouvelle partie : reinitialise progression, sabotage, trackers (BUZZ/SHERIFF)
// et le timer pour le mode courant. Sans confirmation (declenche depuis l'ecran
// de victoire).
function newGame() {
  const mode = getCurrentMode();
  const prefix = `${mode}|`;
  const state = loadQuestProgress();
  Object.keys(state).forEach(k => { if (k.startsWith(prefix)) delete state[k]; });
  saveQuestProgress(state);
  setSabotageForMode(mode, { used: false, missions: [] });
  // Trackers (BUZZ + balle SHERIFF) sont globaux : remise a zero complete
  localStorage.removeItem(TRACKERS_KEY);
  // Joueurs vivants/morts pour ce mode : remise a zero
  const playersState = loadPlayersState();
  Object.keys(playersState).forEach(k => { if (k.startsWith(prefix)) delete playersState[k]; });
  savePlayersState(playersState);
  // Remet le timer a la duree initiale du mode (arrete s'il etait en cours)
  if (typeof resetTimer === 'function') resetTimer();
  localStorage.removeItem(TIMER_EXPIRED_KEY);
  localStorage.removeItem(DEFEAT_REASON_KEY);
  localStorage.removeItem(VICTORY_KEY);
  localStorage.removeItem(VICTORY_REASON_KEY);
  buildQuestSheet();
  if (typeof buildSuiviPrintPages === 'function') buildSuiviPrintPages();
}

// Declenche le sabotage : tire 3 missions au hasard parmi celles du mode courant,
// decoche leurs cases joueurs, marque le sabotage comme utilise (1 max par partie).
function triggerSabotage() {
  const mode = getCurrentMode();
  if (getSabotageForMode(mode).used) return;

  const cfg = getModeConfig(mode);
  const state = loadQuestProgress();
  // Seules les missions ayant au moins 1 case joueur cochee sont sabotables :
  // pas de sens de "saboter" une mission a laquelle personne n'a touche.
  const eligible = MISSIONS_DATA
    .filter(m => m.id <= cfg.missions)
    .map(m => m.id)
    .filter(id => [0, 1, 2].some(idx => state[questCheckKey(mode, id, idx)]));

  if (eligible.length === 0) {
    alert('Aucune mission validée à saboter. Au moins une case joueur doit être cochée.');
    return;
  }

  const targetCount = Math.min(3, eligible.length);
  const picked = [];
  const pool = [...eligible];
  while (picked.length < targetCount && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }

  // Pour chaque mission sabotee : decocher une case parmi celles qui sont cochees,
  // pour garantir un impact reel.
  picked.forEach(missionId => {
    const checkedIdxs = [0, 1, 2].filter(idx => state[questCheckKey(mode, missionId, idx)]);
    if (checkedIdxs.length === 0) return;
    const playerIdx = checkedIdxs[Math.floor(Math.random() * checkedIdxs.length)];
    delete state[questCheckKey(mode, missionId, playerIdx)];
  });
  saveQuestProgress(state);
  setSabotageForMode(mode, { used: true, missions: picked.sort((a, b) => a - b) });

  buildQuestSheet();
  if (typeof buildSuiviPrintPages === 'function') buildSuiviPrintPages();

  // Flash visuel sur les 3 lignes touchees
  setTimeout(() => {
    picked.forEach(id => {
      document.querySelectorAll(`#quest-sheet-content .quest-row[data-row-mission="${id}"]`)
        .forEach(row => {
          row.classList.add('sabotage-flash');
          setTimeout(() => row.classList.remove('sabotage-flash'), 1800);
        });
    });
  }, 50);
}

// Listener delegue : un seul handler sur #quest-sheet-content, qui reagit aux clics
// sur n'importe quelle .quest-checkbox (les enfants sont remplaces a chaque rebuild).
function initQuestSheetListeners() {
  const content = document.getElementById('quest-sheet-content');
  if (!content || content._questListenerAttached) return;
  content.addEventListener('click', (e) => {
    const box = e.target.closest('.quest-checkbox');
    if (!box || !content.contains(box)) return;
    const mission = box.dataset.mission;
    const idx = box.dataset.idx;
    if (mission == null || idx == null) return;
    box.classList.toggle('checked');
    const state = loadQuestProgress();
    const key = questCheckKey(getCurrentMode(), mission, idx);
    if (box.classList.contains('checked')) state[key] = true;
    else delete state[key];
    saveQuestProgress(state);
    updateQuestProgress();
    // Met a jour le clone dans "Suivi a imprimer" pour qu'il reflete l'etat
    if (typeof buildSuiviPrintPages === 'function') buildSuiviPrintPages();
  });
  content._questListenerAttached = true;
}

// ═══════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════
function showTab(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const sect = document.getElementById('tab-' + name);
  if (sect) sect.classList.add('active');
  // Support à la fois l'appel via onclick (event défini) et programmatique
  const btn = (typeof event !== 'undefined' && event && event.currentTarget) ||
              document.querySelector(`.tab-btn[onclick*="'${name}'"]`);
  if (btn && btn.classList) btn.classList.add('active');

  // Cache la nav quand on est sur l'accueil (apparait au clic sur un mode)
  document.body.classList.toggle('on-accueil', name === 'accueil');
}

// Sélection du mode de jeu depuis la page d'accueil
const GAME_MODE_KEY = 'among-us:game-mode:v1';

// ─── SOURCE UNIQUE des modes de jeu ────────────────────────────────────────
// Toute la chaîne (boutons accueil, boutons timer, durée, composition, accent
// de couleur de l'indicateur) dérive de cette constante. Ajouter un mode = une
// seule ligne ici.
//   8j  : 7 crewmates + 1 impostor                                = 8 joueurs
//   12j : 9 crewmates + 2 impostors + 1 sheriff                   = 12 joueurs
//   16j : 11 crewmates + 3 impostors + 1 sheriff + 1 ingenieur    = 16 joueurs
const MODES = {
  8:  { crew: 7,  imp: 1, sheriff: false, engineer: false, missions: 8,  durationMin: 20, accent: 'blue'   },
  12: { crew: 9,  imp: 2, sheriff: true,  engineer: false, missions: 12, durationMin: 30, accent: 'orange' },
  16: { crew: 11, imp: 3, sheriff: true,  engineer: true,  missions: 16, durationMin: 40, accent: 'pink'   },
};
const MODE_NUMBERS = Object.keys(MODES).map(Number);
const DEFAULT_MODE = 16;

function getCurrentMode() {
  const stored = parseInt(localStorage.getItem(GAME_MODE_KEY) || '0', 10);
  return MODE_NUMBERS.includes(stored) ? stored : DEFAULT_MODE;
}

function getModeConfig(mode) {
  return MODES[mode] || MODES[DEFAULT_MODE];
}

// Génère les boutons de sélection de mode (accueil + timer + modal Jouer) depuis MODES.
function renderModeButtons() {
  const home = document.getElementById('accueil-modes');
  if (home) {
    home.innerHTML = MODE_NUMBERS.map(n => {
      const m = MODES[n];
      return `<button class="accueil-mode ${m.accent}" data-mode="${n}" onclick="setGameMode(${n})">
        <span class="amode-num">${n}</span>
        <span class="amode-label">joueurs</span>
        <span class="amode-meta">${m.durationMin} min</span>
      </button>`;
    }).join('');
  }
  const timer = document.getElementById('timer-modes');
  if (timer) {
    timer.innerHTML = MODE_NUMBERS.map(n => {
      const m = MODES[n];
      const activeCls = n === DEFAULT_MODE ? ' active' : '';
      return `<button class="timer-mode-btn ${m.accent}${activeCls}" data-duration="${m.durationMin}" onclick="setTimerMode(${m.durationMin}, this)">${n} joueurs · ${m.durationMin} min</button>`;
    }).join('');
  }
  // Modal "Combien de joueurs ?" au clic sur Jouer : memes visuels, mais
  // chaque bouton lance directement la partie via startGame().
  const playModal = document.getElementById('play-mode-options');
  if (playModal) {
    playModal.innerHTML = MODE_NUMBERS.map(n => {
      const m = MODES[n];
      return `<button class="accueil-mode ${m.accent}" onclick="startGame(${n})">
        <span class="amode-num">${n}</span>
        <span class="amode-label">joueurs</span>
        <span class="amode-meta">${m.durationMin} min</span>
      </button>`;
    }).join('');
  }
  renderSidebarModeSelector();
}

// Selecteur de mode dans la sidebar (visible hors accueil/partie) : permet
// d'explorer les cartes/defis/livret d'un mode different sans lancer la partie.
function renderSidebarModeSelector() {
  const el = document.getElementById('sidebar-mode-selector');
  if (!el) return;
  const current = getCurrentMode();
  el.innerHTML = `
    <span class="sidebar-mode-label">Mode</span>
    <div class="sidebar-mode-buttons">
      ${MODE_NUMBERS.map(n => {
        const m = MODES[n];
        return `<button type="button" class="sidebar-mode-btn ${m.accent}${n === current ? ' active' : ''}" onclick="setExplorationMode(${n})" aria-label="Mode ${n} joueurs">${n}</button>`;
      }).join('')}
    </div>
  `;
}

// Genere 3 missions equitables pour un joueur (decalage N/3 pour eviter les missions consecutives)
// Chaque mission apparait exactement 3 fois sur l'ensemble des N joueurs.
function generateMissionsForPlayer(playerIdx, total) {
  const a = Math.round(total / 3);       // ~ N/3
  const b = Math.round((2 * total) / 3); // ~ 2N/3
  return [
    (playerIdx % total) + 1,
    ((playerIdx + a) % total) + 1,
    ((playerIdx + b) % total) + 1,
  ];
}

// Retourne les missions pour une carte donnee.
//   Mode 16j : utilise les donnees hardcodees (deja parfaitement equilibrees).
//   Modes 8j/12j : distribution cyclique automatique (chaque joueur 3 missions, chaque mission 3x).
function getCardMissions(role, indexInRole, cfg, globalIdx) {
  if (cfg.missions === 16) {
    if (role === 'crewmate') return crewmatesData[indexInRole].missions;
    if (role === 'impostor') return impostorsData[indexInRole].missions;
    if (role === 'sheriff')  return sheriffData.missions;
    if (role === 'engineer') return engineerData.missions;
  }
  return generateMissionsForPlayer(globalIdx, cfg.missions);
}

// Applique un mode sans naviguer ailleurs : persiste, sync timer, re-render
// le contenu mode-dependant. Brique commune a setGameMode / startGame /
// setExplorationMode.
function applyModeNoNav(mode) {
  if (!MODE_NUMBERS.includes(mode)) return false;
  localStorage.setItem(GAME_MODE_KEY, String(mode));
  const minutes = MODES[mode].durationMin;
  if (minutes && typeof setTimerMode === 'function') {
    const btn = document.querySelector(`.timer-mode-btn[data-duration="${minutes}"]`);
    if (btn) setTimerMode(minutes, btn);
  }
  applyGameMode();
  if (typeof renderSidebarModeSelector === 'function') renderSidebarModeSelector();
  return true;
}

function setGameMode(mode) {
  if (applyModeNoNav(mode)) showTab('all');
}

// Change le mode d'exploration depuis le selecteur de la sidebar (hors partie).
// L'utilisateur reste sur la page courante, juste les donnees affichees changent.
function setExplorationMode(mode) {
  applyModeNoNav(mode);
}

// Re-render le contenu mode-dependant + ajuste la nav (Sheriff/Ingenieur visibles ?)
function applyGameMode() {
  const mode = getCurrentMode();
  const cfg = getModeConfig(mode);

  // Classe mode-N sur le body pour les regles CSS specifiques au mode courant
  document.body.classList.remove('mode-8', 'mode-12', 'mode-16');
  document.body.classList.add(`mode-${mode}`);

  // Re-render des contenus dynamiques
  // Ordre important : populateGrids/buildQuestSheet/buildDefis avant buildLivret
  // (buildLivret clone depuis #all-grid, #tab-defis, #tab-quests qui doivent etre a jour)
  if (typeof populateGrids === 'function')        populateGrids();
  if (typeof buildQuestSheet === 'function')      buildQuestSheet();
  if (typeof buildDefis === 'function')           buildDefis();
  if (typeof buildLivret === 'function')          buildLivret();
  if (typeof buildPrintPages === 'function')      buildPrintPages();
  if (typeof buildDefisPrintPages === 'function') buildDefisPrintPages();
  if (typeof buildSuiviPrintPages === 'function') buildSuiviPrintPages();

  // Met a jour l'indicateur de mode (badge flottant top-right)
  const indicator = document.getElementById('mode-indicator');
  if (indicator) {
    const numEl = document.getElementById('mode-num');
    if (numEl) numEl.textContent = String(mode);

    indicator.classList.remove(...MODE_NUMBERS.map(n => `mode-${MODES[n].accent}`));
    const accent = MODES[mode]?.accent;
    if (accent) indicator.classList.add(`mode-${accent}`);

    // Visible seulement si l'utilisateur a explicitement choisi un mode (storage rempli)
    const stored = localStorage.getItem(GAME_MODE_KEY);
    indicator.classList.toggle('visible', !!stored);
  }
}

// Affiche un sous-onglet dans l'onglet Impressions (cards / defis / pancartes)
function showSubTab(id) {
  const wrapper = document.getElementById('tab-impressions');
  if (!wrapper) return;
  wrapper.querySelectorAll('.subtab').forEach(s => s.classList.remove('active'));
  wrapper.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  const btn = wrapper.querySelector(`.subtab-btn[data-target="${id}"]`);
  if (btn) btn.classList.add('active');
}

// Imprime l'onglet "Cartes à imprimer" (ajoute .print-active pour activer le layout print)
function printCardsTab() {
  const tabPrint = document.getElementById('tab-print');
  const wrapper = document.getElementById('tab-impressions');
  if (!tabPrint) return;

  // Neutralise les marges par defaut du browser (sinon elles s'ajoutent au padding CSS)
  let styleEl = document.getElementById('__cards-print-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = '__cards-print-style';
    styleEl.media = 'print';
    styleEl.textContent = `@page { size: A4 portrait; margin: 0 !important; }`;
    document.head.appendChild(styleEl);
  }

  // Le wrapper #tab-impressions doit aussi avoir print-active pour ne pas etre cache
  // par la regle @media print { .section { display: none } }
  if (wrapper) wrapper.classList.add('print-active');
  tabPrint.classList.add('print-active');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      tabPrint.classList.remove('print-active');
      if (wrapper) wrapper.classList.remove('print-active');
    }, 400);
  }, 100);
}

// Imprime l'onglet "Défis à imprimer"
function printDefisTab() {
  const tab = document.getElementById('tab-defis-print');
  const wrapper = document.getElementById('tab-impressions');
  if (!tab) return;

  // Injecte une regle @page pour neutraliser les marges par defaut du browser
  // (sinon le browser ajoute ses propres marges en plus du padding CSS)
  let styleEl = document.getElementById('__defis-print-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = '__defis-print-style';
    styleEl.media = 'print';
    styleEl.textContent = `@page { size: A4 portrait; margin: 0 !important; }`;
    document.head.appendChild(styleEl);
  }

  if (wrapper) wrapper.classList.add('print-active');
  tab.classList.add('print-active');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      tab.classList.remove('print-active');
      if (wrapper) wrapper.classList.remove('print-active');
    }, 400);
  }, 100);
}

// Construit le HTML d'un dos de carte en remplaçant l'orange par une autre couleur
function backCardHTMLColored(color) {
  return BACK_CARD_HTML.replaceAll('#ff6b00', color);
}

// Construit la version imprimable du suivi de partie en clonant la fiche quests
// (deja adaptee au mode courant). Appelee depuis applyGameMode().
function buildSuiviPrintPages() {
  const container = document.getElementById('suivi-print-container');
  const src = document.getElementById('quest-sheet-content');
  if (!container || !src) return;
  container.innerHTML = `<div class="quest-sheet">${src.innerHTML}</div>`;
}

// Imprime l'onglet "Suivi à imprimer"
function printSuiviTab() {
  const tab = document.getElementById('tab-suivi-print');
  const wrapper = document.getElementById('tab-impressions');
  if (!tab) return;
  let styleEl = document.getElementById('__suivi-print-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = '__suivi-print-style';
    styleEl.media = 'print';
    styleEl.textContent = `@page { size: A4 portrait; margin: 0 !important; }`;
    document.head.appendChild(styleEl);
  }
  if (wrapper) wrapper.classList.add('print-active');
  tab.classList.add('print-active');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      tab.classList.remove('print-active');
      if (wrapper) wrapper.classList.remove('print-active');
    }, 400);
  }, 100);
}

// Imprime l'onglet "Pancartes à imprimer"
function printPancartesTab() {
  const tab = document.getElementById('tab-pancartes-print');
  const wrapper = document.getElementById('tab-impressions');
  if (!tab) return;
  let styleEl = document.getElementById('__pancartes-print-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = '__pancartes-print-style';
    styleEl.media = 'print';
    styleEl.textContent = `@page { size: A4 portrait; margin: 0 !important; }`;
    document.head.appendChild(styleEl);
  }
  if (wrapper) wrapper.classList.add('print-active');
  tab.classList.add('print-active');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      tab.classList.remove('print-active');
      if (wrapper) wrapper.classList.remove('print-active');
    }, 400);
  }, 100);
}

// Génère les 2 pages d'impression des pancartes (recto + verso colore)
function buildPancartesPrintPages() {
  const container = document.getElementById('pancartes-print-container');
  if (!container) return;

  const sourceLibre   = document.querySelector('#tab-sabotage .pancarte-big.libre');
  const sourceSabotee = document.querySelector('#tab-sabotage .pancarte-big.sabotee');
  if (!sourceLibre || !sourceSabotee) return;

  const libreHTML   = sourceLibre.outerHTML;
  const saboteeHTML = sourceSabotee.outerHTML;
  const greenBack = backCardHTMLColored('#4cff9d'); // var(--neon-green)
  const redBack   = backCardHTMLColored('#ff3860'); // var(--neon-red)

  container.innerHTML = `
    <div class="print-page pancartes-recto">
      <div class="print-page-label">RECTO PANCARTES</div>
      <div class="pancartes-print-grid">
        ${libreHTML}
        ${saboteeHTML}
      </div>
    </div>
    <div class="print-page pancartes-verso">
      <div class="print-page-label">VERSO PANCARTES</div>
      <div class="pancartes-print-grid">
        <div class="pancarte-back-zone libre">${greenBack}</div>
        <div class="pancarte-back-zone sabotee">${redBack}</div>
      </div>
    </div>
  `;
}

// Génère les pages d'impression des défis (recto/verso, 4 par page)
function buildDefisPrintPages() {
  const container = document.getElementById('defis-print-container');
  if (!container) return;

  const cfg = getModeConfig(getCurrentMode());
  const reds  = DEFIS.filter(d => d.color === 'red'  && d.num <= cfg.missions);
  const blues = DEFIS.filter(d => d.color === 'blue' && d.num <= cfg.missions);
  // Localisations vertes : taches etage + RDC triees par num (memes que l'onglet "Defis" section verte).
  // Le badge floor permet de garder le rendu identique aux defis (ETAGE / RDC).
  const greens = [
    ...TACHES_ETAGE.filter(t => t.num <= cfg.missions).map(t => ({ num: t.num, lieu: t.lieu, floor: 'etage' })),
    ...TACHES_RDC  .filter(t => t.num <= cfg.missions).map(t => ({ num: t.num, lieu: t.lieu, floor: 'rdc'   })),
  ].sort((a, b) => a.num - b.num);
  const PER_PAGE = 4;
  const RED_HEX   = '#ff3860'; // var(--neon-red)
  const BLUE_HEX  = '#6ba6ff'; // var(--neon-blue)
  const GREEN_HEX = '#4cff9d'; // var(--neon-green)

  const defiCardHTML = (d) => `
    <div class="defi-card ${d.color}">
      <div class="defi-header">
        <div class="defi-icon-wrap">${defiIconSVG(d.color)}</div>
        <div class="defi-number">DÉFI N°${String(d.num).padStart(2,'0')}</div>
        <div class="defi-badge">${d.color === 'red' ? 'ÉTAGE' : 'RDC'}</div>
      </div>
      <div class="defi-text">${d.text}</div>
    </div>
  `;

  const lieuCardHTML = (l) => `
    <div class="defi-card green">
      <div class="defi-header">
        <div class="defi-icon-wrap">${defiIconSVG('green')}</div>
        <div class="defi-number">LIEU N°${String(l.num).padStart(2,'0')}</div>
        <div class="defi-badge">${l.floor === 'etage' ? 'ÉTAGE' : 'RDC'}</div>
      </div>
      <div class="defi-text">${l.lieu}</div>
    </div>
  `;

  let html = '';
  let pageNum = 1;

  function buildSet(items, colorClass, hexColor, renderer, itemLabel) {
    let setHtml = '';
    for (let i = 0; i < items.length; i += PER_PAGE) {
      const chunk = items.slice(i, i + PER_PAGE);
      const cards = chunk.map(renderer).join('');
      // Toujours 4 dos par page (uniforme), peu importe le nb de cartes recto
      const backsHTML = Array(PER_PAGE).fill(backCardHTMLColored(hexColor)).join('');

      setHtml += `
        <div class="print-page defi-recto">
          <div class="print-page-label">RECTO ${colorClass.toUpperCase()} — PAGE ${pageNum} (${chunk.length} ${itemLabel}${chunk.length > 1 ? 's' : ''})</div>
          <div class="defi-print-grid">${cards}</div>
        </div>
      `;
      pageNum++;

      setHtml += `
        <div class="print-page defi-verso defi-verso-${colorClass}">
          <div class="print-page-label">VERSO ${colorClass.toUpperCase()} — PAGE ${pageNum}</div>
          <div class="defi-print-grid">${backsHTML}</div>
        </div>
      `;
      pageNum++;
    }
    return setHtml;
  }

  html += buildSet(reds,   'red',   RED_HEX,   defiCardHTML, 'défi');
  html += buildSet(blues,  'blue',  BLUE_HEX,  defiCardHTML, 'défi');
  html += buildSet(greens, 'green', GREEN_HEX, lieuCardHTML, 'lieu');

  container.innerHTML = html;
}


// ═══════════════════════════════════════════════════
// DÉFIS & TÂCHES
// ═══════════════════════════════════════════════════
// DEFIS.color est la SOURCE DE VERITE pour le couple (couleur / etage).
//   red  -> defi etage  -> N° rouge dans la fiche quests, tache zone ETAGE
//   blue -> defi RDC    -> N° bleu  dans la fiche quests, tache zone RDC
const DEFIS = [
  { num:  1, color: "red",  text: "Danse pendant une minute sans t'arrêter, peu importe où tu te trouves." },
  { num:  2, color: "blue", text: "Tu n'as plus le droit de descendre jusqu'à la fin du prochain meeting." },
  { num:  3, color: "red",  text: "Tu dois te déplacer sans faire aucun bruit jusqu'au prochain meeting." },
  { num:  4, color: "red",  text: "Fais la statue devant le Hublot en prenant une drôle de pose pendant 30 secondes. Si quelqu'un te voit, tu dois rester dans cette position jusqu'à ce qu'une autre personne te parle." },
  { num:  5, color: "blue", text: "Tu dois te déplacer en marche arrière jusqu'à la fin du prochain meeting." },
  { num:  6, color: "blue", text: "Suis le joueur le plus proche de toi pendant 10 secondes sans lui expliquer pourquoi." },
  { num:  7, color: "blue", text: "Mets tes chaussures dans tes mains et applaudis dès que tu entres dans une pièce, jusqu'à ce que tu reviennes dans la Grande Salle." },
  { num:  8, color: "red",  text: "Fais 5 pompes immédiatement. Si tu ne peux pas, chante une comptine à la place." },
  { num:  9, color: "red",  text: "Pendant 2 minutes tu dois parler uniquement en chuchotant." },
  { num: 10, color: "red",  text: "Baisse les bras, marche les jambes écartées et dis « suspect » à chaque personne que tu croises, jusqu'au prochain meeting." },
  { num: 11, color: "red",  text: "Tu n'as plus le droit d'aller à l'étage jusqu'à la fin du prochain meeting." },
  { num: 12, color: "blue", text: "Répète tout ce que dit le joueur le plus proche de toi jusqu'au prochain meeting." },
  { num: 13, color: "blue", text: "Raconte une blague à un autre joueur. S'il rit, il lui est interdit de parler jusqu'au prochain meeting." },
  { num: 14, color: "red",  text: "Monte et descends les escaliers 2 fois de suite avant de pouvoir aller où tu veux." },
  { num: 15, color: "blue", text: "Tu dois faire semblant de parler dans un talkie-walkie à chaque fois que tu t'adresses à quelqu'un, jusqu'au prochain meeting. N'oublie pas de dire « Terminé » à la fin de chaque phrase." },
  { num: 16, color: "red",  text: "Interdiction de prononcer le prénom d'un autre joueur. Tu dois inventer un surnom pour chacun jusqu'à la fin de la partie." },
];

// Lookups dérivés : utilisés par la fiche quests et la grille TACHES.
const DEFI_COLOR_BY_NUM = Object.fromEntries(DEFIS.map(d => [d.num, d.color]));
const MISSION_FLOOR_BY_ID = Object.fromEntries(
  DEFIS.map(d => [d.num, d.color === 'red' ? 'etage' : 'rdc'])
);

const TACHES_ETAGE = MISSIONS_DATA.filter(m => MISSION_FLOOR_BY_ID[m.id] === 'etage').map(m => ({ num: m.id, lieu: m.room }));
const TACHES_RDC   = MISSIONS_DATA.filter(m => MISSION_FLOOR_BY_ID[m.id] === 'rdc').map(m => ({ num: m.id, lieu: m.room }));

function defiIconSVG(color) {
  let stroke, fill;
  if (color === "red")        { stroke = "#ff2244"; fill = "#ff224433"; }
  else if (color === "green") { stroke = "#22cc7d"; fill = "#22cc7d33"; }
  else                        { stroke = "#4a9eff"; fill = "#4a9eff33"; }
  return `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M 6 8 Q 6 4 16 4 Q 26 4 26 8 L 26 22 Q 26 26 22 26 L 21 26 L 21 28 L 19 28 L 19 26 L 13 26 L 13 28 L 11 28 L 11 26 L 10 26 Q 6 26 6 22 Z"
          fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
    <rect x="10" y="8" width="12" height="5" rx="2" fill="${stroke}" opacity="0.7"/>
  </svg>`;
}

function buildDefis() {
  const cfg = getModeConfig(getCurrentMode());
  const inMode = (item) => item.num <= cfg.missions;

  const reds  = DEFIS.filter(d => d.color === "red"  && inMode(d));
  const blues = DEFIS.filter(d => d.color === "blue" && inMode(d));

  const cardHTML = (d) => `
    <div class="defi-card ${d.color}">
      <div class="defi-header">
        <div class="defi-icon-wrap">${defiIconSVG(d.color)}</div>
        <div class="defi-number">DÉFI N°${String(d.num).padStart(2,'0')}</div>
        <div class="defi-badge">${d.color === 'red' ? 'ÉTAGE' : 'RDC'}</div>
      </div>
      <div class="defi-text">${d.text}</div>
    </div>
  `;

  document.getElementById("defis-red").innerHTML  = reds.map(cardHTML).join("");
  document.getElementById("defis-blue").innerHTML = blues.map(cardHTML).join("");

  const zoneHTML = (title, icon, items) => `
    <div class="taches-zone">
      <div class="taches-zone-title">${icon} ${title}</div>
      <div class="taches-list">
        ${items.map(t => `
          <div class="tache-item">
            <span class="tache-num">N°${String(t.num).padStart(2,'0')}</span>
            <span class="tache-nom">${t.lieu}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("taches-zones").innerHTML =
    zoneHTML("TÂCHES ÉTAGE", "", TACHES_ETAGE.filter(inMode)) +
    zoneHTML("TÂCHES RDC",   "", TACHES_RDC.filter(inMode));
}

// ═══════════════════════════════════════════════════
// TIMER (40 min) — état persistant via localStorage
// ═══════════════════════════════════════════════════
const TIMER_KEY = 'among-us:timer:v1';
const TIMER_MODE_KEY = 'among-us:timer-mode:v1';
let TIMER_DURATION_MS = 40 * 60 * 1000;  // mis a jour par setTimerMode
let timerInterval = null;
let timerEndAt = null;          // timestamp où le timer atteindra zéro
let timerPausedRemaining = null; // ms restantes quand mis en pause

// Selecteur de mode (8 / 12 / 16 joueurs)
function setTimerMode(minutes, btnEl) {
  // Pas de changement de mode pendant qu'un timer est en cours
  if (timerEndAt) return;

  TIMER_DURATION_MS = minutes * 60 * 1000;
  localStorage.setItem(TIMER_MODE_KEY, String(minutes));

  document.querySelectorAll('.timer-mode-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  // Reset le compte a rebours et l'affichage
  timerPausedRemaining = null;
  saveTimerState();
  renderTimer(TIMER_DURATION_MS);
}

function loadTimerMode() {
  const stored = parseInt(localStorage.getItem(TIMER_MODE_KEY) || '40', 10);
  const minutes = [20, 30, 40].includes(stored) ? stored : 40;
  TIMER_DURATION_MS = minutes * 60 * 1000;
  document.querySelectorAll('.timer-mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.timer-mode-btn[data-duration="${minutes}"]`);
  if (btn) btn.classList.add('active');
}

function loadTimerState() {
  try {
    const s = JSON.parse(localStorage.getItem(TIMER_KEY) || 'null');
    if (s && s.endAt && s.endAt > Date.now()) {
      timerEndAt = s.endAt;
      startTimerInterval();
      requestWakeLock();
    } else if (s && s.paused) {
      timerPausedRemaining = s.paused;
      renderTimer(timerPausedRemaining);
    } else {
      renderTimer(TIMER_DURATION_MS);
    }
  } catch { renderTimer(TIMER_DURATION_MS); }
}
function saveTimerState() {
  if (timerEndAt) localStorage.setItem(TIMER_KEY, JSON.stringify({ endAt: timerEndAt }));
  else if (timerPausedRemaining !== null) localStorage.setItem(TIMER_KEY, JSON.stringify({ paused: timerPausedRemaining }));
  else localStorage.removeItem(TIMER_KEY);
}
function startTimer() {
  const remaining = timerPausedRemaining ?? TIMER_DURATION_MS;
  timerEndAt = Date.now() + remaining;
  timerPausedRemaining = null;
  saveTimerState();
  startTimerInterval();
  requestWakeLock();
}
function pauseTimer() {
  if (!timerEndAt) return;
  timerPausedRemaining = Math.max(0, timerEndAt - Date.now());
  timerEndAt = null;
  clearInterval(timerInterval);
  timerInterval = null;
  saveTimerState();
  renderTimer(timerPausedRemaining);
  releaseWakeLock();
}
function resetTimer() {
  timerEndAt = null;
  timerPausedRemaining = null;
  clearInterval(timerInterval);
  timerInterval = null;
  saveTimerState();
  renderTimer(TIMER_DURATION_MS);
  releaseWakeLock();
}
function startTimerInterval() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const remaining = timerEndAt - Date.now();
    if (remaining <= 0) {
      renderTimer(0);
      clearInterval(timerInterval);
      timerInterval = null;
      timerEndAt = null;
      saveTimerState();
      releaseWakeLock();
      playAlarm();
      // Marque la defaite et affiche l'overlay IMPOSTORS WIN
      showDefeat('time');
    } else {
      renderTimer(remaining);
    }
  }, 250);
  renderTimer(timerEndAt - Date.now());
}

// Cles qui survivent aux rechargements : permettent de re-afficher
// l'overlay victoire/defaite si l'utilisateur recharge la page apres
// la fin de partie sans cliquer "Nouvelle Partie".
const TIMER_EXPIRED_KEY = 'among-us:timer-expired:v1';
const DEFEAT_REASON_KEY = 'among-us:defeat-reason:v1';
const VICTORY_KEY = 'among-us:victory:v1';
const VICTORY_REASON_KEY = 'among-us:victory-reason:v1';

function showDefeat(reason = 'time') {
  localStorage.setItem(TIMER_EXPIRED_KEY, '1');
  localStorage.setItem(DEFEAT_REASON_KEY, reason);
  const defeat = document.querySelector('#quest-sheet-content .quest-defeat');
  if (!defeat) return;
  const sub = defeat.querySelector('.quest-defeat-sub');
  if (sub) {
    sub.textContent = reason === 'parity'
      ? 'Les Impostors sont aussi nombreux que les autres'
      : 'Le temps est écoulé';
  }
  defeat.style.display = 'flex';
}

function showVictory(reason = 'missions') {
  localStorage.setItem(VICTORY_KEY, '1');
  localStorage.setItem(VICTORY_REASON_KEY, reason);
  const content = document.getElementById('quest-sheet-content');
  if (!content) return;
  const victory = content.querySelector('.quest-victory');
  if (!victory) return;
  const sub = victory.querySelector('.quest-victory-sub');
  if (sub) {
    sub.textContent = reason === 'impostors-down'
      ? 'Tous les Impostors ont été éliminés'
      : 'Toutes les missions ont été terminées';
  }
  victory.style.display = 'flex';
  const progress = content.querySelector('.quest-progress');
  if (progress) progress.style.display = 'none';
}
function renderTimer(remainingMs) {
  const totalSec = Math.max(0, Math.ceil(remainingMs / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const text = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  const stateCls = remainingMs <= 0          ? 'finished'
                 : remainingMs <= 60000      ? 'critical'
                 : remainingMs <= 5 * 60000  ? 'warning'
                 : timerEndAt                ? 'running' : '';

  const display = document.getElementById('timer-display');
  if (display) {
    display.textContent = text;
    display.className = 'timer-display';
    if (stateCls) display.classList.add(stateCls);
  }

  // Mini-timer dans la fiche quests (peut etre present plusieurs fois si clone du suivi imprimable)
  document.querySelectorAll('.quest-timer-display').forEach(el => {
    el.textContent = text;
    el.classList.remove('finished', 'critical', 'warning', 'running');
    if (stateCls) el.classList.add(stateCls);
  });
  // Bouton play/pause du mini-timer
  document.querySelectorAll('.quest-timer-btn').forEach(btn => {
    btn.textContent = timerEndAt ? '⏸' : '▶';
  });

  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  if (startBtn && pauseBtn) {
    if (timerEndAt) { startBtn.style.display = 'none'; pauseBtn.style.display = ''; }
    else            { startBtn.style.display = '';     pauseBtn.style.display = 'none'; }
  }
}

// Toggle start/pause depuis le mini-timer de la fiche quests.
function toggleQuestTimer() {
  if (timerEndAt) pauseTimer();
  else            startTimer();
}

// Ouvre le modal "Combien de joueurs ?" : l'utilisateur choisit explicitement
// le nombre de joueurs avant que la partie ne se lance. Le mode "exploration"
// (boutons 8/12/16 de l'accueil) ne lance plus automatiquement la partie.
function playGame() {
  const modal = document.getElementById('play-mode-modal');
  if (modal) modal.style.display = 'flex';
}
function closePlayModal() {
  const modal = document.getElementById('play-mode-modal');
  if (modal) modal.style.display = 'none';
}
// Click hors-zone + ESC ferment le modal.
document.addEventListener('click', e => {
  const modal = document.getElementById('play-mode-modal');
  if (modal && e.target === modal) closePlayModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePlayModal();
});

// Applique le mode choisi puis lance la partie : sidebar et badge caches,
// navigation vers la fiche quests, demarrage du timer.
function startGame(mode) {
  if (!applyModeNoNav(mode)) return;
  closePlayModal();
  document.body.classList.add('in-game');
  setQuestsTitle('Partie en cours');
  showTab('quests');
  if (!timerEndAt) startTimer();
}

// Sort du mode partie : reaffiche la sidebar, retourne a l'accueil.
function exitGame() {
  document.body.classList.remove('in-game');
  setQuestsTitle('Fiche Quests');
  showTab('accueil');
}

// Met a jour le titre de la section quests selon le mode (in-game ou non).
function setQuestsTitle(text) {
  const title = document.querySelector('#tab-quests .section-title');
  if (title) title.textContent = text;
}

// Reinitialise toute la partie en cours sans quitter le mode in-game.
// Memes effets que newGame mais avec confirmation parce que destructif
// alors que la partie peut etre en cours.
function resetCurrentGame() {
  if (!confirm('Réinitialiser toute la partie en cours ?\n(cases cochées, sabotage, BUZZ, balle du SHERIFF, timer)')) return;
  newGame();
}
function playAlarm() {
  // Suite de bips simples via Web Audio API (pas de fichier audio nécessaire)
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [0, 0.4, 0.8].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain).connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      const t = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
      gain.gain.linearRampToValueAtTime(0, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  } catch {}
}

// ═══════════════════════════════════════════════════
// WAKE LOCK — empêche l'écran de s'éteindre pendant la partie
// ═══════════════════════════════════════════════════
let wakeLock = null;
async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    }
  } catch {}
}
function releaseWakeLock() {
  if (wakeLock) { try { wakeLock.release(); } catch {} wakeLock = null; }
}
// Ré-acquérir si l'utilisateur revient sur l'onglet pendant que le timer tourne
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && timerEndAt && !wakeLock) {
    requestWakeLock();
  }
});

// ═══════════════════════════════════════════════════
// OVERLAY PLEIN ÉCRAN (cartes)
// ═══════════════════════════════════════════════════
function showFullscreen(content) {
  const overlay = document.getElementById('fullscreen-overlay');
  if (!overlay) return;
  overlay.querySelector('.fullscreen-content').innerHTML = content;
  overlay.style.display = 'flex';
}
function closeFullscreen() {
  const overlay = document.getElementById('fullscreen-overlay');
  if (overlay) overlay.style.display = 'none';
}
// Click-outside et ESC pour fermer
document.addEventListener('click', e => {
  const overlay = document.getElementById('fullscreen-overlay');
  if (overlay && e.target === overlay) closeFullscreen();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeFullscreen();
});
// Click sur n'importe quelle carte interactive -> flip 3D pour reveler l'explication
// du role au dos. Les cartes en mode impression / dans l'overlay sont ignorees.
function initCardClicks() {
  document.body.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    if (card.closest('.print-page')) return;
    if (card.closest('.fullscreen-content')) return;
    if (card.classList.contains('card-back')) return;
    card.classList.toggle('flipped');
  });
}

// ═══════════════════════════════════════════════════
// TRACKERS CLIQUABLES (Buzz, Sheriff balle, sabotages)
// ═══════════════════════════════════════════════════
const TRACKERS_KEY = 'among-us:trackers:v1';
function loadTrackers() {
  try { return JSON.parse(localStorage.getItem(TRACKERS_KEY) || '{}'); }
  catch { return {}; }
}
function saveTrackers(state) { localStorage.setItem(TRACKERS_KEY, JSON.stringify(state)); }
function initTrackers() {
  const state = loadTrackers();
  document.querySelectorAll('.tracker-circle[data-tracker]').forEach(c => {
    const key = c.dataset.tracker;
    if (state[key]) c.classList.add('used');
    else c.classList.remove('used');
    if (c._trackerListenerAttached) return;
    c._trackerListenerAttached = true;
    c.addEventListener('click', () => {
      const isUsed = !c.classList.contains('used');
      // Sync tous les jumeaux (mobile/desktop in-game ont chacun leur copie)
      document.querySelectorAll(`.tracker-circle[data-tracker="${key}"]`).forEach(twin => {
        twin.classList.toggle('used', isUsed);
      });
      const newState = loadTrackers();
      newState[key] = isUsed;
      saveTrackers(newState);
    });
  });
}


// ═══════════════════════════════════════════════════
// LIVRET — version papier (A5)
// ═══════════════════════════════════════════════════
function buildLivret() {
  const container = document.getElementById('livret-dynamic');
  if (!container) return;

  const cfg = getModeConfig(getCurrentMode());

  // Helper : crée une page livret
  const page = (tag, title, contentHTML, pageNum, extraCls = '') => `
    <div class="livret-page ${extraCls}" id="livret-p${pageNum}">
      <div class="livret-section-tag">${tag}</div>
      <h2 class="livret-h">${title}</h2>
      <div class="livret-content">${contentHTML}</div>
      <div class="livret-page-num">— ${String(pageNum).padStart(2,'0')} —</div>
    </div>
  `;

  // Pagination dynamique : tracker pageNum + collecter les entrées du sommaire
  let html = '';
  let pageNum = 3; // 1=cover, 2=TOC, donc on commence à 3
  const tocEntries = [];
  const addToc = (title, fromPage, toPage) => {
    tocEntries.push({ title, fromPage, toPage: toPage || fromPage });
  };

  // ── Page 3 : Modes de jeu ──
  const modesStart = pageNum;
  html += page('Configuration', 'Modes de jeu', `
    <p style="text-align:left; margin-bottom:4mm">
      Choisir entre <strong>8</strong>, <strong>12</strong> ou <strong>16</strong> joueurs. Adapter le nombre de défis au nombre de joueurs.
    </p>
    <div class="modes-grid">
      <div class="mode-card blue">
        <div class="mode-header">
          <span class="mode-count">8</span>
          <span class="mode-label">joueurs</span>
        </div>
        <div class="mode-meta">20 min</div>
        <ul class="mode-configs">
          <li><strong>Config A</strong>1 Impostor + 7 Crewmates</li>
          <li><strong>Config B</strong>2 Impostors + 6 Crewmates</li>
        </ul>
      </div>
      <div class="mode-card orange">
        <div class="mode-header">
          <span class="mode-count">12</span>
          <span class="mode-label">joueurs</span>
        </div>
        <div class="mode-meta">30 min</div>
        <ul class="mode-configs">
          <li><strong>Config A</strong>2 Impostors + 10 Crewmates</li>
          <li><strong>Config B</strong>3 Impostors + 9 Crewmates</li>
          <li><strong>Config C</strong>2 Imp + 9 Crew + 1 Sheriff</li>
        </ul>
      </div>
      <div class="mode-card highlighted">
        <div class="mode-header">
          <span class="mode-count">16</span>
          <span class="mode-label">joueurs</span>
        </div>
        <div class="mode-meta">40 min</div>
        <ul class="mode-configs">
          <li><strong>Config A</strong>3 Imp + 12 Crew + 1 Sheriff</li>
          <li><strong>Config B</strong>4 Imp + 11 Crew + 1 Sheriff</li>
          <li><strong>Config C</strong>3 Imp + 11 Crew + 1 Sheriff + 1 Ingenieur</li>
        </ul>
      </div>
    </div>
    <div class="mode-note">
      <span>À 8 joueurs : pas de Sheriff ni d'Ingenieur</span>
      <span>À 12 joueurs : Sheriff optionnel</span>
      <span>L'Ingenieur n'existe que dans la version 16 joueurs</span>
    </div>
  `, pageNum++);
  addToc('Modes de jeu', modesStart);

  // ── Pages : Règles du jeu (split en 3 pages) ──
  const rulesStart = pageNum;
  html += page('Chapitre 1', 'Rôles &amp; Mise en place', '<div class="rules-container" id="livret-rules-page-1"></div>', pageNum++);
  addToc('Règles · Rôles &amp; Mise en place', rulesStart);
  html += page('Chapitre 1 · suite', 'Défis &amp; Déroulement',  '<div class="rules-container" id="livret-rules-page-2"></div>', pageNum++);
  addToc('Règles · Défis &amp; Déroulement', rulesStart + 1);
  html += page('Chapitre 1 · fin',   'Morts &amp; Fin de partie', '<div class="rules-container" id="livret-rules-page-3"></div>', pageNum++);
  addToc('Règles · Morts &amp; Fin de partie', rulesStart + 2);

  // ── Page : Règles spéciales (Fantôme + Ingenieur si applicable) ──
  const sabStart = pageNum;
  html += page('Chapitre 2', 'Règles spéciales', '<div class="sabotage-container" id="livret-sabotage-merged"></div>', pageNum++);
  addToc('Règles spéciales', sabStart);

  // ── Pages : Défis étage (rouges) — pagination dynamique selon le mode ──
  const reds = DEFIS.filter(d => d.color === 'red'  && d.num <= cfg.missions);
  const RED_PER_PAGE = 5;
  const redPagesCount = Math.max(1, Math.ceil(reds.length / RED_PER_PAGE));
  const redStart = pageNum;
  for (let p = 0; p < redPagesCount; p++) {
    const tag = p === 0 ? 'Chapitre 3' : 'Chapitre 3 · suite';
    const title = redPagesCount === 1 ? 'Défis · Étage' : `Défis · Étage · ${p+1}/${redPagesCount}`;
    html += page(tag, title, `<div class="defis-grid" id="livret-defis-red-${p+1}"></div>`, pageNum++);
  }
  addToc('Défis étage', redStart, pageNum - 1);

  // ── Pages : Défis RDC (bleus) — pagination dynamique ──
  const blues = DEFIS.filter(d => d.color === 'blue' && d.num <= cfg.missions);
  const BLUE_PER_PAGE = 4;
  const bluePagesCount = Math.max(1, Math.ceil(blues.length / BLUE_PER_PAGE));
  const blueStart = pageNum;
  for (let p = 0; p < bluePagesCount; p++) {
    const tag = (p === bluePagesCount - 1 && bluePagesCount > 1) ? 'Chapitre 3 · fin' : 'Chapitre 3 · suite';
    const title = bluePagesCount === 1 ? 'Défis · RDC' : `Défis · RDC · ${p+1}/${bluePagesCount}`;
    html += page(tag, title, `<div class="defis-grid" id="livret-defis-blue-${p+1}"></div>`, pageNum++);
  }
  addToc('Défis RDC', blueStart, pageNum - 1);

  // ── Page : Localisations des tâches ──
  const locStart = pageNum;
  html += page('Chapitre 4', 'Localisations des tâches', '<div class="taches-grid" id="livret-taches-merged"></div>', pageNum++);
  addToc('Localisations des tâches', locStart);

  // ── Pages : Fiche Quests (1 ou 2 pages selon nb missions) ──
  const questsPagesCount = cfg.missions > 9 ? 2 : 1;
  const questsStart = pageNum;
  for (let p = 0; p < questsPagesCount; p++) {
    const tag = p === 0 ? 'Chapitre 5' : 'Chapitre 5 · suite';
    const title = questsPagesCount === 1 ? 'Fiche Quests' : `Fiche Quests · ${p+1}/${questsPagesCount}`;
    html += page(tag, title, `<div class="quest-sheet" id="livret-quests-${p+1}"></div>`, pageNum++);
  }
  addToc('Fiche Quests', questsStart, pageNum - 1);

  // ── Pages : Cartes de rôles (4 par page, pagination dynamique selon nb cartes) ──
  const allCardsHTML = document.getElementById('all-grid')?.innerHTML || '';
  const totalCards = cfg.crew + cfg.imp + (cfg.sheriff ? 1 : 0) + (cfg.engineer ? 1 : 0);
  const CARDS_PER_PAGE = 4;
  const cardPagesCount = Math.max(1, Math.ceil(totalCards / CARDS_PER_PAGE));
  const cardsStart = pageNum;
  for (let p = 0; p < cardPagesCount; p++) {
    const tag = p === 0 ? 'Chapitre 6' : (p === cardPagesCount - 1 ? 'Chapitre 6 · fin' : 'Chapitre 6 · suite');
    const title = cardPagesCount === 1 ? 'Cartes de rôles' : `Cartes de rôles · ${p+1}/${cardPagesCount}`;
    html += page(tag, title, `<div class="livret-cards-grid livret-cards-grid-${p+1}"></div>`, pageNum++);
  }
  addToc('Cartes de rôles', cardsStart, pageNum - 1);

  container.innerHTML = html;

  // ── Génère le sommaire dynamique ──
  const tocList = document.getElementById('livret-toc-list');
  if (tocList) {
    tocList.innerHTML = tocEntries.map(e => {
      const pageStr = e.fromPage === e.toPage ? `p. ${e.fromPage}` : `p. ${e.fromPage}–${e.toPage}`;
      return `<li><a href="#livret-p${e.fromPage}"><span class="toc-title">${e.title}</span><span class="toc-page">${pageStr}</span></a></li>`;
    }).join('');
  }

  // ── Post-traitement : redistribution des contenus ──

  // 1) RÈGLES : on récupère les 8 sections du #tab-rules et on les répartit
  //    Page 1 : sections 0-1 (Présentation rôles + Mise en place)
  //    Page 2 : sections 2-3 (Défis + Déroulement)
  //    Page 3 : sections 5-6-7 (Morts + Fin + Aide-mémoire MJ)
  //              La section 4 (Sabotages) est exclue : déjà détaillée dans Règles spéciales.
  const tabRules = document.querySelector('#tab-rules');
  if (tabRules) {
    const allSections = Array.from(tabRules.querySelectorAll('.rules-section'));
    const distribute = (targetId, indices) => {
      const target = container.querySelector('#' + targetId);
      if (!target) return;
      indices.forEach(i => {
        if (allSections[i]) target.appendChild(allSections[i].cloneNode(true));
      });
    };
    distribute('livret-rules-page-1', [0, 1]);
    distribute('livret-rules-page-2', [2, 3]);
    distribute('livret-rules-page-3', [5, 6, 7]);
  }

  // 2) QUESTS : pagination dynamique (1 ou 2 pages selon le mode)
  const questsSrc = document.querySelector('#tab-quests .quest-sheet');
  if (questsSrc) {
    const blocks = Array.from(questsSrc.querySelectorAll(':scope > .quest-floor-block'));
    blocks.forEach((b, i) => {
      const target = container.querySelector(`#livret-quests-${i + 1}`);
      if (target) target.appendChild(b.cloneNode(true));
    });
  }

  // 3) LOCALISATIONS : étage + RDC fusionnés sur une seule page (2 colonnes via .taches-grid)
  const tachesSrc = document.getElementById('taches-zones');
  const tachesMerged = container.querySelector('#livret-taches-merged');
  if (tachesSrc && tachesMerged) {
    Array.from(tachesSrc.children).forEach(b => tachesMerged.appendChild(b.cloneNode(true)));
  }

  // 3.5) SABOTAGE : Fantôme + (Ingenieur uniquement si cfg.engineer)
  const sabSrc = document.querySelector('#tab-sabotage .sabotage-container');
  const sabMerged = container.querySelector('#livret-sabotage-merged');
  if (sabSrc && sabMerged) {
    const cards = Array.from(sabSrc.querySelectorAll(':scope > .sabotage-card'));
    cards.forEach(c => {
      // En 8j/12j : on retire la carte Ingénieur (tag cyan) car le rôle n'existe pas
      if (!cfg.engineer && c.querySelector('.tag.cyan')) return;
      sabMerged.appendChild(c.cloneNode(true));
    });
  }

  // 3.6) DÉFIS ÉTAGE : pagination dynamique
  const defisRedSrc = document.getElementById('defis-red');
  if (defisRedSrc) {
    const cards = Array.from(defisRedSrc.querySelectorAll(':scope > .defi-card'));
    for (let p = 0; p < redPagesCount; p++) {
      const target = container.querySelector(`#livret-defis-red-${p + 1}`);
      if (!target) continue;
      cards.slice(p * RED_PER_PAGE, (p + 1) * RED_PER_PAGE).forEach(c =>
        target.appendChild(c.cloneNode(true))
      );
    }
  }

  // 3.7) DÉFIS RDC : pagination dynamique
  const defisBlueSrc = document.getElementById('defis-blue');
  if (defisBlueSrc) {
    const cards = Array.from(defisBlueSrc.querySelectorAll(':scope > .defi-card'));
    for (let p = 0; p < bluePagesCount; p++) {
      const target = container.querySelector(`#livret-defis-blue-${p + 1}`);
      if (!target) continue;
      cards.slice(p * BLUE_PER_PAGE, (p + 1) * BLUE_PER_PAGE).forEach(c =>
        target.appendChild(c.cloneNode(true))
      );
    }
  }

  // 4) CARTES : duplication avec pagination dynamique (4 cartes par page)
  if (allCardsHTML) {
    const tmp = document.createElement('div');
    tmp.innerHTML = allCardsHTML;
    const cards = Array.from(tmp.querySelectorAll('.card'));
    const cardGrids = [];
    for (let p = 0; p < cardPagesCount; p++) {
      cardGrids.push(container.querySelector(`.livret-cards-grid-${p + 1}`));
    }
    for (let i = 0; i < cards.length; i++) {
      const gridIdx = Math.floor(i / CARDS_PER_PAGE);
      if (cardGrids[gridIdx]) cardGrids[gridIdx].appendChild(cards[i].cloneNode(true));
    }
  }
}

function printLivret() {
  // Feuille de style print dediee : on cible directement #livret-book pour
  // que le livret soit imprimable depuis n'importe ou il vit dans le DOM
  // (sous-onglet de tab-impressions apres reorganisation).
  let styleEl = document.getElementById('__livret-print-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = '__livret-print-style';
    styleEl.media = 'print';
    styleEl.textContent = `
      @page { size: 210mm 297mm; margin: 0 !important; }
      html, body { width: 210mm !important; margin: 0 !important; padding: 0 !important; background: #0a0e1a !important; }
      body * { visibility: hidden !important; }
      body.printing-livret #livret-book,
      body.printing-livret #livret-book * { visibility: visible !important; }
      body.printing-livret #livret-book {
        position: absolute !important;
        left: 0 !important; top: 0 !important;
        width: 210mm !important;
        display: block !important;
        gap: 0 !important; margin: 0 !important; padding: 0 !important; max-width: none !important;
      }
      body.printing-livret .livret-page {
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        margin: 0 !important;
        padding: 22mm 20mm 24mm !important;
        box-sizing: border-box !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        overflow: hidden !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        display: block !important;
      }
      body.printing-livret .livret-page.livret-cover {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
      }
      body.printing-livret .livret-page.livret-back-cover {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 14mm !important;
      }
      body.printing-livret .livret-page:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }
      body.printing-livret .livret-toolbar { display: none !important; }
    `;
    document.head.appendChild(styleEl);
  }

  document.body.classList.add('printing-livret');

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-livret');
    }, 300);
  }, 200);
}

// applyGameMode() appelle populateGrids/buildQuestSheet/buildDefis/buildLivret/
// buildPrintPages/buildDefisPrintPages avec filtrage selon le mode courant.
// Injection des regles speciales (clonees depuis #tab-sabotage) dans #tab-rules.
// On garde #tab-sabotage dans le DOM (cache de la sidebar) parce que c'est la
// source des pancartes utilisee par buildPancartesPrintPages.
function injectRulesSpeciales() {
  const anchor = document.getElementById('rules-speciales-anchor');
  const source = document.querySelector('#tab-sabotage .sabotage-container');
  if (!anchor || !source || anchor.hasChildNodes()) return;
  anchor.appendChild(source.cloneNode(true));
}

// Le Livret est integre comme sous-onglet de tab-impressions : on deplace
// son contenu (livret-toolbar + livret-book) depuis #tab-livret au boot.
function moveLivretToImpressions() {
  const target = document.getElementById('tab-livret-print');
  const livretSection = document.getElementById('tab-livret');
  if (!target || !livretSection || target.hasChildNodes()) return;
  const toolbar = livretSection.querySelector('.livret-toolbar');
  const book    = livretSection.querySelector('#livret-book');
  if (toolbar) target.appendChild(toolbar);
  if (book)    target.appendChild(book);
  // La section #tab-livret residuelle (vide + section-title) est cachee
  livretSection.style.display = 'none';
}

injectRulesSpeciales();
moveLivretToImpressions();
renderModeButtons();
applyGameMode();
buildPancartesPrintPages();
initTrackers();
initQuestSheetListeners();
loadTimerMode();
loadTimerState();
initCardClicks();

// Au chargement initial : la classe on-accueil est deja pre-appliquee dans
// le HTML pour eviter un flash entre le rendu initial et le boot JS. On la
// retire si la section active n'est plus l'accueil (cas edge).
if (!document.querySelector('#tab-accueil.active')) {
  document.body.classList.remove('on-accueil');
}
