const optionalChallengeModalBody = document.getElementById(
    "optionalChallengeModalBody"
);

const generateOptionalChallenges = () => {
    for (const [k, v] of Object.entries(stageChallengesObj)) {
        const stageNum = k.split("e")[1];
        const stageName = `Stage ${stageNum}`;
        const stageAccordionId = `${k}Accordion`;
        optionalChallengeModalBody.innerHTML += `
          <div class="accordion accordion-flush">
              <div class="accordion-item bg-none">
                  <h2 class="accordion-header">
                      <button
                          class="accordion-button collapsed text-light"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#${stageAccordionId}"
                          aria-expanded="false"
                          aria-controls="${stageAccordionId}"
                      >
                          ${stageName}
                      </button>
                  </h2>
                  <div
                      id="${stageAccordionId}"
                      class="accordion-collapse collapse p-3"
                      aria-labelledby="${k}"
                      data-bs-parent="#${stageAccordionId}"
                  >

                  </div>
              </div>
          </div>
        `;
        const stageAccordionIdElement =
            document.getElementById(stageAccordionId);
        for (let i = 0; i < v.length; i++) {
            const checkboxId = `${k}Checkbox${i}`;
            stageAccordionIdElement.innerHTML += `
              <div class="form-check">
                <input
                    class="form-check-input optionalCheckbox"
                    type="checkbox"
                    value=""
                    id="${checkboxId}"
                />
                <label
                    class="form-check-label"
                    for="${checkboxId}"
                >
                    <div>
                        <b class="text-white"
                            >${v[i].name}</b
                        >
                        <p class="text-white">
                            ${v[i].text}
                        </p>
                    </div>
                </label>
              </div>
            `;
        }
    }
};

generateOptionalChallenges();
