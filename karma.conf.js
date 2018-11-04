let webpackConfig = require('laravel-mix/setup/webpack.config');

module.exports = function(config) {
	config.set({
		frameworks: ['mocha'],
		basePath: 'resources/js',
		files: [
			{ pattern: 'components/**/tests/**/*.spec.js', watched: false }
		],

		preprocessors: {
			'components/**/tests/**/*.spec.js': ['webpack', 'sourcemap'],
		},
		webpack: webpackConfig,

		reporters: ['spec', 'coverage'],
		coverageReporter: {
			dir: '../../coverage',
			reporters: [
				{ type: 'lcov', subdir: '.' },
				{ type: 'text-summary' }
			]
		},

		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only'
		},
		logLevel: config.LOG_INFO,

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
		browsers: ['Chrome', 'Firefox', 'PhantomJS', 'PhantomJS_custom'],
	});
};