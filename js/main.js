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

const CATEGORY_WEIGHTS = {
  head: 1,
  fcs: 1,
  internals: 1,
  core: 1,
  arms_legs: 1,
  weapons: 3,
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
let currentParts = [];
let rolledParts = [];
let currentView = "missionViewButton";
let isFinalEndingComplete = false;

// when the rules and info modal closes and you dont have saved data, roll for a random part
rulesModal.addEventListener("hidden.bs.modal", async () => {
  const saveData = await localStorage.getItem("ac6rlSaveData");
  if (!saveData) {
    await updateMissionsData(true, null, null);
    rollInitialPart(true);
  }
});

upAndDownloadModal.addEventListener("hidden.bs.modal", () => {
  uploadSaveFileInputElement.value = "";
  uploadSaveFileButton.disabled = true;
  uploadedSaveFile = null;
});

endingCompleteModal.addEventListener("hidden.bs.modal", async () => {
  // dont reset anything when the player completes the very last mission
  if (
    currentMission === MISSIONS[currentEnding].length - 1 &&
    currentEnding === "aleaIactEstMissions"
  ) {
    currentMission = MISSIONS[currentEnding].length;
    disableMissionButtons();
    generateMissionScreen(currentEnding, currentMission);
    saveProgress();
    return;
  }

  // open the starter part modal, reset acquired parts
  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];

  partCategoriesContainer.innerHTML = "";

  generatePartCategories();
  await proceedToNextMission();

  // CHANGE BACK TO TRUE AFTER TESTING
  rollInitialPart(true);
});

