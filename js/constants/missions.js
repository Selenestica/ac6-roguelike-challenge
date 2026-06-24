const MISSIONS = {
  firesOfRavenMissions: [
    // Chapter 1
    {
      name: "Destroy Artillery Installations",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Grid 135 Cleanup",
      challenge:
        "Defeat the Hidden Ghost and complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Transport Helicopters",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Tester AC",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Attack the Dam Complex",
      challenge: "Defeat the Tetrapod MT and Index Dunham.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Weaponized Mining Ship",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Operation Wallclimber",
      challenge: "Complete the mission without resupplying.",
      chapter: 1,
      ostChipReward: 1, // reward for halfway point of long chapter
    },
    {
      name: "Retrieve Combat Logs",
      challenge: "Collect all 8 combat logs and defeat Little Ziyi.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Investigate BAWS Arsenal No. 2",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Attack the Watchpoint",
      challenge: "Complete the mission without resupplying.",
      chapter: 1,
      ostChipReward: 2,
    },

    // chapter 2
    {
      name: "Infiltrate Grid 086",
      challenge: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs.",
      chapter: 2,
      ostChipReward: null,
    },
    {
      name: "Eliminate the Doser Faction",
      challenge: "Complete the mission without using repair kits.",
      chapter: 2,
      ostChipReward: null,
    },
    {
      name: "Ocean Crossing",
      challenge: "Complete the mission without resupplying.",
      chapter: 2,
      ostChipReward: 4,
    },

    // chapter 3
    {
      name: "Steal the Survey Data",
      challenge:
        "Defeat two Tetrapod MTs and complete the mission without resupplying.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Attack the Refueling Base",
      challenge:
        "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Eliminate V.VII",
      challenge: "Spare V.VII Swinburne and defeat Rokumonsen.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Tunnel Sabotage",
      challenge: "Defeat the LC during the escape sequence.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Prevent Corporate Salvage of New Tech",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Survey the Uninhabited Floating City",
      challenge:
        "Complete the mission without using more than one repair kit and without using the defense drones.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Heavy Missile Launch Support",
      challenge: "Do not let any missile be destroyed.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Destroy the Special Forces Craft",
      challenge: "Complete the mission without using repair kits.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Attack the Old Spaceport",
      challenge:
        "Defeat all 6 stationed LCs and don't let Rusty be defeated in combat.",
      chapter: 3,
      ostChipReward: 1, // since this is a long chapter, give a reward for completing the halfwayish point
    },
    {
      name: "Eliminate 'Honest' Brute",
      challenge: "Defeat all 6 Toybox MTs and the Tetrapod MT.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Defend the Old Spaceport",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Historic Data Recovery",
      challenge:
        "Recover all 4 optional logs and complete the mission without using repair kits.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Destroy the Ice Worm",
      challenge:
        "Complete the mission without firing the Stun Needle Launcher more than 4 times.",
      chapter: 3,
      ostChipReward: 6,
    },

    // chapter 4
    {
      name: "Underground Exploration - Depth 1",
      challenge: "Complete the mission without using repair kits.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Underground Exploration - Depth 2",
      challenge: "Complete the mission without resupplying more than once.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Underground Exploration - Depth 3",
      challenge: "Escape from the reactor before the timer reaches 01:00.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Ambush the Vespers",
      challenge:
        "Do not let Middle Flatwell be defeated and complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Unknown Territory Survey",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Reach the Coral Convergence",
      challenge: "Defeat all 9 Helianthi and the 2 Weevils.",
      chapter: 4,
      ostChipReward: 8,
    },

    // chapter 5
    {
      name: "Escape",
      challenge: "Defeat at least one Tetrapod MT.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Take the Uninhabited Floating City",
      challenge:
        "Do not let the control tower's shield break and do not use the plasma cannons.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Intercept the Corporate Forces",
      challenge:
        "Defeat the hidden High-Mobility LC and complete the mission without using more than two repair kits.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Breach the Kármán Line",
      challenge:
        "Don't use any repair kits until the interceptor fleet is destroyed.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Shut Down the Closure Satellites",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 5,
      ostChipReward: 10,
    },
  ],

  liberatorOfRubiconMissions: [
    // Chapter 1
    {
      name: "Destroy Artillery Installations",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Grid 135 Cleanup",
      challenge:
        "Defeat the Hidden Ghost and complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Transport Helicopters",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Tester AC",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Attack the Dam Complex [ALT]",
      challenge: "Accept the RLF's deal.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Escort the Weaponized Mining Ship",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Operation Wallclimber",
      challenge: "Complete the mission without resupplying.",
      chapter: 1,
      ostChipReward: 1, // reward for halfway point
    },
    {
      name: "Prisoner Rescue",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without letting the helicopter lose more than 10% AP.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Investigate BAWS Arsenal No. 2",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Attack the Watchpoint",
      challenge: "Complete the mission without resupplying.",
      chapter: 1,
      ostChipReward: 2,
    },

    // chapter 2
    {
      name: "Infiltrate Grid 086",
      challenge: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs.",
      chapter: 2,
      ostChipReward: null,
    },
    {
      name: "Eliminate the Doser Faction",
      challenge: "Complete the mission without using repair kits.",
      chapter: 2,
      ostChipReward: null,
    },
    {
      name: "Ocean Crossing",
      challenge: "Complete the mission without resupplying.",
      chapter: 2,
      ostChipReward: 4,
    },

    // chapter 3
    {
      name: "Steal the Survey Data",
      challenge:
        "Defeat two Tetrapod MTs and complete the mission without resupplying.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Eliminate V.VII",
      challenge:
        "Execute Swinburne with a single attack during or after your negotiation with him.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Attack the Refueling Base",
      challenge:
        "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Prevent Corporate Salvage of New Tech",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Survey the Uninhabited Floating City",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Heavy Missile Launch Support",
      challenge: "Do not let any missile be destroyed.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Destroy the Special Forces Craft",
      challenge: "Complete the mission without using repair kits.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Attack the Old Spaceport",
      challenge:
        "Defeat all 6 stationed LCs and don't let Rusty be defeated in combat.",
      chapter: 3,
      ostChipReward: 1, // mid chapter reward
    },
    {
      name: "Eliminate 'Honest' Brute",
      challenge: "Defeat all 6 Toybox MTs and the Tetrapod MT.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Historic Data Recovery",
      challenge:
        "Recover all 4 optional logs and complete the mission without using repair kits.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Defend the Dam Complex",
      challenge: "Defeat Chartreuse and King before reinforcements arrive.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Destroy the Ice Worm",
      challenge:
        "Complete the mission without firing the Stun Needle Launcher more than 4 times.",
      chapter: 3,
      ostChipReward: 6,
    },

    // chapter 4
    {
      name: "Underground Exploration - Depth 1",
      challenge: "Complete the mission without using repair kits.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Underground Exploration - Depth 2",
      challenge: "Complete the mission without resupplying more than once.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Underground Exploration - Depth 3",
      challenge: "Escape from the reactor before the timer reaches 01:00.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Ambush the Vespers",
      challenge:
        "Do not let Middle Flatwell be defeated and complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Unknown Territory Survey",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Reach the Coral Convergence",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: 8,
    },

    // chapter 5
    {
      name: "Escape",
      challenge: "Defeat at least one Tetrapod MT.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Take the Uninhabited Floating City",
      challenge:
        "Do not let the control tower's shield break and do not use the plasma cannons.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Eliminate 'Cinder' Carla",
      challenge: "Defeat V.II Snail.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Destroy the Drive Block",
      challenge:
        "Destroy the Tetrapod MT and the Smart Cleaner without using any repair kits.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Bring Down the Xylem",
      challenge: "Complete the mission without using repair kits.",
      chapter: 5,
      ostChipReward: 10,
    },
  ],

  aleaIactaEstMissions: [
    // Chapter 1
    {
      name: "Destroy Artillery Installations",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Grid 135 Cleanup",
      challenge:
        "Defeat the Hidden Ghost and complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Transport Helicopters",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Destroy the Tester AC",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Attack the Dam Complex [ALT]",
      challenge: "Accept the RLF's deal.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Escort the Weaponized Mining Ship",
      challenge: "Complete the mission without using repair kits.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Operation Wallclimber",
      challenge: "Complete the mission without resupplying.",
      chapter: 1,
      ostChipReward: 1, // mid chapter reward
    },
    {
      name: "Prisoner Rescue",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without letting the helicopter lose more than 10% AP.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Obstruct the Mandatory Inspection",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 1,
      ostChipReward: null,
    },
    {
      name: "Attack the Watchpoint",
      challenge: "Complete the mission without resupplying.",
      chapter: 1,
      ostChipReward: 2,
    },

    // chapter 2
    {
      name: "Infiltrate Grid 086",
      challenge: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs.",
      chapter: 2,
      ostChipReward: null,
    },
    {
      name: "Stop the Secret Data Breach",
      challenge:
        "Complete the mission without letting the hack progress bar go below 60% and without using more than one repair kit.",
      chapter: 2,
      ostChipReward: null,
    },
    {
      name: "Ocean Crossing",
      challenge: "Complete the mission without resupplying.",
      chapter: 2,
      ostChipReward: 4,
    },

    // chapter 3
    {
      name: "Steal the Survey Data",
      challenge:
        "Defeat two Tetrapod MTs and complete the mission without resupplying.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Attack the Refueling Base",
      challenge:
        "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Eliminate V.VII",
      challenge: "Spare V.VII Swinburne and defeat Rokumonsen.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Prevent Corporate Salvage of New Tech",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Survey the Uninhabited Floating City [ALT]",
      challenge:
        "Complete the mission without using more than one repair kit and without using the defense drones.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Heavy Missile Launch Support",
      challenge: "Do not let any missile be destroyed.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Eliminate the Enforcement Squad",
      challenge: "Defeat Ring Freddie.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Attack the Old Spaceport",
      challenge:
        "Defeat all 6 stationed LCs and don't let Rusty be defeated in combat.",
      chapter: 3,
      ostChipReward: 1, // mid chapter reward
    },
    {
      name: "Eliminate 'Honest' Brute",
      challenge: "Defeat all 6 Toybox MTs and the Tetrapod MT.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Defend the Dam Complex",
      challenge: "Defeat Chartreuse and King before reinforcements arrive.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Coral Export Denial",
      challenge: "Do not let any Coral transports escape.",
      chapter: 3,
      ostChipReward: null,
    },
    {
      name: "Destroy the Ice Worm",
      challenge:
        "Complete the mission without firing the Stun Needle Launcher more than 4 times.",
      chapter: 3,
      ostChipReward: 6,
    },

    // chapter 4
    {
      name: "Underground Exploration - Depth 1",
      challenge: "Complete the mission without using repair kits.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Underground Exploration - Depth 2 [ALT]",
      challenge:
        "Defeat all 8 Denoisers in the final control room AFTER turning the power back on and complete the mission without resupplying more than once.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Underground Exploration - Depth 3",
      challenge: "Escape from the reactor before the timer reaches 01:00.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Eliminate V.III",
      challenge:
        "Do not touch the ground until you defeat V.III O'Keefe and complete the mission without using repair kits.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Unknown Territory Survey [ALT]",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: null,
    },
    {
      name: "Reach the Coral Convergence [ALT]",
      challenge: "Complete the mission without using more than one repair kit.",
      chapter: 4,
      ostChipReward: 8,
    },

    // chapter 5
    {
      name: "MIA",
      challenge: "Defeat G6 Red and complete the mission without resupplying.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Regain Control of the Xylem",
      challenge: "Complete the mission without using any repair kits.",
      chapter: 5,
      ostChipReward: null,
    },
    {
      name: "Coral Release",
      challenge:
        "Defeat all 4 MIND ALPHA ACs before the second phase and the 2 Sea Spiders before the final phase.",
      chapter: 5,
      ostChipReward: 10,
    },
  ],
};
