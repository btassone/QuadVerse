import Admin from "../components/Admin";
import Login from "../components/global/Login";
import Dashboard from "../components/admin/Dashboard";

export const AdminAuthPaths = {
	login: { name: 'adminDashboard' },
	logout: { name: 'adminLogin' }
};

export default {
	context: "Admin",
	authPaths: AdminAuthPaths,
	basePath: "admin",
	routes: [
		{
			path: '/admin', component: Admin,
			children: [
				{
					path: '',
					component: Login,
					name: 'adminLogin',
					meta: {
						authentication: false
					}
				},
				{
					path: 'dashboard',
					component: Dashboard,
					name: 'adminDashboard',
					meta: {
						authentication: true
					}
				}
			]
		}
	],
	plugins: []
}