// https://unclechen.github.io/2018/06/09/%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%BD%91%E9%A1%B5%E5%92%8CChrome%E6%8F%92%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1/

function injectCustomJs(jsPath) {
    jsPath = jsPath || "js/inject.js";
    var temp = document.createElement("script");
    temp.setAttribute("type", "text/javascript");
    temp.setAttribute("data-extension-id", chrome.runtime.id);
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.runtime.getURL(jsPath);
    temp.async = false;
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.documentElement.appendChild(temp);
}

injectCustomJs()
