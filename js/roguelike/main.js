const partCategoryElements = document.getElementsByClassName("partCategory");
const partCategoryAccordionButton = document.getElementsByClassName(
  "partCategoryAccordionButton",
);
const newPartModalLabel = document.getElementById("newPartModalLabel");
const newPartModalImg = document.getElementById("newPartModalImg");
const tierBadge = document.getElementById("tierBadge");
const optionalCheckboxes = document.getElementsByClassName("optionalCheckbox");
const uploadSaveFileInputElement = document.getElementById(
  "uploadSaveFileInput",
);
const uploadSaveFileButton = document.getElementById("uploadSaveFileButton");
const mainViewButtons = document.getElementsByClassName("mainViewButtons");
const missionFailedButtonDiv = document.getElementById(
  "missionFailedButtonDiv",
);
const missionCompleteButtonDiv = document.getElementById(
  "missionCompleteButtonDiv",
);
const allAccordionsToggleButtonDiv = document.getElementById(
  "allAccordionsToggleButtonDiv",
);
const missionCompleteButton = document.getElementById("missionCompleteButton");
const missionFailedButton = document.getElementById("missionFailedButton");
const ostChipsDiv = document.getElementById("ostChipsDiv");
const ostChipsText = document.getElementById("ostChipsText");
const missionButtonsDiv = document.getElementById("missionButtonsDiv");
const inventoryScreen = document.getElementById("inventoryScreen");
const newPartModal = document.getElementById("newPartModal");
const rulesModal = document.getElementById("rulesModal");
const initialPartModal = document.getElementById("initialPartModal");
const initialPartModalBody = document.getElementById("initialPartModalBody");
const upAndDownloadModal = document.getElementById("upAndDownloadModal");
const addPartToast = document.getElementById("addPartToast");
const addPartToastBody = document.getElementById("addPartToastBody");

const customGameSettingsLockedText = document.getElementById(
  "customGameSettingsLockedText",
);
const resetToFiresOfRavenToggle = document.getElementById(
  "resetToFiresOfRavenToggle",
);
const optionalOnlyRewardsToggle = document.getElementById(
  "optionalOnlyRewardsToggle",
);

// defines how individual categories are grouped for rolling purposes
// subject to change
const CATEGORY_GROUPS = {
  head: ["head"],
  fcs: ["fcs"],
  core: ["core"],
  internals: ["generator", "booster"],
  arms_legs: ["arms", "legs"],
  weapons: ["r-arm", "l-arm", "r-back", "l-back"],
};

const ALL_PART_CATEGORIES = [
  "head",
  "core",
  "arms",
  "legs",
  "booster",
  "fcs",
  "generator",
  "r-arm",
  "l-arm",
  "r-back",
  "l-back",
];

const CATEGORY_WEIGHTS = {
  head: 1,
  fcs: 1,
  internals: 1,
  core: 1,
  arms_legs: 1,
  weapons: 3,
};

let customGameSettings = {
  resetToFiresOfRaven: false,
  optionalOnlyRewards: false,
};
let currentEnding = "firesOfRavenMissions";
let currentMission = 0;
let acquiredParts = [];
let restarts = 0;
let missionsData = [];
let badgesEarned = {
  for: null,
  lor: null,
  aie: null,
};

let uploadedSaveFile = null;

let parts = [...PARTS];
let ostChips = 0;
let partCounter = 0;
let accordionsCollapsed = true;
let currentOptionalCompleted = false;
let currentParts = [];
let rolledParts = [];
let skippedParts = [];
let currentView = "missionViewButton";
let isFinalEndingComplete = false;

const isRunInProgress = () => missionsData.length > 1;

const applyCustomGameSettingsToUI = () => {
  const locked = isRunInProgress();

  // show/hide locked text and disable toggles
  customGameSettingsLockedText.style.display = locked ? "block" : "none";
  document.querySelectorAll(".customGameSetting").forEach((toggle) => {
    toggle.disabled = locked;
  });

  // apply current values
  resetToFiresOfRavenToggle.checked = customGameSettings.resetToFiresOfRaven;
  optionalOnlyRewardsToggle.checked = customGameSettings.optionalOnlyRewards;
};

// attach listeners to each toggle
resetToFiresOfRavenToggle.addEventListener("change", (e) => {
  if (isRunInProgress()) return;
  customGameSettings.resetToFiresOfRaven = e.target.checked;
  saveProgress();
});

optionalOnlyRewardsToggle.addEventListener("change", (e) => {
  if (isRunInProgress()) return;
  customGameSettings.optionalOnlyRewards = e.target.checked;
  generateMissionScreen(currentEnding, currentMission);
  saveProgress();
});

