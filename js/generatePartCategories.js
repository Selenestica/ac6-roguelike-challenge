const partCategoriesContainer = document.getElementById(
    "partCategoriesContainer"
);

const partCategoriesArray = [
    "Head",
    "Core",
    "Arms",
    "Legs",
    "R-Arm",
    "L-Arm",
    "R-Back",
    "L-Back",
    "FCS",
    "Booster",
    "Generator"
];

const generatePartCategories = () => {
    for (let i = 0; i < partCategoriesArray.length; i++) {
        partCategoriesContainer.innerHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed text-light custom-dark-bg"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#part${[i]}"
                    aria-expanded="false"
                    aria-controls="part${[i]}"
                >
                    ${partCategoriesArray[i]}
                </button>
            </h2>
            <div
                id="part${[i]}"
                class="accordion-collapse collapse ${
                    partCategoriesArray[i]
                } partCategory"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
            >
            </div>
          </div>
        `;
    }
};

generatePartCategories();
