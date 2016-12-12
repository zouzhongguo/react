/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500, cyan300, amber500, grey500} from 'material-ui/styles/colors';
import { Link } from 'react-router';


const style = {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textIndent: 10
};
const iconStyles = {
    marginRight: 5,
    cursor: 'pointer'
};

const showCheckboxes = false;

export default class List extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            showCheckboxes: false
        };*/
    }
    static editItem(idx) {
        alert('编辑' + idx);
    }
    static deleteItem(idx) {
        alert('删除' + idx)
    }
    render() {
        //console.log(this.props);
        const dataFromProps = this.props.respData;
        var listData = [];
        if (dataFromProps && dataFromProps.list) {
            listData = dataFromProps.list;
        }
        if (listData.length === 0) {
            return null;
        }
        const list = listData.map(
            item => (
                <TableRow key={item.id} selectable={false}>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.itemName}</TableRowColumn>
                    <TableRowColumn style={{color: '#06c', cursor: 'pointer'}}>
                        <a href={'http://www.zhuanzhuan.com/product/' + item.itemPath} target="_blank">/product/{item.itemPath}</a>
                    </TableRowColumn>
                    <TableRowColumn>
                        <Link to={`/edit/${item.id}`}>
                            <FontIcon className="material-icons" style={iconStyles} color={blue500} hoverColor={grey500}>edit</FontIcon>
                        </Link>
                        <FontIcon className="material-icons" style={iconStyles} color={red500} hoverColor={grey500} onClick={() => {List.deleteItem(item.id)}}>delete</FontIcon>
                        <FontIcon className="material-icons" style={iconStyles} color={amber500} hoverColor={grey500}>cloud_upload</FontIcon>
                    </TableRowColumn>
                </TableRow>
            )
        );
        return (
            <Table>
                <TableHeader
                    displaySelectAll={showCheckboxes}
                    adjustForCheckbox={showCheckboxes}>
                    <TableRow>
                        <TableHeaderColumn style={style}>ID</TableHeaderColumn>
                        <TableHeaderColumn style={style}>类目</TableHeaderColumn>
                        <TableHeaderColumn style={style}>路径</TableHeaderColumn>
                        <TableHeaderColumn style={style}>操作</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={showCheckboxes}>
                    {list}
                </TableBody>
            </Table>
        );
    }
}