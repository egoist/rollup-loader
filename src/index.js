import rollup from 'rollup'
import memory from 'rollup-plugin-memory'
import loaderUtils from 'loader-utils'

function ensureObjectShape(obj) {
  return Array.isArray(obj) ? { plugins: obj } : obj
}

const caches = new Map()

function getCache(globalOptions, query) {
  const globalOptionsCache = caches.get(globalOptions)
  return globalOptionsCache && globalOptionsCache.get(query)
}

function setCache(globalOptions, query, value) {
  let globalOptionsCache = caches.get(globalOptions)
  if (!globalOptionsCache) {
    globalOptionsCache = new Map()
    caches.set(globalOptions, globalOptionsCache)
  }
  globalOptionsCache.set(query, value)
}

function declareDependency(compiler, id) {
  // skip plugin helper modules
  if (/\0/.test(id)) return

  compiler.dependency(id)
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

  const cache = getCache(this.options.rollup, this.query)
  if (cache) rollupConfig.cache = cache

  rollup
    .rollup(rollupConfig)
    .then(
      bundle => {
        setCache(this.options.rollup, this.query, bundle)
        bundle.modules.forEach(module => {
          declareDependency(this, module.id)
        })

        const { code, map } = bundle.generate({ 
          format: 'cjs',
          sourceMap
        })
        cb(null, code, map)
      },
      error => {
        if (error.id) declareDependency(this, error.id)
        throw error
      }
    )
    .catch(cb)
}
