var Errorable = require('./errorable');
var Generator = require('./generator');

module.exports = {
  Errorable: Errorable,
  Generator: Generator,
  get: function(definitions, locale) {
    locale = locale || 'zh-CN';
    return new Generator(definitions, locale).errors;
  }
};
