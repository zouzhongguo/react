/**
 * Created by wumingli on 2016/10/17.
 */
var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require('../store/ListStore');

AppDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'ADD_NEW_ITEM':
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
            break;

        case 'REMOVE_ITEM':
            ListStore.removeItemHandler(action.index);
            ListStore.emitChange();
            break;
        default:
        // no op
    }
});

module.exports = AppDispatcher;