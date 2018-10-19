import BootstrapVue from 'bootstrap-vue'
import Admin from "../../components/Admin";
import Login from "../../components/admin/pages/Login";
import Dashboard from "../../components/admin/Dashboard";
import DefaultContainer from "../../components/admin/containers/DefaultContainer";

export const AdminAuthPaths = {
	login: { name: 'Admin' },
	logout: { name: 'Login' }
};

export default {
	context: "Admin",
	authPaths: AdminAuthPaths,
	basePath: "admin",
	routes: [
		{
			path: '/admin',
			component: Admin,
			redirect: '/admin/login',
			children: [
				{
					path: 'login',
					component: Login,
					name: 'Login',
					meta: {
						authentication: false
					}
				},
				{
					path: 'dashboard',
					component: Dashboard,
					name: 'Admin',
					redirect: '/admin/dashboard',
					linkActiveClass: 'open active',
					scrollBehavior: () => ({ y: 0 }),
					meta: {
						authentication: true
					},
					children: [
						{
							path: '',
							name: 'Dashboard',
							component: DefaultContainer,
						},
					]
				}
			]
		}
	],
	plugins: [
		{ def: BootstrapVue, options: {} }
	]
}