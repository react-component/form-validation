/** @jsx React.DOM */

/**
 * form-validation
 */
var React = require('react');
var AsyncValidate = require('async-validator');
var Validator = require('./Validator');
var actionId = 0;

var Validation = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onValidate() {
      }
    };
  },

  getInitialState() {
    this.validators = {};
    return {};
  },

  getSchema(validator) {
    var ret = {};
    ret[validator.getName()] = validator.props.rules;
    return ret;
  },

  getFormData() {
    var ret = {};
    var validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      var validator = validators[name];
      ret[name] = {
        value: validator.getValue(),
        errors: validator.errors && validator.errors.map(function (e) {
          return e.message;
        }),
        isValidating: validator.isValidating
      };
    });
    return ret;
  },

  isValid() {
    var result = this.getFormData();
    return Object.keys(result).forEach((name)=> {
      if (result[name].isValidating || result[name].errors && result[name].errors.length) {
        return false;
      }
      return true;
    });
  },

  attachValidators(children) {
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

  handleInputChange(validator, value, fn) {
    var values = {};
    var name = validator.getName();
    values[name] = value;
    validator.errors = undefined;
    validator.isValidating = true;
    validator.dirty = true;
    var currentActionId = actionId;
    validator.actionId = currentActionId;
    actionId++;
    var result = this.getFormData();
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
        var result = self.getFormData();
        result[name].value = value;
        self.props.onValidate(result);
        if (fn) {
          fn();
        }
      }
    });
  },

  attachValidator(validator) {
    var name = validator.getName();
    this.validators[name] = validator;
  },

  detachValidator(validator) {
    delete this.validators[validator.getName()];
  },

  forceValidate(fields, callback) {
    var self = this;
    var validators = this.validators;
    var validator;
    fields = fields || Object.keys(validators);
    var count = fields.length;
    if (count === 0) {
      callback(self.isValid());
      return;
    }

    function track() {
      doing++;
      if (doing === count) {
        if (callback) {
          callback(self.isValid());
        }
      }
    }

    var doing = 0;
    fields.forEach(function (name) {
      validator = validators[name];
      self.handleInputChange(validator, validator.getValue(), track);
    });
  },

  validate(callback) {
    var self = this;
    var validators = this.validators;
    var count = 0;
    var validator;
    Object.keys(validators).forEach((name)=> {
      validator = validators[name];
      if (validator.dirty) {
        count++;
      }
    });

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
    Object.keys(validators).forEach((name)=> {
      validator = validators[name];
      if (validator.dirty) {
        this.handleInputChange(validator, validator.getValue(), track);
      }
    });
  },

  render() {
    var children = this.props.children;
    this.attachValidators(children);
    return <div>{children}</div>;
  }
});

module.exports = Validation;
