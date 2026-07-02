const tierMakerSaveDataManagementModal = document.getElementById(
  "tierMakerSaveDataManagementModal",
);
const tierMakerSaveDataManagementModalSavesList = document.getElementById(
  "tierMakerSaveDataManagementModalSavesList",
);
const saveDataModalFunctionsDiv = document.getElementById(
  "saveDataModalFunctionsDiv",
);
const saveDataUploadInput = document.getElementById("saveDataUploadInput");
const uploadSaveFileButton = document.getElementById("uploadSaveFileButton");
const saveDataManagementModalInstance = new bootstrap.Modal(
  tierMakerSaveDataManagementModal,
);
let uploadedSaveFile = null;

const saveNewSaveFileName = async (index) => {
  const newSaveFileNameInput = document.getElementById("newSaveFileNameInput");
  const saveData = JSON.parse(localStorage.getItem("ac6TierMakerSaveData"));
  if (!saveData) return;
  let lists = [...saveData.lists];
  const updatedSaveFile = {
    ...lists[index],
    dataName: newSaveFileNameInput.value
      ? newSaveFileNameInput.value
      : "Unnamed Save File",
    editedName: true,
  };
  lists.splice(index, 1, updatedSaveFile);
  let newSaveObj = { ...saveData, lists };
  await localStorage.setItem(
    "ac6TierMakerSaveData",
    JSON.stringify(newSaveObj),
  );
  tierMakerSaveDataManagementModalSavesList.innerHTML = "";
  genTierMakerSaveDataManagementInfo(true);
};

const editSaveName = (index, oldName) => {
  saveDataModalFunctionsDiv.classList.toggle("d-none", true);
  tierMakerSaveDataManagementModalSavesList.innerHTML = "";
  tierMakerSaveDataManagementModalSavesList.innerHTML = `
    <p class="text-white mb-0">Rename save file:</p>
    <div id="saveDataNameEditDiv" class="my-1 d-flex" style="width: 90%">
      <input type="text" maxlength="50" id="newSaveFileNameInput" class="form-control" value="${oldName}">
      <button type="button" onclick="saveNewSaveFileName(${index})" class="mx-1 btn btn-success btn-sm"><i class="bi bi-check-lg"></i></button>
    </div>
  `;
};

const genTierMakerSaveDataManagementInfo = (savedNewName = null) => {
  const saveData = JSON.parse(localStorage.getItem("ac6TierMakerSaveData"));
  if (!saveData) {
    tierMakerSaveDataManagementModalSavesList.innerHTML =
      "<p class='text-white'>No save data detected. Start a list or upload a list to get started.</p>";
    saveDataManagementModalInstance.show();
    saveDataModalFunctionsDiv.classList.toggle("d-none", true);
    return;
  }
  tierMakerSaveDataManagementModalSavesList.innerHTML = "";
  saveDataModalFunctionsDiv.classList.toggle("d-none", false);
  const lists = saveData.lists;

  for (let i = 0; i < lists.length; i++) {
    const save = lists[i];
    const isDisabled = save.currentList ? "disabled" : "";
    const displayCurrentText = save.currentList ? "(Current)" : "";
    tierMakerSaveDataManagementModalSavesList.innerHTML += `
      <div class="my-1" id="savedGameOptionDiv${i}">
        <input type="radio" class="btn-check" name="btnradio" id="savedGameOption${i}" autocomplete="off" ${isDisabled}>
        <label id="savedGameOptionLabel${i}" class="btn btn-outline-primary text-white" for="savedGameOption${i}">${save.dataName} ${displayCurrentText}</label>
        <button type="button" onclick="editSaveName(${i},'${save.dataName}')" class="mx-1 btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button>
        <button type="button" onclick="downloadSaveFile(${i}, 'tm')" class="btn btn-primary btn-sm"><i class="bi bi-download"></i></button>
      </div>
    `;
  }
  if (!savedNewName) {
    saveDataManagementModalInstance.show();
  }
};

const clearTierMakerSaveDataManagementModal = () => {
  tierMakerSaveDataManagementModalSavesList.innerHTML = "";
  saveDataUploadInput.value = "";
  uploadedSaveFile = null;
};

const getSavedGameIndex = () => {
  let saveIndex;
  const savedGamesOptions = tierMakerSaveDataManagementModalSavesList.children;
  for (let i = 0; i < savedGamesOptions.length; i++) {
    const option = savedGamesOptions[i].children[0];
    if (option.checked) {
      saveIndex = i;
      break;
    }
  }
  return saveIndex;
};

const deleteSavedGameData = async () => {
  const saveIndex = getSavedGameIndex();
  if (saveIndex === undefined) {
    clearTierMakerSaveDataManagementModal();
    return;
  }
  const tierMakerSaveData = JSON.parse(
    localStorage.getItem("ac6TierMakerSaveData"),
  );
  let tempArray = [...tierMakerSaveData.lists];
  tempArray.splice(saveIndex, 1);
  let tempObj = { ...tierMakerSaveData, lists: tempArray };
  localStorage.setItem("ac6TierMakerSaveData", JSON.stringify(tempObj));
  clearTierMakerSaveDataManagementModal();
};

const applySavedGameData = async (isUploadedSave = null) => {
  const saveIndex = isUploadedSave ? 0 : getSavedGameIndex();
  if (!isUploadedSave && (saveIndex === undefined || saveIndex === null)) {
    clearTierMakerSaveDataManagementModal();
    return;
  }
  const tierMakerSaveData = JSON.parse(
    localStorage.getItem("ac6TierMakerSaveData"),
  );
  let tempArray = [...tierMakerSaveData.lists];
  const updatedSavedGames = await tempArray.map((sg, i) => {
    sg.currentList = saveIndex === i;
    return sg;
  });
  const newSaveObj = { ...tierMakerSaveData, lists: updatedSavedGames };
  localStorage.setItem("ac6TierMakerSaveData", JSON.stringify(newSaveObj));
  uploadSaveData();
  clearTierMakerSaveDataManagementModal();
  if (isUploadedSave) {
    saveDataManagementModalInstance.hide();
  }
};

saveDataUploadInput.addEventListener("change", (e) => {
  const uploadedFile = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const fileJSON = JSON.parse(event.target.result);
    uploadSaveFileButton.disabled = false;
    uploadedSaveFile = fileJSON;
  };
  reader.onerror = (error) => {
    console.log(error);
  };
  reader.readAsText(uploadedFile);
});

const uploadSaveFile = async () => {
  if (uploadedSaveFile.currentList === true) {
    uploadedSaveFile.currentList = false;
  }
  let obj = {};
  const tierMakerSaveData = localStorage.getItem("ac6TierMakerSaveData");
  if (!tierMakerSaveData) {
    uploadedSaveFile.currentList = true;
    obj = { lists: [uploadedSaveFile] };
    await localStorage.setItem("ac6TierMakerSaveData", JSON.stringify(obj));
    applySavedGameData(true);
    uploadedSaveFile = null;
    saveDataUploadInput.value = "";
    return;
  }
  let newData = JSON.parse(tierMakerSaveData);
  newData.lists.push(uploadedSaveFile);
  await localStorage.setItem("ac6TierMakerSaveData", JSON.stringify(newData));
  tierMakerSaveDataManagementModalSavesList.innerHTML = "";
  genTierMakerSaveDataManagementInfo(true);
  uploadedSaveFile = null;
  saveDataUploadInput.value = "";
};
