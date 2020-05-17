/*global chrome*/

chrome.storage.sync.get(["colorSchemes", "rules", "isEnabled"], (result) => {
    if (result.isEnabled) {
        const currentUrl = window.location.href
        result.rules.forEach((rule) => {
            if (RegExp(rule.url).test(currentUrl)) {
                console.log(`URL matched: ${rule.url} ${currentUrl}`)

                const colorScheme = result.colorSchemes.find(colorScheme => colorScheme.id === rule.colorSchemeId)
                if (colorScheme) {
                    let matchedElems = document.querySelectorAll(rule.selector)
                    console.log(`Found ${matchedElems.length} matched elements.`)

                    matchedElems.forEach((matched) => {
                        matched.childNodes.forEach((node) => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                console.log(`Found text node: ${currentUrl} "${node.textContent}"`)
                                replace(node, matched, colorScheme)
                            }
                        })
                    })
                } else {
                    console.log("No available color scheme for the rule.")
                }
            }
        })
    }
})

function replace(node, parentNode, colorScheme) {
    const text = node.textContent

    getColoredNode(text, colorScheme, (ColoredNode) => {
        console.log(ColoredNode)
        parentNode.replaceChild(ColoredNode, node)
    })
}

function getColoredNode(text, colorScheme, callback) {
    getParseResponse(text, (json) => {
        const root = createSpan()
        json.forEach((nodeDesc) => {
            if (nodeDesc === "br") {
                root.appendChild(createBr())
            } else {
                root.appendChild(createSpan(nodeDesc[1], colorScheme.styles[nodeDesc[0]].color, colorScheme.styles[nodeDesc[0]].isBold))
            }
        })

        callback(root)
    })
}

function getParseResponse(text, callback) {
    fetch("https://api.pegasis.site/english_parser/", {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: `{"text":"${text}"}`,
    }).then(function (data) {
        data.text().then((text) => callback(JSON.parse(text)))
    }).catch(function (error) {
        callback()
    })
}

function createSpan(text, color, isBold) {
    let span = document.createElement("span")
    if (text) span.textContent = text
    if (color) span.style.color = color
    if (isBold) span.style.fontWeight = "bold"
    return span
}

function createBr() {
    return document.createElement("br")
}