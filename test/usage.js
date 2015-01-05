var assert = require('assert')
  , nodeError = require('../index'), validator = require('validator');

describe('Node Error Test', function () {

  it('should have basic info', function () {
    assert.equal(typeof nodeError.locale != 'undefined', true);
    assert.equal(nodeError.add instanceof Function, true);
    assert.equal(nodeError.setLocale instanceof Function, true);
    assert.equal(nodeError.updateLocaleItem instanceof Function, true);
    assert.equal(nodeError.make instanceof Function, true);
    assert.equal(typeof nodeError.errors == 'object', true);
    assert.equal(typeof nodeError.errors.SUCCESS == 'object', true);
    assert.equal(typeof nodeError.errors.FAILURE == 'object', true);
    assert.equal(typeof nodeError.errors.UNKNOWN_ERROR == 'object', true);
  });

  it('should have basic structure', function () {
    for (var k in nodeError.errors) {
      var v = nodeError.errors[k];
      assert.equal(typeof v.code != 'undefined', true);
      assert.equal(validator.isNumeric(v.code), true);
      assert.equal(typeof v.message == 'string', true);
    }
  });

  it('should have basic structures', function () {
    for (var k in nodeError.errors) {
      var v = nodeError.errors[k];
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

    var localErrors = nodeError.setLocale(locale);
    var enErrors = nodeError.setLocale('en');
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

  var customCode = nodeError.make(customEntities.ENTITY1,
    customEntities.ENTITY2,
    customEvents.EVENT1,
    customErrors.ERROR1);
  var customMessage = "MY ERROR!";
  var customKey = 'MY_ERROR'
  var customLocaleMessage = "我的错误!";
  var customLocale = 'zh-CN';

  it('should be able to be customized', function () {
    assert.equal(nodeError.add('SUCCESS', customCode, customMessage), false);
    assert.equal(nodeError.add(customKey, customCode, customMessage), true);
    assert.equal(nodeError.errors[customKey].code == customCode, true);
    assert.equal(nodeError.errors[customKey].message == customMessage, true);
  });


  //
  it('should be able to be customized by locale', function () {
    nodeError.setLocale('en');
    assert.equal(nodeError.updateLocaleItem(), false);
    assert.equal(nodeError.updateLocaleItem(customMessage), false);
    assert.equal(nodeError.updateLocaleItem(customMessage, customLocaleMessage), false);
    assert.equal(nodeError.updateLocaleItem(customMessage, customLocaleMessage, customLocale), true);
    assert.equal(nodeError.errors[customKey].message != customLocaleMessage, true);
    nodeError.setLocale(customLocale);
    assert.equal(nodeError.updateLocaleItem(customMessage, customLocaleMessage, customLocale), true);
    assert.equal(nodeError.errors[customKey].message == customLocaleMessage, true);
  });

});
