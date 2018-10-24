<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Utilities\Pagination;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{

	/**
	 * Default pagination
	 *
	 * @var Pagination
	 */
	protected $pagination = null;

	/**
	 * UserController constructor.
	 */
	public function __construct() {
		$this->middleware('auth:api');
		$this->pagination = new Pagination(3, 500, 8);
	}

    /**
     * Display a listing of the resource.
     *
	 * @param \Illuminate\Http\Request  $request
	 *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
    	if($request->pagination) {
			// Get pagination
			$pagination = $this->pagination->valid( $request->pagination );

			// Get users
			$users = User::latest()->paginate( $pagination );
		} else {
    		$users = User::all();
		}

		return response()->json($users);
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

		User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => bcrypt($request->password)
		]);

		return response()->json();
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
     * @param  User  $user
	 * @throws
	 *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $user)
    {
		$this->validate($request, [
			'name' => 'required|string|min:3',
			'email' => 'required|string|email|max:80|unique:users,email,'.$user->id,
			'password' => 'sometimes|string|min:6'
		]);

		$user->update($request->all());

		return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
	 * @throws
	 *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user)
    {
		$user->delete();

		return response()->json();
    }
}
