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

export function initStorage(callback) {
    if (chrome.storage) {
        chrome.storage.sync.get(["colorSchemes"], (result) => {
            colorSchemes = cloneDeep(result.colorSchemes)
            callback()
        })
    } else {
        callback()
    }
}

getColorSchemeList((list) => colorSchemes = list)

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