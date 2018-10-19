// Vue
import Vue from "vue";
import VueRouter from "vue-router";

// Configurations
import homeConfig from "./configuration/Home";
import adminConfig from "./configuration/Admin";

// Authentication
import Authentication from "./Authentication";
import authenticationMiddleware from "../middleware/Authentication";

export default class {

	/**
	 *
	 */
	constructor() {
		this.app = null;
		this.authentication = null;
		this.context = "";
		this.globalPlugins = [
			{ def: VueRouter, options: {} }
		];
		this.root = '#site';
		this.siteConfigurations = {
			default: homeConfig,
			other: [adminConfig]
		};

		this.setup();
	}

	/**
	 * Run to setup the Vue object
	 */
	setup() {

		// Get combined items
		let { routes, plugins, context, authPaths } = this.getSiteConfigurationDetails(this.globalPlugins);

		// Get router
		let router = this.getRouter(routes);

		// The context name of the configuration
		this.context = context;

		// The authentication object
		this.authentication = new Authentication(router, authPaths);

		// The authentication middleware
		this.createAuthMiddleware(router, this.authentication);

		// Setup the plugins on Vue
		this.setupPlugins(plugins);

		// Add authentication object to the Vue prototype
		Vue.prototype.$authentication = this.authentication;

		// Create the Vue object
		this.app = new Vue({
			el: this.root,
			router
		});
	}

	/**
	 * @param {VueRouter} router
	 * @param {Authentication} auth
	 */
	createAuthMiddleware(router, auth) {
		// Setup the beforeEach action on the router for authentication. Looks for meta key: authentication
		authenticationMiddleware(router, auth);
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
		let context = "";
		let authPaths = null;
		let otherPathMatched = false;

		const path = window.location.pathname;

		this.siteConfigurations.other.forEach(configuration => {
			if(this.checkPathContainsBasePath(path, configuration.basePath)) {
				otherPathMatched = true;
				context = configuration.context;
				authPaths = configuration.authPaths;

				({routes, plugins} = this.combineConfigurationDetailsWithGlobal(routes, plugins, configuration));
			}
		});

		if(!otherPathMatched) {
			context = this.siteConfigurations.default.context;
			authPaths = this.siteConfigurations.default.authPaths;

			({routes, plugins} = this.combineConfigurationDetailsWithGlobal(routes, plugins, this.siteConfigurations.default));
		}

		return { routes, plugins, context, authPaths };
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
		if(!path) return false;

		return path.split("/").splice(1)[0] === basePath;
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

	/**
	 * @returns {*}
	 */
	get authentication() {
		return this._authentication;
	}

	/**
	 * @param value
	 */
	set authentication(value) {
		this._authentication = value;
	}

	/**
	 * @returns {*}
	 */
	get context() {
		return this._context;
	}

	/**
	 * @param value
	 */
	set context(value) {
		this._context = value;
	}

	/**
	 * @returns {*}
	 */
	get globalPlugins() {
		return this._globalPlugins;
	}

	/**
	 * @param value
	 */
	set globalPlugins(value) {
		this._globalPlugins = value;
	}

	/**
	 * @returns {*}
	 */
	get root() {
		return this._root;
	}

	/**
	 * @param value
	 */
	set root(value) {
		this._root = value;
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
}