/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Fetch from 'react-fetch';
import SubItems from './SubItems';
import {seoStyle} from '../common/style';
import Goods from './Goods';
import Header from './Header';
import Nav from './Nav';
import PageLayout from './PageLayout';
import Save from './Save';
import { pageConfig } from '../common/config';

const Loading = (props) => (
    <div className="loading-data">正在加载{props.title}</div>
);

class EditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSavePageDialog: false,
            pageCheckMsg: ''
        };
        this.saveSubItemsData = this.saveSubItemsData.bind(this);
        this.saveGoodsData = this.saveGoodsData.bind(this);
        this.updateGoodsData = this.updateGoodsData.bind(this);
    }
    changePageVal(e) {
        let value = e.target.value.trim();
        let originPageData = this.state.pageData || this.props.pageData || {};
        this.setState({
            pageData: {
                ...originPageData,
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
        if (!this.state.goodsData) {
            this.saveGoodsData(this.props.goodsData);
        }
        if (!this.state.subItems) {
            this.saveGoodsData(this.props.subItems);
        }
        if (!this.state.pageData) {
            this.setState({
                pageData: this.props.pageData
            });
        }
        this.setState({
            showSavePageDialog: true,
            pageCheckMsg: '信息不完整，请检查'
        }, () => console.log(this.state));
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
        /*return nextStates.showSavePageDialog !== this.state.showSavePageDialog ||
            nextStates.goodsData !== this.state.goodsData ||
            nextStates.pageData !== this.state.pageData ||
            nextProps.pageData !== this.state.pageData;*/
        return true;
    }
    /*componentDidMount() {
     console.log('did mount....');
     }*/
    render() {
        console.log('rendering Edit Page....');
        let pageData = this.props.pageData;
        return (
            <div className="add-container">
                <Header/>
                <Nav
                    title="新增品类"
                    btnTitle="首页"
                />
                <div className="page-group">
                    <h3>页面属性</h3>
                    {
                        pageData ?
                        <PageLayout
                            data={pageData}
                            showError={true}
                            onChange={this.changePageVal.bind(this)}
                            onBlur={this.changePageVal.bind(this)}
                        /> : <Loading title="页面属性" />
                    }
                </div>
                <div className="page-group">
                    <h3>商品相关</h3>
                    {
                        pageData ?
                            <MuiThemeProvider>
                                <Paper zDepth={2} style={seoStyle.paperStyle}>
                                    <h3 className="item-sub-title">子类目文字+链接</h3>
                                    <SubItems subItems={this.props.subItems} saveSubitem={this.saveSubItemsData} />
                                    <br/>
                                    <Goods goodsData={this.props.goodsData} updateGoodsData={this.updateGoodsData}/>
                                </Paper>
                            </MuiThemeProvider> : <Loading title="商品属性" />
                    }
                </div>
                <Save
                    showDialog={this.state.showSavePageDialog}
                    closeDialog={this.closeSavePageDialog.bind(this)}
                    actionAfterClose={this.closeSavePageDialog.bind(this)}
                    onSaveClick={this.savePage.bind(this)}
                    dialogText={this.state.pageCheckMsg}
                />
            </div>
        );
    }
}

const Edit = () => (
    <Fetch url="/mock/page.json">
        <EditPage />
    </Fetch>
);
export default Edit;