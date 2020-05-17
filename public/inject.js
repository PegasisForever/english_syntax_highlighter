/*global chrome*/

chrome.storage.sync.get(["isEnabled"], (result) => {
    if (result.isEnabled) {
        alert("test")
    }
})