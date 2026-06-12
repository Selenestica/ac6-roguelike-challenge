const partCategoriesContainer = document.getElementById(
  "partCategoriesContainer",
);

const partCategoriesArray = [
  "HEAD",
  "CORE",
  "ARMS",
  "LEGS",
  "R-ARM",
  "L-ARM",
  "R-BACK",
  "L-BACK",
  "FCS",
  "BOOSTER",
  "GENERATOR",
];

const generatePartCategories = () => {
  for (let i = 0; i < partCategoriesArray.length; i++) {
    const lcCategoryName = partCategoriesArray[i].toLocaleLowerCase();
    partCategoriesContainer.innerHTML += `
          <div class="accordion-item bg-none">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed text-light partCategoryAccordionButton"
                    type="button"
                    id="${lcCategoryName}CategoryButton"
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
                class="accordion-collapse collapse ${lcCategoryName} partCategory"
                aria-labelledby="headingThree"
            >
            </div>
          </div>
        `;
  }
};

generatePartCategories();
