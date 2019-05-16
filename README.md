<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]

# puglint-webpack-plugin

A Puglint plugin for webpack. You can see more [puglint rule](https://github.com/pugjs/pug-lint/blob/master/docs/rules.md).

## Requirements

This module requires a minimum of Node v6.9.0 and webpack v4.0.0.

## Install

```console
$ npm install puglint-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` config. For example:

```js
// webpack.config.js
const PugLintPlugin = require('puglint-webpack-plugin')
const options = {
  context: 'src',
  files: '**/*.pug',
  config: Object.assign({emitError: true}, require('../.pug-lintrc'))
}

module.exports = {
  // ...
  plugins: [
    new PugLintPlugin(options),
  ],
  // ...
}
```

And run `webpack` via your preferred method.

## Options

It takes the following parameters.

### `context`

Type: `String`
Default: `compiler.context`

A `String` indicating the root of your `PUG` files.

### `files`

Type: `String`
Default: `undefined`

Specify the glob pattern for finding files. Must be relative to `options.context`.

### `config`

Type: `String`
Default: `undefined`

Specify the config file location to be used by `puglint`.
You can pass [puglint options](https://github.com/pugjs/pug-lint#configuration-file).


## License

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/stylelint-webpack-plugin.svg
[npm-url]: https://www.npmjs.com/package/puglint-webpack-plugin

[node]: https://img.shields.io/node/v/stylelint-webpack-plugin.svg
[node-url]: https://nodejs.org
