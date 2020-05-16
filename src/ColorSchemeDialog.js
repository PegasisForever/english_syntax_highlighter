import React, {Component} from "react"
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
} from "@material/react-dialog"
import {delDialog} from "./index"
import "@material/react-dialog/dist/dialog.css"
import "@material/react-text-field/dist/text-field.css"
import TextField, {HelperText, Input} from "@material/react-text-field"
import {SketchPicker} from "react-color"
import cloneDeep from "lodash/cloneDeep"
import {Body1} from "@material/react-typography"
import {generateHighlight} from "./highlightGenerator"
import {previewText} from "./previewText"

function ColorItem(props) {
    return (
        <div className={"color-item"}
             style={{background: props.selected ? "#00000015" : "transparent"}}
             onClick={props.onClick}>
            <span className={"color-block"} style={{background: props.color}}/>
            <span>{props.name}</span>
        </div>
    )
}

function ColorList(props) {
    return (
        <div className={"color-list"}>
            {props.colors.map((color, index) => <ColorItem
                key={index}
                color={color}
                name={colorNameList[index]}
                selected={index === props.selectedIndex}
                onClick={() => props.onSelect(index)}
            />)}
        </div>
    )
}

const colorNameList = [
    "adverb",
    "noun",
    "adposition",
    "determiner",
    "interjection",
    "particle",
    "punctuation",
    "verb",
    "unknown",
    "numbers",
    "conjunction",
    "adjective",
]

export class ColorSchemeDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedColorIndex: 0,
            colorScheme: {
                name: "New Color Scheme",
                isDark: false,
                colors: [
                    "#f2777a",
                    "#f99157",
                    "#ffcc66",
                    "#99cc99",
                    "#66cccc",
                    "#6699cc",
                    "#f2f0ec",
                    "#cc99cc",
                    "#d3d0c8",
                    "#e8e6df",
                    "#d27b53",
                    "#6699cc",
                ],
            },
        }
        this.updatePreview = this.updatePreview.bind(this)
    }


    updatePreview() {

    }

    render() {
        return (
            <Dialog open onClose={() => delDialog()}>
                <DialogContent>
                    <TextField fullWidth label='Name'><Input
                        value={this.state.colorScheme.name}
                        onChange={(e) => {
                            const newScheme = cloneDeep(this.state.colorScheme)
                            newScheme.name = e.currentTarget.value
                            this.setState({colorScheme: newScheme})
                        }}/>
                    </TextField>
                    <div className={"color-dialog-main-content"}>
                        <div className={"color-preview-box"} style={{background:"#222"}}>
                            {generateHighlight(previewText,this.state.colorScheme.colors)}
                        </div>
                        <ColorList
                            colors={this.state.colorScheme.colors}
                            selectedIndex={this.state.selectedColorIndex}
                            onSelect={(index) => this.setState({selectedColorIndex: index})}/>
                        <SketchPicker
                            disableAlpha
                            presetColors={[
                                "#f2777a",
                                "#f99157",
                                "#ffcc66",
                                "#99cc99",
                                "#66cccc",
                                "#6699cc",
                                "#f2f0ec",
                                "#cc99cc",
                                "#d3d0c8",
                                "#e8e6df",
                                "#d27b53",
                                "#6699cc",
                            ]}
                            color={this.state.colorScheme.colors[this.state.selectedColorIndex]}
                            onChangeComplete={(color) => {
                                const newScheme = cloneDeep(this.state.colorScheme)
                                newScheme.colors[this.state.selectedColorIndex] = color.hex
                                this.setState({colorScheme: newScheme})
                                this.updatePreview()
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogFooter>
                    <DialogButton action='cancel'>Cancel</DialogButton>
                    <DialogButton action='save' isDefault>Save</DialogButton>
                </DialogFooter>
            </Dialog>
        )
    }
}