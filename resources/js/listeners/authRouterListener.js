export default function ({ detail }) {
	let router = detail.router;
	let auth = detail.auth;

	router.beforeEach((to, from, next) => {

		if (to.matched.some(record => record.meta.authentication)) {

			auth.loggedIn().then(loggedIn => (!loggedIn) ? next(auth.authPaths.logout) : next());

		} else {

			if(to.name === auth.authPaths.logout.name) {

				auth.loggedIn().then(loggedIn => (loggedIn) ? next(auth.authPaths.login) : next());

			} else {

				next();
				
			}

		}

	});
}