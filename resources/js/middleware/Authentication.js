export default function (router, auth) {
	// Before each route
	router.beforeEach((to, from, next) => {

		// If meta authentication is set to true
		if (to.matched.some(record => record.meta.authentication)) {

			/**
			 * Check if we are logged in. If we aren't, go to the path we would go to on logout. If we are logged in
			 * continue on to the next path
			 */
			auth.loggedIn().then(loggedIn => (!loggedIn) ? next(auth.authPaths.logout) : next());

		// If meta authentication is set to false
		} else {

			// If the destination name is the same as where we would go on logout
			if(to.name === auth.authPaths.logout.name) {

				/**
				 * Check to see if we are logged on. If we are logged in go where we would go on login. Other wise
				 * continue on to our original destination
				 */
				auth.loggedIn().then(loggedIn => (loggedIn) ? next(auth.authPaths.login) : next());

			// If the destination is not the same as where we would go on logout
			} else {

				// Continue to the destination
				next();
			}
		}
	});
}