# errorable [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]


> Generic Error Handling And Generation

1. Domain  
    Alias to prefix
2. Predefine Errors     
    These are standard errors accumulated over time
3. i18n    
    Error Messages are specific to locales.
4. Customization  
    Can easily customize a new error table with a json file/object
5. Unification  
    Errors are identified by names. And names are strings can be exchanged throught different projects.

## Install

```sh
$ npm install --save errorable
```

## Usage

```js
//Get the errorable object
var errorable = require('errorable');

//Error define
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

//Generate errors
var Generator = errorable.Generator;
var errors = new Generator(json, 'zh-CN').errors;
//errors.ILoveYou
//errors.ILoveYou.name
//errors.ILoveYou.code
//errors.ILoveYou.message
//errors.ILoveYou.restify()

//Generate errors with names in upper case
var errors = new Generator(json, 'zh-CN', true).errors;
//errors.I_LOVE_YOU
//errors.I_LOVE_YOU.name
//errors.I_LOVE_YOU.code
//errors.I_LOVE_YOU.message
//errors.I_LOVE_YOU.restify()

//New A Customized Error

var Errorable = errorable.Errorable;
var error = new Errorable({
      name: 'UserNotFound',                 //Sequential Error Description
      prefix: 'java',                       //Prefix for Messages
      code: 404,                            //Numeric value for this error
      messages: {
        'zh-CN': '用户未定义',
        'en-US': 'User is not found!'
      } ,        //Customized Error Messsage
      locale: 'en-US',                      //Locale for errors
    });
//error.name => "UserNotFound"
//error.code => 404
//error.message => "java:User is not found!"
//error.restify() => { code: 404, message: "java:User is not found!", name: 'UserNotFound'}
```

### Throw An Error
```js
throw error;
```

### Error Message, Error Code and Error Name

* Error message can be varied by locales
* Error code can be specified or it will be the same to the name
* Error name is string, which can be language independent.

### Errors available 
Common Errors：  
https://github.com/Errorable/common  
HTTP Errors：  
https://github.com/Errorable/http  

### As a middleware
#### Express middleware
source：
https://github.com/Errorable/express-middleware

```js
var errorableExpress = require('errorable-express');
var common = require('errorable-common');
var errorable = require('errorable');
var Generator = errorable.Generator;
var errors = new Generator(common, 'zh-CN').errors;

express.use(errorableExpress(errors));

express.get('/', function indexxx(req, res) {
  res.restify(res.errors.Success);
});
express.get('/message', function messagexx(req, res) {
  res.restify(res.errors.Success, message);
});

express.get('/unknown', function unknownxx(req, res) {
  res.restify();
});

express.get('/errorize', function errorizexx(req, res) {
  //restify === errorize
  res.errorize();
});
```

## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/errorable.svg
[npm-url]: https://npmjs.org/package/errorable
[travis-image]: https://travis-ci.org/calidion/errorable.svg
[travis-url]: https://travis-ci.org/calidion/errorable
[daviddm-image]: https://david-dm.org/calidion/errorable.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/calidion/errorable
[coveralls-image]: https://coveralls.io/repos/calidion/errorable/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/calidion/errorable?branch=master
