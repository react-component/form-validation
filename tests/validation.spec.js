var Validation = require('../');
var Validator = Validation.Validator;
var expect = require('expect.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

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
          name: {
            value: ''
          },
          pass:{
            value:''
          }
        }
      }
    },

    onValidate(formData) {
      this.setState({
        formData: formData
      });
    },

    onInputChange() {
    },

    render() {
      var state = this.state;
      return <Validation ref='validation' onValidate={this.onValidate}>
        <Validator ref='validator' rules={[{type: 'string', min: 5, max: 10}, {validator: validateInput}]}>
          <input name="name" value={state.formData.name.value} ref="input" onChange={this.onInputChange}/>
        </Validator>
        <Validator rules={[{type: 'string', required:true, whitespace:true}]}>
          <input name="pass" value={state.formData.pass.value}/>
        </Validator>
      {state.formData.name.errors && state.formData.name.errors.length ? <div ref='error'>{state.formData.name.errors.join(',')}</div> : null}
        {state.formData.pass.errors && state.formData.pass.errors.length ? <div ref='error2'>{state.formData.pass.errors.join(',')}</div> : null}
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
    var nativeInput = form.refs.validator.refs.input.getDOMNode();
    Simulate.change(nativeInput);
    expect(form.refs.error.getDOMNode().innerHTML).to.be('name must be between 5 and 10 characters');
    nativeInput.value = '1111';
    Simulate.change(nativeInput);
    expect(form.refs.error.getDOMNode().innerHTML).to.be('name must be between 5 and 10 characters,junk');
    nativeInput.value = '11111';
    Simulate.change(nativeInput);
    expect(form.refs.error).to.be(undefined);
  });

  it('validate method works', (done)=> {
    form.refs.validation.validate(()=> {
      expect(form.refs.error.getDOMNode().innerHTML).to.be('name must be between 5 and 10 characters');
      expect(form.refs.error2.getDOMNode().innerHTML).to.be('pass cannot be empty');
      done();
    });
  });

  it('forceValidate works',(done)=>{
    form.refs.validation.forceValidate(['name'],()=> {
      expect(form.refs.error.getDOMNode().innerHTML).to.be('name must be between 5 and 10 characters');
      expect(form.refs.error2).to.be(undefined);
      done();
    });
  });
});
