var Dispatcher = require('dispatcher');
var Const = require('const');

var Actions = {
    increment: function() {
        Dispatcher.handleViewAction({
            'actionType': Const.COUNTER_INCREMENT
        });
    },

    getText: function() {
        Dispatcher.handleViewAction({
            'actionType': Const.GET_TEXT
        });
    },

    userMessage: function(message) {
        Dispatcher.handleViewAction({
            'actionType': Const.USER_MESSAGE,
            'message': message
        });
    },

    updateForm: function(event) {
        Dispatcher.handleViewAction({
            'actionType': Const.UPDATE_FORM,
            'event': event 
        });
    },

    addFile: function(data) {
        Dispatcher.handleViewAction({
            'actionType': Const.ADD_FILE,
            'data': data
        });
    },
    
    associateFile: function(file_id) {
        Dispatcher.handleViewAction({
            'actionType': Const.ASSOCIATE_FILE,
            'id': file_id
        });
    },
    
    disassociateFile: function(file_id) {
        Dispatcher.handleViewAction({
            'actionType': Const.DISASSOCIATE_FILE,
            'id': file_id
        });
    },

    removeComponent: function(id) {
        Dispatcher.handleViewAction({
            'actionType': Const.REMOVE_COMPONENT,
            'id': id
        });
    },

    addComponent: function() {
        Dispatcher.handleViewAction({
            'actionType': Const.ADD_COMPONENT
        });
    }
};

module.exports = Actions;
