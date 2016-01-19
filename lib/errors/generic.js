module.exports = {
  Error: {
    messages: {
      'en-US': 'Error!',
      'zh-CN': '错误！'
    },
    code: -1
  },
  Success: {
    messages: {
      'en-US': 'Success!',
      'zh-CN': ' 成功！'
    },
    code: 0
  },
  Failure: {
    alias: 'Error'
  },
  Failed: {
    alias: 'Error'
  },
  Unknown: {
    Error: {
      messages: {
        'en-US': 'Unknown Error!',
        'zh-CN': '未知错误！'
      },
      code: -2
    }
  }
};
