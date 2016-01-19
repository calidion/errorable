import assert from 'assert';
import Generator from '../lib/generator';
import json from '../lib/definitions';
import Errorable from '../lib/errorable';
import errorable from '../lib';

describe('Generator', function () {
  it('Should generate errors', function () {
    var generator = new Generator(json, 'zh-CN');
    assert.equal(true, generator.errors !== undefined);
    generator.save('./lib/data/errors.json');
  });
});

describe('Index', function () {
  it('Should generate errors', function () {
    assert.equal(true, errorable.Errorable === Errorable);
    assert.equal(true, errorable.Generator === Generator);
    var errors = new Generator(errorable.stocks.http, 'zh-CN').errors;
    var Ok = errors.Ok.restify();
    assert.equal(true, errors.Continue.code === 100);
    assert.equal(true, errors.Ok.code === 200);
    assert.equal(true, Ok.code === 200);
    assert.equal(true, Ok.message === '正常');
    assert.equal(true, Ok.name === 'Ok');
  });
});
