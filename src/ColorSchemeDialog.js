import React, {Component} from "react"
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
} from "@material/react-dialog"
import {delDialog} from "./index"
import "@material/react-dialog/dist/dialog.css"
import "@material/react-text-field/dist/text-field.css"
import TextField, {Input} from "@material/react-text-field"
import {SketchPicker} from "react-color"
import cloneDeep from "lodash/cloneDeep"
import "@material/react-checkbox/dist/checkbox.css"
import {generateHighlight} from "./highlightGenerator"
import {previewText} from "./previewText"
import Checkbox from "@material/react-checkbox"
import {getColorScheme, saveColorScheme} from "./storage"

function ColorItem(props) {
    return (
        <div className={"color-item"}
             style={{background: props.selected ? "#00000015" : "transparent"}}
             onClick={props.onClick}>
            <span className={"color-block"}
                  style={{background: props.color}}/>
            <span style={{fontWeight: props.isBold ? "bold" : "normal"}}>{props.name}</span>
        </div>
    )
}

function ColorList(props) {
    return (
        <div className={"color-list"}>
            {props.styles.map((style, index) => <ColorItem
                key={index}
                color={style.color}
                isBold={style.isBold}
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
            colorScheme: getColorScheme(props.colorSchemeId),
        }
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
                        <div>
                            <Checkbox
                                nativeControlId="is-dark"
                                checked={this.state.colorScheme.isDark}
                                onChange={(e) => {
                                    const newScheme = cloneDeep(this.state.colorScheme)
                                    newScheme.isDark = e.target.checked
                                    this.setState({colorScheme: newScheme})
                                }}
                            />
                            <label htmlFor='is-dark'>Dark Background</label>
                            <div className={"color-preview-box"}
                                 style={{background: this.state.colorScheme.isDark ? "#222" : "transparent"}}>
                                {generateHighlight(previewText, this.state.colorScheme.styles)}
                            </div>
                        </div>
                        <ColorList
                            styles={this.state.colorScheme.styles}
                            selectedIndex={this.state.selectedColorIndex}
                            onSelect={(index) => this.setState({selectedColorIndex: index})}/>
                        <div>
                            <Checkbox
                                nativeControlId="is-bold"
                                checked={this.state.colorScheme.styles[this.state.selectedColorIndex].isBold}
                                onChange={(e) => {
                                    const newScheme = cloneDeep(this.state.colorScheme)
                                    newScheme.styles[this.state.selectedColorIndex].isBold = e.target.checked
                                    this.setState({colorScheme: newScheme})
                                }}
                            />
                            <label htmlFor='is-bold'>Bold</label>
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
                                color={this.state.colorScheme.styles[this.state.selectedColorIndex].color}
                                onChangeComplete={(color) => {
                                    const newScheme = cloneDeep(this.state.colorScheme)
                                    newScheme.styles[this.state.selectedColorIndex].color = color.hex
                                    this.setState({colorScheme: newScheme})
                                }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogFooter>
                    <DialogButton action='cancel'>Cancel</DialogButton>
                    <DialogButton action='save' isDefault onClick={()=>saveColorScheme(this.state.colorScheme)}>Save</DialogButton>
                </DialogFooter>
            </Dialog>
        )
    }
}