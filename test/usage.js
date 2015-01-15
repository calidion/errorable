var assert = require('assert')
  , webErrors = require('../web-errors'), validator = require('validator');

describe('web Error Test', function () {
  'use strict';
  it('should have basic info', function () {
    assert.equal(typeof webErrors.locale !==  'undefined', true);
    assert.equal(webErrors.add instanceof Function, true);
    assert.equal(webErrors.setLocale instanceof Function, true);
    assert.equal(webErrors.updateLocaleItem instanceof Function, true);
    assert.equal(webErrors.make instanceof Function, true);
    assert.equal(typeof webErrors.errors === 'object', true);
    assert.equal(typeof webErrors.errors.SUCCESS === 'object', true);
    assert.equal(typeof webErrors.errors.FAILURE === 'object', true);
    assert.equal(typeof webErrors.errors.UNKNOWN_ERROR === 'object', true);
  });

  it('should have basic structure', function () {
    for (var k in webErrors.errors) {
      var v = webErrors.errors[k];
      assert.equal(typeof v.code !==  'undefined', true);
      assert.equal(validator.isNumeric(v.code), true);
      assert.equal(typeof v.message === 'string', true);
    }
  });

  it('should have basic structures', function () {
    for (var k in webErrors.errors) {
      var v = webErrors.errors[k];
      assert.equal(typeof v.code !==  'undefined', true);
      assert.equal(validator.isNumeric(v.code), true);
      assert.equal(typeof v.message !==  'undefined', true);
      assert.equal(typeof v.message === 'string', true);
    }
  });

  it('should have i18n ability', function () {
    var locale = 'zh-CN';
    var lang = webErrors.lang;
    assert(lang('Success!', 'zh-CN') === '成功!', true);

    var localErrors = webErrors.setLocale(locale);
    var enErrors = webErrors.setLocale('en');
    for (var key in enErrors) {
      assert(localErrors[key].code === enErrors[key].code, true);
      assert(localErrors[key].message === lang(enErrors[key].message, locale), true);
    }
  });

  //Customization
  var customEntities = {
      ENTITY1: 1,
      ENTITY2: 2,
      ENTITY3: 3
    },
    customEvents = {
      EVENT1: 1,
      EVENT2: 2,
      EVENT3: 3
    },
    customErrors = {
      ERROR1: 1,
      ERROR2: 2,
      ERROR3: 3
    };

  var customCode = webErrors.make(customEntities.ENTITY1,
    customEntities.ENTITY2,
    customEvents.EVENT1,
    customErrors.ERROR1);
  var customMessage = "MY ERROR!";
  var customKey = 'MY_ERROR';
  var customLocaleMessage = "我的错误!";
  var customLocale = 'zh-CN';

  it('should be able to be customized', function () {
    assert.equal(webErrors.add('SUCCESS', customCode, customMessage), false);
    assert.equal(webErrors.add(customKey, customCode, customMessage), true);
    assert.equal(webErrors.errors[customKey].code === customCode, true);
    assert.equal(webErrors.errors[customKey].message === customMessage, true);
  });


  //
  it('should be able to be customized by locale', function () {
    webErrors.setLocale('en');
    assert.equal(webErrors.updateLocaleItem(), false);
    assert.equal(webErrors.updateLocaleItem(customMessage), false);
    assert.equal(webErrors.updateLocaleItem(customMessage, customLocaleMessage), false);
    assert.equal(webErrors.updateLocaleItem(customMessage, customLocaleMessage, customLocale), true);
    assert.equal(webErrors.errors[customKey].message !==  customLocaleMessage, true);
    webErrors.setLocale(customLocale);
    assert.equal(webErrors.updateLocaleItem(customMessage, customLocaleMessage, customLocale), true);
    assert.equal(webErrors.errors[customKey].message === customLocaleMessage, true);
  });

  it('should have equivalent translations', function () {
    var enErrors = webErrors.setLocale('en');
    for(var locale in webErrors.locales) {
      if (locale === 'en') continue;

      for(var k in enErrors) {
        assert.equal(true, !!webErrors.locales[locale][enErrors[k].message]);
      }
    }
  });

});
