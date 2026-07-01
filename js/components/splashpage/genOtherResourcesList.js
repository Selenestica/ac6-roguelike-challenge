const otherResourcesList = document.getElementById("otherResourcesList");

const genOtherResourcesList = () => {
  const resources = [
    {
      displayName: "AC6 Advanced Garage",
      url: "https://matteosal.github.io/ac6-advanced-garage/",
      description:
        "A site where you can create and theory-craft builds, visually and statistically.",
    },
    {
      displayName: "AC6 Wiki",
      url: "https://armoredcore.fandom.com/wiki/ARMORED_CORE_VI_FIRES_OF_RUBICON",
      description:
        "The main wiki for everything Armored Core. All AC images on this site come from here.",
    },
  ];

  for (let i = 0; i < resources.length; i++) {
    const { url, displayName, description } = resources[i];
    const resItem = `
    <li class="text-white"><a target="_blank" href="${url}">${displayName}</a><span class="text-white"> - ${description}</span></li>
  `;
    otherResourcesList.innerHTML += resItem;
  }
};

genOtherResourcesList();
