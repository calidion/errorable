var DEFAULT_LOCALE = 'zh-CN';

var makeAnError = require('./makeAnError');

function Errorable(options) {
  this.purify = function(locale) {
    return {
      code: this.code,
      name: this.name,
      message: this.getMessage(locale)
    };
  };

  // Deprecated
  this.restify = this.purify;

  this.toString = function(locale) {
    return String('[' + this.name + '] => {message: ' + this.getMessage(locale) + '}');
  };

  this.getMessage = function(locale) {
    return (this.prefix ? this.prefix + ':' : '') + this.messages[locale || this.locale];
  };

  this.localize = function(locale, clone) {
    clone = clone || false;
    if (!clone) {
      this.message = this.getMessage(locale);
      return this;
    }
    return makeAnError({
      locale: this.locale,
      name: this.name,
      code: this.code,
      prefix: this.prefix,
      messages: this.messages
    });
  };
  this.locale = options.locale || DEFAULT_LOCALE;
  this.name = options.name || '';
  this.code = options.code !== undefined ? options.code : this.name;
  this.prefix = options.prefix;
  this.messages = options.messages || {};
  this.message = this.getMessage();
}

module.exports = Errorable;
