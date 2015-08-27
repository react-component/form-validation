

import React from 'react';
import {createChainedFunction} from 'rc-util';

function getValueFromEvent(e) {
  // support custom element
  return e.target ? e.target.value : e;
}

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.reset();
    this.onChange = this.onChange.bind(this);
    this.onChangeSilently = this.onChangeSilently.bind(this);
  }

  reset() {
    this.errors = undefined;
    this.dirty = true;
    this.isValidating = false;
    // in case component is unmount and remount
    this.actionId = -1;
  }

  getInputElement() {
    return React.Children.only(this.props.children);
  }


  onChange(e) {
    this.props.onInputChange(this, getValueFromEvent(e));
  }

  onChangeSilently(e) {
    // keep last error
    this.dirty = true;
    this.isValidating = false;
    this.props.onInputChangeSilently(this, getValueFromEvent(e));
  }

  getName() {
    return this.getInputElement().props.name;
  }

  getValue() {
    return this.getInputElement().props.value;
  }

  render() {
    const props = this.props;
    const child = this.getInputElement();
    const trigger = props.trigger;
    const triggerObj = {};
    // keep model updated
    if (trigger !== 'onChange') {
      triggerObj.onChange = createChainedFunction(child.props.onChange, this.onChangeSilently);
    }
    triggerObj[trigger] = createChainedFunction(child.props[trigger], this.onChange);
    return React.cloneElement(child, triggerObj);
  }

  componentDidMount() {
    this.props.attachValidator(this);
  }

  componentDidUpdate() {
    this.props.attachValidator(this);
  }

  componentWillUnmount() {
    this.props.detachValidator(this);
  }
}

Validator.defaultProps = {
  trigger: 'onChange',
};

Validator.propTypes = {
  attachValidator: React.PropTypes.func,
  detachValidator: React.PropTypes.func,
  onInputChange: React.PropTypes.func,
  onInputChangeSilently: React.PropTypes.func,
  trigger: React.PropTypes.string,
};

export default Validator;
