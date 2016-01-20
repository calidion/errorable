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

module.exports = Errorable;
