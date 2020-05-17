import React, {Component} from "react"
import {getColorScheme, getColorSchemeList, getRule, saveRule} from "../storage"
import Dialog, {DialogButton, DialogContent, DialogFooter} from "@material/react-dialog"
import {delDialog} from "../index"
import TextField, {Input} from "@material/react-text-field"
import cloneDeep from "lodash/cloneDeep"
import "@material/react-list/dist/list.css"
import "@material/react-menu-surface/dist/menu-surface.css"
import "@material/react-menu/dist/menu.css"
import "@material/react-select/dist/select.css"
import Select, {Option} from "@material/react-select"
import {ColorSchemePreview} from "../colorschemes/ColorSchemePreview"

export class RulesDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rule: getRule(props.ruleId),
        }
    }

    render() {
        const options = getColorSchemeList().map((colorScheme) =>
            <Option value={colorScheme.id}
                    key={colorScheme.id}>
                {colorScheme.name} ({colorScheme.isDark ? "Dark" : "Light"})
            </Option>,
        )

        return (
            <Dialog open onClose={() => delDialog()}>
                <DialogContent>
                    <TextField className={"url-textField"} label="URL Regex"><Input
                        value={this.state.rule.url}
                        onChange={(e) => {
                            const newRule = cloneDeep(this.state.rule)
                            newRule.url = e.currentTarget.value
                            this.setState({rule: newRule})
                        }}/>
                    </TextField>
                    <div className={"color-scheme-select"}>
                        <Select
                            enhanced
                            label="Color Scheme"
                            value={this.state.rule.colorSchemeId}
                            onEnhancedChange={(index, item) => {
                                const newRule = cloneDeep(this.state.rule)
                                newRule.colorSchemeId = item.getAttribute("data-value")
                                this.setState({rule: newRule})
                            }}>
                            {options}
                        </Select>
                        {getColorScheme(this.state.rule.colorSchemeId) ? <ColorSchemePreview
                            colorScheme={getColorScheme(this.state.rule.colorSchemeId)}/> : null}
                    </div>

                </DialogContent>
                <DialogFooter>
                    <DialogButton action='cancel'>Cancel</DialogButton>
                    <DialogButton action='save' isDefault onClick={() => {
                        saveRule(this.state.rule)
                        this.props.onSave()
                    }}>Save</DialogButton>
                </DialogFooter>
            </Dialog>
        )
    }
}