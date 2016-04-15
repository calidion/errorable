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
    messages: {
    }
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

describe('Index', function() {
  it('Should generate errors', function() {
    assert.equal(true, errorable.Errorable === Errorable);
    assert.equal(true, errorable.Generator === Generator);
  });
});