// call this when settings modal opens
document
  .getElementById("settingsModal")
  .addEventListener("show.bs.modal", () => {
    applyCustomGameSettingsToUI();
  });

// when the rules and info modal closes and you dont have saved data, roll for a random part
rulesModal.addEventListener("hidden.bs.modal", async () => {
  const saveData = await localStorage.getItem("ac6rlSaveData");
  if (!saveData) {
    await updateMissionsData(true, null, null);
    rollInitialPart(true);
  }
});

upAndDownloadModal.addEventListener("show.bs.modal", () => {
  genSavesList();
});

const clearUploadDownloadModal = () => {
  uploadSaveFileInputElement.value = "";
  uploadSaveFileButton.disabled = true;
  uploadedSaveFile = null;
};

endingCompleteModal.addEventListener("hidden.bs.modal", async () => {
  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  skippedParts = [];

  partCategoriesContainer.innerHTML = "";

  generatePartCategories();
  await proceedToNextMission();

  // final mission of final timeline
  if (
    currentMission === MISSIONS[currentEnding].length &&
    currentEnding === "aleaIactaEstMissions"
  ) {
    currentMission = MISSIONS[currentEnding].length;
    disableMissionButtons();
    generateMissionScreen(currentEnding, currentMission);
    saveProgress();
    return;
  }

  rollInitialPart(true);
});

const showAddPartToast = (partName) => {
  addPartToastBody.innerText = `${partName} added to Garage`;
  const toast = new bootstrap.Toast(addPartToast, { delay: 2500 });
  toast.show();
};

const addPartManually = (partName, partCategory) => {
  const partToAdd = PARTS.find(
    (p) => p.name === partName && p.category === partCategory,
  );
  if (!partToAdd) return;

  const alreadyAcquired = acquiredParts.some(
    (p) => p.name === partName && p.category === partCategory,
  );
  if (alreadyAcquired) {
    addPartToastBody.innerText = `${partName} is already in your garage.`;
    const toast = new bootstrap.Toast(addPartToast, { delay: 2000 });
    toast.show();
    return;
  }

  const partWithFlag = { ...partToAdd, manuallyAdded: true };
  acquiredParts.push(partWithFlag);
  displayPartInCategory(partWithFlag);

  const partIndex = parts.findIndex(
    (p) => p.name === partName && p.category === partCategory,
  );
  if (partIndex !== -1) {
    parts.splice(partIndex, 1);
  }

  saveProgress();
  showAddPartToast(partName);
};

partsGalleryAccordion.addEventListener("click", (e) => {
  const button = e.target.closest(".addPartButton");
  if (!button) return;

  addPartManually(button.dataset.partName, button.dataset.partCategory);
});

const rollInitialPart = async (needToSave = null) => {
  const initialPart = await rollOnce(null, null, true, "weapons");
  acquiredParts.push(initialPart.part);
  displayPartInCategory(initialPart.part);
  // show initial part modal here
  await populateInitialPartModalBody(initialPart.part);
  if (needToSave) {
    saveProgress();
  }
};

// toggles view between LOADOUT and SHOP
for (let z = 0; z < mainViewButtons.length; z++) {
  mainViewButtons[z].addEventListener("change", (e) => {
    if (e.target.checked) {
      currentView = e.srcElement.id;
      if (e.srcElement.id === "missionViewButton") {
        missionButtonsDiv.style.display = "flex";
        missionViewScreen.classList.toggle("d-none", false);
        inventoryScreen.classList.toggle("d-none", true);
        missionCompleteButtonDiv.classList.toggle("d-none", false);
        missionFailedButtonDiv.classList.toggle("d-none", false);
        allAccordionsToggleButtonDiv.classList.toggle("d-none", true);
        ostChipsDiv.classList.toggle("d-none", true);
      }
      if (e.srcElement.id === "inventoryButton") {
        missionButtonsDiv.style.display = "none";
        missionViewScreen.classList.toggle("d-none", true);
        inventoryScreen.classList.toggle("d-none", false);
        missionCompleteButtonDiv.classList.toggle("d-none", true);
        missionFailedButtonDiv.classList.toggle("d-none", true);
        allAccordionsToggleButtonDiv.classList.toggle("d-none", false);
        ostChipsDiv.classList.toggle("d-none", false);
      }
    }
  });
}

uploadSaveFileInputElement.addEventListener("change", (e) => {
  const uploadedFile = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const fileJSON = JSON.parse(event.target.result);
    console.log(fileJSON);
    // validate json and structure here
    // if ok, enable upload button
    uploadSaveFileButton.disabled = false;
    uploadedSaveFile = JSON.parse(event.target.result);
  };
  reader.onerror = (error) => {
    console.log(error);
  };
  reader.readAsText(uploadedFile);
});

