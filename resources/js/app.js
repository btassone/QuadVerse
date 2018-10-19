
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

// Site imports
import VueRouter from "vue-router";
import adminConfig from "./setup/AdminConfiguration";
import homeConfig from "./setup/HomeConfiguration";
import QuadVerseSite from "./setup/Site";

// Plugins
let globalPlugins = [
	{ def: VueRouter, options: {} }
];

// Routes
let siteConfigurations = {
	default: homeConfig,
	other: [adminConfig]
};

// Creates the site object and sets all the required variables
let quadVerseSite = new QuadVerseSite(siteConfigurations);

// Run the global event for event listeners. Good spot to attach listeners for the whole site
quadVerseSite.eventListeners();

// Sets up the site and creates the VueRouter and Vue object
quadVerseSite.setup(globalPlugins, '#site');

// Add the QuadVerseSite object to window
window.quadVerseSite = quadVerseSite;