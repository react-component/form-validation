'use strict';

var Validation = require('../');
var Validator = Validation.Validator;
var expect = require('expect.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

function getInnerText(node) {
  return node.textContent || node.innerText;
}

describe('validation works', () => {
  var div = document.createElement('div');
  document.body.appendChild(div);

  var validateInput = (rule, value, callback)=> {
    if (value === '1111') {
      callback('junk');
    } else {
      callback();
    }
  };

  var Form = React.createClass({
    getInitialState() {
      return {
        formData: {
          name: '',
          pass: ''
        },
        status: {
          name: {},
          pass: {}
        }
      }
    },

    onValidate(status, formData) {
      this.setState({
        formData: formData,
        status: status
      });
    },

    onInputChange() {
    },

    render() {
      var state = this.state;
      return <Validation ref='validation' onValidate={this.onValidate}>
        <Validator ref='validator' rules={[{
          type: 'string',
          min: 5,
          max: 10,
          required: true
        }, {validator: validateInput}]}>
          <input name="name" value={state.formData.name} ref="input" onChange={this.onInputChange}/>
        </Validator>
        <Validator rules={[{type: 'string', required: true}]}>
          <input name="pass" value={state.formData.pass}/>
        </Validator>
      {state.status.name.errors ? <div ref='error'>{state.status.name.errors.join(',')}</div> : null}
        {state.status.pass.errors ? <div ref='error2'>{state.status.pass.errors.join(',')}</div> : null}
      </Validation>;
    }

  });

  var form;

  beforeEach(()=> {
    form = React.render(<Form/>, div);
  });

  afterEach(()=> {
    React.unmountComponentAtNode(div);
  });

  it('initial error is not shown', ()=> {
    expect(form.refs.error).to.be(undefined);
  });

  it('onValidate works', ()=> {
    var nativeInput = React.findDOMNode(form.refs.input);
    Simulate.change(nativeInput);
    expect(getInnerText(React.findDOMNode(form.refs.error))).to.be('name is required');
    nativeInput.value = '1111';
    Simulate.change(nativeInput);
    expect(getInnerText(React.findDOMNode(form.refs.error))).to.be('name must be between 5 and 10 characters,junk');
    nativeInput.value = '11111';
    Simulate.change(nativeInput);
    expect(form.refs.error).to.be(undefined);
  });

  it('validate method works', (done)=> {
    var nativeInput = React.findDOMNode(form.refs.input);
    nativeInput.value = 1;
    Simulate.change(nativeInput);
    form.refs.validation.validate(()=> {
      expect(getInnerText(React.findDOMNode(form.refs.error))).to.be('name must be between 5 and 10 characters');
      expect(getInnerText(React.findDOMNode(form.refs.error2))).to.be('pass is required');
      done();
    });
  });

  it('forceValidate works', (done)=> {
    var nativeInput = React.findDOMNode(form.refs.input);
    nativeInput.value = 1;
    Simulate.change(nativeInput);
    form.refs.validation.forceValidate(['name'], ()=> {
      expect(getInnerText(React.findDOMNode(form.refs.error))).to.be('name must be between 5 and 10 characters');
      expect(form.refs.error2).to.be(undefined);
      done();
    });
  });
});
