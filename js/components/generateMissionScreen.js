const missionViewScreen = document.getElementById("missionViewScreen");

const getEndingFullName = (ending) => {
  if (ending === "firesOfRavenMissions") return "Fires of Raven";
  if (ending === "liberatorOfRubiconMissions") return "Liberator of Rubicon";
  if (ending === "aleaIactaEstMissions") return "Alea Iacta Est";
};

const generateMissionScreen = (ending, mission) => {
  const endingName = getEndingFullName(ending);
  const { name, challenge, ostChipReward, chapter } = MISSIONS[ending][mission];
  missionViewScreen.innerHTML = "";
  missionViewScreen.innerHTML = `
        <div class="col-sm-12 col-md-10 col-lg-8">
          <!-- Header -->
          <div class="text-white text-center mb-1">
            <small class="text-muted">${endingName.toUpperCase()} — CHAPTER ${chapter}</small>
          </div>
          <div class="text-white text-center mb-4">
            <h4>${name}</h4>
          </div>

          <!-- Optional Challenge Card -->
          <div class="card bg-dark border-warning mb-3 p-3">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <small class="text-warning text-uppercase fw-bold"
                  >Optional Challenge</small
                >
                <p class="text-white mb-0 mt-1">
                  ${challenge}
                </p>
              </div>
            </div>
          </div>

          <!-- Rewards Card -->
          <div class="card bg-dark border-secondary p-3">
            <small class="text-secondary text-uppercase fw-bold mb-2 d-block"
              >Rewards</small
            >
            <div class="d-flex justify-content-between text-white mb-2">
              <span>Mission Complete</span>
              <span class="text-success">+1 Roll</span>
            </div>
            <div class="d-flex justify-content-between text-white mb-2">
              <span>Optional Challenge</span>
              <span class="text-success">+1 Roll</span>
            </div>
            ${
              ostChipReward &&
              `<div class="d-flex justify-content-between text-white">
                  <span>Chapter Complete</span>
                  <span class="text-info">+${ostChipReward} OST Chips</span>
                </div>`
            }
          </div>
        </div>
    `;
};
