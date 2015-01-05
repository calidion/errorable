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
var webError = {
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
      webError.errors[name] = {
        code: code,
        message: message
      };
      return true;
    };
    return false;
  },
  updateLocaleItem: function(name, value, locale) {
    if (util.updateLocaleItem(name, value, locale)) {
      if (webError.locale == locale) {
        webError.errors = webError.setLocale(locale);
      }
      return true;
    }
    return false;
  }
};

webError.errors = webError.setLocale(webError.locale);


module.exports = webError;
