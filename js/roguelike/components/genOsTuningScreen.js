const osTuningContainer = document.getElementById("osTuningContainer");

const CATEGORY_LABELS = {
  systemUnlocks: "System Unlocks",
  coreExpansions: "Core Expansions",
  attackControl: "Attack Control",
  damageControl: "Damage Control",
};

const getOsTuningState = () => {
  // deep clone OS_TUNING and overlay saved unlocked states
  const state = {};
  for (const [key, tuning] of Object.entries(OS_TUNING)) {
    state[key] = {
      ...tuning,
      upgrades: tuning.upgrades.map((u) => ({ ...u })),
    };
  }

  if (osTuning) {
    for (const [key, tuning] of Object.entries(osTuning)) {
      if (state[key]) {
        tuning.upgrades.forEach((u, i) => {
          if (state[key].upgrades[i]) {
            state[key].upgrades[i].unlocked = u.unlocked;
          }
        });
      }
    }
  }

  return state;
};

const calcOstChipsSpent = (state) => {
  let spent = 0;
  for (const tuning of Object.values(state)) {
    for (const upgrade of tuning.upgrades) {
      if (upgrade.unlocked) spent += upgrade.cost;
    }
  }
  return spent;
};

const genOsTuningScreen = () => {
  osTuningContainer.innerHTML = "";
  const state = getOsTuningState();
  const chipsSpent = calcOstChipsSpent(state);
  const chipsRemaining = ostChips - chipsSpent;

  // header with chip counter
  osTuningContainer.innerHTML += `
    <div class="card bg-dark border-secondary p-3 mb-4">
      <div class="d-flex justify-content-between text-white mb-1">
        <span>OST Chips Available</span>
        <span class="text-info fw-bold" id="ostChipsAvailable">${ostChips}</span>
      </div>
      <div class="d-flex justify-content-between text-white mb-1">
        <span>OST Chips Spent</span>
        <span class="text-warning fw-bold" id="ostChipsSpent">${chipsSpent}</span>
      </div>
      <div class="d-flex justify-content-between text-white">
        <span>OST Chips Remaining</span>
        <span class="text-${chipsRemaining >= 0 ? "success" : "danger"} fw-bold" id="ostChipsRemaining">${chipsRemaining}</span>
      </div>
    </div>
  `;

  // group tunings by category
  const grouped = {};
  for (const [key, tuning] of Object.entries(state)) {
    if (!grouped[tuning.category]) grouped[tuning.category] = [];
    grouped[tuning.category].push({ key, ...tuning });
  }

  // render each category
  for (const [category, tunings] of Object.entries(grouped)) {
    osTuningContainer.innerHTML += `
      <h5 class="text-warning text-uppercase fw-bold mb-3 mt-4">${CATEGORY_LABELS[category]}</h5>
    `;

    for (const tuning of tunings) {
      const upgradesHTML = tuning.upgrades
        .map((upgrade, i) => {
          // upgrades must be unlocked in order
          const previousUnlocked = i === 0 || tuning.upgrades[i - 1].unlocked;
          const isDisabled = !previousUnlocked;
          const canAfford = chipsRemaining >= upgrade.cost;
          const checkboxDisabled =
            isDisabled || (!upgrade.unlocked && !canAfford);

          return `
          <div class="form-check mb-1">
            <input
              class="form-check-input osTuningCheckbox"
              type="checkbox"
              id="${tuning.key}_upgrade_${i}"
              data-tuning-key="${tuning.key}"
              data-upgrade-index="${i}"
              ${upgrade.unlocked ? "checked" : ""}
              ${checkboxDisabled ? "disabled" : ""}
            />
            <label
              class="form-check-label text-${isDisabled ? "muted" : "white"}"
              for="${tuning.key}_upgrade_${i}"
            >
              <span class="badge bg-secondary me-1">${upgrade.cost} chip${upgrade.cost !== 1 ? "s" : ""}</span>
              ${upgrade.label}
            </label>
          </div>
        `;
        })
        .join("");

      osTuningContainer.innerHTML += `
        <div class="card bg-dark border-secondary p-3 mb-2">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <p class="text-white fw-bold mb-0">${tuning.name}</p>
              <small class="text-muted">${tuning.description}</small>
            </div>
          </div>
          ${upgradesHTML}
        </div>
      `;
    }
  }

  // attach listeners
  document.querySelectorAll(".osTuningCheckbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const key = e.target.dataset.tuningKey;
      const index = parseInt(e.target.dataset.upgradeIndex);
      toggleOsTuningUpgrade(key, index, e.target.checked);
    });
  });
};

const toggleOsTuningUpgrade = (key, index, checked) => {
  if (!osTuning[key]) {
    osTuning[key] = {
      upgrades: OS_TUNING[key].upgrades.map((u) => ({ ...u })),
    };
  }

  if (!checked) {
    // unchecking — also uncheck all subsequent upgrades
    for (let i = index; i < osTuning[key].upgrades.length; i++) {
      osTuning[key].upgrades[i].unlocked = false;
    }
  } else {
    osTuning[key].upgrades[index].unlocked = true;
  }

  saveProgress();
  genOsTuningScreen();
};
