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
          <div class="accordion-item bg-none">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed text-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#partCategory${[i]}"
                    aria-expanded="false"
                    aria-controls="partCategory${[i]}"
                >
                    ${partCategoriesArray[i]}
                </button>
            </h2>
            <div
                id="partCategory${[i]}"
                class="accordion-collapse collapse ${
                    partCategoriesArray[i]
                } partCategory"
                aria-labelledby="headingThree"
                data-bs-parent="#partCategoriesContainer"
            >
            </div>
          </div>
        `;
    }
};

generatePartCategories();
