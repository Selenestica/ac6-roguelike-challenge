const missionCompleteModalBody = document.getElementById(
  "missionCompleteModalBody",
);

const genMissionCompleteModalContent = (ending, mission) => {
  const missionData = MISSIONS[ending][mission];
  const { challenge } = missionData;
  missionCompleteModalBody.innerHTML = "";
  missionCompleteModalBody.innerHTML = `
        <p class="text-white text-center">
            Did you complete the optional challenge?
        </p>
        <p class="text-white text-center">
            <b>${challenge}</b>
        </p>
    `;
};
