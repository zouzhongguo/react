/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import SubItems from './SubItems';
import {seoStyle} from '../common/style';
import Goods from './Goods';
import Header from './Header';
import Nav from './Nav';
import PageLayout from './PageLayout';
import Save from './Save';
import { pageConfig } from '../common/config';
import { AddActions } from '../actions/AddAction';

import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, Redirect } from 'react-router';

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
            goodsData: [{
                name: '',
                userNickname: '',
                picUrl: '',
                userAvatarUrl: '',
                price: '',
                originPrice: ''
            }],
            subItems: [{
                id: 0,
                name: '',
                url: ''
            }],
            redirectPage: false
        };
        this.saveSubItemsData = this.saveSubItemsData.bind(this);
        this.saveGoodsData = this.saveGoodsData.bind(this);
        this.updateGoodsData = this.updateGoodsData.bind(this);

        console.log(AddActions);
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
    onlyCloseDialog() {
        this.setState({
            showSavePageDialog: false
        });
    }
    closeSavePageDialog() {
        this.setState({
            showSavePageDialog: false
        });
        if (this.state.redirectPage) {
            window.location.hash = '';
        }
    }
    popupDialog(msg = '信息不完整，请检查') {
        this.setState({
            showSavePageDialog: true,
            pageCheckMsg: msg
        });
    }
    savePage() {
        //数据校验
        let pageData = this.state.pageData;
        for (var v in pageData) {
            if (pageData[v].trim() === '') {
                this.popupDialog('页面属性信息不完整，请检查。');
                return;
            }
        }

        let subItemData = this.state.subItems;
        for (var s = 0; s < subItemData.length; s++) {
            let item = subItemData[s];
            if (item.name === '' || item.url === '') {
                this.popupDialog('子类目信息不完整，请检查。');
                return;
            }
        }

        let goodsData = this.state.goodsData;
        for (var g = 0; g < goodsData.length; g++) {
            let item = goodsData[g];
            for (var k in item) {
                if (item.hasOwnProperty(k) && item[k] === '') {
                    this.popupDialog('商品信息不完整，请检查。');
                    return;
                }
            }
        }
        this.setState({
            redirectPage: true,
            hideCancel: true
        }, () => this.popupDialog('恭喜，创建成功！请在首页进行上传操作'));


        fetch('http://zhuanzhuan.58.com/zz/transfer/getCaptcha', {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
            .then(data => data.json())
            .then(resp => {
                console.log(resp);
            });

        console.log(this.state);
    }
    saveGoodsData(data) {
        this.setState({
            goodsData: data
        });
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
    /*componentWillMount() {
        if (this.state.redirectPage) {
            window.location.hash = '';
        }
    }
    componentDidMount() {
        console.log('did mount....');
    }*/
    render() {
        console.log('rendering add component');
        let pageData = this.state.pageData;
        return (
            <div className="add-container">
                <Header/>
                <Nav
                    title="新增品类"
                    btnTitle="首页"
                />
                <div className="page-group">
                    <h3>页面属性</h3>
                    <PageLayout
                        data={pageData}
                        showError={true}
                        onChange={this.changePageVal.bind(this)}
                        onBlur={this.changePageVal.bind(this)}
                    />
                </div>
                <div className="page-group">
                    <h3>商品相关</h3>
                    <MuiThemeProvider>
                        <Paper zDepth={2} style={seoStyle.paperStyle}>
                            <h3 className="item-sub-title">子类目文字+链接</h3>
                            <SubItems saveSubitem={this.saveSubItemsData} />
                            <br/>
                            <Goods goodsData={this.state.goodsData} updateGoodsData={this.updateGoodsData}/>
                        </Paper>
                    </MuiThemeProvider>
                </div>
                <Save
                    hideCancel={this.state.hideCancel}
                    showDialog={this.state.showSavePageDialog}
                    closeDialog={this.onlyCloseDialog.bind(this)}
                    actionAfterClose={this.closeSavePageDialog.bind(this)}
                    onSaveClick={this.savePage.bind(this)}
                    dialogText={this.state.pageCheckMsg}
                />
            </div>
        );
    }
}

export default Add;