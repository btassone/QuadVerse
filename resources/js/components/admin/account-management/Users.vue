<template>
	<div class="animated fadeIn">
		<h1 class="mb-3">Manage Users</h1>
		<b-row>
			<b-col lg="12">
				<crud-table :fields="fields" :per-page="perPage" :items="loadUsers" :current-page="compPageId"
						:total-pages="totalPages" :options="options" resource-icon="fa-users" resource-name="Users"
						@add-item="addUser" @edit-item="editUser" @delete-item="deleteUser" @modal-open="modalOpen"
						@table-context-changed="setParams">
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
	import CrudTable                        from "../base/CrudTable";
	import formatDate                       from "../../../filters/FormatDate";
	import Form                             from "vform";
	import { HasError }                     from "vform";
	import { AlertError }                   from "vform";

	const dateFormat = 'MMMM Do YYYY';

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
				fields: [
					{
						key: "id",
						sortable: true,
						thStyle: { width: "80px" }
					},
					{
						key: "name",
						sortable: true,
						filterable: true
					},
					{
						key: "email",
						sortable: true,
						filterable: true
					},
					{
						key: "created_at",
						sortable: true,
						filterable: true,
						formatter: value => formatDate(value, dateFormat)
					}
				],
				options: {
					sortBy: 'id',
					sortDesc: false,
					bordered: true
				},
				form: new Form({
					name: '',
					email: '',
					password: ''
				}),
				perPage: 5,
				totalPages: parseInt(this.pageId),
				params: '',
				apiUrl: '/api/v1/users'
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
			loadUsers() {
				let promise = this.$http.get(`${this.apiUrl}?${this.params}`);

				return promise.then(({data}) => {
					let users = data.data;
					let total = data.total;

					this.totalPages = Math.ceil(total / this.perPage);

					return(users || []);
				})
			},
			// Add user to the database
			addUser(modal, table) {
				this.form.post(this.apiUrl)
					.then(() => {
						// Hide the modal
						modal.hide();

						// Refresh the table so the provider will kick off
						table.refresh();
					})
			},
			// Edit the current user selected
			editUser(modal, table, user) {
				this.form.put(`${this.apiUrl}/${user.id}`)
					.then(() => {
						// Hide the modal
						modal.hide();

						// Refresh the table so the provider will kick off
						table.refresh();
					});
			},
			// Delete the selected user
			deleteUser(table, id) {
				this.form.delete(`${this.apiUrl}/${id}`)
					.then(() => table.refresh());
			},
			// Clear / reset the form and fill it with data if need be
			modalOpen(context, data) {
				this.form.reset();
				this.form.clear();

				if(context === 'edit') {
					this.form.fill(data);
				}
			},
			// Sets the params based on the fields.
			setParams(ctx, params) {
				this.params = params;
			}
		}
	}
</script>