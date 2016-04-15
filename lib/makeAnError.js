module.exports = function(data) {
  var temp = {};
  /* eslint no-unused-vars: 0 */
  var func = (function(obj, innerData) {
    var str = '(function() {var Errorable = require(\'./errorable\'); function ' +
      data.name + '() {   var error = new Error(); this.stack = error.stack; ' +
      ' Errorable.call(this, innerData); } obj.func = ' + data.name + ';})();';

    /* eslint no-eval: 0 */
    eval(str);
  })(temp, data);
  return temp.func;
};
