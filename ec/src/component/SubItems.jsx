/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import {seoStyle} from '../common/style';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { red500, cyan300 } from 'material-ui/styles/colors';
import SeoDialog from '../common/Dialog';

const lineShow = true;

class SubItems extends React.Component {
    constructor(props) {
        super(props);
        console.log('SubItems constructor======', props);
        this.state = {
            showAddSubDialog: false,
            subItems: props.subItems || [{
                id: 0,
                name: '',
                url: ''
            }]
        };
    }

    updateState(data) {
        this.props.saveSubitem(data);
        this.setState({
            subItems: data
        });
    }

    addSubItem() {
        let subItem = this.props.subItems? this.props.subItems: this.state.subItems;
        const lastSubItem = subItem[subItem.length - 1];
        if (lastSubItem.url.trim() === '' || lastSubItem.name.trim() === '') {
            this.setState({
                showAddSubDialog: true
            });
            return false;
        }
        this.setState({
            showAddSubDialog: false
        });
        this.updateState(
            subItem.concat({
                id: subItem.length,
                name: '',
                url: ''
            })
        );
    }

    deleteSubItem(item) {
        let tempItems = [];
        this.state.subItems.map((target) => {
            if (target !== item) {
                tempItems.push(target);
            }
        });
        this.updateState(tempItems);
    }

    updateSubItemVal(e, item, type) {
        let tempItems = this.state.subItems;
        tempItems.filter((subItem) => {
            if (item === subItem) {
                subItem[type] = e.target.value.trim();
            }
        });

        this.updateState(tempItems);
    }

    closeDialog() {
        this.setState({
            showAddSubDialog: false
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.subItems !== nextState.subItems
            || this.state.showAddSubDialog !== nextState.showAddSubDialog;
    }

    render() {
        //console.log('rendering sub items...');
        let subItems = this.props.subItems ? this.props.subItems: this.state.subItems;
        console.log(subItems);
        let subItemList = subItems.map((item, index) => {
            return (
                <div key={`sub-item-${Math.random()}`}>
                    <TextField
                        hintText="子品类名称"
                        underlineShow={lineShow}
                        floatingLabelFixed={true}
                        style={seoStyle.subNameStyle}
                        onChange={(e) => {
                            this.updateSubItemVal(e, item, 'name');
                        }}
                        defaultValue={item.name}
                    />
                    <TextField
                        hintText="路径，http(s)://"
                        underlineShow={lineShow}
                        floatingLabelFixed={true}
                        style={seoStyle.subStyle}
                        onChange={(e) => {
                            this.updateSubItemVal(e, item, 'url');
                        }}
                        defaultValue={item.url}
                    />
                    {
                        (index === subItems.length - 1 && subItems.length < 5) ?
                            <FontIcon className="material-icons" style={seoStyle.iconStyles} color={cyan300}
                                      hoverColor={red500} onClick={this.addSubItem.bind(this)}>add</FontIcon>
                            : <FontIcon className="material-icons" style={seoStyle.iconStyles} color={red500}
                                        hoverColor={cyan300} onClick={() => {
                            this.deleteSubItem(item);
                        }}>delete</FontIcon>
                    }

                </div>
            );
        });
        return (
            <div>
                {subItemList}
                <SeoDialog
                    showDialog={this.state.showAddSubDialog}
                    closeDialog={this.closeDialog.bind(this)}
                    actionAfterClose={this.closeDialog.bind(this)}
                    dialogText="子品类名称和路径必须填写"
                />
            </div>
        );
    }
}


export default SubItems;