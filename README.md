node-error
==========

a standard error library for node functions and http response.

 ERR CODE FORMAT:

```
 0x[31-24][23-16][15-8][7-0]
```

* [0-7]bit : ENTITY Code
* [8-15]bit: ENTITY / PROPERTY Code
* [16-23]bit: EVENT Code
* [24-31]bit: ERROR TYPE Code


# Usage:

```node

//Basice usage

var nodeError = require('node-error);
var errors = nodeError.errors;

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

var customCode = nodeError.make(customEntities.ENTITY1,
  customEntities.ENTITY2,
  customEvents.EVENT1,
  customErrors.ERROR1);

var customMessage = "MY ERROR!";
var customKey = 'MY_ERROR'
nodeError.add(customKey, customCode, customMessage)


var customLocaleMessage = "我的错误!";
var customLocale = 'zh-CN';

nodeError.updateLocaleItem(customMessage, customLocaleMessage, customLocale);


//Locales can be changed
nodeError.setLocale('en');
nodeError.setLocale('zh-CN');

```

