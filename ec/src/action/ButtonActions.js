/**
 * Created by wumingli on 2016/10/17.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ButtonActions = {

    addNewItem: function (text) {
        console.log(text);
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    },

    removeItem(index) {
        console.log(index);
        AppDispatcher.dispatch({
            actionType: 'REMOVE_ITEM',
            index: index
        });
    }
};

module.exports = ButtonActions;