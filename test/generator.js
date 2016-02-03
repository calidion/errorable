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
    assert.equal(true, generator.errors !== undefined);
    assert.equal(true, generator.errors.ILoveYou !== undefined);
    assert.equal(true, generator.errors.ILoveYou.name === 'ILoveYou');
    assert.equal(true, generator.errors.ILoveYou.message === '我爱你！');
    generator.save('./lib/data/errors.json');
    generator = new Generator(json, 'en-US');
    assert.equal(true, generator.errors !== undefined);
    assert.equal(true, generator.errors.ILoveYou !== undefined);
    assert.equal(true, generator.errors.ILoveYou.name === 'ILoveYou');
    assert.equal(true, generator.errors.ILoveYou.message === 'I Love U!');

    var localized = generator.errors.ILoveYou.localize('zh-CN');
    assert.equal(true, localized.message === '我爱你！');
    assert.deepEqual(generator.errors.ILoveYou, localized);
    var cloned = generator.errors.ILoveYou.localize('zh-CN', true);
    assert.notDeepEqual(generator.errors.ILoveYou, cloned);

    generator = new Generator(json, 'zh-CN', true);
    assert.equal(true, generator.errors !== undefined);
    assert.equal(true, generator.errors.I_LOVE_YOU !== undefined);
    assert.equal(true, generator.errors.I_LOVE_YOU.name === 'I_LOVE_YOU');
    assert.equal(true, generator.errors.I_LOVE_YOU.message === '我爱你！');
    generator = new Generator(json, 'en-US', true);
    assert.equal(true, generator.errors !== undefined);
    assert.equal(true, generator.errors.I_LOVE_YOU !== undefined);
    assert.equal(true, generator.errors.I_LOVE_YOU.name === 'I_LOVE_YOU');
    assert.equal(true, generator.errors.I_LOVE_YOU.message === 'I Love U!');

    localized = generator.errors.I_LOVE_YOU.localize('zh-CN');
    assert.equal(true, localized.message === '我爱你！');
    assert.deepEqual(generator.errors.I_LOVE_YOU, localized);
    cloned = generator.errors.I_LOVE_YOU.localize('zh-CN', true);
    assert.notDeepEqual(generator.errors.I_LOVE_YOU, cloned);


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

describe('Index', function() {
  it('Should generate errors', function() {
    assert.equal(true, errorable.Errorable === Errorable);
    assert.equal(true, errorable.Generator === Generator);
  });
});
