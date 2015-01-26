/** @jsx React.DOM */

var React = require('react');
var cloneWithProps = require('./utils/cloneWithProps');

var Validator = React.createClass({
  propTypes: {
    attachComponent: React.PropTypes.func,
    detachComponent: React.PropTypes.func,
    handleComponentChange: React.PropTypes.func
  },

  handleChange: function (e) {
    // support custom element
    var value = e.target ? e.target.value : e;
    this.props.handleComponentChange(this.refs.input, value);
  },

  render: function () {
    var child;
    React.Children.forEach(this.props.children, function (c) {
      if (c) {
        child = c;
      }
    });
    return cloneWithProps(child, {
      ref: 'input',
      value: child.props.value || '',
      onChange: this.handleChange
    });
  },

  componentDidMount: function () {
    this.props.attachComponent(this.refs.input, this);
  },

  componentDidUpdate: function () {
    this.componentDidMount();
  },

  componentWillUnmount: function () {
    this.props.detachComponent(this.refs.input);
  }
});

module.exports = Validator;
