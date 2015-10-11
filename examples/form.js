'use strict';

import 'bootstrap/dist/css/bootstrap.css';
import 'rc-calendar/assets/bootstrap.css';

import Validation, {Validator} from 'rc-form-validation';
import React from 'react';
import Calendar, {Picker as DatePicker} from 'rc-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
var formatter = new DateTimeFormat('yyyy-MM-dd');
import assign from 'object-assign';
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn';

function toNumber(v) {
  if (!v || !v.trim()) {
    return undefined;
  }
  var num = Number(v);
  // num === ' '
  if (!isNaN(num)) {
    num = parseInt(v);
  }
  return isNaN(num) ? v : num;
}

var Form = React.createClass({
  mixins: [Validation.FieldMixin],

  getInitialState() {
    var start = new GregorianCalendar(zhCn);
    start.setTime(Date.now());
    var end = start.clone();
    start.addDayOfMonth(-3);
    return {
      status: {
        number: {},
        pass: {},
        pass2: {},
        blurNumber: {},
        optionalNumber: {},
        name: {},
        email: {},
        startDate: {},
        endDate: {},
        must: {}
      },
      formData: {
        number: 0,
        pass: undefined,
        pass2: undefined,
        blurNumber: undefined,
        optionalNumber: undefined,
        name: undefined,
        must: undefined,
        email: undefined,
        optional: undefined,
        startDate: start,
        endDate: end
      }
    };
  },

  handleReset(e) {
    this.refs.validation.reset();
    this.setState(this.getInitialState());
    e.preventDefault();
  },

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
  },

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
  },

  checkPass(rule, value, callback) {
    if (this.state.formData.pass2) {
      this.refs.validation.forceValidate(['pass2']);
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    if (value !== this.state.formData.pass) {
      callback('two password are not same!');
    } else {
      callback();
    }
  },

  validateStartDate(rule, value, callback) {
    this.refs.validation.forceValidate(['endDate']);
    callback();
  },

  checkNow(rule, value, callback) {
    var errors;
    var now = new GregorianCalendar(zhCn);
    now.setTime(Date.now());
    if (value.getMonth() !== now.getMonth()) {
      errors = [new Error('can only select current month')];
    }
    callback(errors);
  },

  validateEndDate(rule, value, callback) {
    var errors = [];
    if (this.state.formData.startDate.getTime() > value.getTime()) {
      errors.push(new Error('start date can not be larger than end date'));
    }
    callback(errors.length ? errors : undefined);
  },

  render() {
    var formData = this.state.formData;
    var status = this.state.status;
    var field;
    var errorStyle = {color: 'red', fontWeight: 'bold'};
    if (!this.state.remove) {
      field = <div className="form-group">
        <label className="col-sm-2 control-label">email(validate on blur):</label>

        <div className="col-sm-10">
          <Validator rules={{type: 'email', message: '错误的 email 格式'}}
                     trigger="onBlur"
            >
            <input name='email' className="form-control" value={formData.email}
                   onChange={this.setField.bind(this, 'email')}
              />
          </Validator>
          {status.email.errors ? <span style={errorStyle}> {status.email.errors.join(', ')}</span> : null}
        </div>
      </div>;
    }
    return <form onSubmit={this.handleSubmit} className="form-horizontal">
      <Validation ref='validation' onValidate={this.onValidate}>
        <div className="form-group">
          <label className="col-sm-2 control-label">name:</label>

          <div className="col-sm-10">
            <Validator rules={[{required: true, min: 5}, {validator: this.userExists}]}>
              <input name='name' className="form-control" value={formData.name}/>
            </Validator>
            {status.name.isValidating ? <span style={{color: 'green'}}> isValidating </span> : null}
            {status.name.errors ? <span style={errorStyle}> {status.name.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">password:</label>

          <div className="col-sm-10">
            <Validator trigger="onBlur" rules={[{required: true, whitespace: true}, {validator: this.checkPass}]}>
              <input name='pass' className="form-control" value={formData.pass}/>
            </Validator>
            {status.pass.errors ? <span style={errorStyle}> {status.pass.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">retry password:</label>

          <div className="col-sm-10">
            <Validator trigger="onBlur" rules={[{
              required: true,
              whitespace: true,
              message: 'retry pass is required'
            }, {validator: this.checkPass2}]}>
              <input name='pass2' className="form-control" value={formData.pass2}/>
            </Validator>
            {status.pass2.errors ? <span style={errorStyle}> {status.pass2.errors.join(', ')}</span> : null}
          </div>
        </div>

        {field}

        <div className="form-group">
          <label className="col-sm-2 control-label">required number (validate on blur):</label>

          <div className="col-sm-10">
            <Validator trigger="onBlur" rules={[{required: true,message:'不是数字',pattern:/^\d+(\.\d+)?$/}]}>
              <input name='blurNumber' className="form-control" value={formData.blurNumber}/>
            </Validator>
            {status.blurNumber.errors ? <span style={errorStyle}> {status.blurNumber.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">required number:</label>

          <div className="col-sm-10">
            <Validator rules={[{required: true, type: 'number', transform: toNumber}]}>
              <input name='number' className="form-control" value={formData.number}/>
            </Validator>
            {status.number.errors ? <span style={errorStyle}> {status.number.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">optional number:</label>

          <div className="col-sm-10">
            <Validator rules={[{type: 'number', transform: toNumber}]}>
              <input name='optionalNumber' className="form-control" value={formData.optionalNumber}/>
            </Validator>
            {status.optionalNumber.errors ?
              <span style={errorStyle}> {status.optionalNumber.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">optional:</label>

          <div className="col-sm-10">
            <input name='optional' className="form-control" value={formData.optional}
                   onChange={this.setField.bind(this, 'optional')}/>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">required:</label>

          <div className="col-sm-10">
            <Validator rules={{required: true}}>
              <input name='must' className="form-control" value={formData.must} placeholder="必须"/>
            </Validator>
            {status.must.errors ? <span style={errorStyle}> {status.must.errors.join(', ')}</span> : null}
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">start date:</label>

          <div className="col-sm-10">
            <Validator rules={[{validator: this.checkNow}, {validator: this.validateStartDate}]}>
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
            <Validator rules={[{validator: this.checkNow}, {validator: this.validateEndDate}]}>
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
            &nbsp;&nbsp;&nbsp;
            <a href='#' className="btn btn-default" onClick={this.handleReset}>reset</a>
          </div>
        </div>
      </Validation>
    </form>;
  }
});

React.render(<div>
  <Form/>
</div>, document.getElementById('__react-content'));
