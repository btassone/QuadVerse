<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

	/**
	 * UserController constructor.
	 */
	public function __construct() {
		$this->middleware('auth:api');
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
    	$pagination = ($request->pagination) ? $request->pagination : 0;
    	$sortBy = null;
    	$sortDesc = 'asc';
    	$filter = '';
    	$filter_columns = '';

    	if($request->filter) {
			$filter = $request->filter;
			$filter_columns = $request->filter_columns;
		}

    	if($request->sort) {
			$sortBy   = ( !empty($request->sort["by"]) ) ? $request->sort["by"] : null;
			$sortDesc = ( $request->sort["desc"] != "false" ) ? 'desc' : 'asc';
		}

		$users = User::query();

    	if($pagination) {

			if($filter != '') {

				foreach($filter_columns as $key => $column) {
					if($key == 0) {
						$users = $users->where($column, 'like', "%{$filter}%");
					}
					$users = $users->orWhere($column, 'like', "%{$filter}%");
				}
			}

			if($sortBy) {
				$users = $users->orderBy($sortBy, $sortDesc);
			} else {
				$users = $users->oldest();
			}

			$users = $users->jsonPaginate( $pagination );
		} else {
    		$users = [
    			"data" => User::all()
			];
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

		return response()->json($user);
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
