webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	var _rcFormValidation = __webpack_require__(4);
	
	var _rcFormValidation2 = _interopRequireDefault(_rcFormValidation);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcCalendar = __webpack_require__(47);
	
	var _rcCalendar2 = _interopRequireDefault(_rcCalendar);
	
	var _gregorianCalendarFormat = __webpack_require__(73);
	
	var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);
	
	var _objectAssign = __webpack_require__(45);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _gregorianCalendar = __webpack_require__(51);
	
	var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);
	
	var _gregorianCalendarLibLocaleZhCn = __webpack_require__(80);
	
	var _gregorianCalendarLibLocaleZhCn2 = _interopRequireDefault(_gregorianCalendarLibLocaleZhCn);
	
	var formatter = new _gregorianCalendarFormat2['default']('yyyy-MM-dd');
	
	function toNumber(v) {
	  var num = Number(v);
	  // num === ' '
	  if (!isNaN(num)) {
	    num = parseInt(v);
	  }
	  return isNaN(num) ? v : num;
	}
	
	var Form = _react2['default'].createClass({
	  displayName: 'Form',
	
	  mixins: [_rcFormValidation2['default'].FieldMixin],
	
	  getInitialState: function getInitialState() {
	    var start = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
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
	
	  handleReset: function handleReset(e) {
	    this.refs.validation.reset();
	    this.setState(this.getInitialState());
	    e.preventDefault();
	  },
	
	  handleSubmit: function handleSubmit(e) {
	    var _this = this;
	
	    e.preventDefault();
	    var validation = this.refs.validation;
	    validation.validate(function (valid) {
	      if (!valid) {
	        console.log('error in form');
	        return;
	      } else {
	        console.log('submit');
	      }
	      console.log(_this.state.formData);
	    });
	  },
	
	  userExists: function userExists(rule, value, callback) {
	    setTimeout(function () {
	      if (value === '1') {
	        callback([new Error('are you kidding?')]);
	      } else if (value === 'yiminghe') {
	        callback([new Error('forbid yiminghe')]);
	      } else {
	        callback();
	      }
	    }, 1000);
	  },
	
	  checkPass: function checkPass(rule, value, callback) {
	    if (this.state.formData.pass2) {
	      this.refs.validation.forceValidate(['pass2']);
	    }
	    callback();
	  },
	
	  checkPass2: function checkPass2(rule, value, callback) {
	    if (value !== this.state.formData.pass) {
	      callback('two password are not same!');
	    } else {
	      callback();
	    }
	  },
	
	  validateStartDate: function validateStartDate(rule, value, callback) {
	    this.refs.validation.forceValidate(['endDate']);
	    callback();
	  },
	
	  checkNow: function checkNow(rule, value, callback) {
	    var errors;
	    var now = new _gregorianCalendar2['default'](_gregorianCalendarLibLocaleZhCn2['default']);
	    now.setTime(Date.now());
	    if (value.getMonth() !== now.getMonth()) {
	      errors = [new Error('can only select current month')];
	    }
	    callback(errors);
	  },
	
	  validateEndDate: function validateEndDate(rule, value, callback) {
	    var errors = [];
	    if (this.state.formData.startDate.getTime() > value.getTime()) {
	      errors.push(new Error('start date can not be larger than end date'));
	    }
	    callback(errors.length ? errors : undefined);
	  },
	
	  render: function render() {
	    var formData = this.state.formData;
	    var status = this.state.status;
	    var field;
	    var errorStyle = { color: 'red', fontWeight: 'bold' };
	    if (!this.state.remove) {
	      field = _react2['default'].createElement(
	        'div',
	        { className: 'form-group' },
	        _react2['default'].createElement(
	          'label',
	          { className: 'col-sm-2 control-label' },
	          'email(validate on blur):'
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'col-sm-10' },
	          _react2['default'].createElement(
	            _rcFormValidation.Validator,
	            { rules: { type: 'email', message: '错误的 email 格式' },
	              trigger: 'onBlur'
	            },
	            _react2['default'].createElement('input', { name: 'email', className: 'form-control', value: formData.email,
	              onChange: this.setField.bind(this, 'email')
	            })
	          ),
	          status.email.errors ? _react2['default'].createElement(
	            'span',
	            { style: errorStyle },
	            ' ',
	            status.email.errors.join(', ')
	          ) : null
	        )
	      );
	    }
	    return _react2['default'].createElement(
	      'form',
	      { onSubmit: this.handleSubmit, className: 'form-horizontal' },
	      _react2['default'].createElement(
	        _rcFormValidation2['default'],
	        { ref: 'validation', onValidate: this.onValidate },
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'name:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { rules: [{ required: true, min: 5 }, { validator: this.userExists }] },
	              _react2['default'].createElement('input', { name: 'name', className: 'form-control', value: formData.name })
	            ),
	            status.name.isValidating ? _react2['default'].createElement(
	              'span',
	              { style: { color: 'green' } },
	              ' isValidating '
	            ) : null,
	            status.name.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.name.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'password:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { trigger: 'onBlur', rules: [{ required: true, whitespace: true }, { validator: this.checkPass }] },
	              _react2['default'].createElement('input', { name: 'pass', className: 'form-control', value: formData.pass })
	            ),
	            status.pass.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.pass.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'retry password:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { trigger: 'onBlur', rules: [{
	                  required: true,
	                  whitespace: true,
	                  message: 'retry pass is required'
	                }, { validator: this.checkPass2 }] },
	              _react2['default'].createElement('input', { name: 'pass2', className: 'form-control', value: formData.pass2 })
	            ),
	            status.pass2.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.pass2.errors.join(', ')
	            ) : null
	          )
	        ),
	        field,
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'required number (validate on blur):'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { trigger: 'onBlur', rules: [{ required: true, message: '不是数字', pattern: /^\d+(\.\d+)?$/ }] },
	              _react2['default'].createElement('input', { name: 'blurNumber', className: 'form-control', value: formData.blurNumber })
	            ),
	            status.blurNumber.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.blurNumber.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'required number:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { rules: [{ required: true, type: 'number', transform: toNumber }] },
	              _react2['default'].createElement('input', { name: 'number', className: 'form-control', value: formData.number })
	            ),
	            status.number.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.number.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'optional number:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { rules: [{ type: 'number', transform: toNumber }] },
	              _react2['default'].createElement('input', { name: 'optionalNumber', className: 'form-control', value: formData.optionalNumber })
	            ),
	            status.optionalNumber.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.optionalNumber.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'optional:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement('input', { name: 'optional', className: 'form-control', value: formData.optional,
	              onChange: this.setField.bind(this, 'optional') })
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'required:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { rules: { required: true } },
	              _react2['default'].createElement('input', { name: 'must', className: 'form-control', value: formData.must })
	            ),
	            status.must.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.must.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'start date:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { rules: [{ validator: this.checkNow }, { validator: this.validateStartDate }] },
	              _react2['default'].createElement(
	                _rcCalendar.Picker,
	                { name: 'startDate', formatter: this.props.formatter, calendar: _react2['default'].createElement(_rcCalendar2['default'], { showTime: false }),
	                  value: formData.startDate },
	                _react2['default'].createElement('input', { type: 'text', className: 'form-control', style: {
	                    background: 'white',
	                    color: 'black',
	                    cursor: 'pointer'
	                  } })
	              )
	            ),
	            status.startDate.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.startDate.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'label',
	            { className: 'col-sm-2 control-label' },
	            'end date:'
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-10' },
	            _react2['default'].createElement(
	              _rcFormValidation.Validator,
	              { rules: [{ validator: this.checkNow }, { validator: this.validateEndDate }] },
	              _react2['default'].createElement(
	                _rcCalendar.Picker,
	                { name: 'endDate', formatter: this.props.formatter, calendar: _react2['default'].createElement(_rcCalendar2['default'], null),
	                  value: formData.endDate },
	                _react2['default'].createElement('input', { type: 'text', className: 'form-control', style: {
	                    background: 'white',
	                    color: 'black',
	                    cursor: 'pointer'
	                  } })
	              )
	            ),
	            status.endDate.errors ? _react2['default'].createElement(
	              'span',
	              { style: errorStyle },
	              ' ',
	              status.endDate.errors.join(', ')
	            ) : null
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'col-sm-offset-2 col-sm-10' },
	            _react2['default'].createElement(
	              'button',
	              { type: 'submit', className: 'btn btn-default' },
	              'submit'
	            ),
	            '   ',
	            _react2['default'].createElement(
	              'a',
	              { href: '#', className: 'btn btn-default', onClick: this.handleReset },
	              'reset'
	            )
	          )
	        )
	      )
	    );
	  }
	});
	
	_react2['default'].render(_react2['default'].createElement(
	  'div',
	  null,
	  _react2['default'].createElement(Form, null)
	), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _asyncValidator = __webpack_require__(8);
	
	var _asyncValidator2 = _interopRequireDefault(_asyncValidator);
	
	var _Validator = __webpack_require__(32);
	
	var _Validator2 = _interopRequireDefault(_Validator);
	
	var _objectAssign = __webpack_require__(45);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _FieldMixin = __webpack_require__(46);
	
	var _FieldMixin2 = _interopRequireDefault(_FieldMixin);
	
	var actionId = 0;
	
	var Validation = (function (_React$Component) {
	  _inherits(Validation, _React$Component);
	
	  function Validation(props) {
	    var _this = this;
	
	    _classCallCheck(this, Validation);
	
	    _get(Object.getPrototypeOf(Validation.prototype), 'constructor', this).call(this, props);
	    this.validators = {};
	    ['attachValidator', 'detachValidator', 'onInputChange', 'onInputChangeSilently'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }
	
	  _createClass(Validation, [{
	    key: 'onInputChangeSilently',
	    value: function onInputChangeSilently(validator, value) {
	      var r = this.getValidateResult();
	      r.formData[validator.getName()] = value;
	      this.props.onValidate(r.status, r.formData);
	    }
	  }, {
	    key: 'onInputChange',
	    value: function onInputChange(validator, v, fn) {
	      var value = v;
	      var name = validator.getName();
	      var schema = this.getSchema(validator);
	      var rules = schema[name];
	      rules.forEach(function (rule, index) {
	        if (rule.transform) {
	          value = rule.transform(value);
	          var newRule = (0, _objectAssign2['default'])({}, rule);
	          newRule.transform = null;
	          rules[index] = newRule;
	        }
	      });
	      var values = {};
	      values[name] = value;
	      validator.errors = undefined;
	      validator.isValidating = true;
	      validator.dirty = true;
	      var currentActionId = actionId;
	      validator.actionId = currentActionId;
	      actionId++;
	      var result = this.getValidateResult();
	      result.formData[name] = value;
	      this.props.onValidate(result.status, result.formData);
	      var self = this;
	      new _asyncValidator2['default'](schema).validate(values, function (errors) {
	        var validators = self.validators;
	        // in case component is unmount and remount
	        var nowValidator = validators[name];
	        // prevent concurrency call
	        if (nowValidator && nowValidator.actionId === currentActionId) {
	          validator.errors = errors;
	          validator.isValidating = false;
	          validator.dirty = false;
	          var r = self.getValidateResult();
	          r.formData[name] = value;
	          self.props.onValidate(r.status, r.formData);
	          if (fn) {
	            fn();
	          }
	        }
	      });
	    }
	  }, {
	    key: 'getSchema',
	    value: function getSchema(validator) {
	      var ret = {};
	      var rules = validator.props.rules;
	      if (Array.isArray(rules)) {
	        rules = rules.concat();
	      } else {
	        rules = [rules];
	      }
	      ret[validator.getName()] = rules;
	      return ret;
	    }
	  }, {
	    key: 'getValidateResult',
	    value: function getValidateResult() {
	      var formData = {};
	      var status = {};
	      var validators = this.validators;
	      Object.keys(validators).forEach(function (name) {
	        var validator = validators[name];
	        var errors = undefined;
	        if (validator.errors) {
	          errors = validator.errors.map(function (e) {
	            return e.message;
	          });
	        }
	        if (errors && errors.length === 0) {
	          errors = null;
	        }
	        status[name] = {
	          errors: errors,
	          isValidating: validator.isValidating
	        };
	        formData[name] = validator.getValue();
	      });
	      return {
	        formData: formData,
	        status: status
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: this.props.className },
	        this.attachValidators(this.props.children)
	      );
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid() {
	      var result = this.getValidateResult().status;
	      return Object.keys(result).every(function (name) {
	        if (result[name].isValidating || result[name].errors) {
	          return false;
	        }
	        return true;
	      });
	    }
	  }, {
	    key: 'attachValidators',
	    value: function attachValidators(children) {
	      var self = this;
	      if (children) {
	        var _ret = (function () {
	          // refer: React traverseAllChildrenImpl
	          // bug fix for react 0.13 @2015.07.02
	          // option should not have non-text children
	          // <option>11</option>
	          // React.Children.map(option.props.children,function(c){return c}) => {'.0':'11'}
	          var type = typeof children;
	          if (type === 'boolean') {
	            return {
	              v: children
	            };
	          }
	          if (type === 'string' || type === 'number') {
	            return {
	              v: children
	            };
	          }
	          var childrenArray = [];
	          var ret = _react2['default'].Children.map(children, function (c) {
	            var child = c;
	            if (_react2['default'].isValidElement(child)) {
	              if (child.type === _Validator2['default']) {
	                child = _react2['default'].cloneElement(child, {
	                  attachValidator: self.attachValidator,
	                  detachValidator: self.detachValidator,
	                  onInputChange: self.onInputChange,
	                  onInputChangeSilently: self.onInputChangeSilently
	                });
	              } else if (child.props) {
	                child = _react2['default'].cloneElement(child, {}, self.attachValidators(child.props.children));
	              }
	            }
	            childrenArray.push(child);
	            return child;
	          });
	          // if only one child, then flatten
	          if (childrenArray.length === 1) {
	            return {
	              v: childrenArray[0]
	            };
	          }
	          return {
	            v: ret
	          };
	        })();
	
	        if (typeof _ret === 'object') return _ret.v;
	      }
	      return children;
	    }
	  }, {
	    key: 'attachValidator',
	    value: function attachValidator(validator) {
	      var name = validator.getName();
	      this.validators[name] = validator;
	    }
	  }, {
	    key: 'detachValidator',
	    value: function detachValidator(validator) {
	      delete this.validators[validator.getName()];
	    }
	  }, {
	    key: 'forceValidate',
	    value: function forceValidate(fs, callback) {
	      var _this2 = this;
	
	      var fields = fs;
	      // must async to allow state sync
	      setTimeout(function () {
	        var self = _this2;
	        var validators = _this2.validators;
	        var validator = undefined;
	        var doing = 0;
	
	        fields = fields || Object.keys(validators);
	        var count = fields.length;
	        if (count === 0) {
	          callback(self.isValid());
	          return;
	        }
	
	        function track() {
	          doing++;
	          if (doing === count) {
	            if (callback) {
	              callback(self.isValid());
	            }
	          }
	        }
	
	        fields.forEach(function (name) {
	          validator = validators[name];
	          self.onInputChange(validator, validator.getValue(), track);
	        });
	      }, 0);
	    }
	  }, {
	    key: 'validate',
	    value: function validate(callback) {
	      var _this3 = this;
	
	      var self = this;
	      var validators = this.validators;
	      var count = 0;
	      var validator = undefined;
	      var doing = 0;
	
	      Object.keys(validators).forEach(function (name) {
	        validator = validators[name];
	        if (validator.dirty) {
	          count++;
	        }
	      });
	
	      if (count === 0) {
	        callback(self.isValid());
	        return;
	      }
	
	      function track() {
	        doing++;
	        if (doing === count) {
	          callback(self.isValid());
	        }
	      }
	
	      Object.keys(validators).forEach(function (name) {
	        validator = validators[name];
	        if (validator.dirty) {
	          _this3.onInputChange(validator, validator.getValue(), track);
	        }
	      });
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var validators = this.validators;
	      Object.keys(validators).forEach(function (name) {
	        validators[name].reset();
	      });
	    }
	  }]);
	
	  return Validation;
	})(_react2['default'].Component);
	
	Validation.propTypes = {
	  onChange: _react2['default'].PropTypes.func,
	  onValidate: _react2['default'].PropTypes.func,
	  className: _react2['default'].PropTypes.string,
	  children: _react2['default'].PropTypes.any
	};
	
	Validation.defaultProps = {
	  onValidate: function onValidate() {}
	};
	
	Validation.Validator = _Validator2['default'];
	
	Validation.FieldMixin = _FieldMixin2['default'];
	
	exports['default'] = Validation;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _validator = __webpack_require__(10);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	var _messages2 = __webpack_require__(31);
	
	var _messages3 = _interopRequireDefault(_messages2);
	
	var _rule = __webpack_require__(12);
	
	function asyncMap(arr, func, callback) {
	  var results = [];
	
	  function count(_, result) {
	    results.push(result);
	    if (results.length === arr.length) {
	      callback(null, results);
	    }
	  }
	
	  arr.forEach(function (a) {
	    func(a, count);
	  });
	}
	
	function complementError(rule) {
	  return function (oe) {
	    var e = oe;
	    if (!e.message) {
	      e = new Error(e);
	    }
	    e.field = e.field || rule.fullField;
	    return e;
	  };
	}
	
	/**
	 *  Encapsulates a validation schema.
	 *
	 *  @param descriptor An object declaring validation rules
	 *  for this schema.
	 */
	function Schema(descriptor) {
	  this.rules = null;
	  this._messages = _messages3['default'];
	  this.define(descriptor);
	}
	
	Schema.prototype = {
	  messages: function messages(_messages) {
	    if (_messages) {
	      this._messages = _messages;
	    }
	    return this._messages;
	  },
	  define: function define(rules) {
	    if (!rules) {
	      throw new Error('Cannot configure a schema with no rules');
	    }
	    if (typeof rules !== 'object' || Array.isArray(rules)) {
	      throw new Error('Rules must be an object');
	    }
	    this.rules = {};
	    var z = undefined;
	    var item = undefined;
	    for (z in rules) {
	      if (rules.hasOwnProperty(z)) {
	        item = rules[z];
	        this.rules[z] = Array.isArray(item) ? item : [item];
	      }
	    }
	  },
	  validate: function validate(source, o, oc) {
	    var _this = this;
	
	    if (!this.rules) {
	      throw new Error('Cannot validate with no rules.');
	    }
	    var callback = oc;
	    var options = o || {};
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    function complete(results) {
	      var i = undefined;
	      var field = undefined;
	      var errors = [];
	      var fields = {};
	
	      function add(e) {
	        if (e instanceof Error) {
	          errors.push(e);
	        } else if (Array.isArray(e)) {
	          errors = errors.concat.apply(errors, e);
	        }
	      }
	
	      for (i = 0; i < results.length; i++) {
	        add(results[i]);
	      }
	      if (!errors.length) {
	        errors = null;
	        fields = null;
	      } else {
	        if (options.single) {
	          errors = errors.slice(0, 1);
	        }
	        for (i = 0; i < errors.length; i++) {
	          field = errors[i].field;
	          fields[field] = fields[field] || [];
	          fields[field].push(errors[i]);
	        }
	      }
	      callback(errors, fields);
	    }
	
	    options.messages = options.messages || this.messages();
	    options.error = _rule.error;
	    var arr = undefined;
	    var value = undefined;
	    var series = [];
	    var keys = options.keys || Object.keys(this.rules);
	    keys.forEach(function (z) {
	      arr = _this.rules[z];
	      value = source[z];
	      arr.forEach(function (r) {
	        var rule = r;
	        if (typeof rule.transform === 'function') {
	          value = source[z] = rule.transform(value);
	        }
	        if (typeof rule === 'function') {
	          rule = {
	            validator: rule
	          };
	        }
	        rule.field = z;
	        rule.fullField = rule.fullField || z;
	        rule.type = _this.getType(rule);
	        rule.validator = _this.getValidationMethod(rule);
	        if (!rule.validator) {
	          return;
	        }
	        series.push({ rule: rule, value: value, source: source, field: z });
	      });
	    });
	    asyncMap(series, function (data, doIt) {
	      var rule = data.rule;
	      var deep = (rule.type === 'object' || rule.type === 'array') && typeof rule.fields === 'object';
	      deep = deep && (rule.required || !rule.required && data.value);
	      rule.field = data.field;
	      function cb(e) {
	        var errors = e;
	        if (errors && !Array.isArray(errors)) {
	          errors = [errors];
	        }
	        if (errors && errors.length && rule.message) {
	          errors = [].concat(rule.message);
	        }
	        if (errors) {
	          errors = errors.map(complementError(rule));
	        }
	        if (options.first && errors && errors.length) {
	          return doIt(errors);
	        }
	        if (!deep) {
	          doIt(null, errors);
	        } else {
	          errors = errors || [];
	          // if rule is required but the target object
	          // does not exist fail at the rule level and don't
	          // go deeper
	          if (rule.required && !data.value) {
	            if (rule.message) {
	              errors = [].concat(rule.message).map(complementError(rule));
	            } else {
	              errors = [options.error(rule, _util2['default'].format(options.messages.required, rule.field))];
	            }
	            return doIt(null, errors);
	          }
	          var fieldsSchema = data.rule.fields;
	          for (var f in fieldsSchema) {
	            if (fieldsSchema.hasOwnProperty(f)) {
	              var fieldSchema = fieldsSchema[f];
	              fieldSchema.fullField = rule.fullField + '.' + f;
	            }
	          }
	          var schema = new Schema(fieldsSchema);
	          schema.messages(options.messages);
	          if (data.rule.options) {
	            data.rule.options.messages = options.messages;
	            data.rule.options.error = options.error;
	          }
	          schema.validate(data.value, data.rule.options || options, function (errs) {
	            doIt(null, errs && errs.length ? errors.concat(errs) : errs);
	          });
	        }
	      }
	
	      rule.validator(rule, data.value, cb, data.source, options);
	    }, function (err, results) {
	      complete(results);
	    });
	  },
	  getType: function getType(rule) {
	    if (rule.type === undefined && rule.pattern instanceof RegExp) {
	      rule.type = 'pattern';
	    }
	    if (typeof rule.validator !== 'function' && (rule.type && !_validator2['default'].hasOwnProperty(rule.type))) {
	      throw new Error(_util2['default'].format('Unknown rule type %s', rule.type));
	    }
	    return rule.type || 'string';
	  },
	  getValidationMethod: function getValidationMethod(rule) {
	    if (typeof rule.validator === 'function') {
	      return rule.validator;
	    }
	    return _validator2['default'][rule.type] || false;
	  }
	};
	
	Schema.register = function register(type, validator) {
	  if (typeof validator !== 'function') {
	    throw new Error('Cannot register a validator by type, validator is not a function');
	  }
	  _validator2['default'][type] = validator;
	};
	
	Schema.messages = _messages3['default'];
	
	exports['default'] = Schema;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var formatRegExp = /%[sdj%]/g;
	
	exports['default'] = {
	  format: function format() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var i = 1;
	    var f = args[0];
	    var len = args.length;
	    var str = String(f).replace(formatRegExp, function (x) {
	      if (x === '%%') {
	        return '%';
	      }
	      if (i >= len) {
	        return x;
	      }
	      switch (x) {
	        case '%s':
	          return String(args[i++]);
	        case '%d':
	          return Number(args[i++]);
	        case '%j':
	          try {
	            return JSON.stringify(args[i++]);
	          } catch (_) {
	            return '[Circular]';
	          }
	          break;
	        default:
	          return x;
	      }
	    });
	    for (var arg = args[i]; i < len; arg = args[++i]) {
	      str += ' ' + arg;
	    }
	    return str;
	  },
	
	  isEmptyValue: function isEmptyValue(value, type) {
	    if (value === undefined || value === null) {
	      return true;
	    }
	    if (type === 'array' && Array.isArray(value) && !value.length) {
	      return true;
	    }
	    if (type === 'string' && !value) {
	      return true;
	    }
	    return false;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  string: __webpack_require__(11),
	  method: __webpack_require__(19),
	  number: __webpack_require__(20),
	  boolean: __webpack_require__(21),
	  regexp: __webpack_require__(22),
	  integer: __webpack_require__(23),
	  'float': __webpack_require__(24),
	  array: __webpack_require__(25),
	  object: __webpack_require__(26),
	  'enum': __webpack_require__(27),
	  pattern: __webpack_require__(28),
	  email: __webpack_require__(29),
	  url: __webpack_require__(29),
	  date: __webpack_require__(30),
	  hex: __webpack_require__(29)
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Performs validation for string types.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function string(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options, 'string');
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	      _rule2['default'].range(rule, value, source, errors, options);
	      _rule2['default'].pattern(rule, value, source, errors, options);
	      if (rule.whitespace === true) {
	        _rule2['default'].whitespace(rule, value, source, errors, options);
	      }
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = string;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  required: __webpack_require__(13),
	  whitespace: __webpack_require__(14),
	  type: __webpack_require__(15),
	  range: __webpack_require__(16),
	  'enum': __webpack_require__(17),
	  pattern: __webpack_require__(18)
	};
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	/**
	 *  Rule for validating required fields.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function required(rule, value, source, errors, options, type) {
	  if (rule.required && (!source.hasOwnProperty(rule.field) || _util2['default'].isEmptyValue(value, type))) {
	    errors.push(_util2['default'].format(options.messages.required, rule.fullField));
	  }
	}
	
	exports['default'] = required;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	/**
	 *  Rule for validating whitespace.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function whitespace(rule, value, source, errors, options) {
	  if (/^\s+$/.test(value) || value === '') {
	    errors.push(_util2['default'].format(options.messages.whitespace, rule.fullField));
	  }
	}
	
	exports['default'] = whitespace;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _required = __webpack_require__(13);
	
	var _required2 = _interopRequireDefault(_required);
	
	var pattern = {
	  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
	  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
	  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
	};
	
	var types = {
	  integer: function integer(value) {
	    return types.number(value) && parseInt(value, 10) === value;
	  },
	  float: function float(value) {
	    return types.number(value) && !types.integer(value);
	  },
	  array: function array(value) {
	    return Array.isArray(value);
	  },
	  regexp: function regexp(value) {
	    if (value instanceof RegExp) {
	      return true;
	    }
	    try {
	      return !!new RegExp(value);
	    } catch (e) {
	      return false;
	    }
	  },
	  date: function date(value) {
	    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
	  },
	  number: function number(value) {
	    if (isNaN(value)) {
	      return false;
	    }
	    return typeof value === 'number';
	  },
	  object: function object(value) {
	    return typeof value === 'object' && !types.array(value);
	  },
	  method: function method(value) {
	    return typeof value === 'function';
	  },
	  email: function email(value) {
	    return typeof value === 'string' && !!value.match(pattern.email);
	  },
	  url: function url(value) {
	    return typeof value === 'string' && !!value.match(pattern.url);
	  },
	  hex: function hex(value) {
	    return typeof value === 'string' && !!value.match(pattern.hex);
	  }
	};
	
	/**
	 *  Rule for validating the type of a value.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function type(rule, value, source, errors, options) {
	  if (rule.required && value === undefined) {
	    (0, _required2['default'])(rule, value, source, errors, options);
	    return;
	  }
	  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date'];
	  var ruleType = rule.type;
	  if (custom.indexOf(ruleType) > -1) {
	    if (!types[ruleType](value)) {
	      errors.push(_util2['default'].format(options.messages.types[ruleType], rule.fullField, rule.type));
	    }
	    // straight typeof check
	  } else if (ruleType && typeof value !== rule.type) {
	      errors.push(_util2['default'].format(options.messages.types[ruleType], rule.fullField, rule.type));
	    }
	}
	
	exports['default'] = type;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	/**
	 *  Rule for validating minimum and maximum allowed values.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function range(rule, value, source, errors, options) {
	  var len = typeof rule.len === 'number';
	  var min = typeof rule.min === 'number';
	  var max = typeof rule.max === 'number';
	  var val = value;
	  var key = null;
	  var num = typeof value === 'number';
	  var str = typeof value === 'string';
	  var arr = Array.isArray(value);
	  if (num) {
	    key = 'number';
	  } else if (str) {
	    key = 'string';
	  } else if (arr) {
	    key = 'array';
	  }
	  // if the value is not of a supported type for range validation
	  // the validation rule rule should use the
	  // type property to also test for a particular type
	  if (!key) {
	    return false;
	  }
	  if (str || arr) {
	    val = value.length;
	  }
	  if (len) {
	    if (val !== rule.len) {
	      errors.push(_util2['default'].format(options.messages[key].len, rule.fullField, rule.len));
	    }
	  } else if (min && !max && val < rule.min) {
	    errors.push(_util2['default'].format(options.messages[key].min, rule.fullField, rule.min));
	  } else if (max && !min && val > rule.max) {
	    errors.push(_util2['default'].format(options.messages[key].max, rule.fullField, rule.max));
	  } else if (min && max && (val < rule.min || val > rule.max)) {
	    errors.push(_util2['default'].format(options.messages[key].range, rule.fullField, rule.min, rule.max));
	  }
	}
	
	exports['default'] = range;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	var ENUM = 'enum';
	
	/**
	 *  Rule for validating a value exists in an enumerable list.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function enumerable(rule, value, source, errors, options) {
	  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
	  if (rule[ENUM].indexOf(value) === -1) {
	    errors.push(_util2['default'].format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
	  }
	}
	
	exports['default'] = enumerable;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(9);
	
	var _util2 = _interopRequireDefault(_util);
	
	/**
	 *  Rule for validating a regular expression pattern.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param source The source object being validated.
	 *  @param errors An array of errors that this rule may add
	 *  validation errors to.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function pattern(rule, value, source, errors, options) {
	  if (rule.pattern instanceof RegExp) {
	    if (!rule.pattern.test(value)) {
	      errors.push(_util2['default'].format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
	    }
	  }
	}
	
	exports['default'] = pattern;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates a function.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function method(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = method;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates a number.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function number(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	      _rule2['default'].range(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = number;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates a boolean.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function boolean(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = boolean;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates the regular expression type.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function regexp(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = regexp;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates a number is an integer.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function integer(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	      _rule2['default'].range(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = integer;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates a number is a floating point number.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function floatFn(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	      _rule2['default'].range(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = floatFn;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates an array.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function array(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options, 'array');
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	      _rule2['default'].range(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = array;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates an object.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function object(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].type(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = object;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	var ENUM = 'enum';
	
	/**
	 *  Validates an enumerable list.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function enumerable(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value) {
	      _rule2['default'][ENUM](rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = enumerable;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	/**
	 *  Validates a regular expression pattern.
	 *
	 *  Performs validation when a rule only contains
	 *  a pattern property but is not declared as a string type.
	 *
	 *  @param rule The validation rule.
	 *  @param value The value of the field on the source object.
	 *  @param callback The callback function.
	 *  @param source The source object being validated.
	 *  @param options The validation options.
	 *  @param options.messages The validation messages.
	 */
	function pattern(rule, value, callback, source, options) {
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value !== undefined) {
	      _rule2['default'].pattern(rule, value, source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = pattern;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	function type(rule, value, callback, source, options) {
	  var errors = [];
	  _rule2['default'].type(rule, value, source, errors, options);
	  callback(errors);
	}
	
	exports['default'] = type;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rule = __webpack_require__(12);
	
	var _rule2 = _interopRequireDefault(_rule);
	
	function date(rule, value, callback, source, options) {
	  // console.log('integer rule called %j', rule);
	  var errors = [];
	  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
	  // console.log('validate on %s value', value);
	  if (validate) {
	    if (value === undefined && !rule.required) {
	      return callback();
	    }
	    _rule2['default'].required(rule, value, source, errors, options);
	    if (value) {
	      _rule2['default'].type(rule, value, source, errors, options);
	      _rule2['default'].range(rule, value.getTime(), source, errors, options);
	    }
	  }
	  callback(errors);
	}
	
	exports['default'] = date;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var messages = {
	  'default': 'Validation error on field %s',
	  required: '%s is required',
	  'enum': '%s must be one of %s',
	  whitespace: '%s cannot be empty',
	  date: {
	    format: '%s date %s is invalid for format %s',
	    parse: '%s date could not be parsed, %s is invalid ',
	    invalid: '%s date %s is invalid'
	  },
	  types: {
	    string: '%s is not a %s',
	    method: '%s is not a %s (function)',
	    array: '%s is not an %s',
	    object: '%s is not an %s',
	    number: '%s is not a %s',
	    boolean: '%s is not a %s',
	    integer: '%s is not an %s',
	    float: '%s is not a %s',
	    regexp: '%s is not a valid %s',
	    email: '%s is not a valid %s',
	    url: '%s is not a valid %s',
	    hex: '%s is not a valid %s'
	  },
	  string: {
	    len: '%s must be exactly %s characters',
	    min: '%s must be at least %s characters',
	    max: '%s cannot be longer than %s characters',
	    range: '%s must be between %s and %s characters'
	  },
	  number: {
	    len: '%s must equal %s',
	    min: '%s cannot be less than %s',
	    max: '%s cannot be greater than %s',
	    range: '%s must be between %s and %s'
	  },
	  array: {
	    len: '%s must be exactly %s in length',
	    min: '%s cannot be less than %s in length',
	    max: '%s cannot be greater than %s in length',
	    range: '%s must be between %s and %s in length'
	  },
	  pattern: {
	    mismatch: '%s value %s does not match pattern %s'
	  },
	  clone: function clone() {
	    var cloned = JSON.parse(JSON.stringify(this));
	    cloned.clone = this.clone;
	    return cloned;
	  }
	};
	exports['default'] = messages;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcUtil = __webpack_require__(33);
	
	function getValueFromEvent(e) {
	  // support custom element
	  return e.target ? e.target.value : e;
	}
	
	var Validator = (function (_React$Component) {
	  _inherits(Validator, _React$Component);
	
	  function Validator(props) {
	    _classCallCheck(this, Validator);
	
	    _get(Object.getPrototypeOf(Validator.prototype), 'constructor', this).call(this, props);
	    this.reset();
	    this.onChange = this.onChange.bind(this);
	    this.onChangeSilently = this.onChangeSilently.bind(this);
	  }
	
	  _createClass(Validator, [{
	    key: 'reset',
	    value: function reset() {
	      this.errors = undefined;
	      this.dirty = true;
	      this.isValidating = false;
	      // in case component is unmount and remount
	      this.actionId = -1;
	    }
	  }, {
	    key: 'getInputElement',
	    value: function getInputElement() {
	      return _react2['default'].Children.only(this.props.children);
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      this.props.onInputChange(this, getValueFromEvent(e));
	    }
	  }, {
	    key: 'onChangeSilently',
	    value: function onChangeSilently(e) {
	      // keep last error
	      this.dirty = true;
	      this.isValidating = false;
	      this.props.onInputChangeSilently(this, getValueFromEvent(e));
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return this.getInputElement().props.name;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.getInputElement().props.value;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var child = this.getInputElement();
	      var trigger = props.trigger;
	      var triggerObj = {};
	      // keep model updated
	      if (trigger !== 'onChange') {
	        triggerObj.onChange = (0, _rcUtil.createChainedFunction)(child.props.onChange, this.onChangeSilently);
	      }
	      triggerObj[trigger] = (0, _rcUtil.createChainedFunction)(child.props[trigger], this.onChange);
	      return _react2['default'].cloneElement(child, triggerObj);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.attachValidator(this);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.props.attachValidator(this);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.props.detachValidator(this);
	    }
	  }]);
	
	  return Validator;
	})(_react2['default'].Component);
	
	Validator.defaultProps = {
	  trigger: 'onChange'
	};
	
	Validator.propTypes = {
	  attachValidator: _react2['default'].PropTypes.func,
	  detachValidator: _react2['default'].PropTypes.func,
	  onInputChange: _react2['default'].PropTypes.func,
	  onInputChangeSilently: _react2['default'].PropTypes.func,
	  trigger: _react2['default'].PropTypes.string
	};
	
	exports['default'] = Validator;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  guid: __webpack_require__(34),
	  classSet: __webpack_require__(35),
	  joinClasses: __webpack_require__(36),
	  KeyCode: __webpack_require__(37),
	  PureRenderMixin: __webpack_require__(38),
	  shallowEqual: __webpack_require__(39),
	  createChainedFunction: __webpack_require__(40),
	  Dom: {
	    addEventListener: __webpack_require__(41),
	    contains: __webpack_require__(42)
	  },
	  Children: {
	    toArray: __webpack_require__(43),
	    mapSelf: __webpack_require__(44)
	  }
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	var seed = 0;
	module.exports = function () {
	  return Date.now() + '_' + (seed++);
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/cx.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames === 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}
	
	module.exports = cx;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/utils/joinClasses.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	"use strict";
	
	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	
	function joinClasses(className /*, ... */ ) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}
	
	module.exports = joinClasses;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * @ignore
	 * some key-codes definition and utils from closure-library
	 * @author yiminghe@gmail.com
	 */
	
	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	};
	
	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function (e) {
	  var keyCode = e.keyCode;
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	      // Function keys don't generate text
	    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false;
	  }
	
	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	    case KeyCode.ALT:
	    case KeyCode.CAPS_LOCK:
	    case KeyCode.CONTEXT_MENU:
	    case KeyCode.CTRL:
	    case KeyCode.DOWN:
	    case KeyCode.END:
	    case KeyCode.ESC:
	    case KeyCode.HOME:
	    case KeyCode.INSERT:
	    case KeyCode.LEFT:
	    case KeyCode.MAC_FF_META:
	    case KeyCode.META:
	    case KeyCode.NUMLOCK:
	    case KeyCode.NUM_CENTER:
	    case KeyCode.PAGE_DOWN:
	    case KeyCode.PAGE_UP:
	    case KeyCode.PAUSE:
	    case KeyCode.PRINT_SCREEN:
	    case KeyCode.RIGHT:
	    case KeyCode.SHIFT:
	    case KeyCode.UP:
	    case KeyCode.WIN_KEY:
	    case KeyCode.WIN_KEY_RIGHT:
	      return false;
	    default:
	      return true;
	  }
	};
	
	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function (keyCode) {
	  if (keyCode >= KeyCode.ZERO &&
	    keyCode <= KeyCode.NINE) {
	    return true;
	  }
	
	  if (keyCode >= KeyCode.NUM_ZERO &&
	    keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true;
	  }
	
	  if (keyCode >= KeyCode.A &&
	    keyCode <= KeyCode.Z) {
	    return true;
	  }
	
	  // Safari sends zero key code for non-latin characters.
	  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true;
	  }
	
	  switch (keyCode) {
	    case KeyCode.SPACE:
	    case KeyCode.QUESTION_MARK:
	    case KeyCode.NUM_PLUS:
	    case KeyCode.NUM_MINUS:
	    case KeyCode.NUM_PERIOD:
	    case KeyCode.NUM_DIVISION:
	    case KeyCode.SEMICOLON:
	    case KeyCode.DASH:
	    case KeyCode.EQUALS:
	    case KeyCode.COMMA:
	    case KeyCode.PERIOD:
	    case KeyCode.SLASH:
	    case KeyCode.APOSTROPHE:
	    case KeyCode.SINGLE_QUOTE:
	    case KeyCode.OPEN_SQUARE_BRACKET:
	    case KeyCode.BACKSLASH:
	    case KeyCode.CLOSE_SQUARE_BRACKET:
	      return true;
	    default:
	      return false;
	  }
	};
	
	module.exports = KeyCode;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/
	
	"use strict";
	
	var shallowEqual = __webpack_require__(39);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */
	
	"use strict";
	
	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = shallowEqual;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  var args = arguments;
	
	  return function chainedFunction() {
	    for (var i = 0; i < args.length; i++) {
	      if (args[i] && args[i].apply) {
	        args[i].apply(this, arguments);
	      }
	    }
	  };
	}
	
	module.exports = createChainedFunction;


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function (target, eventType, callback) {
	  if (target.addEventListener) {
	    target.addEventListener(eventType, callback, false);
	    return {
	      remove: function () {
	        target.removeEventListener(eventType, callback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, callback);
	    return {
	      remove: function () {
	        target.detachEvent('on' + eventType, callback);
	      }
	    };
	  }
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function (root, node) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	
	  return false;
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	
	module.exports = function (children) {
	  var ret = [];
	  React.Children.forEach(children, function (c) {
	    ret.push(c);
	  });
	  return ret;
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	
	function mirror(o) {
	  return o;
	}
	
	module.exports = function (children) {
	  // return ReactFragment
	  return React.Children.map(children, mirror);
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function merge() {
	  var ret = {};
	  var args = [].slice.call(arguments, 0);
	  args.forEach(function (a) {
	    Object.keys(a).forEach(function (k) {
	      ret[k] = a[k];
	    });
	  });
	  return ret;
	}
	
	var FieldMixin = {
	  setField: function setField(field, e) {
	    var v = e;
	    var target = e && e.target;
	    if (target) {
	      // no radio
	      if ((target.nodeName + '').toLowerCase() === 'input' && target.type === 'checkbox') {
	        v = target.checked;
	      } else {
	        v = e.target.value;
	      }
	    }
	    var newFormData = {};
	    newFormData[field] = v;
	    this.setState({
	      formData: merge(this.state.formData, newFormData)
	    });
	  },
	
	  handleValidate: function handleValidate(status, formData) {
	    this.onValidate(status, formData);
	  },
	
	  onValidate: function onValidate(status, formData) {
	    this.setState({
	      status: merge(this.state.status, status),
	      formData: merge(this.state.formData, formData)
	    });
	  }
	};
	
	exports['default'] = FieldMixin;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(48);
	module.exports.Picker = __webpack_require__(70);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var DateTimeFormat = __webpack_require__(49);
	var GregorianCalendar = __webpack_require__(51);
	var rcUtil = __webpack_require__(33);
	var KeyCode = rcUtil.KeyCode;
	var DateTable = __webpack_require__(57);
	var CalendarHeader = __webpack_require__(61);
	var CalendarFooter = __webpack_require__(66);
	var staticPrefixClsFn = __webpack_require__(65);
	
	function noop() {}
	
	function goStartMonth() {
	  var next = this.state.value.clone();
	  next.setDayOfMonth(1);
	  this.setState({ value: next });
	}
	
	function goEndMonth() {
	  var next = this.state.value.clone();
	  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
	  this.setState({ value: next });
	}
	
	function goMonth(direction) {
	  var next = this.state.value.clone();
	  next.addMonth(direction);
	  this.setState({ value: next });
	}
	
	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({ value: next });
	}
	
	function goWeek(direction) {
	  var next = this.state.value.clone();
	  next.addWeekOfYear(direction);
	  this.setState({ value: next });
	}
	
	function goDay(direction) {
	  var next = this.state.value.clone();
	  next.addDayOfMonth(direction);
	  this.setState({ value: next });
	}
	
	function getNow() {
	  var value = new GregorianCalendar();
	  value.setTime(Date.now());
	  return value;
	}
	
	function getNowByCurrentStateValue(value) {
	  value = value || getNow();
	  value = value.clone();
	  value.setTime(Date.now());
	  return value;
	}
	
	var Calendar = (function (_React$Component) {
	  function Calendar(props) {
	    var _this = this;
	
	    _classCallCheck(this, Calendar);
	
	    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
	    var value = props.value || props.defaultValue || getNow();
	    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
	    this.state = {
	      orient: props.orient,
	      prefixCls: props.prefixCls,
	      value: value
	    };
	    // bind methods
	    this.nextMonth = goMonth.bind(this, 1);
	    this.previousMonth = goMonth.bind(this, -1);
	    this.nextYear = goYear.bind(this, 1);
	    this.previousYear = goYear.bind(this, -1);
	
	    ['handleBlur', 'handleFocus', 'prefixClsFn', 'chooseToday', 'handleClear', 'handleSelect', 'setValue', 'handleKeyDown', 'handleOk'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }
	
	  _inherits(Calendar, _React$Component);
	
	  _createClass(Calendar, [{
	    key: 'handleOk',
	    value: function handleOk() {
	      this.props.onOk(this.state.value);
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(current) {
	      this.setState({
	        value: current
	      });
	    }
	  }, {
	    key: 'chooseToday',
	    value: function chooseToday() {
	      var today = this.state.value.clone();
	      today.setTime(Date.now());
	      this.handleSelect(today);
	    }
	  }, {
	    key: 'handleSelect',
	    value: function handleSelect(current, keyDownEvent) {
	      var props = this.props;
	      this.setState({
	        value: current
	      });
	      if (!keyDownEvent) {
	        props.onSelect(current);
	      }
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      var keyCode = e.keyCode;
	      // mac
	      var ctrlKey = e.ctrlKey || e.metaKey;
	      switch (keyCode) {
	        case KeyCode.DOWN:
	          goWeek.call(this, 1);
	          e.preventDefault();
	          return 1;
	        case KeyCode.UP:
	          goWeek.call(this, -1);
	          e.preventDefault();
	          return 1;
	        case KeyCode.LEFT:
	          if (ctrlKey) {
	            this.previousYear();
	          } else {
	            goDay.call(this, -1);
	          }
	          e.preventDefault();
	          return 1;
	        case KeyCode.RIGHT:
	          if (ctrlKey) {
	            this.nextYear();
	          } else {
	            goDay.call(this, 1);
	          }
	          e.preventDefault();
	          return 1;
	        case KeyCode.HOME:
	          goStartMonth.call(this);
	          e.preventDefault();
	          return 1;
	        case KeyCode.END:
	          goEndMonth.call(this);
	          e.preventDefault();
	          return 1;
	        case KeyCode.PAGE_DOWN:
	          this.nextMonth();
	          e.preventDefault();
	          return 1;
	        case KeyCode.PAGE_UP:
	          this.previousMonth();
	          e.preventDefault();
	          return 1;
	        case KeyCode.ENTER:
	          this.props.onSelect(this.state.value);
	          e.preventDefault();
	          return 1;
	        default:
	          this.props.onKeyDown(e);
	          return 1;
	      }
	    }
	  }, {
	    key: 'handleClear',
	    value: function handleClear() {
	      this.props.onClear();
	    }
	  }, {
	    key: 'prefixClsFn',
	    value: function prefixClsFn() {
	      return staticPrefixClsFn.apply(this, arguments);
	    }
	  }, {
	    key: 'handleFocus',
	    value: function handleFocus() {
	      if (this._blurTimer) {
	        clearTimeout(this._blurTimer);
	        this._blurTimer = null;
	      } else {
	        this.props.onFocus();
	      }
	    }
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur() {
	      var _this2 = this;
	
	      if (this._blurTimer) {
	        clearTimeout(this._blurTimer);
	      }
	      this._blurTimer = setTimeout(function () {
	        _this2.props.onBlur();
	      }, 100);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var value = nextProps.value;
	      if (value !== undefined) {
	        value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
	        this.setState({
	          value: value
	        });
	      }
	      if (nextProps.orient) {
	        this.setState({
	          orient: nextProps.orient
	        });
	      }
	      if (nextProps.locale !== this.props.locale) {
	        this.dateFormatter = new DateTimeFormat(nextProps.locale.dateFormat);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _className;
	
	      var props = this.props;
	      var locale = props.locale;
	      var state = this.state;
	      var value = state.value;
	      var prefixClsFn = this.prefixClsFn;
	
	      var className = (_className = {}, _defineProperty(_className, prefixClsFn(), 1), _defineProperty(_className, prefixClsFn('week-number'), props.showWeekNumber), _className);
	
	      if (props.className) {
	        className[props.className] = 1;
	      }
	
	      var orient = state.orient;
	      if (orient) {
	        orient.forEach(function (o) {
	          className[prefixClsFn('orient-' + o)] = 1;
	        });
	      }
	
	      return React.createElement(
	        'div',
	        { className: rcUtil.classSet(className), style: this.props.style,
	          tabIndex: '0', onFocus: this.handleFocus,
	          onBlur: this.handleBlur, onKeyDown: this.handleKeyDown },
	        React.createElement(
	          'div',
	          { style: { outline: 'none' } },
	          React.createElement(CalendarHeader, {
	            locale: locale,
	            onValueChange: this.setValue,
	            previousYear: this.previousYear,
	            previousMonth: this.previousMonth,
	            nextMonth: this.nextMonth,
	            nextYear: this.nextYear,
	            value: value,
	            prefixClsFn: prefixClsFn }),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('calendar-body') },
	            React.createElement(DateTable, {
	              locale: locale,
	              value: value,
	              prefixClsFn: prefixClsFn,
	              dateRender: props.dateRender,
	              onSelect: this.handleSelect,
	              disabledDate: props.disabledDate,
	              showWeekNumber: props.showWeekNumber,
	              dateFormatter: this.dateFormatter })
	          ),
	          React.createElement(CalendarFooter, {
	            locale: locale,
	            showClear: props.showClear,
	            showOk: props.showOk,
	            prefixClsFn: prefixClsFn,
	            showToday: props.showToday,
	            showTime: props.showTime,
	            value: value,
	            dateFormatter: this.dateFormatter,
	            onClear: this.handleClear,
	            onOk: this.handleOk,
	            onSelect: this.handleSelect,
	            onToday: this.chooseToday
	          })
	        )
	      );
	    }
	  }]);
	
	  return Calendar;
	})(React.Component);
	
	Calendar.propTypes = {
	  value: React.PropTypes.object,
	  defaultValue: React.PropTypes.object,
	  className: React.PropTypes.string,
	  orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
	  locale: React.PropTypes.object,
	  showWeekNumber: React.PropTypes.bool,
	  style: React.PropTypes.object,
	  showToday: React.PropTypes.bool,
	  showTime: React.PropTypes.bool,
	  onSelect: React.PropTypes.func,
	  onBlur: React.PropTypes.func
	};
	
	Calendar.defaultProps = {
	  locale: __webpack_require__(69),
	  style: {},
	  prefixCls: 'rc-calendar',
	  onKeyDown: noop,
	  className: '',
	  showToday: true,
	  onSelect: noop,
	  onFocus: noop,
	  onBlur: noop,
	  onClear: noop,
	  onOk: noop
	};
	
	module.exports = Calendar;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * DateTimeFormat for
	 * Inspired by DateTimeFormat from JDK.
	 * @author yiminghe@gmail.com
	 */
	
	var GregorianCalendar = __webpack_require__(51);
	var enUsLocale = __webpack_require__(56);
	var MAX_VALUE = Number.MAX_VALUE;
	/**
	 * date or time style enum
	 * @enum {Number} Date.Formatter.Style
	 */
	var DateTimeStyle = {
	  /**
	   * full style
	   */
	  FULL: 0,
	  /**
	   * long style
	   */
	  LONG: 1,
	  /**
	   * medium style
	   */
	  MEDIUM: 2,
	  /**
	   * short style
	   */
	  SHORT: 3
	};
	
	/*
	 Letter    Date or Time Component    Presentation    Examples
	 G    Era designator    Text    AD
	 y    Year    Year    1996; 96
	 M    Month in year    Month    July; Jul; 07
	 w    Week in year    Number    27
	 W    Week in month    Number    2
	 D    Day in year    Number    189
	 d    Day in month    Number    10
	 F    Day of week in month    Number    2
	 E    Day in week    Text    Tuesday; Tue
	 a    Am/pm marker    Text    PM
	 H    Hour in day (0-23)    Number    0
	 k    Hour in day (1-24)    Number    24
	 K    Hour in am/pm (0-11)    Number    0
	 h    Hour in am/pm (1-12)    Number    12
	 m    Minute in hour    Number    30
	 s    Second in minute    Number    55
	 S    Millisecond    Number    978
	 x z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00
	 Z    Time zone    RFC 822 time zone    -0800
	 */
	
	var patternChars = new Array(GregorianCalendar.DAY_OF_WEEK_IN_MONTH + 2).join('1');
	var ERA = 0;
	var calendarIndexMap = {};
	
	patternChars = patternChars.split('');
	patternChars[ERA] = 'G';
	patternChars[GregorianCalendar.YEAR] = 'y';
	patternChars[GregorianCalendar.MONTH] = 'M';
	patternChars[GregorianCalendar.DAY_OF_MONTH] = 'd';
	patternChars[GregorianCalendar.HOUR_OF_DAY] = 'H';
	patternChars[GregorianCalendar.MINUTES] = 'm';
	patternChars[GregorianCalendar.SECONDS] = 's';
	patternChars[GregorianCalendar.MILLISECONDS] = 'S';
	patternChars[GregorianCalendar.WEEK_OF_YEAR] = 'w';
	patternChars[GregorianCalendar.WEEK_OF_MONTH] = 'W';
	patternChars[GregorianCalendar.DAY_OF_YEAR] = 'D';
	patternChars[GregorianCalendar.DAY_OF_WEEK_IN_MONTH] = 'F';
	
	(function () {
	  for (var index in patternChars) {
	    calendarIndexMap[patternChars[index]] = index;
	  }
	})();
	
	function mix(t, s) {
	  for (var p in s) {
	    t[p] = s[p];
	  }
	}
	
	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g;
	var EMPTY = '';
	
	function substitute(str, o, regexp) {
	  if (typeof str !== 'string' || !o) {
	    return str;
	  }
	
	  return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
	    if (match.charAt(0) === '\\') {
	      return match.slice(1);
	    }
	    return (o[name] === undefined) ? EMPTY : o[name];
	  });
	}
	
	patternChars = patternChars.join('') + 'ahkKZE';
	
	function encode(lastField, count, compiledPattern) {
	  compiledPattern.push({
	    field: lastField,
	    count: count
	  });
	}
	
	function compile(pattern) {
	  var length = pattern.length;
	  var inQuote = false;
	  var compiledPattern = [];
	  var tmpBuffer = null;
	  var count = 0;
	  var lastField = -1;
	
	  for (var i = 0; i < length; i++) {
	    var c = pattern.charAt(i);
	
	    if (c === '\'') {
	      // '' is treated as a single quote regardless of being
	      // in a quoted section.
	      if ((i + 1) < length) {
	        c = pattern.charAt(i + 1);
	        if (c === '\'') {
	          i++;
	          if (count !== 0) {
	            encode(lastField, count, compiledPattern);
	            lastField = -1;
	            count = 0;
	          }
	          if (inQuote) {
	            tmpBuffer += c;
	          }
	          continue;
	        }
	      }
	      if (!inQuote) {
	        if (count !== 0) {
	          encode(lastField, count, compiledPattern);
	          lastField = -1;
	          count = 0;
	        }
	        tmpBuffer = '';
	        inQuote = true;
	      } else {
	        compiledPattern.push({
	          text: tmpBuffer
	        });
	        inQuote = false;
	      }
	      continue;
	    }
	    if (inQuote) {
	      tmpBuffer += c;
	      continue;
	    }
	    if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
	      if (count !== 0) {
	        encode(lastField, count, compiledPattern);
	        lastField = -1;
	        count = 0;
	      }
	      compiledPattern.push({
	        text: c
	      });
	      continue;
	    }
	
	    if (patternChars.indexOf(c) === -1) {
	      throw new Error('Illegal pattern character "' + c + '"');
	    }
	
	    if (lastField === -1 || lastField === c) {
	      lastField = c;
	      count++;
	      continue;
	    }
	    encode(lastField, count, compiledPattern);
	    lastField = c;
	    count = 1;
	  }
	
	  if (inQuote) {
	    throw new Error('Unterminated quote');
	  }
	
	  if (count !== 0) {
	    encode(lastField, count, compiledPattern);
	  }
	
	  return compiledPattern;
	}
	
	var zeroDigit = '0';
	
	// TODO zeroDigit localization??
	function zeroPaddingNumber(value, minDigits, maxDigits, buffer) {
	  // Optimization for 1, 2 and 4 digit numbers. This should
	  // cover most cases of formatting date/time related items.
	  // Note: This optimization code assumes that maxDigits is
	  // either 2 or Integer.MAX_VALUE (maxIntCount in format()).
	  buffer = buffer || [];
	  maxDigits = maxDigits || MAX_VALUE;
	  if (value >= 0) {
	    if (value < 100 && minDigits >= 1 && minDigits <= 2) {
	      if (value < 10 && minDigits === 2) {
	        buffer.push(zeroDigit);
	      }
	      buffer.push(value);
	      return buffer.join('');
	    } else if (value >= 1000 && value < 10000) {
	      if (minDigits === 4) {
	        buffer.push(value);
	        return buffer.join('');
	      }
	      if (minDigits === 2 && maxDigits === 2) {
	        return zeroPaddingNumber(value % 100, 2, 2, buffer);
	      }
	    }
	  }
	  buffer.push(value + '');
	  return buffer.join('');
	}
	
	/**
	 *
	 * date time formatter for GregorianCalendar
	 *
	 *      @example
	 *
	 *          var calendar = new GregorianCalendar(2013,9,24);
	 *          // ' to escape
	 *          var formatter = new GregorianCalendarFormat("'today is' ''yyyy/MM/dd a''");
	 *          document.write(formatter.format(calendar));
	 *
	 * @class GregorianCalendarFormat
	 * @param {String} pattern patter string of date formatter
	 *
	 * <table border="1">
	 * <thead valign="bottom">
	 * <tr><th class="head">Letter</th>
	 * <th class="head">Date or Time Component</th>
	 * <th class="head">Presentation</th>
	 * <th class="head">Examples</th>
	 * </tr>
	 * </thead>
	 * <tbody valign="top">
	 * <tr><td>G</td>
	 * <td>Era designator</td>
	 * <td>Text</td>
	 * <td>AD</td>
	 * </tr>
	 * <tr><td>y</td>
	 * <td>Year</td>
	 * <td>Year</td>
	 * <td>1996; 96</td>
	 * </tr>
	 * <tr><td>M</td>
	 * <td>Month in year</td>
	 * <td>Month</td>
	 * <td>July; Jul; 07</td>
	 * </tr>
	 * <tr><td>w</td>
	 * <td>Week in year</td>
	 * <td>Number</td>
	 * <td>27</td>
	 * </tr>
	 * <tr><td>W</td>
	 * <td>Week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>D</td>
	 * <td>Day in year</td>
	 * <td>Number</td>
	 * <td>189</td>
	 * </tr>
	 * <tr><td>d</td>
	 * <td>Day in month</td>
	 * <td>Number</td>
	 * <td>10</td>
	 * </tr>
	 * <tr><td>F</td>
	 * <td>Day of week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>E</td>
	 * <td>Day in week</td>
	 * <td>Text</td>
	 * <td>Tuesday; Tue</td>
	 * </tr>
	 * <tr><td>a</td>
	 * <td>Am/pm marker</td>
	 * <td>Text</td>
	 * <td>PM</td>
	 * </tr>
	 * <tr><td>H</td>
	 *       <td>Hour in day (0-23)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>k</td>
	 *       <td>Hour in day (1-24)</td>
	 * <td>Number</td>
	 * <td>24</td>
	 * </tr>
	 * <tr><td>K</td>
	 * <td>Hour in am/pm (0-11)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>h</td>
	 * <td>Hour in am/pm (1-12)</td>
	 * <td>Number</td>
	 * <td>12</td>
	 * </tr>
	 * <tr><td>m</td>
	 * <td>Minute in hour</td>
	 * <td>Number</td>
	 * <td>30</td>
	 * </tr>
	 * <tr><td>s</td>
	 * <td>Second in minute</td>
	 * <td>Number</td>
	 * <td>55</td>
	 * </tr>
	 * <tr><td>S</td>
	 * <td>Millisecond</td>
	 * <td>Number</td>
	 * <td>978</td>
	 * </tr>
	 * <tr><td>x/z</td>
	 * <td>Time zone</td>
	 * <td>General time zone</td>
	 * <td>Pacific Standard Time; PST; GMT-08:00</td>
	 * </tr>
	 * <tr><td>Z</td>
	 * <td>Time zone</td>
	 * <td>RFC 822 time zone</td>
	 * <td>-0800</td>
	 * </tr>
	 * </tbody>
	 * </table>
	
	 * @param {Object} locale format locale
	 */
	function DateTimeFormat(pattern, locale) {
	  this.locale = locale || enUsLocale;
	  this.originalPattern = pattern;
	  this.pattern = compile(pattern);
	}
	
	function formatField(field, count, locale, calendar) {
	  var current,
	    value;
	  switch (field) {
	    case 'G':
	      value = calendar.getYear() > 0 ? 1 : 0;
	      current = locale.eras[value];
	      break;
	    case 'y':
	      value = calendar.getYear();
	      if (value <= 0) {
	        value = 1 - value;
	      }
	      current = (zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2));
	      break;
	    case 'M':
	      value = calendar.getMonth();
	      if (count >= 4) {
	        current = locale.months[value];
	      } else if (count === 3) {
	        current = locale.shortMonths[value];
	      } else {
	        current = zeroPaddingNumber(value + 1, count);
	      }
	      break;
	    case 'k':
	      current = zeroPaddingNumber(calendar.getHourOfDay() || 24,
	        count);
	      break;
	    case 'E':
	      value = calendar.getDayOfWeek();
	      current = count >= 4 ?
	        locale.weekdays[value] :
	        locale.shortWeekdays[value];
	      break;
	    case 'a':
	      current = locale.ampms[calendar.getHourOfDay() >= 12 ?
	        1 :
	        0];
	      break;
	    case 'h':
	      current = zeroPaddingNumber(calendar.
	        getHourOfDay() % 12 || 12, count);
	      break;
	    case 'K':
	      current = zeroPaddingNumber(calendar.
	        getHourOfDay() % 12, count);
	      break;
	    case 'Z':
	      var offset = calendar.getTimezoneOffset();
	      var parts = [offset < 0 ? '-' : '+'];
	      offset = Math.abs(offset);
	      parts.push(zeroPaddingNumber(Math.floor(offset / 60) % 100, 2),
	        zeroPaddingNumber(offset % 60, 2));
	      current = parts.join('');
	      break;
	    default :
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W':
	      var index = calendarIndexMap[field];
	      value = calendar.get(index);
	      current = zeroPaddingNumber(value, count);
	  }
	  return current;
	}
	
	function matchField(dateStr, startIndex, matches) {
	  var matchedLen = -1;
	  var index = -1;
	  var i;
	  var len = matches.length;
	  for (i = 0; i < len; i++) {
	    var m = matches[i];
	    var mLen = m.length;
	    if (mLen > matchedLen &&
	      matchPartString(dateStr, startIndex, m, mLen)) {
	      matchedLen = mLen;
	      index = i;
	    }
	  }
	  return index >= 0 ? {
	    value: index,
	    startIndex: startIndex + matchedLen
	  } : null;
	}
	
	function matchPartString(dateStr, startIndex, match, mLen) {
	  for (var i = 0; i < mLen; i++) {
	    if (dateStr.charAt(startIndex + i) !== match.charAt(i)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function getLeadingNumberLen(str) {
	  var i, c;
	  var len = str.length;
	  for (i = 0; i < len; i++) {
	    c = str.charAt(i);
	    if (c < '0' || c > '9') {
	      break;
	    }
	  }
	  return i;
	}
	
	function matchNumber(dateStr, startIndex, count, obeyCount) {
	  var str = dateStr;
	  var n;
	  if (obeyCount) {
	    if (dateStr.length <= startIndex + count) {
	      return null;
	    }
	    str = dateStr.slice(startIndex, startIndex + count);
	    if (!str.match(/^\d+$/)) {
	      throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + (this.originalPattern));
	    }
	  } else {
	    str = str.slice(startIndex);
	  }
	  n = parseInt(str, 10);
	  if (isNaN(n)) {
	    throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + (this.originalPattern));
	  }
	  return {
	    value: n,
	    startIndex: startIndex + getLeadingNumberLen(str)
	  };
	}
	
	function parseField(calendar, dateStr, startIndex, field, count, obeyCount, tmp) {
	  var match, year, hour;
	  if (dateStr.length <= startIndex) {
	    return startIndex;
	  }
	  var locale = this.locale;
	  switch (field) {
	    case 'G':
	      if ((match = matchField(dateStr, startIndex, locale.eras))) {
	        if (calendar.isSetYear()) {
	          if (match.value === 0) {
	            year = calendar.getYear();
	            calendar.setYear(1 - year);
	          }
	        } else {
	          tmp.era = match.value;
	        }
	      }
	      break;
	    case 'y':
	      if ((match = matchNumber.call(this, dateStr, startIndex, count, obeyCount))) {
	        year = match.value;
	        if ('era' in tmp) {
	          if (tmp.era === 0) {
	            year = 1 - year;
	          }
	        }
	        calendar.setYear(year);
	      }
	      break;
	    case 'M':
	      var month;
	      if (count >= 3) {
	        if ((match = matchField(dateStr, startIndex, locale[count === 3 ?
	            'shortMonths' : 'months']))) {
	          month = match.value;
	        }
	      } else {
	        if ((match = matchNumber.call(this, dateStr, startIndex, count, obeyCount))) {
	          month = match.value - 1;
	        }
	      }
	      if (match) {
	        calendar.setMonth(month);
	      }
	      break;
	    case 'k':
	      if ((match = matchNumber.call(this, dateStr, startIndex, count, obeyCount))) {
	        calendar.setHourOfDay(match.value % 24);
	      }
	      break;
	    case 'E':
	      if ((match = matchField(dateStr, startIndex, locale[count > 3 ?
	          'weekdays' :
	          'shortWeekdays']))) {
	        calendar.setDayOfWeek(match.value);
	      }
	      break;
	    case 'a':
	      if ((match = matchField(dateStr, startIndex, locale.ampms))) {
	        if (calendar.isSetHourOfDay()) {
	          if (match.value) {
	            hour = calendar.getHourOfDay();
	            if (hour < 12) {
	              calendar.setHourOfDay((hour + 12) % 24);
	            }
	          }
	        } else {
	          tmp.ampm = match.value;
	        }
	      }
	      break;
	    case 'h':
	      if ((match = matchNumber.call(this, dateStr, startIndex, count, obeyCount))) {
	        hour = match.value %= 12;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'K':
	      if ((match = matchNumber.call(this, dateStr, startIndex, count, obeyCount))) {
	        hour = match.value;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'Z':
	      var sign = 1;
	      var zoneChar = dateStr.charAt(startIndex);
	      if (zoneChar === '-') {
	        sign = -1;
	        startIndex++;
	      } else if (zoneChar === '+') {
	        startIndex++;
	      } else {
	        break;
	      }
	      if ((match = matchNumber.call(this, dateStr, startIndex, 2, true))) {
	        var zoneOffset = match.value * 60;
	        startIndex = match.startIndex;
	        if ((match = matchNumber.call(this, dateStr, startIndex, 2, true))) {
	          zoneOffset += match.value;
	        }
	        calendar.setTimezoneOffset(zoneOffset);
	      }
	      break;
	    default :
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W'
	      if ((match = matchNumber.call(this, dateStr, startIndex, count, obeyCount))) {
	        var index = calendarIndexMap[field];
	        calendar.set(index, match.value);
	      }
	  }
	  if (match) {
	    startIndex = match.startIndex;
	  }
	  return startIndex;
	}
	
	mix(DateTimeFormat.prototype, {
	  /**
	   * format a GregorianDate instance according to specified pattern
	   * @param {GregorianCalendar} calendar GregorianDate instance
	   * @returns {string} formatted string of GregorianDate instance
	   */
	  format: function (calendar) {
	    if (!calendar.isGregorianCalendar) {
	      throw new Error('calendar must be type of GregorianCalendar');
	    }
	    var i;
	    var ret = [];
	    var pattern = this.pattern;
	    var len = pattern.length;
	    for (i = 0; i < len; i++) {
	      var comp = pattern[i];
	      if (comp.text) {
	        ret.push(comp.text);
	      } else if ('field' in comp) {
	        ret.push(formatField(comp.field, comp.count, this.locale, calendar));
	      }
	    }
	    return ret.join('');
	  },
	
	  /**
	   * parse a formatted string of GregorianDate instance according to specified pattern
	   * @param {String} dateStr formatted string of GregorianDate
	   * @returns {GregorianCalendar}
	   */
	  parse: function (dateStr, calendarLocale) {
	    var calendar = new GregorianCalendar(calendarLocale);
	    var i;
	    var j;
	    var tmp = {};
	    var obeyCount = false;
	    var dateStrLen = dateStr.length;
	    var errorIndex = -1;
	    var startIndex = 0;
	    var oldStartIndex = 0;
	    var pattern = this.pattern;
	    var len = pattern.length;
	
	    loopPattern: {
	      for (i = 0; errorIndex < 0 && i < len; i++) {
	        var comp = pattern[i], text, textLen;
	        oldStartIndex = startIndex;
	        if ((text = comp.text)) {
	          textLen = text.length;
	          if ((textLen + startIndex) > dateStrLen) {
	            errorIndex = startIndex;
	          } else {
	            for (j = 0; j < textLen; j++) {
	              if (text.charAt(j) !== dateStr.charAt(j + startIndex)) {
	                errorIndex = startIndex;
	                break loopPattern;
	              }
	            }
	            startIndex += textLen;
	          }
	        } else if ('field' in comp) {
	          obeyCount = false;
	          var nextComp = pattern[i + 1];
	          if (nextComp) {
	            if ('field' in nextComp) {
	              obeyCount = true;
	            } else {
	              var c = nextComp.text.charAt(0);
	              if (c >= '0' && c <= '9') {
	                obeyCount = true;
	              }
	            }
	          }
	          startIndex = parseField.call(this, calendar,
	            dateStr,
	            startIndex,
	            comp.field,
	            comp.count,
	            obeyCount,
	            tmp);
	          if (startIndex === oldStartIndex) {
	            errorIndex = startIndex;
	          }
	        }
	      }
	    }
	
	    if (errorIndex >= 0) {
	      console.error('error when parsing date');
	      console.error(dateStr);
	      console.error(dateStr.slice(0, errorIndex) + '^');
	      return undefined;
	    }
	    return calendar;
	  }
	});
	
	mix(DateTimeFormat, {
	  Style: DateTimeStyle,
	
	  /**
	   * get a formatter instance of short style pattern.
	   * en-us: M/d/yy h:mm a
	   * zh-cn: yy-M-d ah:mm
	   * @param {Object} locale locale object
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getInstance: function (locale) {
	    return this.getDateTimeInstance(DateTimeStyle.SHORT, DateTimeStyle.SHORT, locale);
	  },
	
	  /**
	   * get a formatter instance of specified date style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getDateInstance: function (dateStyle, locale) {
	    return this.getDateTimeInstance(dateStyle, undefined, locale);
	  },
	
	  /**
	   * get a formatter instance of specified date style and time style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getDateTimeInstance: function (dateStyle, timeStyle, locale) {
	    locale = locale || enUsLocale;
	    var datePattern = '';
	    if (dateStyle !== undefined) {
	      datePattern = locale.datePatterns[dateStyle];
	    }
	    var timePattern = '';
	    if (timeStyle !== undefined) {
	      timePattern = locale.timePatterns[timeStyle];
	    }
	    var pattern = datePattern;
	    if (timePattern) {
	      if (datePattern) {
	        pattern = substitute(locale.dateTimePattern, {
	          date: datePattern,
	          time: timePattern
	        });
	      } else {
	        pattern = timePattern;
	      }
	    }
	    return new DateTimeFormat(pattern, locale);
	  },
	
	  /**
	   * get a formatter instance of specified time style.
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getTimeInstance: function (timeStyle, locale) {
	    return this.getDateTimeInstance(undefined, timeStyle, locale);
	  }
	});
	
	module.exports = DateTimeFormat;
	
	DateTimeFormat.version = '@VERSION@';
	
	// gc_format@163.com

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(52);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * GregorianCalendar class
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	var toInt = parseInt;
	var Utils = __webpack_require__(53);
	var defaultLocale = __webpack_require__(55);
	var Const = __webpack_require__(54);
	
	/**
	 * GregorianCalendar class.
	 *
	 * - no arguments:
	 *   Constructs a default GregorianCalendar using the current time
	 *   in the default time zone with the default locale.
	 * - one argument locale:
	 *   Constructs a GregorianCalendar
	 *   based on the current time in the default time zone with the given locale.
	 *
	 * @class Date.Gregorian
	 */
	function GregorianCalendar(locale) {
	  locale = locale || defaultLocale;
	
	  this.locale = locale;
	
	  this.fields = [];
	
	  /**
	   * The currently set time for this date.
	   * @protected
	   * @type Number|undefined
	   */
	  this.time = undefined;
	  /**
	   * The timezoneOffset in minutes used by this date.
	   * @type Number
	   * @protected
	   */
	
	  this.timezoneOffset = locale.timezoneOffset;
	
	  /**
	   * The first day of the week
	   * @type Number
	   * @protected
	   */
	  this.firstDayOfWeek = locale.firstDayOfWeek;
	
	  /**
	   * The number of days required for the first week in a month or year,
	   * with possible values from 1 to 7.
	   * @@protected
	   * @type Number
	   */
	  this.minimalDaysInFirstWeek = locale.minimalDaysInFirstWeek;
	
	  this.fieldsComputed = false;
	}
	
	Utils.mix(GregorianCalendar, Const);
	
	Utils.mix(GregorianCalendar, {
	  Utils: Utils,
	
	  defaultLocale: defaultLocale,
	
	  /**
	   * Determines if the given year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @param {Number} year the given year.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @static
	   * @method
	   */
	  isLeapYear: Utils.isLeapYear,
	
	  /**
	   * Enum indicating year field of date
	   * @type Number
	   */
	  YEAR: 1,
	  /**
	   * Enum indicating month field of date
	   * @type Number
	   */
	  MONTH: 2,
	  /**
	   * Enum indicating the day of the month
	   * @type Number
	   */
	  DAY_OF_MONTH: 3,
	  /**
	   * Enum indicating the hour (24).
	   * @type Number
	   */
	  HOUR_OF_DAY: 4,
	  /**
	   * Enum indicating the minute of the day
	   * @type Number
	   */
	  MINUTES: 5,
	  /**
	   * Enum indicating the second of the day
	   * @type Number
	   */
	  SECONDS: 6,
	  /**
	   * Enum indicating the millisecond of the day
	   * @type Number
	   */
	  MILLISECONDS: 7,
	  /**
	   * Enum indicating the week number within the current year
	   * @type Number
	   */
	  WEEK_OF_YEAR: 8,
	  /**
	   * Enum indicating the week number within the current month
	   * @type Number
	   */
	  WEEK_OF_MONTH: 9,
	
	  /**
	   * Enum indicating the day of the day number within the current year
	   * @type Number
	   */
	  DAY_OF_YEAR: 10,
	  /**
	   * Enum indicating the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK: 11,
	  /**
	   * Enum indicating the day of the ordinal number of the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK_IN_MONTH: 12,
	
	  /**
	   * Enum indicating am
	   * @type Number
	   */
	  AM: 0,
	  /**
	   * Enum indicating pm
	   * @type Number
	   */
	  PM: 1
	});
	
	var fields = ['',
	  'Year', 'Month', 'DayOfMonth',
	  'HourOfDay',
	  'Minutes', 'Seconds', 'Milliseconds', 'WeekOfYear',
	  'WeekOfMonth', 'DayOfYear', 'DayOfWeek',
	  'DayOfWeekInMonth'
	];
	
	var YEAR = GregorianCalendar.YEAR;
	var MONTH = GregorianCalendar.MONTH;
	var DAY_OF_MONTH = GregorianCalendar.DAY_OF_MONTH;
	var HOUR_OF_DAY = GregorianCalendar.HOUR_OF_DAY;
	var MINUTE = GregorianCalendar.MINUTES;
	var SECONDS = GregorianCalendar.SECONDS;
	
	var MILLISECONDS = GregorianCalendar.MILLISECONDS;
	var DAY_OF_WEEK_IN_MONTH = GregorianCalendar.DAY_OF_WEEK_IN_MONTH;
	var DAY_OF_YEAR = GregorianCalendar.DAY_OF_YEAR;
	var DAY_OF_WEEK = GregorianCalendar.DAY_OF_WEEK;
	
	var WEEK_OF_MONTH = GregorianCalendar.WEEK_OF_MONTH;
	var WEEK_OF_YEAR = GregorianCalendar.WEEK_OF_YEAR;
	
	var MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	var LEAP_MONTH_LENGTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	
	var ONE_SECOND = 1000;
	var ONE_MINUTE = 60 * ONE_SECOND;
	var ONE_HOUR = 60 * ONE_MINUTE;
	var ONE_DAY = 24 * ONE_HOUR;
	var ONE_WEEK = ONE_DAY * 7;
	
	var EPOCH_OFFSET = 719163; // Fixed date of January 1, 1970 (Gregorian)
	
	var mod = Utils.mod,
	  isLeapYear = Utils.isLeapYear,
	  floorDivide = Math.floor;
	
	var MIN_VALUES = [
	  undefined,
	  1,              // YEAR
	  GregorianCalendar.JANUARY,        // MONTH
	  1,              // DAY_OF_MONTH
	  0,              // HOUR_OF_DAY
	  0,              // MINUTE
	  0,              // SECONDS
	  0,              // MILLISECONDS
	
	  1,              // WEEK_OF_YEAR
	  undefined,              // WEEK_OF_MONTH
	
	  1,              // DAY_OF_YEAR
	  GregorianCalendar.SUNDAY,         // DAY_OF_WEEK
	  1             // DAY_OF_WEEK_IN_MONTH
	];
	
	var MAX_VALUES = [
	  undefined,
	  292278994,      // YEAR
	  GregorianCalendar.DECEMBER,       // MONTH
	  undefined, // DAY_OF_MONTH
	  23,             // HOUR_OF_DAY
	  59,             // MINUTE
	  59,             // SECONDS
	  999,            // MILLISECONDS
	  undefined,             // WEEK_OF_YEAR
	  undefined,              // WEEK_OF_MONTH
	  undefined,            // DAY_OF_YEAR
	  GregorianCalendar.SATURDAY,       // DAY_OF_WEEK
	  undefined              // DAY_OF_WEEK_IN_MONTH
	];
	
	GregorianCalendar.prototype = {
	  constructor: GregorianCalendar,
	
	  isGregorianCalendar: 1,
	
	  /**
	   * Determines if current year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @method
	   * @member Date.Gregorian
	   */
	  isLeapYear: function () {
	    return isLeapYear(this.getYear());
	  },
	
	  /**
	   * Return local info for current date instance
	   * @returns {Object}
	   */
	  getLocale: function () {
	    return this.locale;
	  },
	
	  /**
	   * Returns the minimum value for
	   * the given calendar field of this GregorianCalendar instance.
	   * The minimum value is defined as the smallest value
	   * returned by the get method for any possible time value,
	   * taking into consideration the current values of the getFirstDayOfWeek,
	   * getMinimalDaysInFirstWeek.
	   * @param field the calendar field.
	   * @returns {Number} the minimum value for the given calendar field.
	   */
	  getActualMinimum: function (field) {
	    if (MIN_VALUES[field] !== undefined) {
	      return MIN_VALUES[field];
	    }
	
	    var fields = this.fields;
	    if (field === WEEK_OF_MONTH) {
	      var cal = this.clone();
	      cal.clear();
	      cal.set(fields[YEAR], fields[MONTH], 1);
	      return cal.get(WEEK_OF_MONTH);
	    }
	
	    throw new Error('minimum value not defined!');
	  },
	
	  /**
	   * Returns the maximum value for the given calendar field
	   * of this GregorianCalendar instance.
	   * The maximum value is defined as the largest value returned
	   * by the get method for any possible time value, taking into consideration
	   * the current values of the getFirstDayOfWeek, getMinimalDaysInFirstWeek methods.
	   * @param field the calendar field.
	   * @returns {Number} the maximum value for the given calendar field.
	   */
	  getActualMaximum: function (field) {
	    if (MAX_VALUES[field] !== undefined) {
	      return MAX_VALUES[field];
	    }
	    var value,
	      fields = this.fields;
	    switch (field) {
	      case DAY_OF_MONTH:
	        value = getMonthLength(fields[YEAR], fields[MONTH]);
	        break;
	
	      case WEEK_OF_YEAR:
	        var endOfYear = this.clone();
	        endOfYear.clear();
	        endOfYear.set(fields[YEAR], GregorianCalendar.DECEMBER, 31);
	        value = endOfYear.get(WEEK_OF_YEAR);
	        if (value === 1) {
	          value = 52;
	        }
	        break;
	
	      case WEEK_OF_MONTH:
	        var endOfMonth = this.clone();
	        endOfMonth.clear();
	        endOfMonth.set(fields[YEAR], fields[MONTH], getMonthLength(fields[YEAR], fields[MONTH]));
	        value = endOfMonth.get(WEEK_OF_MONTH);
	        break;
	
	      case DAY_OF_YEAR:
	        value = getYearLength(fields[YEAR]);
	        break;
	
	      case DAY_OF_WEEK_IN_MONTH:
	        value = toInt((getMonthLength(fields[YEAR], fields[MONTH]) - 1) / 7) + 1;
	        break;
	    }
	    if (value === undefined) {
	      throw new Error('maximum value not defined!');
	    }
	    return value;
	  },
	
	  /**
	   * Determines if the given calendar field has a value set,
	   * including cases that the value has been set by internal fields calculations
	   * triggered by a get method call.
	   * @param field the calendar field to be cleared.
	   * @returns {boolean} true if the given calendar field has a value set; false otherwise.
	   */
	  isSet: function (field) {
	    return this.fields[field] !== undefined;
	  },
	
	  /**
	   * Converts the time value (millisecond offset from the Epoch)
	   * to calendar field values.
	   * @protected
	   */
	  computeFields: function () {
	    var time = this.time;
	    var timezoneOffset = this.timezoneOffset * ONE_MINUTE;
	    var fixedDate = toInt(timezoneOffset / ONE_DAY);
	    var timeOfDay = timezoneOffset % ONE_DAY;
	    fixedDate += toInt(time / ONE_DAY);
	    timeOfDay += time % ONE_DAY;
	    if (timeOfDay >= ONE_DAY) {
	      timeOfDay -= ONE_DAY;
	      fixedDate++;
	    } else {
	      while (timeOfDay < 0) {
	        timeOfDay += ONE_DAY;
	        fixedDate--;
	      }
	    }
	
	    fixedDate += EPOCH_OFFSET;
	
	    var date = Utils.getGregorianDateFromFixedDate(fixedDate);
	
	    var year = date.year;
	
	    var fields = this.fields;
	    fields[YEAR] = year;
	    fields[MONTH] = date.month;
	    fields[DAY_OF_MONTH] = date.dayOfMonth;
	    fields[DAY_OF_WEEK] = date.dayOfWeek;
	
	    if (timeOfDay !== 0) {
	      fields[HOUR_OF_DAY] = toInt(timeOfDay / ONE_HOUR);
	      var r = timeOfDay % ONE_HOUR;
	      fields[MINUTE] = toInt(r / ONE_MINUTE);
	      r %= ONE_MINUTE;
	      fields[SECONDS] = toInt(r / ONE_SECOND);
	      fields[MILLISECONDS] = r % ONE_SECOND;
	    } else {
	      fields[HOUR_OF_DAY] =
	        fields[MINUTE] =
	          fields[SECONDS] =
	            fields[MILLISECONDS] = 0;
	    }
	
	    var fixedDateJan1 = Utils.getFixedDate(year, GregorianCalendar.JANUARY, 1);
	    var dayOfYear = fixedDate - fixedDateJan1 + 1;
	    var fixDateMonth1 = fixedDate - date.dayOfMonth + 1;
	
	    fields[DAY_OF_YEAR] = dayOfYear;
	    fields[DAY_OF_WEEK_IN_MONTH] = toInt((date.dayOfMonth - 1) / 7) + 1;
	
	    var weekOfYear = getWeekNumber(this, fixedDateJan1, fixedDate);
	
	    // 本周没有足够的时间在当前年
	    if (weekOfYear === 0) {
	      // If the date belongs to the last week of the
	      // previous year, use the week number of "12/31" of
	      // the "previous" year.
	      var fixedDec31 = fixedDateJan1 - 1;
	      var prevJan1 = fixedDateJan1 - getYearLength(year - 1);
	      weekOfYear = getWeekNumber(this, prevJan1, fixedDec31);
	    } else
	    // 本周是年末最后一周，可能有足够的时间在新的一年
	    if (weekOfYear >= 52) {
	      var nextJan1 = fixedDateJan1 + getYearLength(year);
	      var nextJan1st = getDayOfWeekDateOnOrBefore(nextJan1 + 6, this.firstDayOfWeek);
	      var nDays = nextJan1st - nextJan1;
	      // 本周有足够天数在新的一年
	      if (nDays >= this.minimalDaysInFirstWeek &&
	          // 当天确实在本周，weekOfYear === 53 时是不需要这个判断
	        fixedDate >= (nextJan1st - 7)
	      ) {
	        weekOfYear = 1;
	      }
	    }
	
	    fields[WEEK_OF_YEAR] = weekOfYear;
	    fields[WEEK_OF_MONTH] = getWeekNumber(this, fixDateMonth1, fixedDate);
	
	    this.fieldsComputed = true;
	  },
	
	  /**
	   * Converts calendar field values to the time value
	   * (millisecond offset from the Epoch).
	   * @protected
	   */
	  computeTime: function () {
	    if (!this.isSet(YEAR)) {
	      throw new Error('year must be set for GregorianCalendar');
	    }
	
	    var fields = this.fields;
	
	    var year = fields[YEAR];
	    var timeOfDay = 0;
	    if (this.isSet(HOUR_OF_DAY)) {
	      timeOfDay += fields[HOUR_OF_DAY];
	    }
	    timeOfDay *= 60;
	    timeOfDay += fields[MINUTE] || 0;
	    timeOfDay *= 60;
	    timeOfDay += fields[SECONDS] || 0;
	    timeOfDay *= 1000;
	    timeOfDay += fields[MILLISECONDS] || 0;
	
	    var fixedDate = 0;
	
	    fields[YEAR] = year;
	
	    fixedDate = fixedDate + this.getFixedDate();
	
	    // millis represents local wall-clock time in milliseconds.
	    var millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;
	
	    millis -= this.timezoneOffset * ONE_MINUTE;
	
	    this.time = millis;
	
	    this.computeFields();
	  },
	
	  /**
	   * Fills in any unset fields in the calendar fields. First,
	   * the computeTime() method is called if the time value (millisecond offset from the Epoch)
	   * has not been calculated from calendar field values.
	   * Then, the computeFields() method is called to calculate all calendar field values.
	   * @protected
	   */
	  complete: function () {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    if (!this.fieldsComputed) {
	      this.computeFields();
	    }
	  },
	
	  getFixedDate: function () {
	
	    var self = this;
	
	    var fields = self.fields;
	
	    var firstDayOfWeekCfg = self.firstDayOfWeek;
	
	    var year = fields[YEAR];
	
	    var month = GregorianCalendar.JANUARY;
	
	    if (self.isSet(MONTH)) {
	      month = fields[MONTH];
	      if (month > GregorianCalendar.DECEMBER) {
	        year += toInt(month / 12);
	        month %= 12;
	      } else if (month < GregorianCalendar.JANUARY) {
	        year += floorDivide(month / 12);
	        month = mod(month, 12);
	      }
	    }
	
	    // Get the fixed date since Jan 1, 1 (Gregorian). We are on
	    // the first day of either `month' or January in 'year'.
	    var fixedDate = Utils.getFixedDate(year, month, 1);
	    var firstDayOfWeek;
	    var dayOfWeek = self.firstDayOfWeek;
	
	    if (self.isSet(DAY_OF_WEEK)) {
	      dayOfWeek = fields[DAY_OF_WEEK];
	    }
	
	    if (self.isSet(MONTH)) {
	      if (self.isSet(DAY_OF_MONTH)) {
	        fixedDate += fields[DAY_OF_MONTH] - 1;
	      } else {
	        if (self.isSet(WEEK_OF_MONTH)) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
	
	          // If we have enough days in the first week, then
	          // move to the previous week.
	          if ((firstDayOfWeek - fixedDate) >= self.minimalDaysInFirstWeek) {
	            firstDayOfWeek -= 7;
	          }
	
	          if (dayOfWeek !== firstDayOfWeekCfg) {
	            firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	          }
	
	          fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_MONTH] - 1);
	        } else {
	          var dowim;
	          if (self.isSet(DAY_OF_WEEK_IN_MONTH)) {
	            dowim = fields[DAY_OF_WEEK_IN_MONTH];
	          } else {
	            dowim = 1;
	          }
	          var lastDate = (7 * dowim);
	          if (dowim < 0) {
	            lastDate = getMonthLength(year, month) + (7 * (dowim + 1));
	          }
	          fixedDate = getDayOfWeekDateOnOrBefore(fixedDate + lastDate - 1, dayOfWeek);
	        }
	      }
	    } else {
	      // We are on the first day of the year.
	      if (self.isSet(DAY_OF_YEAR)) {
	        fixedDate += fields[DAY_OF_YEAR] - 1;
	      } else {
	        firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
	        // If we have enough days in the first week, then move
	        // to the previous week.
	        if ((firstDayOfWeek - fixedDate) >= self.minimalDaysInFirstWeek) {
	          firstDayOfWeek -= 7;
	        }
	        if (dayOfWeek !== firstDayOfWeekCfg) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	        }
	        fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_YEAR] - 1);
	      }
	    }
	
	    return fixedDate;
	  },
	
	  /**
	   * Returns this Calendar's time value in milliseconds
	   * @member Date.Gregorian
	   * @returns {Number} the current time as UTC milliseconds from the epoch.
	   */
	  getTime: function () {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    return this.time;
	  },
	
	  /**
	   * Sets this Calendar's current time from the given long value.
	   * @param time the new time in UTC milliseconds from the epoch.
	   */
	  setTime: function (time) {
	    this.time = time;
	    this.fieldsComputed = false;
	    this.complete();
	  },
	
	  /**
	   * Returns the value of the given calendar field.
	   * @param field the given calendar field.
	   * @returns {Number} the value for the given calendar field.
	   */
	  get: function (field) {
	    this.complete();
	    return this.fields[field];
	  },
	
	  /**
	   * Returns the year of the given calendar field.
	   * @method getYear
	   * @returns {Number} the year for the given calendar field.
	   */
	
	  /**
	   * Returns the month of the given calendar field.
	   * @method getMonth
	   * @returns {Number} the month for the given calendar field.
	   */
	
	  /**
	   * Returns the day of month of the given calendar field.
	   * @method getDayOfMonth
	   * @returns {Number} the day of month for the given calendar field.
	   */
	
	  /**
	   * Returns the hour of day of the given calendar field.
	   * @method getHourOfDay
	   * @returns {Number} the hour of day for the given calendar field.
	   */
	
	  /**
	   * Returns the minute of the given calendar field.
	   * @method getMinute
	   * @returns {Number} the minute for the given calendar field.
	   */
	
	  /**
	   * Returns the second of the given calendar field.
	   * @method getSecond
	   * @returns {Number} the second for the given calendar field.
	   */
	
	  /**
	   * Returns the millisecond of the given calendar field.
	   * @method getMilliSecond
	   * @returns {Number} the millisecond for the given calendar field.
	   */
	
	  /**
	   * Returns the week of year of the given calendar field.
	   * @method getWeekOfYear
	   * @returns {Number} the week of year for the given calendar field.
	   */
	
	  /**
	   * Returns the week of month of the given calendar field.
	   * @method getWeekOfMonth
	   * @returns {Number} the week of month for the given calendar field.
	   */
	
	  /**
	   * Returns the day of year of the given calendar field.
	   * @method getDayOfYear
	   * @returns {Number} the day of year for the given calendar field.
	   */
	
	  /**
	   * Returns the day of week of the given calendar field.
	   * @method getDayOfWeek
	   * @returns {Number} the day of week for the given calendar field.
	   */
	
	  /**
	   * Returns the day of week in month of the given calendar field.
	   * @method getDayOfWeekInMonth
	   * @returns {Number} the day of week in month for the given calendar field.
	   */
	
	  /**
	   * Sets the given calendar field to the given value.
	   * @param field the given calendar field.
	   * @param v the value to be set for the given calendar field.
	   */
	  set: function (field, v) {
	    var len = arguments.length;
	    if (len === 2) {
	      this.fields[field] = v;
	    } else if (len < MILLISECONDS + 1) {
	      for (var i = 0; i < len; i++) {
	        this.fields[YEAR + i] = arguments[i];
	      }
	    } else {
	      throw  new Error('illegal arguments for GregorianCalendar set');
	    }
	    this.time = undefined;
	  },
	
	  /**
	   * Set the year of the given calendar field.
	   * @method setYear
	   */
	
	  /**
	   * Set the month of the given calendar field.
	   * @method setMonth
	   */
	
	  /**
	   * Set the day of month of the given calendar field.
	   * @method setDayOfMonth
	   */
	
	  /**
	   * Set the hour of day of the given calendar field.
	   * @method setHourOfDay
	   */
	
	  /**
	   * Set the minute of the given calendar field.
	   * @method setMinute
	   */
	
	  /**
	   * Set the second of the given calendar field.
	   * @method setSecond
	   */
	
	  /**
	   * Set the millisecond of the given calendar field.
	   * @method setMilliSecond
	   */
	
	  /**
	   * Set the week of year of the given calendar field.
	   * @method setWeekOfYear
	   */
	
	  /**
	   * Set the week of month of the given calendar field.
	   * @method setWeekOfMonth
	   */
	
	  /**
	   * Set the day of year of the given calendar field.
	   * @method setDayOfYear
	   */
	
	  /**
	   * Set the day of week of the given calendar field.
	   * @method setDayOfWeek
	   */
	
	  /**
	   * Set the day of week in month of the given calendar field.
	   * @method setDayOfWeekInMonth
	   */
	
	  /**
	   * add for specified field based on two rules:
	   *
	   *  - Add rule 1. The value of field after the call minus the value of field before the
	   *  call is amount, modulo any overflow that has occurred in field
	   *  Overflow occurs when a field value exceeds its range and,
	   *  as a result, the next larger field is incremented or
	   *  decremented and the field value is adjusted back into its range.
	   *
	   *  - Add rule 2. If a smaller field is expected to be invariant,
	   *  but it is impossible for it to be equal to its
	   *  prior value because of changes in its minimum or maximum after
	   *  field is changed, then its value is adjusted to be as close
	   *  as possible to its expected value. A smaller field represents a
	   *  smaller unit of time. HOUR_OF_DAY is a smaller field than
	   *  DAY_OF_MONTH. No adjustment is made to smaller fields
	   *  that are not expected to be invariant. The calendar system
	   *  determines what fields are expected to be invariant.
	   *
	   *
	   *      @example
	   *      use('date/gregorian',function(S, GregorianCalendar){
	         *          var d = new GregorianCalendar();
	         *          d.set(2012, GregorianCalendar.JANUARY, 31);
	         *          d.add(Gregorian.MONTH,1);
	         *          // 2012-2-29
	         *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	         *          d.add(Gregorian.MONTH,12);
	         *          // 2013-2-28
	         *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	         *      });
	   *
	   * @param field the calendar field.
	   * @param {Number} amount he amount of date or time to be added to the field.
	   */
	  add: function (field, amount) {
	    if (!amount) {
	      return;
	    }
	    var self = this;
	    var fields = self.fields;
	    // computer and retrieve original value
	    var value = self.get(field);
	    if (field === YEAR) {
	      value += amount;
	      self.set(YEAR, value);
	      adjustDayOfMonth(self);
	    } else if (field === MONTH) {
	      value += amount;
	      var yearAmount = floorDivide(value / 12);
	      value = mod(value, 12);
	      if (yearAmount) {
	        self.set(YEAR, fields[YEAR] + yearAmount);
	      }
	      self.set(MONTH, value);
	      adjustDayOfMonth(self);
	    } else {
	      switch (field) {
	        case HOUR_OF_DAY:
	          amount *= ONE_HOUR;
	          break;
	        case MINUTE:
	          amount *= ONE_MINUTE;
	          break;
	        case SECONDS:
	          amount *= ONE_SECOND;
	          break;
	        case MILLISECONDS:
	          break;
	        case WEEK_OF_MONTH:
	        case WEEK_OF_YEAR:
	        case DAY_OF_WEEK_IN_MONTH:
	          amount *= ONE_WEEK;
	          break;
	        case DAY_OF_WEEK:
	        case DAY_OF_YEAR:
	        case DAY_OF_MONTH:
	          amount *= ONE_DAY;
	          break;
	        default:
	          throw new Error('illegal field for add');
	      }
	      self.setTime(self.time + amount);
	    }
	
	  },
	
	  /**
	   * add the year of the given calendar field.
	   * @method addYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the month of the given calendar field.
	   * @method addMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of month of the given calendar field.
	   * @method addDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the hour of day of the given calendar field.
	   * @method addHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the minute of the given calendar field.
	   * @method addMinute
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the second of the given calendar field.
	   * @method addSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the millisecond of the given calendar field.
	   * @method addMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the week of year of the given calendar field.
	   * @method addWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the week of month of the given calendar field.
	   * @method addWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of year of the given calendar field.
	   * @method addDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of week of the given calendar field.
	   * @method addDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of week in month of the given calendar field.
	   * @method addDayOfWeekInMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * Get rolled value for the field
	   * @protected
	   */
	  getRolledValue: function (value, amount, min, max) {
	    var diff = value - min;
	    var range = max - min + 1;
	    amount %= range;
	    return min + (diff + amount + range) % range;
	  },
	
	  /**
	   * Adds a signed amount to the specified calendar field without changing larger fields.
	   * A negative roll amount means to subtract from field without changing
	   * larger fields. If the specified amount is 0, this method performs nothing.
	   *
	   *
	   *
	   *      @example
	   *      var d = new GregorianCalendar();
	   *      d.set(1999, GregorianCalendar.AUGUST, 31);
	   *      // 1999-4-30
	   *      // Tuesday June 1, 1999
	   *      d.set(1999, GregorianCalendar.JUNE, 1);
	   *      d.add(Gregorian.WEEK_OF_MONTH,-1); // === d.add(Gregorian.WEEK_OF_MONTH,
	   *      d.get(Gregorian.WEEK_OF_MONTH));
	   *      // 1999-06-29
	   *
	   *
	   * @param field the calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   */
	  roll: function (field, amount) {
	    if (!amount) {
	      return;
	    }
	    var self = this;
	    // computer and retrieve original value
	    var value = self.get(field);
	    var min = self.getActualMinimum(field);
	    var max = self.getActualMaximum(field);
	    value = self.getRolledValue(value, amount, min, max);
	
	    self.set(field, value);
	
	    // consider compute time priority
	    switch (field) {
	      case MONTH:
	        adjustDayOfMonth(self);
	        break;
	      default:
	        // other fields are set already when get
	        self.updateFieldsBySet(field);
	        break;
	    }
	  },
	
	  /**
	   * roll the year of the given calendar field.
	   * @method rollYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the month of the given calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   * @method rollMonth
	   */
	
	  /**
	   * roll the day of month of the given calendar field.
	   * @method rollDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the hour of day of the given calendar field.
	   * @method rollHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the minute of the given calendar field.
	   * @method rollMinute
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the second of the given calendar field.
	   * @method rollSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the millisecond of the given calendar field.
	   * @method rollMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the week of year of the given calendar field.
	   * @method rollWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the week of month of the given calendar field.
	   * @method rollWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the day of year of the given calendar field.
	   * @method rollDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the day of week of the given calendar field.
	   * @method rollDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * remove other priority fields when call getFixedDate
	   * precondition: other fields are all set or computed
	   * @protected
	   */
	  updateFieldsBySet: function (field) {
	    var fields = this.fields;
	    switch (field) {
	      case WEEK_OF_MONTH:
	        fields[DAY_OF_MONTH] = undefined;
	        break;
	      case DAY_OF_YEAR:
	        fields[MONTH] = undefined;
	        break;
	      case DAY_OF_WEEK:
	        fields[DAY_OF_MONTH] = undefined;
	        break;
	      case WEEK_OF_YEAR:
	        fields[DAY_OF_YEAR] = undefined;
	        fields[MONTH] = undefined;
	        break;
	    }
	  },
	
	  /**
	   * get current date instance's timezone offset
	   * @returns {Number}
	   */
	  getTimezoneOffset: function () {
	    return this.timezoneOffset;
	  },
	
	  /**
	   * set current date instance's timezone offset
	   */
	  setTimezoneOffset: function (timezoneOffset) {
	    if (this.timezoneOffset !== timezoneOffset) {
	      this.fieldsComputed = undefined;
	      this.timezoneOffset = timezoneOffset;
	    }
	  },
	
	  /**
	   * set first day of week for current date instance
	   */
	  setFirstDayOfWeek: function (firstDayOfWeek) {
	    if (this.firstDayOfWeek !== firstDayOfWeek) {
	      this.firstDayOfWeek = firstDayOfWeek;
	      this.fieldsComputed = false;
	    }
	  },
	
	  /**
	   * Gets what the first day of the week is; e.g., SUNDAY in the U.S., MONDAY in France.
	   * @returns {Number} the first day of the week.
	   */
	  getFirstDayOfWeek: function () {
	    return this.firstDayOfWeek;
	  },
	
	  /**
	   * Sets what the minimal days required in the first week of the year are; For example,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * call this method with value 1.
	   * If it must be a full week, use value 7.
	   * @param minimalDaysInFirstWeek the given minimal days required in the first week of the year.
	   */
	  setMinimalDaysInFirstWeek: function (minimalDaysInFirstWeek) {
	    if (this.minimalDaysInFirstWeek !== minimalDaysInFirstWeek) {
	      this.minimalDaysInFirstWeek = minimalDaysInFirstWeek;
	      this.fieldsComputed = false;
	    }
	  },
	
	  /**
	   * Gets what the minimal days required in the first week of the year are; e.g.,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * this method returns 1.
	   * If the minimal days required must be a full week, this method returns 7.
	   * @returns {Number} the minimal days required in the first week of the year.
	   */
	  getMinimalDaysInFirstWeek: function () {
	    return this.minimalDaysInFirstWeek;
	  },
	
	  /**
	   * Returns the number of weeks in the week year
	   * represented by this GregorianCalendar.
	   *
	   * For example, if this GregorianCalendar's date is
	   * December 31, 2008 with the ISO
	   * 8601 compatible setting, this method will return 53 for the
	   * period: December 29, 2008 to January 3, 2010
	   * while getActualMaximum(WEEK_OF_YEAR) will return
	   * 52 for the period: December 31, 2007 to December 28, 2008.
	   *
	   * @return {Number} the number of weeks in the week year.
	   */
	  getWeeksInWeekYear: function () {
	    var weekYear = this.getWeekYear();
	    if (weekYear === this.get(YEAR)) {
	      return this.getActualMaximum(WEEK_OF_YEAR);
	    }
	    // Use the 2nd week for calculating the max of WEEK_OF_YEAR
	    var gc = this.clone();
	    gc.clear();
	    gc.setWeekDate(weekYear, 2, this.get(DAY_OF_WEEK));
	    return gc.getActualMaximum(WEEK_OF_YEAR);
	  },
	
	  /**
	   * Returns the week year represented by this GregorianCalendar.
	   * The dates in the weeks between 1 and the
	   * maximum week number of the week year have the same week year value
	   * that may be one year before or after the calendar year value.
	   *
	   * @return {Number} the week year represented by this GregorianCalendar.
	   */
	  getWeekYear: function () {
	    var year = this.get(YEAR); // implicitly  complete
	    var weekOfYear = this.get(WEEK_OF_YEAR);
	    var month = this.get(MONTH);
	    if (month === GregorianCalendar.JANUARY) {
	      if (weekOfYear >= 52) {
	        --year;
	      }
	    } else if (month === GregorianCalendar.DECEMBER) {
	      if (weekOfYear === 1) {
	        ++year;
	      }
	    }
	    return year;
	  },
	  /**
	   * Sets this GregorianCalendar to the date given by the date specifiers - weekYear,
	   * weekOfYear, and dayOfWeek. weekOfYear follows the WEEK_OF_YEAR numbering.
	   * The dayOfWeek value must be one of the DAY_OF_WEEK values: SUNDAY to SATURDAY.
	   *
	   * @param weekYear    the week year
	   * @param weekOfYear  the week number based on weekYear
	   * @param dayOfWeek   the day of week value
	   */
	  setWeekDate: function (weekYear, weekOfYear, dayOfWeek) {
	    if (dayOfWeek < GregorianCalendar.SUNDAY || dayOfWeek > GregorianCalendar.SATURDAY) {
	      throw new Error('invalid dayOfWeek: ' + dayOfWeek);
	    }
	    var fields = this.fields;
	    // To avoid changing the time of day fields by date
	    // calculations, use a clone with the GMT time zone.
	    var gc = this.clone();
	    gc.clear();
	    gc.setTimezoneOffset(0);
	    gc.set(YEAR, weekYear);
	    gc.set(WEEK_OF_YEAR, 1);
	    gc.set(DAY_OF_WEEK, this.getFirstDayOfWeek());
	    var days = dayOfWeek - this.getFirstDayOfWeek();
	    if (days < 0) {
	      days += 7;
	    }
	    days += 7 * (weekOfYear - 1);
	    if (days !== 0) {
	      gc.add(DAY_OF_YEAR, days);
	    } else {
	      gc.complete();
	    }
	    fields[YEAR] = gc.get(YEAR);
	    fields[MONTH] = gc.get(MONTH);
	    fields[DAY_OF_MONTH] = gc.get(DAY_OF_MONTH);
	    this.complete();
	  },
	  /**
	   * Creates and returns a copy of this object.
	   * @returns {Date.Gregorian}
	   */
	  clone: function () {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    var cal = new GregorianCalendar(this.locale);
	    cal.setTimezoneOffset(cal.getTimezoneOffset());
	    cal.setFirstDayOfWeek(cal.getFirstDayOfWeek());
	    cal.setMinimalDaysInFirstWeek(cal.getMinimalDaysInFirstWeek());
	    cal.setTime(this.time);
	    return cal;
	  },
	
	  /**
	   * Compares this GregorianCalendar to the specified Object.
	   * The result is true if and only if the argument is a GregorianCalendar object
	   * that represents the same time value (millisecond offset from the Epoch)
	   * under the same Calendar parameters and Gregorian change date as this object.
	   * @param {Date.Gregorian} obj the object to compare with.
	   * @returns {boolean} true if this object is equal to obj; false otherwise.
	   */
	  equals: function (obj) {
	    return this.getTime() === obj.getTime() &&
	      this.firstDayOfWeek === obj.firstDayOfWeek &&
	      this.timezoneOffset === obj.timezoneOffset &&
	      this.minimalDaysInFirstWeek === obj.minimalDaysInFirstWeek;
	  },
	
	  /**
	   * Sets all the calendar field values or specified field and the time value
	   * (millisecond offset from the Epoch) of this Calendar undefined.
	   * This means that isSet() will return false for all the calendar fields,
	   * and the date and time calculations will treat the fields as if they had never been set.
	   * @param [field] the calendar field to be cleared.
	   */
	  clear: function (field) {
	    if (field === undefined) {
	      this.field = [];
	    } else {
	      this.fields[field] = undefined;
	    }
	    this.time = undefined;
	    this.fieldsComputed = false;
	  }
	};
	
	var GregorianCalendarProto = GregorianCalendar.prototype;
	
	Utils.each(fields, function (f, index) {
	  if (f) {
	    GregorianCalendarProto['get' + f] = function () {
	      return this.get(index);
	    };
	
	    GregorianCalendarProto['isSet' + f] = function () {
	      return this.isSet(index);
	    };
	
	    GregorianCalendarProto['set' + f] = function (v) {
	      return this.set(index, v);
	    };
	
	    GregorianCalendarProto['add' + f] = function (v) {
	      return this.add(index, v);
	    };
	
	    GregorianCalendarProto['roll' + f] = function (v) {
	      return this.roll(index, v);
	    };
	  }
	});
	
	// ------------------- private start
	
	function adjustDayOfMonth(self) {
	  var fields = self.fields;
	  var year = fields[YEAR];
	  var month = fields[MONTH];
	  var monthLen = getMonthLength(year, month);
	  var dayOfMonth = fields[DAY_OF_MONTH];
	  if (dayOfMonth > monthLen) {
	    self.set(DAY_OF_MONTH, monthLen);
	  }
	}
	
	function getMonthLength(year, month) {
	  return isLeapYear(year) ? LEAP_MONTH_LENGTH[month] : MONTH_LENGTH[month];
	}
	
	function getYearLength(year) {
	  return isLeapYear(year) ? 366 : 365;
	}
	
	function getWeekNumber(self, fixedDay1, fixedDate) {
	  var fixedDay1st = getDayOfWeekDateOnOrBefore(fixedDay1 + 6, self.firstDayOfWeek);
	  var nDays = (fixedDay1st - fixedDay1);
	  if (nDays >= self.minimalDaysInFirstWeek) {
	    fixedDay1st -= 7;
	  }
	  var normalizedDayOfPeriod = (fixedDate - fixedDay1st);
	  return floorDivide(normalizedDayOfPeriod / 7) + 1;
	}
	
	function getDayOfWeekDateOnOrBefore(fixedDate, dayOfWeek) {
	  // 1.1.1 is monday
	  // one week has 7 days
	  return fixedDate - mod(fixedDate - dayOfWeek, 7);
	}
	
	// ------------------- private end
	
	module.exports = GregorianCalendar;
	/*
	 http://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html
	
	 TODO
	 - day saving time
	 - i18n
	 - julian calendar
	 */


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * utils for gregorian date
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	
	var Const = __webpack_require__(54);
	var floor = Math.floor;
	var ACCUMULATED_DAYS_IN_MONTH
	        //   1/1 2/1 3/1 4/1 5/1 6/1 7/1 8/1 9/1 10/1 11/1 12/1
	        = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	
	    ACCUMULATED_DAYS_IN_MONTH_LEAP
	        //   1/1 2/1   3/1   4/1   5/1   6/1   7/1   8/1   9/1
	        // 10/1   11/1   12/1
	        = [0, 31, 59 + 1, 90 + 1, 120 + 1, 151 + 1, 181 + 1,
	            212 + 1, 243 + 1, 273 + 1, 304 + 1, 334 + 1],
	
	    DAYS_OF_YEAR = 365,
	    DAYS_OF_4YEAR = 365 * 4 + 1,
	    DAYS_OF_100YEAR = DAYS_OF_4YEAR * 25 - 1,
	    DAYS_OF_400YEAR = DAYS_OF_100YEAR * 4 + 1;
	
	function getDayOfYear(year, month, dayOfMonth) {
	    return dayOfMonth + (exports.isLeapYear(year) ?
	        ACCUMULATED_DAYS_IN_MONTH_LEAP[month] :
	        ACCUMULATED_DAYS_IN_MONTH[month]);
	}
	
	function getDayOfWeekFromFixedDate(fixedDate) {
	    // The fixed day 1 (January 1, 1 Gregorian) is Monday.
	    if (fixedDate >= 0) {
	        return fixedDate % 7;
	    }
	    return exports.mod(fixedDate, 7);
	}
	
	function getGregorianYearFromFixedDate(fixedDate) {
	    var d0;
	    var d1, d2, d3;//, d4;
	    var n400, n100, n4, n1;
	    var year;
	    d0 = fixedDate - 1;
	
	    n400 = floor(d0 / DAYS_OF_400YEAR);
	    d1 = exports.mod(d0, DAYS_OF_400YEAR);
	    n100 = floor(d1 / DAYS_OF_100YEAR);
	    d2 = exports.mod(d1, DAYS_OF_100YEAR);
	    n4 = floor(d2 / DAYS_OF_4YEAR);
	    d3 = exports.mod(d2, DAYS_OF_4YEAR);
	    n1 = floor(d3 / DAYS_OF_YEAR);
	
	    year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
	
	    // ?
	    if (!(n100 === 4 || n1 === 4)) {
	        ++year;
	    }
	
	    return year;
	}
	
	var exports = module.exports = {
	    each: function (arr, fn) {
	        for (var i = 0, len = arr.length; i < len; i++) {
	            if (fn(arr[i], i, arr) === false) {
	                break;
	            }
	        }
	    },
	
	    mix: function (t, s) {
	        for (var p in s) {
	            t[p] = s[p];
	        }
	    },
	
	    isLeapYear: function (year) {
	        if ((year & 3) !== 0) {
	            return false;
	        }
	        return (year % 100 !== 0) || (year % 400 === 0);
	    },
	
	    mod: function (x, y) {
	        // 负数时不是镜像关系
	        return (x - y * floor(x / y));
	    },
	
	    // month: 0 based
	    getFixedDate: function (year, month, dayOfMonth) {
	        var prevYear = year - 1;
	        // 考虑公元前
	        return DAYS_OF_YEAR * prevYear + floor(prevYear / 4) -
	            floor(prevYear / 100) + floor(prevYear / 400) +
	            getDayOfYear(year, month, dayOfMonth);
	    },
	
	    getGregorianDateFromFixedDate: function (fixedDate) {
	        var year = getGregorianYearFromFixedDate(fixedDate);
	        var jan1 = exports.getFixedDate(year, Const.JANUARY, 1);
	        var isLeap = exports.isLeapYear(year);
	        var ACCUMULATED_DAYS = isLeap ? ACCUMULATED_DAYS_IN_MONTH_LEAP : ACCUMULATED_DAYS_IN_MONTH;
	        var daysDiff = fixedDate - jan1;
	        var month, i;
	
	        for (i = 0; i < ACCUMULATED_DAYS.length; i++) {
	            if (ACCUMULATED_DAYS[i] <= daysDiff) {
	                month = i;
	            } else {
	                break;
	            }
	        }
	
	        var dayOfMonth = fixedDate - jan1 - ACCUMULATED_DAYS[month] + 1;
	        var dayOfWeek = getDayOfWeekFromFixedDate(fixedDate);
	
	        return {
	            year: year,
	            month: month,
	            dayOfMonth: dayOfMonth,
	            dayOfWeek: dayOfWeek,
	            isLeap: isLeap
	        };
	    }
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * @ignore
	 * const for gregorian date
	 * @author yiminghe@gmail.com
	 */
	
	module.exports = {
	    /**
	     * Enum indicating sunday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    SUNDAY: 0,
	    /**
	     * Enum indicating monday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    MONDAY: 1,
	    /**
	     * Enum indicating tuesday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    TUESDAY: 2,
	    /**
	     * Enum indicating wednesday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    WEDNESDAY: 3,
	    /**
	     * Enum indicating thursday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    THURSDAY: 4,
	    /**
	     * Enum indicating friday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    FRIDAY: 5,
	    /**
	     * Enum indicating saturday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    SATURDAY: 6,
	    /**
	     * Enum indicating january
	     * @type Number
	     * @member Date.Gregorian
	     */
	    JANUARY: 0,
	    /**
	     * Enum indicating february
	     * @type Number
	     * @member Date.Gregorian
	     */
	    FEBRUARY: 1,
	    /**
	     * Enum indicating march
	     * @type Number
	     * @member Date.Gregorian
	     */
	    MARCH: 2,
	    /**
	     * Enum indicating april
	     * @type Number
	     * @member Date.Gregorian
	     */
	    APRIL: 3,
	    /**
	     * Enum indicating may
	     * @type Number
	     * @member Date.Gregorian
	     */
	    MAY: 4,
	    /**
	     * Enum indicating june
	     * @type Number
	     * @member Date.Gregorian
	     */
	    JUNE: 5,
	    /**
	     * Enum indicating july
	     * @type Number
	     * @member Date.Gregorian
	     */
	    JULY: 6,
	    /**
	     * Enum indicating august
	     * @type Number
	     * @member Date.Gregorian
	     */
	    AUGUST: 7,
	    /**
	     * Enum indicating september
	     * @type Number
	     * @member Date.Gregorian
	     */
	    SEPTEMBER: 8,
	    /**
	     * Enum indicating october
	     * @type Number
	     * @member Date.Gregorian
	     */
	    OCTOBER: 9,
	    /**
	     * Enum indicating november
	     * @type Number
	     * @member Date.Gregorian
	     */
	    NOVEMBER: 10,
	    /**
	     * Enum indicating december
	     * @type Number
	     * @member Date.Gregorian
	     */
	    DECEMBER: 11
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * en-us locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	module.exports = {
	  // in minutes
	  timezoneOffset: -8 * 60,
	  firstDayOfWeek: 0,
	  minimalDaysInFirstWeek: 1
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * en-us locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	module.exports = {
	  eras: ['BC', 'AD'],
	  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	    'August', 'September', 'October', 'November', 'December'],
	  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	    'Oct', 'Nov', 'Dec'],
	  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
	    'Saturday'],
	  shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  veryShortWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	  ampms: ['AM', 'PM'],
	  datePatterns: ['EEEE, MMMM d, yyyy', 'MMMM d, yyyy', 'MMM d, yyyy', 'M/d/yy'],
	  timePatterns: ['h:mm:ss a \'GMT\'Z', 'h:mm:ss a', 'h:mm:ss a', 'h:mm a'],
	  dateTimePattern: '{date} {time}'
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var DateTHead = __webpack_require__(58);
	var DateTBody = __webpack_require__(60);
	
	var DateTable = (function (_React$Component) {
	  function DateTable() {
	    _classCallCheck(this, DateTable);
	
	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }
	
	  _inherits(DateTable, _React$Component);
	
	  _createClass(DateTable, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var prefixClsFn = props.prefixClsFn;
	      return React.createElement(
	        'table',
	        { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	        React.createElement(DateTHead, props),
	        React.createElement(DateTBody, props)
	      );
	    }
	  }]);
	
	  return DateTable;
	})(React.Component);
	
	module.exports = DateTable;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var DateConstants = __webpack_require__(59);
	
	var DateTHead = (function (_React$Component) {
	  function DateTHead() {
	    _classCallCheck(this, DateTHead);
	
	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }
	
	  _inherits(DateTHead, _React$Component);
	
	  _createClass(DateTHead, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var value = props.value;
	      var locale = props.locale;
	      var prefixClsFn = props.prefixClsFn;
	      var veryShortWeekdays = [];
	      var weekDays = [];
	      var firstDayOfWeek = value.getFirstDayOfWeek();
	      var showWeekNumberEl;
	
	      for (var i = 0; i < DateConstants.DATE_COL_COUNT; i++) {
	        var index = (firstDayOfWeek + i) % DateConstants.DATE_COL_COUNT;
	        veryShortWeekdays[i] = locale.format.veryShortWeekdays[index];
	        weekDays[i] = locale.format.weekdays[index];
	      }
	
	      if (props.showWeekNumber) {
	        showWeekNumberEl = React.createElement(
	          'th',
	          { role: 'columnheader', className: prefixClsFn('column-header', 'week-number-header') },
	          React.createElement(
	            'span',
	            { className: prefixClsFn('column-header-inner') },
	            'x'
	          )
	        );
	      }
	      var weekDaysEls = weekDays.map(function (day, xindex) {
	        return React.createElement(
	          'th',
	          { key: xindex, role: 'columnheader', title: day, className: prefixClsFn('column-header') },
	          React.createElement(
	            'span',
	            { className: prefixClsFn('column-header-inner') },
	            veryShortWeekdays[xindex]
	          )
	        );
	      });
	      return React.createElement(
	        'thead',
	        null,
	        React.createElement(
	          'tr',
	          { role: 'row' },
	          showWeekNumberEl,
	          weekDaysEls
	        )
	      );
	    }
	  }]);
	
	  return DateTHead;
	})(React.Component);
	
	module.exports = DateTHead;

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  DATE_ROW_COUNT: 6,
	  DATE_COL_COUNT: 7
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var DateConstants = __webpack_require__(59);
	
	function isSameDay(one, two) {
	  return one.getYear() === two.getYear() && one.getMonth() === two.getMonth() && one.getDayOfMonth() === two.getDayOfMonth();
	}
	
	function beforeCurrentMonthYear(current, today) {
	  if (current.getYear() < today.getYear()) {
	    return 1;
	  }
	  return current.getYear() === today.getYear() && current.getMonth() < today.getMonth();
	}
	
	function afterCurrentMonthYear(current, today) {
	  if (current.getYear() > today.getYear()) {
	    return 1;
	  }
	  return current.getYear() === today.getYear() && current.getMonth() > today.getMonth();
	}
	
	function getIdFromDate(d) {
	  return 'rc-calendar-' + d.getYear() + '-' + d.getMonth() + '-' + d.getDayOfMonth();
	}
	
	function noop() {}
	
	function handleDayClick(current) {
	  this.props.onSelect(current);
	}
	
	var DateTBody = (function (_React$Component) {
	  function DateTBody() {
	    _classCallCheck(this, DateTBody);
	
	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }
	
	  _inherits(DateTBody, _React$Component);
	
	  _createClass(DateTBody, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var i, j, current;
	      var dateTable = [];
	      var showWeekNumber = props.showWeekNumber;
	      var value = props.value;
	      var today = value.clone();
	      var prefixClsFn = props.prefixClsFn;
	      var cellClass = prefixClsFn('cell');
	      var weekNumberCellClass = prefixClsFn('week-number-cell');
	      var dateClass = prefixClsFn('date');
	      var dateRender = props.dateRender;
	      var disabledDate = props.disabledDate;
	      var dateFormatter = this.props.dateFormatter;
	      var todayClass = prefixClsFn('today');
	      var selectedClass = prefixClsFn('selected-day');
	      var lastMonthDayClass = prefixClsFn('last-month-cell');
	      var nextMonthDayClass = prefixClsFn('next-month-btn-day');
	      var disabledClass = prefixClsFn('disabled-cell');
	      var firstDisableClass = prefixClsFn('disabled-cell-first-of-row');
	      var lastDisableClass = prefixClsFn('disabled-cell-last-of-row');
	      today.setTime(Date.now());
	      var month1 = value.clone();
	      month1.set(value.getYear(), value.getMonth(), 1);
	      var day = month1.getDayOfWeek();
	      var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
	      // calculate last month
	      var lastMonth1 = month1.clone();
	      lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
	      var passed = 0;
	      for (i = 0; i < DateConstants.DATE_ROW_COUNT; i++) {
	        for (j = 0; j < DateConstants.DATE_COL_COUNT; j++) {
	          current = lastMonth1;
	          if (passed) {
	            current = current.clone();
	            current.addDayOfMonth(passed);
	          }
	          dateTable.push(current);
	          passed++;
	        }
	      }
	      var tableHtml = [];
	      passed = 0;
	      for (i = 0; i < DateConstants.DATE_ROW_COUNT; i++) {
	        var weekNumberCell;
	        var dateCells = [];
	        if (showWeekNumber) {
	          weekNumberCell = React.createElement(
	            'td',
	            { key: dateTable[passed].getWeekOfYear(), role: 'gridcell', className: weekNumberCellClass },
	            dateTable[passed].getWeekOfYear()
	          );
	        }
	        for (j = 0; j < DateConstants.DATE_COL_COUNT; j++) {
	          var next = null;
	          var last = null;
	          current = dateTable[passed];
	          if (j < DateConstants.DATE_COL_COUNT - 1) {
	            next = dateTable[passed + 1];
	          }
	          if (j > 0) {
	            last = dateTable[passed - 1];
	          }
	          var cls = cellClass;
	          var disabled = false;
	          var selected = false;
	
	          if (isSameDay(current, today)) {
	            cls += ' ' + todayClass;
	          }
	          if (isSameDay(current, value)) {
	            cls += ' ' + selectedClass;
	            selected = true;
	          }
	          if (beforeCurrentMonthYear(current, value)) {
	            cls += ' ' + lastMonthDayClass;
	          }
	          if (afterCurrentMonthYear(current, value)) {
	            cls += ' ' + nextMonthDayClass;
	          }
	          if (disabledDate) {
	            if (disabledDate(current, value)) {
	              cls += ' ' + disabledClass;
	              disabled = true;
	
	              if (!last || !disabledDate(last, value)) {
	                cls += ' ' + firstDisableClass;
	              }
	
	              if (!next || !disabledDate(next, value)) {
	                cls += ' ' + lastDisableClass;
	              }
	            }
	          }
	
	          var dateHtml;
	          if (!(dateRender && (dateHtml = dateRender(current, value)))) {
	            dateHtml = React.createElement(
	              'span',
	              {
	                key: getIdFromDate(current),
	                className: dateClass,
	                'aria-selected': selected,
	                'aria-disabled': disabled },
	              current.getDayOfMonth()
	            );
	          }
	
	          dateCells.push(React.createElement(
	            'td',
	            { key: passed, onClick: disabled ? noop : handleDayClick.bind(this, current), role: 'gridcell',
	              title: dateFormatter.format(current), className: cls },
	            dateHtml
	          ));
	
	          passed++;
	        }
	        tableHtml.push(React.createElement(
	          'tr',
	          {
	            key: i,
	            role: 'row' },
	          weekNumberCell,
	          dateCells
	        ));
	      }
	      return React.createElement(
	        'tbody',
	        { className: prefixClsFn('tbody') },
	        tableHtml
	      );
	    }
	  }]);
	
	  return DateTBody;
	})(React.Component);
	
	module.exports = DateTBody;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var MonthPanel = __webpack_require__(62);
	var DateTimeFormat = __webpack_require__(49);
	var YearPanel = __webpack_require__(63);
	var toFragment = __webpack_require__(33).Children.mapSelf;
	
	var CalendarHeader = (function (_React$Component) {
	  function CalendarHeader(props) {
	    _classCallCheck(this, CalendarHeader);
	
	    _get(Object.getPrototypeOf(CalendarHeader.prototype), 'constructor', this).call(this, props);
	    this.state = {};
	    this.yearFormatter = new DateTimeFormat(props.locale.yearFormat);
	    this.monthFormatter = new DateTimeFormat(props.locale.monthFormat);
	    this.showMonthPanel = this.showMonthPanel.bind(this);
	    this.showYearPanel = this.showYearPanel.bind(this);
	    this.handleSelect = this.handleSelect.bind(this);
	  }
	
	  _inherits(CalendarHeader, _React$Component);
	
	  _createClass(CalendarHeader, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var locale = this.props.locale;
	      if (nextProps.locale !== locale) {
	        this.yearFormatter = new DateTimeFormat(locale.yearFormat);
	        this.monthFormatter = new DateTimeFormat(locale.monthFormat);
	      }
	    }
	  }, {
	    key: 'showMonthPanel',
	    value: function showMonthPanel() {
	      this.setState({
	        showMonthPanel: 1,
	        showYearPanel: 0
	      });
	    }
	  }, {
	    key: 'showYearPanel',
	    value: function showYearPanel() {
	      this.setState({
	        showMonthPanel: 0,
	        showYearPanel: 1
	      });
	    }
	  }, {
	    key: 'getMonthYearElement',
	    value: function getMonthYearElement() {
	      var props = this.props;
	      var prefixClsFn = props.prefixClsFn;
	      var locale = props.locale;
	      var value = this.props.value;
	      var monthBeforeYear = locale.monthBeforeYear;
	      var selectClassName = prefixClsFn(monthBeforeYear ? 'my-select' : 'ym-select');
	      var year = React.createElement(
	        'a',
	        { className: prefixClsFn('year-select'),
	          role: 'button',
	          onClick: this.showYearPanel,
	          title: locale.monthSelect },
	        this.yearFormatter.format(value)
	      );
	      var month = React.createElement(
	        'a',
	        { className: prefixClsFn('month-select'),
	          role: 'button',
	          onClick: this.showMonthPanel,
	          title: locale.monthSelect },
	        this.monthFormatter.format(value)
	      );
	      var my = [];
	      if (monthBeforeYear) {
	        my = [month, year];
	      } else {
	        my = [year, month];
	      }
	      return React.createElement(
	        'span',
	        { className: selectClassName },
	        toFragment(my)
	      );
	    }
	  }, {
	    key: 'handleSelect',
	    value: function handleSelect(value) {
	      this.setState({
	        showMonthPanel: 0,
	        showYearPanel: 0
	      });
	      this.props.onValueChange(value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var state = this.state;
	      var prefixClsFn = props.prefixClsFn;
	      var locale = props.locale;
	      var value = props.value;
	      var PanelClass = state.showMonthPanel ? MonthPanel : state.showYearPanel ? YearPanel : null;
	      var panel;
	      if (PanelClass) {
	        panel = React.createElement(PanelClass, { locale: locale, value: value, rootPrefixCls: prefixClsFn(), onSelect: this.handleSelect });
	      }
	      return React.createElement(
	        'div',
	        { className: prefixClsFn('header') },
	        React.createElement(
	          'a',
	          { className: prefixClsFn('prev-year-btn'),
	            role: 'button',
	            onClick: props.previousYear,
	            title: locale.previousYear },
	          '«'
	        ),
	        React.createElement(
	          'a',
	          { className: prefixClsFn('prev-month-btn'),
	            role: 'button',
	            onClick: props.previousMonth,
	            title: locale.previousMonth },
	          '‹'
	        ),
	        this.getMonthYearElement(),
	        React.createElement(
	          'a',
	          { className: prefixClsFn('next-month-btn'),
	            onClick: props.nextMonth,
	            title: locale.nextMonth },
	          '›'
	        ),
	        React.createElement(
	          'a',
	          { className: prefixClsFn('next-year-btn'),
	            onClick: props.nextYear,
	            title: locale.nextYear },
	          '»'
	        ),
	        panel
	      );
	    }
	  }]);
	
	  return CalendarHeader;
	})(React.Component);
	
	module.exports = CalendarHeader;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var ROW = 4;
	var COL = 3;
	var cx = __webpack_require__(33).classSet;
	var YearPanel = __webpack_require__(63);
	var staticPrefixClsFn = __webpack_require__(65);
	
	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({
	    value: next
	  });
	}
	
	function showYearPanel() {
	  this.setState({
	    showYearPanel: 1
	  });
	}
	
	function chooseMonth(month) {
	  var next = this.state.value.clone();
	  next.setMonth(month);
	  this.props.onSelect(next);
	}
	
	function onYearPanelSelect(current) {
	  this.setState({
	    value: current,
	    showYearPanel: 0
	  });
	}
	
	var MonthPanel = (function (_React$Component) {
	  function MonthPanel(props) {
	    _classCallCheck(this, MonthPanel);
	
	    _get(Object.getPrototypeOf(MonthPanel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: this.props.value,
	      prefixCls: this.props.rootPrefixCls + '-month-panel'
	
	    };
	    // bind methods
	    this.nextYear = goYear.bind(this, 1);
	    this.previousYear = goYear.bind(this, -1);
	    this.showYearPanel = showYearPanel.bind(this);
	    this.onYearPanelSelect = onYearPanelSelect.bind(this);
	    this.prefixClsFn = staticPrefixClsFn.bind(this);
	  }
	
	  _inherits(MonthPanel, _React$Component);
	
	  _createClass(MonthPanel, [{
	    key: 'getMonths',
	    value: function getMonths() {
	      var props = this.props;
	      var value = this.state.value;
	      var current = value.clone();
	      var locale = props.locale;
	      var months = [];
	      var shortMonths = locale.format.shortMonths;
	      var index = 0;
	      for (var i = 0; i < ROW; i++) {
	        months[i] = [];
	        for (var j = 0; j < COL; j++) {
	          current.setMonth(index);
	          months[i][j] = {
	            value: index,
	            content: shortMonths[index],
	            title: shortMonths[index]
	          };
	          index++;
	        }
	      }
	
	      return months;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var props = this.props;
	      var value = this.state.value;
	      var locale = props.locale;
	      var months = this.getMonths();
	      var year = value.getYear();
	      var currentMonth = value.getMonth();
	      var prefixClsFn = this.prefixClsFn;
	      var monthsEls = months.map(function (month, index) {
	        var tds = month.map(function (m) {
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = m.value === currentMonth;
	          return React.createElement(
	            'td',
	            { role: 'gridcell',
	              key: m.value,
	              onClick: chooseMonth.bind(_this, m.value),
	              title: m.title,
	              className: cx(classNameMap) },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('month') },
	              m.content
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });
	
	      var yearPanel;
	      if (this.state.showYearPanel) {
	        yearPanel = React.createElement(YearPanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls, onSelect: this.onYearPanelSelect });
	      }
	
	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'div',
	            { className: prefixClsFn('header') },
	            React.createElement(
	              'a',
	              { className: prefixClsFn('prev-year-btn'),
	                role: 'button',
	                onClick: this.previousYear,
	                title: locale.previousYear },
	              '«'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('year-select'),
	                role: 'button',
	                onClick: this.showYearPanel,
	                title: locale.yearSelect },
	              React.createElement(
	                'span',
	                { className: prefixClsFn('year-select-content') },
	                year
	              ),
	              React.createElement(
	                'span',
	                { className: prefixClsFn('year-select-arrow') },
	                'x'
	              )
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('next-year-btn'),
	                role: 'button',
	                onClick: this.nextYear,
	                title: locale.nextYear },
	              '»'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('body') },
	            React.createElement(
	              'table',
	              { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	              React.createElement(
	                'tbody',
	                { className: prefixClsFn('tbody') },
	                monthsEls
	              )
	            )
	          )
	        ),
	        yearPanel
	      );
	    }
	  }]);
	
	  return MonthPanel;
	})(React.Component);
	
	MonthPanel.defaultProps = {
	  onSelect: function onSelect() {}
	};
	
	module.exports = MonthPanel;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var ROW = 4;
	var COL = 3;
	var cx = __webpack_require__(33).classSet;
	var DecadePanel = __webpack_require__(64);
	var staticPrefixClsFn = __webpack_require__(65);
	
	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({ value: next });
	}
	
	function chooseYear(year) {
	  var next = this.state.value.clone();
	  next.setYear(year);
	  this.props.onSelect(next);
	}
	
	var YearPanel = (function (_React$Component) {
	  function YearPanel(props) {
	    var _this = this;
	
	    _classCallCheck(this, YearPanel);
	
	    _get(Object.getPrototypeOf(YearPanel.prototype), 'constructor', this).call(this, props);
	    this.prefixClsFn = staticPrefixClsFn.bind(this);
	    this.state = {
	      value: props.value,
	      prefixCls: props.rootPrefixCls + '-year-panel'
	    };
	    this.nextDecade = goYear.bind(this, 10);
	    this.previousDecade = goYear.bind(this, -10);
	    ['showDecadePanel', 'onDecadePanelSelect'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }
	
	  _inherits(YearPanel, _React$Component);
	
	  _createClass(YearPanel, [{
	    key: 'showDecadePanel',
	    value: function showDecadePanel() {
	      this.setState({
	        showDecadePanel: 1
	      });
	    }
	  }, {
	    key: 'onDecadePanelSelect',
	    value: function onDecadePanelSelect(current) {
	      this.setState({
	        value: current,
	        showDecadePanel: 0
	      });
	    }
	  }, {
	    key: 'getYears',
	    value: function getYears() {
	      var value = this.state.value;
	      var currentYear = value.getYear();
	      var startYear = parseInt(currentYear / 10, 10) * 10;
	      var previousYear = startYear - 1;
	      var endYear = startYear + 9;
	      var years = [];
	      var index = 0;
	      for (var i = 0; i < ROW; i++) {
	        years[i] = [];
	        for (var j = 0; j < COL; j++) {
	          var year = previousYear + index;
	          var content;
	          if (year < startYear) {
	            content = '';
	          } else if (year > endYear) {
	            content = '';
	          } else {
	
	            content = year + '';
	          }
	          years[i][j] = {
	            content: content,
	            year: year,
	            title: content
	          };
	          index++;
	        }
	      }
	      return years;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var props = this.props;
	      var value = this.state.value;
	      var locale = props.locale;
	      var years = this.getYears();
	      var currentYear = value.getYear();
	      var startYear = parseInt(currentYear / 10, 10) * 10;
	      var endYear = startYear + 9;
	      var prefixClsFn = this.prefixClsFn;
	
	      var yeasEls = years.map(function (row, index) {
	        var tds = row.map(function (y) {
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = y.year === currentYear;
	          classNameMap[prefixClsFn('last-decade-cell')] = y.year < startYear;
	          classNameMap[prefixClsFn('next-decade-cell')] = y.year > endYear;
	          var clickHandler;
	          if (y.year < startYear) {
	            clickHandler = _this2.previousDecade;
	          } else if (y.year > endYear) {
	            clickHandler = _this2.nextDecade;
	          } else {
	            clickHandler = chooseYear.bind(_this2, y.year);
	          }
	          return React.createElement(
	            'td',
	            { role: 'gridcell',
	              title: y.title,
	              key: y.content,
	              onClick: clickHandler,
	              className: cx(classNameMap)
	            },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('year') },
	              y.content
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });
	
	      var decadePanel;
	      if (this.state.showDecadePanel) {
	        decadePanel = React.createElement(DecadePanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls, onSelect: this.onDecadePanelSelect });
	      }
	
	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'div',
	            { className: prefixClsFn('header') },
	            React.createElement(
	              'a',
	              { className: prefixClsFn('prev-decade-btn'),
	                role: 'button',
	                onClick: this.previousDecade,
	                title: locale.previousDecade },
	              '«'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('decade-select'),
	                role: 'button',
	                onClick: this.showDecadePanel,
	                title: locale.decadeSelect },
	              React.createElement(
	                'span',
	                { className: prefixClsFn('decade-select-content') },
	                startYear,
	                '-',
	                endYear
	              ),
	              React.createElement(
	                'span',
	                { className: prefixClsFn('decade-select-arrow') },
	                'x'
	              )
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('next-decade-btn'),
	                role: 'button',
	                onClick: this.nextDecade,
	                title: locale.nextDecade },
	              '»'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('body') },
	            React.createElement(
	              'table',
	              { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	              React.createElement(
	                'tbody',
	                { className: prefixClsFn('tbody') },
	                yeasEls
	              )
	            )
	          )
	        ),
	        decadePanel
	      );
	    }
	  }]);
	
	  return YearPanel;
	})(React.Component);
	
	YearPanel.defaultProps = {
	  onSelect: function onSelect() {}
	};
	
	module.exports = YearPanel;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var ROW = 4;
	var COL = 3;
	var cx = __webpack_require__(33).classSet;
	var staticPrefixClsFn = __webpack_require__(65);
	
	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({
	    value: next
	  });
	}
	
	function chooseDecade(year, e) {
	  var next = this.state.value.clone();
	  next.setYear(year);
	  this.props.onSelect(next);
	  e.preventDefault();
	}
	
	var DecadePanel = (function (_React$Component) {
	  function DecadePanel(props) {
	    _classCallCheck(this, DecadePanel);
	
	    _get(Object.getPrototypeOf(DecadePanel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: props.value,
	      prefixCls: props.rootPrefixCls + '-decade-panel'
	    };
	
	    // bind methods
	    this.prefixClsFn = staticPrefixClsFn.bind(this);
	    this.nextCentury = goYear.bind(this, 100);
	    this.previousCentury = goYear.bind(this, -100);
	  }
	
	  _inherits(DecadePanel, _React$Component);
	
	  _createClass(DecadePanel, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var value = this.state.value;
	      var locale = this.props.locale;
	      var currentYear = value.getYear();
	      var startYear = parseInt(currentYear / 100, 10) * 100;
	      var preYear = startYear - 10;
	      var endYear = startYear + 99;
	      var decades = [];
	      var index = 0;
	      var prefixClsFn = this.prefixClsFn;
	
	      for (var i = 0; i < ROW; i++) {
	        decades[i] = [];
	        for (var j = 0; j < COL; j++) {
	          var startDecade = preYear + index * 10;
	          var endDecade = preYear + index * 10 + 9;
	          decades[i][j] = {
	            startDecade: startDecade,
	            endDecade: endDecade
	          };
	          index++;
	        }
	      }
	
	      var decadesEls = decades.map(function (row, decadeIndex) {
	        var tds = row.map(function (d) {
	          var dStartDecade = d.startDecade;
	          var dEndDecade = d.endDecade;
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = dStartDecade <= currentYear && currentYear <= dEndDecade;
	          var isLast = dStartDecade < startYear;
	          var isNext = dEndDecade > endYear;
	          classNameMap[prefixClsFn('last-century-cell')] = isLast;
	          classNameMap[prefixClsFn('next-century-cell')] = isNext;
	          var content;
	          var clickHandler;
	          if (isLast) {
	            clickHandler = _this.previousCentury;
	          } else if (isNext) {
	            clickHandler = _this.nextCentury;
	          } else {
	            content = dStartDecade + '-' + dEndDecade;
	            clickHandler = chooseDecade.bind(_this, dStartDecade);
	          }
	          return React.createElement(
	            'td',
	            {
	              key: dStartDecade,
	              onClick: clickHandler,
	              role: 'gridcell',
	              className: cx(classNameMap)
	            },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('decade') },
	              content
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: decadeIndex, role: 'row' },
	          tds
	        );
	      });
	
	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          { className: prefixClsFn('header') },
	          React.createElement(
	            'a',
	            { className: prefixClsFn('prev-century-btn'),
	              role: 'button',
	              onClick: this.previousCentury,
	              title: locale.previousCentury },
	            '«'
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('century') },
	            startYear,
	            '-',
	            endYear
	          ),
	          React.createElement(
	            'a',
	            { className: prefixClsFn('next-century-btn'),
	              role: 'button',
	              onClick: this.nextCentury,
	              title: locale.nextCentury },
	            '»'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: prefixClsFn('body') },
	          React.createElement(
	            'table',
	            { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	            React.createElement(
	              'tbody',
	              { className: prefixClsFn('tbody') },
	              decadesEls
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return DecadePanel;
	})(React.Component);
	
	DecadePanel.defaultProps = {
	  onSelect: function onSelect() {}
	};
	
	module.exports = DecadePanel;

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	  var prefixCls = this.state.prefixCls;
	  if (arguments.length === 0) {
	    return prefixCls;
	  }
	  var args = Array.prototype.slice.call(arguments, 0);
	  return args.map(function (s) {
	    return prefixCls + '-' + s;
	  }).join(' ');
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var Time = __webpack_require__(67);
	var toFragment = __webpack_require__(33).Children.mapSelf;
	
	var CalendarFooter = (function (_React$Component) {
	  function CalendarFooter() {
	    _classCallCheck(this, CalendarFooter);
	
	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }
	
	  _inherits(CalendarFooter, _React$Component);
	
	  _createClass(CalendarFooter, [{
	    key: 'getTodayTime',
	    value: function getTodayTime() {
	      var value = this.props.value;
	      var today = value.clone();
	      today.setTime(Date.now());
	      return this.props.dateFormatter.format(today);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var value = props.value;
	      var locale = props.locale;
	      var prefixClsFn = props.prefixClsFn;
	      var footerEl = null;
	      if (props.showToday || props.showTime) {
	        var nowEl;
	        var localeNow = locale.today;
	        if (props.showTime) {
	          localeNow = locale.now || locale.today;
	        }
	        if (props.showToday) {
	          nowEl = React.createElement(
	            'a',
	            { className: prefixClsFn('today-btn'),
	              role: 'button',
	              onClick: props.onToday,
	              title: this.getTodayTime() },
	            localeNow
	          );
	        }
	        var clearEl;
	        if (props.showClear) {
	          clearEl = React.createElement(
	            'a',
	            { className: prefixClsFn('clear-btn'),
	              role: 'button',
	              onClick: props.onClear },
	            locale.clear
	          );
	        }
	        var okBtn;
	        if (props.showOk) {
	          okBtn = React.createElement(
	            'a',
	            { className: prefixClsFn('ok-btn'),
	              role: 'button',
	              onClick: props.onOk },
	            locale.ok
	          );
	        }
	        var footerBtn;
	        if (nowEl || clearEl) {
	          footerBtn = React.createElement(
	            'span',
	            { className: prefixClsFn('footer-btn') },
	            toFragment([nowEl, okBtn, clearEl])
	          );
	        }
	        var timeEl;
	        if (props.showTime) {
	          timeEl = React.createElement(Time, { value: value, prefixClsFn: prefixClsFn, locale: locale, onChange: props.onSelect });
	        }
	        footerEl = React.createElement(
	          'div',
	          { className: prefixClsFn('footer') },
	          timeEl,
	          footerBtn
	        );
	      }
	
	      return footerEl;
	    }
	  }]);
	
	  return CalendarFooter;
	})(React.Component);
	
	module.exports = CalendarFooter;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var rcUtil = __webpack_require__(33);
	var KeyCode = rcUtil.KeyCode;
	var TimePanel = __webpack_require__(68);
	var setHourOfDay = 'setHourOfDay';
	var setMinutes = 'setMinutes';
	var setSeconds = 'setSeconds';
	
	function padding(number) {
	  if (number < 10) {
	    number = '0' + number;
	  }
	  return number;
	}
	
	function loop(value, min, max) {
	  if (value === min - 1) {
	    value = max;
	  } else if (value === max + 1) {
	    value = min;
	  }
	  return value;
	}
	
	function keyDownWrap(method, min, max) {
	  return function (e) {
	    var value = e.target.value;
	    var number = parseInt(value, 10);
	    var keyCode = e.keyCode;
	    var handled;
	    if (keyCode === KeyCode.DOWN) {
	      number++;
	      e.stopPropagation();
	      e.preventDefault();
	      handled = 1;
	    } else if (keyCode === KeyCode.UP) {
	      number--;
	      e.stopPropagation();
	      e.preventDefault();
	      handled = 1;
	    }
	    if (handled) {
	      number = loop(number, min, max);
	      var time = this.props.value.clone();
	      time[method](number);
	      this.props.onChange(time, e);
	    }
	  };
	}
	
	var Time = (function (_React$Component) {
	  function Time(props) {
	    var _this = this;
	
	    _classCallCheck(this, Time);
	
	    _get(Object.getPrototypeOf(Time.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      showHourPanel: 0,
	      showMinutePanel: 0,
	      showSecondPanel: 0
	    };
	    var events = ['onHourKeyDown', 'onMinuteKeyDown', 'onSecondKeyDown', 'onHourClick', 'onMinuteClick', 'onSecondClick', 'onSelectPanel'];
	    events.forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }
	
	  _inherits(Time, _React$Component);
	
	  _createClass(Time, [{
	    key: 'onSelectPanel',
	    value: function onSelectPanel(value, setter) {
	      var _this2 = this;
	
	      this.setState({
	        showHourPanel: 0,
	        showMinutePanel: 0,
	        showSecondPanel: 0
	      }, function () {
	        // ie9 has broken focus
	        React.findDOMNode(_this2.refs[setter]).focus();
	      });
	      this.props.onChange(value);
	    }
	  }, {
	    key: 'onHourClick',
	    value: function onHourClick() {
	      this.setState({
	        showHourPanel: 1,
	        showMinutePanel: 0,
	        showSecondPanel: 0
	      });
	    }
	  }, {
	    key: 'onMinuteClick',
	    value: function onMinuteClick() {
	      this.setState({
	        showHourPanel: 0,
	        showMinutePanel: 1,
	        showSecondPanel: 0
	      });
	    }
	  }, {
	    key: 'onSecondClick',
	    value: function onSecondClick() {
	      this.setState({
	        showHourPanel: 0,
	        showMinutePanel: 0,
	        showSecondPanel: 1
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var state = this.state;
	      var props = this.props;
	      var prefixClsFn = props.prefixClsFn;
	      var value = props.value;
	      var locale = props.locale;
	      var hour = value.getHourOfDay();
	      var minute = value.getMinutes();
	      var second = value.getSeconds();
	      var panel;
	      var commonProps = {
	        value: value,
	        onSelect: this.onSelectPanel,
	        rootPrefixCls: prefixClsFn()
	      };
	      if (state.showHourPanel) {
	        panel = React.createElement(TimePanel, _extends({ rowCount: 6, colCount: 4, getter: 'getHourOfDay', setter: setHourOfDay,
	          title: locale.hourPanelTitle
	        }, commonProps));
	      } else if (state.showMinutePanel) {
	        panel = React.createElement(TimePanel, _extends({ rowCount: 6, colCount: 10, getter: 'getMinutes', setter: setMinutes,
	          title: locale.minutePanelTitle
	        }, commonProps));
	      } else if (state.showSecondPanel) {
	        panel = React.createElement(TimePanel, _extends({ rowCount: 6, colCount: 10, getter: 'getSeconds', setter: setSeconds,
	          title: locale.secondPanelTitle
	        }, commonProps));
	      }
	      return React.createElement(
	        'span',
	        { className: prefixClsFn('time') },
	        React.createElement('input', { className: prefixClsFn('time-input'),
	          title: locale.hourInput,
	          ref: setHourOfDay,
	          readOnly: true,
	          value: padding(hour),
	          onClick: this.onHourClick,
	          onKeyDown: this.onHourKeyDown }),
	        React.createElement(
	          'span',
	          null,
	          ' : '
	        ),
	        React.createElement('input', { className: prefixClsFn('time-input'),
	          title: locale.minuteInput,
	          ref: setMinutes,
	          readOnly: true,
	          value: padding(minute),
	          onClick: this.onMinuteClick,
	          onKeyDown: this.onMinuteKeyDown }),
	        React.createElement(
	          'span',
	          null,
	          ' : '
	        ),
	        React.createElement('input', { className: prefixClsFn('time-input'),
	          title: locale.secondInput,
	          ref: setSeconds,
	          readOnly: true,
	          value: padding(second),
	          onClick: this.onSecondClick,
	          onKeyDown: this.onSecondKeyDown }),
	        panel
	      );
	    }
	  }]);
	
	  return Time;
	})(React.Component);
	
	Time.prototype.onHourKeyDown = keyDownWrap('setHourOfDay', 0, 23);
	Time.prototype.onMinuteKeyDown = keyDownWrap('setMinutes', 0, 59);
	Time.prototype.onSecondKeyDown = keyDownWrap('setSeconds', 0, 59);
	
	module.exports = Time;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var cx = __webpack_require__(33).classSet;
	var staticPrefixClsFn = __webpack_require__(65);
	
	function choose(hour, e) {
	  var next = this.state.value.clone();
	  var method = this.props.setter;
	  next[method](hour);
	  this.props.onSelect(next, method);
	  e.preventDefault();
	}
	
	var TimePanel = (function (_React$Component) {
	  function TimePanel(props) {
	    _classCallCheck(this, TimePanel);
	
	    _get(Object.getPrototypeOf(TimePanel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: props.value,
	      prefixCls: props.rootPrefixCls + '-time-panel'
	    };
	    this.prefixClsFn = staticPrefixClsFn.bind(this);
	  }
	
	  _inherits(TimePanel, _React$Component);
	
	  _createClass(TimePanel, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var value = this.state.value;
	      var props = this.props;
	      var method = props.getter;
	      var currentHour = value[method]();
	      var data = [];
	      var prefixClsFn = this.prefixClsFn;
	      var ROW = props.rowCount;
	      var COL = props.colCount;
	
	      for (var i = 0; i < ROW; i++) {
	        data[i] = [];
	        for (var j = 0; j < COL; j++) {
	          data[i][j] = i * COL + j;
	        }
	      }
	
	      var hoursEls = data.map(function (row, index) {
	        var tds = row.map(function (d) {
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = d === currentHour;
	          return React.createElement(
	            'td',
	            {
	              key: d,
	              onClick: choose.bind(_this, d),
	              role: 'gridcell',
	              className: cx(classNameMap) },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('time') },
	              d
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });
	
	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          { className: prefixClsFn('header') },
	          React.createElement(
	            'div',
	            { className: prefixClsFn('title') },
	            props.title
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: prefixClsFn('body') },
	          React.createElement(
	            'table',
	            { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	            React.createElement(
	              'tbody',
	              { className: prefixClsFn('tbody') },
	              hoursEls
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return TimePanel;
	})(React.Component);
	
	TimePanel.defaultProps = {
	  onSelect: function onSelect() {}
	};
	
	module.exports = TimePanel;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  today: 'Today',
	  now: 'Now',
	  ok: 'Ok',
	  clear: 'Clear',
	  hourPanelTitle: 'Select hour',
	  minutePanelTitle: 'Select minute',
	  secondPanelTitle: 'Select second',
	  monthSelect: 'Choose a month',
	  yearSelect: 'Choose a year',
	  decadeSelect: 'Choose a decade',
	  yearFormat: 'yyyy',
	  dateFormat: 'M/d/yyyy',
	  monthFormat: 'MMMM',
	  monthBeforeYear: true,
	  previousMonth: 'Previous month (PageUp)',
	  nextMonth: 'Next month (PageDown)',
	  hourInput: 'Last hour(Up), Next hour(Down)',
	  minuteInput: 'Last minute(Up), Next minute(Down)',
	  secondInput: 'Last second(Up), Next second(Down)',
	  previousYear: 'Last year (Control + left)',
	  nextYear: 'Next year (Control + right)',
	  previousDecade: 'Last decade',
	  nextDecade: 'Next decade',
	  previousCentury: 'Last century',
	  nextCentury: 'Next century',
	  format: __webpack_require__(56)
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(7);
	var DateTimeFormat = __webpack_require__(49);
	var rcUtil = __webpack_require__(33);
	var toFragment = rcUtil.Children.mapSelf;
	var KeyCode = rcUtil.KeyCode;
	var domAlign = __webpack_require__(71);
	var orientMap = {
	  tl: ['top', 'left'],
	  tr: ['top', 'right'],
	  bl: ['bottom', 'left'],
	  br: ['bottom', 'right']
	};
	var createChainedFunction = rcUtil.createChainedFunction;
	
	function getImmutableOrient(orient) {
	  if (orient) {
	    for (var i in orientMap) {
	      var original = orientMap[i];
	      if (original[0] === orient[0] && original[1] === orient[1]) {
	        return original;
	      }
	    }
	  }
	}
	
	function refFn(field, component) {
	  this[field] = component;
	}
	
	function getContainerClassName(prefixCls, open) {
	  var ret = [prefixCls + '-container'];
	  if (open) {
	    ret.push(prefixCls + '-container-open');
	  }
	  return ret.join(' ');
	}
	/**
	 * DatePicker = wrap input using Calendar
	 */
	
	var Picker = (function (_React$Component) {
	  function Picker(props) {
	    var _this = this;
	
	    _classCallCheck(this, Picker);
	
	    _get(Object.getPrototypeOf(Picker.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      open: props.open,
	      value: props.value || props.defaultValue
	    };
	    var events = ['handleInputClick', 'handleCalendarBlur', 'handleTriggerClick', 'handleCalendarClear', 'handleCalendarKeyDown', 'handleCalendarOk', 'handleKeyDown', 'handleCalendarSelect', 'focusInput'];
	    // bind methods
	    events.forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
	    this.saveInputRef = refFn.bind(this, 'inputInstance');
	  }
	
	  _inherits(Picker, _React$Component);
	
	  _createClass(Picker, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var value = nextProps.value;
	      if (value !== undefined) {
	        // null special meaning
	        value = value || nextProps.defaultValue || null;
	        this.setState({
	          value: value
	        });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.calendarContainer) {
	        React.unmountComponentAtNode(this.calendarContainer);
	        this.calendarContainer.parentNode.removeChild(this.calendarContainer);
	        this.calendarContainer = null;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.componentDidUpdate();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var _this2 = this;
	
	      prevState = prevState || {};
	      var prefixCls = this.props.prefixCls;
	      if (this.props.renderCalendarToBody && !this.state.open && prevState.open) {
	        this.getCalendarContainer().className = getContainerClassName(prefixCls);
	      }
	      if (this.state.open && !prevState.open) {
	        if (this.props.renderCalendarToBody) {
	          this.getCalendarContainer().className = getContainerClassName(prefixCls, true);
	          React.render(this.getCalendarElement(), this.getCalendarContainer(), function () {
	            _this2.alignCalendar();
	          });
	        } else {
	          this.alignCalendar();
	        }
	      }
	    }
	  }, {
	    key: 'getCalendarContainer',
	    value: function getCalendarContainer() {
	      if (!this.calendarContainer) {
	        this.calendarContainer = document.createElement('div');
	        document.body.appendChild(this.calendarContainer);
	      }
	      return this.calendarContainer;
	    }
	  }, {
	    key: 'alignCalendar',
	    value: function alignCalendar() {
	      var orient = this.calendarElement.props.orient;
	      var points = ['tl', 'bl'];
	      var offset = [0, 5];
	      if (orient.indexOf('top') !== -1 && orient.indexOf('left') !== -1) {
	        points = ['tl', 'bl'];
	      } else if (orient.indexOf('top') !== -1 && orient.indexOf('right') !== -1) {
	        points = ['tr', 'br'];
	      } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('left') !== -1) {
	        points = ['bl', 'tl'];
	        offset = [0, -5];
	      } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('right') !== -1) {
	        points = ['br', 'tr'];
	        offset = [0, -5];
	      }
	
	      var align = domAlign(React.findDOMNode(this.calendarInstance), React.findDOMNode(this.inputInstance), {
	        points: points,
	        offset: offset,
	        overflow: {
	          adjustX: 1,
	          adjustY: 1
	        }
	      });
	      points = align.points;
	      var newOrient = orientMap[points[0]];
	      this.calendarInstance.setState({
	        orient: newOrient
	      });
	      React.findDOMNode(this.calendarInstance).focus();
	    }
	  }, {
	    key: 'open',
	    value: function open(callback) {
	      this.setState({
	        open: true
	      }, callback);
	    }
	  }, {
	    key: 'close',
	    value: function close(callback) {
	      this.setState({
	        open: false
	      }, callback);
	    }
	  }, {
	    key: 'focusInput',
	    value: function focusInput() {
	      React.findDOMNode(this.inputInstance).focus();
	    }
	  }, {
	    key: 'handleInputClick',
	    value: function handleInputClick() {
	      this.toggle();
	    }
	  }, {
	    key: 'handleTriggerClick',
	    value: function handleTriggerClick() {
	      this.toggle();
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(callback) {
	      this.setState({
	        open: !this.state.open
	      }, callback);
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      // down
	      if (e.keyCode === KeyCode.DOWN) {
	        e.preventDefault();
	        this.open();
	      }
	    }
	  }, {
	    key: 'handleCalendarKeyDown',
	    value: function handleCalendarKeyDown(e) {
	      if (e.keyCode === KeyCode.ESC) {
	        e.stopPropagation();
	        this.close(this.focusInput);
	      }
	    }
	  }, {
	    key: 'handleCalendarSelect',
	    value: function handleCalendarSelect(value) {
	      var currentValue = this.state.value;
	      if (this.props.calendar.props.showTime) {
	        this.setState({
	          value: value
	        });
	      } else {
	        this.setState({
	          value: value,
	          open: false
	        }, this.focusInput);
	      }
	      if (!currentValue || currentValue.getTime() !== value.getTime()) {
	        this.props.onChange(value);
	      }
	    }
	  }, {
	    key: 'handleCalendarBlur',
	    value: function handleCalendarBlur() {
	      // if invisible, will not trigger blur
	      this.setState({
	        open: false
	      });
	    }
	  }, {
	    key: 'handleCalendarOk',
	    value: function handleCalendarOk() {
	      this.setState({
	        open: false
	      }, this.focusInput);
	    }
	  }, {
	    key: 'handleCalendarClear',
	    value: function handleCalendarClear() {
	      this.setState({
	        open: false,
	        value: null
	      }, this.focusInput);
	      if (this.state.value !== null) {
	        this.props.onChange(null);
	      }
	    }
	  }, {
	    key: 'getCalendarElement',
	    value: function getCalendarElement() {
	      var props = this.props;
	      var calendarInstance = this.calendarInstance;
	      var calendarProp = props.calendar;
	      this.calendarElement = React.cloneElement(calendarProp, {
	        ref: rcUtil.createChainedFunction(calendarProp.props.ref, this.saveCalendarRef),
	        value: this.state.value,
	        // focused: true,
	        orient: calendarInstance && calendarInstance.state.orient || getImmutableOrient(calendarProp.props.orient) || orientMap.tl,
	        onBlur: this.handleCalendarBlur,
	        onKeyDown: this.handleCalendarKeyDown,
	        onOk: createChainedFunction(calendarProp.props.onOk, this.handleCalendarOk),
	        onSelect: createChainedFunction(calendarProp.props.onSelect, this.handleCalendarSelect),
	        onClear: createChainedFunction(calendarProp.props.onClear, this.handleCalendarClear)
	      });
	      return this.calendarElement;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var renderCalendarToBody = props.renderCalendarToBody;
	      // var input = React.Children.only(props.children); bug 0.13.0
	      /*
	       children: Object
	       .0: (...)
	       get .0: function () {
	       set .0: function (value) {
	       _reactDidWarn: false
	       _reactFragment: Object
	       __proto__: Object
	       */
	      var input = props.children;
	      if (!React.isValidElement(input)) {
	        var children = input;
	        React.Children.forEach(children, function (m) {
	          input = m;
	        });
	      }
	      var state = this.state;
	      var value = state.value;
	      var calendar;
	      if (!renderCalendarToBody) {
	        calendar = state.open ? this.getCalendarElement() : this.calendarElement;
	      }
	      var inputValue = '';
	      if (value) {
	        inputValue = props.formatter.format(value);
	      }
	      input = React.cloneElement(input, {
	        ref: rcUtil.createChainedFunction(input.props.ref, this.saveInputRef),
	        readOnly: true,
	        onClick: this.handleInputClick,
	        value: inputValue,
	        onKeyDown: this.handleKeyDown
	      });
	      var classes = [props.prefixCls];
	      if (state.open) {
	        classes.push(props.prefixCls + '-open');
	      }
	      var trigger = props.trigger;
	      if (trigger) {
	        trigger = React.cloneElement(trigger, {
	          onClick: this.handleTriggerClick,
	          unselectable: true,
	          onMouseDown: prevent
	        });
	      }
	      return React.createElement(
	        'span',
	        { className: classes.join(' ') },
	        toFragment([input, calendar, trigger])
	      );
	    }
	  }]);
	
	  return Picker;
	})(React.Component);
	
	function prevent(e) {
	  e.preventDefault();
	}
	
	Picker.propTypes = {
	  onChange: React.PropTypes.func,
	  renderCalendarToBody: React.PropTypes.bool
	};
	
	Picker.defaultProps = {
	  prefixCls: 'rc-calendar-picker',
	  renderCalendarToBody: false,
	  onChange: function onChange() {},
	  formatter: new DateTimeFormat('yyyy-MM-dd')
	};
	
	module.exports = Picker;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */
	
	'use strict';
	
	var utils = __webpack_require__(72);
	
	// http://yiminghe.iteye.com/blog/1124720
	
	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */
	
	function getAlignOffset(region, align) {
	  var V = align.charAt(0),
	      H = align.charAt(1),
	      w = region.width,
	      h = region.height,
	      x,
	      y;
	
	  x = region.left;
	  y = region.top;
	
	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }
	
	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }
	
	  return {
	    left: x,
	    top: y
	  };
	}
	
	/**
	 * 得到会导致元素显示不全的祖先元素
	 */
	
	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument,
	      body = doc.body,
	      parent,
	      positionStyle = utils.css(element, 'position'),
	      skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';
	
	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }
	
	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = utils.css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}
	
	/**
	 * 获得元素的显示部分的区域
	 */
	
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  },
	      el = element,
	      scrollX,
	      scrollY,
	      winSize,
	      doc = element.ownerDocument,
	      win = doc.defaultView || doc.parentWindow,
	      body = doc.body,
	      documentElement = doc.documentElement;
	
	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) && (el !== body && el !== documentElement && utils.css(el, 'overflow') !== 'visible')) {
	      var pos = utils.offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = getOffsetParent(el);
	  }
	
	  // Clip by window's viewport.
	  scrollX = utils.getWindowScrollLeft(win);
	  scrollY = utils.getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: utils.viewportWidth(win),
	    height: utils.viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}
	
	function getElFuturePos(elRegion, refNodeRegion, points, offset) {
	  var xy, diff, p1, p2;
	
	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };
	
	  p1 = getAlignOffset(refNodeRegion, points[1]);
	  p2 = getAlignOffset(elRegion, points[0]);
	
	  diff = [p2.left - p1.left, p2.top - p1.top];
	
	  return {
	    left: xy.left - diff[0] + +offset[0],
	    top: xy.top - diff[1] + +offset[1]
	  };
	}
	
	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}
	
	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}
	
	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = utils.clone(elFuturePos),
	      size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };
	
	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }
	
	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }
	
	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }
	
	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }
	
	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }
	
	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }
	
	  return utils.mix(pos, size);
	}
	
	function flip(points, reg, map) {
	  var ret = [];
	  utils.each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}
	
	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}
	
	function getRegion(node) {
	  var offset, w, h;
	  if (!utils.isWindow(node) && node.nodeType !== 9) {
	    offset = utils.offset(node);
	    w = utils.outerWidth(node);
	    h = utils.outerHeight(node);
	  } else {
	    var win = utils.getWindow(node);
	    offset = {
	      left: utils.getWindowScrollLeft(win),
	      top: utils.getWindowScrollTop(win)
	    };
	    w = utils.viewportWidth(win);
	    h = utils.viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}
	
	/*
	 * align node
	 * @param {Element} node current dom node
	 * @param {Object} align align config
	 *
	 *    @example
	 *    {
	 *      node: null,         // 参考元素, falsy 或 window 为可视区域, 'trigger' 为触发元素, 其他为指定元素
	 *      points: ['cc','cc'], // ['tr', 'tl'] 表示 overlay 的 tr 与参考节点的 tl 对齐
	 *      offset: [0, 0]      // 有效值为 [n, m]
	 *    }
	 */
	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset;
	  var overflow = align.overflow;
	  offset = offset && [].concat(offset) || [0, 0];
	  overflow = overflow || {};
	  var newOverflowCfg = {};
	
	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = getVisibleRectForElement(el);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = getRegion(el);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = getRegion(refNode);
	  // 当前节点将要被放置的位置
	  var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
	  // 当前节点将要所处的区域
	  var newElRegion = utils.merge(elRegion, elFuturePos);
	
	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        fail = 1;
	        // 对齐位置反下
	        points = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        offset = flipOffset(offset, 0);
	      }
	    }
	
	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        fail = 1;
	        // 对齐位置反下
	        points = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        offset = flipOffset(offset, 1);
	      }
	    }
	
	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
	      utils.mix(newElRegion, elFuturePos);
	    }
	
	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);
	
	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);
	
	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }
	
	  // https://github.com/kissyteam/kissy/issues/190
	  // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  utils.offset(el, { left: newElRegion.left, top: newElRegion.top });
	
	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    utils.css(el, 'width', el.width() + newElRegion.width - elRegion.width);
	  }
	
	  if (newElRegion.height !== elRegion.height) {
	    utils.css(el, 'height', el.height() + newElRegion.height - elRegion.height);
	  }
	
	  return {
	    points: points,
	    offset: offset,
	    overflow: newOverflowCfg
	  };
	}
	
	domAlign.__getOffsetParent = getOffsetParent;
	
	domAlign.__getVisibleRectForElement = getVisibleRectForElement;
	
	module.exports = domAlign;
	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/
	
	// body may have overflow set on it, yet we still get the entire
	// viewport. In some browsers, el.offsetParent may be
	// document.documentElement, so check for that too.

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';
	
	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
	
	var getComputedStyleX;
	
	function css(el, name, value) {
	  if (typeof name === 'object') {
	    for (var i in name) {
	      css(el, i, name[i]);
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  } else {
	    return getComputedStyleX(el, name);
	  }
	}
	
	function getClientPosition(elem) {
	  var box, x, y;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();
	
	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin
	
	  x = box.left;
	  y = box.top;
	
	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.
	
	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.
	
	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0
	
	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;
	
	  return { left: x, top: y };
	}
	
	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    //ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      //quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}
	
	function getScrollLeft(w) {
	  return getScroll(w);
	}
	
	function getScrollTop(w) {
	  return getScroll(w, true);
	}
	
	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, computedStyle) {
	  var val = '';
	  var d = elem.ownerDocument;
	
	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null)) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }
	
	  return val;
	}
	
	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/,
	    CURRENT_STYLE = 'currentStyle',
	    RUNTIME_STYLE = 'runtimeStyle',
	    LEFT = 'left',
	    PX = 'px';
	
	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];
	
	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了
	
	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style,
	        left = style[LEFT],
	        rsLeft = elem[RUNTIME_STYLE][LEFT];
	
	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];
	
	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;
	
	    // Revert the changed values
	    style[LEFT] = left;
	
	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}
	
	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}
	
	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setOffset(elem, offset) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var preset = -9999;
	  if ('left' in offset) {
	    elem.style.left = preset + 'px';
	  }
	  if ('top' in offset) {
	    elem.style.top = preset + 'px';
	  }
	  var old = getOffset(elem);
	  var ret = {};
	  var key;
	  for (key in offset) {
	    ret[key] = preset + offset[key] - old[key];
	  }
	  css(elem, ret);
	}
	
	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}
	
	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}
	
	var BOX_MODELS = ['margin', 'border', 'padding'],
	    CONTENT_INDEX = -1,
	    PADDING_INDEX = 2,
	    BORDER_INDEX = 1,
	    MARGIN_INDEX = 0;
	
	function swap(elem, options, callback) {
	  var old = {},
	      style = elem.style,
	      name;
	
	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    old[name] = style[name];
	    style[name] = options[name];
	  }
	
	  callback.call(elem);
	
	  // Revert the old values
	  for (name in options) {
	    style[name] = old[name];
	  }
	}
	
	function getPBMWidth(elem, props, which) {
	  var value = 0,
	      prop,
	      j,
	      i;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp;
	        if (prop === 'border') {
	          cssProp = prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}
	
	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /*eslint eqeqeq:0*/
	  return obj != null && obj == obj.window;
	}
	
	var domUtils = {};
	
	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    //firefox chrome documentElement.scrollHeight< body.scrollHeight
	    //ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    //quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };
	
	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name,
	        doc = win.document,
	        body = doc.body,
	        documentElement = doc.documentElement,
	        documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});
	
	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, extra) {
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'],
	      borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue == null || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue == null || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    } else {
	      return cssBoxValue;
	    }
	  } else if (borderBoxValueOrIsBorderBox) {
	    return val + (extra === BORDER_INDEX ? 0 : extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  } else {
	    return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	  }
	}
	
	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
	
	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay(elem) {
	  var val,
	      args = arguments;
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}
	
	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	
	  domUtils[name] = function (elem, val) {
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});
	
	function mix(to, from) {
	  for (var i in from) {
	    to[i] = from[i];
	  }
	  return to;
	}
	
	var utils = module.exports = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value);
	    } else {
	      return getOffset(el);
	    }
	  },
	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i;
	    var ret = {};
	    for (i in obj) {
	      ret[i] = obj[i];
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        ret.overflow[i] = obj.overflow[i];
	      }
	    }
	    return ret;
	  },
	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};
	    for (var i = 0; i < arguments.length; i++) {
	      utils.mix(ret, arguments[i]);
	    }
	    return ret;
	  },
	  viewportWidth: 0,
	  viewportHeight: 0
	};
	
	mix(utils, domUtils);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(74);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * DateTimeFormat for
	 * Inspired by DateTimeFormat from JDK.
	 * @author yiminghe@gmail.com
	 */
	
	var GregorianCalendar = __webpack_require__(75);
	var MAX_VALUE = Number.MAX_VALUE,
	  /**
	   * date or time style enum
	   * @enum {Number} Date.Formatter.Style
	   */
	  DateTimeStyle = {
	    /**
	     * full style
	     */
	    FULL: 0,
	    /**
	     * long style
	     */
	    LONG: 1,
	    /**
	     * medium style
	     */
	    MEDIUM: 2,
	    /**
	     * short style
	     */
	    SHORT: 3
	  };
	
	/*
	 Letter    Date or Time Component    Presentation    Examples
	 G    Era designator    Text    AD
	 y    Year    Year    1996; 96
	 M    Month in year    Month    July; Jul; 07
	 w    Week in year    Number    27
	 W    Week in month    Number    2
	 D    Day in year    Number    189
	 d    Day in month    Number    10
	 F    Day of week in month    Number    2
	 E    Day in week    Text    Tuesday; Tue
	 a    Am/pm marker    Text    PM
	 H    Hour in day (0-23)    Number    0
	 k    Hour in day (1-24)    Number    24
	 K    Hour in am/pm (0-11)    Number    0
	 h    Hour in am/pm (1-12)    Number    12
	 m    Minute in hour    Number    30
	 s    Second in minute    Number    55
	 S    Millisecond    Number    978
	 x z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00
	 Z    Time zone    RFC 822 time zone    -0800
	 */
	
	var patternChars = new Array(GregorianCalendar.DAY_OF_WEEK_IN_MONTH + 2).
	  join('1');
	
	var ERA = 0;
	
	var calendarIndexMap = {};
	
	patternChars = patternChars.split('');
	patternChars[ERA] = 'G';
	patternChars[GregorianCalendar.YEAR] = 'y';
	patternChars[GregorianCalendar.MONTH] = 'M';
	patternChars[GregorianCalendar.DAY_OF_MONTH] = 'd';
	patternChars[GregorianCalendar.HOUR_OF_DAY] = 'H';
	patternChars[GregorianCalendar.MINUTES] = 'm';
	patternChars[GregorianCalendar.SECONDS] = 's';
	patternChars[GregorianCalendar.MILLISECONDS] = 'S';
	patternChars[GregorianCalendar.WEEK_OF_YEAR] = 'w';
	patternChars[GregorianCalendar.WEEK_OF_MONTH] = 'W';
	patternChars[GregorianCalendar.DAY_OF_YEAR] = 'D';
	patternChars[GregorianCalendar.DAY_OF_WEEK_IN_MONTH] = 'F';
	
	(function () {
	  for (var index in patternChars) {
	    calendarIndexMap[patternChars[index]] = index;
	  }
	})();
	
	function mix(t, s) {
	  for (var p in s) {
	    t[p] = s[p];
	  }
	}
	
	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
	  EMPTY = '';
	
	function substitute(str, o, regexp) {
	  if (typeof str !== 'string' || !o) {
	    return str;
	  }
	
	  return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
	    if (match.charAt(0) === '\\') {
	      return match.slice(1);
	    }
	    return (o[name] === undefined) ? EMPTY : o[name];
	  });
	}
	
	patternChars = patternChars.join('') + 'ahkKZE';
	
	function encode(lastField, count, compiledPattern) {
	  compiledPattern.push({
	    field: lastField,
	    count: count
	  });
	}
	
	function compile(pattern) {
	  var length = pattern.length;
	  var inQuote = false;
	  var compiledPattern = [];
	  var tmpBuffer = null;
	  var count = 0;
	  var lastField = -1;
	
	  for (var i = 0; i < length; i++) {
	    var c = pattern.charAt(i);
	
	    if (c === '\'') {
	      // '' is treated as a single quote regardless of being
	      // in a quoted section.
	      if ((i + 1) < length) {
	        c = pattern.charAt(i + 1);
	        if (c === '\'') {
	          i++;
	          if (count !== 0) {
	            encode(lastField, count, compiledPattern);
	            lastField = -1;
	            count = 0;
	          }
	          if (inQuote) {
	            tmpBuffer += c;
	          }
	          continue;
	        }
	      }
	      if (!inQuote) {
	        if (count !== 0) {
	          encode(lastField, count, compiledPattern);
	          lastField = -1;
	          count = 0;
	        }
	        tmpBuffer = '';
	        inQuote = true;
	      } else {
	        compiledPattern.push({
	          text: tmpBuffer
	        });
	        inQuote = false;
	      }
	      continue;
	    }
	    if (inQuote) {
	      tmpBuffer += c;
	      continue;
	    }
	    if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
	      if (count !== 0) {
	        encode(lastField, count, compiledPattern);
	        lastField = -1;
	        count = 0;
	      }
	      compiledPattern.push({
	        text: c
	      });
	      continue;
	    }
	
	    if (patternChars.indexOf(c) === -1) {
	      throw new Error('Illegal pattern character "' + c + '"');
	    }
	
	    if (lastField === -1 || lastField === c) {
	      lastField = c;
	      count++;
	      continue;
	    }
	    encode(lastField, count, compiledPattern);
	    lastField = c;
	    count = 1;
	  }
	
	  if (inQuote) {
	    throw new Error('Unterminated quote');
	  }
	
	  if (count !== 0) {
	    encode(lastField, count, compiledPattern);
	  }
	
	  return compiledPattern;
	}
	
	var zeroDigit = '0';
	
	// TODO zeroDigit localization??
	function zeroPaddingNumber(value, minDigits, maxDigits, buffer) {
	  // Optimization for 1, 2 and 4 digit numbers. This should
	  // cover most cases of formatting date/time related items.
	  // Note: This optimization code assumes that maxDigits is
	  // either 2 or Integer.MAX_VALUE (maxIntCount in format()).
	  buffer = buffer || [];
	  maxDigits = maxDigits || MAX_VALUE;
	  if (value >= 0) {
	    if (value < 100 && minDigits >= 1 && minDigits <= 2) {
	      if (value < 10 && minDigits === 2) {
	        buffer.push(zeroDigit);
	      }
	      buffer.push(value);
	      return buffer.join('');
	    } else if (value >= 1000 && value < 10000) {
	      if (minDigits === 4) {
	        buffer.push(value);
	        return buffer.join('');
	      }
	      if (minDigits === 2 && maxDigits === 2) {
	        return zeroPaddingNumber(value % 100, 2, 2, buffer);
	      }
	    }
	  }
	  buffer.push(value + '');
	  return buffer.join('');
	}
	
	/**
	 *
	 * date time formatter for KISSY gregorian date.
	 *
	 *      @example
	 *      use('date/format,date/gregorian',function(S, DateFormat, GregorianCalendar){
	     *          var calendar = new GregorianCalendar(2013,9,24);
	     *          // ' to escape
	     *          var formatter = new DateFormat("'today is' ''yyyy/MM/dd a''");
	     *          document.write(formatter.format(calendar));
	     *      });
	 *
	 * @class Date.Formatter
	 * @param {String} pattern patter string of date formatter
	 *
	 * <table border="1">
	 * <thead valign="bottom">
	 * <tr><th class="head">Letter</th>
	 * <th class="head">Date or Time Component</th>
	 * <th class="head">Presentation</th>
	 * <th class="head">Examples</th>
	 * </tr>
	 * </thead>
	 * <tbody valign="top">
	 * <tr><td>G</td>
	 * <td>Era designator</td>
	 * <td>Text</td>
	 * <td>AD</td>
	 * </tr>
	 * <tr><td>y</td>
	 * <td>Year</td>
	 * <td>Year</td>
	 * <td>1996; 96</td>
	 * </tr>
	 * <tr><td>M</td>
	 * <td>Month in year</td>
	 * <td>Month</td>
	 * <td>July; Jul; 07</td>
	 * </tr>
	 * <tr><td>w</td>
	 * <td>Week in year</td>
	 * <td>Number</td>
	 * <td>27</td>
	 * </tr>
	 * <tr><td>W</td>
	 * <td>Week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>D</td>
	 * <td>Day in year</td>
	 * <td>Number</td>
	 * <td>189</td>
	 * </tr>
	 * <tr><td>d</td>
	 * <td>Day in month</td>
	 * <td>Number</td>
	 * <td>10</td>
	 * </tr>
	 * <tr><td>F</td>
	 * <td>Day of week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>E</td>
	 * <td>Day in week</td>
	 * <td>Text</td>
	 * <td>Tuesday; Tue</td>
	 * </tr>
	 * <tr><td>a</td>
	 * <td>Am/pm marker</td>
	 * <td>Text</td>
	 * <td>PM</td>
	 * </tr>
	 * <tr><td>H</td>
	 *       <td>Hour in day (0-23)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>k</td>
	 *       <td>Hour in day (1-24)</td>
	 * <td>Number</td>
	 * <td>24</td>
	 * </tr>
	 * <tr><td>K</td>
	 * <td>Hour in am/pm (0-11)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>h</td>
	 * <td>Hour in am/pm (1-12)</td>
	 * <td>Number</td>
	 * <td>12</td>
	 * </tr>
	 * <tr><td>m</td>
	 * <td>Minute in hour</td>
	 * <td>Number</td>
	 * <td>30</td>
	 * </tr>
	 * <tr><td>s</td>
	 * <td>Second in minute</td>
	 * <td>Number</td>
	 * <td>55</td>
	 * </tr>
	 * <tr><td>S</td>
	 * <td>Millisecond</td>
	 * <td>Number</td>
	 * <td>978</td>
	 * </tr>
	 * <tr><td>x/z</td>
	 * <td>Time zone</td>
	 * <td>General time zone</td>
	 * <td>Pacific Standard Time; PST; GMT-08:00</td>
	 * </tr>
	 * <tr><td>Z</td>
	 * <td>Time zone</td>
	 * <td>RFC 822 time zone</td>
	 * <td>-0800</td>
	 * </tr>
	 * </tbody>
	 * </table>
	
	 * @param {Object} locale locale object
	 * @param {Number} timeZoneOffset time zone offset by minutes
	 */
	function DateTimeFormat(pattern, locale, timeZoneOffset) {
	  this.locale = locale;
	  this.pattern = compile(pattern);
	  this.timezoneOffset = timeZoneOffset;
	}
	
	function formatField(field, count, locale, calendar) {
	  var current,
	    value;
	  switch (field) {
	    case 'G':
	      value = calendar.getYear() > 0 ? 1 : 0;
	      current = locale.eras[value];
	      break;
	    case 'y':
	      value = calendar.getYear();
	      if (value <= 0) {
	        value = 1 - value;
	      }
	      current = (zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2));
	      break;
	    case 'M':
	      value = calendar.getMonth();
	      if (count >= 4) {
	        current = locale.months[value];
	      } else if (count === 3) {
	        current = locale.shortMonths[value];
	      } else {
	        current = zeroPaddingNumber(value + 1, count);
	      }
	      break;
	    case 'k':
	      current = zeroPaddingNumber(calendar.getHourOfDay() || 24,
	        count);
	      break;
	    case 'E':
	      value = calendar.getDayOfWeek();
	      current = count >= 4 ?
	        locale.weekdays[value] :
	        locale.shortWeekdays[value];
	      break;
	    case 'a':
	      current = locale.ampms[calendar.getHourOfDay() >= 12 ?
	        1 :
	        0];
	      break;
	    case 'h':
	      current = zeroPaddingNumber(calendar.
	        getHourOfDay() % 12 || 12, count);
	      break;
	    case 'K':
	      current = zeroPaddingNumber(calendar.
	        getHourOfDay() % 12, count);
	      break;
	    case 'Z':
	      var offset = calendar.getTimezoneOffset();
	      var parts = [offset < 0 ? '-' : '+'];
	      offset = Math.abs(offset);
	      parts.push(zeroPaddingNumber(Math.floor(offset / 60) % 100, 2),
	        zeroPaddingNumber(offset % 60, 2));
	      current = parts.join('');
	      break;
	    default :
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W':
	      var index = calendarIndexMap[field];
	      value = calendar.get(index);
	      current = zeroPaddingNumber(value, count);
	  }
	  return current;
	}
	
	function matchField(dateStr, startIndex, matches) {
	  var matchedLen = -1,
	    index = -1,
	    i,
	    len = matches.length;
	  for (i = 0; i < len; i++) {
	    var m = matches[i];
	    var mLen = m.length;
	    if (mLen > matchedLen &&
	      matchPartString(dateStr, startIndex, m, mLen)) {
	      matchedLen = mLen;
	      index = i;
	    }
	  }
	  return index >= 0 ? {
	    value: index,
	    startIndex: startIndex + matchedLen
	  } : null;
	}
	
	function matchPartString(dateStr, startIndex, match, mLen) {
	  for (var i = 0; i < mLen; i++) {
	    if (dateStr.charAt(startIndex + i) !== match.charAt(i)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function getLeadingNumberLen(str) {
	  var i, c,
	    len = str.length;
	  for (i = 0; i < len; i++) {
	    c = str.charAt(i);
	    if (c < '0' || c > '9') {
	      break;
	    }
	  }
	  return i;
	}
	
	function matchNumber(dateStr, startIndex, count, obeyCount) {
	  var str = dateStr, n;
	  if (obeyCount) {
	    if (dateStr.length <= startIndex + count) {
	      return null;
	    }
	    str = dateStr.substring(startIndex, count);
	    if (!str.match(/^\d+$/)) {
	      return null;
	    }
	  } else {
	    str = str.substring(startIndex);
	  }
	  n = parseInt(str, 10);
	  if (isNaN(n)) {
	    return null;
	  }
	  return {
	    value: n,
	    startIndex: startIndex + getLeadingNumberLen(str)
	  };
	}
	
	function parseField(calendar, dateStr, startIndex, field, count, locale, obeyCount, tmp) {
	  var match, year, hour;
	  if (dateStr.length <= startIndex) {
	    return startIndex;
	  }
	  switch (field) {
	    case 'G':
	      if ((match = matchField(dateStr, startIndex, locale.eras))) {
	        if (calendar.isSetYear()) {
	          if (match.value === 0) {
	            year = calendar.getYear();
	            calendar.setYear(1 - year);
	          }
	        } else {
	          tmp.era = match.value;
	        }
	      }
	      break;
	    case 'y':
	      if ((match = matchNumber(dateStr, startIndex, count, obeyCount))) {
	        year = match.value;
	        if ('era' in tmp) {
	          if (tmp.era === 0) {
	            year = 1 - year;
	          }
	        }
	        calendar.setYear(year);
	      }
	      break;
	    case 'M':
	      var month;
	      if (count >= 3) {
	        if ((match = matchField(dateStr, startIndex, locale[count === 3 ?
	            'shortMonths' : 'months']))) {
	          month = match.value;
	        }
	      } else {
	        if ((match = matchNumber(dateStr, startIndex, count, obeyCount))) {
	          month = match.value - 1;
	        }
	      }
	      if (match) {
	        calendar.setMonth(month);
	      }
	      break;
	    case 'k':
	      if ((match = matchNumber(dateStr, startIndex, count, obeyCount))) {
	        calendar.setHourOfDay(match.value % 24);
	      }
	      break;
	    case 'E':
	      if ((match = matchField(dateStr, startIndex, locale[count > 3 ?
	          'weekdays' :
	          'shortWeekdays']))) {
	        calendar.setDayOfWeek(match.value);
	      }
	      break;
	    case 'a':
	      if ((match = matchField(dateStr, startIndex, locale.ampms))) {
	        if (calendar.isSetHourOfDay()) {
	          if (match.value) {
	            hour = calendar.getHourOfDay();
	            if (hour < 12) {
	              calendar.setHourOfDay((hour + 12) % 24);
	            }
	          }
	        } else {
	          tmp.ampm = match.value;
	        }
	      }
	      break;
	    case 'h':
	      if ((match = matchNumber(dateStr, startIndex, count, obeyCount))) {
	        hour = match.value %= 12;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'K':
	      if ((match = matchNumber(dateStr, startIndex, count, obeyCount))) {
	        hour = match.value;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'Z':
	      var sign = 1,
	        zoneChar = dateStr.charAt(startIndex);
	      if (zoneChar === '-') {
	        sign = -1;
	        startIndex++;
	      } else if (zoneChar === '+') {
	        startIndex++;
	      } else {
	        break;
	      }
	      if ((match = matchNumber(dateStr, startIndex, 2, true))) {
	        var zoneOffset = match.value * 60;
	        startIndex = match.startIndex;
	        if ((match = matchNumber(dateStr, startIndex, 2, true))) {
	          zoneOffset += match.value;
	        }
	        calendar.setTimezoneOffset(zoneOffset);
	      }
	      break;
	    default :
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W'
	      if ((match = matchNumber(dateStr, startIndex, count, obeyCount))) {
	        var index = calendarIndexMap[field];
	        calendar.set(index, match.value);
	      }
	  }
	  if (match) {
	    startIndex = match.startIndex;
	  }
	  return startIndex;
	}
	
	mix(DateTimeFormat.prototype, {
	  getLocale: function (calendar) {
	    if (this.locale) {
	      return this.locale;
	    }
	    if (calendar) {
	      return calendar.locale;
	    }
	    return GregorianCalendar.defaultLocale;
	  },
	
	  getTimezoneOffset: function (calendar) {
	    if (typeof this.timezoneOffset !== 'undefined') {
	      return this.timezoneOffset;
	    }
	    return this.getLocale(calendar).timezoneOffset;
	  },
	
	  /**
	   * format a GregorianDate instance according to specified pattern
	   * @param {Date.Gregorian} calendar GregorianDate instance
	   * @returns {string} formatted string of GregorianDate instance
	   */
	  format: function (calendar) {
	    if (calendar.isGregorianCalendar) {
	
	    } else {
	      var time = calendar.getTime();
	      calendar = /**@type {Date.Gregorian}
	       @ignore*/new GregorianCalendar(this.getTimezoneOffset(), this.getLocale());
	      calendar.setTime(time);
	    }
	    var i,
	      ret = [],
	      pattern = this.pattern,
	      len = pattern.length;
	    for (i = 0; i < len; i++) {
	      var comp = pattern[i];
	      if (comp.text) {
	        ret.push(comp.text);
	      } else if ('field' in comp) {
	        ret.push(formatField(comp.field, comp.count, this.getLocale(calendar), calendar));
	      }
	    }
	    return ret.join('');
	  },
	
	  /**
	   * parse a formatted string of GregorianDate instance according to specified pattern
	   * @param {String} dateStr formatted string of GregorianDate
	   * @returns {Date.Gregorian}
	   */
	  parse: function (dateStr) {
	    var calendar = /**@type {Date.Gregorian}
	       @ignore*/new GregorianCalendar(this.getTimezoneOffset(), this.getLocale()),
	      i,
	      j,
	      tmp = {},
	      obeyCount = false,
	      dateStrLen = dateStr.length,
	      errorIndex = -1,
	      startIndex = 0,
	      oldStartIndex = 0,
	      pattern = this.pattern,
	      len = pattern.length;
	
	    loopPattern: {
	      for (i = 0; errorIndex < 0 && i < len; i++) {
	        var comp = pattern[i], text, textLen;
	        oldStartIndex = startIndex;
	        if ((text = comp.text)) {
	          textLen = text.length;
	          if ((textLen + startIndex) > dateStrLen) {
	            errorIndex = startIndex;
	          } else {
	            for (j = 0; j < textLen; j++) {
	              if (text.charAt(j) !== dateStr.charAt(j + startIndex)) {
	                errorIndex = startIndex;
	                break loopPattern;
	              }
	            }
	            startIndex += textLen;
	          }
	        } else if ('field' in comp) {
	          obeyCount = false;
	          var nextComp = pattern[i + 1];
	          if (nextComp) {
	            if ('field' in nextComp) {
	              obeyCount = true;
	            } else {
	              var c = nextComp.text.charAt(0);
	              if (c >= '0' && c <= '9') {
	                obeyCount = true;
	              }
	            }
	          }
	          startIndex = parseField(calendar,
	            dateStr,
	            startIndex,
	            comp.field,
	            comp.count,
	            this.getLocale(calendar),
	            obeyCount,
	            tmp);
	          if (startIndex === oldStartIndex) {
	            errorIndex = startIndex;
	          }
	        }
	      }
	    }
	
	    if (errorIndex >= 0) {
	      console.error('error when parsing date');
	      console.error(dateStr);
	      console.error(dateStr.substring(0, errorIndex) + '^');
	      return undefined;
	    }
	    return calendar;
	  }
	});
	
	mix(DateTimeFormat, {
	  Style: DateTimeStyle,
	
	  /**
	   * get a formatter instance of short style pattern.
	   * en-us: M/d/yy h:mm a
	   * zh-cn: yy-M-d ah:mm
	   * @param {Object} locale locale object
	   * @param {Number} timeZoneOffset time zone offset by minutes
	   * @returns {Date.Gregorian}
	   * @static
	   */
	  getInstance: function (locale, timeZoneOffset) {
	    return this.getDateTimeInstance(DateTimeStyle.SHORT, DateTimeStyle.SHORT, locale, timeZoneOffset);
	  },
	
	  /**
	   * get a formatter instance of specified date style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Object} locale
	   * @param {Number} timeZoneOffset time zone offset by minutes
	   * @returns {Date.Gregorian}
	   * @static
	   */
	  getDateInstance: function (dateStyle, locale, timeZoneOffset) {
	    return this.getDateTimeInstance(dateStyle, undefined, locale, timeZoneOffset);
	  },
	
	  /**
	   * get a formatter instance of specified date style and time style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @param {Number} timeZoneOffset time zone offset by minutes
	   * @returns {Date.Gregorian}
	   * @static
	   */
	  getDateTimeInstance: function (dateStyle, timeStyle, locale, timeZoneOffset) {
	    locale = locale || GregorianCalendar.defaultLocale;
	    var datePattern = '';
	    if (dateStyle !== undefined) {
	      datePattern = locale.datePatterns[dateStyle];
	    }
	    var timePattern = '';
	    if (timeStyle !== undefined) {
	      timePattern = locale.timePatterns[timeStyle];
	    }
	    var pattern = datePattern;
	    if (timePattern) {
	      if (datePattern) {
	        pattern = substitute(locale.dateTimePattern, {
	          date: datePattern,
	          time: timePattern
	        });
	      } else {
	        pattern = timePattern;
	      }
	    }
	    return new DateTimeFormat(pattern, locale, timeZoneOffset);
	  },
	
	  /**
	   * get a formatter instance of specified time style.
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @param {Number} timeZoneOffset time zone offset by minutes
	   * @returns {Date.Gregorian}
	   * @static
	   */
	  getTimeInstance: function (timeStyle, locale, timeZoneOffset) {
	    return this.getDateTimeInstance(undefined, timeStyle, locale, timeZoneOffset);
	  }
	});
	
	module.exports = DateTimeFormat;
	
	DateTimeFormat.version = '@VERSION@';

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(76);

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * GregorianCalendar class
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	var toInt = parseInt;
	var Utils = __webpack_require__(77);
	var defaultLocale = __webpack_require__(79);
	var Const = __webpack_require__(78);
	
	/**
	 * GregorianCalendar class.
	 *
	 * - no arguments:
	 *   Constructs a default GregorianCalendar using the current time
	 *   in the default time zone with the default locale.
	 * - one argument timezoneOffset:
	 *   Constructs a GregorianCalendar based on the current time
	 *   in the given timezoneOffset with the default locale.
	 * - one argument locale:
	 *   Constructs a GregorianCalendar
	 *   based on the current time in the default time zone with the given locale.
	 * - two arguments
	 *   Constructs a GregorianCalendar based on the current time in the given time zone with the given locale.
	 *      - zone - the given time zone.
	 *      - aLocale - the given locale.
	 *
	 * - 3 to 6 arguments:
	 *   Constructs a GregorianCalendar with the given date and time set for the default time zone with the default locale.
	 *      - year - the value used to set the YEAR calendar field in the calendar.
	 *      - month - the value used to set the MONTH calendar field in the calendar. Month value is 0-based. e.g.,
	 *        0 for January.
	 *      - dayOfMonth - the value used to set the DAY_OF_MONTH calendar field in the calendar.
	 *      - hourOfDay - the value used to set the HOUR_OF_DAY calendar field in the calendar.
	 *      - minute - the value used to set the MINUTE calendar field in the calendar.
	 *      - second - the value used to set the SECONDS calendar field in the calendar.
	 *
	 *
	 * @class Date.Gregorian
	 */
	function GregorianCalendar(timezoneOffset, locale) {
	
	  var args = [].slice.call(arguments, 0);
	
	  if (typeof timezoneOffset === 'object') {
	    locale = timezoneOffset;
	    timezoneOffset = locale.timezoneOffset;
	  } else if (args.length >= 3) {
	    timezoneOffset = locale = null;
	  }
	
	  locale = locale || defaultLocale;
	
	  this.locale = locale;
	
	  this.fields = [];
	
	  /**
	   * The currently set time for this date.
	   * @protected
	   * @type Number|undefined
	   */
	  this.time = undefined;
	  /**
	   * The timezoneOffset in minutes used by this date.
	   * @type Number
	   * @protected
	   */
	  if (typeof timezoneOffset !== 'number') {
	    timezoneOffset = locale.timezoneOffset;
	  }
	  this.timezoneOffset = timezoneOffset;
	
	  /**
	   * The first day of the week
	   * @type Number
	   * @protected
	   */
	  this.firstDayOfWeek = locale.firstDayOfWeek;
	
	  /**
	   * The number of days required for the first week in a month or year,
	   * with possible values from 1 to 7.
	   * @@protected
	   * @type Number
	   */
	  this.minimalDaysInFirstWeek = locale.minimalDaysInFirstWeek;
	
	  this.fieldsComputed = false;
	
	  if (arguments.length >= 3) {
	    this.set.apply(this, args);
	  }
	}
	
	Utils.mix(GregorianCalendar, Const);
	
	Utils.mix(GregorianCalendar, {
	  Utils: Utils,
	
	  defaultLocale: defaultLocale,
	
	  /**
	   * Determines if the given year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @param {Number} year the given year.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @static
	   * @method
	   */
	  isLeapYear: Utils.isLeapYear,
	
	  /**
	   * Enum indicating year field of date
	   * @type Number
	   */
	  YEAR: 1,
	  /**
	   * Enum indicating month field of date
	   * @type Number
	   */
	  MONTH: 2,
	  /**
	   * Enum indicating the day of the month
	   * @type Number
	   */
	  DAY_OF_MONTH: 3,
	  /**
	   * Enum indicating the hour (24).
	   * @type Number
	   */
	  HOUR_OF_DAY: 4,
	  /**
	   * Enum indicating the minute of the day
	   * @type Number
	   */
	  MINUTES: 5,
	  /**
	   * Enum indicating the second of the day
	   * @type Number
	   */
	  SECONDS: 6,
	  /**
	   * Enum indicating the millisecond of the day
	   * @type Number
	   */
	  MILLISECONDS: 7,
	  /**
	   * Enum indicating the week number within the current year
	   * @type Number
	   */
	  WEEK_OF_YEAR: 8,
	  /**
	   * Enum indicating the week number within the current month
	   * @type Number
	   */
	  WEEK_OF_MONTH: 9,
	
	  /**
	   * Enum indicating the day of the day number within the current year
	   * @type Number
	   */
	  DAY_OF_YEAR: 10,
	  /**
	   * Enum indicating the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK: 11,
	  /**
	   * Enum indicating the day of the ordinal number of the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK_IN_MONTH: 12,
	
	  /**
	   * Enum indicating am
	   * @type Number
	   */
	  AM: 0,
	  /**
	   * Enum indicating pm
	   * @type Number
	   */
	  PM: 1
	});
	
	var fields = ['',
	  'Year', 'Month', 'DayOfMonth',
	  'HourOfDay',
	  'Minutes', 'Seconds', 'Milliseconds', 'WeekOfYear',
	  'WeekOfMonth', 'DayOfYear', 'DayOfWeek',
	  'DayOfWeekInMonth'
	];
	
	var YEAR = GregorianCalendar.YEAR;
	var MONTH = GregorianCalendar.MONTH;
	var DAY_OF_MONTH = GregorianCalendar.DAY_OF_MONTH;
	var HOUR_OF_DAY = GregorianCalendar.HOUR_OF_DAY;
	var MINUTE = GregorianCalendar.MINUTES;
	var SECONDS = GregorianCalendar.SECONDS;
	
	var MILLISECONDS = GregorianCalendar.MILLISECONDS;
	var DAY_OF_WEEK_IN_MONTH = GregorianCalendar.DAY_OF_WEEK_IN_MONTH;
	var DAY_OF_YEAR = GregorianCalendar.DAY_OF_YEAR;
	var DAY_OF_WEEK = GregorianCalendar.DAY_OF_WEEK;
	
	var WEEK_OF_MONTH = GregorianCalendar.WEEK_OF_MONTH;
	var WEEK_OF_YEAR = GregorianCalendar.WEEK_OF_YEAR;
	
	var MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	var LEAP_MONTH_LENGTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	
	var ONE_SECOND = 1000;
	var ONE_MINUTE = 60 * ONE_SECOND;
	var ONE_HOUR = 60 * ONE_MINUTE;
	var ONE_DAY = 24 * ONE_HOUR;
	var ONE_WEEK = ONE_DAY * 7;
	
	var EPOCH_OFFSET = 719163; // Fixed date of January 1, 1970 (Gregorian)
	
	var mod = Utils.mod,
	  isLeapYear = Utils.isLeapYear,
	  floorDivide = Math.floor;
	
	var MIN_VALUES = [
	  undefined,
	  1,              // YEAR
	  GregorianCalendar.JANUARY,        // MONTH
	  1,              // DAY_OF_MONTH
	  0,              // HOUR_OF_DAY
	  0,              // MINUTE
	  0,              // SECONDS
	  0,              // MILLISECONDS
	
	  1,              // WEEK_OF_YEAR
	  undefined,              // WEEK_OF_MONTH
	
	  1,              // DAY_OF_YEAR
	  GregorianCalendar.SUNDAY,         // DAY_OF_WEEK
	  1             // DAY_OF_WEEK_IN_MONTH
	];
	
	var MAX_VALUES = [
	  undefined,
	  292278994,      // YEAR
	  GregorianCalendar.DECEMBER,       // MONTH
	  undefined, // DAY_OF_MONTH
	  23,             // HOUR_OF_DAY
	  59,             // MINUTE
	  59,             // SECONDS
	  999,            // MILLISECONDS
	  undefined,             // WEEK_OF_YEAR
	  undefined,              // WEEK_OF_MONTH
	  undefined,            // DAY_OF_YEAR
	  GregorianCalendar.SATURDAY,       // DAY_OF_WEEK
	  undefined              // DAY_OF_WEEK_IN_MONTH
	];
	
	GregorianCalendar.prototype = {
	  constructor: GregorianCalendar,
	
	  isGregorianCalendar: 1,
	
	  /**
	   * Determines if current year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @method
	   * @member Date.Gregorian
	   */
	  isLeapYear: function () {
	    return isLeapYear(this.getYear());
	  },
	
	  /**
	   * Return local info for current date instance
	   * @returns {Object}
	   */
	  getLocale: function () {
	    return this.locale;
	  },
	
	  /**
	   * Returns the minimum value for
	   * the given calendar field of this GregorianCalendar instance.
	   * The minimum value is defined as the smallest value
	   * returned by the get method for any possible time value,
	   * taking into consideration the current values of the getFirstDayOfWeek,
	   * getMinimalDaysInFirstWeek.
	   * @param field the calendar field.
	   * @returns {Number} the minimum value for the given calendar field.
	   */
	  getActualMinimum: function (field) {
	    if (MIN_VALUES[field] !== undefined) {
	      return MIN_VALUES[field];
	    }
	
	    var fields = this.fields;
	    if (field === WEEK_OF_MONTH) {
	      var cal = new GregorianCalendar(fields[YEAR], fields[MONTH], 1);
	      return cal.get(WEEK_OF_MONTH);
	    }
	
	    throw new Error('minimum value not defined!');
	  },
	
	  /**
	   * Returns the maximum value for the given calendar field
	   * of this GregorianCalendar instance.
	   * The maximum value is defined as the largest value returned
	   * by the get method for any possible time value, taking into consideration
	   * the current values of the getFirstDayOfWeek, getMinimalDaysInFirstWeek methods.
	   * @param field the calendar field.
	   * @returns {Number} the maximum value for the given calendar field.
	   */
	  getActualMaximum: function (field) {
	    if (MAX_VALUES[field] !== undefined) {
	      return MAX_VALUES[field];
	    }
	    var value,
	      fields = this.fields;
	    switch (field) {
	      case DAY_OF_MONTH:
	        value = getMonthLength(fields[YEAR], fields[MONTH]);
	        break;
	
	      case WEEK_OF_YEAR:
	        var endOfYear = new GregorianCalendar(fields[YEAR], GregorianCalendar.DECEMBER, 31);
	        value = endOfYear.get(WEEK_OF_YEAR);
	        if (value === 1) {
	          value = 52;
	        }
	        break;
	
	      case WEEK_OF_MONTH:
	        var endOfMonth = new GregorianCalendar(fields[YEAR], fields[MONTH], getMonthLength(fields[YEAR], fields[MONTH]));
	        value = endOfMonth.get(WEEK_OF_MONTH);
	        break;
	
	      case DAY_OF_YEAR:
	        value = getYearLength(fields[YEAR]);
	        break;
	
	      case DAY_OF_WEEK_IN_MONTH:
	        value = toInt((getMonthLength(fields[YEAR], fields[MONTH]) - 1) / 7) + 1;
	        break;
	    }
	    if (value === undefined) {
	      throw new Error('maximum value not defined!');
	    }
	    return value;
	  },
	
	  /**
	   * Determines if the given calendar field has a value set,
	   * including cases that the value has been set by internal fields calculations
	   * triggered by a get method call.
	   * @param field the calendar field to be cleared.
	   * @returns {boolean} true if the given calendar field has a value set; false otherwise.
	   */
	  isSet: function (field) {
	    return this.fields[field] !== undefined;
	  },
	
	  /**
	   * Converts the time value (millisecond offset from the Epoch)
	   * to calendar field values.
	   * @protected
	   */
	  computeFields: function () {
	    var time = this.time;
	    var timezoneOffset = this.timezoneOffset * ONE_MINUTE;
	    var fixedDate = toInt(timezoneOffset / ONE_DAY);
	    var timeOfDay = timezoneOffset % ONE_DAY;
	    fixedDate += toInt(time / ONE_DAY);
	    timeOfDay += time % ONE_DAY;
	    if (timeOfDay >= ONE_DAY) {
	      timeOfDay -= ONE_DAY;
	      fixedDate++;
	    } else {
	      while (timeOfDay < 0) {
	        timeOfDay += ONE_DAY;
	        fixedDate--;
	      }
	    }
	
	    fixedDate += EPOCH_OFFSET;
	
	    var date = Utils.getGregorianDateFromFixedDate(fixedDate);
	
	    var year = date.year;
	
	    var fields = this.fields;
	    fields[YEAR] = year;
	    fields[MONTH] = date.month;
	    fields[DAY_OF_MONTH] = date.dayOfMonth;
	    fields[DAY_OF_WEEK] = date.dayOfWeek;
	
	    if (timeOfDay !== 0) {
	      fields[HOUR_OF_DAY] = toInt(timeOfDay / ONE_HOUR);
	      var r = timeOfDay % ONE_HOUR;
	      fields[MINUTE] = toInt(r / ONE_MINUTE);
	      r %= ONE_MINUTE;
	      fields[SECONDS] = toInt(r / ONE_SECOND);
	      fields[MILLISECONDS] = r % ONE_SECOND;
	    } else {
	      fields[HOUR_OF_DAY] =
	        fields[MINUTE] =
	          fields[SECONDS] =
	            fields[MILLISECONDS] = 0;
	    }
	
	    var fixedDateJan1 = Utils.getFixedDate(year, GregorianCalendar.JANUARY, 1);
	    var dayOfYear = fixedDate - fixedDateJan1 + 1;
	    var fixDateMonth1 = fixedDate - date.dayOfMonth + 1;
	
	    fields[DAY_OF_YEAR] = dayOfYear;
	    fields[DAY_OF_WEEK_IN_MONTH] = toInt((date.dayOfMonth - 1) / 7) + 1;
	
	    var weekOfYear = getWeekNumber(this, fixedDateJan1, fixedDate);
	
	    // 本周没有足够的时间在当前年
	    if (weekOfYear === 0) {
	      // If the date belongs to the last week of the
	      // previous year, use the week number of "12/31" of
	      // the "previous" year.
	      var fixedDec31 = fixedDateJan1 - 1;
	      var prevJan1 = fixedDateJan1 - getYearLength(year - 1);
	      weekOfYear = getWeekNumber(this, prevJan1, fixedDec31);
	    } else
	    // 本周是年末最后一周，可能有足够的时间在新的一年
	    if (weekOfYear >= 52) {
	      var nextJan1 = fixedDateJan1 + getYearLength(year);
	      var nextJan1st = getDayOfWeekDateOnOrBefore(nextJan1 + 6, this.firstDayOfWeek);
	      var nDays = nextJan1st - nextJan1;
	      // 本周有足够天数在新的一年
	      if (nDays >= this.minimalDaysInFirstWeek &&
	          // 当天确实在本周，weekOfYear === 53 时是不需要这个判断
	        fixedDate >= (nextJan1st - 7)
	      ) {
	        weekOfYear = 1;
	      }
	    }
	
	    fields[WEEK_OF_YEAR] = weekOfYear;
	    fields[WEEK_OF_MONTH] = getWeekNumber(this, fixDateMonth1, fixedDate);
	
	    this.fieldsComputed = true;
	  },
	
	  /**
	   * Converts calendar field values to the time value
	   * (millisecond offset from the Epoch).
	   * @protected
	   */
	  computeTime: function () {
	    if (!this.isSet(YEAR)) {
	      throw new Error('year must be set for GregorianCalendar');
	    }
	
	    var fields = this.fields;
	
	    var year = fields[YEAR];
	    var timeOfDay = 0;
	    if (this.isSet(HOUR_OF_DAY)) {
	      timeOfDay += fields[HOUR_OF_DAY];
	    }
	    timeOfDay *= 60;
	    timeOfDay += fields[MINUTE] || 0;
	    timeOfDay *= 60;
	    timeOfDay += fields[SECONDS] || 0;
	    timeOfDay *= 1000;
	    timeOfDay += fields[MILLISECONDS] || 0;
	
	    var fixedDate = 0;
	
	    fields[YEAR] = year;
	
	    fixedDate = fixedDate + this.getFixedDate();
	
	    // millis represents local wall-clock time in milliseconds.
	    var millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;
	
	    millis -= this.timezoneOffset * ONE_MINUTE;
	
	    this.time = millis;
	
	    this.computeFields();
	  },
	
	  /**
	   * Fills in any unset fields in the calendar fields. First,
	   * the computeTime() method is called if the time value (millisecond offset from the Epoch)
	   * has not been calculated from calendar field values.
	   * Then, the computeFields() method is called to calculate all calendar field values.
	   * @protected
	   */
	  complete: function () {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    if (!this.fieldsComputed) {
	      this.computeFields();
	    }
	  },
	
	  getFixedDate: function () {
	
	    var self = this;
	
	    var fields = self.fields;
	
	    var firstDayOfWeekCfg = self.firstDayOfWeek;
	
	    var year = fields[YEAR];
	
	    var month = GregorianCalendar.JANUARY;
	
	    if (self.isSet(MONTH)) {
	      month = fields[MONTH];
	      if (month > GregorianCalendar.DECEMBER) {
	        year += toInt(month / 12);
	        month %= 12;
	      } else if (month < GregorianCalendar.JANUARY) {
	        year += floorDivide(month / 12);
	        month = mod(month, 12);
	      }
	    }
	
	    // Get the fixed date since Jan 1, 1 (Gregorian). We are on
	    // the first day of either `month' or January in 'year'.
	    var fixedDate = Utils.getFixedDate(year, month, 1);
	    var firstDayOfWeek;
	    var dayOfWeek = self.firstDayOfWeek;
	
	    if (self.isSet(DAY_OF_WEEK)) {
	      dayOfWeek = fields[DAY_OF_WEEK];
	    }
	
	    if (self.isSet(MONTH)) {
	      if (self.isSet(DAY_OF_MONTH)) {
	        fixedDate += fields[DAY_OF_MONTH] - 1;
	      } else {
	        if (self.isSet(WEEK_OF_MONTH)) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
	
	          // If we have enough days in the first week, then
	          // move to the previous week.
	          if ((firstDayOfWeek - fixedDate) >= self.minimalDaysInFirstWeek) {
	            firstDayOfWeek -= 7;
	          }
	
	          if (dayOfWeek !== firstDayOfWeekCfg) {
	            firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	          }
	
	          fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_MONTH] - 1);
	        } else {
	          var dowim;
	          if (self.isSet(DAY_OF_WEEK_IN_MONTH)) {
	            dowim = fields[DAY_OF_WEEK_IN_MONTH];
	          } else {
	            dowim = 1;
	          }
	          var lastDate = (7 * dowim);
	          if (dowim < 0) {
	            lastDate = getMonthLength(year, month) + (7 * (dowim + 1));
	          }
	          fixedDate = getDayOfWeekDateOnOrBefore(fixedDate + lastDate - 1, dayOfWeek);
	        }
	      }
	    } else {
	      // We are on the first day of the year.
	      if (self.isSet(DAY_OF_YEAR)) {
	        fixedDate += fields[DAY_OF_YEAR] - 1;
	      } else {
	        firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
	        // If we have enough days in the first week, then move
	        // to the previous week.
	        if ((firstDayOfWeek - fixedDate) >= self.minimalDaysInFirstWeek) {
	          firstDayOfWeek -= 7;
	        }
	        if (dayOfWeek !== firstDayOfWeekCfg) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	        }
	        fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_YEAR] - 1);
	      }
	    }
	
	    return fixedDate;
	  },
	
	  /**
	   * Returns this Calendar's time value in milliseconds
	   * @member Date.Gregorian
	   * @returns {Number} the current time as UTC milliseconds from the epoch.
	   */
	  getTime: function () {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    return this.time;
	  },
	
	  /**
	   * Sets this Calendar's current time from the given long value.
	   * @param time the new time in UTC milliseconds from the epoch.
	   */
	  setTime: function (time) {
	    this.time = time;
	    this.fieldsComputed = false;
	    this.complete();
	  },
	
	  /**
	   * Returns the value of the given calendar field.
	   * @param field the given calendar field.
	   * @returns {Number} the value for the given calendar field.
	   */
	  get: function (field) {
	    this.complete();
	    return this.fields[field];
	  },
	
	  /**
	   * Returns the year of the given calendar field.
	   * @method getYear
	   * @returns {Number} the year for the given calendar field.
	   */
	
	  /**
	   * Returns the month of the given calendar field.
	   * @method getMonth
	   * @returns {Number} the month for the given calendar field.
	   */
	
	  /**
	   * Returns the day of month of the given calendar field.
	   * @method getDayOfMonth
	   * @returns {Number} the day of month for the given calendar field.
	   */
	
	  /**
	   * Returns the hour of day of the given calendar field.
	   * @method getHourOfDay
	   * @returns {Number} the hour of day for the given calendar field.
	   */
	
	  /**
	   * Returns the minute of the given calendar field.
	   * @method getMinute
	   * @returns {Number} the minute for the given calendar field.
	   */
	
	  /**
	   * Returns the second of the given calendar field.
	   * @method getSecond
	   * @returns {Number} the second for the given calendar field.
	   */
	
	  /**
	   * Returns the millisecond of the given calendar field.
	   * @method getMilliSecond
	   * @returns {Number} the millisecond for the given calendar field.
	   */
	
	  /**
	   * Returns the week of year of the given calendar field.
	   * @method getWeekOfYear
	   * @returns {Number} the week of year for the given calendar field.
	   */
	
	  /**
	   * Returns the week of month of the given calendar field.
	   * @method getWeekOfMonth
	   * @returns {Number} the week of month for the given calendar field.
	   */
	
	  /**
	   * Returns the day of year of the given calendar field.
	   * @method getDayOfYear
	   * @returns {Number} the day of year for the given calendar field.
	   */
	
	  /**
	   * Returns the day of week of the given calendar field.
	   * @method getDayOfWeek
	   * @returns {Number} the day of week for the given calendar field.
	   */
	
	  /**
	   * Returns the day of week in month of the given calendar field.
	   * @method getDayOfWeekInMonth
	   * @returns {Number} the day of week in month for the given calendar field.
	   */
	
	  /**
	   * Sets the given calendar field to the given value.
	   * @param field the given calendar field.
	   * @param v the value to be set for the given calendar field.
	   */
	  set: function (field, v) {
	    var len = arguments.length;
	    if (len === 2) {
	      this.fields[field] = v;
	    } else if (len < MILLISECONDS + 1) {
	      for (var i = 0; i < len; i++) {
	        this.fields[YEAR + i] = arguments[i];
	      }
	    } else {
	      throw  new Error('illegal arguments for GregorianCalendar set');
	    }
	    this.time = undefined;
	  },
	
	  /**
	   * Set the year of the given calendar field.
	   * @method setYear
	   */
	
	  /**
	   * Set the month of the given calendar field.
	   * @method setMonth
	   */
	
	  /**
	   * Set the day of month of the given calendar field.
	   * @method setDayOfMonth
	   */
	
	  /**
	   * Set the hour of day of the given calendar field.
	   * @method setHourOfDay
	   */
	
	  /**
	   * Set the minute of the given calendar field.
	   * @method setMinute
	   */
	
	  /**
	   * Set the second of the given calendar field.
	   * @method setSecond
	   */
	
	  /**
	   * Set the millisecond of the given calendar field.
	   * @method setMilliSecond
	   */
	
	  /**
	   * Set the week of year of the given calendar field.
	   * @method setWeekOfYear
	   */
	
	  /**
	   * Set the week of month of the given calendar field.
	   * @method setWeekOfMonth
	   */
	
	  /**
	   * Set the day of year of the given calendar field.
	   * @method setDayOfYear
	   */
	
	  /**
	   * Set the day of week of the given calendar field.
	   * @method setDayOfWeek
	   */
	
	  /**
	   * Set the day of week in month of the given calendar field.
	   * @method setDayOfWeekInMonth
	   */
	
	  /**
	   * add for specified field based on two rules:
	   *
	   *  - Add rule 1. The value of field after the call minus the value of field before the
	   *  call is amount, modulo any overflow that has occurred in field
	   *  Overflow occurs when a field value exceeds its range and,
	   *  as a result, the next larger field is incremented or
	   *  decremented and the field value is adjusted back into its range.
	   *
	   *  - Add rule 2. If a smaller field is expected to be invariant,
	   *  but it is impossible for it to be equal to its
	   *  prior value because of changes in its minimum or maximum after
	   *  field is changed, then its value is adjusted to be as close
	   *  as possible to its expected value. A smaller field represents a
	   *  smaller unit of time. HOUR_OF_DAY is a smaller field than
	   *  DAY_OF_MONTH. No adjustment is made to smaller fields
	   *  that are not expected to be invariant. The calendar system
	   *  determines what fields are expected to be invariant.
	   *
	   *
	   *      @example
	   *      use('date/gregorian',function(S, GregorianCalendar){
	         *          var d = new GregorianCalendar();
	         *          d.set(2012, GregorianCalendar.JANUARY, 31);
	         *          d.add(Gregorian.MONTH,1);
	         *          // 2012-2-29
	         *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	         *          d.add(Gregorian.MONTH,12);
	         *          // 2013-2-28
	         *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	         *      });
	   *
	   * @param field the calendar field.
	   * @param {Number} amount he amount of date or time to be added to the field.
	   */
	  add: function (field, amount) {
	    if (!amount) {
	      return;
	    }
	    var self = this;
	    var fields = self.fields;
	    // computer and retrieve original value
	    var value = self.get(field);
	    if (field === YEAR) {
	      value += amount;
	      self.set(YEAR, value);
	      adjustDayOfMonth(self);
	    } else if (field === MONTH) {
	      value += amount;
	      var yearAmount = floorDivide(value / 12);
	      value = mod(value, 12);
	      if (yearAmount) {
	        self.set(YEAR, fields[YEAR] + yearAmount);
	      }
	      self.set(MONTH, value);
	      adjustDayOfMonth(self);
	    } else {
	      switch (field) {
	        case HOUR_OF_DAY:
	          amount *= ONE_HOUR;
	          break;
	        case MINUTE:
	          amount *= ONE_MINUTE;
	          break;
	        case SECONDS:
	          amount *= ONE_SECOND;
	          break;
	        case MILLISECONDS:
	          break;
	        case WEEK_OF_MONTH:
	        case WEEK_OF_YEAR:
	        case DAY_OF_WEEK_IN_MONTH:
	          amount *= ONE_WEEK;
	          break;
	        case DAY_OF_WEEK:
	        case DAY_OF_YEAR:
	        case DAY_OF_MONTH:
	          amount *= ONE_DAY;
	          break;
	        default:
	          throw new Error('illegal field for add');
	      }
	      self.setTime(self.time + amount);
	    }
	
	  },
	
	  /**
	   * add the year of the given calendar field.
	   * @method addYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the month of the given calendar field.
	   * @method addMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of month of the given calendar field.
	   * @method addDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the hour of day of the given calendar field.
	   * @method addHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the minute of the given calendar field.
	   * @method addMinute
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the second of the given calendar field.
	   * @method addSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the millisecond of the given calendar field.
	   * @method addMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the week of year of the given calendar field.
	   * @method addWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the week of month of the given calendar field.
	   * @method addWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of year of the given calendar field.
	   * @method addDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of week of the given calendar field.
	   * @method addDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * add the day of week in month of the given calendar field.
	   * @method addDayOfWeekInMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * Get rolled value for the field
	   * @protected
	   */
	  getRolledValue: function (value, amount, min, max) {
	    var diff = value - min;
	    var range = max - min + 1;
	    amount %= range;
	    return min + (diff + amount + range) % range;
	  },
	
	  /**
	   * Adds a signed amount to the specified calendar field without changing larger fields.
	   * A negative roll amount means to subtract from field without changing
	   * larger fields. If the specified amount is 0, this method performs nothing.
	   *
	   *
	   *
	   *      @example
	   *      var d = new GregorianCalendar();
	   *      d.set(1999, GregorianCalendar.AUGUST, 31);
	   *      // 1999-4-30
	   *      // Tuesday June 1, 1999
	   *      d.set(1999, GregorianCalendar.JUNE, 1);
	   *      d.add(Gregorian.WEEK_OF_MONTH,-1); // === d.add(Gregorian.WEEK_OF_MONTH,
	   *      d.get(Gregorian.WEEK_OF_MONTH));
	   *      // 1999-06-29
	   *
	   *
	   * @param field the calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   */
	  roll: function (field, amount) {
	    if (!amount) {
	      return;
	    }
	    var self = this;
	    // computer and retrieve original value
	    var value = self.get(field);
	    var min = self.getActualMinimum(field);
	    var max = self.getActualMaximum(field);
	    value = self.getRolledValue(value, amount, min, max);
	
	    self.set(field, value);
	
	    // consider compute time priority
	    switch (field) {
	      case MONTH:
	        adjustDayOfMonth(self);
	        break;
	      default:
	        // other fields are set already when get
	        self.updateFieldsBySet(field);
	        break;
	    }
	  },
	
	  /**
	   * roll the year of the given calendar field.
	   * @method rollYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the month of the given calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   * @method rollMonth
	   */
	
	  /**
	   * roll the day of month of the given calendar field.
	   * @method rollDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the hour of day of the given calendar field.
	   * @method rollHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the minute of the given calendar field.
	   * @method rollMinute
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the second of the given calendar field.
	   * @method rollSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the millisecond of the given calendar field.
	   * @method rollMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the week of year of the given calendar field.
	   * @method rollWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the week of month of the given calendar field.
	   * @method rollWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the day of year of the given calendar field.
	   * @method rollDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * roll the day of week of the given calendar field.
	   * @method rollDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */
	
	  /**
	   * remove other priority fields when call getFixedDate
	   * precondition: other fields are all set or computed
	   * @protected
	   */
	  updateFieldsBySet: function (field) {
	    var fields = this.fields;
	    switch (field) {
	      case WEEK_OF_MONTH:
	        fields[DAY_OF_MONTH] = undefined;
	        break;
	      case DAY_OF_YEAR:
	        fields[MONTH] = undefined;
	        break;
	      case DAY_OF_WEEK:
	        fields[DAY_OF_MONTH] = undefined;
	        break;
	      case WEEK_OF_YEAR:
	        fields[DAY_OF_YEAR] = undefined;
	        fields[MONTH] = undefined;
	        break;
	    }
	  },
	
	  /**
	   * get current date instance's timezone offset
	   * @returns {Number}
	   */
	  getTimezoneOffset: function () {
	    return this.timezoneOffset;
	  },
	
	  /**
	   * set current date instance's timezone offset
	   */
	  setTimezoneOffset: function (timezoneOffset) {
	    if (this.timezoneOffset !== timezoneOffset) {
	      this.fieldsComputed = undefined;
	      this.timezoneOffset = timezoneOffset;
	    }
	  },
	
	  /**
	   * set first day of week for current date instance
	   */
	  setFirstDayOfWeek: function (firstDayOfWeek) {
	    if (this.firstDayOfWeek !== firstDayOfWeek) {
	      this.firstDayOfWeek = firstDayOfWeek;
	      this.fieldsComputed = false;
	    }
	  },
	
	  /**
	   * Gets what the first day of the week is; e.g., SUNDAY in the U.S., MONDAY in France.
	   * @returns {Number} the first day of the week.
	   */
	  getFirstDayOfWeek: function () {
	    return this.firstDayOfWeek;
	  },
	
	  /**
	   * Sets what the minimal days required in the first week of the year are; For example,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * call this method with value 1.
	   * If it must be a full week, use value 7.
	   * @param minimalDaysInFirstWeek the given minimal days required in the first week of the year.
	   */
	  setMinimalDaysInFirstWeek: function (minimalDaysInFirstWeek) {
	    if (this.minimalDaysInFirstWeek !== minimalDaysInFirstWeek) {
	      this.minimalDaysInFirstWeek = minimalDaysInFirstWeek;
	      this.fieldsComputed = false;
	    }
	  },
	
	  /**
	   * Gets what the minimal days required in the first week of the year are; e.g.,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * this method returns 1.
	   * If the minimal days required must be a full week, this method returns 7.
	   * @returns {Number} the minimal days required in the first week of the year.
	   */
	  getMinimalDaysInFirstWeek: function () {
	    return this.minimalDaysInFirstWeek;
	  },
	
	  /**
	   * Returns the number of weeks in the week year
	   * represented by this GregorianCalendar.
	   *
	   * For example, if this GregorianCalendar's date is
	   * December 31, 2008 with the ISO
	   * 8601 compatible setting, this method will return 53 for the
	   * period: December 29, 2008 to January 3, 2010
	   * while getActualMaximum(WEEK_OF_YEAR) will return
	   * 52 for the period: December 31, 2007 to December 28, 2008.
	   *
	   * @return {Number} the number of weeks in the week year.
	   */
	  getWeeksInWeekYear: function () {
	    var weekYear = this.getWeekYear();
	    if (weekYear === this.get(YEAR)) {
	      return this.getActualMaximum(WEEK_OF_YEAR);
	    }
	    // Use the 2nd week for calculating the max of WEEK_OF_YEAR
	    var gc = this.clone();
	    gc.setWeekDate(weekYear, 2, this.get(DAY_OF_WEEK));
	    return gc.getActualMaximum(WEEK_OF_YEAR);
	  },
	
	  /**
	   * Returns the week year represented by this GregorianCalendar.
	   * The dates in the weeks between 1 and the
	   * maximum week number of the week year have the same week year value
	   * that may be one year before or after the calendar year value.
	   *
	   * @return {Number} the week year represented by this GregorianCalendar.
	   */
	  getWeekYear: function () {
	    var year = this.get(YEAR); // implicitly  complete
	    var weekOfYear = this.get(WEEK_OF_YEAR);
	    var month = this.get(MONTH);
	    if (month === GregorianCalendar.JANUARY) {
	      if (weekOfYear >= 52) {
	        --year;
	      }
	    } else if (month === GregorianCalendar.DECEMBER) {
	      if (weekOfYear === 1) {
	        ++year;
	      }
	    }
	    return year;
	  },
	  /**
	   * Sets this GregorianCalendar to the date given by the date specifiers - weekYear,
	   * weekOfYear, and dayOfWeek. weekOfYear follows the WEEK_OF_YEAR numbering.
	   * The dayOfWeek value must be one of the DAY_OF_WEEK values: SUNDAY to SATURDAY.
	   *
	   * @param weekYear    the week year
	   * @param weekOfYear  the week number based on weekYear
	   * @param dayOfWeek   the day of week value
	   */
	  setWeekDate: function (weekYear, weekOfYear, dayOfWeek) {
	    if (dayOfWeek < GregorianCalendar.SUNDAY || dayOfWeek > GregorianCalendar.SATURDAY) {
	      throw new Error('invalid dayOfWeek: ' + dayOfWeek);
	    }
	    var fields = this.fields;
	    // To avoid changing the time of day fields by date
	    // calculations, use a clone with the GMT time zone.
	    var gc = this.clone();
	    gc.clear();
	    gc.setTimezoneOffset(0);
	    gc.set(YEAR, weekYear);
	    gc.set(WEEK_OF_YEAR, 1);
	    gc.set(DAY_OF_WEEK, this.getFirstDayOfWeek());
	    var days = dayOfWeek - this.getFirstDayOfWeek();
	    if (days < 0) {
	      days += 7;
	    }
	    days += 7 * (weekOfYear - 1);
	    if (days !== 0) {
	      gc.add(DAY_OF_YEAR, days);
	    } else {
	      gc.complete();
	    }
	    fields[YEAR] = gc.get(YEAR);
	    fields[MONTH] = gc.get(MONTH);
	    fields[DAY_OF_MONTH] = gc.get(DAY_OF_MONTH);
	    this.complete();
	  },
	  /**
	   * Creates and returns a copy of this object.
	   * @returns {Date.Gregorian}
	   */
	  clone: function () {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    var cal = new GregorianCalendar(this.timezoneOffset, this.locale);
	    cal.setTime(this.time);
	    return cal;
	  },
	
	  /**
	   * Compares this GregorianCalendar to the specified Object.
	   * The result is true if and only if the argument is a GregorianCalendar object
	   * that represents the same time value (millisecond offset from the Epoch)
	   * under the same Calendar parameters and Gregorian change date as this object.
	   * @param {Date.Gregorian} obj the object to compare with.
	   * @returns {boolean} true if this object is equal to obj; false otherwise.
	   */
	  equals: function (obj) {
	    return this.getTime() === obj.getTime() &&
	      this.firstDayOfWeek === obj.firstDayOfWeek &&
	      this.timezoneOffset === obj.timezoneOffset &&
	      this.minimalDaysInFirstWeek === obj.minimalDaysInFirstWeek;
	  },
	
	  /**
	   * Sets all the calendar field values or specified field and the time value
	   * (millisecond offset from the Epoch) of this Calendar undefined.
	   * This means that isSet() will return false for all the calendar fields,
	   * and the date and time calculations will treat the fields as if they had never been set.
	   * @param [field] the calendar field to be cleared.
	   */
	  clear: function (field) {
	    if (field === undefined) {
	      this.field = [];
	    } else {
	      this.fields[field] = undefined;
	    }
	    this.time = undefined;
	    this.fieldsComputed = false;
	  }
	};
	
	var GregorianCalendarProto = GregorianCalendar.prototype;
	
	Utils.each(fields, function (f, index) {
	  if (f) {
	    GregorianCalendarProto['get' + f] = function () {
	      return this.get(index);
	    };
	
	    GregorianCalendarProto['isSet' + f] = function () {
	      return this.isSet(index);
	    };
	
	    GregorianCalendarProto['set' + f] = function (v) {
	      return this.set(index, v);
	    };
	
	    GregorianCalendarProto['add' + f] = function (v) {
	      return this.add(index, v);
	    };
	
	    GregorianCalendarProto['roll' + f] = function (v) {
	      return this.roll(index, v);
	    };
	  }
	});
	
	// ------------------- private start
	
	function adjustDayOfMonth(self) {
	  var fields = self.fields;
	  var year = fields[YEAR];
	  var month = fields[MONTH];
	  var monthLen = getMonthLength(year, month);
	  var dayOfMonth = fields[DAY_OF_MONTH];
	  if (dayOfMonth > monthLen) {
	    self.set(DAY_OF_MONTH, monthLen);
	  }
	}
	
	function getMonthLength(year, month) {
	  return isLeapYear(year) ? LEAP_MONTH_LENGTH[month] : MONTH_LENGTH[month];
	}
	
	function getYearLength(year) {
	  return isLeapYear(year) ? 366 : 365;
	}
	
	function getWeekNumber(self, fixedDay1, fixedDate) {
	  var fixedDay1st = getDayOfWeekDateOnOrBefore(fixedDay1 + 6, self.firstDayOfWeek);
	  var nDays = (fixedDay1st - fixedDay1);
	  if (nDays >= self.minimalDaysInFirstWeek) {
	    fixedDay1st -= 7;
	  }
	  var normalizedDayOfPeriod = (fixedDate - fixedDay1st);
	  return floorDivide(normalizedDayOfPeriod / 7) + 1;
	}
	
	function getDayOfWeekDateOnOrBefore(fixedDate, dayOfWeek) {
	  // 1.1.1 is monday
	  // one week has 7 days
	  return fixedDate - mod(fixedDate - dayOfWeek, 7);
	}
	
	// ------------------- private end
	
	module.exports = GregorianCalendar;
	/*
	 http://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html
	
	 TODO
	 - day saving time
	 - i18n
	 - julian calendar
	 */


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * utils for gregorian date
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	
	var Const = __webpack_require__(78);
	var floor = Math.floor;
	var ACCUMULATED_DAYS_IN_MONTH
	        //   1/1 2/1 3/1 4/1 5/1 6/1 7/1 8/1 9/1 10/1 11/1 12/1
	        = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	
	    ACCUMULATED_DAYS_IN_MONTH_LEAP
	        //   1/1 2/1   3/1   4/1   5/1   6/1   7/1   8/1   9/1
	        // 10/1   11/1   12/1
	        = [0, 31, 59 + 1, 90 + 1, 120 + 1, 151 + 1, 181 + 1,
	            212 + 1, 243 + 1, 273 + 1, 304 + 1, 334 + 1],
	
	    DAYS_OF_YEAR = 365,
	    DAYS_OF_4YEAR = 365 * 4 + 1,
	    DAYS_OF_100YEAR = DAYS_OF_4YEAR * 25 - 1,
	    DAYS_OF_400YEAR = DAYS_OF_100YEAR * 4 + 1;
	
	function getDayOfYear(year, month, dayOfMonth) {
	    return dayOfMonth + (exports.isLeapYear(year) ?
	        ACCUMULATED_DAYS_IN_MONTH_LEAP[month] :
	        ACCUMULATED_DAYS_IN_MONTH[month]);
	}
	
	function getDayOfWeekFromFixedDate(fixedDate) {
	    // The fixed day 1 (January 1, 1 Gregorian) is Monday.
	    if (fixedDate >= 0) {
	        return fixedDate % 7;
	    }
	    return exports.mod(fixedDate, 7);
	}
	
	function getGregorianYearFromFixedDate(fixedDate) {
	    var d0;
	    var d1, d2, d3;//, d4;
	    var n400, n100, n4, n1;
	    var year;
	    d0 = fixedDate - 1;
	
	    n400 = floor(d0 / DAYS_OF_400YEAR);
	    d1 = exports.mod(d0, DAYS_OF_400YEAR);
	    n100 = floor(d1 / DAYS_OF_100YEAR);
	    d2 = exports.mod(d1, DAYS_OF_100YEAR);
	    n4 = floor(d2 / DAYS_OF_4YEAR);
	    d3 = exports.mod(d2, DAYS_OF_4YEAR);
	    n1 = floor(d3 / DAYS_OF_YEAR);
	
	    year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
	
	    // ?
	    if (!(n100 === 4 || n1 === 4)) {
	        ++year;
	    }
	
	    return year;
	}
	
	var exports = module.exports = {
	    each: function (arr, fn) {
	        for (var i = 0, len = arr.length; i < len; i++) {
	            if (fn(arr[i], i, arr) === false) {
	                break;
	            }
	        }
	    },
	
	    mix: function (t, s) {
	        for (var p in s) {
	            t[p] = s[p];
	        }
	    },
	
	    isLeapYear: function (year) {
	        if ((year & 3) !== 0) {
	            return false;
	        }
	        return (year % 100 !== 0) || (year % 400 === 0);
	    },
	
	    mod: function (x, y) {
	        // 负数时不是镜像关系
	        return (x - y * floor(x / y));
	    },
	
	    // month: 0 based
	    getFixedDate: function (year, month, dayOfMonth) {
	        var prevYear = year - 1;
	        // 考虑公元前
	        return DAYS_OF_YEAR * prevYear + floor(prevYear / 4) -
	            floor(prevYear / 100) + floor(prevYear / 400) +
	            getDayOfYear(year, month, dayOfMonth);
	    },
	
	    getGregorianDateFromFixedDate: function (fixedDate) {
	        var year = getGregorianYearFromFixedDate(fixedDate);
	        var jan1 = exports.getFixedDate(year, Const.JANUARY, 1);
	        var isLeap = exports.isLeapYear(year);
	        var ACCUMULATED_DAYS = isLeap ? ACCUMULATED_DAYS_IN_MONTH_LEAP : ACCUMULATED_DAYS_IN_MONTH;
	        var daysDiff = fixedDate - jan1;
	        var month, i;
	
	        for (i = 0; i < ACCUMULATED_DAYS.length; i++) {
	            if (ACCUMULATED_DAYS[i] <= daysDiff) {
	                month = i;
	            } else {
	                break;
	            }
	        }
	
	        var dayOfMonth = fixedDate - jan1 - ACCUMULATED_DAYS[month] + 1;
	        var dayOfWeek = getDayOfWeekFromFixedDate(fixedDate);
	
	        return {
	            year: year,
	            month: month,
	            dayOfMonth: dayOfMonth,
	            dayOfWeek: dayOfWeek,
	            isLeap: isLeap
	        };
	    }
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * @ignore
	 * const for gregorian date
	 * @author yiminghe@gmail.com
	 */
	
	module.exports = {
	    /**
	     * Enum indicating sunday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    SUNDAY: 0,
	    /**
	     * Enum indicating monday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    MONDAY: 1,
	    /**
	     * Enum indicating tuesday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    TUESDAY: 2,
	    /**
	     * Enum indicating wednesday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    WEDNESDAY: 3,
	    /**
	     * Enum indicating thursday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    THURSDAY: 4,
	    /**
	     * Enum indicating friday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    FRIDAY: 5,
	    /**
	     * Enum indicating saturday
	     * @type Number
	     * @member Date.Gregorian
	     */
	    SATURDAY: 6,
	    /**
	     * Enum indicating january
	     * @type Number
	     * @member Date.Gregorian
	     */
	    JANUARY: 0,
	    /**
	     * Enum indicating february
	     * @type Number
	     * @member Date.Gregorian
	     */
	    FEBRUARY: 1,
	    /**
	     * Enum indicating march
	     * @type Number
	     * @member Date.Gregorian
	     */
	    MARCH: 2,
	    /**
	     * Enum indicating april
	     * @type Number
	     * @member Date.Gregorian
	     */
	    APRIL: 3,
	    /**
	     * Enum indicating may
	     * @type Number
	     * @member Date.Gregorian
	     */
	    MAY: 4,
	    /**
	     * Enum indicating june
	     * @type Number
	     * @member Date.Gregorian
	     */
	    JUNE: 5,
	    /**
	     * Enum indicating july
	     * @type Number
	     * @member Date.Gregorian
	     */
	    JULY: 6,
	    /**
	     * Enum indicating august
	     * @type Number
	     * @member Date.Gregorian
	     */
	    AUGUST: 7,
	    /**
	     * Enum indicating september
	     * @type Number
	     * @member Date.Gregorian
	     */
	    SEPTEMBER: 8,
	    /**
	     * Enum indicating october
	     * @type Number
	     * @member Date.Gregorian
	     */
	    OCTOBER: 9,
	    /**
	     * Enum indicating november
	     * @type Number
	     * @member Date.Gregorian
	     */
	    NOVEMBER: 10,
	    /**
	     * Enum indicating december
	     * @type Number
	     * @member Date.Gregorian
	     */
	    DECEMBER: 11
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * en-us locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	module.exports = {
	    // in minutes
	    timezoneOffset: -8 * 60,
	    firstDayOfWeek: 0,
	    minimalDaysInFirstWeek: 1,
	
	    // DateFormatSymbols
	    eras: ['BC', 'AD'],
	    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	        'August', 'September', 'October', 'November', 'December'],
	    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	        'Oct', 'Nov', 'Dec'],
	    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
	        'Saturday'],
	    shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    ampms: ['AM', 'PM'],
	    datePatterns: ['EEEE, MMMM d, yyyy', 'MMMM d, yyyy', 'MMM d, yyyy', 'M/d/yy'],
	    timePatterns: ['h:mm:ss a \'GMT\'Z', 'h:mm:ss a', 'h:mm:ss a', 'h:mm a'],
	    dateTimePattern: '{date} {time}'
	};


/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * zh-cn locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	module.exports = {
	  // in minutes
	  timezoneOffset: 8 * 60,
	  firstDayOfWeek: 1,
	  minimalDaysInFirstWeek: 1
	};


/***/ }
]);
//# sourceMappingURL=form.js.map