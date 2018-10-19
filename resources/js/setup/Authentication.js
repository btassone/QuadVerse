import axios from "axios";

export default class Authentication {

	constructor(router, authPaths) {
		this.authType = "Bearer";
		this.authPaths = authPaths;
		this.storageName = "access_token";
		this.router = router;
	}

	async loggedIn() {
		let loggedIn = false;

		if(this.accessToken) {
			await axios.get("/api/v1/auth/user", this.headers())
			// If it is still good, send them to the dashboard
				.then(() => {
					loggedIn = true;
				})
				// See if the refresh token is good
				.catch(() => this.refresh().then(value => loggedIn = value));
		}

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
				this.accessToken = data.access_token;

				this.goOnAuthentication();
			});
	}

	/**
	 * Logs the user out
	 */
	logOut() {
		axios.get("/api/v1/auth/logout", this.headers())
			.then(() => {
				this.removeAccessToken();

				this.goOnUnauthorized();
			});
	}

	async refresh() {
		let loggedIn = false;

		await axios.get("/api/v1/auth/refresh")
			// Token is good. Pass them to the dashboard
			.then(({data}) => {
				this.accessToken = data.access_token;

				loggedIn = true;
			})
			.catch(() => loggedIn = false);

		return loggedIn;
	}

	headers() {
		return { headers: { Authorization: `${this.authType} ${this.accessToken}` } }
	}

	goOnAuthentication() {
		this.router.push(this.authPaths.login);
	}

	goOnUnauthorized() {
		this.router.push(this.authPaths.logout);
	}

	removeAccessToken() {
		localStorage.removeItem(this.storageName);
	}

	get authType() {
		return this._authType;
	}

	set authType(value) {
		this._authType = value;
	}

	get authPaths() {
		return this._authPaths;
	}

	set authPaths(value) {
		this._authPaths = value;
	}

	get storageName() {
		return this._storageName;
	}

	set storageName(value) {
		this._storageName = value;
	}

	get router() {
		return this._router;
	}

	set router(value) {
		this._router = value;
	}

	get accessToken() {
		return localStorage.getItem(this.storageName);
	}

	set accessToken(value) {
		localStorage.setItem(this.storageName, value);
	}
}