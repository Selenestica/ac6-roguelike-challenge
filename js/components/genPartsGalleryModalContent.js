const partsGalleryAccordion = document.getElementById("partsGalleryAccordion");

const GALLERY_CATEGORIES = [
  "head",
  "core",
  "arms",
  "legs",
  "booster",
  "fcs",
  "generator",
  "r-arm",
  "l-arm",
  "r-back",
  "l-back",
];

const TIER_ORDER = ["s", "a", "b", "c", "d"];

const sortByTier = (list) => {
  return [...list].sort((a, b) => {
    return TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
  });
};

const genPartsGalleryCard = (part) => {
  return `
    <div class="card d-flex col-3 col-md-2 mx-1 mb-2 bg-dark border-secondary align-items-center p-1" style="position: relative;">
      <img
        src="../assets/images/${part.img}"
        class="img-fluid"
        alt="${part.name}"
      />
      <span
        class="badge text-dark bg-${part.tier}-tier"
        style="position: absolute; top: 4px; right: 4px;"
      >
        ${part.tier.toUpperCase()}
      </span>
      <span
        class="badge bg-success cursor-pointer"
        style="position: absolute; bottom: 4px; right: 4px;"
      >
        +
      </span>
      <div class="p-1 text-start">
        <p class="text-white mb-0" style="font-size: 0.65rem;">${part.name}</p>
      </div>
    </div>
  `;
};

const genPartsGalleryModalContent = () => {
  partsGalleryAccordion.innerHTML = "";

  GALLERY_CATEGORIES.forEach((category, i) => {
    const partsInCategory = sortByTier(
      PARTS.filter((p) => p.category === category),
    );
    const collapseId = `partsGalleryCollapse${i}`;

    partsGalleryAccordion.innerHTML += `
      <div class="accordion-item bg-dark">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed text-white bg-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#${collapseId}"
            aria-expanded="false"
            aria-controls="${collapseId}"
          >
            ${category.toUpperCase()}
            <span class="badge bg-secondary ms-2">${partsInCategory.length}</span>
          </button>
        </h2>
        <div
          id="${collapseId}"
          class="accordion-collapse collapse"
          data-bs-parent="#partsGalleryAccordion"
        >
          <div class="accordion-body d-flex flex-wrap justify-content-center" id="gallery_${category}">
          </div>
        </div>
      </div>
    `;

    const galleryBody = document.getElementById(`gallery_${category}`);
    partsInCategory.forEach((part) => {
      galleryBody.innerHTML += genPartsGalleryCard(part);
    });
  });
};

genPartsGalleryModalContent();
