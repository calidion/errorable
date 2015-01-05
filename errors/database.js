var base = require('./base');
var util = require('../lib/util');
var entities = require('../defines/entity');
var events = require('../defines/event');
var types = require('../defines/type');


base.DATABASE_ERROR = {
  code: util.make(entities.DATABASE, 0, 0, types.FAILURE),
    message: 'Database Error!'
};