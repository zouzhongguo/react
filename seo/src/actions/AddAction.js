/**
 * Created by wumingli on 2016/10/17.
 */
var AppDispatcher = require('../dispatchers/SeoDispatcher');

var AddAction = {

    addNewItem: function (item) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            item: item
        });
    },

    removeItem(index) {
        AppDispatcher.dispatch({
            actionType: 'REMOVE_ITEM',
            index: index
        });
    }
};

exports.AddActions = AddAction;