// returns per-tier weights [d, c, b, a, s] for the given chapter
const chapterWeights = (chapter) => {
  if (chapter === 1) return [35, 30, 20, 10, 5];
  if (chapter === 2) return [15, 35, 35, 10, 5];
  if (chapter === 3) return [5, 25, 40, 20, 10];
  if (chapter === 4) return [5, 20, 30, 30, 15];
  if (chapter === 5) return [5, 10, 30, 30, 25];
};

const getEmptyCategories = () => {
  return ALL_PART_CATEGORIES.filter((category) => {
    return !acquiredParts.some((p) => p.category === category);
  });
};

const removePart = (partName, partImg, partCategory, rowID) => {
  // remove from the UI
  document.getElementById(rowID).remove();

  // update the badge count
  const badgeEl = document.getElementById(`${partCategory}CategoryButtonBadge`);
  if (badgeEl) {
    const badgeNumber = parseInt(badgeEl.innerHTML);
    badgeEl.innerHTML = badgeNumber > 1 ? badgeNumber - 1 : "";
  }

  // remove from acquiredParts
  const acquiredIndex = acquiredParts.findIndex(
    (p) =>
      p.name === partName && p.img === partImg && p.category === partCategory,
  );
  if (acquiredIndex !== -1) {
    acquiredParts.splice(acquiredIndex, 1);
  }

  // add back to the rollable pool
  const originalPart = PARTS.find(
    (p) =>
      p.name === partName && p.img === partImg && p.category === partCategory,
  );
  if (originalPart) {
    parts.push(originalPart);
  }

  saveProgress();
};

const displayPartInCategory = (part) => {
  partCounter++;
  const imgBase = part.img.replace(".webp", "");
  const partRowID = imgBase + partCounter;

  const partAccordion = document.getElementsByClassName(part.category)[0];
  partAccordion.innerHTML += `
    <div class="accordion-body text-light" id="${partRowID}">
      <div class="d-flex row justify-content-center align-items-center">
        <div class="d-flex col-4 accordionPartImgContainer justify-content-end">
          <img class="img-fluid" src="../assets/images/${part.img}" />
        </div>
        <div class="d-flex col-4 text-light justify-content-start align-items-center">
          ${part.name}
        </div>
        <div class="d-flex col-4 text-light justify-content-end align-items-center">
          <button
            type="button"
            class="btn btn-danger btn-sm"
            onclick="removePart('${part.name}', '${part.img}', '${part.category}', '${partRowID}')"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>`;

  const partAccordionButton = document.getElementById(
    `${part.category}CategoryButton`,
  );
  partAccordionButton.innerHTML = `
    ${part.category.toUpperCase()}
    <h5 class="my-0 mx-2">
      <span id="${part.category}CategoryButtonBadge" class="badge bg-primary">${partAccordion.childElementCount}</span>
    </h5>`;
};

const populateInitialPartModalBody = (part) => {
  initialPartModalBody.innerHTML = "";
  initialPartModalBody.innerHTML += `
      <div
        class="card bg-dark border-secondary part-choice-card"
        style="max-width: 200px;"
        data-bs-dismiss="modal"
      >
        <div class="card-body d-flex flex-column align-items-center gap-2">
          <img class="img-fluid" src="../assets/images/${part.img}" />
          <p class="text-white text-center mb-0">${part.name}</p>
          <small class="text-muted text-center">${part.category.toUpperCase()}</small>
        </div>
      </div>
    `;
  const modal = new bootstrap.Modal(initialPartModal);
  modal.show();
};

const populateNewPartsModal = (optionalCompleted) => {
  newPartModalBody.innerHTML = "";
  const partsToShow = optionalCompleted ? currentParts : [currentParts[0]];

  let cardsHTML = "";
  for (let i = 0; i < partsToShow.length; i++) {
    const { part } = partsToShow[i];
    cardsHTML += `
      <div class="col-6 col-md-auto d-flex justify-content-center">
        <div
          class="card bg-dark border-secondary part-choice-card"
          style="cursor: pointer; width: 180px;"
          data-bs-dismiss="modal"
          onclick="acceptPart(${i})"
        >
          <div class="card-body d-flex flex-column align-items-center gap-2">
            <span class="badge text-dark bg-${part.tier}-tier">${part.tier.toUpperCase()}</span>
            <img class="img-fluid" src="../assets/images/${part.img}" />
            <p class="text-white text-center mb-0">${part.name}</p>
            <small class="text-muted text-center">${part.category.toUpperCase()}</small>
          </div>
        </div>
      </div>
    `;
  }

  newPartModalBody.innerHTML = `<div class="row justify-content-center g-3">${cardsHTML}</div>`;

  const modal = new bootstrap.Modal(newPartModal);
  modal.show();
};

