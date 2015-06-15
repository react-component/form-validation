'use strict';

var React = require('react');
var createChainedFunction = require('rc-util').createChainedFunction;

function getValueFromEvent(e) {
  // support custom element
  return e.target ? e.target.value : e;
}

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.reset();
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSilently = this.handleChangeSilently.bind(this);
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


  handleChange(e) {
    this.props.handleInputChange(this, getValueFromEvent(e));
  }

  handleChangeSilently(e) {
    this.errors = undefined;
    this.dirty = true;
    this.isValidating = false;
    this.props.handleInputChangeSilently(this, getValueFromEvent(e));
  }

  getName() {
    return this.getInputElement().props.name;
  }

  getValue() {
    return this.getInputElement().props.value;
  }

  render() {
    var props = this.props;
    var child = this.getInputElement();
    var trigger = props.trigger;
    var triggerObj = {};
    // keep model updated
    if (trigger !== 'onChange') {
      triggerObj.onChange = createChainedFunction(child.props.onChange, this.handleChangeSilently);
    }
    triggerObj[trigger] = createChainedFunction(child.props[trigger], this.handleChange);
    return React.cloneElement(child, triggerObj);
  }

  componentDidMount() {
    this.props.attachValidator(this);
    //console.log(this.getName()+' mount');
  }

  componentDidUpdate() {
    this.props.attachValidator(this);
  }

  componentWillUnmount() {
    this.props.detachValidator(this);
    //console.log(this.getName()+' unmount');
  }
}

Validator.defaultProps = {
  trigger: 'onChange'
};

Validator.propTypes = {
  attachValidator: React.PropTypes.func,
  detachValidator: React.PropTypes.func,
  handleInputChange: React.PropTypes.func,
  trigger: React.PropTypes.string
};

module.exports = Validator;
