// Global Imports
import BootstrapVue from 'bootstrap-vue';

// Main wrapper
import Admin from "../../components/Admin";

// Pages
import Login from "../../components/admin/pages/Login";
import Dashboard from "../../components/admin/Dashboard";

// CoreUI container
import DefaultContainer from "../../components/admin/containers/DefaultContainer";

// Account Management
import Users from "../../components/admin/account-management/Users";
import Roles from "../../components/admin/account-management/Roles";
import Permissions from "../../components/admin/account-management/Permissions";

// Auth paths for authenticated and un-authenticated users
export const AdminAuthPaths = {
	login: { name: 'Admin' },
	logout: { name: 'Login' }
};

// Routes
export default {
	context: "Admin",
	authPaths: AdminAuthPaths,
	basePath: "admin",
	routes: [
		{
			path: '/admin',
			component: Admin,
			redirect: '/admin/login',
			linkActiveClass: 'open active',
			scrollBehavior: () => ({ y: 0 }),
			children: [
				{
					path: '/admin/login',
					component: Login,
					name: 'Login',
					meta: {
						authentication: false
					}
				},
				{
					path: 'dashboard',
					component: DefaultContainer,
					name: 'Admin',
					redirect: '/admin/dashboard',
					meta: {
						authentication: true
					},
					children: [
						{
							path: '',
							name: 'Dashboard',
							component: Dashboard
						},
						{
							path: '/admin/account-management',
							name: 'Account Management',
							redirect: '/admin/account-management/users',
							component: {
								render (c) { return c('router-view') }
							},
							children: [
								{
									path: '/admin/account-management/users',
									name: 'Users',
									component: Users
								},
								{
									path: '/admin/account-management/roles',
									name: 'Roles',
									component: Roles
								},
								{
									path: '/admin/account-management/permissions',
									name: 'Permissions',
									component: Permissions
								}
							]
						}
					]
				}
			]
		},
		{
			path :'*',
			redirect: '/admin/dashboard'
		}
	],
	plugins: [
		{ def: BootstrapVue, options: {} }
	]
}