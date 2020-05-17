/*global chrome*/

let settingsButton = document.getElementById("settings-button")
settingsButton.onclick = () => chrome.runtime.openOptionsPage()

let enableSwitch = document.getElementById("enable-switch")
enableSwitch.onchange = () => {
    chrome.browserAction.setBadgeText({text: enableSwitch.checked ? "On" : "Off"})
    chrome.storage.sync.set({isEnabled: enableSwitch.checked})
    chrome.tabs.reload()
}

updatePageData()
setInterval(updatePageData,500)

function updatePageData() {
    chrome.storage.sync.get(["isEnabled"], (result) => {
        result.isEnabled ? enableSwitch.parentElement.MaterialSwitch.on() : enableSwitch.parentElement.MaterialSwitch.off()

        getCurrentTab((tab) => {
            chrome.tabs.executeScript(tab.id, {
                code: `eval("window.esh")`,
            }, (data) => {
                if (!result.isEnabled) {
                    document.getElementById("no-rule-div").style.display = "none"
                    document.getElementById("has-rule-div").style.display = "none"
                } else if (data[0].matchedRules.length > 0) {
                    document.getElementById("no-rule-div").style.display = "none"
                    document.getElementById("has-rule-div").style.display = "block"
                    document.getElementById("nodes-info").innerText = `${data[0].textNodeFound} text nodes found, ${data[0].textNodeReplaced} replaced.`

                    let rulesList = document.getElementById("rules-list")
                    rulesList.innerHTML = ""
                    data[0].matchedRules.forEach((rule) => rulesList.appendChild(getRuleListItem(rule)))
                } else {
                    document.getElementById("no-rule-div").style.display = "block"
                    document.getElementById("has-rule-div").style.display = "none"
                }
            })
        })
    })

}

function getRuleListItem(rule) {
    let element = document.createElement("p")
    element.className = "rule-item"
    element.innerText = rule.url
    return element
}

function getCurrentTab(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        callback(tabs[0])
    })
}