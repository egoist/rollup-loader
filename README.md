# rollup-loader

[WIP] Coming soon.

## Example

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

## License

MIT &copy; [EGOIST](https://github.com/egoist)
