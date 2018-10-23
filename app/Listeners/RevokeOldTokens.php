<?php

namespace App\Listeners;

use Illuminate\Support\Facades\DB;
use Laravel\Passport\Events\AccessTokenCreated;

class RevokeOldTokens {
	public function __construct() {
	}

	public function handle(AccessTokenCreated $event)
	{
		$delete_from_refresh = Db::table('oauth_access_tokens')
			->where('user_id', $event->userId)
			->where('client_id', $event->clientId)
			->whereNotIn('id', [$event->tokenId]);

		$delete_from_refresh->get()->each(function($item) {
			$result = DB::table('oauth_refresh_tokens')
				->where('access_token_id', $item->id)
				->delete();
		});

		$delete_from_refresh->delete();
	}
}