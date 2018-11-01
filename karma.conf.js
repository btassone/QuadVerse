let webpackConfig = require('laravel-mix/setup/webpack.config');

module.exports = function(config) {
	config.set({
		frameworks: ['mocha'],

		files: [
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

		browsers: ['Chrome'],
	})
};