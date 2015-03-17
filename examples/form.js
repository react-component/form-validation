// blank
require('bootstrap/dist/css/bootstrap.css');
require('rc-calendar/assets/bootstrap.css');
var Validation = require('rc-form-validation');
var Validator = Validation.Validator;
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var DateTimeFormat = require('gregorian-calendar-format');
var formatter = new DateTimeFormat('yyyy-MM-dd');
var assign = require('object-assign');
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');

class Form extends React.Component {
  constructor(props) {
    super(props);
    var start = new GregorianCalendar(zhCn);
    start.setTime(Date.now());
    var end = start.clone();
    start.addDayOfMonth(-3);
    this.state = {
      status: {
        name: {},
        email: {},
        startDate: {},
        endDate: {}
      },
      formData: {
        name: '',
        email: '',
        startDate: start,
        endDate: end
      }
    };
  }

  handleValidate(status, formData) {
    this.setState({
      status: assign({}, this.state.status, status),
      formData: assign({}, this.state.formData, formData)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        return;
      } else {
        console.log('submit');
      }
      console.log(this.state.formData);
    });
  }

  userExists(rule, value, callback) {
    setTimeout(function () {
      if (value === '1') {
        callback([new Error('are you kidding?')]);
      }
      else if (value === 'yiminghe') {
        callback([new Error('forbid yiminghe')]);
      } else {
        callback();
      }
    }, 1000);
  }

  validateDate(rule, value, callback) {
    var self = this;
    var formData = this.state.formData;
    var status = this.state.status;
    var errors = [];
    var field = rule.field;
    var now = new GregorianCalendar(zhCn);
    now.setTime(Date.now());
    var startValue = field === 'startDate' ? value : formData.startDate;
    var endValue = field === 'endDate' ? value : formData.endDate;
    if (value.getMonth() !== now.getMonth()) {
      errors.push(new Error('can only select current month'));
    }
    if (startValue && endValue && startValue.getTime() > endValue.getTime()) {
      errors.push(new Error('start date can not be larger than end date'));
    }
// ok
    if (startValue && endValue && startValue.getTime() <= endValue.getTime()) {
      if (field === 'startDate' && status.endDate.errors) {
        setTimeout(function () {
          self.refs.validation.forceValidate(['endDate']);
        }, 0);
      }
      if (field === 'endDate' && status.startDate.errors) {
        setTimeout(function () {
          self.refs.validation.forceValidate(['startDate']);
        }, 0);
      }
    }
    callback(errors.length ? errors : undefined);
  }

  render() {
    var formData = this.state.formData;
    var status = this.state.status;
    var field;
    var errorStyle = {color: 'red', fontWeight: 'bold'};
    if (!this.state.remove) {
      field = <div className="form-group">
        <label className="col-sm-2 control-label">email:</label>
        <div className="col-sm-10">
          <Validator rules={{type: 'email', message: '错误的 email 格式'}}>
            <input name='email' className="form-control" value={formData.email}/>
          </Validator>
        {status.email.errors ? <span style={errorStyle}> {status.email.errors.join(', ')}</span> : null}
        </div>
      </div>;
    }
    return <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
      <Validation ref='validation' onValidate={this.handleValidate.bind(this)}>
        <div className="form-group">
          <label className="col-sm-2 control-label">name:</label>
          <div className="col-sm-10">
            <Validator rules={[{type: 'string', requires: true, min: 5}, {validator: this.userExists.bind(this)}]}>
              <input name='name' className="form-control"  value={formData.name}/>
            </Validator>
                {status.name.isValidating ? <span style={{color: 'green'}}> isValidating </span> : null}
                {status.name.errors ? <span style={errorStyle}> {status.name.errors.join(', ')}</span> : null}
          </div>
        </div>

        {field}

        <div className="form-group">
          <label className="col-sm-2 control-label">start date:</label>
          <div className="col-sm-10">
            <Validator rules={{validator: this.validateDate.bind(this), message: 'will not effect'}}>
              <DatePicker name='startDate' formatter={this.props.formatter} calendar={<Calendar showTime={false}/>}
                value={formData.startDate}>
                <input type="text" className="form-control" style={{
                  background: 'white',
                  color: 'black',
                  cursor: 'pointer'
                }}/>
              </DatePicker>
            </Validator>
                {status.startDate.errors ? <span style={errorStyle}> {status.startDate.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">end date:</label>
          <div className="col-sm-10">
            <Validator rules={{validator: this.validateDate.bind(this), message: 'will not effect'}}>
              <DatePicker name='endDate' formatter={this.props.formatter} calendar={<Calendar />}
                value={formData.endDate}>
                <input type="text" className="form-control" style={{
                  background: 'white',
                  color: 'black',
                  cursor: 'pointer'
                }}/>
              </DatePicker>
            </Validator>
                {status.endDate.errors ? <span style={errorStyle}> {status.endDate.errors.join(', ')}</span> : null}
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
}

React.render(<div>
  <h1>Form</h1>
  <Form/>
</div>, document.getElementById('__react-content'));
