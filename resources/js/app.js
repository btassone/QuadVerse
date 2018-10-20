
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

// Site imports
import Site from "./setup/Site";

// Creates the site object and sets all the required variables
let site = new Site();