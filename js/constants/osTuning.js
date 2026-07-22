const OS_TUNING = {
  // System Unlocks
  boostKick: {
    name: "Boost Kick",
    description:
      "Unlocks the ability to perform a Boost Kick. Combines the speed of an Assault Boost with the sheer weight of the AC.",
    category: "systemUnlocks",
    upgrades: [{ cost: 1, unlocked: false, label: "Unlocks: Boost Kick" }],
  },
  weaponBay: {
    name: "Weapon Bay",
    description:
      "Allows shoulder weapons to be replaced with additional hand weapons.",
    category: "systemUnlocks",
    upgrades: [{ cost: 2, unlocked: false, label: "Unlocks: Weapon Bay" }],
  },
  weightControl: {
    name: "Weight Control",
    description:
      "Unlocks the ability to sortie when overburdened and manually purge weapons.",
    category: "systemUnlocks",
    upgrades: [{ cost: 3, unlocked: false, label: "Unlocks: Weight Control" }],
  },
  manualAiming: {
    name: "Manual Aiming",
    description:
      "Unlocks the ability to perform manual aiming with manual reticle control.",
    category: "systemUnlocks",
    upgrades: [{ cost: 2, unlocked: false, label: "Unlocks: Manual Aiming" }],
  },
  quickTurn: {
    name: "Quick Turn",
    description:
      "Allows the AC to perform snap turns to side or rear directions.",
    category: "systemUnlocks",
    upgrades: [{ cost: 1, unlocked: false, label: "Unlocks: Quick Turn" }],
  },

  // Core Expansions
  assaultArmor: {
    name: "Assault Armor",
    description:
      "Creates a pulse explosion centered on the AC, canceling incoming fire and creating a damaging shockwave.",
    category: "coreExpansions",
    upgrades: [
      { cost: 1, unlocked: false, label: "Unlocks: Assault Armor" },
      { cost: 3, unlocked: false, label: "Additional Charges: Assault Armor" },
      { cost: 5, unlocked: false, label: "Additional Charges: Assault Armor" },
    ],
  },
  pulseArmor: {
    name: "Pulse Armor",
    description:
      "Creates a pulse barrier that trails the AC, dramatically increasing defensive performance.",
    category: "coreExpansions",
    upgrades: [
      { cost: 3, unlocked: false, label: "Unlocks: Pulse Armor" },
      { cost: 5, unlocked: false, label: "Additional Charges: Pulse Armor" },
    ],
  },
  pulseProtection: {
    name: "Pulse Protection",
    description:
      "Creates a pulse barrier in a fixed position, providing cover from enemy fire.",
    category: "coreExpansions",
    upgrades: [
      { cost: 2, unlocked: false, label: "Unlocks: Pulse Protection" },
      {
        cost: 3,
        unlocked: false,
        label: "Additional Charges: Pulse Protection",
      },
      {
        cost: 4,
        unlocked: false,
        label: "Additional Charges: Pulse Protection",
      },
    ],
  },
  terminalArmor: {
    name: "Terminal Armor",
    description:
      "Automatically triggers a pulse barrier when the AC's AP reaches its limit.",
    category: "coreExpansions",
    upgrades: [{ cost: 5, unlocked: false, label: "Unlocks: Terminal Armor" }],
  },

  // Attack Control
  kineticWeapons: {
    name: "Kinetic Weapons — Fire Control Tuning",
    description:
      "Enhances all sources of kinetic damage, excluding melee weapons.",
    category: "attackControl",
    upgrades: [
      { cost: 2, unlocked: false, label: "Kinetic Damage: +3%" },
      { cost: 3, unlocked: false, label: "Kinetic Damage: +6%" },
      { cost: 4, unlocked: false, label: "Kinetic Damage: +9%" },
      { cost: 5, unlocked: false, label: "Kinetic Damage: +12%" },
      { cost: 7, unlocked: false, label: "Kinetic Damage: +15%" },
    ],
  },
  explosiveWeapons: {
    name: "Explosive Weapons — Fuse Control Tuning",
    description:
      "Enhances all sources of explosive damage, excluding melee weapons.",
    category: "attackControl",
    upgrades: [
      { cost: 2, unlocked: false, label: "Explosive Damage: +3%" },
      { cost: 3, unlocked: false, label: "Explosive Damage: +6%" },
      { cost: 4, unlocked: false, label: "Explosive Damage: +9%" },
      { cost: 5, unlocked: false, label: "Explosive Damage: +12%" },
      { cost: 7, unlocked: false, label: "Explosive Damage: +15%" },
    ],
  },
  energyWeapons: {
    name: "Energy Weapons — Output Control Tuning",
    description:
      "Enhances all sources of energy damage, excluding melee weapons.",
    category: "attackControl",
    upgrades: [
      { cost: 2, unlocked: false, label: "Energy Damage: +3%" },
      { cost: 3, unlocked: false, label: "Energy Damage: +6%" },
      { cost: 4, unlocked: false, label: "Energy Damage: +9%" },
      { cost: 5, unlocked: false, label: "Energy Damage: +12%" },
      { cost: 7, unlocked: false, label: "Energy Damage: +15%" },
    ],
  },
  meleeWeapons: {
    name: "Melee Weapons — Drive Control Tuning",
    description: "Enhances all sources of melee damage.",
    category: "attackControl",
    upgrades: [
      { cost: 3, unlocked: false, label: "Melee Weapon Damage: +5%" },
      { cost: 5, unlocked: false, label: "Melee Weapon Damage: +10%" },
      { cost: 7, unlocked: false, label: "Melee Weapon Damage: +15%" },
    ],
  },
  directHitModifier: {
    name: "Direct Hit Modifier — Damage Tuning",
    description:
      "Increases damage dealt by direct hits against staggered enemies.",
    category: "attackControl",
    upgrades: [
      { cost: 4, unlocked: false, label: "Direct Hit Damage: +5%" },
      { cost: 6, unlocked: false, label: "Direct Hit Damage: +10%" },
      { cost: 8, unlocked: false, label: "Direct Hit Damage: +15%" },
    ],
  },
  accessSpeed: {
    name: "Access Speed — Optimization",
    description: "Improves hacking and override functionality speed.",
    category: "attackControl",
    upgrades: [
      { cost: 2, unlocked: false, label: "Access Speed: +50%" },
      { cost: 4, unlocked: false, label: "Access Speed: +100%" },
    ],
  },

  // Damage Control
  acsDynamicDeflection: {
    name: "ACS — Dynamic Deflection Control Tuning",
    description: "Reduces damage received from enemy attacks.",
    category: "damageControl",
    upgrades: [
      { cost: 2, unlocked: false, label: "Damage Mitigation: +3%" },
      { cost: 4, unlocked: false, label: "Damage Mitigation: +6%" },
      { cost: 6, unlocked: false, label: "Damage Mitigation: +9%" },
      { cost: 8, unlocked: false, label: "Damage Mitigation: +12%" },
      { cost: 10, unlocked: false, label: "Damage Mitigation: +15%" },
    ],
  },
  repairKits: {
    name: "Repair Kits — Optimization",
    description: "Boosts the effectiveness of Repair Kits.",
    category: "damageControl",
    upgrades: [
      { cost: 3, unlocked: false, label: "Repair Kit Effectiveness: +500" },
      { cost: 5, unlocked: false, label: "Repair Kit Effectiveness: +1000" },
      { cost: 7, unlocked: false, label: "Repair Kit Effectiveness: +1500" },
      { cost: 10, unlocked: false, label: "Repair Kit Effectiveness: +2000" },
    ],
  },
};
