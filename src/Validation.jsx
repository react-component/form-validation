'use strict';

var React = require('react');
var AsyncValidate = require('async-validator');
var Validator = require('./Validator');
var actionId = 0;
var assign = require('object-assign');
var textInputTypes = ['text', 'password'];

class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.validators = {};
    ['attachValidator', 'detachValidator', 'handleInputChange', 'handleInputChangeSilently'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  getSchema(validator) {
    var ret = {};
    var rules = validator.props.rules;
    if (Array.isArray(rules)) {
      rules = rules.concat();
    } else {
      rules = [rules];
    }
    ret[validator.getName()] = rules;
    return ret;
  }

  getValidateResult() {
    var formData = {};
    var status = {};
    var validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      var validator = validators[name];
      var errors;
      if (validator.errors) {
        errors = validator.errors.map((e)=> {
          return e.message;
        });
      }
      if (errors && errors.length === 0) {
        errors = null;
      }
      status[name] = {
        errors: errors,
        isValidating: validator.isValidating
      };
      formData[name] = validator.getValue();
    });
    return {
      formData: formData,
      status: status
    };
  }

  isValid() {
    var result = this.getValidateResult().status;
    return Object.keys(result).every((name)=> {
      if (result[name].isValidating || result[name].errors) {
        return false;
      }
      return true;
    });
  }

  attachValidators(children) {
    var self = this;
    if (children) {
      // refer: React traverseAllChildrenImpl
      // bug fix for react 0.13 @2015.07.02
      // option should not have non-text children
      // <option>11</option>
      // React.Children.map(option.props.children,function(c){return c}) => {'.0':'11'}
      var type = typeof children;
      if (type === 'boolean') {
        return children;
      }
      if (type === 'string' || type === 'number') {
        return children;
      }
      var childrenArray = [];
      var ret = React.Children.map(children, (child)=> {
        if (React.isValidElement(child)) {
          if (child.type === Validator) {
            child = React.cloneElement(child, {
              attachValidator: self.attachValidator,
              detachValidator: self.detachValidator,
              handleInputChange: self.handleInputChange,
              handleInputChangeSilently: self.handleInputChangeSilently
            });
          } else if (child.props) {
            child = React.cloneElement(child, {}, self.attachValidators(child.props.children));
          }
        }
        childrenArray.push(child);
        return child;
      });
      // if only one child, then flatten
      if (childrenArray.length === 1) {
        return childrenArray[0];
      }
      return ret;
    }
    return children;
  }

  handleInputChangeSilently(validator, value) {
    var r = this.getValidateResult();
    r.formData[validator.getName()] = value;
    this.props.onValidate(r.status, r.formData);
  }

  handleInputChange(validator, value, fn) {
    var inputElement = validator.getInputElement();
    var isTextField = inputElement.type === 'input' &&
      (!inputElement.props.type || textInputTypes.indexOf(inputElement.props.type) !== -1);
    if (isTextField && value === '') {
      value = undefined;
    }
    var name = validator.getName();
    var schema = this.getSchema(validator);
    var rules = schema[name];
    rules.forEach(function (rule, index) {
      if (rule.transform) {
        value = rule.transform(value);
        var newRule = assign({}, rule);
        newRule.transform = null;
        rules[index] = newRule;
      }
    });
    var values = {};
    values[name] = value;
    validator.errors = undefined;
    validator.isValidating = true;
    validator.dirty = true;
    var currentActionId = actionId;
    validator.actionId = currentActionId;
    actionId++;
    var result = this.getValidateResult();
    result.formData[name] = value;
    this.props.onValidate(result.status, result.formData);
    var self = this;
    new AsyncValidate(schema).validate(values, (errors)=> {
      var validators = self.validators;
      // in case component is unmount and remount
      var nowValidator = validators[name];
      // prevent concurrency call
      if (nowValidator && nowValidator.actionId === currentActionId) {
        validator.errors = errors;
        validator.isValidating = false;
        validator.dirty = false;
        var r = self.getValidateResult();
        r.formData[name] = value;
        self.props.onValidate(r.status, r.formData);
        if (fn) {
          fn();
        }
      }
    });
  }

  attachValidator(validator) {
    var name = validator.getName();
    this.validators[name] = validator;
  }

  detachValidator(validator) {
    delete this.validators[validator.getName()];
  }

  forceValidate(fields, callback) {
    // must async to allow state sync
    setTimeout(()=> {
      var self = this;
      var validators = this.validators;
      var validator;
      var doing = 0;

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

      fields.forEach((name)=> {
        validator = validators[name];
        self.handleInputChange(validator, validator.getValue(), track);
      });
    }, 0);
  }

  validate(callback) {
    var self = this;
    var validators = this.validators;
    var count = 0;
    var validator;
    var doing = 0;

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

    Object.keys(validators).forEach((name)=> {
      validator = validators[name];
      if (validator.dirty) {
        this.handleInputChange(validator, validator.getValue(), track);
      }
    });
  }

  reset() {
    var validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      validators[name].reset();
    });
  }

  render() {
    return <div className={this.props.className}>{this.attachValidators(this.props.children)}</div>;
  }
}

Validation.propTypes = {
  onChange: React.PropTypes.func
};

Validation.defaultProps = {
  onValidate() {
  }
};

Validation.Validator = Validator;

Validation.FieldMixin = require('./FieldMixin');

module.exports = Validation;
