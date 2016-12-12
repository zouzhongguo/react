/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import {seoStyle} from '../common/style';
import TextField from 'material-ui/TextField';
import { goodsConfig } from '../common/config';
import FontIcon from 'material-ui/FontIcon';
import { red500, cyan300 } from 'material-ui/styles/colors';

const lineShow = true;

const deleteIconStyle = {
    position: 'absolute',
    right: 10,
    top: 10
};
export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: props.goodsData
        };
        //this.addGoodItem = this.addGoodItem.bind(this);
    }
    addGoodItem() {
        let tempGoods = this.state.goods;
        this.setState({
            goods: tempGoods.concat(
                {
                    name: '',
                    userNickname: '',
                    picUrl: '',
                    userAvatarUrl: '',
                    price: '',
                    originPrice: ''
                }
            )
        }, () => this.updateGoodsData(this.state.goods));
    }
    removeGoodItem(item) {
        let tempGoods = [];
        this.state.goods.map((good) => {
            if (good !== item) {
                tempGoods.push(good);
            }
        });
        this.setState({
            goods: tempGoods
        });
        this.updateGoodsData(tempGoods);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.goods.length !== nextState.goods.length;
    }
    updateGoodValue(e, key, index) {
        let tempGoods = this.state.goods;
        tempGoods[index][key] = e.target.value;
        this.setState({
            goods: tempGoods
        });
    }
    updateGoodsData(data) {
        this.props.updateGoodsData(data);
    }
    renderGood() {
        return this.state.goods.map((item, index) => {
            var goodsNode = [];
            for (let good in item) {
                if (item.hasOwnProperty(good)) {
                    goodsNode.push(
                        <TextField
                            key={good}
                            hintText={`请输入${goodsConfig[good]}`}
                            style={good === 'picUrl' || good === 'userAvatarUrl' ? seoStyle.inputStyle : seoStyle.subInputStyle}
                            underlineShow={lineShow}
                            floatingLabelFixed={true}
                            onChange={(e) => {
                                this.updateGoodValue(e, good, index)
                            }}
                            id={`goods-${good}-${index}`}
                            floatingLabelStyle={seoStyle.labelStyle}
                            floatingLabelFocusStyle={seoStyle.labelFocusStyle}
                            defaultValue={item[good]}
                        />
                    );
                }
            }

            return (
                <Paper key={`goods-item-${Math.random()}`} zDepth={1} style={{...seoStyle.innerPaperStyle, marginBottom: 10, position: 'relative'}}>
                    {goodsNode}
                    {
                        this.state.goods.length > 1 ?
                        <FontIcon
                            className="material-icons"
                            style={{...seoStyle.iconStyles, deleteIconStyle}}
                            color={red500}
                            hoverColor={cyan300}
                            onClick={() => {
                                this.removeGoodItem(item);
                            }}>delete</FontIcon>
                        : null
                    }
                </Paper>
            );
        });
    }
    render() {
        return (
            <div className="page-group">
                <h3 className="item-sub-title" style={seoStyle.itemListTitle}>
                    <span>商品信息</span>
                    <FontIcon className="material-icons" style={seoStyle.iconStyles} color={cyan300} hoverColor={red500} onClick={this.addGoodItem.bind(this)}>add</FontIcon>
                </h3>
                {this.renderGood()}
            </div>
        );
    }
};

