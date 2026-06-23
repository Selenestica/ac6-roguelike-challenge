const badgesShelfDiv = document.getElementById("badgesShelfDiv");

const genBadgesShelfContent = (badges) => {
  badgesShelfDiv.innerHTML = "";
  for (const [key, value] of Object.entries(badges)) {
    badgesShelfDiv.innerHTML += `
            <div 
                class="trophy"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="${value ? value : "Not earned yet"}"
            >
                <img class="img-fluid ${!value && "blankBadge"}" src="assets/icons/${value ? key : "polygon"}.svg" />
            </div> 
        `;
  }
};
