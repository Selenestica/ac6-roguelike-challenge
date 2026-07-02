const looseItemsContainer = document.getElementById("looseItemsContainer");
const tierPreview = document.getElementById("tierPreview");
const tierButtonPreviewLabel = document.getElementById(
  "tierButtonPreviewLabel",
);
const tierButtonPreviewSubLabel = document.getElementById(
  "tierButtonPreviewSubLabel",
);
const labelNameInput = document.getElementById("labelNameInput");
const subLabelNameInput = document.getElementById("subLabelNameInput");
const tierColorsList = document.getElementById("tierColorsList");
const reformattedOldDataModal = document.getElementById(
  "reformattedOldDataModal",
);
const tierCustomizationModal = document.getElementById(
  "tierCustomizationModal",
);
const deleteTierButton = document.getElementById("deleteTierButton");
const tierListContainer = document.getElementById("tierListContainer");

let OGpartsList = [...PARTS];
let newParts = [...OGpartsList];

let customizingTier = null;
let newTierIndex = null;
let itemsSize = "80px";
let showText = true;
let tiers = [
  { lab: "S", subLab: "", color: "", list: [] },
  { lab: "A", subLab: "", color: "", list: [] },
  { lab: "B", subLab: "", color: "", list: [] },
  { lab: "C", subLab: "", color: "", list: [] },
  { lab: "D", subLab: "", color: "", list: [] },
];

labelNameInput.addEventListener("input", (e) => {
  tierButtonPreviewLabel.innerText = e.target.value;
});

subLabelNameInput.addEventListener("input", (e) => {
  tierButtonPreviewSubLabel.innerText = e.target.value;
});

tierCustomizationModal.addEventListener("hidden.bs.modal", async () => {
  customizingTier = null;
  deleteTierButton.classList.toggle("d-none", true);
  labelNameInput.value = "";
  subLabelNameInput.value = "";
  tierButtonPreviewLabel.innerText = "";
  tierButtonPreviewSubLabel.innerText = "";
  tierPreview.style.backgroundColor = "#151c24";
});

const changeTierPreviewColor = (color) => {
  tierPreview.style.backgroundColor = color;
  newColor = color;
};

const populateTierListItems = async () => {
  for (let i = 0; i < tiers.length; i++) {
    const list = tiers[i].list;
    const tierCatElName = "tierCat" + i;
    const tierEl = document.getElementById(tierCatElName);
    const foundItems = newParts.filter((part) => list.includes(part.name));
    if (foundItems.length > 0) {
      for (let j = 0; j < list.length; j++) {
        const item = foundItems.find((p) => p.name === list[j]);
        if (item) tierEl.appendChild(generateItemCard(item));
      }
    }
  }
};

// MOBILE DRAG FUNCTIONS
let draggedItem = null;
let dragStartPosition = null;
let hasStartedDragging = false;
let cloneElement = null;
const DRAG_THRESHOLD = 10;

const handleTouchStart = (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  dragStartPosition = { x: touch.clientX, y: touch.clientY };
  hasStartedDragging = false;
  draggedItem = e.currentTarget;
  cloneElement = null;
};

const handleTouchMove = (e) => {
  e.preventDefault();
  const touch = e.touches[0];

  if (!hasStartedDragging) {
    const dx = touch.clientX - dragStartPosition.x;
    const dy = touch.clientY - dragStartPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < DRAG_THRESHOLD) return;

    hasStartedDragging = true;
    cloneElement = draggedItem.cloneNode(true);
    cloneElement.classList.add("dragging");
    cloneElement.style.position = "absolute";
    cloneElement.style.pointerEvents = "none";
    cloneElement.style.zIndex = "9999";
    cloneElement._original = draggedItem;
    document.body.appendChild(cloneElement);
    requestAnimationFrame(() => moveDraggedItem(touch));
  } else if (cloneElement) {
    moveDraggedItem(touch);
  }
};

