/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    const defaultColorSchemes = [
        {
            "id": "6c7cb460-97dd-11ea-b882-351ff2ea37df",
            "isDark": true,
            "name": "Default Color Scheme",
            "styles": [
                {"color": "#f2777a", "isBold": false},
                {"color": "#f99157", "isBold": false},
                {"color": "#ffcc66", "isBold": false},
                {"color": "#99cc99", "isBold": false},
                {"color": "#66cccc", "isBold": false},
                {"color": "#6699cc", "isBold": false},
                {"color": "#f2f0ec", "isBold": false},
                {"color": "#cc99cc", "isBold": false},
                {"color": "#d3d0c8", "isBold": false},
                {"color": "#e8e6df", "isBold": false},
                {"color": "#d27b53", "isBold": false},
                {"color": "#6699cc", "isBold": false},
            ],
        }, {
            "id": "5c8ef450-97ec-11ea-a7a9-615bf68b414f",
            "isDark": false,
            "name": "Default Color Scheme",
            "styles": [
                {"color": "#b955be", "isBold": false},
                {"color": "#a01120", "isBold": false},
                {"color": "#bb8902", "isBold": false},
                {"color": "#58aa58", "isBold": false},
                {"color": "#058d8d", "isBold": false},
                {"color": "#2a79ca", "isBold": false},
                {"color": "#3d2d0e", "isBold": false},
                {"color": "#4b1ac5", "isBold": false},
                {"color": "#795b07", "isBold": false},
                {"color": "#523f02", "isBold": false},
                {"color": "#d27b53", "isBold": false},
                {"color": "#215d69", "isBold": false},
            ],
        }, {
            "id": "d2d76930-97ec-11ea-a7a9-615bf68b414f",
            "isDark": false,
            "name": "Default Only Noun & Verb Color Scheme",
            "styles": [
                {"color": "#000000", "isBold": false},
                {"color": "#9e0513", "isBold": false},
                {"color": "#020100", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#005fc3", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#000000", "isBold": false},
                {"color": "#000000", "isBold": false},
            ],
        },
    ]
    const defaultRules = [
        {
            id: "65a46cca-97e0-11ea-bb37-0242ac130002",
            url: "https:\\/\\/me.pegasis.site\\/",
            selector: "#info_bar > div > p",
            colorSchemeId: "6c7cb460-97dd-11ea-b882-351ff2ea37df",
        },
        {
            id: "8fe38762-9841-11ea-bb37-0242ac130002",
            url: "https:\\/\\/en.wikipedia.org\\/",
            selector: ".mw-parser-output > p, .mw-parser-output > ul > li",
            colorSchemeId: "d2d76930-97ec-11ea-a7a9-615bf68b414f",
        },
    ]
    chrome.storage.sync.set({colorSchemes: defaultColorSchemes, rules: defaultRules, isEnabled: true})
    chrome.browserAction.setBadgeText({text: "On"})
})

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status === "complete") {
        console.log(tab)
        chrome.tabs.executeScript(tab.id, {file: "EnglishSyntaxHighlighter.js"})
    }
})