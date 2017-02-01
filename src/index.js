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

  const config = loaderUtils.getLoaderConfig(this, 'rollup')
  const options = this.options.rollup
  const plugins = config.plugins || (config.plugins = [])

  if (Array.isArray(options)) {
    options.forEach((value, index) => delete config[index])
    plugins.push(...options)
  }
  plugins.unshift(memory())
  Object.assign(rollupConfig, config)

  this.cacheable()

  rollup
    .rollup(rollupConfig)
    .then(bundle => {
      const { code, map } = bundle.generate({ format: 'cjs' })
      cb(null, code, map)
    })
    .catch(cb)
}
