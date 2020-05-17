import React from "react"

export function ColorSchemePreview(props) {
    let colorBlocks = props.colorScheme.styles.map((style, index) =>
        <span className={"preview-color-block"}
              key={index}
              style={{background: style.color}}/>)
    return <div className={"preview-color-div"}
                style={{background: props.colorScheme.isDark ? "#222" : "transparent"}}>{colorBlocks}</div>
}