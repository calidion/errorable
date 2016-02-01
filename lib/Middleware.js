/**
 * express middleware api
 * Create by @heineiuo at 2016-02-01 09:54:53
 */

var Errorable = require('./errorable');
var Generator = require('./generator');
var fs = require('fs');
var path = require('path')

var Middleware = module.exports = function(options){
  fs.readFile(path.join(__dirname, './data/errors.json'), function (err, data){
    if (err) throw err;
    try {
      var json = JSON.parse(data)
    } catch(e) {
      throw e
    }
    var errors = new Generator(json, options).errors;
    return function (req, res) {
      res.sendError = function(code, opt){
        if (typeof errors.code == 'undefined') {
          res.json({
            "messages": {
              "zh-CN": "未定义错误！",
              "en-US": "UNDEFINED ERROR!"
            },
            "code": 1
          })
        } else {
          if (typeof opt == 'undefined') {
            res.json(errors.code)
          } else {
            res.json(new Generator(json, opt).errors.code)
          }
        }
      }
    };

  });

}