const rollOnce = (
  firstIndex = null,
  secondIndex = null,
  initial = null,
  forcedCategory = null,
  excludedGroups = [],
  forcedSpecificCategory = null,
) => {
  const { chapter } = MISSIONS[currentEnding][currentMission];
  const weights = chapterWeights(chapter);
  let tiers = ["d", "c", "b", "a", "s"];
  if (initial) tiers = ["d", "c"];

  const availableParts = parts.filter((p, i) => {
    if (i === firstIndex || i === secondIndex) return false;
    return !acquiredParts.some(
      (a) => a.name === p.name && a.category === p.category,
    );
  });

  let partsInGroup;
  let chosenGroup = null; // hoisted here

  if (forcedSpecificCategory) {
    partsInGroup = availableParts.filter(
      (p) => p.category === forcedSpecificCategory,
    );
  } else if (forcedCategory) {
    partsInGroup = availableParts.filter((p) =>
      CATEGORY_GROUPS[forcedCategory].includes(p.category),
    );
  } else {
    const categoryPool = Object.entries(CATEGORY_GROUPS)
      .filter(
        ([group, cats]) =>
          !excludedGroups.includes(group) &&
          availableParts.some((p) => cats.includes(p.category)),
      )
      .map(([group, cats]) => ({
        group,
        cats,
        weight: CATEGORY_WEIGHTS[group],
      }));

    const totalCategoryWeight = categoryPool.reduce(
      (sum, c) => sum + c.weight,
      0,
    );
    let categoryRoll = Math.random() * totalCategoryWeight;
    chosenGroup = categoryPool.find((c) => (categoryRoll -= c.weight) < 0); // assigned here
    partsInGroup = availableParts.filter((p) =>
      chosenGroup.cats.includes(p.category),
    );
  }

  const tierPool = tiers
    .map((tier, i) => ({ tier, weight: weights[i] }))
    .filter(({ tier }) => partsInGroup.some((p) => p.tier === tier));

  const totalWeight = tierPool.reduce((sum, t) => sum + t.weight, 0);
  let tierRoll = Math.random() * totalWeight;
  const chosenTier = tierPool.find((t) => (tierRoll -= t.weight) < 0).tier;

  const eligibleParts = partsInGroup.filter((p) => p.tier === chosenTier);
  const chosenPart =
    eligibleParts[Math.floor(Math.random() * eligibleParts.length)];

  return {
    part: chosenPart,
    index: parts.indexOf(chosenPart),
    group: forcedSpecificCategory
      ? Object.entries(CATEGORY_GROUPS).find(([_, cats]) =>
          cats.includes(forcedSpecificCategory),
        )?.[0]
      : chosenGroup?.group,
  };
};

const rollForParts = (optionalCompleted) => {
  currentOptionalCompleted = optionalCompleted;
  if (currentMission >= MISSIONS[currentEnding].length - 1) {
    showEndingFinishedModal(optionalCompleted);
    return;
  }
  if (parts.length === 0) {
    console.log("no more parts to roll!");
    return;
  }

  // if optional only rewards is on and optional wasn't completed, skip rewards
  if (customGameSettings.optionalOnlyRewards && !optionalCompleted) {
    updateMissionsData(false, true, false);
    earnOSTChips();
    proceedToNextMission();
    saveProgress();
    return;
  }

  if (rolledParts.length > 0) {
    currentParts = rolledParts;
    populateNewPartsModal(optionalCompleted);
    return;
  }

  const { chapter } = MISSIONS[currentEnding][currentMission];
  const usedGroups = [];
  let first;

  // for chapter 1, force the first roll into an empty specific category if possible
  if (chapter === 1) {
    const emptyCategories = getEmptyCategories();
    if (emptyCategories.length > 0) {
      const randomEmptyCategory =
        emptyCategories[Math.floor(Math.random() * emptyCategories.length)];
      first = rollOnce(null, null, null, null, usedGroups, randomEmptyCategory);
    } else {
      first = rollOnce(null, null, null, null, usedGroups);
    }
  } else {
    first = rollOnce(null, null, null, null, usedGroups);
  }

  usedGroups.push(first.group);
  const second = rollOnce(first.index, null, null, null, usedGroups);
  usedGroups.push(second.group);
  const third = rollOnce(first.index, second.index, null, null, usedGroups);

  currentParts = [first, second, third];
  rolledParts = [...currentParts];

  [first.index, second.index, third.index]
    .sort((a, b) => b - a)
    .forEach((i) => parts.splice(i, 1));

  saveProgress();
  populateNewPartsModal(optionalCompleted);
};

