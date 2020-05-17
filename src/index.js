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
import {Headline5} from "@material/react-typography"
import MaterialIcon from "@material/react-material-icon"
import Button from "@material/react-button"
import {ColorSchemeDialog} from "./ColorSchemeDialog"
import {v1 as uuidV1} from "uuid"
import "@material/react-list/dist/list.css"
import List, {ListItem, ListItemText, ListItemMeta} from "@material/react-list"
import {deleteColorScheme, getColorSchemeList, initStorage, saveColorScheme} from "./storage"
import "@material/react-icon-button/dist/icon-button.css"
import IconButton from "@material/react-icon-button"
import cloneDeep from "lodash/cloneDeep"

function ColorSchemePreview(props) {
    let colorBlocks = props.styles.map((style) => <span className={"preview-color-block"}
                                                        style={{background: style.color}}/>)
    return <div className={"preview-color-div"}
                style={{background: props.isDark ? "#222" : "transparent"}}>{colorBlocks}</div>
}

class ColorSchemeSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colorSchemeList: getColorSchemeList(),
        }

        this.updateList = this.updateList.bind(this)
        initStorage(() => this.updateList())
    }

    updateList() {
        this.setState({
            colorSchemeList: getColorSchemeList(),
        })
    }

    render() {
        let listItems = getColorSchemeList().map((colorScheme) =>
            <ListItem key={colorScheme.id}>
                <ListItemText primaryText={colorScheme.name}
                              secondaryText={colorScheme.isDark ? "Dark Background" : "Light Background"}/>
                <ListItemMeta meta={<ColorSchemePreview styles={colorScheme.styles} isDark={colorScheme.isDark}/>}/>
                <ListItemMeta meta={<div>
                    <IconButton onClick={() => showDialog(
                        <ColorSchemeDialog colorSchemeId={colorScheme.id}
                                           onSave={() => this.updateList()}/>,
                    )}>
                        <MaterialIcon icon='create'/>
                    </IconButton>
                    <IconButton onClick={() => {
                        const newColorScheme = cloneDeep(colorScheme)
                        newColorScheme.id = uuidV1()
                        saveColorScheme(newColorScheme)
                        showDialog(
                            <ColorSchemeDialog colorSchemeId={newColorScheme.id}
                                               onSave={() => this.updateList()}/>,
                        )
                    }}>
                        <MaterialIcon icon='file_copy'/>
                    </IconButton>
                    <IconButton onClick={() => {
                        deleteColorScheme(colorScheme.id)
                        this.updateList()
                    }}>
                        <MaterialIcon icon='delete'/>
                    </IconButton>
                </div>}/>

            </ListItem>,
        )

        return (
            <div>
                <Headline5>Color Schemes
                    <Button className={"add-btn"}
                            icon={<MaterialIcon icon='add'/>}
                            onClick={() => showDialog(
                                <ColorSchemeDialog colorSchemeId={uuidV1()}
                                                   onSave={() => this.updateList()}/>,
                            )}>
                        Add
                    </Button>
                </Headline5>
                <List twoLine nonInteractive>
                    {listItems}
                </List>
            </div>
        )
    }
}

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