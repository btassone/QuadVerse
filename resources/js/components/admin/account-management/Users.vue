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
                        @delete-item="deleteUser"
                        @modal-open="modalOpen">
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
			// TODO: Fix nav page not properly loading correct one on load
		    this.loadUsers();
        },
        methods: {
			// Load all the users in the DB
			loadUsers() {
				this.$http.get('/api/v1/users')
                    .then(({data}) => this.userData.items = data.data);
            },
            modalOpen(context, data) {
	            this.form.reset();
	            this.form.clear();

	            if(context === 'edit') {
		            this.form.fill(data);
	            }
            },
			addUser(modal) {
                this.form.submit('post', '/api/v1/users')
                    .then(() => {
                    	// Hide the modal
                    	modal.hide();

                    	// Update the user list
                        this.loadUsers();
                    })
            },
            editUser(modal, user) {
				this.form.submit('put', `/api/v1/users/${user.id}`)
                    .then(() => {
	                    // Hide the modal
                    	modal.hide();

	                    // Update the user list
                    	this.loadUsers();
                    });
            },
            deleteUser(userId) {
				this.userData.items = this.userData.items.filter(user => user.id !== userId);
            }
        }
	}
</script>