const handleTouchEnd = async (e) => {
  e.preventDefault();
  if (!hasStartedDragging || !cloneElement) {
    resetTouchState();
    return;
  }

  const touch = e.changedTouches[0];
  const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  const tierContainer = dropTarget?.closest?.(".tierCategories");
  const looseContainer = dropTarget?.closest?.("#looseItemsContainer");

  if (tierContainer) {
    const original = cloneElement._original;
    if (original?.parentElement) original.parentElement.removeChild(original);
    cloneElement.classList.remove("dragging");
    cloneElement.style = "";
    tierContainer.appendChild(cloneElement);
    setupCardEvents(cloneElement);
    addItemToTierArray();
  } else if (looseContainer) {
    const original = cloneElement._original;
    if (original?.parentElement) {
      if (original.parentElement.id === "looseItemsContainer") {
        window.location.reload();
        resetTouchState();
        return;
      }
      original.parentElement.removeChild(original);
    }
    cloneElement.classList.remove("dragging");
    cloneElement.style = "";
    looseContainer.appendChild(cloneElement);
    setupCardEvents(cloneElement);
    addItemToTierArray();
    populateLooseItems();
  } else {
    cloneElement.remove();
  }

  resetTouchState();
};

const moveDraggedItem = (touch) => {
  const x = touch.clientX + window.scrollX;
  const y = touch.clientY + window.scrollY;
  cloneElement.style.left = `${x - cloneElement.offsetWidth / 2}px`;
  cloneElement.style.top = `${y - cloneElement.offsetHeight / 2}px`;
};

const resetTouchState = () => {
  draggedItem = null;
  cloneElement = null;
  dragStartPosition = null;
  hasStartedDragging = false;
};

// END MOBILE DRAG FUNCTIONS

const allowDrop = (e) => e.preventDefault();

const drag = (e) => {
  e.dataTransfer.setData("text/plain", e.currentTarget.id);
};

const drop = async (e) => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData("text/plain");
  const draggedItem = document.getElementById(itemId);
  if (!draggedItem) return;

  const dropTarget = e.target.closest(".tierItem");
  const parentTier = e.target.closest(".tierCategories");
  const looseContainer = e.target.closest("#looseItemsContainer");

  if (looseContainer) {
    if (draggedItem.parentElement?.id === "looseItemsContainer") return;
    looseContainer.appendChild(draggedItem);
    await addItemToTierArray();
    populateLooseItems();
    return;
  }

  if (!parentTier) return;

  if (dropTarget && dropTarget !== draggedItem) {
    parentTier.insertBefore(draggedItem, dropTarget);
  } else {
    parentTier.appendChild(draggedItem);
  }

  addItemToTierArray();
};

const addItemToTierArray = async () => {
  for (let k = 0; k < tiers.length; k++) {
    tiers[k].list = [];
  }
  const tierCategories = document.querySelectorAll(".tierCategories");
  for (let i = 0; i < tierCategories.length; i++) {
    const tc = tierCategories[i];
    for (let j = 0; j < tc.children.length; j++) {
      tiers[i].list.push(tc.children[j].id);
    }
  }
  saveProgress();
};

const startNewTierList = async () => {
  tiers = [
    { lab: "S", subLab: "", color: "", list: [] },
    { lab: "A", subLab: "", color: "", list: [] },
    { lab: "B", subLab: "", color: "", list: [] },
    { lab: "C", subLab: "", color: "", list: [] },
    { lab: "D", subLab: "", color: "", list: [] },
  ];
  tierListContainer.innerHTML = "";
  createTiers();
  await populateLooseItems();
};

const populateLooseItems = () => {
  looseItemsContainer.innerHTML = "";
  newParts = [...OGpartsList];

  const selectedItems = tiers.flatMap((t) => t.list);

  newParts.forEach((part) => {
    if (!selectedItems.includes(part.name)) {
      looseItemsContainer.appendChild(generateItemCard(part));
    }
  });
};

const setupCardEvents = (card) => {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    card.setAttribute("draggable", "true");
    card.ondragstart = drag;
  } else {
    card.setAttribute("draggable", "false");
  }
  card.addEventListener("touchstart", handleTouchStart, { passive: false });
  card.addEventListener("touchmove", handleTouchMove, { passive: false });
  card.addEventListener("touchend", handleTouchEnd, { passive: false });
};

