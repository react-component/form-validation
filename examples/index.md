# rc-form-validation@0.x
---

````html
<div id='ex1'>
</div>
````

````js
/** @jsx React.DOM */
var Validation = require('../');
var Validator = Validation.Validator;
var React = require('react');
var Form = React.createClass({
  getInitialState: function () {
    return {
      values: {},
      errors: [],
      errorsMap: {},
      valid: true
    };
  },

  handleValidate: function (result) {
    this.setState(result);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var validation = this.refs.validation;
    validation.validate();
    if (!validation.getResult().valid) {
      return;
    }
    console.log('submit');
    console.log(validation.getValues());
  },

  render: function () {
    var errorsMap = this.state.errorsMap;
    var values = this.state.values;
    return <form onSubmit={this.handleSubmit}>
      <Validation ref='validation' onValidate={this.handleValidate}>
        <p>
          <label>name:
            <Validator required={true} minLength={5} description="minLength 5 and required">
              <input name='i1' value={values.i1}/>
            </Validator>
          </label>
          {errorsMap.i1 ? <span> {errorsMap.i1.message}</span> : null}
        </p>
        <p>
          <label>email:
            <Validator type='string' format='email' description="email">
              <input name='i2' value={values.i2}/>
            </Validator>
          </label>
             {errorsMap.i2 ? <span> {errorsMap.i2.message}</span> : null}
        </p>
        <p>
          <button type="submit">submit</button>
        </p>
      </Validation>
    </form>;
  }
});
React.render(<Form/>, document.getElementById('ex1'));

````