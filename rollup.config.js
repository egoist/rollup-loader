import buble from 'rollup-plugin-buble'

export default {
  entry: './src/index.js',
  plugins: [
    buble()
  ],
  dest: 'index.js',
  format: 'cjs'
}