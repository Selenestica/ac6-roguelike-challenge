const partsListContainer = document.getElementById("parts-list-container");
const stageMenuButton = document.getElementById("dropdownMenuButton");
const rollButton = document.getElementById("rollButton");

let s_tier_parts = [...S_TIER_PARTS];
let a_tier_parts = [...A_TIER_PARTS];
let b_tier_parts = [...B_TIER_PARTS];
let c_tier_parts = [...C_TIER_PARTS];
let d_tier_parts = [...D_TIER_PARTS];

let partCounter = 0;

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
const displayPart = (part, tier) => {
    const id = "part" + partCounter;
    partsListContainer.innerHTML += `
        <li class="list-group-item" id="${id}">
            <div class="row">
                <div class="justify-content-start d-flex col-9">
                    ${part}
                </div>  
                <div class="justify-content-end d-flex col-3 align-items-center">
                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="removePartFromDisplay('${part}', '${id}', '${tier}')"
                    >
                        Delete
                    </button>
                </div>  
            </div>
        </li>
    `;
};

const removePartFromDisplay = (part, listId, tier) => {
    // add part back into it's tier list. might need to pass which tier list it belongs to to this func
    const listItem = document.getElementById(listId);
    partsListContainer.removeChild(listItem);
    console.log(tier, part);
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
    removePartFromList(partsListObj.list, index);
    displayPart(part, partsListObj.tier);
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

// returns the selected stage
const getStage = () => {
    return stageMenuButton.innerText.slice(-2).trim();
};

// set stage to affect chances of obtaining parts of different tiers
const setStage = (stage) => {
    stageMenuButton.innerHTML = `Stage ${stage}`;
};
