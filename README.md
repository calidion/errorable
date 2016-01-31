# errorable [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

[English](./README.en.md)

> 通用错误处理与生成方案

具备如下功能的javascript错误处理方案

1. 域(Domain)   
    类似于前缀(Prefix)，方便错误的识别
2. 预定义错误(即标准错误)      
    预定义库会随着时间不断的累积，方便使用
3. 国际化    
    错误的消息值可以随着不同的区域发生变化
4. 定制化  
    通过指定错误文件定制错误信息
5. 一致性
    由于错误名采用字符标识，对于相同名字的错误，不同的项目可以通用，方便了项目的沟通过。

## 安装

```sh
$ npm install --save errorable
```

## 使用

```js
//获取错误接口
var errorable = require('errorable');

//错误定义
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

//错误批量生成
var Generator = errorable.Generator;
var errors = new Generator(json, 'zh-CN').errors;
//errors.ILoveYou
//errors.ILoveYou.name
//errors.ILoveYou.code
//errors.ILoveYou.message
//errors.ILoveYou.restify()

//错误名称大写
var errors = new Generator(json, 'zh-CN',true).errors;
//errors.I_LOVE_YOU
//errors.I_LOVE_YOU.name
//errors.I_LOVE_YOU.code
//errors.I_LOVE_YOU.message
//errors.I_LOVE_YOU.restify()

//错误临时生成

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

### 抛出错误
```js
throw error;
```

### 错误消息(message)、错误代码(code)和错误名称(name)

* 错误消息可以添加前缀，可以根据地区变换
* 错误代码可以自定义，也可以预定义
* 错误名称直接使用字符串，可在做到语言无关，在所有的项目中通用，并且可以唯一标识


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
