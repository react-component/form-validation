/** @jsx React.DOM */

var React = require('react');
var createChainedFunction = require('rc-util').createChainedFunction;

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.reset();
    this.handleChange = this.handleChange.bind(this);
  }

  reset() {
    this.errors = undefined;
    this.dirty = true;
    this.isValidating = false;
    // in case component is unmount and remount
    this.actionId = -1;
  }

  handleChange(e) {
    // support custom element
    var value = e.target ? e.target.value : e;
    this.props.handleInputChange(this, value);
  }

  getName() {
    return React.Children.only(this.props.children).props.name;
  }

  getValue() {
    return React.Children.only(this.props.children).props.value;
  }

  render() {
    var props = this.props;
    var child = React.Children.only(props.children);
    var trigger = props.trigger;
    var triggerObj = {};
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
