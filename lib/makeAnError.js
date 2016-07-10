var util = require('util');

module.exports = function(data) {
  var temp = {};
  /* eslint no-unused-vars: 0 */
  var func = (function(obj, innerData) {
    var str = '(function() {var Errorable = require(\'./errorable\'); function ' +
      data.name + '(message, extra) { Error.captureStackTrace(this, this.constructor);' +
      ' this.message = message; ' +
      ' this.extra = extra; ' +
      ' Errorable.call(this, innerData); }' +
      ' util.inherits(' + data.name + ', Error); ' +
      ' obj.func = ' + data.name + ';})();';

    /* eslint no-eval: 0 */
    eval(str);
  })(temp, data);
  return temp.func;
};
