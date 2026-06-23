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

const genEndingCompleteModalContent = (optionalCompleted, ending, mission) => {
  const ts = Date.now();
  const dateEarned = new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const endingName = getEndingFullName(ending);
  let trophyIconPath = "assets/icons/for.svg";
  if (ending === "liberatorOfRubiconMissions") {
    trophyIconPath = "assets/icons/lor.svg";
  }
  if (ending === "aleaIactaEstMissions") {
    trophyIconPath = "assets/icons/aie.svg";
  }

  endingCompleteHeaderText.innerHTML = `${endingName} Complete!`;

  endingCompleteModalBody.innerHTML = `
    <div class="d-flex flex-column align-items-center gap-4">

      <!-- Trophy badge -->
      <div class="trophy-lg">
        <img class="img-fluid" src="${trophyIconPath}" />
      </div>
      <div class="text-center">
        <h5 class="text-white">${endingName}</h5>
        <small class="text-muted">Earned: ${dateEarned}</small>
      </div>

      <!-- What's next -->
      <div class="card bg-dark border-secondary w-100 p-3">
        <small class="text-secondary text-uppercase fw-bold mb-3 d-block">What's Next</small>
        <div class="d-flex text-white mb-2">
          Your parts will be 
          <span class="text-danger mx-1">reset</span>
        </div>
        <div class="d-flex text-white mb-2">
          Your OST Chips will be
          <span class="text-success mx-1">retained</span>
        </div>
        <div class="d-flex text-white">
          <span>Next Ending:</span>
          <span class="text-info mx-1">${getNextEndingName(ending)}</span>
        </div>
      </div>

    </div>
  `;
};
