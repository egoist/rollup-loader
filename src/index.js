import rollup from 'rollup'
import memory from 'rollup-plugin-memory'
import loaderUtils from 'loader-utils'

export default function (source, inputSourceMap) {
  const cb = this.async()

  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!')
  const filename = webpackRemainingChain[webpackRemainingChain.length - 1]
  
  const rollupConfig = {
    entry: {
      path: filename,
      contents: source
    },
    plugins: [
      memory()
    ],
    external(id) {
      return !(/\.(js|es6)$/.test(id))
    }
  }

  const rollupOptions = this.options.rollup
  if (rollupOptions) {    
    if (Array.isArray(rollupOptions)) {
      rollupConfig.plugins = rollupConfig.plugins.concat(plugins)
    } else {
      rollupConfig.plugins = rollupConfig.plugins.concat(rollupOptions.plugins)
      delete rollupOptions.plugins
      Object.assign(rollupConfig, rollupOptions)
    }
  }

  this.cacheable()

  rollup
    .rollup(rollupConfig)
    .then(bundle => {
      const result = bundle.generate({
        format: 'cjs'
      })
      cb(null, result.code, result.map)
    })
    .catch(cb)
}
