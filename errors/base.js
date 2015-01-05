var util = require('../lib/util');
var entities = require('../defines/entity');
var events = require('../defines/event');
var types = require('../defines/type');

module.exports = {
  SUCCESS: {
    code: util.make(0, 0, 0, types.SUCCESS),
    message: 'Success!'
  },
  FAILURE: {
    code: util.make(0, 0, 0, types.FAILURE),
    message: 'Failure!'
  },
  UNKNOWN_ERROR: {
    code: util.make(entities.UNKNOWN, 0, 0, types.FAILURE),
    message: 'Unknown Error!'
  }
};