const generateItemCard = (part) => {
  const card = document.createElement("div");
  card.dataset.type = part.category;
  card.id = part.name;
  card.className = `card tierItem pcItemCards ${part.category}`;
  card.style.width = itemsSize;
  card.innerHTML = `
    <img
      src="../assets/images/${part.img}"
      class="img-card-top"
      alt="${part.name}"
    />
    <div class="card-body itemNameContainer p-0 p-lg-2 align-items-center ${showText ? "" : "d-none"}">
      <p class="card-title text-white pcItemCardText">${part.name}</p>
    </div>
  `;
  setupCardEvents(card);
  return card;
};

const setNewTierIndex = (index) => {
  newTierIndex = index;
};

const createTiers = async () => {
  if (tierListContainer.children.length === tiers.length) return;
  tiers.forEach((tr, i) => {
    const tier = document.createElement("div");
    tier.id = `tier${i}`;
    tier.style.backgroundColor = tr.color;
    tier.className = "tier text-white";
    tier.innerHTML = `
      <button type="button"
        id="tierCustomizationBtn${i}"
        data-bs-toggle="modal"
        data-bs-target="#tierCustomizationModal"
        class="btn tierLabelButton btn-outline-primary"
        onclick="genTierCustomizationModalContent(${i})"
      >
        <div>
          <span id="tierLabel${i}" class="tierLabel text-white">${tr.lab}</span>
        </div>
        <div>
          <span id="tierSubLabel${i}" class="text-white tierSubLabel">${tr.subLab}</span>
        </div>
      </button>
      <div
        class="tierCategories"
        id="tierCat${i}"
        ondragover="allowDrop(event)"
        ondrop="drop(event)">
      </div>
      <div class="addTierButtonDivs">
        <button
          class="btn btn-success btn-sm addTierButtons"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#tierCustomizationModal"
          onclick="setNewTierIndex(${i})"
        >
          <span><i class="bi bi-arrow-up"></i></span>
        </button>
        <button
          class="btn btn-success btn-sm addTierButtons mt-1"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#tierCustomizationModal"
          onclick="setNewTierIndex(${i + 1})"
        >
          <span><i class="bi bi-arrow-down"></i></span>
        </button>
      </div>
    `;
    tierListContainer.appendChild(tier);
  });
};

const uploadSaveData = async () => {
  const tierMakerSaveData = localStorage.getItem("ac6TierMakerSaveData");
  if (tierMakerSaveData) {
    const currentList = await getCurrentTierList();
    tiers = currentList.tiers;
    tierListContainer.innerHTML = "";
    showText = currentList.showText;
    itemsSize = currentList.itemsSize;
    await populateLooseItems();
    await createTiers();
    await populateTierListItems();
    return;
  }
  startNewTierList();
};

const saveProgress = async () => {
  let obj = {};
  const tierMakerSaveData = localStorage.getItem("ac6TierMakerSaveData");
  if (!tierMakerSaveData) {
    obj = {
      lists: [
        {
          tiers,
          dataName: `List #${generateSemiUniqueCode()}`,
          currentList: true,
          showText,
          itemsSize,
        },
      ],
    };
    localStorage.setItem("ac6TierMakerSaveData", JSON.stringify(obj));
    return;
  }
  const data = JSON.parse(tierMakerSaveData);
  const newSavedTierLists = data.lists.map((sg) => {
    if (sg.currentList === true) {
      sg = {
        ...sg,
        tiers,
        showText,
        itemsSize,
        dataName: sg.editedName
          ? sg.dataName
          : `List #${generateSemiUniqueCode()}`,
        currentList: true,
      };
    }
    return sg;
  });
  obj = { ...obj, lists: newSavedTierLists };
  localStorage.setItem("ac6TierMakerSaveData", JSON.stringify(obj));
};

const saveDataAndRestart = async () => {
  const tierMakerSaveData = localStorage.getItem("ac6TierMakerSaveData");
  if (!tierMakerSaveData) return;
  const savedTierLists = JSON.parse(tierMakerSaveData).lists;
  let updatedSavedTierLists = savedTierLists.map((sg) => {
    sg.currentList = false;
    return sg;
  });
  await startNewTierList();
  const newSaveObj = {
    tiers: [...tiers],
    dataName: `List #${generateSemiUniqueCode()}`,
    currentList: true,
  };
  updatedSavedTierLists.push(newSaveObj);
  localStorage.setItem(
    "ac6TierMakerSaveData",
    JSON.stringify({ lists: updatedSavedTierLists }),
  );
  pruneSavedTierLists();
};

