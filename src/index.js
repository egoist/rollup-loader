import rollup from 'rollup'
import memory from 'rollup-plugin-memory'
import loaderUtils from 'loader-utils'

export default function (contents) {
  const cb = this.async()
  const path = loaderUtils.getRemainingRequest(this).split('!').pop()
  const rollupConfig = {
    entry: { path, contents },
    external: RegExp().test.bind(/^(.(?!\.(js|es)$))*$/)
  }

  const plugins = this.options.rollup || loaderUtils.parseQuery(this.query)
  const options = Array.isArray(plugins) ? { plugins } : plugins

  Object.assign(rollupConfig, options)
  rollupConfig.plugins = [memory(), ...options.plugins || []]

  this.cacheable()

  rollup
    .rollup(rollupConfig)
    .then(bundle => {
      const { code, map } = bundle.generate({ format: 'cjs' })
      cb(null, code, map)
    })
    .catch(cb)
}
