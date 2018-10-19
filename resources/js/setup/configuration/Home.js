import Home from "../../components/Home";

export const AppAuthPaths = {
	login: { },
	logout: { }
};

export default {
	context: "App",
	authPaths: AppAuthPaths,
	basePath: "",
	routes: [
		{ path: "/", component: Home, name: "home", meta: { authentication: false } }
	],
	plugins: []
}