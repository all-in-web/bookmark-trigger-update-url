function checkIfBookmarked(url) {
    return new Promise((resolve) => {
        chrome.bookmarks.search({ url: url }, function (bookmarks) {
            if (bookmarks && bookmarks.length > 0) {
                resolve(bookmarks);
            } else {
                resolve();
            }
        });
    });
}

chrome.runtime.onMessageExternal.addListener(function (
    request,
    sender,
    sendResponse
) {
    const { origin, search, searchParams, hostname } = new URL(sender.tab.url);
    if (
        request.command === "update" &&
        searchParams.get("uuid") &&
        searchParams.has("md") &&
        ["localhost", "editor.xieyaxin.top"].includes(hostname)
    ) {
        chrome.bookmarks.search(
            { query: origin + search },
            function (bookmarks) {
                console.log(bookmarks);
                if (bookmarks && bookmarks.length === 1) {
                    const bm = bookmarks[0];
                    chrome.bookmarks.update(
                        bm.id,
                        {
                            title: bm.title,
                            url: sender.tab.url,
                        },
                        function (bookmark) {
                            console.log(bookmark);
                            sendResponse({ code: 0, message: "更新成功" });
                        }
                    );
                } else {
                    if (bookmarks && bookmarks.length === 0) {
                        sendResponse({
                            code: 2,
                            message: "该网址未收藏，注意数据丢失",
                        });
                    } else if (bookmarks && bookmarks.length > 1) {
                        sendResponse({
                            code: 3,
                            message: "收藏夹中查询到不止一个网址，未更新数据",
                        });
                    } else {
                        sendResponse({ code: 1, message: "不存在" });
                    }
                }
            }
        );
    }
    return true;
});
