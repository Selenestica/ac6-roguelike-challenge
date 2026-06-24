const missionViewScreen = document.getElementById("missionViewScreen");

const getEndingFullName = (ending) => {
  if (ending === "firesOfRavenMissions") return "Fires of Raven";
  if (ending === "liberatorOfRubiconMissions") return "Liberator of Rubicon";
  if (ending === "aleaIactaEstMissions") return "Alea Iacta Est";
};

const getChallengeCompleteStats = (data) => {
  const { acquiredParts, restarts, missionsData, ostChips } = data;
  let challengesCompleted = 0;
  for (let i = 0; i < missionsData.length; i++) {
    if (missionsData[i][4]) {
      challengesCompleted++;
    }
  }
  return { acquiredParts, challengesCompleted, ostChips, restarts };
};

const generateMissionScreen = async (ending, mission) => {
  // check for completion screen first before anything else
  if (ending === "aleaIactaEstMissions" && mission >= MISSIONS[ending].length) {
    const saveData = localStorage.getItem("ac6rlSaveData");
    if (!saveData) return;

    const { acquiredParts, challengesCompleted, ostChips, restarts } =
      getChallengeCompleteStats(JSON.parse(saveData));

    missionViewScreen.innerHTML = `
      <div class="col-sm-12 col-md-10 col-lg-8 text-center">

        <!-- Title -->
        <div class="mb-4">
          <small class="text-muted text-uppercase tracking-wide">Challenge Complete</small>
          <p class="text-muted">All three endings reached.</p>
        </div>

        <!-- Stats summary -->
        <div class="card bg-dark border-secondary p-3 mb-4">
          <small class="text-secondary text-uppercase fw-bold mb-3 d-block">Run Summary</small>
          <div class="d-flex justify-content-between text-white mb-2">
            <span>Restarts</span>
            <span class="text-success">${restarts}</span>
          </div>
          <div class="d-flex justify-content-between text-white mb-2">
            <span>Optional Challenges Completed</span>
            <span class="text-success">${challengesCompleted}</span>
          </div>
          <div class="d-flex justify-content-between text-white">
            <span>OST Chips Earned</span>
            <span class="text-info">${ostChips}</span>
          </div>
        </div>

        <!-- Completion file -->
        <div class="card bg-dark border-success p-3 mb-4">
          <small class="text-success text-uppercase fw-bold mb-2 d-block">Proof of Completion</small>
          <p class="text-muted mb-3">Download your completion file to share with the community.</p>
          <button class="btn btn-success w-100" onclick="downloadSaveFile()">
            <i class="fa-solid fa-download"></i> Download Completion File
          </button>
        </div>

      </div>
    `;
    return;
  }
  const { name, challenge, ostChipReward, chapter } = MISSIONS[ending][mission];
  const endingName = getEndingFullName(ending);

  // if on the final mission of an ending, show the proper reward for the optional challenge
  let isFinalMissionInEnding = false;
  if (mission >= MISSIONS[currentEnding].length - 1) {
    isFinalMissionInEnding = true;
  }

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
              <span class="text-${isFinalMissionInEnding ? "info" : "success"}">${isFinalMissionInEnding ? "+10 OST Chips" : "+1 Roll"}</span>
            </div>
            <div class="d-flex justify-content-between text-white mb-2">
              <span>Optional Challenge</span>
              <span class="text-${isFinalMissionInEnding ? "info" : "success"}">${isFinalMissionInEnding ? "+5 OST Chips" : "+2 Rolls"}</span>
            </div>
            ${
              ostChipReward && !isFinalMissionInEnding
                ? `<div class="d-flex justify-content-between text-white">
                  <span>${ostChipReward > 1 ? "Chapter Complete" : "Mid-Chapter Reward"}</span>
                  <span class="text-info">+${ostChipReward} OST Chips</span>
                </div>`
                : null
            }
          </div>
        </div>
    `;
};
