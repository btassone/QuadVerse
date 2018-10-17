<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
	private $appTokenName = "QuadVerse";

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

    	$token = $user->createToken($this->appTokenName)->accessToken;

    	return response()->json(['token' => $token], 200);
	}

	public function login(Request $request) {
    	$status = 401;
    	$credentials = [
    		'email' => $request->email,
			'password' => $request->password
		];

    	if(auth()->attempt($credentials)) {
    		$token = auth()->user()->createToken($this->appTokenName)->accessToken;
    		$response = ['token' => $token];
    		$status = 200;
		} else {
    		$response = ['error', 'Unauthorized'];
		}

		return response()->json($response, $status);
	}

	public function logout(Request $request) {
		$request->user()->token()->revoke();

		return response()->json(['message' => 'Successfully logged out'], 200);
	}
}
