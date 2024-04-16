import {
    s_tier_parts,
    a_tier_parts,
    b_tier_parts,
    c_tier_parts,
    d_tier_parts
} from "./parts";

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
    return list[Math.floor(Math.random() * list.length)];
};

const main = (stage = "1") => {
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
    const part = getPartFromList(partsList);
};

main();
