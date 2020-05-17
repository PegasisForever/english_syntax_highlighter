import React, {Fragment} from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from "@material/react-top-app-bar"
import {ColorSchemeSection} from "./colorschemes/ColorSchemeSection"
import {RulesSection} from "./rules/RulesSection"
import Switch from "@material/react-switch"
import {getIsEnabled, initStorage, setIsEnabled} from "./storage"
import Button from "@material/react-button"

let showDialog
let delDialog

function Toolbar() {
    return <div className={"toolbar"}>
        <div>
            <label id="enable-label" htmlFor='enable-switch'>Enable</label>
            <Switch
                className={"enable-switch"}
                nativeControlId='enable-switch'
                checked={getIsEnabled()}
                onChange={(e) => {
                    setIsEnabled(e.target.checked)
                }}/>
        </div>
        <Button
            onClick={() => {
            }}>
            Import
        </Button>
        <Button
            onClick={() => {
            }}>
            Export
        </Button>
    </div>
}

class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialog: null,
        }
        this.showDialog = this.showDialog.bind(this)
        this.delDialog = this.delDialog.bind(this)
        showDialog = this.showDialog
        delDialog = this.delDialog
    }

    showDialog(dialog) {
        this.setState({
            dialog: dialog,
        })
    }


    delDialog() {
        this.setState({
            dialog: null,
        })
    }

    componentDidMount() {
        initStorage(() => this.setState({}))
    }

    render() {
        return (
            <Fragment>
                <TopAppBar fixed>
                    <TopAppBarRow>
                        <TopAppBarSection align='start'>
                            <TopAppBarTitle>English Syntax Highlighter Settings</TopAppBarTitle>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust className={"content"}>
                    <Toolbar/>
                    <ColorSchemeSection/>
                    <RulesSection/>
                </TopAppBarFixedAdjust>
                {this.state.dialog}
            </Fragment>
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <SettingsPage/>
    </React.StrictMode>,
    document.getElementById("root"),
)

export {showDialog, delDialog}