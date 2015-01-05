var assert = require('assert')
  , webError = require('../index'), validator = require('validator');

describe('web Error Test', function () {

  it('should have basic info', function () {
    assert.equal(typeof webError.locale != 'undefined', true);
    assert.equal(webError.add instanceof Function, true);
    assert.equal(webError.setLocale instanceof Function, true);
    assert.equal(webError.updateLocaleItem instanceof Function, true);
    assert.equal(webError.make instanceof Function, true);
    assert.equal(typeof webError.errors == 'object', true);
    assert.equal(typeof webError.errors.SUCCESS == 'object', true);
    assert.equal(typeof webError.errors.FAILURE == 'object', true);
    assert.equal(typeof webError.errors.UNKNOWN_ERROR == 'object', true);
  });

  it('should have basic structure', function () {
    for (var k in webError.errors) {
      var v = webError.errors[k];
      assert.equal(typeof v.code != 'undefined', true);
      assert.equal(validator.isNumeric(v.code), true);
      assert.equal(typeof v.message == 'string', true);
    }
  });

  it('should have basic structures', function () {
    for (var k in webError.errors) {
      var v = webError.errors[k];
      assert.equal(typeof v.code != 'undefined', true);
      assert.equal(validator.isNumeric(v.code), true);
      assert.equal(typeof v.message != 'undefined', true);
      assert.equal(typeof v.message == 'string', true);
    }
  });

  it('should have i18n ability', function () {
    var locale = 'zh-CN'
    var util = require('./../lib/util');
    var v = util.lang('Success!', 'zh-CN');
    assert(util.lang('Success!', 'zh-CN') == '成功!', true);

    var localErrors = webError.setLocale(locale);
    var enErrors = webError.setLocale('en');
    for (var key in enErrors) {
      assert(localErrors[key].code == enErrors[key].code, true);
      assert(localErrors[key].message == util.lang(enErrors[key].message, locale), true);
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

  var customCode = webError.make(customEntities.ENTITY1,
    customEntities.ENTITY2,
    customEvents.EVENT1,
    customErrors.ERROR1);
  var customMessage = "MY ERROR!";
  var customKey = 'MY_ERROR'
  var customLocaleMessage = "我的错误!";
  var customLocale = 'zh-CN';

  it('should be able to be customized', function () {
    assert.equal(webError.add('SUCCESS', customCode, customMessage), false);
    assert.equal(webError.add(customKey, customCode, customMessage), true);
    assert.equal(webError.errors[customKey].code == customCode, true);
    assert.equal(webError.errors[customKey].message == customMessage, true);
  });


  //
  it('should be able to be customized by locale', function () {
    webError.setLocale('en');
    assert.equal(webError.updateLocaleItem(), false);
    assert.equal(webError.updateLocaleItem(customMessage), false);
    assert.equal(webError.updateLocaleItem(customMessage, customLocaleMessage), false);
    assert.equal(webError.updateLocaleItem(customMessage, customLocaleMessage, customLocale), true);
    assert.equal(webError.errors[customKey].message != customLocaleMessage, true);
    webError.setLocale(customLocale);
    assert.equal(webError.updateLocaleItem(customMessage, customLocaleMessage, customLocale), true);
    assert.equal(webError.errors[customKey].message == customLocaleMessage, true);
  });

});
