# rollup-loader

Status: experimental

## Example

Webpack 1:

```javascript
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
// or use babel-loader if you like
// loaders: ['rollup', 'babel']
```

Webpack 2:

```javascript
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
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
