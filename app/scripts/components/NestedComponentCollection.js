/** @jsx React.DOM */
'use strict';

var React = require('react/addons'),
    Button = require('react-bootstrap/button'),
    Input = require('react-bootstrap/input'),
    Glyphicon = require('react-bootstrap/glyphicon'),
    Store = require('store'),
    Actions = require('actions'),
    _ = require('lodash');

var NestedComponent = React.createClass({
    getInitialState: function() {
        return this.props.value || {};
    },

    componentDidMount: function() {
        Store.listenTo(Store, 'change:fields', this._onChange);
    },

    componentWillUnmount: function() {
        Store.stopListening(Store, 'change:fields', this._onChange);
    },

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="form-group">
                    <label>Nested Field</label>
                    <input type="text" className="form-control" name={this.props.name + '.one'} value={this.state.one} onChange={this._update} />
                </div>
                <div className="form-group">
                    <label>Nested Field 2</label>
                    <input type="text" className="form-control" name={this.props.name + '.two'} value={this.state.two} onChange={this._update} />
                </div>
                <Button bsStyle="danger" onClick={this._remove}><Glyphicon glyph="minus-sign" /> Remove Component</Button>
            </div>
        );
    },
    
    _remove: function() {
        Actions.removeComponent(this.props.value.id);  
    },
    
    _update: function(event) {
        Actions.updateForm(event);
    },
    
    _onChange: function() {
        if(this.props.value) {
            this.setState(this.props.value);
        }
    }
});

var NestedComponentCollection = React.createClass({
    addComponent: function() {
        Actions.addComponent();
    },
    
    render: function() {
        var NestedComponents =
            Object.keys(this.props.components)
                .filter(function(key) {
                    if(this.props.components[key] && this.props.components[key].id) {
                        return true;
                    } else {
                        return false;
                    }
                }, this)
                .map(function(key) {
                    var comp = this.props.components[key];
                    return <NestedComponent name={comp.id} value={comp} key={comp.id} />
                }, this);
        return (
            <div>
                {NestedComponents}
                <div className="row">
                    <Button bsStyle="success" onClick={this.addComponent}><Glyphicon glyph="plus-sign" /> Add Component</Button>
                </div>
            </div>
        );
    },
});

module.exports = NestedComponentCollection;