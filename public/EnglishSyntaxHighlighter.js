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
                                pendingTextNodesData.push({
                                    node: node,
                                    parentNode: matched,
                                    colorScheme: colorScheme,
                                    replacing: false,
                                })
                            }
                        })
                    })
                } else {
                    console.log("No available color scheme for the rule.")
                }
            }
        })
        replaceVisible()
        window.addEventListener("scroll", replaceVisible)
    }
})

let pendingTextNodesData = []
let lastReplaceTime = 0

function replaceVisible() {
    if (pendingTextNodesData.length === 0) return
    let currentTime = Date.now()
    if (currentTime - lastReplaceTime < 500) {
        return
    } else {
        lastReplaceTime = currentTime
    }
    pendingTextNodesData
        .filter(nodeData => !nodeData.replacing && isInViewport(nodeData.node))
        .forEach((nodeData) => {
            nodeData.replacing = true
            replace(nodeData.node, nodeData.parentNode, nodeData.colorScheme, () => {
                pendingTextNodesData.splice(pendingTextNodesData.indexOf(nodeData), 1)
            })
        })
}

function replace(node, parentNode, colorScheme, callback) {
    const text = node.textContent

    getColoredNode(text, colorScheme, (ColoredNode) => {
        parentNode.replaceChild(ColoredNode, node)
        callback()
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
        body: JSON.stringify({text: text}),
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

function isInViewport(node) {
    let bounding
    if (node.nodeType === Node.TEXT_NODE) {
        let span = createSpan()
        node.parentNode.replaceChild(span, node)
        span.appendChild(node)
        bounding = span.getBoundingClientRect()
        span.parentNode.replaceChild(node, span)
    } else {
        bounding = node.getBoundingClientRect()
    }

    return (
        bounding.bottom > 0 &&
        bounding.top < (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right > 0 &&
        bounding.left < (window.innerWidth || document.documentElement.clientWidth)
    )
}