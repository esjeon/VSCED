chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        /* assume all requests are download requests */
        chrome.downloads.download({
            url: request.fileUrl,
            filename: request.fileName,
            conflictAction: "uniquify"
        });
    }
);