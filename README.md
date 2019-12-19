# Errorable

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

Create javascript errors in a smart & simple way.

# Usage

## Defines an IErrorOptions object

> JSON files are totally ok for ease of maintance.

```ts
import { IErrorOptions } from "errorable";

const json: IErrorOptions = {
  Hello: {
    code: 100,
    messages: {}
  },
  I: {
    Love: {
      You: {
        code: 1,
        messages: {
          "en-US": "I Love U!",
          "zh-CN": "我爱你！"
        }
      }
    }
  },
  Me: {
    alias: "I"
  }
};
```

## Generate errors

```ts
import { Generator } from "errorable";

const errors: any = Generator.generate(json);

// Got three errors:
// errors.ILoveYou
// errors.MeLoveYou
// errors.Hello
```

or

```ts
import { Generator } from "errorable";
const errors: any = Generator.generate(json, true);

// Got three errors:
// errors.I_LOVE_YOU
// errors.ME_LOVE_YOU
// errors.HELLO
```

## Create and throw localized errors

```ts
const { ILoveYou, Hello } = errors;
throw new ILoveYou("zh-CN");
throw new Hello("en-US");
```

# License

MIT © [calidion](https://calidion.github.io)

[npm-image]: https://badge.fury.io/js/errorable.svg
[npm-url]: https://npmjs.org/package/errorable
[travis-image]: https://travis-ci.org/calidion/errorable.svg
[travis-url]: https://travis-ci.org/calidion/errorable
[daviddm-image]: https://david-dm.org/calidion/errorable.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/calidion/errorable
[coveralls-image]: https://coveralls.io/repos/calidion/errorable/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/calidion/errorable?branch=master
