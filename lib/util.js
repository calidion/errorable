
var util = {
  /**
   * Easy way to make an error code
   * @param entity
   * @param property
   * @param event
   * @param type
   * @returns {number}
   */
  make: function(entity, property, event, type) {
    entity = entity || 0;
    property = property || 0;
    event = event || 0;
    type = type || 0;
    return (entity << 24) | (property << 16) | (event << 8) | type;
  },

  /**
   * Easy way to make a custom error code
   * @param entity
   * @param property
   * @param event
   * @param type
   * @returns {number}
   */

  customeMake: function(entity, property, event, type) {
    return util.make(entity | 0x80, property | 0x80, event | 0x80, type | 0x80);
  },

  /**
   * Add an error with error name, code, message
   *
   * @param name
   * @param code
   * @param message
   * @returns {boolean}
   */
  add: function(name, code, message) {
    var base = require('./../errors/base');
    if (name in base) {
      return false
    }
    base[name] = {
      code: code,
      message: message
    }
    return true;
  },

  /**
   * Update a locale item
   * @param name
   * @param value
   * @param locale
   * @returns {boolean}
   */
  updateLocaleItem: function(name, value, locale) {
    if (!locale || !name || !value) {
      return false;
    }
    var locales = require('./../i18n/index');
    if (!(locale in locales)) {
      locales[locale] = {};
    }
    locales[locale][name] = value;
    return true;
  },

  /**
   * Get localized message
   * @param key
   * @param locale
   * @returns {*}
   */
  lang: function(key, locale) {
    var locales = require('../i18n/index');
    locale = locale || 'en';
    if (locale in locales) {
      if (locales[locale][key]) {
        return locales[locale][key];
      }
    }
    if (locales['en'] && locales['en'][key]) {
      return locales[locale][key];
    }
    return key ? key : '';
  }
};

module.exports = util;