var Dispatcher = require('dispatcher'),
    Const = require('const'),
    Actions = require('actions'),

    _ = require('lodash'),
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Store = Backbone.Model.extend({
    url: 'http://baconipsum.com/api/?type=meat-and-filler',

    parse: function(data) {
        return {text: data[0]};
    },

    defaults: {
        text: 'Loading content',
        counter: 0,
        message: '',
        fields: {
            one: 'Field One',
            two: 'Field Two',
            '1': {
                id: 1,
                one: 'Nested One'
            },
            '2': {
                id: 2,
                two: 'Second Set, Nested Two'
            }
        },
        files: [
            {
                id: 1,
                name: 'File 1'
            },
            {
                id: 2,
                name: 'File 2'
            },
            {
                id: 3,
                name: 'File 3'
            },
            {
                id: 4,
                name: 'File 4'
            }
        ]
    },

    initialize: function() {
        this.fetch();
    }
});

var store = new Store();

Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case Const.COUNTER_INCREMENT:
            var count = store.get('counter') + 1;
            store.set({ counter: count });
            break;
        case Const.USER_MESSAGE:
            store.set({ message: action.message });
            alert(store.get('message'));
            break;
        case Const.GET_TEXT:
            store.set(store.defaults).fetch({cache: false});
            break;
        case Const.UPDATE_FORM:
            var v = action.event.target.value;
            var r = action.event.target.name;
            var f = _.clone(store.get('fields'));
            var s = r.split('.');

            if(s.length > 1) {
                var l = s[0], r = s[1];
                if(f[l] == null) {
                    f[l] = {};
                }
                f[l][r] = v;
            } else {
                f[r] = v;
            }
            store.set({fields: f});
            store.trigger('change:fields');
            store.isValid();
            break;
        case Const.ADD_FILE:
            var v = action.data;
            var f = _.clone(store.get('fields'));
            if(!f.files) {
                f.files = [];
            }
            f.files.push(v);
            store.set({fields: f});
            store.trigger('change:fields');
            break;
        case Const.ASSOCIATE_FILE:
            var id = action.id;
            var f = _.clone(store.get('fields'));
            if(!f.files) { f.files = []; }
            f.files = _.union(f.files, [id]);
            store.set({fields: f});
            store.trigger('change:fields');
            break;
        case Const.DISASSOCIATE_FILE:
            var id = action.id;
            var f = _.clone(store.get('fields'));
            if(!f.files) { break; }
            f.files = _.without(f.files, id);
            store.set({fields: f});
            store.trigger('change:fields');
            break;
        case Const.REMOVE_COMPONENT:
            var id = action.id;
            var f = _.clone(store.get('fields'));
            delete f[id];
            store.set({fields: f});
            store.trigger('change:fields');
            break;
        case Const.ADD_COMPONENT:
            var f = _.clone(store.get('fields'));
            var id = +new Date;
            f[id] = {id: id};
            store.set({fields: f});
        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = store;

