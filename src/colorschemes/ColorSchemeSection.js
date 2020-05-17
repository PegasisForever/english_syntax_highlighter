import React from "react"
import {deleteColorScheme, getColorSchemeList, initStorage, saveColorScheme} from "../storage"
import List, {ListItem, ListItemMeta, ListItemText} from "@material/react-list"
import IconButton from "@material/react-icon-button"
import {ColorSchemeDialog} from "./ColorSchemeDialog"
import MaterialIcon from "@material/react-material-icon"
import {v1 as uuidV1} from "uuid"
import {Headline5} from "@material/react-typography"
import Button from "@material/react-button"
import {showDialog} from "../index"
import cloneDeep from "lodash/cloneDeep"

function ColorSchemePreview(props) {
    let colorBlocks = props.styles.map((style, index) =>
        <span className={"preview-color-block"}
              key={index}
              style={{background: style.color}}/>)
    return <div className={"preview-color-div"}
                style={{background: props.isDark ? "#222" : "transparent"}}>{colorBlocks}</div>
}

export class ColorSchemeSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colorSchemeList: getColorSchemeList(),
        }

        this.updateList = this.updateList.bind(this)
    }

    componentDidMount() {
        initStorage(() => this.updateList())
    }

    updateList() {
        this.setState({
            colorSchemeList: getColorSchemeList(),
        })
    }

    render() {
        let listItems = this.state.colorSchemeList.map((colorScheme) =>
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