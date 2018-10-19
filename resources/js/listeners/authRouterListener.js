export default function ({ detail }) {
	let router = detail.router;
	let auth = detail.auth;

	router.beforeEach((to, from, next) => {
		if (to.matched.some(record => record.meta.authentication)) {
			auth.loggedIn().then(loggedIn => {
				if(!loggedIn) {
					next(auth.authPaths.logout);
				} else {
					next();
				}
			});
		} else {
			if(to.name === auth.authPaths.logout.name) {
				auth.loggedIn().then(loggedIn => {
					if(loggedIn) {
						next(auth.authPaths.login);
					} else {
						next();
					}
				});
			} else {
				next();
			}
		}
	});
}