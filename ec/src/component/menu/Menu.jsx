'use strict';

import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionCardMembership from 'material-ui/svg-icons/content/unarchive';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import FileFileUpload from 'material-ui/svg-icons/editor/publish';
import Divider from 'material-ui/Divider';

const paperStyle = {
    color: '#fff',
    marginTop: 13
};
const listItemStyle = {
    fontWeight: 700
};
let SelectableList = makeSelectable(List);
const docTitleMap = {
    '2': '商品列表',
    '3': '发布商品',
    '4': '图片上传',
    '5': '订单列表',
    '6': '批量发货'
};
function setTitle(index) {
    document.title = `${docTitleMap[index]}——电商运营后台`;
}
function wrapState(ComposedComponent) {
    return class SelectableList extends React.Component {


        componentWillMount() {
            let titleIndex = this.props.defaultValue;
            this.setState({
                selectedIndex: titleIndex,
            });
            setTitle(titleIndex);
        }

        handleRequestChange(event, index) {
            this.setState({
                selectedIndex: index,
            });
            setTitle(index);
        }

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange.bind(this)}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}
SelectableList = wrapState(SelectableList);

const LeftMenu = (props) => (
    <MuiThemeProvider>
        <SelectableList defaultValue={3}>
            <ListItem
                primaryText="商品管理"
                style={listItemStyle}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                value={1}
                nestedItems={[
                    <ListItem
                        key={0}
                        primaryText="商品列表"
                        leftIcon={<ActionList />}
                        value={2}
                        innerDivStyle={{paddingLeft: 55}}
                    />,
                    <ListItem
                        key={1}
                        primaryText="发布商品"
                        leftIcon={<FileFileUpload />}
                        value={3}
                        innerDivStyle={{paddingLeft: 55}}
                    />,
                    <ListItem
                        key={2}
                        primaryText="图片上传"
                        leftIcon={<ImageAddAPhoto />}
                        value={4}
                        innerDivStyle={{paddingLeft: 55}}
                    />
                ]}
            />
            <Divider />
            <ListItem
                primaryText="订单管理"
                style={listItemStyle}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                        key={0}
                        primaryText="订单列表"
                        leftIcon={<ContentSend />}
                        value={5}
                        innerDivStyle={{paddingLeft: 55}}
                    />,
                    <ListItem
                        key={1}
                        primaryText="批量发货"
                        leftIcon={<ActionCardMembership />}
                        innerDivStyle={{paddingLeft: 55}}
                    />
                ]}
                value={6}
            />
            <Divider />
            <ListItem
                primaryText="暂定分类"
                style={listItemStyle}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                value={7}
            />
        </SelectableList>
    </MuiThemeProvider>
);

export default LeftMenu;