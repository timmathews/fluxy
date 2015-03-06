/** @jsx React.DOM */
'use strict';

var React = require('react/addons'),
    Modal = require('react-bootstrap/modal'),
    Button = require('react-bootstrap/button'),
    Actions = require('actions');

var TestModal = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
        return this.props.value.file || {};
    },

    render: function() {
        return (
            <Modal {...this.props} title="Modal heading" animation={false}>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Form Field</label>
                        <input type="text" className="form-control" valueLink={this.linkState('name')} />
                    </div>
                    <div className="form-group">
                        <label>File Upload</label>
                        <input type="file" multiple="multiple" ref='file' />
                    </div>
                </div>
                <div className="modal-footer">
                    <Button onClick={this._update}>Save</Button>
                </div>
            </Modal>
        );
    },
    
    _update: function() {
        var files = this.refs.file.getDOMNode().files;
        var fset = [];

        for(var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            reader.onload = (function(file) {
                return function(e) {
                    Actions.addFile({
                        name: escape(file.name),
                        data: e.target.result
                    });
                }
            })(f);
            reader.readAsDataURL(f);
        };
        
        Actions.updateForm({
            target: {
                name: 'file',
                value: this.state.name
            }
        });
        
        this.props.onRequestHide();
    }
});

module.exports = TestModal;