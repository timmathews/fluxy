/** @jsx React.DOM */
'use strict';

var React = require('react/addons'),
    Button = require('react-bootstrap/button'),
    Glyphicon = require('react-bootstrap/glyphicon'),
    Input = require('react-bootstrap/input'),
    ModalTrigger = require('react-bootstrap/modaltrigger'),
    NestedComponentCollection = require('components/NestedComponentCollection'),
    SelectModal = require('components/SelectModal'),
    TestModal = require('components/TestModal'),
    _ = require('lodash');

var Header = require('components/header'),
    Footer = require('components/footer'),
    Store = require('store'),
    Actions = require('actions');

var ProductsPage = React.createClass({
    getInitialState: function() {
        return {
            fields: Store.get('fields'),
            files: Store.get('files')
        };
    },

    componentDidMount: function() {
        Store.listenTo(Store, 'change:fields', this._onChange);
        Store.listenTo(Store, 'validated:invalid', this._invalid);
    },

    componentWillUnmount: function() {
        Store.stopListening(Store, 'change:fields');
        Store.stopListening(Store, 'validated:invalid');
    },
    
    render: function() {
        var data = JSON.stringify(this.state, null, 2);
        return (
            <div>
                <Header />

                <div className="jumbotron">
                    <p className="lead">Using bootstrap components</p>
                    <ModalTrigger modal={<TestModal value={this.state.fields} name="file" />}>
                        <Button bsStyle="success">Launch demo modal</Button>
                    </ModalTrigger>
                    <ModalTrigger modal={<SelectModal value={this.state.fields.files} choices={this.state.files} name="file" />}>
                        <Button bsStyle="success">Associate Files</Button>
                    </ModalTrigger>
                    <pre style={{textAlign: 'left'}}>
                        {data}
                    </pre>
                </div>
                <div className="form-group">
                    <label>Field</label>
                    <input type="text" className="form-control" name="one" value={this.state.fields.one} onChange={this._update} />
                </div>
                <div className="form-group">
                    <label>Field 2</label>
                    <input type="text" className="form-control" name="two" value={this.state.fields.two} onChange={this._update} />
                </div>
                
                <NestedComponentCollection components={this.state.fields} />

                <p>For more information on Bootstrap components visit: <a href="http://react-bootstrap.github.io/components.html">React Bootstrap</a></p>

                <Footer />
            </div>
        );
    },
    
    _update: function(event) {
        Actions.updateForm(event);
    },
    
    _onChange: function() {
        var s = Store.toJSON();
        this.setState({fields: s.fields});
        this.setState({files: s.files});
    },
    
    _invalid: function(msg) {
        console.log(msg);
        
    }
    
});

module.exports = ProductsPage;
