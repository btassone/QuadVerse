<template>
    <div class="animated fadeIn">
        <h1 class="mb-3">Manage Users</h1>
        <b-row>
            <b-col lg="12">
                <crud-table
                        :crud-data="userData"
                        :per-page="perPage"
                        :items="users"
                        :current-page="compPageId"
                        :total-pages="totalPages"
                        resource-icon="fa-users"
                        resource-name="Users"
                        striped
                        @add-item="addUser"
                        @edit-item="editUser"
                        @delete-item="deleteUser"
                        @modal-open="modalOpen"
                        @current-page-change="pageChange">
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
        props: {
			pageId: {
				type: String
            }
        },
        data: () => {
		    return {
			    users: [],
			    userData: {
				    fields: [
					    {key: "id"},
					    {key: "name"},
					    {key: "email"},
					    {key: "created_at"}
				    ]
			    },
                perPage: 8,
                form: new Form({
                    name: '',
                    email: '',
                    password: ''
                }),
                prevUrl: "",
                nextUrl: "",
                totalPages: 999
            }
        },
        created() {
			// TODO: Fix nav page not properly loading correct one on load
		    this.loadUsers();
        },
        computed: {
		    compPageId() {
		    	return parseInt(this.pageId);
            }
        },
        methods: {
			// Load all the users in the DB
			loadUsers() {
				this.$http.get(`/api/v1/users`)
                    .then(({data}) => {
	                    this.users = data;
	                    this.totalPages = Math.ceil(this.users.length / this.perPage);
                    });
            },
            modalOpen(context, data) {
	            this.form.reset();
	            this.form.clear();

	            if(context === 'edit') {
		            this.form.fill(data);
	            }
            },
			addUser(modal) {
                this.form.post('/api/v1/users')
                    .then(() => {
                    	// Hide the modal
                    	modal.hide();

                    	// Update the user list
                        this.loadUsers();
                    })
            },
            editUser(modal, user) {
				this.form.put(`/api/v1/users/${user.id}`)
                    .then(() => {
	                    // Hide the modal
                    	modal.hide();

	                    // Update the user list
                    	this.loadUsers();
                    });
            },
            deleteUser(id) {
                this.form.delete(`/api/v1/users/${id}`)
                    .then(({data}) => console.log(data));
            },
            pageChange(to) {

            }
        }
	}
</script>