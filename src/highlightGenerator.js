import {parse} from "node-html-parser"
import React from "react"

export const generateHighlight = (response, colors) => {
    const root = parse(response)
    console.log(root)

    let resultText = []
    root.childNodes.forEach((node, index) => {
        if (node.tagName === "span") {
            let color = colors[8]
            const className = node.classNames[0]
            if (className === "base08") {
                color = colors[0]
            } else if (className === "base09") {
                color = colors[1]
            } else if (className === "base0A") {
                color = colors[2]
            } else if (className === "base0B") {
                color = colors[3]
            } else if (className === "base0C") {
                color = colors[4]
            } else if (className === "base0D") {
                color = colors[5]
            } else if (className === "base07") {
                color = colors[6]
            } else if (className === "base0E") {
                color = colors[7]
            } else if (className === "base06") {
                color = colors[9]
            } else if (className === "base0F") {
                color = colors[10]
            } else if (className === "base0D") {
                color = colors[11]
            }
            resultText.push(<span style={{color: color}}>{node.firstChild.rawText}</span>)
        } else if (node.tagName === "br") {
            resultText.push(<br/>)
        }
    })
    return <div>{resultText}</div>
}