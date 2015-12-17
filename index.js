var rollup = require('rollup')
var memory = require('rollup-plugin-memory')

module.exports = function (source, inputSourceMap) {
  var cb = this.async()
  var rollupConfig = {
    entry: __dirname + '/src.js',
    plugins: [
      memory({
        contents: source
      })
    ]
  }
  this.cacheable()
  rollup
    .rollup(rollupConfig)
    .then(function (bundle) {
      var result = bundle.generate({
        format: 'cjs'
      })
      cb(null, result.code, result.map)
    })
    .catch(function (err) {
      cb(err)
    })
}
