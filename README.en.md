# berror [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> General javascript errors generator

javascript errors with
1. Domain   
   The same as prefix, errors with prefix can be more recognizable
2. Predefined errors   
   Predefined errors are standard errors of berror and will be enriched
3. I18n   
   Error messages vary with locales
4. Customization   
   Error folder can be specified to customize errors
5. Unification
   Error code of each error can never be changed, so it can be exchangable through projects, no need to define errors for every project

## Installation

```sh
$ npm install --save berror
```

## Usage

```js
//Error generation
var BaseError = require('berror').error;

//Error definition
var i18n = require('berror').i18n;
var errorMessages = i18n.get(pathOfErrorMessagesDefined);
```

### New An Error

```js
var error = new BaseError({
      errors: ['user', 'not', 'found'],    //Sequential Error Description
      prefix: 'java:',                     //Prefix for Messages
      code: 404,                           //Numeric value for this error
      message: 'User is not found!',       //Customized Error Messsage
      locale: 'en-US',                     //Locale for errors
      i18n: i18n.get(dir)                  //Customized error definition directory
    });
//error.name => "UserNotFound"
//error.code => 404
//error.message => "java:User is not found!"
//error.restify() => { code: 404, message: "js:hello", name: 'UserNotFound'}
```

### Throw An Error
```js
throw error;
```

### Error Messages

* berror predefined some errors as standard errors
* errors can be customized by folders or by generation
* can also be replaced by providing locales folder when creating a generator


## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/berror.svg
[npm-url]: https://npmjs.org/package/berror
[travis-image]: https://travis-ci.org/JS-Errors/berror.svg
[travis-url]: https://travis-ci.org/JS-Errors/berror
[daviddm-image]: https://david-dm.org/berror/berror.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/berror/berror
[coveralls-image]: https://coveralls.io/repos/JS-Errors/berror/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/JS-Errors/berror?branch=master