const acceptPart = async (chosenIndex) => {
  let challengeCompleted = currentParts.length > 1;
  const chosen = currentParts[chosenIndex];
  acquiredParts.push(chosen.part);
  displayPartInCategory(chosen.part);

  // remove by identity instead of index
  const partIndex = await parts.findIndex(
    (p) => p.name === chosen.part.name && p.category === chosen.part.category,
  );
  if (partIndex !== -1) {
    parts.splice(partIndex, 1);
  }

  await updateMissionsData(false, true, challengeCompleted);
  await earnOSTChips();
  await proceedToNextMission();

  rolledParts = [];
  currentParts = [];
  saveProgress();
};

const skipPartRewards = async () => {
  // remove rolledParts from parts pool
  rolledParts.forEach((rp) => {
    skippedParts.push(rp.part);
    const partIndex = parts.findIndex(
      (p) => p.name === rp.part.name && p.category === rp.part.category,
    );
    if (partIndex !== -1) {
      parts.splice(partIndex, 1);
    }
  });

  await updateMissionsData(false, true, currentOptionalCompleted);
  await earnOSTChips();
  await proceedToNextMission();

  rolledParts = [];
  currentParts = [];
  saveProgress();
};

const earnOSTChips = () => {
  if (MISSIONS[currentEnding][currentMission].ostChipReward) {
    ostChips += MISSIONS[currentEnding][currentMission].ostChipReward;
    ostChipsText.innerHTML = ostChips;
  }
};

const updateMissionsData = (
  isStart,
  completed = null,
  challengeCompleted = null,
) => {
  const ts = Math.floor(Date.now() / 1000); // timestamp in seconds
  let endingID = 1;
  if (currentEnding === "liberatorOfRubiconMissions") {
    endingID = 2;
  }
  if (currentEnding === "aleaIactaEstMissions") {
    endingID = 3;
  }

  // for the very first entry
  if (isStart) {
    missionsData.push([endingID, currentMission, ts]);
    return;
  }

  // update the last entry in the array with the completed and challenge completed fields
  let latestEntry = missionsData.at(-1);
  latestEntry.push(completed ? ts : false);
  latestEntry.push(challengeCompleted);

  // create a new entry in the array with the first three fields
  missionsData.push([endingID, currentMission, ts]);
};

const proceedToNextMission = () => {
  // If we're on the last mission of an ending
  if (currentMission >= MISSIONS[currentEnding].length - 1) {
    // Move to the next ending or show completion
    if (currentEnding === "firesOfRavenMissions") {
      currentEnding = "liberatorOfRubiconMissions";
      currentMission = 0;
      generateMissionScreen(currentEnding, currentMission);
      genMissionCompleteModalContent(currentEnding, currentMission);
      return;
    } else if (currentEnding === "liberatorOfRubiconMissions") {
      currentEnding = "aleaIactaEstMissions";
      currentMission = 0;
      generateMissionScreen(currentEnding, currentMission);
      genMissionCompleteModalContent(currentEnding, currentMission);
      return;
    } else if (currentEnding === "aleaIactaEstMissions") {
      // We've completed all endings - show the final summary
      // Set mission to one past the last mission to trigger the completion screen
      currentMission = MISSIONS[currentEnding].length;
      generateMissionScreen(currentEnding, currentMission);
      return;
    }
  }

  // Regular mission progression
  currentMission++;
  generateMissionScreen(currentEnding, currentMission);
  genMissionCompleteModalContent(currentEnding, currentMission);
};

const prepareSkipModal = () => {
  rollForParts(true);
};

const showEndingFinishedModal = async (optionalCompleted) => {
  // 10 ostChips for completing the final mission
  ostChips += 10;

  // give the player more OST Chips here if optional completed
  if (optionalCompleted) {
    ostChips += 5;
  }

  ostChipsText.innerHTML = ostChips;

  if (currentEnding === "aleaIactaEstMissions") {
    isFinalEndingComplete = true;
  }

  // player earned the badge for this ending. go ahead and add it to the badgesEarned state
  const ts = Date.now();
  const dateEarned = new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (currentEnding === "firesOfRavenMissions") {
    badgesEarned = { ...badgesEarned, for: dateEarned };
  }
  if (currentEnding === "liberatorOfRubiconMissions") {
    badgesEarned = { ...badgesEarned, lor: dateEarned };
  }
  if (currentEnding === "aleaIactaEstMissions") {
    badgesEarned = { ...badgesEarned, aie: dateEarned };
  }
  genBadgesShelfContent(badgesEarned);

  await updateMissionsData(false, true, optionalCompleted);
  await genEndingCompleteModalContent(
    optionalCompleted,
    currentEnding,
    currentMission,
  );
  const modal = new bootstrap.Modal(endingCompleteModal);
  modal.show();
};

