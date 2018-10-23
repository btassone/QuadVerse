import axios from "axios";

export default class Authentication {

	/**
	 * @param {VueRouter} router
	 * @param {array} authPaths
	 */
	constructor(router, authPaths) {
		this.authType = "Bearer";
		this.authPaths = authPaths;
		this.router = router;
		this.accessToken = "";
		this.user = null;
	}

	/**
	 * Find out if the user is logged in or not. If the access token is expired (doesn't work) it will try to use the
	 * refresh token. If the refresh token is still good it will reset the access token and return true.
	 *
	 * @returns {Promise<boolean>}
	 */
	async loggedIn() {
		let loggedIn = true;

		if(!this.user) {
			await axios.get("/api/v1/auth/user")
			// If it is still good, send them to the dashboard
				.then(({data}) => {
					// Set login to true
					loggedIn = true;

					// Assign the logged in user data
					this.user = data;
				})
				// See if the refresh token is good
				.catch(() => this.refresh().then(value => loggedIn = value));
		}

		return loggedIn;
	}

	/**
	 * If there is a problem getting the user data (means we are either no logged in, or no access token) we call the
	 * refresh route to use the refresh_key http only cookie if available. This will generate a new access key and keep
	 * us essentially logged in.
	 *
	 * @returns {Promise<boolean>}
	 */
	async refresh() {
		let loggedIn = false;

		await axios.get("/api/v1/auth/refresh")
			// Token is good. Pass them to the dashboard
			.then(({data}) => {
				// Set the token
				this.accessToken = data.access_token;

				// Set the user
				this.user = data.user;

				// Now logged in
				loggedIn = true;
			})
			.catch(() => {
				// Remove the token
				this.removeAccessToken();

				// Set user null
				this.user = null;

				// Set logged out
				loggedIn = false
			});

		return loggedIn;
	}

	/**
	 * Accepts a vform as a parameter. Preferably the login form.
	 *
	 * @param form
	 */
	logIn(form) {
		form.post("/api/v1/auth/login")
			.then(({data}) => {
				// Set the access token
				this.accessToken = data.access_token;

				// Set the user
				this.user = data.user;

				// Go to the on login page
				this.goOnAuthentication();
			});
	}

	/**
	 * Logs the user out
	 */
	logOut() {
		axios.get("/api/v1/auth/logout")
			.then(() => {
				// Remove the access token
				this.removeAccessToken();

				// Remove the user data
				this.user = null;

				// Go to the unauthorized page
				this.goOnUnauthorized();
			});
	}

	/**
	 * Tells the router to go to the page specified on login
	 */
	goOnAuthentication() {
		this.router.push(this.authPaths.login);
	}

	/**
	 * Tells the router to go to the page specified on logout
	 */
	goOnUnauthorized() {
		this.router.push(this.authPaths.logout);
	}

	/**
	 * Remove the access token
	 */
	removeAccessToken() {
		this.accessToken = "";
	}

	/**
	 * @returns {*}
	 */
	get authType() {
		return this._authType;
	}

	/**
	 * @param value
	 */
	set authType(value) {
		this._authType = value;
	}

	/**
	 * @returns {*}
	 */
	get authPaths() {
		return this._authPaths;
	}

	/**
	 * @param value
	 */
	set authPaths(value) {
		this._authPaths = value;
	}

	/**
	 * @returns {*}
	 */
	get storageName() {
		return this._storageName;
	}

	/**
	 * @param value
	 */
	set storageName(value) {
		this._storageName = value;
	}

	/**
	 * @returns {*}
	 */
	get router() {
		return this._router;
	}

	/**
	 * @param value
	 */
	set router(value) {
		this._router = value;
	}

	/**
	 * @returns {*}
	 */
	get accessToken() {
		return axios.defaults.headers.common['Authorization'];
	}

	/**
	 * @param value
	 */
	set accessToken(value) {
		axios.defaults.headers.common['Authorization'] = `${this.authType} ${value}`;
	}

	/**
	 * @returns {*}
	 */
	get user() {
		return this._user;
	}

	/**
	 * @param value
	 */
	set user(value) {
		this._user = value;
	}
}