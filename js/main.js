const stageMenuButton = document.getElementById("dropdownMenuButton");
const rollButton = document.getElementById("rollButton");
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
const missionButtonsDiv = document.getElementById("missionButtonsDiv");
const inventoryScreen = document.getElementById("inventoryScreen");

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

let uploadedSaveFile = null;

let parts = [...PARTS];
let ostChips = 0;
let partCounter = 0;
let accordionsCollapsed = true;
let currentPart = null;
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
      }
      if (e.srcElement.id === "inventoryButton") {
        missionButtonsDiv.style.display = "none";
        missionViewScreen.classList.toggle("d-none", true);
        inventoryScreen.classList.toggle("d-none", false);
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

// returns per-tier weights [d, c, b, a, s] for the given stage
const stageWeights = (stage) => {
  if (stage === "1") return [35, 30, 20, 10, 5];
  if (stage === "2") return [15, 35, 35, 10, 5];
  if (stage === "3") return [5, 25, 40, 20, 10];
  if (stage === "4") return [5, 20, 30, 30, 15];
  if (stage === "5") return [5, 10, 30, 30, 25];
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

const populateNewPartModal = (part) => {
  newPartModalLabel.innerText = part.name;
  newPartModalImg.innerHTML = `<img src="assets/images/${part.img}" />`;
  tierBadge.innerText = part.tier.toUpperCase();
  tierBadge.className = "";
  tierBadge.classList.add("badge", "text-dark", `bg-${part.tier}-tier`);
};

const rollForPart = () => {
  if (parts.length === 0) {
    // this will probably never happen. in fact i dont think its possible
    console.log("no more parts to roll!");
    return;
  }

  const stage = getStage();
  const weights = stageWeights(stage);
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

  currentPart = { part: chosenPart, index: partsIndex };
  populateNewPartModal(chosenPart);
};

// handles accepting new parts as well as populating the obtained parts list from a save
const acceptPart = (savedPart = null) => {
  const partToUse = savedPart ? savedPart : currentPart.part;
  displayPartInCategory(partToUse);
  if (!savedPart) {
    parts.splice(currentPart.index, 1);
    saveProgress(partToUse, null, null, null);
  }
  currentPart = null;
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

// resets everything back to initial state
const reset = () => {
  // we probably don't want to do this here, since we're going to roll over OST chips between each reset
  // localStorage.removeItem("saveFile");

  parts = [...PARTS];
  rollButton.classList.remove("disabled");

  partCategoriesContainer.innerHTML = "";
  generatePartCategories();
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

const saveProgress = (partAdd, partRemove, stage, challenge) => {
  const storedSave = localStorage.getItem("saveFile");
  let newSave;

  if (!storedSave) {
    const initialSave = {
      parts: partAdd ? [partAdd] : [],
      stage: stage ?? "1",
      challengesCompleted: challenge ? [challenge.elementId] : [],
    };
    localStorage.setItem("saveFile", JSON.stringify(initialSave));
    return;
  }

  const saveFile = JSON.parse(storedSave);

  if (partAdd) {
    newSave = { ...saveFile, parts: [...saveFile.parts, partAdd] };
  }
  if (partRemove) {
    const updatedParts = saveFile.parts.filter(
      (p) => !(p.name === partRemove.name && p.img === partRemove.img),
    );
    newSave = { ...saveFile, parts: updatedParts };
  }
  if (stage) {
    newSave = { ...saveFile, stage };
  }
  if (challenge) {
    const { elementId, checked } = challenge;
    const oldList = [...saveFile.challengesCompleted];
    if (!checked) {
      oldList.splice(oldList.indexOf(elementId), 1);
    } else {
      oldList.push(elementId);
    }
    newSave = { ...saveFile, challengesCompleted: oldList };
  }

  localStorage.setItem("saveFile", JSON.stringify(newSave));
};

const loadSavedProgress = () => {
  const storedSave = localStorage.getItem("saveFile");

  // if we find save data
  if (storedSave) {
    const saveFile = JSON.parse(storedSave);
    const { challengesCompleted, ending, mission } = saveFile;

    currentEnding = ending;
    currentMission = mission;

    for (let i = 0; i < challengesCompleted.length; i++) {
      document.getElementById(challengesCompleted[i]).checked = true;
    }
    for (let n = 0; n < saveFile.parts.length; n++) {
      acceptPart(saveFile.parts[n]);
    }

    // derive remaining pool from PARTS minus already obtained parts
    const obtainedKeys = new Set(parts.map((p) => p.name + "|" + p.img));
    parts = PARTS.filter((p) => !obtainedKeys.has(p.name + "|" + p.img));

    // when loading up, show the correct mission according to the save file
    generateMissionScreen(ending, mission);
    return;
  }

  // if no save data found
  generateMissionScreen(currentEnding, currentMission);
};

loadSavedProgress();

const uploadSaveFile = () => {
  reset();
  localStorage.setItem("saveFile", uploadedSaveFile);
  loadSavedProgress();
};
