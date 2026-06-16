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
const ostChipsDiv = document.getElementById("ostChipsDiv");
const ostChipsText = document.getElementById("ostChipsText");
const missionButtonsDiv = document.getElementById("missionButtonsDiv");
const inventoryScreen = document.getElementById("inventoryScreen");
const newPartModal = document.getElementById("newPartModal");

// defines how individual categories are grouped for rolling purposes
// subject to change
const CATEGORY_GROUPS = {
  head: ["head"],
  fcs: ["fcs"],
  internals: ["core", "generator", "booster"],
  arms_legs: ["arms", "legs"],
  weapons: ["r-arm", "l-arm", "r-back", "l-back"],
};

let currentEnding = "firesOfRavenMissions";
let currentMission = 0;
let acquiredParts = [];
let restarts = 0;
let completedMissionsData = [];

let uploadedSaveFile = null;

let parts = [...PARTS];
let ostChips = 0;
let partCounter = 0;
let accordionsCollapsed = true;
let currentParts = [];
let rolledParts = [];
let currentView = "missionViewButton";

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
        <div class="d-flex col-4 text-light justify-content-end align-items-center">
          <button
            type="button"
            class="btn btn-danger"
            onclick="removePart('${part.name}', '${part.img}', '${part.tier}', '${part.category}', '${partRowID}')"
          >
            <i class="fa-solid fa-trash"></i>
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

