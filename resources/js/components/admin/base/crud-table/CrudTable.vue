<style scoped>
	.search-input {
		max-width: 300px;
	}
</style>
<template>
	<b-card>
		<template slot="header">
			<div class="row">
				<div class="d-flex col-4 align-items-center">
					<span>
						<i class='fa' :class="resourceIcon"></i> {{resourceName}} List
					</span>
				</div>
				<div class="d-flex col-8 justify-content-end">
					<input @input="filterResults" placeholder="Search" class="search-input mr-2 form-control"/>
					<b-button variant="success" @click="openModal('add')">
						<i class="fa fa-plus"></i> Add {{resourceName}}
					</b-button>
				</div>
			</div>
		</template>
		<b-table ref="bTable" :items="items" :fields="fields" :filter="searchText" :current-page="currentPage"
				 :per-page="perPage" v-bind="options" empty-text="There are no records to show"
				 empty-filtered-text="There are no records matching your request" class="table-align-middle" stacked="md"
				 @refreshed="tableRefreshed" @context-changed="contextChanged" show-empty responsive striped>
			<template slot="modify" slot-scope="{ item }">
				<div class="d-flex align-items-center">
					<button class="btn btn-primary m-1" @click="openModal('edit', item)">
						<i class="fa fa-edit"></i>
					</button>
					<button class="btn btn-danger m-1" @click="openDeleteDialogModal('delete', item.id)">
						<i class="fa fa-trash"></i>
					</button>
				</div>
			</template>
		</b-table>
		<b-pagination-nav base-url="./" :number-of-pages="totalPages" :value="currentPage" prev-text="Prev" next-text="Next"
			ref="bPageNav" @input="navChanged" use-router>
		</b-pagination-nav>
		<b-modal ref="resourceModal" ok-variant="success" :ok-title="contextOkText" cancel-variant="danger" :title="contextTitle"
			centered @ok="contextItem">
			<slot name="modal-content"></slot>
		</b-modal>
	</b-card>
