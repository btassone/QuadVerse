import Admin from "../../components/Admin";
import Login from "../../components/admin/access/Login";
import Dashboard from "../../components/admin/Dashboard";
import BootstrapVue from 'bootstrap-vue'

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
	plugins: [
		{ def: BootstrapVue, options: {} }
	]
}