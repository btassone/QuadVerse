<template>
    <div class="animated fadeIn">
        <h1 class="mb-3">Manage Users</h1>
        <b-row>
            <b-col lg="12">
                <crud-table
                        :fields="fields"
                        :per-page="perPage"
                        :items="loadUsers"
                        :current-page="compPageId"
                        :total-pages="totalPages"
                        :options="options"
                        resource-icon="fa-users"
                        resource-name="Users"
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
    import { getParamsString } from "../../../functions/Global";
    import Form from "vform";
    import { HasError } from "vform";
    import { AlertError } from "vform";

    // Keys are the context keys mapped to the string to pass in the request
    const PAGINATION_PARAMS_MAP = {
        perPage: "pagination",
        currentPage: "page[number]",
        sortBy: "sort[by]",
        sortDesc: "sort[desc]"
    };

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
				totalPages: parseInt(this.pageId),
				fields: [
					{ key: "id", sortable: true, thStyle: { width: "80px" } },
					{ key: "name", sortable: true },
					{ key: "email", sortable: true },
					{ key: "created_at", sortable: true }
				],
				options: {
					sortBy: 'id',
					sortDesc: false,
                    bordered: true
				},
				perPage: 5,
				form: new Form({
					name: '',
					email: '',
					password: ''
				})
			}
		},
		computed: {
			// Parse the integer and return the pageId
			compPageId() {
				return parseInt(this.pageId);
			}
		},
		methods: {
			// Load all the users in the DB
			loadUsers(ctx) {
				let params = getParamsString(PAGINATION_PARAMS_MAP, ctx);
				let promise = this.$http.get(`/api/v1/users?${params}`);

				return promise.then(({data}) => {
					let users = data.data;
					let total = data.total;

					this.totalPages = Math.ceil(total / this.perPage);

					return(users || []);
				})
			},
            // Clear / reset the form and fill it with data if need be
			modalOpen(context, data) {
				this.form.reset();
				this.form.clear();

				if(context === 'edit') {
					this.form.fill(data);
				}
			},
            // Add user to the database
			addUser(modal, table) {
				this.form.post('/api/v1/users')
					.then(() => {
						// Hide the modal
						modal.hide();

						// Refresh the table so the provider will kick off
						table.refresh();
					})
			},
            // Edit the current user selected
			editUser(modal, table, user) {
				this.form.put(`/api/v1/users/${user.id}`)
					.then(() => {
						// Hide the modal
						modal.hide();

						// Refresh the table so the provider will kick off
						table.refresh();
					});
			},
            // Delete the selected user
			deleteUser(table, id) {
				this.form.delete(`/api/v1/users/${id}`)
					.then(() => table.refresh());
			}
		}
	}
</script>