const rollInitialPart = async (needToSave = null) => {
  const initialPart = await rollOnce(null, true);
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
    uploadedSaveFile = event.target.result;
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

const displayPartInCategory = (part) => {
  partCounter++;
  const imgBase = part.img.replace(".webp", "");
  const partRowID = imgBase + partCounter;

  const partAccordion = document.getElementsByClassName(part.category)[0];
  partAccordion.innerHTML += `
    <div class="accordion-body text-light" id="${partRowID}">
      <div class="d-flex row justify-content-center">
        <div class="d-flex col-4 accordionPartImgContainer justify-content-end">
          <img class="img-fluid" src="assets/images/${part.img}" />
        </div>
        <div class="d-flex col-4 text-light justify-content-start align-items-center">
          ${part.name}
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
          <img class="img-fluid" src="assets/images/${part.img}" />
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
  for (let i = 0; i < partsToShow.length; i++) {
    const { part } = partsToShow[i];
    newPartModalBody.innerHTML += `
      <div
        class="card bg-dark border-secondary part-choice-card"
        style="cursor: pointer; max-width: 200px;"
        data-bs-dismiss="modal"
        onclick="acceptPart(${i})"
      >
        <div class="card-body d-flex flex-column align-items-center gap-2">
          <img class="img-fluid" src="assets/images/${part.img}" />
          <p class="text-white text-center mb-0">${part.name}</p>
          <small class="text-muted text-center">${part.category.toUpperCase()}</small>
        </div>
      </div>
    `;
  }
  const modal = new bootstrap.Modal(newPartModal);
  modal.show();
};

const rollOnce = (excludeIndex = null, initial = null) => {
  const { chapter } = MISSIONS[currentEnding][currentMission];
  const weights = chapterWeights(chapter);
  let tiers = ["d", "c", "b", "a", "s"];
  if (initial) {
    tiers = ["d"];
  }

  const availableParts =
    excludeIndex !== null ? parts.filter((_, i) => i !== excludeIndex) : parts;

  // weighted category pool — filter out exhausted groups and apply weights
  const categoryPool = Object.entries(CATEGORY_GROUPS)
    .filter(([_, cats]) =>
      availableParts.some((p) => cats.includes(p.category)),
    )
    .map(([group, cats]) => ({ group, cats, weight: CATEGORY_WEIGHTS[group] }));

  const totalCategoryWeight = categoryPool.reduce(
    (sum, c) => sum + c.weight,
    0,
  );
  let categoryRoll = Math.random() * totalCategoryWeight;
  const chosenGroup = categoryPool.find((c) => (categoryRoll -= c.weight) < 0);

  const partsInGroup = availableParts.filter((p) =>
    chosenGroup.cats.includes(p.category),
  );

  const tierPool = tiers
    .map((tier, i) => ({ tier, weight: weights[i] }))
    .filter(({ tier }) => partsInGroup.some((p) => p.tier === tier));

  const totalWeight = tierPool.reduce((sum, t) => sum + t.weight, 0);
  let tierRoll = Math.random() * totalWeight;
  const chosenTier = tierPool.find((t) => (tierRoll -= t.weight) < 0).tier;

  const eligibleParts = partsInGroup.filter((p) => p.tier === chosenTier);
  const chosenPart =
    eligibleParts[Math.floor(Math.random() * eligibleParts.length)];
  const partsIndex = parts.indexOf(chosenPart);

  return { part: chosenPart, index: partsIndex };
};

const rollForParts = (optionalCompleted) => {
  // if its the last mission of the ending, they dont need a part reward
  if (currentMission >= MISSIONS[currentEnding].length - 1) {
    showEndingFinishedModal(optionalCompleted);
    return;
  }

  // this is pretty much impossible to achieve, but better safe than sorry
  if (parts.length === 0) {
    console.log("no more parts to roll!");
    return;
  }

  // if we already rolled this mission (e.g. player reloaded), just show the modal
  if (rolledParts.length > 0) {
    currentParts = rolledParts;
    populateNewPartsModal(optionalCompleted);
    return;
  }

  // always roll 2 parts
  const first = rollOnce(null, null);
  const second = rollOnce(first.index, null);

  currentParts = [first, second];
  rolledParts = [...currentParts];

  saveProgress();
  populateNewPartsModal(optionalCompleted);
};

const acceptPart = async (chosenIndex) => {
  let challengeCompleted = true;
  if (currentParts.length < 2) {
    challengeCompleted = false;
  }
  const chosen = currentParts[chosenIndex];
  acquiredParts.push(chosen.part);
  displayPartInCategory(chosen.part);
  parts.splice(chosen.index, 1);

  await updateMissionsData(false, true, challengeCompleted);
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

  // update the last entry in the array with the completed and optional challenge completed fields
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
      genMissionCompleteModalContent(currentEnding, currentMission);
      return;
    }
  }

  // Regular mission progression
  currentMission++;
  generateMissionScreen(currentEnding, currentMission);
  genMissionCompleteModalContent(currentEnding, currentMission);
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

// restarts a run. OST chips are kept as well as restarts and missionData
const reset = async () => {
  // first, update missionsData
  await updateMissionsData(false, false, false);

  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  currentMission = 0;
  restarts++;

  partCategoriesContainer.innerHTML = "";

  generatePartCategories();
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
  const storedSave = localStorage.getItem("saveFile");

  if (!storedSave) {
    const initialSave = {
      ostChips,
      acquiredParts,
      currentEnding,
      currentMission,
      restarts,
      missionsData,
      rolledParts,
      badgesEarned,
    };
    localStorage.setItem("ac6rlSaveData", JSON.stringify(initialSave));
    return;
  }

  const saveFile = JSON.parse(storedSave);
  let updatedSaveObj = {
    ostChips,
    currentEnding,
    currentMission,
    acquiredParts,
    restarts,
    missionsData,
    rolledParts,
    badgesEarned,
  };

  localStorage.setItem("ac6rlSaveData", JSON.stringify(updatedSaveObj));
};

const loadSavedProgress = () => {
  const storedSave = localStorage.getItem("ac6rlSaveData");

  // if we find save data
  if (storedSave) {
    const saveFile = JSON.parse(storedSave);

    currentEnding = saveFile.currentEnding;
    currentMission = saveFile.currentMission;
    acquiredParts = saveFile.acquiredParts;
    ostChips = saveFile.ostChips;
    restarts = saveFile.restarts;
    missionsData = saveFile.missionsData;
    rolledParts = saveFile.rolledParts;
    badgesEarned = saveFile.badgesEarned;

    for (let n = 0; n < saveFile.acquiredParts.length; n++) {
      displayPartInCategory(saveFile.acquiredParts[n]);
    }

    // derive remaining pool from PARTS minus already obtained parts
    const obtainedKeys = new Set(
      acquiredParts.map((p) => p.name + "|" + p.img),
    );
    parts = PARTS.filter((p) => !obtainedKeys.has(p.name + "|" + p.img));

    ostChipsText.innerHTML = ostChips;
    genBadgesShelfContent(badgesEarned);
    generateMissionScreen(currentEnding, currentMission);

    // disable mission complete and mission failed buttons and dont trigger genMissionCompleteModalContent if challenge completed
    if (currentMission > MISSIONS[currentEnding].length - 1) {
      disableMissionButtons();
      return;
    }

    genMissionCompleteModalContent(currentEnding, currentMission);
    return;
  }

  // if no save data found
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
  // remove old save file just to be safe
  await deleteSaveData();
  localStorage.setItem("ac6rlSaveData", uploadedSaveFile);
  loadSavedProgress();
};

const deleteSaveData = () => {
  localStorage.removeItem("ac6rlSaveData");
  window.location.reload();
};

loadSavedProgress();
