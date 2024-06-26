const stageOptionsContainer = document.getElementById("stageOptionsContainer");
const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

const generateStageOptions = () => {
    for (let i = 1; i < 6; i++) {
        stageOptionsContainer.innerHTML += `
      <p
        class="dropdown-item text-light cursor-pointer mb-0"
        onclick="setStage('${i}')"
        id="stage${i}Select"
      >
        ${i}
      </p>
      `;
    }
};

generateStageOptions();
