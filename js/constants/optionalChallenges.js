const stage1Challenges = [
    {
        name: "Destroy Artillery Installations",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Grid 135 Cleanup",
        text: "Defeat the Hidden Ghost and complete the mission without using repair kits."
    },
    {
        name: "Destroy the Transport Helicopters",
        text: "Defeat the Tetrapod MT and complete the mission without using repair kits."
    },
    {
        name: "Destroy the Tester AC",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Attack the Dam Complex",
        text: "Defeat the Tetrapod MT and Index Dunham."
    },
    {
        name: "Attack the Dam Complex [ALT]",
        text: "Accept the RLF's deal."
    },
    {
        name: "Destroy the Weaponized Mining Ship",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Escort the Weaponized Mining Ship",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Operation Wallclimber",
        text: "Complete the mission without resupplying."
    }
];

const stage2Challenges = [
    {
        name: "Retrieve Combat Logs",
        text: "Collect all 8 combat logs and defeat Little Ziyi."
    },
    {
        name: "Prisoner Rescue",
        text: "Defeat the Tetrapod MT and complete the mission without letting the helicopter lose more than 10% AP."
    },
    {
        name: "Investigate BAWS Arsenal No. 2",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Obstruct the Mandatory Inspection",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Attack the Watchpoint",
        text: "Complete the mission without resupplying."
    },
    {
        name: "Attack the Watchpoint [ALT]",
        text: "Complete the mission without resupplying."
    },
    {
        name: "Infiltrate Grid 086",
        text: "Defeat Debt-Baron Nosaac and all 3 Tetrapod MTs."
    },
    {
        name: "Eliminate the Doser Faction",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Stop the Secret Data Breach",
        text: "Complete the mission without letting the hack progress bar go below 60% and without using more than one repair kit."
    },
    {
        name: "Ocean Crossing",
        text: "Complete the mission without resupplying."
    },
    {
        name: "Steal the Survey Data",
        text: "Defeat two Tetrapod MTs and complete the mission without resupplying."
    }
];

const stage3Challenges = [
    {
        name: "Attack the Refueling Base",
        text: "Destroy all 16 fuel tanks, defeat all 6 LCs and complete the mission without resupplying."
    },
    {
        name: "Eliminate V.VII",
        text: "Spare V.VII Swinburne and defeat Rokumonsen."
    },
    {
        name: "Tunnel Sabotage",
        text: "Defeat the LC during the escape sequence and complete the mission without using repair kits."
    },
    {
        name: "Prevent Corporate Salvage of New Tech",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Survey the Uninhabited Floating City",
        text: "Complete the mission without using more than one repair kit and without using the defense drones."
    },
    {
        name: "Survey the Uninhabited Floating City [ALT]",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Heavy Missile Launch Support",
        text: "Do not let any missile be destroyed."
    },
    {
        name: "Eliminate the Enforcement Squad",
        text: "Defeat Ring Freddie."
    },
    {
        name: "Destroy the Special Forces Craft",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Attack the Old Spaceport",
        text: "Defeat all 6 stationed LCs and complete the mission without resupplying."
    }
];

const stage4Challenges = [
    {
        name: "Eliminate 'Honest' Brute",
        text: "Defeat all 6 Toybox MTs and the Tetrapod MT."
    },
    {
        name: "Defend the Old Spaceport",
        text: "Complete the mission without using repair kits."
    },
    {
        name: "Defend the Dam Complex",
        text: "Defeat Chartreuse and King before reinforcements arrive."
    },
    {
        name: "Historic Data Recovery",
        text: "Recover all 4 optional logs and complete the mission without using repair kits."
    },
    {
        name: "Coral Export Denial",
        text: "Do not let any Coral transports escape."
    },
    {
        name: "Destroy the Ice Worm",
        text: "Complete the mission without firing the Stun Needle Launcher more than 4 times."
    },
    {
        name: "Underground Exploration - Depth 1",
        text: "Defeat all 3 sniper Denoisers and complete the mission without using repair kits."
    },
    {
        name: "Underground Exploration - Depth 2",
        text: "Defeat all 8 Denoisers in the final control room AFTER turning the power back on."
    },
    {
        name: "Underground Exploration - Depth 2 [ALT]",
        text: "Defeat all 8 Denoisers in the final control room AFTER turning the power back on and complete the mission without resupplying more than once."
    },
    {
        name: "Underground Exploration - Depth 3",
        text: "Destroy all 12 laser cannons and escape from the reactor before the timer reaches 01:00."
    }
];

const stage5Challenges = [
    {
        name: "Intercept the Redguns",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Ambush the Vespers",
        text: "Do not let Middle Flatwell be defeated and complete the mission without using more than one repair kit."
    },
    {
        name: "Eliminate V.III",
        text: "Do not touch the ground until you defeat V.III O'Keefe and complete the mission without using repair kits."
    },
    {
        name: "Unknown Territory Survey",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Unknown Territory Survey [ALT]",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Reach the Coral Convergence",
        text: "Defeat all 9 Helianthi and the 2 Weevils."
    },
    {
        name: "Reach the Coral Convergence [ALT]",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Escape",
        text: "Defeat at least one Tetrapod MT."
    },
    {
        name: "Take the Uninhabited Floating City",
        text: "Do not let the control tower's shield break and do not use the plasma cannons."
    },
    {
        name: "Intercept the Corporate Forces",
        text: "Defeat the hidden High-Mobility LC and complete the mission without using more than two repair kits."
    },
    {
        name: "Breach the Kármán line",
        text: "Don't stop Assault Boosting until you destroy the interceptor fleet and complete the mission without using more than one repair kit."
    },
    {
        name: "Shut Down the Closure Satellites",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "Eliminate 'Cinder' Carla",
        text: "Defeat V.II Snail."
    },
    {
        name: "Destroy the Drive Block",
        text: "Complete the mission without resupplying."
    },
    {
        name: "Bring Down the Xylem",
        text: "Complete the mission without using more than one repair kit."
    },
    {
        name: "MIA",
        text: "Defeat G6 Red and complete the mission without resupplying."
    },
    {
        name: "Regain Control of the Xylem",
        text: "Defeat all 3 Ghosts and destroy all parasite modules before the timer reaches 02:00."
    },
    {
        name: "Coral Release",
        text: "Defeat all 4 MIND ALPHA ACs before the second phase and the 2 Sea Spiders before the final phase."
    }
];
