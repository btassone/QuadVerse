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
		Route::post('login', 'API\AuthController@login');
		Route::post('register', 'API\AuthController@register');
		Route::get('refresh', 'API\AuthController@refresh');

		// Authenticated
		Route::middleware('auth:api')->group(function () {
			Route::get('logout', 'API\AuthController@logout');
			Route::get('user', 'API\AuthController@user');
		});
	});

	// User CRUD routes
	Route::apiResource('users', 'API\UserController');

	// Role CRUD routes
	Route::apiResource('roles', 'API\RoleController');

	// Permission CRUD routes
	Route::apiResource('permissions', 'API\PermissionController');
});