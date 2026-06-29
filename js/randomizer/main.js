const rolledPartsContainer = document.getElementById("rolledPartsContainer");
const categoryChecklistContainer = document.getElementById(
  "categoryChecklistContainer",
);

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

const genPartCard = (part) => {
  return `
    <div class="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3">
      <div class="card bg-dark border-secondary text-center p-2" style="width: 160px; position: relative;">
        <img
          class="img-fluid mb-2"
          src="../assets/images/${part.img}"
          alt="${part.name}"
        />
        <p class="text-white mb-1" style="font-size: 0.75rem;">${part.name}</p>
        <small class="text-muted text-uppercase">${part.category}</small>
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
    const partsInCategory = PARTS.filter((p) => p.category === category);
    if (partsInCategory.length === 0) return;
    const randomPart =
      partsInCategory[Math.floor(Math.random() * partsInCategory.length)];
    rolledPartsContainer.innerHTML += genPartCard(randomPart);
  });
};

// initialize
genCategoryChecklist();
rollParts();
