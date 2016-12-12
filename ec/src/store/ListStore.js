/**
 * Created by wumingli on 2016/10/17.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ListStore = assign({}, EventEmitter.prototype, {
    items: [],

    getAll() {
        return this.items;
    },

    addNewItemHandler(text) {
        this.items.push(text);
    },

    removeItemHandler(index) {
        this.items.splice(index, 1);
    },

    emitChange() {
        this.emit('change');
    },

    addChangeListener(callback) {
        this.on('change', callback);
        console.log('addChageListener.....');
    },

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
});

module.exports = ListStore;