const MISSIONS = {
  firesOfRavenMissions: [
    // Chapter 1
    { name: "Illegal Entry", challenge: null },
    {
      name: "Destroy Artillery Installations",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Grid 135 Cleanup",
      challenge:
        "Defeat the Hidden Ghost and complete the mission without using repair kits.",
    },
    {
      name: "Destroy the Transport Helicopters",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without using repair kits.",
    },
    {
      name: "Destroy the Tester AC",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Attack the Dam Complex",
      challenge: "Defeat the Tetrapod MT and Index Dunham.",
    },
    {
      name: "Destroy the Weaponized Mining Ship",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Operation Wallclimber",
      challenge: "Complete the mission without resupplying.",
    },

    // Chapter 2
    {
      name: "Retrieve Combat Logs",
      challenge: "Collect all 8 combat logs and defeat Little Ziyi.",
    },
    {
      name: "Prisoner Rescue",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without letting the helicopter lose more than 10% AP.",
    },
    {
      name: "Investigate BAWS Arsenal No. 2",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Obstruct the Mandatory Inspection",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Attack the Watchpoint",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Infiltrate Grid 086",
      challenge: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs.",
    },
    {
      name: "Eliminate the Doser Faction",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Stop the Secret Data Breach",
      challenge:
        "Complete the mission without letting the hack progress bar go below 60% and without using more than one repair kit.",
    },
    {
      name: "Ocean Crossing",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Steal the Survey Data",
      challenge:
        "Defeat two Tetrapod MTs and complete the mission without resupplying.",
    },

    // Chapter 3
    {
      name: "Attack the Refueling Base",
      challenge:
        "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying.",
    },
    {
      name: "Eliminate V.VII",
      challenge: "Spare V.VII Swinburne and defeat Rokumonsen.",
    },
    {
      name: "Tunnel Sabotage",
      challenge:
        "Defeat the LC during the escape sequence and complete the mission without using repair kits.",
    },
    {
      name: "Prevent Corporate Salvage of New Tech",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Survey the Uninhabited Floating City",
      challenge:
        "Complete the mission without using more than one repair kit and without using the defense drones.",
    },
    {
      name: "Heavy Missile Launch Support",
      challenge: "Do not let any missile be destroyed.",
    },
    {
      name: "Eliminate the Enforcement Squad",
      challenge: "Defeat Ring Freddie.",
    },
    {
      name: "Destroy the Special Forces Craft",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Attack the Old Spaceport",
      challenge:
        "Defeat all 6 stationed LCs and complete the mission without resupplying.",
    },

    // Chapter 4
    {
      name: "Eliminate 'Honest' Brute",
      challenge: "Defeat all 6 Toybox MTs and the Tetrapod MT.",
    },
    {
      name: "Defend the Old Spaceport",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Defend the Dam Complex",
      challenge: "Defeat Chartreuse and King before reinforcements arrive.",
    },
    {
      name: "Historic Data Recovery",
      challenge:
        "Recover all 4 optional logs and complete the mission without using repair kits.",
    },
    {
      name: "Coral Export Denial",
      challenge: "Do not let any Coral transports escape.",
    },
    {
      name: "Destroy the Ice Worm",
      challenge:
        "Complete the mission without firing the Stun Needle Launcher more than 4 times.",
    },
    {
      name: "Underground Exploration - Depth 1",
      challenge:
        "Defeat all 3 sniper Denoisers and complete the mission without using repair kits.",
    },
    {
      name: "Underground Exploration - Depth 2",
      challenge:
        "Defeat all 8 Denoisers in the final control room AFTER turning the power back on.",
    },
    {
      name: "Underground Exploration - Depth 3",
      challenge:
        "Destroy all 12 laser cannons and escape from the reactor before the timer reaches 01:00.",
    },

    // Chapter 5
    {
      name: "Intercept the Redguns",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Ambush the Vespers",
      challenge:
        "Do not let Middle Flatwell be defeated and complete the mission without using more than one repair kit.",
    },
    {
      name: "Eliminate V.III",
      challenge:
        "Do not touch the ground until you defeat V.III O'Keefe and complete the mission without using repair kits.",
    },
    {
      name: "Unknown Territory Survey",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Reach the Coral Convergence",
      challenge: "Defeat all 9 Helianthi and the 2 Weevils.",
    },
    { name: "Escape", challenge: "Defeat at least one Tetrapod MT." },
    {
      name: "Take the Uninhabited Floating City",
      challenge:
        "Do not let the control tower's shield break and do not use the plasma cannons.",
    },
    {
      name: "Intercept the Corporate Forces",
      challenge:
        "Defeat the hidden High-Mobility LC and complete the mission without using more than two repair kits.",
    },
    {
      name: "Breach the Kármán Line",
      challenge:
        "Don't stop Assault Boosting until you destroy the interceptor fleet and complete the mission without using more than one repair kit.",
    },
    {
      name: "Shut Down the Closure Satellites",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    { name: "Eliminate 'Cinder' Carla", challenge: "Defeat V.II Snail." },
    {
      name: "Destroy the Drive Block",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Bring Down the Xylem",
      challenge: "Complete the mission without using more than one repair kit.",
    },
  ],
  liberatorOfRubiconMissions: [
    // Chapter 1
    { name: "Illegal Entry", challenge: null },
    {
      name: "Destroy Artillery Installations",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Grid 135 Cleanup",
      challenge:
        "Defeat the Hidden Ghost and complete the mission without using repair kits.",
    },
    {
      name: "Destroy the Transport Helicopters",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without using repair kits.",
    },
    {
      name: "Destroy the Tester AC",
      challenge: "Complete the mission without using repair kits.",
    },
    { name: "Attack the Dam Complex", challenge: "Accept the RLF's deal." }, // branch choice
    {
      name: "Escort the Weaponized Mining Ship",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Operation Wallclimber",
      challenge: "Complete the mission without resupplying.",
    },

    // Chapter 2
    {
      name: "Retrieve Combat Logs",
      challenge: "Collect all 8 combat logs and defeat Little Ziyi.",
    },
    {
      name: "Prisoner Rescue",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without letting the helicopter lose more than 10% AP.",
    },
    {
      name: "Investigate BAWS Arsenal No. 2",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Obstruct the Mandatory Inspection",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Attack the Watchpoint (Alternate)",
      challenge: "Complete the mission without resupplying.",
    }, // branch choice
    {
      name: "Infiltrate Grid 086",
      challenge: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs.",
    },
    {
      name: "Eliminate the Doser Faction",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Stop the Secret Data Breach",
      challenge:
        "Complete the mission without letting the hack progress bar go below 60% and without using more than one repair kit.",
    },
    {
      name: "Ocean Crossing",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Steal the Survey Data",
      challenge:
        "Defeat two Tetrapod MTs and complete the mission without resupplying.",
    },

    // Chapter 3
    {
      name: "Attack the Refueling Base",
      challenge:
        "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying.",
    },
    {
      name: "Eliminate V.VII",
      challenge: "Spare V.VII Swinburne and defeat Rokumonsen.",
    },
    {
      name: "Tunnel Sabotage",
      challenge:
        "Defeat the LC during the escape sequence and complete the mission without using repair kits.",
    },
    {
      name: "Prevent Corporate Salvage of New Tech",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Survey the Uninhabited Floating City (Alternate)",
      challenge: "Complete the mission without using more than one repair kit.",
    }, // branch choice
    {
      name: "Heavy Missile Launch Support",
      challenge: "Do not let any missile be destroyed.",
    },
    {
      name: "Eliminate the Enforcement Squad",
      challenge: "Defeat Ring Freddie.",
    },
    {
      name: "Destroy the Special Forces Craft",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Attack the Old Spaceport",
      challenge:
        "Defeat all 6 stationed LCs and complete the mission without resupplying.",
    },

    // Chapter 4
    {
      name: "Eliminate 'Honest' Brute",
      challenge: "Defeat all 6 Toybox MTs and the Tetrapod MT.",
    },
    {
      name: "Defend the Old Spaceport",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Defend the Dam Complex",
      challenge: "Defeat Chartreuse and King before reinforcements arrive.",
    },
    {
      name: "Historic Data Recovery",
      challenge:
        "Recover all 4 optional logs and complete the mission without using repair kits.",
    },
    {
      name: "Coral Export Denial",
      challenge: "Do not let any Coral transports escape.",
    },
    {
      name: "Destroy the Ice Worm",
      challenge:
        "Complete the mission without firing the Stun Needle Launcher more than 4 times.",
    },
    {
      name: "Underground Exploration - Depth 1",
      challenge:
        "Defeat all 3 sniper Denoisers and complete the mission without using repair kits.",
    },
    {
      name: "Underground Exploration - Depth 2",
      challenge:
        "Defeat all 8 Denoisers in the final control room AFTER turning the power back on.",
    },
    {
      name: "Underground Exploration - Depth 3",
      challenge:
        "Destroy all 12 laser cannons and escape from the reactor before the timer reaches 01:00.",
    },

    // Chapter 5
    {
      name: "Intercept the Redguns",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Ambush the Vespers",
      challenge:
        "Do not let Middle Flatwell be defeated and complete the mission without using more than one repair kit.",
    },
    {
      name: "Eliminate V.III",
      challenge:
        "Do not touch the ground until you defeat V.III O'Keefe and complete the mission without using repair kits.",
    },
    {
      name: "Unknown Territory Survey (Alternate)",
      challenge: "Complete the mission without using more than one repair kit.",
    }, // branch choice
    {
      name: "Reach the Coral Convergence (Alternate)",
      challenge: "Complete the mission without using more than one repair kit.",
    }, // branch choice
    { name: "Escape", challenge: "Defeat at least one Tetrapod MT." },
    {
      name: "Take the Uninhabited Floating City",
      challenge:
        "Do not let the control tower's shield break and do not use the plasma cannons.",
    },
    {
      name: "Intercept the Corporate Forces",
      challenge:
        "Defeat the hidden High-Mobility LC and complete the mission without using more than two repair kits.",
    },
    {
      name: "Breach the Kármán Line",
      challenge:
        "Don't stop Assault Boosting until you destroy the interceptor fleet and complete the mission without using more than one repair kit.",
    },
    {
      name: "Shut Down the Closure Satellites",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    { name: "Eliminate 'Cinder' Carla", challenge: "Defeat V.II Snail." },
    {
      name: "Destroy the Drive Block",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Regain Control of the Xylem",
      challenge:
        "Defeat all 3 Ghosts and destroy all parasite modules before the timer reaches 02:00.",
    }, // branch choice
  ],
  aleaActaEstMissions: [
    // Chapter 1 - same as Fires of Raven
    { name: "Illegal Entry", challenge: null },
    {
      name: "Destroy Artillery Installations",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Grid 135 Cleanup",
      challenge:
        "Defeat the Hidden Ghost and complete the mission without using repair kits.",
    },
    {
      name: "Destroy the Transport Helicopters",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without using repair kits.",
    },
    {
      name: "Destroy the Tester AC",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Attack the Dam Complex",
      challenge: "Defeat the Tetrapod MT and Index Dunham.",
    },
    {
      name: "Destroy the Weaponized Mining Ship",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Operation Wallclimber",
      challenge: "Complete the mission without resupplying.",
    },

    // Chapter 2
    {
      name: "Retrieve Combat Logs",
      challenge: "Collect all 8 combat logs and defeat Little Ziyi.",
    },
    {
      name: "Prisoner Rescue",
      challenge:
        "Defeat the Tetrapod MT and complete the mission without letting the helicopter lose more than 10% AP.",
    },
    {
      name: "Investigate BAWS Arsenal No. 2",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Obstruct the Mandatory Inspection",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Attack the Watchpoint",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Infiltrate Grid 086",
      challenge: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs.",
    },
    {
      name: "Eliminate the Doser Faction",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Stop the Secret Data Breach",
      challenge:
        "Complete the mission without letting the hack progress bar go below 60% and without using more than one repair kit.",
    },
    {
      name: "Ocean Crossing",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Steal the Survey Data",
      challenge:
        "Defeat two Tetrapod MTs and complete the mission without resupplying.",
    },

    // Chapter 3
    {
      name: "Attack the Refueling Base",
      challenge:
        "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying.",
    },
    {
      name: "Eliminate V.VII",
      challenge: "Spare V.VII Swinburne and defeat Rokumonsen.",
    },
    {
      name: "Tunnel Sabotage",
      challenge:
        "Defeat the LC during the escape sequence and complete the mission without using repair kits.",
    },
    {
      name: "Prevent Corporate Salvage of New Tech",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Survey the Uninhabited Floating City",
      challenge:
        "Complete the mission without using more than one repair kit and without using the defense drones.",
    },
    {
      name: "Heavy Missile Launch Support",
      challenge: "Do not let any missile be destroyed.",
    },
    {
      name: "Eliminate the Enforcement Squad",
      challenge: "Defeat Ring Freddie.",
    },
    {
      name: "Destroy the Special Forces Craft",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Attack the Old Spaceport",
      challenge:
        "Defeat all 6 stationed LCs and complete the mission without resupplying.",
    },

    // Chapter 4
    {
      name: "Eliminate 'Honest' Brute",
      challenge: "Defeat all 6 Toybox MTs and the Tetrapod MT.",
    },
    {
      name: "Defend the Old Spaceport",
      challenge: "Complete the mission without using repair kits.",
    },
    {
      name: "Defend the Dam Complex",
      challenge: "Defeat Chartreuse and King before reinforcements arrive.",
    },
    {
      name: "Historic Data Recovery",
      challenge:
        "Recover all 4 optional logs and complete the mission without using repair kits.",
    },
    {
      name: "Coral Export Denial",
      challenge: "Do not let any Coral transports escape.",
    },
    {
      name: "Destroy the Ice Worm",
      challenge:
        "Complete the mission without firing the Stun Needle Launcher more than 4 times.",
    },
    {
      name: "Underground Exploration - Depth 1",
      challenge:
        "Defeat all 3 sniper Denoisers and complete the mission without using repair kits.",
    },
    {
      name: "Underground Exploration - Depth 2 (Alternate)",
      challenge:
        "Defeat all 8 Denoisers in the final control room AFTER turning the power back on and complete the mission without resupplying more than once.",
    },
    {
      name: "Underground Exploration - Depth 3",
      challenge:
        "Destroy all 12 laser cannons and escape from the reactor before the timer reaches 01:00.",
    },

    // Chapter 5 - NG++ exclusive content
    {
      name: "Intercept the Redguns",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Ambush the Vespers",
      challenge:
        "Do not let Middle Flatwell be defeated and complete the mission without using more than one repair kit.",
    },
    {
      name: "Eliminate V.III",
      challenge:
        "Do not touch the ground until you defeat V.III O'Keefe and complete the mission without using repair kits.",
    },
    {
      name: "Unknown Territory Survey",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    {
      name: "Reach the Coral Convergence",
      challenge: "Defeat all 9 Helianthi and the 2 Weevils.",
    },
    {
      name: "MIA",
      challenge: "Defeat G6 Red and complete the mission without resupplying.",
    }, // NG++ exclusive
    { name: "Escape", challenge: "Defeat at least one Tetrapod MT." },
    {
      name: "Take the Uninhabited Floating City",
      challenge:
        "Do not let the control tower's shield break and do not use the plasma cannons.",
    },
    {
      name: "Intercept the Corporate Forces",
      challenge:
        "Defeat the hidden High-Mobility LC and complete the mission without using more than two repair kits.",
    },
    {
      name: "Breach the Kármán Line",
      challenge:
        "Don't stop Assault Boosting until you destroy the interceptor fleet and complete the mission without using more than one repair kit.",
    },
    {
      name: "Shut Down the Closure Satellites",
      challenge: "Complete the mission without using more than one repair kit.",
    },
    { name: "Eliminate 'Cinder' Carla", challenge: "Defeat V.II Snail." },
    {
      name: "Destroy the Drive Block",
      challenge: "Complete the mission without resupplying.",
    },
    {
      name: "Coral Release",
      challenge:
        "Defeat all 4 MIND ALPHA ACs before the second phase and the 2 Sea Spiders before the final phase.",
    }, // NG++ ending
  ],
};
