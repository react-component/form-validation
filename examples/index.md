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
      formData: {
        name: {
          value: ''
        },
        email: {
          value: ''
        },
        startDate: {},
        endDate: {}
      }
    };
  },

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd')
    }
  },

  handleValidate: function (formData) {
    this.setState({formData: formData});
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
      console.log(validation.getformData());
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
    var self = this;
    var formData = this.state.formData;
    var errors=[];
    var field = rule.field;
    var startValue = field === 'startDate'?value:formData.startDate.value;
    var endValue = field === 'endDate'?value:formData.endDate.value;
    if (!value || value.getDayOfWeek() !== 0) {
      errors.push({field: rule.field, message: 'can only select sunday'});
    }
    if(startValue && endValue && startValue.getTime()>endValue.getTime()) {
      errors.push({field: rule.field, message: 'start date can not be larger than end date'});
    }
    // ok
    if(startValue && endValue && startValue.getTime()<=endValue.getTime()) {
      if(rule.field ==='startDate' && formData.endDate.errors && formData.endDate.errors.length){
        setTimeout(function(){
          self.refs.validation.forceValidate(['endDate']);
        },0);
      }
      if(rule.field ==='endDate' && formData.startDate.errors && formData.startDate.errors.length){
        setTimeout(function(){
          self.refs.validation.forceValidate(['startDate']);
        },0);
      }
    }
    callback(errors.length?errors:undefined);
  },

  toggleEmail: function (e) {
    e.preventDefault();
    this.setState({
      remove: !this.state.remove
    });
  },

  render: function () {
    var formData = this.state.formData;
    var field;
    if (!this.state.remove) {
      field = <p>
        <label>email:
          <Validator rules={{type: 'email', message: '错误的 email 格式'}}>
            <input name='email' value={formData.email.value}/>
          </Validator>
        </label>
        {formData.email.errors ? <span> {formData.email.errors.join(', ')}</span> : null}
      </p>;
    }
    return <form onSubmit={this.handleSubmit}>
      <Validation ref='validation' onValidate={this.handleValidate}>
        <p>
          <label>name:
            <Validator rules={[{type: 'string', requires: true, min: 5}, {validator: this.userExists}]}>
              <input name='name' value={formData.name.value}/>
            </Validator>
          </label>
              {formData.name.isValidating ? <span> isValidating </span> : null}
              {formData.name.errors ? <span> {formData.name.errors.join(', ')}</span> : null}
        </p>
        {field}
        <p>
          <label>start date:
            <Validator rules={{validator: this.validateDate, message: 'will not effect'}}>
              <DatePicker name='startDate' formatter={this.props.formatter} calendar={<Calendar />}
                value={formData.startDate.value}>
                <input type="text" style={{background: 'white', color: 'black', cursor: 'pointer'}}/>
              </DatePicker>
            </Validator>
          </label>
            {formData.startDate.errors ? <span> {formData.startDate.errors.join(', ')}</span> : null}
        </p>
        <p>
          <label>end date:
            <Validator rules={{validator: this.validateDate, message: 'will not effect'}}>
              <DatePicker name='endDate' formatter={this.props.formatter} calendar={<Calendar />}
                value={formData.endDate.value}>
                <input type="text" style={{background: 'white', color: 'black', cursor: 'pointer'}}/>
              </DatePicker>
            </Validator>
          </label>
            {formData.endDate.errors ? <span> {formData.endDate.errors.join(', ')}</span> : null}
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