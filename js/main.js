const partsListContainer = document.getElementById("parts-list-container");
const stageMenuButton = document.getElementById("dropdownMenuButton");

let s_tier_parts = [...S_TIER_PARTS];
let a_tier_parts = [...A_TIER_PARTS];
let b_tier_parts = [...B_TIER_PARTS];
let c_tier_parts = [...C_TIER_PARTS];
let d_tier_parts = [...D_TIER_PARTS];

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

const getPartFromList = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return { part: list[randomIndex], index: randomIndex };
};

const removePartFromList = (list, index) => {
    list.splice(index, 1);
    console.log(list.length);
};

const displayPart = (part) => {
    partsListContainer.innerHTML += `
        <li class="list-group-item">
          ${part}
        </li>
    `;
};

const rollForPart = (stage = "1") => {
    let partsList;
    const minMaxs = stageMinMax(stage);
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber <= minMaxs[0]) {
        partsList = d_tier_parts;
    } else if (randomNumber <= minMaxs[1] && randomNumber > minMaxs[0]) {
        partsList = c_tier_parts;
    } else if (randomNumber <= minMaxs[2] && randomNumber > minMaxs[1]) {
        partsList = b_tier_parts;
    } else if (randomNumber <= minMaxs[3] && randomNumber > minMaxs[2]) {
        partsList = a_tier_parts;
    } else if (randomNumber <= minMaxs[4] && randomNumber > minMaxs[3]) {
        partsList = s_tier_parts;
    } else {
        console.log("error");
    }
    if (partsList) {
        const partInfo = getPartFromList(partsList);
        const { part, index } = partInfo;
        removePartFromList(partsList, index);
        displayPart(part);
    }
};

const clearList = () => {
    partsListContainer.innerHTML = "";
};

const setStage = (stage) => {
    stageMenuButton.innerHTML = `Stage ${stage}`;
};
