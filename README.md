web-errors
============

 [![Build Status](https://travis-ci.org/calidion/web-errors.svg)](https://travis-ci.org/calidion/web-errors)

a standard error library for web functions and http response.

 ERR CODE FORMAT:

```
 0x[31-24][23-16][15-8][7-0]
```

* [0-7]bit : ERROR TYPE Code
* [8-15]bit: EVENT Code
* [16-23]bit: ENTITY / PROPERTY Code
* [24-31]bit: ENTITY Code


# Usage:

```web

//Basice usage

var webErrors = require('web-errors');
var errors = webErrors.errors;

req.json(errors.UNKNOWN_ERR);



//Customize User Errors
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


var customLocaleMessage = "我的错误!";
var customLocale = 'zh-CN';

webErrors.updateLocaleItem(customMessage, customLocaleMessage, customLocale);


//Locales can be changed
webErrors.setLocale('en');
webErrors.setLocale('zh-CN');

```

