# rc-form-validation@0.x
---

<link type="text/css" rel="stylesheet" href="index.css">

````html
<div id='ex1'>
</div>
````

````js
/** @jsx React.DOM */
var Validation = require('../');
var Validator = Validation.Validator;
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var DateTimeFormat = require('gregorian-calendar-format');

var Form = React.createClass({
  getInitialState: function () {
    return {
      result: {
        i1: {
          value: ''
        },
        i2: {
          value: ''
        },
        i3: {}
      }
    };
  },

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd')
    }
  },

  handleValidate: function (result) {
    this.setState({result: result});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var validation = this.refs.validation;
    validation.validate(function (valid) {
      if (!valid) {
        console.log('error in form');
        return;
      }
      console.log('submit');
      console.log(validation.getResult());
    });
  },

  userExists: function (rule, value, callback) {
    setTimeout(function () {
      if (value === '1') {
        callback([{field: rule.field, message: 'are you kidding?'}]);
      }
      else if (value === 'yiminghe') {
        callback([{field: rule.field, message: 'forbid yiminghe'}]);
      } else {
        callback();
      }
    }, 1000);
  },

  validateDate: function (rule, value, callback) {
    if (!value || value.getDayOfWeek() !== 0) {
      callback([{field: rule.field, message: 'can only select sunday'}])
    } else {
      callback();
    }
  },

  toggleEmail: function (e) {
    e.preventDefault();
    this.setState({
      remove: !this.state.remove
    });
  },

  render: function () {
    var result = this.state.result;
    var field;
    if (!this.state.remove) {
      field = <p>
        <label>email:
          <Validator rules={{type: 'email', message: '错误的 email 格式'}}>
            <input name='i2' value={result.i2.value}/>
          </Validator>
        </label>
        {result.i2.errors ? <span> {result.i2.errors.join(', ')}</span> : null}
      </p>;
    }
    return <form onSubmit={this.handleSubmit}>
      <Validation ref='validation' onValidate={this.handleValidate}>
        <p>
          <label>name:
            <Validator rules={[{type: 'string', requires: true, min: 5}, {validator: this.userExists}]}>
              <input name='i1' value={result.i1.value}/>
            </Validator>
          </label>
              {result.i1.isValidating ? <span> isValidating </span> : null}
              {result.i1.errors ? <span> {result.i1.errors.join(', ')}</span> : null}
        </p>
        {field}
        <p>
          <label>date:
            <Validator rules={{validator: this.validateDate, message: 'will not effect'}}>
              <DatePicker name='i3' formatter={this.props.formatter} calendar={<Calendar />}
                value={result.i3.value}>
                <input type="text" style={{background: 'white', color: 'black', cursor: 'pointer'}}/>
              </DatePicker>
            </Validator>
          </label>
            {result.i3.errors ? <span> {result.i3.errors.join(', ')}</span> : null}
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