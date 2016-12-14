# rollup-loader

[![NPM version](https://img.shields.io/npm/v/rollup-loader.svg?style=flat)](https://npmjs.com/package/rollup-loader-client) [![Build Status](https://img.shields.io/circleci/project/egoist/rollup-loader/master.svg?style=flat)](https://circleci.com/gh/egoist/rollup-loader)

## How does it work

It uses the [rollup-plugin-memory](https://github.com/TrySound/rollup-plugin-memory) to accept input file from webpack and returns processed result and sourcemaps.

## Usage

### Webpack 2

```javascript
{
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'rollup-loader',
        exclude: [/node_modules/],
        options: {
          plugins: [
            require('rollup-plugin-babel')({})
          ]
        }
      }
    ]
  }
}
```

### Webpack 1

```javascript
{
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['rollup'],
        exclude: [/node_modules/]
      }
    ],
  },
  rollup: [
    require('rollup-plugin-babel')({
      exclude: 'node_modules/**',
      preset: ['es2015-rollup']
    })
  ]
}
// or use babel-loader if you like
// loaders: ['rollup', 'babel']
```

### Use full rollup options

When you set the rollup option to an array, it will be used as rollup plugins. Otherwise it will be passed directly to rollup:

```js
// webpack 1
// for example
// do not bundle these files through rollup
// it only bundles .js and .es6 files by default
module.exports = {
  rollup: {
    external(id) {
      return !(/\.(js|es6|jsx)$/.test(id))
    }
  }
}
```

Check out [Rollup JavaScript API](https://github.com/rollup/rollup/wiki/JavaScript-API) for option reference.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
