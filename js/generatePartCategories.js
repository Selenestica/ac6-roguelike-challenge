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

const generatePartCategories = async () => {
    const accordions = await partCategoriesArray.map((category) => {
        return `<div class="accordion-item">
            <h2 class="accordion-header" id="${category}">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                >
                    ${category}
                </button>
            </h2>
            <div
                id="collapseThree"
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
          </div>`;
    });
    partCategoriesContainer.innerHTML += accordions;
};

generatePartCategories();
