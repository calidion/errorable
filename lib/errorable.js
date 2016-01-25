var DEFAULT_LOCALE = 'zh-CN';

function Errorable(options) {
  Error.call(this);
  this.locale = options.locale || DEFAULT_LOCALE;
  this.name = options.name || '';
  this.code = options.code !== undefined ? options.code : this.name;
  this.prefix = options.prefix;
  this.messages = options.messages || {};
  this.message = this.getMessage();
}

Errorable.prototype.restify = function (locale) {
  return {
    code: this.code,
    name: this.name,
    message: this.getMessage(locale)
  };
};

Errorable.prototype.toString = function (locale) {
  return String('[' + this.name + '] => {message: ' + this.getMessage(locale) + '}');
};

Errorable.prototype.getMessage = function (locale) {
  return (this.prefix ? this. prefix + ':' : '') + this.messages[locale || this.locale];
};

Errorable.prototype.localize = function (locale, clone) {
  clone = clone || false;
  if (!clone) {
    this.message = this.getMessage(locale);
    return this;
  }
  var error = new Errorable({
    locale: this.locale,
    name: this.name,
    code: this.code,
    prefix: this.prefix,
    messages: this.messages
  });
  return error;
};

module.exports = Errorable;
