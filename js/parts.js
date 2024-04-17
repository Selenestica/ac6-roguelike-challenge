const s_tier_parts = [
    "R-Arm Unit: VP-66EG Stun Gun",
    "R-Arm Unit: IA-C01W6: NB-REDSHIFT Coral Rifle",
    "R-Arm Unit: IB-C03W1: WLT 011 Coral Rifle",
    "R-Arm Unit: 44-142 KRSV Multi Energy Rifle",
    "R-Arm Unit: WS-5000 APERITIF Siege Missile Launcher",
    "L-Arm Unit: Vvc-774LS Laser Slicer",
    "L-Arm Unit: IA-C01W7: ML-REDSHIFT Coral Oscillator",
    "L-Arm Unit: IB-C03W2: WLT 101 Coral Oscillator",
    "L-Arm Unit: VP-66EG Stun Gun",
    "L-Arm Unit: IA-C01W6: NB-REDSHIFT Coral Rifle",
    "L-Arm Unit: IB-C03W1: WLT 011 Coral Rifle",
    "L-Arm Unit: 44-142 KRSV Multi Energy Rifle",
    "L-Arm Unit: WS-5000 APERITIF Siege Missile Launcher",
    "R-Back Unit: VE-60LCA Laser Cannon",
    "R-Back Unit: KRANICH/60Z Pulse Cannon",
    "R-Back Unit: WR-0999 DELIVERY BOY Cluster Missile Launcher",
    "R-Back Unit: WS-5001 SOUP Scatter Missile Launcher",
    "R-Back Unit: EL-PW-01 TRUENO Needle Missile Launcher",
    "R-Back Unit: IB-C03W3: NGI 006 Coral Missile Launcher",
    "R-Back Unit: BO-044 HUXLEY Bullet Orbit",
    "L-Back Unit: VE-61PSA Pulse Scutum",
    "L-Back Unit: IB-C03W4: NGI 028 Coral Shield",
    "L-Back Unit: VE-60LCA Laser Cannon",
    "L-Back Unit: KRANICH/60Z Pulse Cannon",
    "L-Back Unit: WR-0999 DELIVERY BOY Cluster Missile Launcher",
    "L-Back Unit: WS-5001 SOUP Scatter Missile Launcher",
    "L-Back Unit: EL-PW-01 TRUENO Needle Missile Launcher",
    "L-Back Unit: IB-C03W3: NGI 006 Coral Missile Launcher",
    "L-Back Unit: BO-044 HUXLEY Bullet Orbit",
    "Head: HC-2000/BC SHADE EYE",
    "Head: HS-5000 APPETIZER",
    "Head: 20-082 MIND BETA",
    "Core: CS-5000 MAIN DISH",
    "Arms: AS-5000 SALAD",
    "Bipedal Legs: 2S-5000 DESSERT",
    "Booster: BC-0200 GRIDWALKER",
    "Booster: IB-C03B: NGI 001",
    "Generator: VE-20B"
];
const a_tier_parts = [
    "R-Arm Unit: WR-0555 ATTACHE Heavy Machine Gun",
    "R-Arm Unit: EL-PW-00 VIENTO Needle Gun",
    "R-Arm Unit: DIZZY Grenade Launcher",
    "R-Arm Unit: VE-66LRB Laser Rifle",
    "R-Arm Unit: HML-G3/P08SPL-06 Split Missile Launcher",
    "L-Arm Unit: VP-67LD Laser Dagger",
    "L-Arm Unit: IA-C01W2: MOONLIGHT Light Wave Blade",
    "L-Arm Unit: WR-0555 ATTACHE Heavy Machine Gun",
    "L-Arm Unit: EL-PW-00 VIENTO Needle Gun",
    "L-Arm Unit: DIZZY Grenade Launcher",
    "L-Arm Unit: VE-66LRB Laser Rifle",
    "L-Arm Unit: HML-G3/P08SPL-06 Split Missile Launcher",
    "R-Back Unit: EARSHOT Grenade Cannon",
    "R-Back Unit: VE-60LCB Laser Cannon",
    "R-Back Unit: FASAN/60E Plasma Cannon",
    "R-Back Unit: IA-C01W3: AURORA Light Wave Cannon",
    "R-Back Unit: BML-G2/P19SPL-12 Split Missile Launcher",
    "R-Back Unit: BML-G2/P08DUO-03 Dual Missile Launcher",
    "R-Back Unit: BML-G1/P07VTC-12 Vertical Missile Launcher",
    "R-Back Unit: BML-G1/P29CNT Container Missile Launcher",
    "R-Back Unit: 45-091 ORBT Laser Orbit",
    "R-Back Unit: Vvc-700LD Laser Drone",
    "L-Back Unit: EARSHOT Grenade Cannon",
    "L-Back Unit: VE-60LCB Laser Cannon",
    "L-Back Unit: FASAN/60E Plasma Cannon",
    "L-Back Unit: IA-C01W3: AURORA Light Wave Cannon",
    "L-Back Unit: BML-G2/P19SPL-12 Split Missile Launcher",
    "L-Back Unit: BML-G2/P08DUO-03 Dual Missile Launcher",
    "L-Back Unit: BML-G1/P07VTC-12 Vertical Missile Launcher",
    "L-Back Unit: BML-G1/P29CNT Container Missile Launcher",
    "L-Back Unit: 45-091 ORBT Laser Orbit",
    "L-Back Unit: Vvc-700LD Laser Drone",
    "Head: HD-012 MELANDER C3",
    "Head: VP-44D",
    "Head: VE-44B",
    "Head: EL-PH-00 ALBA",
    "Head: 20-081 MIND ALPHA",
    "Head: IA-C01H: EPHEMERA",
    "Head: IB-C03H: HAL 826",
    "Core: BD-012 MELANDER C3",
    "Core: EL-PC-00 ALBA",
    "Core: IA-C01C: EPHEMERA",
    "Core: IB-C03C: HAL 826",
    "Arms: AR-012 MELANDER C3",
    "Arms: VP-46D",
    "Arms: EL-PA-00 ALBA",
    "Arms: IA-C01A: EPHEMERA",
    "Arms: IB-C03A: HAL 826",
    "Bipedal Legs: LG-012 MELANDER C3",
    "Bipedal Legs: EL-PL-00 ALBA",
    "Bipedal Legs: IA-C01L: EPHEMERA",
    "Bipedal Legs: IB-C03L: HAL 826",
    "Tank Legs: VE-42B",
    "Booster: IA-C01B: GILLS",
    "FCS: VE-21B",
    "FCS: IA-C01F: OCELLUS",
    "FCS: IB-C03F: WLT 001",
    "Generator: AG-T-005 HOKUSHI",
    "Generator: VE-20C",
    "Generator: IB-C03G: NGI 000"
];
const b_tier_parts = [
    "R-Arm Unit: LR-037 HARRIS Linear Rifle",
    "R-Arm Unit: RD-025 SCUDDER Assault Rifle",
    "R-Arm Unit: DF-MG-02 CHANG-CHEN Machine Gun",
    "R-Arm Unit: MA-E-210 ETSUJIN Machine Gun",
    "R-Arm Unit: SG-027 ZIMMERMAN Shotgun",
    "R-Arm Unit: WR-0777 SWEET SIXTEEN Shotgun",
    "R-Arm Unit: HG-004 DUCKETT Handgun",
    "R-Arm Unit: MA-E-211 SAMPU Burst Handgun",
    "R-Arm Unit: MAJESTIC Bazooka",
    "R-Arm Unit: LITTLE GEM Bazooka",
    "R-Arm Unit: MA-T-223 KYORIKU Jamming Bomb Launcher",
    "R-Arm Unit: WS-1200 THERAPIST Stun Bomb Launcher",
    "R-Arm Unit: WB-0000 BAD COOK Flamethrower",
    "R-Arm Unit: VE-66LRA Laser Rifle",
    "R-Arm Unit: WUERGER/66E Laser Shotgun",
    "R-Arm Unit: IA-C01W1: NEBULA Plasma Rifle",
    "R-Arm Unit: HI-18: GU-A2 Pulse Gun",
    "R-Arm Unit: PFAU/66D Pulse Missile Launcher",
    "L-Arm Unit: DF-ET-09 TAI-YANG-SHOU Explosive Thrower",
    "L-Arm Unit: WB-0010 DOUBLE TROUBLE Chainsaw",
    "L-Arm Unit: VP-67EB Stun Baton",
    "L-Arm Unit: VE-67LLA Laser Lance",
    "L-Arm Unit: 44-143 HMMR Plasma Thrower",
    "L-Arm Unit: LR-037 HARRIS Linear Rifle",
    "L-Arm Unit: RD-025 SCUDDER Assault Rifle",
    "L-Arm Unit: DF-MG-02 CHANG-CHEN Machine Gun",
    "L-Arm Unit: MA-E-210 ETSUJIN Machine Gun",
    "L-Arm Unit: SG-027 ZIMMERMAN Shotgun",
    "L-Arm Unit: WR-0777 SWEET SIXTEEN Shotgun",
    "L-Arm Unit: HG-004 DUCKETT Handgun",
    "L-Arm Unit: MA-E-211 SAMPU Burst Handgun",
    "L-Arm Unit: MAJESTIC Bazooka",
    "L-Arm Unit: LITTLE GEM Bazooka",
    "L-Arm Unit: MA-T-223 KYORIKU Jamming Bomb Launcher",
    "L-Arm Unit: WS-1200 THERAPIST Stun Bomb Launcher",
    "L-Arm Unit: WB-0000 BAD COOK Flamethrower",
    "L-Arm Unit: VE-66LRA Laser Rifle",
    "L-Arm Unit: WUERGER/66E Laser Shotgun",
    "L-Arm Unit: IA-C01W1: NEBULA Plasma Rifle",
    "L-Arm Unit: HI-18: GU-A2 Pulse Gun",
    "L-Arm Unit: PFAU/66D Pulse Missile Launcher",
    "R-Back Unit: DF-GA-09 SHAO-WEI Gatling Cannon",
    "R-Back Unit: SB-033M MORLEY Spread Bazooka",
    "R-Back Unit: VE-60SNA Stun Needle Launcher",
    "R-Back Unit: VP-60LCD Diffuse Laser Cannon",
    "R-Back Unit: EULE/60D Pulse Shield Launcher",
    "R-Back Unit: BML-G2/P03MLT-06 Missile Launcher",
    "R-Back Unit: BML-G2/P17SPL-16 Split Missile Launcher",
    "R-Back Unit: BML-G1/P32DUO-03 Dual Missile Launcher",
    "R-Back Unit: BML-G3/P05ACT-02 Active Homing Missile Launcher",
    "R-Back Unit: 45-091 JVLN BETA Detonating Missile Launcher",
    "R-Back Unit: Vvc-706PM Plasma Missile Launcher",
    "R-Back Unit: VP-60LT Laser Turret",
    "L-Back Unit: SI-27: SU-R8 Pulse Shield",
    "L-Back Unit: DF-GA-09 SHAO-WEI Gatling Cannon",
    "L-Back Unit: SB-033M MORLEY Spread Bazooka",
    "L-Back Unit: VE-60SNA Stun Needle Launcher",
    "L-Back Unit: VP-60LCD Diffuse Laser Cannon",
    "L-Back Unit: EULE/60D Pulse Shield Launcher",
    "L-Back Unit: BML-G2/P03MLT-06 Missile Launcher",
    "L-Back Unit: BML-G2/P17SPL-16 Split Missile Launcher",
    "L-Back Unit: BML-G1/P32DUO-03 Dual Missile Launcher",
    "L-Back Unit: BML-G3/P05ACT-02 Active Homing Missile Launcher",
    "L-Back Unit: 45-091 JVLN BETA Detonating Missile Launcher",
    "L-Back Unit: Vvc-706PM Plasma Missile Launcher",
    "L-Back Unit: VP-60LT Laser Turret",
    "Head: AH-J-124 BASHO",
    "Head: HD-033M VERRILL",
    "Head: LAMMERGEIER/44F",
    "Head: VE-44A",
    "Core: AC-J-120 BASHO",
    "Core: LAMMERGEIER/40F",
    "Core: VE-40A",
    "Core: 07-061 MIND ALPHA",
    "Arms: AA-J-123 BASHO",
    "Arms: LAMMERGEIER/46F",
    "Arms: VE-46A",
    "Bipedal Legs: AL-J-121 BASHO",
    "Bipedal Legs: VE-42A",
    "Reverse Joint Legs: RC-2000 SPRING CHICKEN",
    "Reverse Joint Legs: 06-042 MIND BETA",
    "Tetrapod Legs: LG-033M VERRILL",
    "Tetrapod Legs: LAMMERGEIER/42F",
    "Tank Legs: EL-TL-11 FORTALEZA",
    "Booster: BST-G2/P06SPD",
    "Booster: FLUEGEL 21/Z",
    "Booster: BC-0600 12345",
    "Booster: BC-0400 MULE",
    "FCS: FCS-G2/P12SML",
    "FCS: VE-21A",
    "Generator: DF-GN-08 SAN-TAI",
    "Generator: VP-20C",
    "Generator: VE-20A",
    "Generator: IA-C01G: AORTA"
];
const c_tier_parts = [
    "R-Arm Unit: MA-J-201 RANSETSU-AR Burst Assault Rifle",
    "R-Arm Unit: DF-GA-08 HU-BEN Gatling Gun",
    "R-Arm Unit: SG-026 HALDEMAN Shotgun",
    "R-Arm Unit: 44-141 JVLN ALPHA Detonating Bazooka",
    "R-Arm Unit: DF-GR-07 GOU-CHEN Grenade Launcher",
    "R-Arm Unit: IRIDIUM Grenade Launcher",
    "R-Arm Unit: MA-T-222 KYORAI Napalm Bomb Launcher",
    "R-Arm Unit: VP-66LR Laser Rifle",
    "R-Arm Unit: VP-66LS Laser Shotgun",
    "R-Arm Unit: VP-66LH Laser Handgun",
    "R-Arm Unit: Vvc-760PR Plasma Rifle",
    "R-Arm Unit: HI-16: GU-Q1 Pulse Gun",
    "R-Arm Unit: HML-G2/P19MLT-04 Missile Launcher",
    "L-Arm Unit: PB-033M ASHMEAD Pile Bunker",
    "L-Arm Unit: Vvc-770LB Laser Blade",
    "L-Arm Unit: MA-J-201 RANSETSU-AR Burst Assault Rifle",
    "L-Arm Unit: DF-GA-08 HU-BEN Gatling Gun",
    "L-Arm Unit: SG-026 HALDEMAN Shotgun",
    "L-Arm Unit: 44-141 JVLN ALPHA Detonating Bazooka",
    "L-Arm Unit: DF-GR-07 GOU-CHEN Grenade Launcher",
    "L-Arm Unit: IRIDIUM Grenade Launcher",
    "L-Arm Unit: MA-T-222 KYORAI Napalm Bomb Launcher",
    "L-Arm Unit: VP-66LR Laser Rifle",
    "L-Arm Unit: VP-66LS Laser Shotgun",
    "L-Arm Unit: VP-66LH Laser Handgun",
    "L-Arm Unit: Vvc-760PR Plasma Rifle",
    "L-Arm Unit: HI-16: GU-Q1 Pulse Gun",
    "L-Arm Unit: HML-G2/P19MLT-04 Missile Launcher",
    "R-Back Unit: SONGBIRDS Grenade Cannon",
    "R-Back Unit: VP-60LCS Laser Cannon",
    "R-Back Unit: BML-G2/P05MLT-10 Missile Launcher",
    "R-Back Unit: BML-G2/P16SPL-08 Split Missile Launcher",
    "R-Back Unit: BML-G1/P01VTC-04 Vertical Missile Launcher",
    "R-Back Unit: BML-G1/P03VTC-08 Vertical Missile Launcher",
    "R-Back Unit: BML-G3/P04ACT-01 Active Homing Missile Launcher",
    "R-Back Unit: Vvc-703PM Plasma Missile Launcher",
    "R-Back Unit: Vvc-70VPM Plasma Missile Launcher",
    "L-Back Unit: VP-61PS Pulse Shield",
    "L-Back Unit: VP-61PB Pulse Buckler",
    "L-Back Unit: SI-29: SU-TT/C Pulse Buckler",
    "L-Back Unit: SONGBIRDS Grenade Cannon",
    "L-Back Unit: VP-60LCS Laser Cannon",
    "L-Back Unit: BML-G2/P05MLT-10 Missile Launcher",
    "L-Back Unit: BML-G2/P16SPL-08 Split Missile Launcher",
    "L-Back Unit: BML-G1/P01VTC-04 Vertical Missile Launcher",
    "L-Back Unit: BML-G1/P03VTC-08 Vertical Missile Launcher",
    "L-Back Unit: BML-G3/P04ACT-01 Active Homing Missile Launcher",
    "L-Back Unit: Vvc-703PM Plasma Missile Launcher",
    "L-Back Unit: Vvc-70VPM Plasma Missile Launcher",
    "Head: KASUAR/44Z",
    "Head: HC-3000 WRECKER",
    "Head: EL-TH-10 FIRMEZA",
    "Core: CC-3000 WRECKER",
    "Core: EL-TC-10 FIRMEZA",
    "Arms: DF-AR-09 TIAN-LAO",
    "Arms: AC-3000 WRECKER",
    "Arms: EL-TA-10 FIRMEZA",
    "Arms: 04-101 MIND ALPHA",
    "Bipedal Legs: 2C-3000 WRECKER",
    "Bipedal Legs: EL-TL-10 FIRMEZA",
    "Bipedal Legs: 06-041 MIND ALPHA",
    "Reverse Joint Legs: KASUAR/42Z",
    "Tetrapod Legs: VP-424",
    "Tank Legs: LG-022T BORNEMISSZA",
    "Booster: AB-J-137 KIKAKU",
    "Booster: ALULA/21E",
    "Booster: BUERZEL/21D",
    "FCS: FCS-G2/P05",
    "FCS: FC-006 ABBOT",
    "FCS: FC-008 TALBOT",
    "Generator: AG-E-013 YABA",
    "Generator: DF-GN-06 MING-TANG",
    "Generator: VP-20S",
    "Generator: VP-20D"
];
const d_tier_parts = [
    "R-Arm Unit: MA-J-200 RANSETSU-RF Burst Rifle",
    "R-Arm Unit: LR-036 CURTIS Linear Rifle",
    "R-Arm Unit: RF-024 TURNER Assault Rifle",
    "R-Arm Unit: MG-014 LUDLOW Machine Gun",
    "R-Arm Unit: HG-003 COQUILLETT Handgun",
    "R-Arm Unit: DF-BA-06 XUAN-GE Bazooka",
    "L-Arm Unit: HI-32 BU/TT-A Pulse Blade",
    "L-Arm Unit: MA-J-200 RANSETSU-RF Burst Rifle",
    "L-Arm Unit: LR-036 CURTIS Linear Rifle",
    "L-Arm Unit: RF-024 TURNER Assault Rifle",
    "L-Arm Unit: MG-014 LUDLOW Machine Gun",
    "L-Arm Unit: HG-003 COQUILLETT Handgun",
    "L-Arm Unit: DF-BA-06 XUAN-GE Bazooka",
    "R-Back Unit: BML-G1/P20MLT-04 Missile Launcher",
    "R-Back Unit: BML-G1/P31DUO-02 Dual Missile Launcher",
    "L-Back Unit: SI-24: SU-Q5 Pulse Shield",
    "L-Back Unit: BML-G1/P20MLT-04 Missile Launcher",
    "L-Back Unit: BML-G1/P31DUO-02 Dual Missile Launcher",
    "Head: HD-011 MELANDER",
    "Head: DF-HD-08 TIAN-QIANG",
    "Head: VP-44S",
    "Head: NACHTREIHER/44E",
    "Head: HC-2000 FINDER EYE",
    "Core: BD-011 MELANDER",
    "Core: DF-BD-08 TIAN-QIANG",
    "Core: VP-40S",
    "Core: NACHTREIHER/40E",
    "Core: CC-2000 ORBITER",
    "Arms: AR-011 MELANDER",
    "Arms: DF-AR-08 TIAN-QIANG",
    "Arms: VP-46S",
    "Arms: NACHTREIHER/46E",
    "Arms: AC-2000 TOOL ARM",
    "Bipedal Legs: LG-011 MELANDER",
    "Bipedal Legs: DF-LG-08 TIAN-QIANG",
    "Bipedal Legs: VP-422",
    "Bipedal Legs: NACHTREIHER/42E",
    "Bipedal Legs: 2C-2000 CRAWLER",
    "Booster: BST-G2/P04",
    "FCS: FCS-G2/P10SLT",
    "Generator: DF-GN-02 LING-TAI"
];
