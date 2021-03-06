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
					url: '/admin/account-management/users',
					icon: 'icon-people'
				},
				{
					name: 'Roles',
					url: '/admin/account-management/roles',
					icon: 'icon-layers'
				}
			]
		}
	]
}