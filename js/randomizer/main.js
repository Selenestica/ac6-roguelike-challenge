const rolledPartsContainer = document.getElementById("rolledPartsContainer");
const categoryChecklistContainer = document.getElementById(
  "categoryChecklistContainer",
);
const armAsBackCheck = document.getElementById("armAsBackCheck");

const ALL_CATEGORIES = [
  "l-arm",
  "r-arm",
  "l-back",
  "r-back",
  "head",
  "core",
  "arms",
  "legs",
  "booster",
  "fcs",
  "generator",
];

const TIER_COLORS = {
  s: "#C0392B",
  a: "#D4AC0D",
  b: "#27AE60",
  c: "#2980B9",
  d: "#7F8C8D",
};

rolledPartsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".part-card");
  if (!card) return;
  rerollSinglePart(card);
});

let allowArmAsBack = JSON.parse(localStorage.getItem("ac6ArmAsBack") ?? "true");
armAsBackCheck.checked = allowArmAsBack;

armAsBackCheck.addEventListener("change", (e) => {
  allowArmAsBack = e.target.checked;
  localStorage.setItem("ac6ArmAsBack", JSON.stringify(allowArmAsBack));
});

// load checked categories from localStorage or default to all checked
let checkedCategories = new Set(
  JSON.parse(
    // localStorage.getItem("ac6RandomizerCategories") ??
    JSON.stringify(ALL_CATEGORIES),
  ),
);

const saveCategories = () => {
  localStorage.setItem(
    "ac6RandomizerCategories",
    JSON.stringify([...checkedCategories]),
  );
};

const genCategoryChecklist = () => {
  categoryChecklistContainer.innerHTML = "";
  ALL_CATEGORIES.forEach((category) => {
    categoryChecklistContainer.innerHTML += `
      <div class="form-check">
        <input
          class="form-check-input categoryCheckbox"
          type="checkbox"
          id="check_${category}"
          ${checkedCategories.has(category) ? "checked" : ""}
        />
        <label class="form-check-label text-white text-uppercase" for="check_${category}">
          ${category}
        </label>
      </div>
    `;
  });

  // attach listeners
  document.querySelectorAll(".categoryCheckbox").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      if (e.target.checked) {
        checkedCategories.add(e.target.id.replace("check_", ""));
      } else {
        checkedCategories.delete(e.target.id.replace("check_", ""));
      }
      // saveCategories();
    });
  });
};

const rerollSinglePart = (card) => {
  const slotCategory = card.dataset.category; // the slot being filled (e.g. r-back)

  let pool = PARTS.filter((p) => p.category === slotCategory).map((p) => ({
    part: p,
    displayCategory: null,
  }));

  if (allowArmAsBack) {
    if (slotCategory === "r-back") {
      const rArmParts = PARTS.filter((p) => p.category === "r-arm").map(
        (p) => ({ part: p, displayCategory: "r-back" }),
      );
      pool = [...pool, ...rArmParts];
    }
    if (slotCategory === "l-back") {
      const lArmParts = PARTS.filter((p) => p.category === "l-arm").map(
        (p) => ({ part: p, displayCategory: "l-back" }),
      );
      pool = [...pool, ...lArmParts];
    }
  }

  if (pool.length === 0) return;

  const { part, displayCategory } =
    pool[Math.floor(Math.random() * pool.length)];

  // replace just this card's content
  const categoryLabel = displayCategory
    ? `${displayCategory.toUpperCase()}`
    : part.category.toUpperCase();

  card.dataset.originalCategory = part.category;
  card.querySelector("img").src = `../assets/images/${part.img}`;
  card.querySelector("img").alt = part.name;
  card.querySelector("p").innerText = part.name;
  card.querySelector("small").innerHTML = categoryLabel;
};

const genPartCard = (part, displayCategory = null) => {
  const categoryLabel = displayCategory
    ? `${displayCategory.toUpperCase()}`
    : part.category.toUpperCase();

  return `
    <div
      class="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3"
    >
      <div
        class="card bg-dark border-secondary text-center p-2 part-card"
        style="width: 160px; position: relative; cursor: pointer;"
        data-category="${displayCategory ?? part.category}"
        data-original-category="${part.category}"
      >
        <img
          class="img-fluid mb-2"
          src="../assets/images/${part.img}"
          alt="${part.name}"
        />
        <p class="text-white mb-1" style="font-size: 0.75rem;">${part.name}</p>
        <small class="text-muted text-uppercase">${categoryLabel}</small>
      </div>
    </div>
  `;
};

const rollParts = () => {
  if (checkedCategories.size === 0) {
    rolledPartsContainer.innerHTML = `<p class="text-muted text-center">Select at least one category in Options.</p>`;
    return;
  }

  rolledPartsContainer.innerHTML = "";

  checkedCategories.forEach((category) => {
    let pool = PARTS.filter((p) => p.category === category).map((p) => ({
      part: p,
      displayCategory: null,
    }));

    if (allowArmAsBack) {
      if (category === "r-back") {
        const rArmParts = PARTS.filter((p) => p.category === "r-arm").map(
          (p) => ({ part: p, displayCategory: "r-back" }),
        );
        pool = [...pool, ...rArmParts];
      }
      if (category === "l-back") {
        const lArmParts = PARTS.filter((p) => p.category === "l-arm").map(
          (p) => ({ part: p, displayCategory: "l-back" }),
        );
        pool = [...pool, ...lArmParts];
      }
    }

    if (pool.length === 0) return;
    const { part, displayCategory } =
      pool[Math.floor(Math.random() * pool.length)];
    rolledPartsContainer.innerHTML += genPartCard(part, displayCategory);
  });
};

// initialize
genCategoryChecklist();
rollParts();
