<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Version 1.0 API
 */
Route::group([ 'prefix' => 'v1' ], function() {

	// Authentication Routes
	Route::group([ 'prefix' => 'auth' ], function() {
		// Unauthenticated
		Route::post('login', 'AuthController@login');
		Route::post('register', 'AuthController@register');
		Route::get('refresh', 'AuthController@refresh');

		// Authenticated
		Route::middleware('auth:api')->group(function () {
			Route::get('logout', 'AuthController@logout');
			Route::get('user', 'AuthController@user');
		});
	});
});