// blank
require('bootstrap/dist/css/bootstrap.css');
require('rc-calendar/assets/bootstrap.css');
var Validation = require('rc-form-validation');
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
      console.log(validation.getFormData());
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
    var errors = [];
    var field = rule.field;
    var startValue = field === 'startDate' ? value : formData.startDate.value;
    var endValue = field === 'endDate' ? value : formData.endDate.value;
    if (!value || value.getDayOfWeek() !== 0) {
      errors.push({field: rule.field, message: 'can only select sunday'});
    }
    if (startValue && endValue && startValue.getTime() > endValue.getTime()) {
      errors.push({field: rule.field, message: 'start date can not be larger than end date'});
    }
// ok
    if (startValue && endValue && startValue.getTime() <= endValue.getTime()) {
      if (rule.field === 'startDate' && formData.endDate.errors && formData.endDate.errors.length) {
        setTimeout(function () {
          self.refs.validation.forceValidate(['endDate']);
        }, 0);
      }
      if (rule.field === 'endDate' && formData.startDate.errors && formData.startDate.errors.length) {
        setTimeout(function () {
          self.refs.validation.forceValidate(['startDate']);
        }, 0);
      }
    }
    callback(errors.length ? errors : undefined);
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
    var errorStyle = {color: 'red', fontWeight: 'bold'};
    if (!this.state.remove) {
      field = <div className="form-group">
        <label className="col-sm-2 control-label">email:</label>
        <div className="col-sm-10">
          <Validator rules={{type: 'email', message: '错误的 email 格式'}}>
            <input name='email' className="form-control" value={formData.email.value}/>
          </Validator>
        {formData.email.errors ? <span style={errorStyle}> {formData.email.errors.join(', ')}</span> : null}
        </div>
      </div>;
    }
    return <form onSubmit={this.handleSubmit} className="form-horizontal">
      <Validation ref='validation' onValidate={this.handleValidate}>
        <div className="form-group">
          <label className="col-sm-2 control-label">name:</label>
          <div className="col-sm-10">
            <Validator rules={[{type: 'string', requires: true, min: 5}, {validator: this.userExists}]}>
              <input name='name' className="form-control"  value={formData.name.value}/>
            </Validator>
                {formData.name.isValidating ? <span style={{color: 'green'}}> isValidating </span> : null}
                {formData.name.errors ? <span style={errorStyle}> {formData.name.errors.join(', ')}</span> : null}
          </div>
        </div>

        {field}

        <div className="form-group">
          <label className="col-sm-2 control-label">start date:</label>
          <div className="col-sm-10">
            <Validator rules={{validator: this.validateDate, message: 'will not effect'}}>
              <DatePicker name='startDate' formatter={this.props.formatter} calendar={<Calendar showTime={true}/>}
                value={formData.startDate.value}>
                <input type="text" className="form-control" style={{
                  background: 'white',
                  color: 'black',
                  cursor: 'pointer'
                }}/>
              </DatePicker>
            </Validator>
                {formData.startDate.errors ? <span style={errorStyle}> {formData.startDate.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">end date:</label>
          <div className="col-sm-10">
            <Validator rules={{validator: this.validateDate, message: 'will not effect'}}>
              <DatePicker name='endDate' formatter={this.props.formatter} calendar={<Calendar />}
                value={formData.endDate.value}>
                <input type="text" className="form-control" style={{
                  background: 'white',
                  color: 'black',
                  cursor: 'pointer'
                }}/>
              </DatePicker>
            </Validator>
                {formData.endDate.errors ? <span style={errorStyle}> {formData.endDate.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">submit</button>
          </div>
        </div>
      </Validation>
    </form>;
  }
});
React.render(<div>
  <h1>Form</h1>
  <Form/>
</div>, document.getElementById('__react-content'));
