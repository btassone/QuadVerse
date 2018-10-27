export default {
	items: [
		{
			name: 'Dashboard',
			url: '/admin/dashboard',
			icon: 'icon-speedometer',
		},
		{
			name: 'Account Management',
			url: '/admin/account-management',
			icon: 'icon-wrench',
			children: [
				{
					name: 'Users',
					url: '/admin/account-management/users/page/1',
					icon: 'icon-people'
				},
				{
					name: 'Roles',
					url: '/admin/account-management/roles',
					icon: 'icon-layers'
				}
			]
		},
		{
			name: 'Development',
			url: '/admin/development',
			icon: 'icon-calculator',
			children: [
				{
					name: 'Pagination Table',
					url: '/admin/development/pagination/page/1',
					icon: 'icon-list'
				}
			]
		}
	]
}