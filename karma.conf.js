let webpackConfig = require('laravel-mix/setup/webpack.config');

module.exports = function(config) {
	config.set({
		frameworks: ['mocha'],

		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			'resources/js/components/**/*.spec.js'
		],

		preprocessors: {
			'**/*.spec.js': ['webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		reporters: ['spec', 'coverage'],

		coverageReporter: {
			dir: './coverage',
			reporters: [
				{ type: 'lcov', subdir: '.' },
				{ type: 'text-summary' }
			]
		},

		customLaunchers: {
			'PhantomJS_custom': {
				base: 'PhantomJS',
				options: {
					windowName: 'spa-window',
					settings: {
						webSecurityEnabled: false
					}
				}
			}
		},

		browsers: ['Chrome', 'PhantomJS', 'PhantomJS_custom'],
	})
};