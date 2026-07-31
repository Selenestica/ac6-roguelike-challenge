const ARENA_OPPONENTS = {
  // NG1 Records
  f: [
    {
      name: '"Invincible" Rummy',
      rank: 29,
      chips: 2,
      defeated: false,
      arenaRank: "f",
    },
    {
      name: "Index Dunham",
      rank: 28,
      chips: 2,
      defeated: false,
      arenaRank: "f",
    },
    {
      name: "Little Ziyi",
      rank: 24,
      chips: 2,
      defeated: false,
      arenaRank: "f",
    },
  ],
  e: [
    { name: "Nosaac", rank: 26, chips: 2, defeated: false, arenaRank: "e" },
    { name: "G6 Red", rank: 27, chips: 2, defeated: false, arenaRank: "e" },
    {
      name: "V.VI Maeterlinck",
      rank: 25,
      chips: 2,
      defeated: false,
      arenaRank: "e",
    },
    {
      name: "V.VII Swinburne",
      rank: 23,
      chips: 2,
      defeated: false,
      arenaRank: "e",
    },
  ],
  d: [
    {
      name: "G3 Wu Huahai",
      rank: 22,
      chips: 3,
      defeated: false,
      arenaRank: "d",
    },
    {
      name: "Ring Freddie",
      rank: 21,
      chips: 3,
      defeated: false,
      arenaRank: "d",
    },
    {
      name: "V.V Hawkins",
      rank: 20,
      chips: 3,
      defeated: false,
      arenaRank: "d",
    },
    { name: "G5 Iguazu", rank: 19, chips: 3, defeated: false, arenaRank: "d" },
    { name: "Rokumonsen", rank: 18, chips: 3, defeated: false, arenaRank: "d" },
    { name: "G4 Volta", rank: 17, chips: 3, defeated: false, arenaRank: "d" },
  ],
  c: [
    {
      name: "V.VIII Pater",
      rank: 16,
      chips: 3,
      defeated: false,
      arenaRank: "c",
    },
    { name: "Sulla", rank: 15, chips: 3, defeated: false, arenaRank: "c" },
    {
      name: '"Chatty" Stick',
      rank: 14,
      chips: 3,
      defeated: false,
      arenaRank: "c",
    },
    {
      name: "Middle Flatwell",
      rank: 13,
      chips: 3,
      defeated: false,
      arenaRank: "c",
    },
  ],
  b: [
    {
      name: "V.III O'Keeffe",
      rank: 12,
      chips: 4,
      defeated: false,
      arenaRank: "b",
    },
    {
      name: '"Cinder" Carla',
      rank: 11,
      chips: 4,
      defeated: false,
      arenaRank: "b",
    },
    { name: "Coldcall", rank: 10, chips: 4, defeated: false, arenaRank: "b" },
    { name: "V.IV Rusty", rank: 9, chips: 4, defeated: false, arenaRank: "b" },
    {
      name: '"Honest" Brute',
      rank: 8,
      chips: 4,
      defeated: false,
      arenaRank: "b",
    },
  ],
  a: [
    { name: "G2 Nile", rank: 7, chips: 4, defeated: false, arenaRank: "a" },
    { name: "V.II Snail", rank: 6, chips: 4, defeated: false, arenaRank: "a" },
    { name: "Chartreuse", rank: 5, chips: 4, defeated: false, arenaRank: "a" },
    {
      name: "Thumb Dolmayan",
      rank: 4,
      chips: 4,
      defeated: false,
      arenaRank: "a",
    },
    { name: "King", rank: 3, chips: 6, defeated: false, arenaRank: "a" },
  ],
  s: [
    { name: "G1 Michigan", rank: 2, chips: 6, defeated: false, arenaRank: "s" },
    { name: "V.I Freud", rank: 1, chips: 6, defeated: false, arenaRank: "s" },
  ],

  // NG+ Analysis — Phase α (8 chips each)
  analysisAlpha: [
    {
      name: "Integration Subject 51-001 K",
      ac: "MIND ALPHA",
      phase: "α-1",
      chips: 8,
      defeated: false,
      arenaRank: "analysisAlpha",
    },
    {
      name: "Analysis Subject 51-011 AL",
      ac: "TRAINER",
      phase: "α-2",
      chips: 8,
      defeated: false,
      arenaRank: "analysisAlpha",
    },
    {
      name: "Analysis Subject 51-012 AL",
      ac: "TESTER",
      phase: "α-3",
      chips: 8,
      defeated: false,
      arenaRank: "analysisAlpha",
    },
  ],

  // NG+ Analysis — Phase β (10 chips each)
  analysisBeta: [
    {
      name: "Integration Subject 51-002 K",
      ac: "MIND BETA",
      phase: "β-1",
      chips: 10,
      defeated: false,
      arenaRank: "analysisBeta",
    },
    {
      name: "Analysis Subject 51-013 BE",
      ac: "CORPORATION",
      phase: "β-2",
      chips: 10,
      defeated: false,
      arenaRank: "analysisBeta",
    },
    {
      name: "Analysis Subject 51-014 BE",
      ac: "RUBICONIAN",
      phase: "β-3",
      chips: 10,
      defeated: false,
      arenaRank: "analysisBeta",
    },
  ],

  // NG+ Analysis — Phase γ (15 chips each)
  analysisGamma: [
    {
      name: "Integration Subject 51-003 K",
      ac: "MIND GAMMA",
      phase: "γ-1",
      chips: 15,
      defeated: false,
      arenaRank: "analysisGamma",
    },
    {
      name: "Analysis Subject 51-015 GA",
      ac: "INSTITUTE",
      phase: "γ-2",
      chips: 15,
      defeated: false,
      arenaRank: "analysisGamma",
    },
    {
      name: "Analysis Subject 51-016 GA",
      ac: "NIGHTFALL",
      phase: "γ-3",
      chips: 15,
      defeated: false,
      arenaRank: "analysisGamma",
    },
  ],

  // NG++ Analysis — Phase δ (no chips, NG++ only)
  analysisDelta: [
    {
      name: "Classified Subject 51-101 R",
      ac: "STEEL HAZE ORTUS",
      phase: "δ-1",
      chips: 0,
      defeated: false,
      arenaRank: "analysisDelta",
    },
    {
      name: "Classified Subject 51-201 W",
      ac: "IB-C03: HAL 826",
      phase: "δ-2",
      chips: 0,
      defeated: false,
      arenaRank: "analysisDelta",
    },
    {
      name: "Classified Subject: ------ -",
      ac: '"------"',
      phase: "δ-3",
      chips: 0,
      defeated: false,
      arenaRank: "analysisDelta",
    },
  ],
};
