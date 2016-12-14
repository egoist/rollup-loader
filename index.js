'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollup = _interopDefault(require('rollup'));
var memory = _interopDefault(require('rollup-plugin-memory'));
var loaderUtils = _interopDefault(require('loader-utils'));

var index = function (source, inputSourceMap) {
  var cb = this.async();

  var webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  var filename = webpackRemainingChain[webpackRemainingChain.length - 1];
  
  var rollupConfig = {
    entry: {
      path: filename,
      contents: source
    },
    plugins: [
      memory()
    ],
    external: function external(id) {
      return !(/\.(js|es6)$/.test(id))
    }
  };

  var rollupOptions = this.options.rollup;
  if (rollupOptions) {    
    if (Array.isArray(rollupOptions)) {
      rollupConfig.plugins = rollupConfig.plugins.concat(plugins);
    } else {
      rollupConfig.plugins = rollupConfig.plugins.concat(rollupOptions.plugins);
      delete rollupOptions.plugins;
      Object.assign(rollupConfig, rollupOptions);
    }
  }

  this.cacheable();

  rollup
    .rollup(rollupConfig)
    .then(function (bundle) {
      var result = bundle.generate({
        format: 'cjs'
      });
      cb(null, result.code, result.map);
    })
    .catch(cb);
};

module.exports = index;