</template>
<script>
	import swal                             from "sweetalert2";

	// Modal contexts and titles
	const MODAL_CONTEXTS = {
		add: { title: 'Add', btn: 'Add' },
		edit: { title: 'Edit', btn: 'Update' },
		delete: { title: 'Delete', btn: 'Delete' }
	};

	// Keys are the context keys mapped to the string to pass in the request
	const PAGINATION_PARAMS_MAP = {
		perPage: "pagination",
		currentPage: "page[number]",
		filter: "filter",
		sortBy: "sort[by]",
		sortDesc: "sort[desc]"
	};

	function getParamsString(param_map, value_map) {
		let out = "";
		let value_keys = Object.keys(value_map);

		// Loop over the key values
		value_keys.forEach((key, index) => {

			// If the value isn't undefined, null, or empty
			if(value_map[key] !== undefined && value_map[key] !== null && value_map[key] !== "") {

				// If first one, skip the &
				if(index !== 0)
					out += '&';

				// Add the param name and value with an = symbol in between
				out += `${param_map[key]}=${value_map[key]}`;
			}
		});

		// Return the param string
		return out;
	}

	function addFilterableColumns(params, fields, column_key = "filter_columns") {
		fields.forEach(field => {
			if(field.filterable) {
				params += `&${column_key}[]=${field.key}`;
			}
		});

		return params;
	}

	export default {
		name: 'crud-table',
		props: {
			items: {
				type: Function,
				required: true
			},
			currentPage: {
				type: Number,
				required: true
			},
			totalPages: {
				type: Number,
			},
			fields: {
				type: Array,
				required: true
			},
			options: {
				type: Object,
				default: {}
			},
			perPage: {
				type: Number,
				default: 5
			},
			resourceName: {
				type: String,
				default: 'Resource'
			},
			resourceIcon: {
				type: String,
				default: 'fa-align-justify'
			}
		},
		data: () => {
			return {
				context: 'add',
				modalDataSet: null,
				searchText: '',
				searchTimeout: null,
				searchTimeoutLength: 500
			}
		},
		created() {
			// Inject the modify field so its always there
			this.fields.push({ key: "modify", thStyle: { width: "1px" } });

			this.contextChanged({
				perPage: this.perPage,
				currentPage: this.currentPage,
				filter: '',
				sortBy: this.options.sortBy,
				sortDesc: this.options.sortDesc
			});
		},
		computed: {
			// Get the modal title based on the context and resource name
			contextTitle() {
				return `${MODAL_CONTEXTS[this.context].title} ${this.resourceName}`;
			},
			// Get the ok modal button title based on the context btn text
			contextOkText() {
				return MODAL_CONTEXTS[this.context].btn;
			}
		},
		methods: {
			// Setup the context for each action
			setupContext(context, data) {
				// Set the current data
				this.modalDataSet = data;

				// Change the context
				this.context = context;
			},
			// Open the modal for the add and edit contexts
			openModal(context, data) {
				this.setupContext(context, data);

				// Show the modal
				this.$refs.resourceModal.show();

				// Emit the modal-open event
				this.$emit('modal-open', this.context, this.modalDataSet);
			},
			// Open the delete dialog modal (yes, no)
			openDeleteDialogModal(context, data) {
				// Setup the context for the CRUD events
				this.setupContext(context, data);

				// Fire the context associated event
				this.contextItem();
			},
			// Switch the context according to what is set and fire the action with the data
			contextItem(evt) {
				switch(this.context) {
					case 'add':
						this.addItem(evt);
						break;
					case 'edit':
						this.editItem(evt);
						break;
					case 'delete':
						this.deleteItem();
						break;
				}
			},
			// Generate an add-item custom event
			addItem(evt) {
				evt.preventDefault();

				// Emit the event
				this.$emit('add-item', this.$refs.resourceModal, this.$refs.bTable);
			},
			// Generate an edit-item custom event
			editItem(evt) {
				evt.preventDefault();

				this.$emit('edit-item', this.$refs.resourceModal, this.$refs.bTable, this.modalDataSet);
			},
			// Generate an delete-item custom event
			deleteItem() {
				swal({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
					if(result.value) {
						this.$emit('delete-item', this.$refs.bTable, this.modalDataSet);
					}
				});
			},
			// The table has been refreshed when it has emit an event
			tableRefreshed() {
				this.$emit("table-refreshed", this.$refs.bTable);
			},
			// The navigation has changed, emit a custom event and fix buggy nav
			navChanged(page) {
				// Original value is string
				let pageId = parseInt(this.$route.params.pageId);

				/**
				 * If the total pages are less than the page route URL or the pageId is 0
				 * we need to trigger a route change replace.
				 *
				 * The if else wrap is to prevent infinite loops
				 */
				if(this.totalPages < pageId || pageId <= 0) {
					let newPageId = (pageId <= 0) ? 1 : this.totalPages;

					console.log(`Total Pages: ${this.totalPages}`, `PageID: ${pageId}`);

					let goToLastOrFirst = {
						name: this.$route.name,
						params: { pageId: newPageId }
					};

					this.$router.replace(goToLastOrFirst);

				/**
				 * Set the current page on the nav to whatever the pageId is. This is needed because
				 * in some scenarios the nav jumps ahead of the actual table page and breaks the nav
				 */
				} else {
					console.log(`PageID: ${pageId}`);
					this.$refs.bPageNav.currentPage = pageId;
				}

				// Emit custom event in case anything needs to be done on nav change
				this.$emit("table-nav-changed", page, this.$refs.bPageNav);
			},
			// Filter the search results
			filterResults(evt) {
				let value = evt.target.value.trim();

				clearTimeout(this.searchTimeout);

				this.searchTimeout = setTimeout(() => {
					this.searchText = value;
				}, this.searchTimeoutLength);
			},
			// Set the url parameters prior to data grab
			contextChanged(ctx) {
				let params = getParamsString(PAGINATION_PARAMS_MAP, ctx);
				params = addFilterableColumns(params, this.fields);

				this.$emit('table-context-changed', ctx, params);
			}
		}
	}
</script>