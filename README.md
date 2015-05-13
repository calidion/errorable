web-errors
============

 [![Build Status](https://travis-ci.org/calidion/web-errors.svg)](https://travis-ci.org/calidion/web-errors)
[![Coverage Status](https://coveralls.io/repos/calidion/web-errors/badge.svg)](https://coveralls.io/r/calidion/web-errors)
a standard error library for web functions and http responses.

# ERROR CODE FORMAT:

```
 0x[31-24][23-16][15-8][7-0]
```

* [0-7]bit : ERROR TYPE Code
* [8-15]bit: EVENT Code
* [16-23]bit: ENTITY / PROPERTY Code
* [24-31]bit: ENTITY Code



# Benefits

  * Unified error definitions for both client and server sides.
  * Exchangeability between projects.
  * Easy i18n support for errors.
  * Use names or strings instead of numeric values, you don't need to care about real values of errors
  * The code values of the errors are changeable, so you will never use real values.

# Install

node:
```bash
npm install web-errors
```

browser:
```bash
bower install web-errors
```


# Usage:

#### Basic usage (the standard errors)

```javascript

var webErrors = require('web-errors');
var errors = webErrors.errors;

req.json(errors.UNKNOWN_ERROR);

```

```html

    <script src="bower_components/web-errors/web-errors.js"></script>
    <script>
      var errors = webErrors.errors;
        $http.post().success(function (data) {
            switch(data.code) {
              case errors.USER_NOT_LOGIN.code:
                $location.path('/');
                break;
          }
        })
    </script>
```


#### Locales can be changed

```javascript
webErrors.setLocale('en');
webErrors.setLocale('zh-CN');
```

#### Customize user-defined errors

```javascript
var customEntities = {
    ENTITY1: 1,
    ENTITY2: 2,
    ENTITY3: 3
  },
  customEvents = {
    EVENT1: 1,
    EVENT2: 2,
    EVENT3: 3
  },
  customErrors = {
    ERROR1: 1,
    ERROR2: 2,
    ERROR3: 3
  };

var customCode = webErrors.make(customEntities.ENTITY1,
  customEntities.ENTITY2,
  customEvents.EVENT1,
  customErrors.ERROR1);

var customMessage = "MY ERROR!";
var customKey = 'MY_ERROR'
webErrors.add(customKey, customCode, customMessage)

```

#### Locales can be customized too

```javascript
var customLocaleMessage = "我的错误!";
var customLocale = 'zh-CN';

webErrors.updateLocaleItem(customMessage, customLocaleMessage, customLocale);
```


## ERRORS

```javascript
var errors = [
      'SUCCESS',
      'FAILURE',
      'FAILED',
      'ERROR',
      'NOT_FOUND',
      'NOT_LOGIN',
      'EXISTED',
      'NOT_SPECIFIED',
      'REQUIRED',

      //Specific errors
      'UNKNOWN_ERROR',
      'DATABASE_ERROR',
      'PASSWORD_ERROR',


      'USER_NOT_FOUND',
      'USER_NOT_LOGIN',
      'USERNAME_EXISTED',

      'FILE_NOT_FOUND',


      'ADMIN_EXISTED',
      'ADMIN_NOT_FOUND',
      'ADMIN_NOT_LOGIN',

      'UPDATE_FAILED',
      'INPUT_INVALID',
      'NUMERIC_REQUIRED',
      'NAME_NOT_SPECIFIED',
      'PASSWORD_NOT_SPECIFIED',
      'EMAIL_NOT_SPECIFIED',
      'CATEGORY_NOT_FOUND',
      'EMAIL_EXISTED',
      'PHONE_EXISTED'
      ];
```
