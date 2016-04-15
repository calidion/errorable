import assert from 'assert';
import Generator from '../lib/generator';
import Errorable from '../lib/errorable';
import errorable from '../lib';

var json = {
  I: {
    Love: {
      You: {
        messages: {
          'zh-CN': '我爱你！',
          'en-US': 'I Love U!'
        },
        code: 1
      }
    }
  },
  Me: {
    alias: 'I'
  },
  Hello: {
    code: 100,
    messages: {}
  }
};

describe('Generator', function() {
  it('Should generate errors', function() {
    var generator = new Generator(json, 'zh-CN');
    var errors = generator.errors;
    var functions = generator.functions;

    var ily = new functions.ILoveYou();

    assert.equal(true, errors !== undefined);
    assert.equal(true, errors.ILoveYou !== undefined);

    assert.deepEqual(ily.restify(), errors.ILoveYou.restify());
    assert.equal(true, errors.ILoveYou.name === 'ILoveYou');
    assert.equal(true, errors.ILoveYou.message === '我爱你！');
    generator.save('./lib/data/errors.json');
    generator = new Generator(json, 'en-US');
    errors = generator.errors;
    functions = generator.functions;

    assert.equal(true, errors !== undefined);
    assert.equal(true, errors.ILoveYou !== undefined);
    assert.equal(true, errors.ILoveYou.name === 'ILoveYou');
    assert.equal(true, errors.ILoveYou.message === 'I Love U!');

    var localized = errors.ILoveYou.localize('zh-CN');
    assert.equal(true, localized.message === '我爱你！');
    assert.deepEqual(errors.ILoveYou, localized);
    var cloned = errors.ILoveYou.localize('zh-CN', true);
    assert.notDeepEqual(errors.ILoveYou, cloned);

    generator = new Generator(json, 'zh-CN', true);
    errors = generator.errors;
    assert.equal(true, errors !== undefined);
    assert.equal(true, errors.I_LOVE_YOU !== undefined);
    assert.equal(true, errors.I_LOVE_YOU.name === 'I_LOVE_YOU');
    assert.equal(true, errors.I_LOVE_YOU.message === '我爱你！');
    generator = new Generator(json, 'en-US', true);
    errors = generator.errors;
    assert.equal(true, errors !== undefined);
    assert.equal(true, errors.I_LOVE_YOU !== undefined);
    assert.equal(true, errors.I_LOVE_YOU.name === 'I_LOVE_YOU');
    assert.equal(true, errors.I_LOVE_YOU.message === 'I Love U!');

    localized = errors.I_LOVE_YOU.localize('zh-CN');
    assert.equal(true, localized.message === '我爱你！');
    assert.deepEqual(errors.I_LOVE_YOU, localized);
    cloned = errors.I_LOVE_YOU.localize('zh-CN', true);
    assert.notDeepEqual(errors.I_LOVE_YOU, cloned);

    var error = {
      History: {
        Not: {
          Found: {
            'en-US': 'Price History Not Found!',
            'zh-CN': '价格历史未找到！'
          }
        }
      }
    };
    var errorThrown = false;
    try {
      var g = new Generator(error, 'zh-CN');
    } catch (e) {
      errorThrown = true;
    }
    assert.equal(true, g === undefined);
    assert.equal(true, errorThrown);
  });
});

describe('get', function() {
  var errors = errorable.get(json);
  assert.equal(true, errors !== undefined);

  assert.equal(true, errors.ILoveYou.name === 'ILoveYou');
  assert.equal(true, errors.ILoveYou.message === '我爱你！');
  errors = errorable.get(json, 'en-US');
  assert.equal(true, errors !== undefined);
  assert.equal(true, errors.ILoveYou.name === 'ILoveYou');
  assert.equal(true, errors.ILoveYou.message === 'I Love U!');
  errors = errorable.get(json, 'en-US', true);
  assert.equal(true, errors !== undefined);
  assert.equal(true, errors.I_LOVE_YOU !== undefined);
  assert.equal(true, errors.I_LOVE_YOU.name === 'I_LOVE_YOU');
  assert.equal(true, errors.I_LOVE_YOU.message === 'I Love U!');
});

describe('Make an Error', function() {
  it('Should make an error', function() {
    var ErrorFunc = errorable.makeAnError({
      name: 'UserNotFound', //Sequential Error Description
      prefix: 'java', //Prefix for Messages
      code: 404, //Numeric value for this error
      messages: {
        'zh-CN': '用户未定义',
        'en-US': 'User is not found!'
      }, //Customized Error Messsage
      locale: 'en-US' //Locale for errors
    });
    assert.equal('function', typeof ErrorFunc);

    var error = new ErrorFunc();

    assert.equal('UserNotFound', error.name);
    assert.equal(404, error.code);
    assert.equal('java:User is not found!', error.message);
    assert.deepEqual({ code: 404, message: 'java:User is not found!', name: 'UserNotFound'},
     error.restify());
  });
});

describe('Index', function() {
  it('Should generate errors', function() {
    assert.equal(true, errorable.Errorable === Errorable);
    assert.equal(true, errorable.Generator === Generator);
  });
});
