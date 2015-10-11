import React from 'react';
import {createChainedFunction} from 'rc-util';

function getValueFromEvent(e) {
  // support custom element
  return e.target ? e.target.value : e;
}

function hasPlaceholder(child) {
  return child.type === 'input' && !!child.props.placeholder;
}

function ieGT9() {
  if (typeof document === undefined) {
    return false;
  }
  const documentMode = document.documentMode || 0;
  return documentMode > 9;
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
    const extraProps = {};
    // keep model updated
    if (trigger !== 'onChange') {
      extraProps.onChange = createChainedFunction(child.props.onChange, this.onChangeSilently);
    }
    extraProps[trigger] = createChainedFunction(child.props[trigger], this.onChange);
    if (hasPlaceholder(child) && ieGT9()) {
      // https://github.com/react-component/form-validation/issues/13
      extraProps.placeholder = undefined;
    }
    return React.cloneElement(child, extraProps);
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
