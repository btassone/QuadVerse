<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class AuthController extends Controller
{
	/**
	 * @param Request $request
	 *
	 * @return array|\Symfony\Component\HttpFoundation\Response
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function register(Request $request) {
		$this->validate($request, [
			'name' => 'required|min:3',
			'email' => 'required|email|unique:users',
			'password' => 'required|min:6'
		]);

		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => bcrypt($request->password)
		]);

		return $this->proxy('password', [
			"username" => $user->email,
			"password" => $user->password
		]);
	}

	/**
	 * @param Request $request
	 *
	 * @return array|\Symfony\Component\HttpFoundation\Response
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function login(Request $request) {

		$this->validate($request, [
			'email' => 'required',
			'password' => 'required'
		]);

		$credentials = [
			'username' => $request->email,
			'password' => $request->password
		];

		return $this->proxy('password', $credentials);
	}

	/**
	 * @param Request $request
	 */
	public function logout(Request $request) {
		$accessToken = $request->user()->token();

		DB::table('oauth_refresh_tokens')
		  ->where('access_token_id', $accessToken->id)
		  ->update([
			  'revoked' => true
		  ]);

		$accessToken->revoke();

		Cookie::queue(Cookie::forget('refresh_token'));
	}

	/**
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function user(Request $request) {
		return $request->user();
	}

	/**
	 * @param Request $request
	 *
	 * @throws
	 * @return array|\Symfony\Component\HttpFoundation\Response
	 */
	public function refresh(Request $request) {
		$refreshToken = $request->cookie('refresh_token');

		return $this->proxy('refresh_token', [
			'refresh_token' => $refreshToken
		]);
	}

	/**
	 * @param $grantType
	 * @param $data
	 *
	 * @return array|\Symfony\Component\HttpFoundation\Response
	 * @throws \Exception
	 */
	public function proxy($grantType, $data) {

		$data = array_merge($data, [
			'client_id'     => env('PASSWORD_CLIENT_ID'),
			'client_secret' => env('PASSWORD_CLIENT_SECRET'),
			'grant_type'    => $grantType
		]);

		$request = Request::create('/oauth/token', 'POST', $data);
		$response = app()->handle($request);

		if($response->getStatusCode() != 200) {
			return $response;
		}

		$data = json_decode($response->getContent());

		// Create a refresh token cookie
		Cookie::queue(
			'refresh_token',
			$data->refresh_token,
			1209600, // 14 days
			null,
			null,
			false,
			true // HttpOnly
		);

		return [
			'access_token' => $data->access_token,
			'expires_in' => $data->expires_in
		];
	}
}