const populateNewPartsModal = () => {
  newPartModalBody.innerHTML = "";
  for (let i = 0; i < currentParts.length; i++) {
    const { part } = currentParts[i];
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

const rollForPart = (amount) => {
  if (parts.length === 0) {
    // this will probably never happen. in fact i dont think its possible
    console.log("no more parts to roll!");
    return;
  }
  if (rolledParts.length > 0) {
    currentParts = rolledParts;
    populateNewPartsModal();
    return;
  }

  const { chapter } = MISSIONS[currentEnding][currentMission];
  const weights = chapterWeights(chapter);
  const tiers = ["d", "c", "b", "a", "s"];

  // step 1: roll category — filter out exhausted groups and re-normalize
  const categoryPool = Object.entries(CATEGORY_GROUPS)
    .filter(([_, cats]) => parts.some((p) => cats.includes(p.category)))
    .map(([group, cats]) => ({ group, cats }));

  const categoryRoll = Math.random() * categoryPool.length;
  const chosenGroup = categoryPool[Math.floor(categoryRoll)];

  // parts available in this category group
  const partsInGroup = parts.filter((p) =>
    chosenGroup.cats.includes(p.category),
  );

  // step 2: roll tier — filter to tiers that have parts in this group, re-normalize weights
  const tierPool = tiers
    .map((tier, i) => ({ tier, weight: weights[i] }))
    .filter(({ tier }) => partsInGroup.some((p) => p.tier === tier));

  const totalWeight = tierPool.reduce((sum, t) => sum + t.weight, 0);
  let tierRoll = Math.random() * totalWeight;
  const chosenTier = tierPool.find((t) => (tierRoll -= t.weight) < 0).tier;

  // step 3: pick a random part from the chosen category group + tier
  const eligibleParts = partsInGroup.filter((p) => p.tier === chosenTier);
  const randomIndex = Math.floor(Math.random() * eligibleParts.length);
  const chosenPart = eligibleParts[randomIndex];

  // find the index in the main parts array for removal later
  const partsIndex = parts.indexOf(chosenPart);

  currentParts.push({ part: chosenPart, index: partsIndex });

  if (amount === 2 && currentParts.length < 2) {
    // exclude the first rolled part from the pool for the second roll
    parts = parts.filter((_, i) => i !== partsIndex);
    rollForPart(amount - 1);
    // restore the part to the pool since neither has been accepted yet
    parts.splice(partsIndex, 0, chosenPart);
    return;
  }
  rolledParts = [...currentParts];
  saveProgress();
  populateNewPartsModal();
};

const acceptPart = async (chosenIndex) => {
  const chosen = currentParts[chosenIndex];
  acquiredParts.push(chosen.part);
  displayPartInCategory(chosen.part);
  parts.splice(chosen.index, 1);

  await earnOSTChips();
  await proceedToNextMission();

  rolledParts = [];
  currentParts = [];
  saveProgress();
};

// removes part from the accordion and adds it back to the pool
const removePart = (partName, partImg, partTier, partCategory, rowID) => {
  const badgeEl = document.getElementById(`${partCategory}CategoryButtonBadge`);
  const badgeNumber = parseInt(badgeEl.innerHTML);
  badgeEl.innerHTML = badgeNumber > 1 ? badgeNumber - 1 : "";

  document.getElementById(rowID).remove();

  // find the full part object from PARTS to add back to the pool
  const partToRestore = PARTS.find(
    (p) => p.name === partName && p.img === partImg,
  );
  if (partToRestore) {
    parts.push(partToRestore);
  }

  saveProgress(null, { name: partName, img: partImg }, null, null);
};

const earnOSTChips = () => {
  if (MISSIONS[currentEnding][currentMission].ostChipReward) {
    ostChips += MISSIONS[currentEnding][currentMission].ostChipReward;
    ostChipsText.innerHTML = ostChips;
  }
};

const proceedToNextMission = () => {
  // check to see if this is last mission in ending array
  // if so, set current ending to next ending and set currentMission to 0
  // if not then currentMission++
  if (currentMission < MISSIONS[currentEnding].length - 1) {
    currentMission++;
    generateMissionScreen(currentEnding, currentMission);
    return;
  }

  if (currentEnding === "firesOfRavenMissions") {
    currentEnding = "liberatorOfRubiconMissions";
  }
  if (currentEnding === "liberatorOfRubiconMissions") {
    currentEnding = "aleaIactaEstMissions";
  }
  if (currentEnding === "aleaIactaEstMissions") {
    generateMissionScreen(currentEnding, currentMission);
    return;
  }
  currentMission = 0;
  generateMissionScreen(currentEnding, currentMission);
  return;
};

// restarts a run. OST chips are kept as well as restarts and missionData
const reset = () => {
  // we probably don't want to do this here, since we're going to roll over OST chips between each reset
  // localStorage.removeItem("saveFile");

  parts = [...PARTS];
  acquiredParts = [];
  rolledParts = [];
  currentEnding = "firesOfRavenMissions";
  currentMission = 0;

  generateMissionScreen(currentEnding, currentMission);
  partCategoriesContainer.innerHTML = "";
  generatePartCategories();
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
      completedMissionsData,
      rolledParts,
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
    completedMissionsData,
    rolledParts,
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
    completedMissionsData = saveFile.completedMissionsData;
    rolledParts = saveFile.rolledParts;

    for (let n = 0; n < saveFile.acquiredParts.length; n++) {
      displayPartInCategory(saveFile.acquiredParts[n]);
    }

    // derive remaining pool from PARTS minus already obtained parts
    const obtainedKeys = new Set(
      acquiredParts.map((p) => p.name + "|" + p.img),
    );
    parts = PARTS.filter((p) => !obtainedKeys.has(p.name + "|" + p.img));

    // when loading up, show the correct mission according to the save file
    ostChipsText.innerHTML = ostChips;
    generateMissionScreen(currentEnding, currentMission);
    genMissionCompleteModalContent(currentEnding, currentMission);
    return;
  }

  // if no save data found
  ostChipsText.innerHTML = ostChips;
  generateMissionScreen(currentEnding, currentMission);
  genMissionCompleteModalContent(currentEnding, currentMission);
};

loadSavedProgress();

const uploadSaveFile = () => {
  reset();
  localStorage.setItem("ac6rlSaveData", uploadedSaveFile);
  loadSavedProgress();
};
