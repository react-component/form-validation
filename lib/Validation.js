/** @jsx React.DOM */

var React = require('react');
var AsyncValidate = require('async-validator');
var Validator = require('./Validator');
var actionId = 0;

class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.validators = {};
    ['attachValidator', 'detachValidator', 'handleInputChange'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  getSchema(validator) {
    var ret = {};
    var rules = validator.props.rules;
    if (!Array.isArray(rules)) {
      rules = [rules];
    }
    rules.forEach((r)=> {
      if (!r.validator) {
        r.type = r.type || 'string';// default string type for form field
      }
    });
    ret[validator.getName()] = rules;
    return ret;
  }

  getValidateResult() {
    var formData = {};
    var status = {};
    var validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      var validator = validators[name];
      var errors = validator.errors && validator.errors.map((e)=> {
          return e.message;
        });
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
      return React.Children.map(children, (child)=> {
        if (child) {
          if (child.type === Validator) {
            return React.cloneElement(child, {
              attachValidator: self.attachValidator,
              detachValidator: self.detachValidator,
              handleInputChange: self.handleInputChange
            });
          } else if (child.props && child.props.children) {
            return React.cloneElement(child, {}, self.attachValidators(child.props.children));
          }
        }
        return child;
      });
    }
    return children;
  }

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
    var result = this.getValidateResult();
    result.formData[name] = value;
    this.props.onValidate(result.status, result.formData);
    var self = this;
    new AsyncValidate(this.getSchema(validator)).validate(values, (errors)=> {
      var validators = self.validators;
      // in case component is unmount and remount
      var nowValidator = validators[name];
      // prevent concurrency call
      if (nowValidator && nowValidator.actionId === currentActionId) {
        validator.errors = errors;
        validator.isValidating = false;
        validator.dirty = false;
        var result = self.getValidateResult();
        result.formData[name] = value;
        self.props.onValidate(result.status, result.formData);
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
    fields.forEach((name)=> {
      validator = validators[name];
      self.handleInputChange(validator, validator.getValue(), track);
    });
  }

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
