/*global chrome*/
import cloneDeep from "lodash/cloneDeep"

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
let colorSchemes = cloneDeep(defaultColorSchemes)

let inited = false

export function initStorage(callback) {
    if (inited) {
        callback()
    } else if (chrome.storage) {
        chrome.storage.sync.get(["colorSchemes", "rules", "isEnabled"], (result) => {
            colorSchemes = cloneDeep(result.colorSchemes)
            rules = cloneDeep(result.rules)
            isEnabled = result.isEnabled
            inited = true
            callback()
        })
    } else {
        inited = true
        callback()
    }
}

export function saveColorScheme(colorScheme) {
    const newColorSchemes = cloneDeep(colorSchemes)

    let isNew = true
    for (let i = 0; i < newColorSchemes.length; i++) {
        if (colorScheme.id === newColorSchemes[i].id) {
            newColorSchemes[i] = colorScheme
            isNew = false
            break
        }
    }
    if (isNew) {
        newColorSchemes.push(colorScheme)
    }

    console.log(newColorSchemes)
    colorSchemes = newColorSchemes
    if (chrome.storage) {
        chrome.storage.sync.set({colorSchemes: newColorSchemes})
    }
}

export function getColorSchemeList() {
    return cloneDeep(colorSchemes)
}

export function getColorScheme(id) {
    for (let i = 0; i < colorSchemes.length; i++) {
        if (id === colorSchemes[i].id) {
            return cloneDeep(colorSchemes[i])
        }
    }

    const newDefaultColorScheme = cloneDeep(defaultColorSchemes[1])
    newDefaultColorScheme.id = id
    return newDefaultColorScheme
}

export function deleteColorScheme(id) {
    const newColorSchemes = cloneDeep(colorSchemes)
    for (let i = 0; i < newColorSchemes.length; i++) {
        if (id === newColorSchemes[i].id) {
            newColorSchemes.splice(i, 1)
            break
        }
    }
    colorSchemes = newColorSchemes
    if (chrome.storage) {
        chrome.storage.sync.set({colorSchemes: newColorSchemes})
    }
}


const defaultRules = [
    {
        id: "65a46cca-97e0-11ea-bb37-0242ac130002",
        url: "https:\\/\\/me.pegasis.site\\/",
        selector: "#info_bar > div > p",
        colorSchemeId: "6c7cb460-97dd-11ea-b882-351ff2ea37df",
    }, {
        id: "8fe38762-9841-11ea-bb37-0242ac130002",
        url: "https:\\/\\/en.wikipedia.org\\/",
        selector: ".mw-parser-output > p, .mw-parser-output > ul > li",
        colorSchemeId: "d2d76930-97ec-11ea-a7a9-615bf68b414f",
    },
]

const emptyRule = {
    id: undefined,
    url: "",
    selector: "",
    colorSchemeId: "",
}

let rules = cloneDeep(defaultRules)

export function saveRule(rule) {
    const newRules = cloneDeep(rules)

    let isNew = true
    for (let i = 0; i < newRules.length; i++) {
        if (rule.id === newRules[i].id) {
            newRules[i] = rule
            isNew = false
            break
        }
    }
    if (isNew) {
        newRules.push(rule)
    }

    rules = newRules
    if (chrome.storage) {
        chrome.storage.sync.set({rules: newRules})
    }
}

export function getRuleList() {
    return cloneDeep(rules)
}

export function getRule(id) {
    for (let i = 0; i < rules.length; i++) {
        if (id === rules[i].id) {
            return cloneDeep(rules[i])
        }
    }

    const newEmptyRule = cloneDeep(emptyRule)
    newEmptyRule.id = id
    return newEmptyRule
}

export function deleteRule(id) {
    const newRules = cloneDeep(rules)
    for (let i = 0; i < newRules.length; i++) {
        if (id === newRules[i].id) {
            newRules.splice(i, 1)
            break
        }
    }
    rules = newRules
    if (chrome.storage) {
        chrome.storage.sync.set({rules: newRules})
    }
}

let isEnabled = true

export function getIsEnabled() {
    return isEnabled
}

export function setIsEnabled(value) {
    isEnabled = value
    if (chrome.browserAction) {
        chrome.browserAction.setBadgeText({text: value ? "On" : "Off"})
    }
    if (chrome.storage) {
        chrome.storage.sync.set({isEnabled: value})
    }
}