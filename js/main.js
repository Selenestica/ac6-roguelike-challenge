const stageMenuButton = document.getElementById("dropdownMenuButton");
const rollButton = document.getElementById("rollButton");
const partCategoryElements = document.getElementsByClassName("partCategory");
const partCategoryAccordionButton = document.getElementsByClassName(
    "partCategoryAccordionButton"
);
const newPartModalLabel = document.getElementById("newPartModalLabel");
const newPartModalImg = document.getElementById("newPartModalImg");
const tierBadge = document.getElementById("tierBadge");
const optionalCheckboxes = document.getElementsByClassName("optionalCheckbox");
const uploadSaveFileInputElement = document.getElementById(
    "uploadSaveFileInput"
);
const uploadSaveFileButton = document.getElementById("uploadSaveFileButton");

for (let z = 0; z < optionalCheckboxes.length; z++) {
    optionalCheckboxes[z].addEventListener("change", (e) => {
        const challengeProgressObj = {
            elementId: e.srcElement.id,
            checked: e.target.checked
        };
        saveProgress(null, null, challengeProgressObj);
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
    if (stage === "1") {
        return [35, 65, 85, 95, 100];
    }
    if (stage === "2") {
        return [15, 50, 85, 95, 100];
    }
    if (stage === "3") {
        return [5, 30, 70, 90, 100];
    }
    if (stage === "4") {
        return [5, 25, 55, 85, 100];
    }
    if (stage === "5") {
        return [5, 15, 45, 75, 100];
    }
};

// grab part from the given parts list and return the part and the index of it for easy removal from the list
const getPartFromList = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return {
        part: list[randomIndex],
        index: randomIndex
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

const displayPartInCategory = (part) => {
    let partAccordion;
    let partAccordionButton;
    const partTypeSubstring = part.name.substr(0, 9);
    for (let i = 0; i < partCategoriesArray.length; i++) {
        if (partTypeSubstring.includes(partCategoriesArray[i])) {
            partAccordion = document.getElementsByClassName(
                partCategoriesArray[i]
            )[0];
            partAccordion.innerHTML += `
                <div class="accordion-body text-light">
                    <div class="d-flex row justify-content-center">
                        <div class="d-flex col-5 accordionPartImgContainer justify-content-end">
                            <img class="img-fluid" src="${part.img}" />
                        </div>
                        <div class="d-flex col-6 text-light justify-content-start align-items-center">
                            ${part.name}
                        </div>
                    </div>
                </div>`;
            partAccordionButton = document.getElementById(
                `${partCategoriesArray[i]}CategoryButton`
            );
            partAccordionButton.innerHTML = `
                ${partCategoriesArray[i]}                         
                <h5 class="my-0 mx-2">
                    <span class="badge bg-primary">${partAccordion.childElementCount}</span>
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
    // if there's no parts left, button is disabled, and clicking will do nothing
    if (rollButton.classList.contains("disabled")) {
        return;
    }

    // roll logic starts
    let partsListObj;
    const stage = getStage();
    const minMaxs = stageMinMax(stage);
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber <= minMaxs[0] && d_tier_parts.length > 0) {
        partsListObj = { list: d_tier_parts, tier: "d" };
    } else if (
        randomNumber <= minMaxs[1] &&
        randomNumber > minMaxs[0] &&
        c_tier_parts.length > 0
    ) {
        partsListObj = { list: c_tier_parts, tier: "c" };
    } else if (
        randomNumber <= minMaxs[2] &&
        randomNumber > minMaxs[1] &&
        b_tier_parts.length > 0
    ) {
        partsListObj = { list: b_tier_parts, tier: "b" };
    } else if (
        randomNumber <= minMaxs[3] &&
        randomNumber > minMaxs[2] &&
        a_tier_parts.length > 0
    ) {
        partsListObj = { list: a_tier_parts, tier: "a" };
    } else if (
        randomNumber <= minMaxs[4] &&
        randomNumber > minMaxs[3] &&
        s_tier_parts.length > 0
    ) {
        partsListObj = { list: s_tier_parts, tier: "s" };
    } else {
        // re-roll until we get a good number. this logic could probably be improved.
        rollForPart();
        return;
    }

    const partInfo = getPartFromList(partsListObj.list);
    const { part, index } = partInfo;
    currentPart = {
        list: partsListObj.list,
        part,
        index
    };
    populateNewPartModal(part, partsListObj.tier);
};

// this function handles accepting new parts as well as
// as well as populating the obtained parts list from a save
const acceptPart = (savedPart = null) => {
    const valToUse = savedPart ? savedPart : currentPart;
    const { list, part, index } = valToUse;
    const partToSave = { ...valToUse };
    displayPartInCategory(part);
    if (!savedPart) {
        removePartFromList(list, index);
        areAllPartsAcquired();
        saveProgress(partToSave, null, null);
    }
    currentPart = null;
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
    saveProgress(null, stage, null);
};

const togglePartsAccordions = () => {
    if (accordionsCollapsed) {
        for (let i = 0; i < partCategoryAccordionButton.length; i++) {
            if (
                partCategoryAccordionButton[i].classList.contains("collapsed")
            ) {
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

const saveProgress = (part, stage, challenge) => {
    let copiedPart = null;

    // remove unneeded attributes from part obj
    if (part) {
        copiedPart = { ...part };
        delete copiedPart.list;
        delete copiedPart.index;
    }

    const storedSave = localStorage.getItem("saveFile");
    let newSave;
    if (!storedSave) {
        const initialSave = {
            parts: part ? [copiedPart] : [],
            stage: stage ?? "1",
            challengesCompleted: challenge ? [challenge.elementId] : [],
            partsLists: {
                s: s_tier_parts,
                a: a_tier_parts,
                b: b_tier_parts,
                c: c_tier_parts,
                d: d_tier_parts
            }
        };
        localStorage.setItem("saveFile", JSON.stringify(initialSave));
        return;
    }
    const saveFile = JSON.parse(storedSave);
    if (part) {
        // save part
        const oldObtainedPartsList = [...saveFile.parts];
        oldObtainedPartsList.push(copiedPart);

        // save parts lists
        const updatedPartsLists = {
            s: s_tier_parts,
            a: a_tier_parts,
            b: b_tier_parts,
            c: c_tier_parts,
            d: d_tier_parts
        };

        newSave = {
            ...saveFile,
            parts: oldObtainedPartsList,
            partsLists: updatedPartsLists
        };
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

        // set saved stage
        setStage(saveFile.stage);

        // populate completed challenges
        for (let i = 0; i < saveFile.challengesCompleted.length; i++) {
            const completedChallengeElement = document.getElementById(
                saveFile.challengesCompleted[i]
            );
            completedChallengeElement.checked = true;
        }

        // loops through acceptParts. which populates and removes
        for (let n = 0; n < saveFile.parts.length; n++) {
            acceptPart(saveFile.parts[n]);
        }

        // sets parts lists
        s_tier_parts = saveFile.partsLists.s;
        a_tier_parts = saveFile.partsLists.a;
        b_tier_parts = saveFile.partsLists.b;
        c_tier_parts = saveFile.partsLists.c;
        d_tier_parts = saveFile.partsLists.d;
        areAllPartsAcquired();
    }
};

loadSavedProgress();

const uploadSaveFile = () => {
    reset();
    localStorage.setItem("saveFile", uploadedSaveFile);
    loadSavedProgress();
};
