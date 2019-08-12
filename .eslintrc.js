module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 8, //指定 ECMAScript 支持的版本，6 為 ES6，這裡為了兼容 async 和 await，設置為 8
      sourceType: 'module'
    },
    extends: 'standard',
    plugins: [
      'html',
      'promise'
    ],
    env: {
          'node': true
    },
    rules: {
      // allow console
      'no-console': 0,
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': 0
    }
  }