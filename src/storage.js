/*global chrome*/
import cloneDeep from "lodash/cloneDeep"

const defaultColorScheme = {
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
}
let colorSchemes = [defaultColorScheme]

let inited = false

export function initStorage(callback) {
    if (inited) {
        callback()
    } else if (chrome.storage) {
        chrome.storage.sync.get(["colorSchemes", "rules"], (result) => {
            colorSchemes = cloneDeep(result.colorSchemes)
            rules = cloneDeep(result.rules)
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

    const newDefaultColorScheme = cloneDeep(defaultColorScheme)
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
        url: "https://me.pegasis.site/*+",
        colorSchemeId: "6c7cb460-97dd-11ea-b882-351ff2ea37df",
    },
]

const emptyRule = {
    id: undefined,
    url: "",
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