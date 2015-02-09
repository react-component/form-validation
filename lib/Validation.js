/** @jsx React.DOM */

/**
 * form-validation
 */
var React = require('react');
var AsyncValidate = require('./async-validate/');
var Validator = require('./Validator');
var actionId = 0;

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
    this.validators = {};
    return {};
  },

  getSchema: function (validator, ret) {
    ret = ret || {};
    if (validator) {
      ret[validator.getName()] = validator.props.rules;
    } else {
      var validators = this.validators;
      for (var v in validators) {
        if (validators.hasOwnProperty(v)) {
          this.getSchema(validators[v], ret);
        }
      }
    }
    return ret;
  },

  getResult: function () {
    var ret = {};
    var validators = this.validators;
    for (var name in validators) {
      if (validators.hasOwnProperty(name)) {
        var validator = validators[name];
        ret[name] = {
          value: validator.getValue(),
          errors: validator.errors && validator.errors.map(function (e) {
            return e.message;
          }),
          isValidating: validator.isValidating
        };
      }
    }
    return ret;
  },

  isValid: function () {
    var result = this.getResult();
    for (var name in result) {
      if (result.hasOwnProperty(name)) {
        if (result[name].isValidating || result[name].errors && result[name].errors.length) {
          return false;
        }
      }
    }
    return true;
  },

  attachValidators: function (children) {
    var self = this;
    if (children) {
      React.Children.forEach(children, function (child) {
        if (child) {
          if (child.type === Validator.type) {
            child.props.attachValidator = self.attachValidator;
            child.props.detachValidator = self.detachValidator;
            child.props.handleInputChange = self.handleInputChange;
          } else if (child.props) {
            self.attachValidators(child.props.children);
          }
        }
      });
    }
  },

  handleInputChange: function (validator, value, fn) {
    var values = {};
    var name = validator.getName();
    values[name] = value;
    validator.errors = undefined;
    validator.isValidating = true;
    validator.dirty = true;
    var currentActionId = actionId;
    validator.actionId = currentActionId;
    actionId++;
    var result = this.getResult();
    result[name].value = value;
    this.props.onValidate(result);
    var self = this;
    new AsyncValidate(this.getSchema(validator)).validate(values, function (errors) {
      var validators = self.validators;
      // in case component is unmount and remount
      var nowValidator = validators[name];
      // prevent concurrency call
      if (nowValidator && nowValidator.actionId === currentActionId) {
        validator.errors = errors;
        validator.isValidating = false;
        validator.dirty = false;
        var result = self.getResult();
        result[name].value = value;
        self.props.onValidate(result);
        if (fn) {
          fn();
        }
      }
    });
  },

  attachValidator: function (validator) {
    var name = validator.getName();
    this.validators[name] = validator;
  },

  detachValidator: function (validator) {
    delete this.validators[validator.getName()];
  },

  validate: function (callback) {
    var self = this;
    var validators = this.validators;
    var count = 0;
    var validator;
    for (var name in validators) {
      if (validators.hasOwnProperty(name)) {
        validator = validators[name];
        if (validator.dirty) {
          count++;
        }
      }
    }

    if (count === 0) {
      callback(self.isValid());
      return;
    }

    function track() {
      doing++;
      if (doing === count) {
        callback(self.isValid());
      }
    }

    var doing = 0;
    for (name in validators) {
      if (validators.hasOwnProperty(name)) {
        validator = validators[name];
        if (validator.dirty) {
          this.handleInputChange(validator, validator.getValue(), track);
        }
      }
    }
  },

  render: function () {
    var children = this.props.children;
    this.attachValidators(children);
    return <div>{children}</div>;
  }
});

Validation.rules = AsyncValidate.rules;

module.exports = Validation;
