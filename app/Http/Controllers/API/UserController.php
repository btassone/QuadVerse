<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
	/**
	 * @var int
	 */
	protected $paginate = 20;

	public function __construct() {
		$this->middleware('auth:api');
	}

    /**
     * Display a listing of the resource.
     *
	 * @param \Illuminate\Http\Request  $request
	 *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
		return User::latest()->paginate($this->paginate);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
	 * @throws
	 *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
		$this->validate($request, [
			'name' => 'required|string|min:3',
			'email' => 'required|string|email|max:80|unique:users',
			'password' => 'required|string|min:6'
		]);

		return User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => bcrypt($request->password)
		]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
	 * @throws
	 *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
		$user = User::findOrFail($id);

		$this->validate($request, [
			'name' => 'required|string|min:3',
			'email' => 'required|string|email|max:80|unique:users,email,'.$user->id,
			'password' => 'sometimes|string|min:6'
		]);

		$user->update($request->all());

		return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
