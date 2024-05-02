const stageOptionsContainer = document.getElementById("stageOptionsContainer");

const generateStageOptions = () => {
    for (let i = 1; i < 6; i++) {
        stageOptionsContainer.innerHTML += `
      <a
        class="dropdown-item text-light"
        onclick="setStage('${i}')"
        id="stage${i}Select"
        href="stage${i}"
      >
        ${i}
      </a>
      `;
    }
};

generateStageOptions();
