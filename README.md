# rc-form-validation
---

FormValidation For React.

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-form-validation)](http://spmjs.io/package/rc-form-validation)
[![build status][travis-image]][travis-url]
[![Coverage Status](https://coveralls.io/repos/react-component/form-validation/badge.svg)](https://coveralls.io/r/react-component/form-validation)
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-form-validation)](https://saucelabs.com/u/rc-form-validation)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-form-validation.svg)](https://saucelabs.com/u/rc-form-validation)

[npm-image]: http://img.shields.io/npm/v/rc-form-validation.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-form-validation
[travis-image]: https://img.shields.io/travis/react-component/form-validation.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/form-validation
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/form-validation.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/form-validation
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-form-validation.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-form-validation

## Feature

* support ie8,ie8+,chrome,firefox,safari

## install

[![rc-form-validation](https://nodei.co/npm/rc-form-validation.png)](https://npmjs.org/package/rc-form-validation)

## Usage

```js
var Validation = require('../');
var Validator = Validation.Validator;
React.render(<Validation ref='validation' onValidate={this.onValidate}>
        <Validator ref='validator' rules={[{type: 'string', min: 5, max: 10}, {validator: validateInput}]}>
          <input name="name" value={state.formData.name.value} ref="input" onChange={this.onInputChange}/>
        </Validator>
        <Validator rules={[{type: 'string', required:true, whitespace:true}]}>
          <input name="pass" value={state.formData.pass.value}/>
        </Validator>
      {state.formData.name.errors && state.formData.name.errors.length ? <div ref='error'>{state.formData.name.errors.join(',')}</div> : null}
        {state.formData.pass.errors && state.formData.pass.errors.length ? <div ref='error2'>{state.formData.pass.errors.join(',')}</div> : null}
      </Validation>,container);
```

## API

### Validation

#### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>onValidate</td>
          <td>Function</td>
          <td></td>
          <td>called when validator inside it starts to validate</td>
        </tr>
    </tbody>
</table>

#### methods

- validate(callback:function): validate all fields, call callback with isValid as parameter
- reset: reset validation to initial state, used for form reset
- forceValidate(fields:String[],callback:Function): validate specified fields, call callback with isValid as parameter. fields is component's name which is wrapped by Validator


### Validator

Validator 's children must be one component which support trigger handler and value/name prop such as <input />

#### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>rules</td>
          <td>Object|Array</td>
          <td></td>
          <td>see https://github.com/yiminghe/async-validator .
          for example: {type:'string',min:4},[{type:'string',whitespace:true,required:true},{validator:validateFn}] </td>
        </tr>
        <tr>
          <td>trigger</td>
          <td>String</td>
          <td>onChange</td>
          <td>when to validate</td>
        </tr>
    </tbody>
</table>

### mixins

Validation.FieldMixin

provide the following methods:

#### setField

sync individual field which does not need validation

#### handleValidate

used as value for onValidate props of Validation

## Development

```
npm install
npm start
```

## Example

http://localhost:8010/examples/

online example: http://react-component.github.io/form-validation/examples/

## Test Case

http://localhost:8010/tests/runner.html?coverage

## Coverage

http://localhost:8010/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8010/tests/runner.html?coverage

## License

rc-form-validation is released under the MIT license.
