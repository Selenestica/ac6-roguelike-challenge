// DOM Elements
const coamText = document.getElementById("coamText");
const missionViewScreen = document.getElementById("missionViewScreen");
const shopContainer = document.getElementById("shopContainer");
const loadoutContainer = document.getElementById("loadoutContainer");
const missionCompleteButton = document.getElementById("missionCompleteButton");
const missionFailedButton = document.getElementById("missionFailedButton");
const mainViewButtons = document.getElementsByClassName("mainViewButtons");
const missionViewDiv = document.getElementById("missionViewDiv");
const shopViewDiv = document.getElementById("shopViewDiv");

// Constants
const STARTING_COAM = 15000;

const TIER_BASE_PRICES = {
  s: 10000,
  a: 6000,
  b: 3500,
  c: 2000,
  d: 750,
};

const RANK_REWARDS = {
  S: 5000,
  A: 3500,
  B: 2000,
  C: 1000,
  D: 250,
};

const SLOT_CATEGORIES = {
  head: "head",
  core: "core",
  arms: "arms",
  legs: "legs",
  booster: "booster",
  fcs: "fcs",
  generator: "generator",
  "r-arm": "r-arm",
  "l-arm": "l-arm",
  "r-back": "r-back",
  "l-back": "l-back",
};

const REQUIRED_SLOTS = [
  "head",
  "core",
  "arms",
  "legs",
  "booster",
  "fcs",
  "generator",
];

// State
let coam = STARTING_COAM;
let inventory = []; // bought parts not yet equipped
let equippedParts = []; // parts equipped for current mission
let shop = []; // PARTS with prices
let currentEnding = "firesOfRavenMissions";
let currentMission = 0;
let missionsData = [];
let badgesEarned = { for: null, lor: null, aie: null };
let currentView = "missionViewButton";

// Generate shop prices with ±25% random modifier
const generateShop = () => {
  return PARTS.map((part) => {
    const base = TIER_BASE_PRICES[part.tier];
    const modifier = 1 + (Math.random() * 0.5 - 0.25); // ±25%
    const price = Math.round((base * modifier) / 100) * 100; // round to nearest 100
    return { ...part, price, stock: 1 };
  });
};

const getPartPrice = (part) => {
  const shopPart = shop.find(
    (p) => p.name === part.name && p.category === part.category,
  );
  return shopPart ? shopPart.price : null;
};

// Check if all required slots are filled
const isLoadoutValid = () => {
  return REQUIRED_SLOTS.every((slot) => {
    return (
      equippedParts.some((p) => p.category === slot) ||
      STARTER_PARTS.some((p) => p.category === slot)
    );
  });
};

const updateMissionButtons = () => {
  const valid = isLoadoutValid();
  missionCompleteButton.disabled = !valid;
  missionFailedButton.disabled = !valid;
};

const updateCoamDisplay = () => {
  coamText.innerHTML = coam.toLocaleString();
};

// Generate a part card for the shop
const genShopCard = (part) => {
  const canAfford = coam >= part.price;
  const alreadyOwned = inventory.some(
    (p) => p.name === part.name && p.category === part.category,
  );
  const isEquipped = equippedParts.some(
    (p) => p.name === part.name && p.category === part.category,
  );
  const outOfStock = part.stock <= 0;

  let buttonLabel = `Buy — ${part.price.toLocaleString()} COAM`;
  let buttonDisabled = !canAfford || alreadyOwned || isEquipped || outOfStock;
  let buttonClass = "btn-success";

  if (outOfStock) {
    buttonLabel = "Out of Stock";
    buttonClass = "btn-secondary";
  } else if (alreadyOwned || isEquipped) {
    buttonLabel = "Owned";
    buttonClass = "btn-secondary";
  } else if (!canAfford) {
    buttonClass = "btn-danger";
  }

  return `
    <div class="card bg-dark border-secondary text-center p-2 mb-2" style="width: 160px; position: relative;">
      <span class="badge text-dark bg-${part.tier}-tier" style="position: absolute; top: 6px; right: 6px;">
        ${part.tier.toUpperCase()}
      </span>
      <img class="img-fluid mb-1" src="../assets/images/${part.img}" alt="${part.name}" />
      <p class="text-white mb-1" style="font-size: 0.7rem;">${part.name}</p>
      <small class="text-muted text-uppercase mb-2">${part.category}</small>
      <button
        class="btn btn-sm ${buttonClass}"
        ${buttonDisabled ? "disabled" : ""}
        onclick="buyPart('${part.name}', '${part.category}')"
      >
        ${buttonLabel}
      </button>
    </div>
  `;
};

