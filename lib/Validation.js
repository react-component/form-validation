/** @jsx React.DOM */

/**
 * form-validation
 */
var React = require('react');
var AsyncValidate = require('./async-validate/');
var Validator = require('./Validator');

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
      var schema = {};
      var propTypes = Validator.propTypes;
      var props = validator.props;
      for (var p in props) {
        if (!(p in propTypes) && p !== 'func') {
          schema[p] = validator.props[p];
        }
      }
      var func;
      if ((func = props.func)) {
        ret[validator.getName()] = [schema, func];
      } else {
        ret[validator.getName()] = schema;
      }
    } else {
      for (var v in this.validators) {
        this.getSchema(this.validators[v], ret);
      }
    }
    return ret;
  },

  getResult: function () {
    var ret = {};
    var validators = this.validators;
    for (var name in validators) {
      var validator = validators[name];
      ret[name] = {
        value: validator.getValue(),
        errors: validator.errors && validator.errors.map(function (e) {
          return e.message;
        }),
        isValidating: validator.isValidating
      };
    }
    return ret;
  },

  isValid: function () {
    var result = this.getResult();
    for (var name in result) {
      if (result.isValidating || result[name].errors && result[name].errors.length) {
        return false;
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
    var originalValue = validator.getValue();
    values[name] = value;
    validator.errors = undefined;
    validator.isValidating = true;
    var result = this.getResult();
    result[name].value = value;
    this.props.onValidate(result);
    var self = this;
    new AsyncValidate(this.getSchema(validator)).validate(values, function (errors) {
      var validators = self.validators;
      var nowValidator = validators[name];
      if (nowValidator && (nowValidator.getValue() === value || nowValidator.getValue() === originalValue)) {
        validator.errors = errors;
        validator.isValidating = false;
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
    for (var name in validators) {
      count++;
    }
    function track() {
      doing++;
      if (doing === count) {
        callback(self.isValid());
      }
    }

    var doing = 0;
    for (name in validators) {
      var validator = validators[name];
      this.handleInputChange(validator, validator.getValue(), track);
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
