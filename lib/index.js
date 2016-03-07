var Errorable = require('./errorable');
var Generator = require('./generator');

module.exports = {
  Errorable: Errorable,
  Generator: Generator,
  get: function(definitions, locale, upperCase) {
    locale = locale || 'zh-CN';
    return new Generator(definitions, locale, upperCase).errors;
  }
};
