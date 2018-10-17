
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueRouter from "vue-router";
import adminConfig from "./setup/AdminConfiguration";
import homeConfig from "./setup/HomeConfiguration";
import QuadVerseSite from "./setup/Site";

let globalPlugins = [
	{ def: VueRouter, options: {} }
];

let siteConfigurations = {
	default: homeConfig,
	other: [adminConfig]
};

let quadVerseSite = new QuadVerseSite(siteConfigurations);
quadVerseSite.setup(globalPlugins, '#site');