const buyPart = (partName, partCategory) => {
  const shopPart = shop.find(
    (p) => p.name === partName && p.category === partCategory,
  );
  if (!shopPart || shopPart.stock <= 0 || coam < shopPart.price) return;

  coam -= shopPart.price;
  shopPart.stock--;
  inventory.push({ ...shopPart });

  updateCoamDisplay();
  populateShop();
  populateInventory();
  saveProgress();
};

// Equip a part from inventory
const equipPart = (partName, partCategory) => {
  const part = inventory.find(
    (p) => p.name === partName && p.category === partCategory,
  );
  if (!part) return;

  // unequip any existing part in this slot
  const existingIndex = equippedParts.findIndex(
    (p) => p.category === partCategory,
  );
  if (existingIndex !== -1) {
    const unequipped = equippedParts.splice(existingIndex, 1)[0];
    inventory.push(unequipped);
  }

  // equip the new part
  inventory = inventory.filter(
    (p) => !(p.name === partName && p.category === partCategory),
  );
  equippedParts.push(part);

  populateInventory();
  populateLoadout();
  updateMissionButtons();
  saveProgress();
};

// Unequip a part back to inventory
const unequipPart = (partName, partCategory) => {
  const part = equippedParts.find(
    (p) => p.name === partName && p.category === partCategory,
  );
  if (!part) return;

  equippedParts = equippedParts.filter(
    (p) => !(p.name === partName && p.category === partCategory),
  );
  inventory.push(part);

  populateInventory();
  populateLoadout();
  updateMissionButtons();
  saveProgress();
};

const populateShop = () => {
  const shopCategories = Object.keys(SLOT_CATEGORIES);
  shopContainer.innerHTML = "";

  shopCategories.forEach((category) => {
    const partsInCategory = shop.filter((p) => p.category === category);
    if (partsInCategory.length === 0) return;

    shopContainer.innerHTML += `
      <div class="mb-3">
        <h6 class="text-white text-uppercase fw-bold mb-2">${category}</h6>
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          ${partsInCategory.map((p) => genShopCard(p)).join("")}
        </div>
      </div>
    `;
  });
};

// Inventory card
const genInventoryCard = (part, isEquipped = false) => {
  return `
    <div class="card bg-dark border-${isEquipped ? "success" : "secondary"} text-center p-2" style="width: 140px; position: relative;">
      <span class="badge text-dark bg-${part.tier}-tier" style="position: absolute; top: 4px; right: 4px;">
        ${part.tier.toUpperCase()}
      </span>
      <img class="img-fluid mb-1" src="../assets/images/${part.img}" alt="${part.name}" />
      <p class="text-white mb-1" style="font-size: 0.65rem;">${part.name}</p>
      <small class="text-muted text-uppercase mb-1">${part.category}</small>
      <button
        class="btn btn-sm ${isEquipped ? "btn-warning" : "btn-primary"}"
        onclick="${
          isEquipped
            ? `unequipPart('${part.name}', '${part.category}')`
            : `equipPart('${part.name}', '${part.category}')`
        }"
      >
        ${isEquipped ? "Unequip" : "Equip"}
      </button>
    </div>
  `;
};

const populateInventory = () => {
  const inventoryContainer = document.getElementById("inventoryContainer");
  inventoryContainer.innerHTML = "";

  if (inventory.length === 0 && equippedParts.length === 0) {
    inventoryContainer.innerHTML =
      '<p class="text-muted">No parts in inventory. Visit the shop!</p>';
    return;
  }

  if (equippedParts.length > 0) {
    inventoryContainer.innerHTML += `<h6 class="text-success text-uppercase fw-bold mb-2">Equipped</h6>
      <div class="d-flex flex-wrap gap-2 mb-3">
        ${equippedParts.map((p) => genInventoryCard(p, true)).join("")}
      </div>`;
  }

  if (inventory.length > 0) {
    inventoryContainer.innerHTML += `<h6 class="text-white text-uppercase fw-bold mb-2">Inventory</h6>
      <div class="d-flex flex-wrap gap-2">
        ${inventory.map((p) => genInventoryCard(p, false)).join("")}
      </div>`;
  }
};