const reset = async () => {
  await updateMissionsData(false, false, false);

  // if custom game settings full reset is on and we're past Fires of Raven
  if (
    customGameSettings.resetToFiresOfRaven &&
    currentEnding !== "firesOfRavenMissions"
  ) {
    currentEnding = "firesOfRavenMissions";
    badgesEarned = { for: null, lor: null, aie: null };
    genBadgesShelfContent(badgesEarned);
  }

  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  skippedParts = [];
  currentMission = 0;
  restarts++;

  partCategoriesContainer.innerHTML = "";
  generatePartCategories();
  await updateMissionsData(true, null, null);
  await rollInitialPart(false);
  generateMissionScreen(currentEnding, currentMission);
  genMissionCompleteModalContent(currentEnding, currentMission);

  saveProgress(); // saves to the CURRENT slot, no new slot created
};

const startNewRun = async () => {
  const storedSave = localStorage.getItem("ac6rlSaveData");
  const saveFile = JSON.parse(storedSave);
  const runNumber = saveFile.saves.length + 1;

  const updatedSaves = saveFile.saves.map((s) => ({
    ...s,
    currentSave: false,
  }));

  const newSave = {
    saveName: `Run #${runNumber}`,
    currentSave: true,
    editedName: false,
    ostChips: 0,
    acquiredParts: [],
    currentEnding: "firesOfRavenMissions",
    currentMission: 0,
    restarts: 0,
    missionsData: [],
    rolledParts: [],
    skippedParts: [],
    badgesEarned: { for: null, lor: null, aie: null },
    customGameSettings: {
      resetToFiresOfRaven: false,
      optionalOnlyRewards: false,
    },
  };

  updatedSaves.push(newSave);
  localStorage.setItem(
    "ac6rlSaveData",
    JSON.stringify({ saves: updatedSaves }),
  );

  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  skippedParts = [];
  currentMission = 0;
  currentEnding = "firesOfRavenMissions";
  restarts = 0;
  missionsData = [];
  badgesEarned = { for: null, lor: null, aie: null };
  ostChips = 0;
  customGameSettings = {
    resetToFiresOfRaven: false,
    optionalOnlyRewards: false,
  };
  ostChipsText.innerHTML = 0;

  partCategoriesContainer.innerHTML = "";
  generatePartCategories();
  genBadgesShelfContent(badgesEarned);

  // populate the first missionsData entry before rolling the initial part
  await updateMissionsData(true, null, null);

  await rollInitialPart(false);
  generateMissionScreen(currentEnding, currentMission);
  genMissionCompleteModalContent(currentEnding, currentMission);
  saveProgress();
};

const togglePartsAccordions = () => {
  if (accordionsCollapsed) {
    for (let i = 0; i < partCategoryAccordionButton.length; i++) {
      if (partCategoryAccordionButton[i].classList.contains("collapsed")) {
        partCategoryAccordionButton[i].classList.remove("collapsed");
        partCategoryElements[i].classList.add("show");
      }
    }
    accordionsCollapsed = false;
    return;
  }
  for (let i = 0; i < partCategoryAccordionButton.length; i++) {
    if (!partCategoryAccordionButton[i].classList.contains("collapsed")) {
      partCategoryAccordionButton[i].classList.add("collapsed");
      partCategoryElements[i].classList.remove("show");
    }
  }
  accordionsCollapsed = true;
};

const saveProgress = () => {
  const storedSave = localStorage.getItem("ac6rlSaveData");

  const currentSaveData = {
    ostChips,
    acquiredParts,
    currentEnding,
    currentMission,
    restarts,
    missionsData,
    rolledParts,
    skippedParts,
    badgesEarned,
    customGameSettings,
  };

  if (!storedSave) {
    const initialSave = {
      saves: [
        {
          saveName: `Run #1`,
          currentSave: true,
          editedName: false,
          ...currentSaveData,
        },
      ],
    };
    localStorage.setItem("ac6rlSaveData", JSON.stringify(initialSave));
    return;
  }

  const saveFile = JSON.parse(storedSave);
  const updatedSaves = saveFile.saves.map((s) => {
    if (s.currentSave) return { ...s, ...currentSaveData };
    return s;
  });

  localStorage.setItem(
    "ac6rlSaveData",
    JSON.stringify({ saves: updatedSaves }),
  );
};

