/*
 ERROR CODE FORMAT:

 0x[31-24][23-16][15-8][7-0]

 [0-7]bit : Entity Code,
 [8-15]bit: Property / Entity Code
 [16-23]bit: Event Code
 [24-31]bit: Error Type Code

 */

var errors = require('./errors');
var util = require('./lib/util');
var nodeError = {
  locale: 'en',
  setLocale: function(locale) {
    this.locale = locale;
    var newErrors = {};
    for(var key in errors) {
      newErrors[key] = {code: errors[key].code};
      newErrors[key].message = util.lang(errors[key].message, locale);
    }
    return newErrors;
  },
  make: util.customeMake,
  add: function(name, code, message) {
    if (util.add(name, code, message)) {
      nodeError.errors[name] = {
        code: code,
        message: message
      };
      return true;
    };
    return false;
  },
  updateLocaleItem: function(name, value, locale) {
    if (util.updateLocaleItem(name, value, locale)) {
      if (nodeError.locale == locale) {
        nodeError.errors = nodeError.setLocale(locale);
      }
      return true;
    }
    return false;
  }
};

nodeError.errors = nodeError.setLocale(nodeError.locale);


module.exports = nodeError;
