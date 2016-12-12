/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FileFileUpload from 'material-ui/svg-icons/editor/publish';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import Header from '../Header';
import Nav from '../Nav';
import Save from '../Save';
import { pageConfig } from '../../common/config';
import Menu from '../menu/Menu';

require('../../css/main.scss');

const addStyle = {
    float: 'right',
    width: '85%',
    borderLeft: '5px solid rgb(0, 188, 212)',
    boxSizing: 'border-box'
};
const goodsText = {
    width: '15%',
    textAlign: 'right',
    paddingRight: 0,
    fontSize: 14
};
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        display: 'inline-block',
        width: 'auto',
        marginRight: 15,
        marginTop: 10
    },
    checkbox: {
        display: 'inline-block',
        width: 'auto',
        marginRight: 15,
        marginTop: 12
    },
    switchesLabel: {
        marginRight: 5
    },
    borderedInput: {
        border: '1px solid #ccc',
        verticalAlign: 8,
        height: 25,
        lineHeight: '25px',
        width: 100,
        textIndent: 5,
        borderRadius: 3
    },
    shortInput: {
        width: 120
    },
    timeInput: {
        display: 'inline-block',
        width: 100,
        verticalAlign: 'middle',
        overflow: 'hidden',
        marginRight: 15,
        fontSize: 12
    },
    timeFiledInput: {
        fontSize: 14,
        textIndent: 10
    }
};

const underLineShow = true;


class Add extends React.Component {
    constructor(props) {
        super(props);
        let pageCf = {};

        pageConfig.map((cfg) => {
            pageCf[cfg.keyForItem] = ' ';
            if (cfg.defaultValue) {
                pageCf[cfg.keyForItem] = cfg.defaultValue;
            }
        });

        this.state = {
            pageData: pageCf,
            showSavePageDialog: false,
            pageCheckMsg: '',
            value: 1,
            goodsData: [{
                name: '',
                userNickname: '',
                picUrl: '',
                userAvatarUrl: '',
                price: '',
                originPrice: ''
            }]
        };
        this.saveSubItemsData = this.saveSubItemsData.bind(this);
        this.saveGoodsData = this.saveGoodsData.bind(this);
        this.updateGoodsData = this.updateGoodsData.bind(this);
    }
    changePageVal(e) {
        let value = e.target.value.trim();
        this.setState({
            pageData: {
                ...this.state.pageData,
                [e.target.id]: value
            }
        });
    }
    closeSavePageDialog() {
        this.setState({
            showSavePageDialog: false
        });
    }
    savePage() {
        this.setState({
            showSavePageDialog: true,
            pageCheckMsg: '信息不完整，请检查'
        }, () => console.log(JSON.stringify(this.state)));
    }
    saveGoodsData(data) {
        this.setState({
            goodsData: data
        });
    }

    handleChange(event, index, value){
        this.setState({value});
    }

