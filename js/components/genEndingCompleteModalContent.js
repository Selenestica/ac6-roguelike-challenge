const endingCompleteModal = document.getElementById("endingCompleteModal");
const endingCompleteHeaderText = document.getElementById(
  "endingCompleteHeaderText",
);
const endingCompleteModalBody = document.getElementById(
  "endingCompleteModalBody",
);

const getNextEndingName = (ending) => {
  if (ending === "firesOfRavenMissions") return "Liberator of Rubicon";
  if (ending === "liberatorOfRubiconMissions") return "Alea Iacta Est";
  return null; // Alea Iacta Est is the last ending
};

const genEndingCompleteModalContent = (ending, dateEarned) => {
  const endingName = getEndingFullName(ending);
  const trophyClass = {
    firesOfRavenMissions: "trophy-raven",
    liberatorOfRubiconMissions: "trophy-liberator",
    aleaIactaEstMissions: "trophy-alea",
  }[ending];
  const trophyIcon = {
    firesOfRavenMissions: "bi-fire",
    liberatorOfRubiconMissions: "bi-flag",
    aleaIactaEstMissions: "bi-dice-5",
  }[ending];

  endingCompleteHeaderText = `${endingName} Complete!`;

  endingCompleteModalBody = `
    <div class="d-flex flex-column align-items-center gap-4">

      <!-- Trophy badge -->
      <div class="trophy trophy-earned trophy-lg ${trophyClass}">
        <i class="bi ${trophyIcon}"></i>
      </div>
      <div class="text-center">
        <h5 class="text-white">${endingName}</h5>
        <small class="text-muted">Earned ${dateEarned}</small>
      </div>

      <!-- Divider -->
      <hr class="w-100 border-secondary" />

      <!-- What's next -->
      <div class="card bg-dark border-secondary w-100 p-3">
        <small class="text-secondary text-uppercase fw-bold mb-3 d-block">What's Next</small>
        <div class="d-flex justify-content-between text-white mb-2">
          <span>Parts</span>
          <span class="text-danger">Reset</span>
        </div>
        <div class="d-flex justify-content-between text-white mb-2">
          <span>OST Chips</span>
          <span class="text-success">Kept</span>
        </div>
        <div class="d-flex justify-content-between text-white">
          <span>Next Ending</span>
          <span class="text-info">${getNextEndingName(ending)}</span>
        </div>
      </div>

    </div>
  `;
};