const pruneSavedTierLists = async () => {
  const tierMakerSaveData = localStorage.getItem("ac6TierMakerSaveData");
  if (!tierMakerSaveData) return;
  const prunedLists = JSON.parse(tierMakerSaveData).lists.filter((sg) => {
    for (let i = 0; i < sg.tiers.length; i++) {
      if (sg.tiers[i].list.length > 0) return true;
    }
    return !!sg.currentList;
  });
  const oldData = JSON.parse(tierMakerSaveData);
  localStorage.setItem(
    "ac6TierMakerSaveData",
    JSON.stringify({ ...oldData, lists: prunedLists }),
  );
};

const clearSaveDataAndRestart = async () => {
  localStorage.removeItem("ac6TierMakerSaveData");
  window.location.reload();
};

const getCurrentTierList = async () => {
  const savedTierLists = JSON.parse(
    localStorage.getItem("ac6TierMakerSaveData"),
  ).lists;
  const currentList = savedTierLists.filter((sg) => sg.currentList === true);
  if (currentList.length !== 1) {
    console.log("SAVED GAME DATA CORRUPTED", savedTierLists);
    return;
  }
  return currentList[0];
};

const toggleItemNameText = async () => {
  const itemNameContainers = document.querySelectorAll(".itemNameContainer");
  itemNameContainers.forEach((container) => {
    container.classList.toggle("d-none");
    showText = !container.classList.contains("d-none");
  });
  saveProgress();
};

const genTierCustomizationModalContent = (index) => {
  customizingTier = index;
  deleteTierButton.classList.toggle("d-none", false);
  const { lab, subLab, color } = tiers[index];
  tierPreview.style.backgroundColor = color;
  tierButtonPreviewLabel.innerText = lab;
  tierButtonPreviewSubLabel.innerText = subLab;
  labelNameInput.value = lab;
  subLabelNameInput.value = subLab;
};

const genTierColorOptions = () => {
  tierListColors.forEach((it) => {
    tierColorsList.innerHTML += `
      <li onclick="changeTierPreviewColor('${it.color}')" class="text-white" style="background-color: ${it.color}">${it.name}</li>
    `;
  });
};

const deleteTier = async () => {
  tiers.splice(customizingTier, 1);
  await populateLooseItems();
  tierListContainer.innerHTML = "";
  await createTiers();
  await populateTierListItems();
  await saveProgress();
  const modal = bootstrap.Modal.getInstance(tierCustomizationModal);
  modal.hide();
};

const createNewTier = async () => {
  let newColor = "#151c24";
  const bgColor = tierPreview.style.backgroundColor;
  if (bgColor) newColor = convertRGBToHex(bgColor);
  const newTier = {
    lab: labelNameInput.value,
    subLab: subLabelNameInput.value,
    color: newColor,
    list: [],
  };
  tiers.splice(newTierIndex, 0, newTier);
  await saveProgress();
  tierListContainer.innerHTML = "";
  await createTiers();
  populateTierListItems();
};

const saveTierCustomization = async () => {
  if (customizingTier === null) {
    createNewTier();
    return;
  }
  const tierEl = document.getElementById(`tier${customizingTier}`);
  const tierLabelEl = document.getElementById(`tierLabel${customizingTier}`);
  const tierSubLabelEl = document.getElementById(
    `tierSubLabel${customizingTier}`,
  );
  let newColor = "#151c24";
  const bgColor = tierPreview.style.backgroundColor;
  if (bgColor) newColor = convertRGBToHex(bgColor);

  tierEl.style.backgroundColor = newColor;
  tierLabelEl.innerText = labelNameInput.value;
  tierSubLabelEl.innerText = subLabelNameInput.value;

  tiers = tiers.map((tt, i) => {
    if (i === customizingTier) {
      tt.color = newColor;
      tt.lab = labelNameInput.value;
      tt.subLab = subLabelNameInput.value;
    }
    return tt;
  });

  saveProgress();
  customizingTier = null;
};

const changeItemSize = (newSize) => {
  document
    .querySelectorAll(".tierItem")
    .forEach((it) => (it.style.width = newSize));
  itemsSize = newSize;
  saveProgress();
};

uploadSaveData();
genTierColorOptions();