    saveSubItemsData(subData) {
        this.setState({
            subItems: subData
        });
    }
    updateGoodsData(data) {
        this.setState({
            goodsData: data
        });
    }
    shouldComponentUpdate(nextProps, nextStates) {
        //console.log(nextProps, nextStates, this.state);
        //console.log(this.props, nextProps);
        return nextStates.showSavePageDialog !== this.state.showSavePageDialog ||
            nextStates.goodsData !== this.state.goodsData ||
            nextStates.pageData !== this.state.pageData ||
            nextProps.pageData !== this.state.pageData;
    }
    /*componentDidMount() {
        console.log('did mount....');
    }*/
    render() {
        /*console.log('rendering add component');
        console.log(this.state);*/
        let pageData = this.state.pageData;
        return (
            <div>
                <Header/>
                <div className="main-container">
                    <div className="left-menu">
                        <Menu />
                    </div>
                    <div className="right-container">
                        <Nav
                            title="发布商品"
                            hideRightBtn={true}
                        />
                        <div className="page-group">
                            <h3>商品基础信息</h3>
                            <MuiThemeProvider>
                                <Paper zDepth={2} style={{width: '80%', margin: '0 auto', padding: '10px 0'}}>
                                    <Table>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>财务核算打标</TableRowColumn>
                                                <TableRowColumn>
                                                    <RadioButtonGroup name="shipSpeed" defaultSelected="normal">
                                                        <RadioButton
                                                            value="normal"
                                                            label="普通商品"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                        <RadioButton
                                                            value="unnormal"
                                                            label="京东备件库商品"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                    </RadioButtonGroup>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}><span className="must-input-title">商品标题</span></TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        hintStyle={{fontSize: 14}}
                                                        hintText="商品标题"
                                                        underlineShow={underLineShow}
                                                        floatingLabelFixed={true}
                                                        fullWidth={true}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={{...goodsText}}>商品描述</TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        multiLine={true}
                                                        fullWidth={true}
                                                        hintStyle={{fontSize: 14}}
                                                        hintText="商品描述"
                                                        underlineShow={underLineShow}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>
                                                    商品分类
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} style={{width: 200}} underlineStyle={{border:0}}>
                                                        <MenuItem value={1} primaryText="一级分类" />
                                                        <MenuItem value={2} primaryText="一级1111分类" />
                                                    </DropDownMenu>
                                                    <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} style={{width: 200}} underlineStyle={{border:0}}>
                                                        <MenuItem value={1} primaryText="二级分类" />
                                                        <MenuItem value={2} primaryText="二级2222分类" />
                                                        <MenuItem value={3} primaryText="二级2222分类" />
                                                    </DropDownMenu>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>特色标签</TableRowColumn>
                                                <TableRowColumn>
                                                    <Checkbox
                                                        label="验货面交"
                                                        style={styles.checkbox}
                                                        iconStyle={styles.switchesLabel}
                                                        defaultChecked={true}
                                                    />
                                                    <Checkbox
                                                        label="一口价"
                                                        style={styles.checkbox}
                                                        iconStyle={styles.switchesLabel}
                                                    />
                                                    <Checkbox
                                                        label="有发票"
                                                        style={styles.checkbox}
                                                        iconStyle={styles.switchesLabel}
                                                    />
                                                    <Checkbox
                                                        label="保修期内"
                                                        style={styles.checkbox}
                                                        iconStyle={styles.switchesLabel}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>
                                                    <span className="must-input-title">商品位置</span>
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} style={{width: 200}} underlineStyle={{border:0}}>
                                                        <MenuItem value={1} primaryText="北京市" />
                                                        <MenuItem value={2} primaryText="一级1111分类" />
                                                    </DropDownMenu>
                                                    <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} style={{width: 200}} underlineStyle={{border:0}}>
                                                        <MenuItem value={1} primaryText="朝阳区" />
                                                        <MenuItem value={2} primaryText="二级2222分类" />
                                                        <MenuItem value={3} primaryText="二级2222分类" />
                                                    </DropDownMenu>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>商品图片</TableRowColumn>
                                                <TableRowColumn>
                                                    <RaisedButton
                                                        label="上传图片"
                                                        labelPosition="before"
                                                        primary={true}
                                                        icon={<FileFileUpload />}
                                                        style={styles.button}
                                                    />
                                                    <span className="tip-text">支持多张上传，至少上传一张图片</span>
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </MuiThemeProvider>
                        </div>


                        <div className="page-group">
                            <h3>价格/库存设置</h3>
                            <MuiThemeProvider>
                                <Paper zDepth={2} style={{width: '80%', margin: '0 auto', padding: '10px 0'}}>
                                    <Table>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}><span className="must-input-title">商品售价</span></TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        hintStyle={{fontSize: 14}}
                                                        hintText="请填写商品售价"
                                                        underlineShow={underLineShow}
                                                        floatingLabelFixed={true}
                                                        style={styles.shortInput}
                                                    />
                                                    <span className="tip-text">元</span>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>原价</TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        hintStyle={{fontSize: 14}}
                                                        hintText="原价，可以为空"
                                                        underlineShow={underLineShow}
                                                        floatingLabelFixed={true}
                                                        fullWidth={true}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}><span className="must-input-title">邮费</span></TableRowColumn>
                                                <TableRowColumn>
                                                    <RadioButtonGroup name="ship-price" defaultSelected="buyer" style={{display: 'inline-block'}}>
                                                        <RadioButton
                                                            label="卖家包邮"
                                                            value="saller"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                        <RadioButton
                                                            label="待议"
                                                            value="other"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                        <RadioButton
                                                            label="买家付"
                                                            value="buyer"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                    </RadioButtonGroup>
                                                    <TextField
                                                        name="youfei"
                                                        style={{verticalAlign: 'top', width: 80}}
                                                        defaultValue="0"
                                                    />
                                                    <span className="tip-text tip-text-after-bordered-input">元</span>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={{...goodsText}}><span className="must-input-title">剩余库存</span></TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        hintStyle={{fontSize: 14}}
                                                        hintText="剩余库存"
                                                        name="last-remain"
                                                        underlineShow={underLineShow}
                                                        defaultValue={`1`}
                                                        style={styles.shortInput}
                                                    />
                                                    <span className="tip-text">新发布商品库存默认为1，库存为0自动下架</span>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={{...goodsText}}>购买限制</TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        underlineShow={underLineShow}
                                                        style={styles.shortInput}
                                                        name="buy-limit"
                                                    />
                                                    <span className="tip-text">单用户对商品的最大购买量，“为空”表示不限制</span>
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </MuiThemeProvider>
                        </div>

                        <div className="page-group">
                            <h3>上/下架设置 <span className="important-tip">重要提示：只有商品是上架状态才会生效；定时售卖开始/结束不会影响商品的上架/下架</span></h3>
                            <MuiThemeProvider>
                                <Paper zDepth={2} style={{width: '80%', margin: '0 auto', padding: '10px 0'}}>
                                    <Table>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={goodsText}>上架设置</TableRowColumn>
                                                <TableRowColumn>
                                                    <RadioButtonGroup name="shipSpeed" defaultSelected="now" style={{display: 'inline-block', verticalAlign: 'middle'}}>
                                                        <RadioButton
                                                            value="now"
                                                            label="发布后即可上架"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                        <RadioButton
                                                            value="not-now"
                                                            label="发布后暂不上架"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                        <RadioButton
                                                            value="in-time"
                                                            label="定时上架"
                                                            style={styles.radioButton}
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                    </RadioButtonGroup>
                                                    <DatePicker
                                                        hintText="选择日期"
                                                        autoOk={true}
                                                        mode="landscape"
                                                        style={styles.timeInput}
                                                        textFieldStyle={styles.timeFiledInput}
                                                    />
                                                    <TimePicker
                                                        hintText="详细时间"
                                                        style={styles.timeInput}
                                                        format="24hr"
                                                        autoOk={true}
                                                        textFieldStyle={styles.timeFiledInput}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow selectable={false} style={{borderBottom: '0'}}>
                                                <TableRowColumn style={{...goodsText, verticalAlign: 'top'}}>售卖设置</TableRowColumn>
                                                <TableRowColumn>
                                                    <RadioButtonGroup name="sale-setting" defaultSelected="sale-now" style={{display: 'inline-block', verticalAlign: 'text-bottom'}}>
                                                        <RadioButton
                                                            value="sale-now"
                                                            label="上架即可售卖"
                                                            iconStyle={styles.switchesLabel}
                                                            style={{marginBottom: 10}}
                                                        />
                                                        <RadioButton
                                                            value="sale-now"
                                                            label="定时售卖"
                                                            iconStyle={styles.switchesLabel}
                                                        />
                                                    </RadioButtonGroup>
                                                    <div style={{display: 'inline-block', verticalAlign: 'bottom', paddingLeft: 15}}>
                                                        <DatePicker
                                                            hintText="选择日期"
                                                            autoOk={true}
                                                            mode="landscape"
                                                            style={styles.timeInput}
                                                            textFieldStyle={styles.timeFiledInput}
                                                        />
                                                        <TimePicker
                                                            hintText="详细时间"
                                                            format="24hr"
                                                            autoOk={true}
                                                            style={{...styles.timeInput, marginRight: 0}}
                                                            textFieldStyle={styles.timeFiledInput}
                                                        /><span className="tip-text tip-text-after-bordered-input" style={{verticalAlign: 'middle'}}>至</span>
                                                        <DatePicker
                                                            hintText="选择日期"
                                                            autoOk={true}
                                                            mode="landscape"
                                                            style={styles.timeInput}
                                                            textFieldStyle={styles.timeFiledInput}
                                                        />
                                                        <TimePicker
                                                            hintText="详细时间"
                                                            format="24hr"
                                                            autoOk={true}
                                                            style={styles.timeInput}
                                                            textFieldStyle={styles.timeFiledInput}
                                                        />
                                                    </div>
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </MuiThemeProvider>
                        </div>

                        <Save
                            showDialog={this.state.showSavePageDialog}
                            closeDialog={this.closeSavePageDialog.bind(this)}
                            actionAfterClose={this.closeSavePageDialog.bind(this)}
                            onSaveClick={this.savePage.bind(this)}
                            dialogText={this.state.pageCheckMsg}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;