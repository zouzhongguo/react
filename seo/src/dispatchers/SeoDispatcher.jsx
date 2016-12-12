/**
 * Created by wumingli on 2016/10/17.
 */
var Dispatcher = require('flux').Dispatcher;
let SeoDispatcher = new Dispatcher();

import AddStore from '../stores/AddStore';

SeoDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'ADD_NEW_ITEM':
            AddStore.addNewItemHandler(action.item);
            AddStore.emitChange();
            break;

        case 'REMOVE_ITEM':
            AddStore.removeItemHandler(action.index);
            AddStore.emitChange();
            break;
        default:
        // no op
    }
});

module.exports = SeoDispatcher;