const populateLoadout = () => {
  const loadoutDisplay = document.getElementById("loadoutDisplay");
  loadoutDisplay.innerHTML = "";

  Object.keys(SLOT_CATEGORIES).forEach((slot) => {
    const equipped = equippedParts.find((p) => p.category === slot);
    const defaultPart = STARTER_PARTS.find((p) => p.category === slot);
    const partToShow = equipped || defaultPart;

    if (!partToShow) return;

    loadoutDisplay.innerHTML += `
      <div class="card bg-dark border-${equipped ? "success" : "secondary"} text-center p-1 mb-1" style="width: 120px;">
        <small class="text-muted text-uppercase" style="font-size: 0.6rem;">${slot}</small>
        <img class="img-fluid" src="../assets/images/${partToShow.img}" alt="${partToShow.name}" />
        <p class="text-white mb-0" style="font-size: 0.6rem;">${partToShow.name}</p>
        ${equipped ? `<span class="badge bg-success">Equipped</span>` : `<span class="badge bg-secondary">Default</span>`}
      </div>
    `;
  });
};

const generateMissionScreen = () => {
  if (
    currentEnding === "aleaIactaEstMissions" &&
    currentMission >= MISSIONS[currentEnding].length
  ) {
    missionViewScreen.innerHTML = `
      <div class="col-sm-12 col-md-10 col-lg-8 text-center">
        <small class="text-muted text-uppercase">Challenge Complete</small>
        <h4 class="text-white mt-2">All three endings achieved!</h4>
        <div class="card bg-dark border-secondary p-3 mt-4">
          <small class="text-secondary text-uppercase fw-bold mb-3 d-block">Final Stats</small>
          <div class="d-flex justify-content-between text-white mb-2">
            <span>Final COAM</span>
            <span class="text-success">${coam.toLocaleString()}</span>
          </div>
          <div class="d-flex justify-content-between text-white">
            <span>Missions Completed</span>
            <span class="text-info">${missionsData.length}</span>
          </div>
        </div>
        <button class="btn btn-success mt-4 w-100" onclick="downloadSaveFile()">
          <i class="bi bi-download"></i> Download Completion File
        </button>
      </div>
    `;
    return;
  }

  const { name, challenge, ostChipReward, chapter } =
    MISSIONS[currentEnding][currentMission];
  const endingName = getEndingFullName(currentEnding);

  missionViewScreen.innerHTML = `
    <div class="col-sm-12 col-md-10 col-lg-8">
      <div class="text-white text-center mb-1">
        <small class="text-muted">${endingName.toUpperCase()} — CHAPTER ${chapter}</small>
      </div>
      <div class="text-white text-center mb-4">
        <h4>${name}</h4>
      </div>

      <!-- Optional Challenge -->
      <div class="card bg-dark border-warning mb-3 p-3">
        <small class="text-warning text-uppercase fw-bold">Optional Challenge</small>
        <p class="text-white mb-0 mt-1">${challenge}</p>
      </div>

      <!-- Loadout -->
      <div class="card bg-dark border-secondary p-3 mb-3">
        <small class="text-secondary text-uppercase fw-bold mb-2 d-block">Current Loadout</small>
        <div id="loadoutDisplay" class="d-flex flex-wrap gap-2 justify-content-center"></div>
      </div>

      <!-- COAM Rewards -->
      <div class="card bg-dark border-secondary p-3">
        <small class="text-secondary text-uppercase fw-bold mb-2 d-block">COAM Rewards</small>
        <div class="d-flex justify-content-between text-white mb-1">
          <span>S Rank</span><span class="text-success">+5,000</span>
        </div>
        <div class="d-flex justify-content-between text-white mb-1">
          <span>A Rank</span><span class="text-success">+3,500</span>
        </div>
        <div class="d-flex justify-content-between text-white mb-1">
          <span>B Rank</span><span class="text-success">+2,000</span>
        </div>
        <div class="d-flex justify-content-between text-white mb-1">
          <span>C Rank</span><span class="text-success">+1,000</span>
        </div>
        <div class="d-flex justify-content-between text-white">
          <span>D Rank</span><span class="text-success">+250</span>
        </div>
      </div>
    </div>
  `;

  populateLoadout();
  updateMissionButtons();
};

