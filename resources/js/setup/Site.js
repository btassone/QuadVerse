import Vue from "vue";
import VueRouter from "vue-router";

export default class {

	/**
	 * @param siteConfigurations
	 */
	constructor(siteConfigurations) {
		this.siteConfigurations = siteConfigurations;
		this.app = {};
	}

	/**
	 * Run to setup the Vue object
	 *
	 * @param globalPlugins
	 * @param el
	 */
	setup(globalPlugins, el) {
		// Get combined items
		let { routes, plugins } = this.getSiteConfigurationDetails(globalPlugins);

		// Get router
		let router = this.getRouter(routes);

		// Setup the plugins on Vue
		this.setupPlugins(plugins);

		// Create the Vue object
		this.app = new Vue({
			el: el,
			router
		});
	}

	/**
	 * Based on passed in routes, get the VueRouter object
	 *
	 * @param routes
	 * @returns {VueRouter}
	 */
	getRouter(routes) {
		return new VueRouter({
			mode: 'history',
			routes
		});
	}

	/**
	 * Setup the plugins on Vue
	 *
	 * @param plugins
	 */
	setupPlugins(plugins) {
		// Setup Plugins
		plugins.forEach(plugin => {
			Vue.use(plugin.def, plugin.options);
		});
	}

	/**
	 * @param globalPlugins
	 * @returns {{routes: Array, plugins: *}}
	 */
	getSiteConfigurationDetails(globalPlugins) {
		let plugins = globalPlugins;
		let routes = [];
		let otherPathMatched = false;

		const path = window.location.pathname;

		this.siteConfigurations.other.forEach(configuration => {
			if(this.checkPathContainsBasePath(path, configuration.basePath)) {
				otherPathMatched = true;
				({routes, plugins} = this.combineConfigurationDetailsWithGlobal(routes, plugins, configuration));
			}
		});

		if(!otherPathMatched) {
			({routes, plugins} = this.combineConfigurationDetailsWithGlobal(routes, plugins, this.siteConfigurations.default));
		}

		return { routes, plugins };
	}

	/**
	 * @param globalRoutes
	 * @param globalPlugins
	 * @param configuration
	 * @returns {{routes: (Array|Buffer|*|T[]|string), plugins: (Array|Buffer|*|T[]|string)}}
	 */
	combineConfigurationDetailsWithGlobal(globalRoutes, globalPlugins, configuration) {
		let routes = globalRoutes.concat(configuration.routes);
		let plugins = globalPlugins.concat(configuration.plugins);

		return { routes, plugins };
	}

	/**
	 * @param path
	 * @param basePath
	 * @returns {boolean}
	 */
	checkPathContainsBasePath(path, basePath) {
		if(!path) return;

		return path.split("/").splice(1)[0] === basePath;
	}

	/**
	 * @returns {*}
	 */
	get siteConfigurations() {
		return this._siteConfigurations;
	}

	/**
	 * @param value
	 */
	set siteConfigurations(value) {
		this._siteConfigurations = value;
	}

	/**
	 * @returns {Vue}
	 */
	get app() {
		return this._app;
	}

	/**
	 * @param {Vue} value
	 */
	set app(value) {
		this._app = value;
	}
}