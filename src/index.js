import rollup from 'rollup'
import memory from 'rollup-plugin-memory'
import loaderUtils from 'loader-utils'

export default function (source, inputSourceMap) {
  const cb = this.async()

  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!')
  const filename = webpackRemainingChain.pop()

  const rollupConfig = {
    entry: {
      path: filename,
      contents: source
    },
    external(id) {
      return !/\.(?:js|es6)$/.test(id)
    }
  }

  const parsed = this.options.rollup || loaderUtils.parseQuery(this.query)
  const options = Array.isArray(parsed) ? { plugins: parsed } : parsed

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
