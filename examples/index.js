/** @jsx React.DOM */
var Validation = require('../');
var Validator = Validation.Validator;
var React = require('react');
var Form = React.createClass({
  getInitialState: function () {
    return {
      result: {
        i1: {
          value: ''
        },
        i2: {
          value: ''
        }
      }
    };
  },

  handleValidate: function (result) {
    this.setState({result: result});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var validation = this.refs.validation;
    validation.validate(function (valid) {
      if (!valid) {
        return;
      }
      console.log('submit');
      console.log(validation.getResult());
    });
  },

  userExists: function (rule, value, callback) {
    setTimeout(function () {
      if (value === 'yiminghe') {
        callback([{field: rule.field, message: 'forbid yiminghe'}]);
      } else {
        callback();
      }
    }, 1000);
  },

  render: function () {
    var result = this.state.result;
    return <form onSubmit={this.handleSubmit}>
      <Validation ref='validation' onValidate={this.handleValidate}>
        <p>
          <label>name:
            <Validator type="string" required={true} min={5} func={this.userExists}>
              <input name='i1' value={result.i1.value}/>
            </Validator>
          </label>
          {result.i1.isValidating ? <span> isValidating </span> : null}
          {result.i1.errors ? <span> {result.i1.errors.join(',')}</span> : null}
        </p>
        <p>
          <label>email:
            <Validator {...Validation.rules.email}>
              <input name='i2' value={result.i2.value}/>
            </Validator>
          </label>
            {result.i2.errors ? <span> {result.i2.errors.join(',')}</span> : null}
        </p>
        <p>
          <button type="submit">submit</button>
        </p>
      </Validation>
    </form>;
  }
});
React.render(<Form/>, document.getElementById('ex1'));
