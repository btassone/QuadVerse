
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home";

let routes = [
	{ path: '/', component: Home }
];

const router = new VueRouter({
	mode: 'history',
	routes
});

Vue.use(VueRouter);

const app = new Vue({
    el: '#site',
	router
});
