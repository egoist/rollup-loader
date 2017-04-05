# rollup-loader

[![NPM version](https://img.shields.io/npm/v/rollup-loader.svg?style=flat)](https://npmjs.com/package/rollup-loader) [![Build Status](https://img.shields.io/circleci/project/egoist/rollup-loader/master.svg?style=flat)](https://circleci.com/gh/egoist/rollup-loader)

## How does it work

It uses the [rollup-plugin-memory](https://github.com/TrySound/rollup-plugin-memory) to accept input file from webpack and returns processed result and sourcemaps.

## Usage

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'rollup-loader',
      options: [/* custom rollup plugins */]
      // or directly pass rollup options
      // options: { plugins: [] }
    }]
  }
}
```

Check out [Rollup JavaScript API](https://github.com/rollup/rollup/wiki/JavaScript-API) for option reference.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
