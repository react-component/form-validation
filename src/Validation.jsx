

import React from 'react';
import AsyncValidate from 'async-validator';
import Validator from './Validator';
import assign from 'object-assign';

let actionId = 0;

class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.validators = {};
    ['attachValidator', 'detachValidator', 'onInputChange', 'onInputChangeSilently'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  onInputChangeSilently(validator, value) {
    const r = this.getValidateResult();
    r.formData[validator.getName()] = value;
    this.props.onValidate(r.status, r.formData);
  }

  onInputChange(validator, v, fn) {
    let value = v;
    const name = validator.getName();
    const schema = this.getSchema(validator);
    const rules = schema[name];
    rules.forEach((rule, index) => {
      if (rule.transform) {
        value = rule.transform(value);
        const newRule = assign({}, rule);
        newRule.transform = null;
        rules[index] = newRule;
      }
    });
    const values = {};
    values[name] = value;
    validator.errors = undefined;
    validator.isValidating = true;
    validator.dirty = true;
    const currentActionId = actionId;
    validator.actionId = currentActionId;
    actionId++;
    const result = this.getValidateResult();
    result.formData[name] = value;
    this.props.onValidate(result.status, result.formData);
    const self = this;
    new AsyncValidate(schema).validate(values, (errors)=> {
      const validators = self.validators;
      // in case component is unmount and remount
      const nowValidator = validators[name];
      // prevent concurrency call
      if (nowValidator && nowValidator.actionId === currentActionId) {
        validator.errors = errors;
        validator.isValidating = false;
        validator.dirty = false;
        const r = self.getValidateResult();
        r.formData[name] = value;
        self.props.onValidate(r.status, r.formData);
        if (fn) {
          fn();
        }
      }
    });
  }

  getSchema(validator) {
    const ret = {};
    let rules = validator.props.rules;
    if (Array.isArray(rules)) {
      rules = rules.concat();
    } else {
      rules = [rules];
    }
    ret[validator.getName()] = rules;
    return ret;
  }

  getValidateResult() {
    const formData = {};
    const status = {};
    const validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      const validator = validators[name];
      let errors;
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
        isValidating: validator.isValidating,
      };
      formData[name] = validator.getValue();
    });
    return {
      formData: formData,
      status: status,
    };
  }

  isValid() {
    const result = this.getValidateResult().status;
    return Object.keys(result).every((name)=> {
      if (result[name].isValidating || result[name].errors) {
        return false;
      }
      return true;
    });
  }

  attachValidators(children) {
    const self = this;
    if (children) {
      // refer: React traverseAllChildrenImpl
      // bug fix for react 0.13 @2015.07.02
      // option should not have non-text children
      // <option>11</option>
      // React.Children.map(option.props.children,function(c){return c}) => {'.0':'11'}
      const type = typeof children;
      if (type === 'boolean') {
        return children;
      }
      if (type === 'string' || type === 'number') {
        return children;
      }
      const childrenArray = [];
      const ret = React.Children.map(children, (c)=> {
        let child = c;
        if (React.isValidElement(child)) {
          if (child.type === Validator) {
            child = React.cloneElement(child, {
              attachValidator: self.attachValidator,
              detachValidator: self.detachValidator,
              onInputChange: self.onInputChange,
              onInputChangeSilently: self.onInputChangeSilently,
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

  attachValidator(validator) {
    const name = validator.getName();
    this.validators[name] = validator;
  }

  detachValidator(validator) {
    delete this.validators[validator.getName()];
  }

  forceValidate(fs, callback) {
    let fields = fs;
    // must async to allow state sync
    setTimeout(()=> {
      const self = this;
      const validators = this.validators;
      let validator;
      let doing = 0;

      fields = fields || Object.keys(validators);
      const count = fields.length;
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
        self.onInputChange(validator, validator.getValue(), track);
      });
    }, 0);
  }

  validate(callback) {
    const self = this;
    const validators = this.validators;
    let count = 0;
    let validator;
    let doing = 0;

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
        this.onInputChange(validator, validator.getValue(), track);
      }
    });
  }

  reset() {
    const validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      validators[name].reset();
    });
  }

  render() {
    return <div className={this.props.className}>{this.attachValidators(this.props.children)}</div>;
  }
}

Validation.propTypes = {
  onChange: React.PropTypes.func,
  onValidate: React.PropTypes.func,
  className: React.PropTypes.string,
  children: React.PropTypes.any,
};

Validation.defaultProps = {
  onValidate() {
  },
};

Validation.Validator = Validator;

import FieldMixin from './FieldMixin';

Validation.FieldMixin = FieldMixin;

export default Validation;
