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

for (let z = 0; z < optionalCheckboxes.length; z++) {
  optionalCheckboxes[z].addEventListener("change", (e) => {
    const challengeProgressObj = {
      elementId: e.srcElement.id,
      checked: e.target.checked,
    };
    saveProgress(null, null, null, challengeProgressObj);
  });
}

let uploadedSaveFile = null;

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

let s_tier_parts = [...S_TIER_PARTS];
let a_tier_parts = [...A_TIER_PARTS];
let b_tier_parts = [...B_TIER_PARTS];
let c_tier_parts = [...C_TIER_PARTS];
let d_tier_parts = [...D_TIER_PARTS];

let partCounter = 0;

let accordionsCollapsed = true;

let currentPart = null;

// returns tier list chances for given stage
const stageMinMax = (stage) => {
  if (stage === "1") return [35, 30, 20, 10, 5];
  if (stage === "2") return [15, 35, 35, 10, 5];
  if (stage === "3") return [5, 25, 40, 20, 10];
  if (stage === "4") return [5, 20, 30, 30, 15];
  if (stage === "5") return [5, 10, 30, 30, 25];
};

// grab part from the given parts list and return the part and the index of it for easy removal from the list
const getPartFromList = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return {
    part: list[randomIndex],
    index: randomIndex,
  };
};

// removes the part from the list so we don't get duplicates because that's annoying
const removePartFromList = (list, index) => {
  list.splice(index, 1);
};

// check to see if player has obtained all parts
const areAllPartsAcquired = () => {
  if (
    s_tier_parts.length === 0 &&
    a_tier_parts.length === 0 &&
    b_tier_parts.length === 0 &&
    c_tier_parts.length === 0 &&
    d_tier_parts.length === 0
  ) {
    rollButton.classList.add("disabled");
    return;
  }
  rollButton.classList.remove("disabled");
  return;
};

