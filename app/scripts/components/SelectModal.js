/** @jsx React.DOM */
'use strict';

var React = require('react/addons'),
    Modal = require('react-bootstrap/modal'),
    Button = require('react-bootstrap/button'),
    Input = require('react-bootstrap/input'),
    Glyphicon = require('react-bootstrap/glyphicon'),
    Actions = require('actions'),
    _ = require('lodash');

var FileCheckBox = React.createClass({
    getInitialState: function() {
        return {
            isChecked: this.props.isChecked
        };
    },

    render: function() {
        if(this.state.isChecked) {
            return (
                <Input
                    type="checkbox"
                    label={this.props.label}
                    value={this.state.isChecked}
                    checked
                    ref="input"
                    onChange={this._onChange} />
            );
        }
        return (
            <Input
                type="checkbox"
                label={this.props.label}
                value={this.state.isChecked}
                ref="input"
                onChange={this._onChange} />
        );
    },

    _onChange: function() {
        var v = !this.state.isChecked;
        this.setState({isChecked: v});
        this.props.onChange({id: this.props.id, isChecked: v});
    }
});

var SelectModal = React.createClass({
    getInitialState: function() {
        console.log('getInitialState', this.props.value);
        if(this.props.value) {
            return {files: this.props.value}
        }

        return {files: []};
    },
    
    renderCheckBoxes: function() {
        var ret =
        this.props.choices.map(function(file, key) {
            var idx = _.indexOf(this.state.files, file.id);
            var checked = false;
            if(idx != -1) {
                checked = true;
            }
            
            return(
                <li><FileCheckBox label={file.name} id={file.id} onChange={this._update} isChecked={checked} /></li>
            );
            
        }, this);
        
        return ret;
    },

    render: function() {
        return (
            <Modal {...this.props} title="Associate Files" animation={true}>
                <div className="modal-body">
                    <ul>
                    {this.renderCheckBoxes()}
                    </ul>
                </div>
                <div className="modal-footer">
                    <Button onClick={this._save}>Save</Button>
                </div>
            </Modal>
        );
    },
    
    _update: function(evt) {
        var files = {};
        for(var i in this.state.files) {
            var f = this.state.files[i];
            console.log(f);
            files[f.id] = f;
        };
        
        files[evt.id] = evt;
        files = _.values(files);
        this.setState({files: files});
    },
    
    _save: function() {
        for(var i in this.state.files) {
            var f = this.state.files[i];
            if(f.isChecked) {
                Actions.associateFile(f.id);
            } else {
                Actions.disassociateFile(f.id);
            }
        }
        this.props.onRequestHide();
    }
});

module.exports = SelectModal;