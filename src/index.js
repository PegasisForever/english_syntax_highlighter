import React, {Fragment} from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "@material/react-top-app-bar/dist/top-app-bar.css"
import "@material/react-material-icon/dist/material-icon.css"
import "@material/react-fab/dist/fab.css"
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from "@material/react-top-app-bar"
import "@material/react-typography/dist/typography.css"
import "@material/react-icon-button/dist/icon-button.css"
import "@material/react-button/dist/button.css"
import "@material/react-list/dist/list.css"
import {ColorSchemeSection} from "./colorschemes/ColorSchemeSection"

let showDialog
let delDialog

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
                    <ColorSchemeSection/>
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