const displayPartInCategory = (part, tier) => {
  partCounter++;
  const partImgEnd = part.img.substr(0, part.img.length - 4);
  const partImgSubstring = partImgEnd.substr(partImgEnd.lastIndexOf("/") + 1);
  const partRowID = partImgSubstring + partCounter;
  let partAccordion;
  let partAccordionButton;
  const partTypeSubstring = part.name.substr(0, 9);
  for (let i = 0; i < partCategoriesArray.length; i++) {
    if (partTypeSubstring.includes(partCategoriesArray[i])) {
      partAccordion = document.getElementsByClassName(
        partCategoriesArray[i],
      )[0];
      partAccordion.innerHTML += `
                <div class="accordion-body text-light" id="${partRowID}">
                    <div class="d-flex row justify-content-center">
                        <div class="d-flex col-4 accordionPartImgContainer justify-content-end">
                            <img class="img-fluid" src="${part.img}" />
                        </div>
                        <div class="d-flex col-4 text-light justify-content-start align-items-center">
                            ${part.name}
                        </div>
                        <div class="d-flex col-4 text-light justify-content-end align-items-center">
                            <button
                                id="removePartButton"
                                type="button"
                                class="btn btn-danger"
                                onclick="removePart('${part.name}', '${part.img}', '${tier}', '${partCategoriesArray[i]}CategoryButtonBadge', '${partRowID}')"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
      partAccordionButton = document.getElementById(
        `${partCategoriesArray[i]}CategoryButton`,
      );
      partAccordionButton.innerHTML = `
                ${partCategoriesArray[i]}                         
                <h5 class="my-0 mx-2">
                    <span id="${partCategoriesArray[i]}CategoryButtonBadge" class="badge bg-primary">${partAccordion.childElementCount}</span>
                </h5>`;
      break;
    }
  }
};

const populateNewPartModal = (part, tier) => {
  newPartModalLabel.innerText = part.name;
  newPartModalImg.innerHTML = `<img src="./${part.img}" />`;
  tierBadge.innerText = tier.toUpperCase();
  tierBadge.className = "";
  tierBadge.classList.add("badge", "text-dark");
  tierBadge.classList.add(`bg-${tier}-tier`);
};

const rollForPart = () => {
  if (rollButton.classList.contains("disabled")) return;

  const stage = getStage();
  const weights = stageMinMax(stage);

  const tierWeights = [
    { list: d_tier_parts, tier: "d", weight: weights[0] },
    { list: c_tier_parts, tier: "c", weight: weights[1] },
    { list: b_tier_parts, tier: "b", weight: weights[2] },
    { list: a_tier_parts, tier: "a", weight: weights[3] },
    { list: s_tier_parts, tier: "s", weight: weights[4] },
  ].filter((t) => t.list.length > 0);

  const totalWeight = tierWeights.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * totalWeight;

  const chosen = tierWeights.find((t) => (roll -= t.weight) < 0);
  const { part, index } = getPartFromList(chosen.list);

  currentPart = { list: chosen.list, part, index, tier: chosen.tier };
  populateNewPartModal(part, chosen.tier);
};

// this function handles accepting new parts as well as
// populating the obtained parts list from a save
const acceptPart = (savedPart = null) => {
  const valToUse = savedPart ? savedPart : currentPart;
  const { list, part, index, tier } = valToUse;
  const partToSave = { ...valToUse };
  displayPartInCategory(part, tier);
  if (!savedPart) {
    removePartFromList(list, index);
    areAllPartsAcquired();
    saveProgress(partToSave, null, null, null);
  }
  currentPart = null;
};

// removes parts from the accordion
// then adds the part back to the list
const removePart = (partName, partImage, partTier, catButtBadge, rowID) => {
  const categoryButtonBadge = document.getElementById(catButtBadge);
  const badgeNumber = parseInt(categoryButtonBadge.innerHTML);
  if (badgeNumber === 1) {
    categoryButtonBadge.innerHTML = "";
  }
  if (badgeNumber > 1) {
    categoryButtonBadge.innerHTML = badgeNumber - 1;
  }
  // remove part from the accordion
  const partRow = document.getElementById(rowID);
  partRow.remove();

  // remove part from the obtained parts list, but add back in part pool
  const partToRemove = {
    name: partName,
    img: partImage,
  };
  // add pack to pool
  if (partTier === "s") {
    s_tier_parts.push(partToRemove);
  }
  if (partTier === "a") {
    a_tier_parts.push(partToRemove);
  }
  if (partTier === "b") {
    b_tier_parts.push(partToRemove);
  }
  if (partTier === "c") {
    c_tier_parts.push(partToRemove);
  }
  if (partTier === "d") {
    d_tier_parts.push(partToRemove);
  }

  // remove part from the obtained parts list
  saveProgress(null, partToRemove, null, null);
};

// resets the parts list in the UI and the re-populates the parts lists
const reset = () => {
  // remove save from localStorage
  localStorage.removeItem("saveFile");

  // resets parts lists
  s_tier_parts = [...S_TIER_PARTS];
  a_tier_parts = [...A_TIER_PARTS];
  b_tier_parts = [...B_TIER_PARTS];
  c_tier_parts = [...C_TIER_PARTS];
  d_tier_parts = [...D_TIER_PARTS];
  rollButton.classList.remove("disabled");

  // reset parts in part categories
  partCategoriesContainer.innerHTML = "";
  generatePartCategories();

  // reset stage to 1
  setStage("1");

  // reset optional objective checklists
  for (let n = 0; n < optionalCheckboxes.length; n++) {
    optionalCheckboxes[n].checked = false;
  }
};

// returns the selected stage
const getStage = () => {
  return stageMenuButton.innerText.slice(-2).trim();
};

// set stage to affect chances of obtaining parts of different tiers
const setStage = (stage) => {
  stageMenuButton.innerHTML = `Stage ${stage}`;
  saveProgress(null, null, stage, null);
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
  return;
};

const saveProgress = (partAdd, partRemove, stage, challenge) => {
  let copiedPart = null;

  // remove unneeded attributes from part obj
  if (partAdd) {
    copiedPart = { ...partAdd };
    delete copiedPart.list;
    delete copiedPart.index;
    delete copiedPart.tier;
  }

  const storedSave = localStorage.getItem("saveFile");
  let newSave;
  if (!storedSave) {
    const initialSave = {
      parts: partAdd ? [copiedPart] : [],
      stage: stage ?? "1",
      challengesCompleted: challenge ? [challenge.elementId] : [],
    };
    localStorage.setItem("saveFile", JSON.stringify(initialSave));
    return;
  }
  const saveFile = JSON.parse(storedSave);
  if (partAdd) {
    // save part
    const oldObtainedPartsList = [...saveFile.parts];
    oldObtainedPartsList.push(copiedPart);

    newSave = {
      ...saveFile,
      parts: oldObtainedPartsList,
    };
  }
  if (partRemove) {
    // remove part
    // pobably need to loop through oldObtainedPartsList to find the part to remove
    const oldObtainedPartsList = [...saveFile.parts];
    const updatedObtainedPartsList = oldObtainedPartsList.filter((part) => {
      return part.part.name !== partRemove.name;
    });
    newSave = {
      ...saveFile,
      parts: updatedObtainedPartsList,
    };
    areAllPartsAcquired();
  }
  if (stage) {
    newSave = { ...saveFile, stage };
  }
  if (challenge) {
    const { elementId, checked } = challenge;
    const oldChallengeList = [...saveFile.challengesCompleted];
    if (!checked) {
      const challengeIndex = oldChallengeList.indexOf(elementId);
      oldChallengeList.splice(challengeIndex, 1);
    } else {
      oldChallengeList.push(elementId);
    }
    newSave = { ...saveFile, challengesCompleted: oldChallengeList };
  }
  localStorage.setItem("saveFile", JSON.stringify(newSave));
};

const loadSavedProgress = () => {
  const storedSave = localStorage.getItem("saveFile");
  if (storedSave) {
    const saveFile = JSON.parse(storedSave);

    setStage(saveFile.stage);

    for (let i = 0; i < saveFile.challengesCompleted.length; i++) {
      document.getElementById(saveFile.challengesCompleted[i]).checked = true;
    }

    for (let n = 0; n < saveFile.parts.length; n++) {
      acceptPart(saveFile.parts[n]);
    }

    // Derive remaining pools from the canonical lists minus obtained parts
    const obtainedNames = new Set(saveFile.parts.map((p) => p.part.name));
    s_tier_parts = S_TIER_PARTS.filter((p) => !obtainedNames.has(p.name));
    a_tier_parts = A_TIER_PARTS.filter((p) => !obtainedNames.has(p.name));
    b_tier_parts = B_TIER_PARTS.filter((p) => !obtainedNames.has(p.name));
    c_tier_parts = C_TIER_PARTS.filter((p) => !obtainedNames.has(p.name));
    d_tier_parts = D_TIER_PARTS.filter((p) => !obtainedNames.has(p.name));

    areAllPartsAcquired();
  }
};

loadSavedProgress();

const uploadSaveFile = () => {
  reset();
  localStorage.setItem("saveFile", uploadedSaveFile);
  loadSavedProgress();
};
