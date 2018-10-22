<template>
    <div class="animated fadeIn">
        <h1 class="mb-3">Manage Users</h1>
        <b-row>
            <b-col lg="12">
                <crud-table
                        :crud-data="userData"
                        :per-page="perPage"
                        resource-icon="fa-users"
                        resource-name="Users"
                        striped
                        @add-item="addUser"
                        @edit-item="editUser"
                        @delete-item="deleteUser">
                </crud-table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import crudTable from "../base/CrudTable";
    import axios from "axios";

	export default {
		components: {
			crudTable
		},
        data: () => {
		    return {
			    userData: {
				    items: [],
				    fields: [
					    {key: "id"},
					    {key: "name"},
					    {key: "email"},
					    {key: "created_at"}
				    ]
			    },
                perPage: 10
            }
        },
        created() {
            this.loadUsers();
        },
        methods: {
			loadUsers() {
				axios.get('/api/v1/users', this.$authentication.headers()).then( ({data}) => {
					let users = data.data;

					users.filter(user => {
						let filteredUser = {};

						this.userData.fields.forEach(field => {
							filteredUser[field.key] = user[field.key]
						});

						this.userData.items.push(filteredUser);
                    });
				});
            },
			addUser(users) {
				console.log("Hit function");
				users.push({ id: users.length + 1, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" })
            },
            editUser(user) {
				user.name = "Working";
            },
            deleteUser(userId) {
				this.userData.items = this.userData.items.filter(user => user.id !== userId);
            }
        }
	}
</script>