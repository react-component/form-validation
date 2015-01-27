var util = require('./util');

/**
 *  Encapsulates a validation error.
 */
var ValidationError = function (msg) {
  this.message = msg || this.name;
};

util.inherits(ValidationError, Error);

ValidationError.prototype.name = 'ValidationError';

module.exports = ValidationError;
