const downloadSaveFile = () => {
    const saveFile = localStorage.getItem("saveFile");
    if (saveFile) {
        const blob = new Blob([saveFile], {
            type: "text/json"
        });
        const link = document.createElement("a");

        link.download = "ac6-rlc-save-file.json";
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(
            ":"
        );

        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        });

        link.dispatchEvent(evt);
        link.remove();
    }
};
