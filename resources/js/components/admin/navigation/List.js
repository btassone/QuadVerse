export default {
	items: [
		{
			name: 'Dashboard',
			url: '/admin/dashboard',
			icon: 'icon-speedometer',
		},
		{
			title: true,
			name: 'User',
			class: '',
			wrapper: {
				element: '',
				attributes: {}
			}
		},
		{
			name: 'Profile',
			url: '/admin/user/profile',
			icon: 'icon-user',
			children: [
				{
					name: 'Clubs',
					url: '/admin/user/profile/clubs',
					icon: 'icon-people'
				},
				{
					name: 'Certs',
					url: '/admin/user/profile/certs',
					icon: 'icon-check'
				},
				{
					name: 'Information',
					url: '/admin/user/profile/information',
					icon: 'icon-info'
				}
			]
		},
		{
			name: 'Blog',
			url: '/admin/user/blog',
			icon: 'icon-note',
			children: [
				{
					name: 'Posts',
					url: '/admin/user/blog/posts',
					icon: 'icon-list'
				},
				{
					name: 'Media',
					url: '/admin/user/blog/media',
					icon: 'icon-camrecorder'
				}
			]
		},
		{
			name: 'Quads',
			url: '/admin/user/quads',
			icon: 'icon-rocket',
			children: [
				{
					name: 'List',
					url: '/admin/user/quads/list',
					icon: 'icon-list'
				},
			]
		},
		{
			name: 'Flying',
			url: '/admin/user/flying',
			icon: 'icon-globe',
			children: [
				{
					name: 'Locations',
					url: '/admin/user/flying/locations',
					icon: 'icon-location-pin'
				},
				{
					name: 'Events',
					url: '/admin/user/flying/locations',
					icon: 'icon-calendar'
				}
			]
		},
		{
			name: 'Friends',
			url: '/admin/user/friends',
			icon: 'icon-people'
		}
	]
}