const loadSavedProgress = () => {
  migrateOldSaveData();

  const storedSave = localStorage.getItem("ac6rlSaveData");

  if (storedSave) {
    const saveFile = JSON.parse(storedSave);
    const currentSave = saveFile.saves.find((s) => s.currentSave);
    if (!currentSave) return;

    currentEnding = currentSave.currentEnding;
    currentMission = currentSave.currentMission;
    acquiredParts = currentSave.acquiredParts;
    ostChips = currentSave.ostChips;
    restarts = currentSave.restarts;
    missionsData = currentSave.missionsData;
    rolledParts = currentSave.rolledParts;
    skippedParts = currentSave.skippedParts ?? [];
    badgesEarned = currentSave.badgesEarned;
    customGameSettings = currentSave.customGameSettings ?? {
      resetToFiresOfRaven: false,
      optionalOnlyRewards: false,
    };
    for (let n = 0; n < currentSave.acquiredParts.length; n++) {
      displayPartInCategory(currentSave.acquiredParts[n]);
    }

    const obtainedKeys = new Set(
      acquiredParts.map((p) => p.name + "|" + p.category),
    );
    const rolledKeys = new Set(
      rolledParts.map((r) => r.part.name + "|" + r.part.category),
    );
    const skippedKeys = new Set(
      skippedParts.map((p) => p.name + "|" + p.category),
    );

    parts = PARTS.filter((p) => {
      const key = p.name + "|" + p.category;
      return (
        !obtainedKeys.has(key) && !rolledKeys.has(key) && !skippedKeys.has(key)
      );
    });

    ostChipsText.innerHTML = ostChips;
    genBadgesShelfContent(badgesEarned);
    generateMissionScreen(currentEnding, currentMission);
    genMissionCompleteModalContent(currentEnding, currentMission);
    return;
  }

  const modal = new bootstrap.Modal(rulesModal);
  modal.show();
  ostChipsText.innerHTML = ostChips;
  genBadgesShelfContent(badgesEarned);
  generateMissionScreen(currentEnding, currentMission);
  genMissionCompleteModalContent(currentEnding, currentMission);
};

const disableMissionButtons = () => {
  missionFailedButton.disabled = true;
  missionCompleteButton.disabled = true;
};

const uploadSaveFile = async () => {
  if (!uploadedSaveFile) return;

  const storedSave = localStorage.getItem("ac6rlSaveData");
  let saveFile = storedSave ? JSON.parse(storedSave) : { saves: [] };

  // handle uploaded file being either old schema or new schema
  let saveToAdd;
  console.log(uploadedSaveFile);
  if (uploadedSaveFile.saves) {
    // new schema — grab the current save from it
    saveToAdd =
      uploadedSaveFile.saves.find((s) => s.currentSave) ??
      uploadedSaveFile.saves[0];
  } else {
    // old schema — wrap it
    saveToAdd = {
      saveName: `Uploaded Run`,
      editedName: false,
      ostChips: uploadedSaveFile.ostChips ?? 0,
      acquiredParts: uploadedSaveFile.acquiredParts ?? [],
      currentEnding: uploadedSaveFile.currentEnding ?? "firesOfRavenMissions",
      currentMission: uploadedSaveFile.currentMission ?? 0,
      restarts: uploadedSaveFile.restarts ?? 0,
      missionsData: uploadedSaveFile.missionsData ?? [],
      rolledParts: uploadedSaveFile.rolledParts ?? [],
      badgesEarned: uploadedSaveFile.badgesEarned ?? {
        for: null,
        lor: null,
        aie: null,
      },
    };
  }

  // mark all existing saves as not current
  saveFile.saves = saveFile.saves.map((s) => ({ ...s, currentSave: false }));

  // add the uploaded save as current
  saveToAdd.currentSave = true;
  saveFile.saves.push(saveToAdd);

  localStorage.setItem("ac6rlSaveData", JSON.stringify(saveFile));

  // reset UI and load
  partCategoriesContainer.innerHTML = "";
  generatePartCategories();
  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  currentMission = 0;
  ostChips = 0;
  missionsData = [];
  badgesEarned = { for: null, lor: null, aie: null };
  ostChipsText.innerHTML = 0;

  loadSavedProgress();
  clearUploadDownloadModal();
  uploadedSaveFile = null;
};

const deleteSaveData = () => {
  localStorage.removeItem("ac6rlSaveData");
  window.location.reload();
};

