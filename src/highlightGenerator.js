import {parse} from "node-html-parser"
import React from "react"

export const generateHighlight = (response, styles) => {
    const root = parse(response)
    console.log(root)

    let resultText = []
    root.childNodes.forEach((node, index) => {
        if (node.tagName === "span") {
            const className = node.classNames[0]

            let color = styles[8].color
            let isBold = styles[8].isBold
            if (className === "base08") {
                color = styles[0].color
                isBold = styles[0].isBold
            } else if (className === "base09") {
                color = styles[1].color
                isBold = styles[1].isBold
            } else if (className === "base0A") {
                color = styles[2].color
                isBold = styles[2].isBold
            } else if (className === "base0B") {
                color = styles[3].color
                isBold = styles[3].isBold
            } else if (className === "base0C") {
                color = styles[4].color
                isBold = styles[4].isBold
            } else if (className === "base0D") {
                color = styles[5].color
                isBold = styles[5].isBold
            } else if (className === "base07") {
                color = styles[6].color
                isBold = styles[6].isBold
            } else if (className === "base0E") {
                color = styles[7].color
                isBold = styles[7].isBold
            } else if (className === "base06") {
                color = styles[9].color
                isBold = styles[9].isBold
            } else if (className === "base0F") {
                color = styles[10].color
                isBold = styles[10].isBold
            } else if (className === "base0D") {
                color = styles[11].color
                isBold = styles[11].isBold
            }
            resultText.push(<span style={{color: color, fontWeight: isBold ? "bold" : "normal"}}>
                {node.firstChild.rawText}
            </span>)
        } else if (node.tagName === "br") {
            resultText.push(<br/>)
        }
    })
    return <div>{resultText}</div>
}