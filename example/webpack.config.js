const webpack = require('webpack')
const path = require('path')
const rollupBabel = require('rollup-plugin-babel')

const environment = process.env.WEBPACK_ENV || process.env.NODE_ENV

const config = {
	context: __dirname,
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		// libraryTarget: 'var',
		// library: 'MyBundle',
	},
	resolve: {
		extensions: ['.es6', '.js', '.json'],
		modules: ['node_modules', 'src'],
	},
	resolveLoader: {
		alias: {
			'rollup-loader': path.join(__dirname, '..'),
		},
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'rollup-loader',
			options: {
				plugins: [
					rollupBabel({
						presets: [['es2015', { modules: false }]],
						exclude: 'node_modules/**',
					}),
				],
			},
		}],
		// rules: [{
		// 	test: /\.js$/,
		// 	loader: 'babel-loader',
		// 	exclude: /node_modules/,
		// }],
	},
	plugins: [
		new webpack.DefinePlugin({
			'WEBPACK_ENV': '"dev"',
			'process.env.NODE_ENV': process.env.NODE_ENV,
		}),
	],
}

if (environment === 'production') {
	config.plugins.push( new webpack.optimize.UglifyJsPlugin({ comments: false }) )
}

module.exports = config
