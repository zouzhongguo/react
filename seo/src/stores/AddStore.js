/**
 * Created by wumingli on 2016/10/17.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AddStore = assign({}, EventEmitter.prototype, {
    items: [],

    getAll() {
        return this.items;
    },

    setAll(items) {
        this.items = items;
    },

    addNewItemHandler(item) {
        this.items.push(item);
    },

    removeItemHandler(index) {
        this.items.splice(index, 1);
    },

    updateItemHandler(item) {
        let tempItems = this.getAll();
        tempItems.filter((subItem) => {
            if (item === subItem) {
                subItem[type] = e.target.value.trim();
            }
        });

        this.setAll(tempItems);
        console.log('chufa');
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
let AddSubItemStore = assign({}, EventEmitter.prototype, {
    items: [],
    getAll() {
        return this.items;
    }
});

//module.exports = AddStore;
exports.AddStore = AddStore;
exports.AddSubItemStore = AddSubItemStore;