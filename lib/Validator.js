/** @jsx React.DOM */

var React = require('react');
var cloneWithProps = require('rc-util').cloneWithProps;

var Validator = React.createClass({
  propTypes: {
    attachValidator: React.PropTypes.func,
    detachValidator: React.PropTypes.func,
    handleInputChange: React.PropTypes.func
  },

  getInitialState() {
    this.errors = undefined;
    this.dirty = true;
    this.isValidating = false;
    // in case component is unmount and remount
    this.actionId = -1;
    return {};
  },

  handleChange(e) {
    // support custom element
    var value = e.target ? e.target.value : e;
    this.props.handleInputChange(this, value);
  },

  getName() {
    return this.refs.input.props.name;
  },

  getValue() {
    return this.refs.input.props.value;
  },

  render() {
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

  componentDidMount() {
    this.props.attachValidator(this);
    //console.log(this.getName()+' mount');
  },

  componentDidUpdate() {
    this.props.attachValidator(this);
  },

  componentWillUnmount() {
    this.props.detachValidator(this);
    //console.log(this.getName()+' unmount');
  }
});

module.exports = Validator;
