/**
 * Created by wumingli on 2016/11/28.
 */
var pageConfig = [
    {
        hintText: '类目名称',
        keyForItem: 'itemName',
        nodeId: 'item-name',
        notNull: true
    },
    {
        hintText: '生成路径',
        keyForItem: 'itemPathName',
        nodeId: 'item-path-name',
        notNull: true
    },
    {
        hintText: '页面标题',
        keyForItem: 'itemPageTitle',
        nodeId: 'item-page-title',
        defaultValue: '【转转】58同城二手交易平台,同城交易',
        notNull: false
    },
    {
        hintText: '关键字',
        keyForItem: 'itemKeywords',
        nodeId: 'item-keywords',
        notNull: false
    },
    {
        hintText: '页面描述',
        keyForItem: 'itemDescription',
        nodeId: 'item-description',
        notNull: false,
        multi: true
    }
];

var goodsConfig = {
    name: '商品名称',
    picUrl: '商品图片链接',
    userAvatarUrl: '用户头像链接',
    userNickname: '用户昵称',
    price: '商品价格',
    originPrice: '商品原价'
};

exports.pageConfig = pageConfig;
exports.goodsConfig = goodsConfig;