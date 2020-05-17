/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    const defaultColorSchemes = [{
        name: "Default Color Scheme",
        id: "6c7cb460-97dd-11ea-b882-351ff2ea37df",
        isDark: true,
        styles: [
            {color: "#f2777a", isBold: false},
            {color: "#f99157", isBold: false},
            {color: "#ffcc66", isBold: false},
            {color: "#99cc99", isBold: false},
            {color: "#66cccc", isBold: false},
            {color: "#6699cc", isBold: false},
            {color: "#f2f0ec", isBold: false},
            {color: "#cc99cc", isBold: false},
            {color: "#d3d0c8", isBold: false},
            {color: "#e8e6df", isBold: false},
            {color: "#d27b53", isBold: false},
            {color: "#6699cc", isBold: false},
        ],
    }]
    chrome.storage.sync.set({colorSchemes: defaultColorSchemes})
})