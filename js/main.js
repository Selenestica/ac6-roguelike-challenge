const partsListContainer = document.getElementById("parts-list-container");
const stageMenuButton = document.getElementById("dropdownMenuButton");
const rollButton = document.getElementById("rollButton");

let s_tier_parts = [...S_TIER_PARTS];
let a_tier_parts = [...A_TIER_PARTS];
let b_tier_parts = [...B_TIER_PARTS];
let c_tier_parts = [...C_TIER_PARTS];
let d_tier_parts = [...D_TIER_PARTS];

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
    return { part: list[randomIndex], index: randomIndex };
};

// removes the part from the list so we don't get duplicates because that's annoying
const removePartFromList = (list, index) => {
    list.splice(index, 1);
};

// check to see if player has obtained all parts. boolean
const areAllPartsAcquired = () => {
    if (
        s_tier_parts.length === 0 &&
        a_tier_parts.length === 0 &&
        b_tier_parts.length === 0 &&
        c_tier_parts.length === 0 &&
        d_tier_parts.length === 0
    ) {
        return true;
    }
    return false;
};

// displays the part in the UI
const displayPart = (part) => {
    partsListContainer.innerHTML += `
        <li class="list-group-item">
          ${part}
        </li>
    `;
};

const rollForPart = () => {
    // if there's no parts left, button is disabled, and clicking will do nothing
    if (rollButton.classList.contains("disabled")) {
        return;
    }

    // roll logic starts
    let partsList;
    const stage = getStage();
    const minMaxs = stageMinMax(stage);
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber <= minMaxs[0] && d_tier_parts.length > 0) {
        partsList = d_tier_parts;
    } else if (
        randomNumber <= minMaxs[1] &&
        randomNumber > minMaxs[0] &&
        c_tier_parts.length > 0
    ) {
        partsList = c_tier_parts;
    } else if (
        randomNumber <= minMaxs[2] &&
        randomNumber > minMaxs[1] &&
        b_tier_parts.length > 0
    ) {
        partsList = b_tier_parts;
    } else if (
        randomNumber <= minMaxs[3] &&
        randomNumber > minMaxs[2] &&
        a_tier_parts.length > 0
    ) {
        partsList = a_tier_parts;
    } else if (
        randomNumber <= minMaxs[4] &&
        randomNumber > minMaxs[3] &&
        s_tier_parts.length > 0
    ) {
        partsList = s_tier_parts;
    } else {
        // re-roll until we get a good number. this logic could probably be improved.
        rollForPart();
        return;
    }

    const partInfo = getPartFromList(partsList);
    const { part, index } = partInfo;
    removePartFromList(partsList, index);
    displayPart(part);
    const allPartsAcquired = areAllPartsAcquired();
    if (allPartsAcquired) {
        rollButton.classList.add("disabled");
        return;
    }
};

// resets the parts list in the UI and the re-populates the parts lists
const clearList = () => {
    partsListContainer.innerHTML = "";
    s_tier_parts = [...S_TIER_PARTS];
    a_tier_parts = [...A_TIER_PARTS];
    b_tier_parts = [...B_TIER_PARTS];
    c_tier_parts = [...C_TIER_PARTS];
    d_tier_parts = [...D_TIER_PARTS];
    rollButton.classList.remove("disabled");
};

const getStage = () => {
    return stageMenuButton.innerText.slice(-2).trim();
};

// set stage to affect chances of obtaining parts of different tiers
const setStage = (stage) => {
    stageMenuButton.innerHTML = `Stage ${stage}`;
};
