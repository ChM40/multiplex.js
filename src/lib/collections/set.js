import Collection from './collection';
import HashTable, {HashTableIterator} from './hash-table';
import iteratorSymbol from '../iteration/iterator-symbol';
import forOf from '../utils/for-of';
import extend from '../utils/extend';
import mixin from '../utils/mixin';

export default function Set(iterable) {
    var table = new HashTable();

    if (iterable !== null) {
        forOf(iterable, function (element) {
            table.add(element, element);
        });
    }

    this.table = table;
    this.size = this.table.count();
}

extend(Set, Collection);

mixin(Set.prototype, {
    add: function (value) {
        this.table.add(value, value);
        this.size = this.table.count();
        return this;
    },

    clear: function () {
        this.table.clear();
        this.size = 0;
    },

    delete: function (value) {
        var result = this.table.remove(value);
        this.size = this.table.count();
        return result ? value : false;
    },

    entries: function () {
        return new SetIterator(this, -1);
    },

    forEach: function (callback, thisArg) {
        this.table.forEach(callback, this, thisArg);
    },

    has: function (value) {
        return this.table.contains(value);
    },

    keys: function () {
        return new SetIterator(this, 0);
    },

    values: function () {
        return new SetIterator(this, 1);
    },

    valueOf: function () {
        return this.table.keys();
    },

    toString: function () {
        return '[Set]';
    }
});

extend(Set, Collection);

Set.prototype[iteratorSymbol] = function () {
    return new SetIterator(this, 0);
};


// type 0: key, 1: value, -1: [key, value]
function SetIterator(set, type) {
    HashTableIterator.call(this, set, type);
}

extend(SetIterator, HashTableIterator);

mixin(SetIterator.prototype, {
    toString: function () {
        return '[Set Iterator]';
    }
});
