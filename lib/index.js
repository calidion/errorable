var Errorable = require('./errorable');
var Generator = require('./generator');
var makeAnError = require('./makeAnError');

module.exports = {
  Errorable: Errorable,
  Generator: Generator,
  makeAnError: makeAnError,
  get: function(definitions, locale, upperCase) {
    locale = locale || 'zh-CN';
    return new Generator(definitions, locale, upperCase).errors;
  }
};
