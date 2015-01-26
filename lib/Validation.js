/** @jsx React.DOM */

/**
 * form-validation
 */
var React = require('react');
var revalidator = require('revalidator');
var Validator = require('./Validator');

function transformValidationResult(result) {
  var errorsMap = {};
  var errors = result.errors;
  errors.forEach(function (e) {
    errorsMap[e.property] = e;
  });
  result.errorsMap = errorsMap;
  return result;
}

var Validation = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onValidate: function () {
      }
    };
  },

  getInitialState: function () {
    this.inputs = {};
    this.values = {};
    this.schema = {};
    this.result = {
      valid: true,
      errors: [],
      errorsMap: {}
    };
    return {};
  },

  getValues: function () {
    return this.values;
  },

  getResult: function () {
    return this.result;
  },

  attachValidators: function (children) {
    var self = this;
    if (children) {
      React.Children.forEach(children, function (child) {
        if (child) {
          if (child.type === Validator.type) {
            child.props.attachComponent = self.attachComponent;
            child.props.detachComponent = self.detachComponent;
            child.props.handleComponentChange = self.handleComponentChange;
          } else if (child.props) {
            self.attachValidators(child.props.children);
          }
        }
      });
    }
  },

  handleComponentChange: function (input, value) {
    this.values[input.props.name] = value;
    this.revalidator();
  },

  revalidator: function () {
    this.result = transformValidationResult(revalidator.validate(this.values, {
      properties: this.schema
    }));
    this.result.values = this.values;
    this.props.onValidate(this.result);
  },

  attachComponent: function (input, validator) {
    var name = input.props.name;
    this.inputs[name] = input;
    var propTypes = Validator.propTypes;
    var schema = {};
    for (var p in validator.props) {
      if (!(p in propTypes)) {
        schema[p] = validator.props[p];
      }
    }
    this.schema[name] = schema;
  },

  detachComponent: function (input) {
    delete this.inputs[input.props.name];
    delete this.values[input.props.name];
  },

  validate: function () {
    var inputs = this.inputs;
    var values = this.values;
    var input;
    for (var name in inputs) {
      input = inputs[name];
      values[name] = input.props.value;
    }
    this.revalidator();
  },

  render: function () {
    var children = this.props.children;
    this.attachValidators(children);
    return <div>{children}</div>;
  }
});

module.exports = Validation;
