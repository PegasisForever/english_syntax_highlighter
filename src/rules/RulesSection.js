import React from "react"
import {
    deleteRule,
    getColorScheme,
    getRuleList,
    initStorage,saveRule,
} from "../storage"
import List, {ListItem, ListItemMeta, ListItemText} from "@material/react-list"
import IconButton from "@material/react-icon-button"
import MaterialIcon from "@material/react-material-icon"
import {v1 as uuidV1} from "uuid"
import {Headline5} from "@material/react-typography"
import Button from "@material/react-button"
import {showDialog} from "../index"
import cloneDeep from "lodash/cloneDeep"
import {RulesDialog} from "./RulesDialog"


export class RulesSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ruleList: getRuleList(),
        }

        this.updateList = this.updateList.bind(this)
    }

    componentDidMount() {
        initStorage(() => this.updateList())
    }

    updateList() {
        this.setState({
            ruleList: getRuleList(),
        })
    }

    render() {
        let listItems = this.state.ruleList.map((rule) => {
                const colorScheme = getColorScheme(rule.colorSchemeId)
                return <ListItem key={rule.id}>
                    <ListItemText primaryText={rule.url}/>
                    <ListItemMeta className={"color-scheme-name"}
                                  meta={colorScheme.name + " (" + (colorScheme.isDark ? "Dark" : "Light") + ")"}/>
                    <ListItemMeta meta={<div>
                        <IconButton onClick={() => showDialog(
                            <RulesDialog ruleId={rule.id}
                                         onSave={() => this.updateList()}/>,
                        )}>
                            <MaterialIcon icon='create'/>
                        </IconButton>
                        <IconButton onClick={() => {
                            const newRule = cloneDeep(rule)
                            newRule.id = uuidV1()
                            saveRule(newRule)
                            showDialog(
                                <RulesDialog ruleId={newRule.id}
                                             onSave={() => this.updateList()}/>,
                            )
                        }}>
                            <MaterialIcon icon='file_copy'/>
                        </IconButton>
                        <IconButton onClick={() => {
                            deleteRule(rule.id)
                            this.updateList()
                        }}>
                            <MaterialIcon icon='delete'/>
                        </IconButton>
                    </div>}/>
                </ListItem>
            },
        )

        return (
            <div>
                <Headline5>Rules
                    <Button className={"add-btn"}
                            icon={<MaterialIcon icon='add'/>}
                            onClick={() => showDialog(
                                <RulesDialog colorSchemeId={uuidV1()}
                                             onSave={() => this.updateList()}/>,
                            )}>
                        Add
                    </Button>
                </Headline5>
                <List nonInteractive>
                    {listItems}
                </List>
            </div>
        )
    }
}