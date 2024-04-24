const partCategoriesContainer = document.getElementById(
    "partCategoriesContainer"
);

const partCategoriesArray = [
    "Head",
    "Core",
    "Arms",
    "Legs",
    "R-Arm Unit",
    "L-Arm Unit",
    "R-Back Unit",
    "L-Back Unit",
    "FCS",
    "Booster",
    "Generator"
];

const generatePartCategories = () => {
    for (let i = 0; i < partCategoriesArray.length; i++) {
        partCategoriesContainer.innerHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="${partCategoriesArray[i]}">
                <button
                    class="accordion-button collapsed"
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
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body">
                    <strong
                        >This is the third item's accordion
                        body.</strong
                    >
                </div>
            </div>
          </div>
        `;
    }
};

generatePartCategories();
