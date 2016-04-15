import assert from 'assert';
import Errorable from '../lib/errorable';

describe('Errorable', function() {
  it('Should generate errors', function() {

    var options = {
      name: 'Error',
      messages: {
        'zh-CN': '错误!',
        'en-US': 'Error!'
      },
      locale: 'zh-CN',
      code: 100,
      prefix: 'TEST'
    };
    var error = new Errorable(options);
    assert.equal(true, error.code === options.code);
    assert.equal(true, error.name === options.name);
    assert.equal(true, error.locale === options.locale);
    assert.equal(true, error.prefix === options.prefix);
    var message = options.prefix + ':' + options.messages[options.locale];
    assert.equal(true, error.getMessage() === message);
    assert.equal(true, error.message === message);
    var json = error.restify();
    assert.equal(true, json.code === options.code);
    assert.equal(true, json.name === options.name);
    assert.equal(true, json.message === error.message);

    var string = error.toString();
    assert.equal(true, string === String('[' + options.name + '] => {message: ' + message + '}'));
  });
});
