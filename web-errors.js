/*!
 * Copyright (c) 2015 calidion<calidion@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function (name, definition) {
  'use strict';
  if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define === 'function' && typeof define.amd === 'object') {
    define(definition);
  } else {
    var obj = this || window;
    obj[name] = definition();
  }
})('webErrors', function (webErrors) {

  /*
   ERROR CODE FORMAT:

   0x[31-24][23-16][15-8][7-0]

   [0-7]bit : Entity Code,
   [8-15]bit: Property / Entity Code
   [16-23]bit: Event Code
   [24-31]bit: Error Type Code

   */
  'use strict';

  /**
   *  Error entities that throw or generate the errors
   *
   *  The most commonly used entities are listed
   *
   *  Total 8 bits
   *
   *  Users have the ability to extend the entities for their own projects
   *
   */

  var entities = {
    SYSTEM: 0,
    GENERIC: 0,
    UNKNOWN: 1,
    USER: 2,
    DATABASE: 3,
    IMAGE: 4,
    EMAIL: 5,
    FILE: 6,
    ADMIN: 7,
    PASSWORD: 8,
    INPUT: 9,
    NUMERIC: 10,
    CATEGORY: 11,
    NAME: 12,
    PHONE: 13
  };

  /**
   *  Error events that throw or generate the errors
   *
   *  The most commonly used events are listed
   *
   *  Total 8 bits
   *
   *  Users have the ability to extend the events for their own projects
   *
   */

  var events = {
    NONE: 0,
    REGISTER: 1,
    LOGIN: 2,
    LOGOUT: 3,

    CREATE: 4,

    //Alias have the same value
    RETRIEVE: 5,
    READ: 5,
    GET: 5,

    UPDATE: 6,
    REMOVE: 7,
    DELETE: 7
  };

  /**
   *  Error types that thrown or generated
   *
   *  The most commonly used types are listed
   *
   *  Total 8 bits
   *
   *  Users have the ability to extend the types for their own projects
   *
   */



  var types = {

    //Basic error types
    SUCCEEDED: 0,
    //Alias can be of the same value
    FAILURE: 1,
    FAILED: 1,
    ERROR: 1,

    //Validation error types
    INVALID: 2,
    MISMATCH: 3,
    REQUIRED: 4,

    //Existence related
    NOT_FOUND: 5,
    EXISTED: 6,

    //Accessibility or authentication related
    NOT_LOGIN: 7,
    EXPIRED: 8,
    BLOCKED: 9,

    //Resources related
    EXCEEDED: 10,

    //Input related
    NOT_SPECIFIED: 11

  };

  var locales = {
    'en': {},
    'zh-CN': {
      //System error info
      'Success!': '成功!',
      'Failure!': '失败!',
      'Failed!': '失败了!',
      'Error!': '错误!',
      'Existed!': '已经存在!',

      'Unknown Error!': '未知错误!',
      'Not Found!': '没有找到!',
      'Not Login!': '没有登录!',
      'Not Specified!': '未指定!',
      'Required!': '必需有!',

      //User errors
      'User Existed!': '用户已经存在!',
      'User Not Found!': '用户未找到!',
      'User Not Login!': '用户尚未登录!',
      'Username Existed!': '用户名已经存在!',

      //Database errors
      'Database Error!': '数据库错误!',

      //Password errors
      'Password Error!': '密码错误!',

      //File errors
      'File Not Found!': '文件未找到!',

      //Admin errors
      'Administrator Existed!': '管理员已经存在!',
      'Administrator Not Found!': '管理员未找到!',
      'Administrator Not Login!': '管理员未登录!',

      //Action/Event errors
      'Update Failed!': '更新失败!',

      //Input errors
      'Input Invalid!': '输入无效!',
      'Numeric Required!': '输入必须是数值!',

      'Name Not Specified!': '名字未指定!',

      'Password Not Specified!': '密码未指定!',

      'Email Not Specified!': '邮箱未指定!',


      //Category errors
      'Category Not Found!': '分类未找到!',

      //Email errors
      'Email Existed!': '邮箱已经存在!',

      //Phone errors
      'Phone Existed!': '手机已经存在!'

    }
  };

  var util = {
    /**
     * Easy way to make an error code
     * @param entity
     * @param property
     * @param event
     * @param type
     * @returns {number}
     */
    make: function (entity, property, event, type) {
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

    customeMake: function (entity, property, event, type) {
      return util.make(entity | 0x80, property | 0x80, event | 0x80, type | 0x80);
    },

    /**
     * Add an error with a name, a code, a message
     *
     * @param name
     * @param code
     * @param message
     * @returns {boolean}
     */
    add: function (name, code, message) {
      if (name in errors) {
        return false;
      }
      errors[name] = {
        code: code,
        message: message
      };
      return true;
    },

    /**
     * Update a locale item
     * @param name
     * @param value
     * @param locale
     * @returns {boolean}
     */
    updateLocaleItem: function (name, value, locale) {
      if (!locale || !name || !value) {
        return false;
      }
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
    lang: function (key, locale) {

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

  var errors = {

    //Basic errors

    SUCCESS: {
      code: util.make(0, 0, events.NONE, types.SUCCESS),
      message: 'Success!'
    },
    FAILURE: {
      code: util.make(0, 0, 0, types.FAILURE),
      message: 'Failure!'
    },

    FAILED: {
      code: util.make(0, 0, 0, types.FAILED),
      message: 'Failed!'
    },

    ERROR: {
      code: util.make(0, 0, 0, types.ERROR),
      message: 'Error!'
    },

    NOT_FOUND: {
      code: util.make(entities.GENERIC, 0, 0, types.NOT_FOUND),
      message: 'Not Found!'
    },

    EXISTED: {
      code: util.make(entities.GENERIC, 0, 0, types.EXISTED),
      message: 'Existed!'
    },

    NOT_SPECIFIED: {
      code: util.make(entities.GENERIC, 0, 0, types.NOT_SPECIFIED),
      message: 'Not Specified!'
    },

    NOT_LOGIN: {
      code: util.make(entities.GENERIC, 0, 0, types.NOT_LOGIN),
      message: 'Not Login!'
    },

    REQUIRED: {
      code: util.make(entities.GENERIC, 0, 0, types.REQUIRED),
      message: 'Required!'
    },

    UNKNOWN_ERROR: {
      code: util.make(entities.UNKNOWN, 0, 0, types.FAILURE),
      message: 'Unknown Error!'
    },

    //User errors
    USER_EXISTED: {
      code: util.make(entities.USER, 0, 0, types.EXISTED),
      message: 'User Existed!'
    },

    USER_NOT_FOUND: {
      code: util.make(entities.USER, 0, 0, types.EXISTED),
      message: 'User Not Found!'
    },

    USER_NOT_LOGIN: {
      code: util.make(entities.USER, 0, 0, types.NOT_LOGIN),
      message: 'User Not Login!'
    },

    USERNAME_EXISTED: {
      code: util.make(entities.USER, entities.NAME, 0, types.EXISTED),
      message: 'Username Existed!'
    },

    //Database errros
    DATABASE_ERROR: {
      code: util.make(entities.DATABASE, 0, 0, types.FAILURE),
      message: 'Database Error!'
    },

    //Password errors

    PASSWORD_ERROR: {
      code: util.make(entities.PASSWORD, 0, 0, types.ERROR),
      message: 'Password Error!'
    },

    //File errors
    FILE_NOT_FOUND: {
      code: util.make(entities.FILE, 0, 0, types.NOT_FOUND),
      message: 'File Not Found!'
    },

    //Admin errros
    ADMIN_EXISTED: {
      code: util.make(entities.ADMIN, 0, 0, types.EXISTED),
      message: 'Administrator Existed!'
    },

    ADMIN_NOT_FOUND: {
      code: util.make(entities.ADMIN, 0, 0, types.EXISTED),
      message: 'Administrator Not Found!'
    },

    ADMIN_NOT_LOGIN: {
      code: util.make(entities.ADMIN, 0, 0, types.NOT_LOGIN),
      message: 'Administrator Not Login!'
    },

    //Action Errors
    UPDATE_FAILED: {
      code: util.make(0, 0, events.UPDATE, types.FAILED),
      message: 'Update Failed!'
    },

    //Input errors
    INPUT_INVALID: {
      code: util.make(entities.INPUT, 0, 0, types.FAILED),
      message: 'Input Invalid!'
    },
    NUMERIC_REQUIRED: {
      code: util.make(entities.NUMERIC, 0, 0, types.REQUIRED),
      message: 'Numeric Required!'
    },

    NAME_NOT_SPECIFIED: {
      code: util.make(entities.NAME, 0, 0, types.NOT_SPECIFIED),
      message: 'Name Not Specified!'
    },

    PASSWORD_NOT_SPECIFIED: {
      code: util.make(entities.PASSWORD, 0, 0, types.NOT_SPECIFIED),
      message: 'Password Not Specified!'
    },

    EMAIL_NOT_SPECIFIED : {
      code: util.make(entities.EMAIL, 0, 0, types.NOT_SPECIFIED),
      message: 'Email Not Specified!'
    },

    //Category errors
    CATEGORY_NOT_FOUND: {
      code: util.make(entities.CATEGORY, 0, 0, types.NOT_FOUND),
      message: 'Category Not Found!'
    },

    //Email errors
    EMAIL_EXISTED: {
      code: util.make(entities.EMAIL, 0, 0, types.EXISTED),
      message: 'Email Existed!'
    },

    //Phone errors
    PHONE_EXISTED: {
      code: util.make(entities.PHONE, 0, 0, types.EXISTED),
      message: 'Phone Existed!'
    }
  };


  webErrors = {
    version: '0.0.2',
    locale: 'en',
    setLocale: function (locale) {
      this.locale = locale;
      var newErrors = {};
      for (var key in errors) {
        newErrors[key] = {code: errors[key].code};
        newErrors[key].message = util.lang(errors[key].message, locale);
      }
      return newErrors;
    },
    make: util.customeMake,
    add: function (name, code, message) {
      if (util.add(name, code, message)) {
        webErrors.errors[name] = {
          code: code,
          message: message
        };
        return true;
      }
      return false;
    },
    updateLocaleItem: function (name, value, locale) {
      if (util.updateLocaleItem(name, value, locale)) {
        if (webErrors.locale === locale) {
          webErrors.errors = webErrors.setLocale(locale);
        }
        return true;
      }
      return false;
    }
  };

  webErrors.lang = util.lang;
  webErrors.locales = locales;

  webErrors.errors = webErrors.setLocale(webErrors.locale);
  return webErrors;
});
