const Validation = require('../');
const Validator = Validation.Validator;
const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Simulate = TestUtils.Simulate;

function getInnerText(node) {
  return node.textContent || node.innerText;
}

function toNumber(v) {
  let num = Number(v);
  // num === ' '
  if (!isNaN(num)) {
    num = parseInt(v, 10);
  }
  return isNaN(num) ? v : num;
}

describe('validation', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const div2 = document.createElement('div');
  document.body.appendChild(div);

  const validateInput = (rule, value, callback)=> {
    if (value === '1111') {
      callback('junk');
    } else {
      callback();
    }
  };

  const Form = React.createClass({
    getInitialState() {
      return {
        formData: {
          name: '',
          blurNumber: '',
          pass: '',
        },
        status: {
          name: {},
          blurNumber: {},
          pass: {},
        },
      };
    },

    onValidate(status, formData) {
      this.setState({
        formData: formData,
        status: status,
      });
    },

    onInputChange() {
    },

    render() {
      const state = this.state;
      return (<Validation ref="validation" onValidate={this.onValidate}>
        <Validator ref="validator" rules={[{
          type: 'string',
          min: 5,
          max: 10,
          required: true,
        }, {validator: validateInput}]}>
          <input name="name" value={state.formData.name} ref="input" onChange={this.onInputChange}/>
        </Validator>
        <Validator rules={[{type: 'string', required: true}]}>
          <input name="pass" value={state.formData.pass}/>
        </Validator>
        <select>
          <option ref="option">1</option>
        </select>
        <Validator trigger="onBlur" rules={[{type: 'number', transform: toNumber}]}>
          <input name="blurNumber" value={state.formData.blurNumber} ref="blurInput" />
        </Validator>
        {state.status.name.errors ? <div ref="error">{state.status.name.errors.join(',')}</div> : null}
        {state.status.pass.errors ? <div ref="error2">{state.status.pass.errors.join(',')}</div> : null}
        {state.status.blurNumber.errors ? <div ref="error3">{state.status.blurNumber.errors.join(',')}</div> : null}
      </Validation>);
    },
  });

  let form;

  beforeEach(()=> {
    form = ReactDOM.render(<Form/>, div);
  });

  afterEach(()=> {
    ReactDOM.unmountComponentAtNode(div);
    ReactDOM.unmountComponentAtNode(div2);
  });

  it('can contain CustomComponent', function() {
    const CustomComponent = React.createClass({
      render() {
        const props = this.props;
        return props.children;
      },
    });

    ReactDOM.render(<Validation>
      <input />
      <p>
        <input />
      </p>
      <CustomComponent>
        <input />
      </CustomComponent>
      <p>
        <CustomComponent>
          <input />
        </CustomComponent>
      </p>
    </Validation>, div2);
  });

  it('can contain CustomComponent inside Validator', function() {
    const CustomComponent = React.createClass({
      render() {
        const props = this.props;
        return props.children;
      },
    });

    ReactDOM.render(<Validation>
      <Validator>
        <input />
      </Validator>
      <p>
        <Validator>
          <input />
        </Validator>
      </p>
      <Validator>
        <CustomComponent>
          <input />
        </CustomComponent>
      </Validator>
      <p>
        <CustomComponent>
          <Validator>
            <input />
          </Validator>
        </CustomComponent>
      </p>
    </Validation>, div2);
  });

  it('will not change primary type', function() {
    expect(form.refs.option.innerHTML).to.be('1');
  });

  it('initial error is not shown', ()=> {
    expect(form.refs.error).to.be(undefined);
  });

  it('onValidate works', ()=> {
    const nativeInput = (form.refs.input);
    Simulate.change(nativeInput);
    expect(getInnerText((form.refs.error))).to.be('name is required');
    nativeInput.value = '1111';
    Simulate.change(nativeInput);
    expect(getInnerText((form.refs.error))).to.be('name must be between 5 and 10 characters,junk');
    nativeInput.value = '11111';
    Simulate.change(nativeInput);
    expect(form.refs.error).to.be(undefined);
  });

  it('validate method works', (done)=> {
    const nativeInput = (form.refs.input);
    nativeInput.value = 1;
    Simulate.change(nativeInput);
    form.refs.validation.validate(()=> {
      expect(getInnerText((form.refs.error))).to.be('name must be between 5 and 10 characters');
      expect(getInnerText((form.refs.error2))).to.be('pass is required');
      done();
    });
  });

  it('forceValidate works', (done)=> {
    const nativeInput = (form.refs.input);
    nativeInput.value = 1;
    Simulate.change(nativeInput);
    form.refs.validation.forceValidate(['name'], ()=> {
      expect(getInnerText((form.refs.error))).to.be('name must be between 5 and 10 characters');
      expect(form.refs.error2).to.be(undefined);
      done();
    });
  });

  describe('trigger', ()=> {
    it('blur works for error', (done)=> {
      const blurInput = (form.refs.blurInput);
      blurInput.value = 'a';
      Simulate.change(blurInput);
      form.refs.validation.validate(()=> {
        expect(getInnerText((form.refs.error3))).to.be('blurNumber is not a number');
        done();
      });
    });

    it('blur works for ok', (done)=> {
      const blurInput = (form.refs.blurInput);
      blurInput.value = '1';
      Simulate.change(blurInput);
      form.refs.validation.validate(()=> {
        expect(form.refs.error3).not.to.be.ok();
        done();
      });
    });
  });
});
