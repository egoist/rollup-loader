var rollup = require('rollup')
var memory = require('rollup-plugin-memory')
var loaderUtils = require('loader-utils')

module.exports = function (source, inputSourceMap) {
  var cb = this.async()

  var webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!')
  var filename = webpackRemainingChain[webpackRemainingChain.length - 1]
  
  var rollupConfig = {
    entry: filename,
    plugins: [
      memory({
        contents: source
      })
    ],
    external(id) {
      return !(/\.(js|es6)$/.test(id))
    }
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
