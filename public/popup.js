/*global chrome*/

let settingsButton = document.getElementById("settings-button")
settingsButton.onclick = () => chrome.runtime.openOptionsPage()

let enableSwitch = document.getElementById("enable-switch")
enableSwitch.onchange = () => {
    chrome.browserAction.setBadgeText({text: enableSwitch.checked ? "On" : "Off"})
    chrome.storage.sync.set({isEnabled: enableSwitch.checked})
}

chrome.storage.sync.get(["isEnabled"], (result) => {
    result.isEnabled ? enableSwitch.parentElement.MaterialSwitch.on() : enableSwitch.parentElement.MaterialSwitch.off()
})