const weaponsFilterDropdownItem = document.getElementById(
  "weaponsFilterDropdownItem",
);
const backFilterDropdownItem = document.getElementById(
  "backFilterDropdownItem",
);
const headFilterDropdownItem = document.getElementById(
  "headFilterDropdownItem",
);
const coreFilterDropdownItem = document.getElementById(
  "coreFilterDropdownItem",
);
const armsFilterDropdownItem = document.getElementById(
  "armsFilterDropdownItem",
);
const legsFilterDropdownItem = document.getElementById(
  "legsFilterDropdownItem",
);
const fcsFilterDropdownItem = document.getElementById("fcsFilterDropdownItem");
const generatorFilterDropdownItem = document.getElementById(
  "generatorFilterDropdownItem",
);
const boosterFilterDropdownItem = document.getElementById(
  "boosterFilterDropdownItem",
);

const typeFiltersArray = [
  weaponsFilterDropdownItem,
  backFilterDropdownItem,
  headFilterDropdownItem,
  coreFilterDropdownItem,
  armsFilterDropdownItem,
  legsFilterDropdownItem,
  fcsFilterDropdownItem,
  generatorFilterDropdownItem,
  boosterFilterDropdownItem,
];

const filterByType = (filter) => {
  const cards = document.querySelectorAll(".tierItem");
  cards.forEach((card) => card.classList.remove("d-none"));
  typeFiltersArray.forEach((btn) => btn?.classList.remove("active"));
  cards.forEach((card) => {
    if (filter !== card.dataset.type) {
      card.classList.add("d-none");
    }
  });
};

const resetItemFilters = () => {
  const cards = document.querySelectorAll(".tierItem");
  cards.forEach((card) => card.classList.remove("d-none"));
  typeFiltersArray.forEach((btn) => btn?.classList.remove("active"));
};
