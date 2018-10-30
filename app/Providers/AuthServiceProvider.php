<?php

namespace App\Providers;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
	/**
	 * Interval in minutes
	 *
	 * @var int $tokensExpiresIn
	 */
	public static $tokensExpiresIn = 30;

	/**
	 * Interval in days
	 *
	 * @var int $refreshTokensExpireIn
	 */
	public static $refreshTokensExpireIn = 14;

    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

		Passport::routes(function ($router) {
			$router->forAccessTokens();
		});

		Passport::tokensExpireIn(Carbon::now()->addMinutes(self::$tokensExpiresIn));
		Passport::refreshTokensExpireIn(Carbon::now()->addDays(self::$refreshTokensExpireIn));
	}
}