const migrateOldSaveData = () => {
  const oldSave = localStorage.getItem("ac6rlSaveData");
  if (!oldSave) return;

  const parsed = JSON.parse(oldSave);

  // detect old schema — old saves have these properties directly on the object
  if (parsed.saves) return; // already new schema, skip

  // convert old save to new schema
  const migratedSave = {
    saves: [
      {
        saveName: "Run #1",
        currentSave: true,
        editedName: false,
        ostChips: parsed.ostChips ?? 0,
        acquiredParts: parsed.acquiredParts ?? [],
        currentEnding: parsed.currentEnding ?? "firesOfRavenMissions",
        currentMission: parsed.currentMission ?? 0,
        restarts: parsed.restarts ?? 0,
        missionsData: parsed.missionsData ?? [],
        rolledParts: parsed.rolledParts ?? [],
        skippedParts: parsed.skippedParts ?? [],
        badgesEarned: parsed.badgesEarned ?? {
          for: null,
          lor: null,
          aie: null,
        },
      },
    ],
  };

  localStorage.setItem("ac6rlSaveData", JSON.stringify(migratedSave));
  console.log("Save data migrated to new schema successfully.");
};

const genSavesList = () => {
  const storedSave = localStorage.getItem("ac6rlSaveData");
  const savesListContainer = document.getElementById("savesListContainer");
  savesListContainer.innerHTML = "";

  if (!storedSave) return;

  const saveFile = JSON.parse(storedSave);

  saveFile.saves.forEach((save, i) => {
    const isDisabled = save.currentSave ? "disabled" : "";
    const currentLabel = save.currentSave ? "(Current)" : "";
    savesListContainer.innerHTML += `
      <div class="my-1 d-flex align-items-center gap-2">
        <input type="radio" class="btn-check" name="saveSlotRadio" id="saveSlot${i}" autocomplete="off" ${isDisabled}>
        <label class="btn btn-outline-primary text-white" for="saveSlot${i}">
          ${save.saveName} ${currentLabel}
        </label>
        <button type="button" onclick="editSaveName(${i}, '${save.saveName}')" class="btn btn-primary btn-sm">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button type="button" onclick="downloadSaveFile(${i})" class="btn btn-primary btn-sm">
          <i class="bi bi-download"></i>
        </button>
      </div>
    `;
  });
};

const editSaveName = (index, oldName) => {
  const savesListContainer = document.getElementById("savesListContainer");
  savesListContainer.innerHTML = `
    <p class="text-white mb-0">Rename save file:</p>
    <div class="my-1 d-flex" style="width: 90%">
      <input type="text" maxlength="50" id="newSaveNameInput" class="form-control" value="${oldName}">
      <button type="button" onclick="saveNewName(${index})" class="mx-1 btn btn-success btn-sm">
        <i class="bi bi-check-lg"></i>
      </button>
    </div>
  `;
};

const saveNewName = async (index) => {
  const newName = document.getElementById("newSaveNameInput").value;
  const storedSave = localStorage.getItem("ac6rlSaveData");
  const saveFile = JSON.parse(storedSave);
  saveFile.saves[index].saveName = newName || "Unnamed Run";
  saveFile.saves[index].editedName = true;
  localStorage.setItem("ac6rlSaveData", JSON.stringify(saveFile));
  genSavesList();
};

const switchSave = () => {
  const radios = document.querySelectorAll('input[name="saveSlotRadio"]');
  let selectedIndex = null;
  radios.forEach((r, i) => {
    if (r.checked) selectedIndex = i;
  });
  if (selectedIndex === null) return;

  const storedSave = localStorage.getItem("ac6rlSaveData");
  const saveFile = JSON.parse(storedSave);
  saveFile.saves = saveFile.saves.map((s, i) => ({
    ...s,
    currentSave: i === selectedIndex,
  }));
  localStorage.setItem("ac6rlSaveData", JSON.stringify(saveFile));

  // reset UI and load the switched save
  partCategoriesContainer.innerHTML = "";
  generatePartCategories();
  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  currentMission = 0;
  ostChips = 0;
  missionsData = [];
  badgesEarned = { for: null, lor: null, aie: null };
  ostChipsText.innerHTML = 0;

  loadSavedProgress();
};

const deleteSave = () => {
  const radios = document.querySelectorAll('input[name="saveSlotRadio"]');
  let selectedIndex = null;
  radios.forEach((r, i) => {
    if (r.checked) selectedIndex = i;
  });
  if (selectedIndex === null) return;

  const storedSave = localStorage.getItem("ac6rlSaveData");
  const saveFile = JSON.parse(storedSave);
  saveFile.saves.splice(selectedIndex, 1);
  localStorage.setItem("ac6rlSaveData", JSON.stringify(saveFile));
  genSavesList();
};

loadSavedProgress();
genPartsGalleryModalContent();
