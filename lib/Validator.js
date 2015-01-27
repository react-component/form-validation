/** @jsx React.DOM */

var React = require('react');
var cloneWithProps = require('./utils/cloneWithProps');

var Validator = React.createClass({
  propTypes: {
    attachValidator: React.PropTypes.func,
    detachValidator: React.PropTypes.func,
    handleInputChange: React.PropTypes.func
  },

  handleChange: function (e) {
    // support custom element
    var value = e.target ? e.target.value : e;
    this.props.handleInputChange(this, value);
  },

  getName: function () {
    return this.refs.input.props.name;
  },

  getValue: function () {
    return this.refs.input.props.value;
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
    this.props.attachValidator(this);
  },

  componentDidUpdate: function () {
    this.componentDidMount();
  },

  componentWillUnmount: function () {
    this.props.detachValidator(this);
  }
});

module.exports = Validator;