const submitMissionReport = (rank) => {
  const reward = RANK_REWARDS[rank];
  coam += reward;

  // consume equipped parts
  equippedParts = [];

  const ts = Math.floor(Date.now() / 1000);
  let endingID = 1;
  if (currentEnding === "liberatorOfRubiconMissions") endingID = 2;
  if (currentEnding === "aleaIactaEstMissions") endingID = 3;
  missionsData.push([endingID, currentMission, ts, rank]);

  currentMission++;
  if (currentMission >= MISSIONS[currentEnding].length) {
    if (currentEnding === "firesOfRavenMissions") {
      currentEnding = "liberatorOfRubiconMissions";
      currentMission = 0;
      badgesEarned.for = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else if (currentEnding === "liberatorOfRubiconMissions") {
      currentEnding = "aleaIactaEstMissions";
      currentMission = 0;
      badgesEarned.lor = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else if (currentEnding === "aleaIactaEstMissions") {
      currentMission = MISSIONS[currentEnding].length;
      badgesEarned.aie = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  updateCoamDisplay();
  generateMissionScreen();
  populateInventory();
  saveProgress();
};

const missionFailed = () => {
  // lose equipped parts
  equippedParts = [];
  populateInventory();
  populateLoadout();
  updateMissionButtons();
  generateMissionScreen();
  saveProgress();
};

const getEndingFullName = (ending) => {
  if (ending === "firesOfRavenMissions") return "Fires of Raven";
  if (ending === "liberatorOfRubiconMissions") return "Liberator of Rubicon";
  if (ending === "aleaIactaEstMissions") return "Alea Iacta Est";
};

const saveProgress = () => {
  const storedSave = localStorage.getItem("ac6CoamSaveData");
  const currentSaveData = {
    coam,
    inventory,
    equippedParts,
    shop,
    currentEnding,
    currentMission,
    missionsData,
    badgesEarned,
  };

  if (!storedSave) {
    localStorage.setItem(
      "ac6CoamSaveData",
      JSON.stringify({
        saves: [
          {
            saveName: "Run #1",
            currentSave: true,
            ...currentSaveData,
          },
        ],
      }),
    );
    return;
  }

  const saveFile = JSON.parse(storedSave);
  saveFile.saves = saveFile.saves.map((s) => {
    if (s.currentSave) return { ...s, ...currentSaveData };
    return s;
  });
  localStorage.setItem("ac6CoamSaveData", JSON.stringify(saveFile));
};

const loadSavedProgress = () => {
  const storedSave = localStorage.getItem("ac6CoamSaveData");
  if (storedSave) {
    const saveFile = JSON.parse(storedSave);
    const currentSave = saveFile.saves.find((s) => s.currentSave);
    if (!currentSave) return;

    coam = currentSave.coam;
    inventory = currentSave.inventory;
    equippedParts = currentSave.equippedParts;
    shop = currentSave.shop;
    currentEnding = currentSave.currentEnding;
    currentMission = currentSave.currentMission;
    missionsData = currentSave.missionsData;
    badgesEarned = currentSave.badgesEarned;

    updateCoamDisplay();
    generateMissionScreen();
    populateShop();
    populateInventory();
    return;
  }

  // fresh start
  shop = generateShop();
  updateCoamDisplay();
  generateMissionScreen();
  populateShop();
  populateInventory();
  saveProgress();
};

// View toggle
Array.from(mainViewButtons).forEach((btn) => {
  btn.addEventListener("change", (e) => {
    if (!e.target.checked) return;
    currentView = e.target.id;
    missionViewDiv.classList.toggle(
      "d-none",
      currentView !== "missionViewButton",
    );
    shopViewDiv.classList.toggle("d-none", currentView !== "shopButton");
    inventoryViewDiv.classList.toggle(
      "d-none",
      currentView !== "inventoryButton",
    );
  });
});

loadSavedProgress();
