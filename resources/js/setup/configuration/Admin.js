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

// Development
import PaginationTable from "../../components/admin/development/PaginationTable";

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
			redirect: 'login',
			component: Admin,
			linkActiveClass: 'open active',
			scrollBehavior: () => ({ y: 0 }),
			children: [
				{
					path: '',
					redirect: 'dashboard',
					component: DefaultContainer,
					name: 'Admin',
					meta: {
						authentication: true
					},
					children: [
						{
							path: 'dashboard',
							name: 'Dashboard',
							component: Dashboard
						},
						{
							path: 'account-management',
							redirect: 'account-management/users/page/1',
							name: 'Account Management',
							component: {
								render (c) { return c('router-view') }
							},
							children: [
								{
									path: 'users/page/:pageId',
									name: 'Users',
									component: Users,
									props: true
								},
								{
									path: 'roles',
									name: 'Roles',
									component: Roles
								}
							]
						},
						{
							path: 'development',
							redirect: 'development/pagination/page/1',
							name: 'Development',
							component: {
								render (c) { return c('router-view') }
							},
							children: [
								{
									path: 'pagination/page/:pageId',
									name: 'Pagination Table',
									component: PaginationTable,
									props: true
								}
							]
						}
					]
				},
				{
					path: 'login',
					component: Login,
					name: 'Login',
					meta: {
						authentication: false
					}
				}
			]
		},
		{
			path :'*',
			redirect: '/admin'
		}
	],
	plugins: [
		{ def: BootstrapVue, options: {} }
	]
}