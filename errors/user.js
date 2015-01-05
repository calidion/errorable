var base = require('./base');
var util = require('../lib/util');
var entities = require('../defines/entity');
var events = require('../defines/event');
var types = require('../defines/type');


base.USER_EXISTED = {
  code: util.make(entities.USER, 0, 0, types.EXISTED),
  message: 'User Existed!'
};

base.USER_NOT_FOUND = {
  code: util.make(entities.USER, 0, 0, types.EXISTED),
  message: 'User Not Found!'
};

base.USER_NOT_LOGIN = {
  code: util.make(entities.USER, 0, 0, types.NOT_LOGIN),
  message: 'User Not Login!'
};