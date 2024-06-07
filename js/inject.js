const el = document.currentScript;
var ChromeUpdateBookmarkUrl = () => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            el.dataset.extensionId,
            { command: "update" },
            (res) => {
                resolve(res)
            }
        );
    });
};

window.ChromeUpdateBookmarkUrl = ChromeUpdateBookmarkUrl