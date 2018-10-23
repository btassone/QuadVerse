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
                    <template slot="modal-content">
                        <form @submit.prevent>
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name" id="name" placeholder="Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" />
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" type="email" name="email" id="email" placeholder="Email Address"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" />
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password" id="password" placeholder="Password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" />
                                <has-error :form="form" field="password"></has-error>
                            </div>
                        </form>
                    </template>
                </crud-table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import CrudTable from "../base/CrudTable";
    import axios from "axios";
    import Form from "vform";
    import { HasError } from "vform";
    import { AlertError } from "vform";

	export default {
		components: {
			CrudTable,
			HasError,
			AlertError
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
                perPage: 10,
                form: new Form({
                    name: '',
                    email: '',
                    password: ''
                })
            }
        },
        created() {
            this.loadUsers();
        },
        methods: {
			loadUsers() {
				axios.get('/api/v1/users', this.$authentication.headers()).then(({data}) => {
					let users = data.data;

					this.userData.items = [];

					users.filter(user => {
						let filteredUser = {};

						this.userData.fields.forEach(field => {
							filteredUser[field.key] = user[field.key]
						});

						this.userData.items.push(filteredUser);
                    });
				});
            },
			addUser(evt, modal) {
				// Prevent default modal behavior
				evt.preventDefault();

                this.form.submit('post', '/api/v1/users', this.$authentication.headers())
                    .then(({data}) => {
                    	// Hide the modal
                    	modal.hide();

                    	// Load the users
                    	this.loadUsers();
                    })
            },
            editUser(evt, modal, user) {
				user.name = "Working";
            },
            deleteUser(userId) {
				this.userData.items = this.userData.items.filter(user => user.id !== userId);
            }
        }
	}
</script>