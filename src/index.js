import rollup from 'rollup'
import memory from 'rollup-plugin-memory'
import loaderUtils from 'loader-utils'

function ensureObjectShape(obj) {
  return Array.isArray(obj) ? { plugins: obj } : obj
}

export default function (contents) {
  const cb = this.async()

  const path = loaderUtils.getRemainingRequest(this)
    .split('!')
    .pop()
    .replace(/\?.*$/, '')

  const rollupConfig = {
    entry: {
      path,
      contents
    },
    external: RegExp().test.bind(/^(.(?!\.(js|es|es6)$))*$/),
    plugins: [
      memory()
    ]
  }

  const query = ensureObjectShape(loaderUtils.getOptions(this) || {})
  const globalOptions = ensureObjectShape(this.options.rollup)
  const loaderOptions = Object.assign({}, globalOptions, query)

  // Add custom plugins
  if (Array.isArray(loaderOptions.plugins)) {
    rollupConfig.plugins.push(...loaderOptions.plugins)
    delete loaderOptions.plugins
  }
  // Get sourceMap option
  const sourceMap = loaderOptions.sourceMap === undefined ? this.sourceMap : loaderOptions.sourceMap
  delete loaderOptions.sourceMap

  Object.assign(rollupConfig, loaderOptions)

  this.cacheable()

  rollup
    .rollup(rollupConfig)
    .then(bundle => {
      const { code, map } = bundle.generate({ 
        format: 'cjs',
        sourceMap
      })
      cb(null, code, map)
    })
    .catch(cb)
}
