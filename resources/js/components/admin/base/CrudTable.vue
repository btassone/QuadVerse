<template>
    <b-card>
        <!-- Header template for the b-card -->
        <template slot="header" :slot-scope="[resourceName, resourceIcon]">
            <div class="row">
                <div class="d-flex col-6 align-items-center">
                    <span>
                        <i class='fa' :class="resourceIcon"></i> {{resourceName}} List
                    </span>
                </div>
                <div class="d-flex col-6 justify-content-end">
                    <b-button variant="success" @click="openModal('add')">
                        <i class="fa fa-plus"></i> Add {{resourceName}}
                    </b-button>
                </div>
            </div>
        </template>
        <b-table
                :striped="striped"
                :bordered="bordered"
                :small="small"
                :hover="hover"
                :fixed="fixed"
                :items="crudData.items"
                :fields="crudData.fields"
                :current-page="currentPage"
                :per-page="perPage"
                class="table-align-middle"
                responsive>
            <template slot="modify" slot-scope="{ item }">
                <div class="d-flex align-items-center">
                    <button class="btn btn-primary m-1" @click="editItem(item)">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger m-1" @click="deleteItem(item.id)">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </template>
        </b-table>
        <nav>
            <b-pagination-nav base-url="#" :number-of-pages="getPageCount(crudData.items, perPage)" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
        <b-modal
                ref="addResourceModal"
                ok-variant="success"
                :ok-title="contextOkText"
                cancel-variant="danger"
                :title="contextTitle"
                @ok="addItem(crudData.items)">
            Hello From My Modal!
        </b-modal>
    </b-card>
</template>
<script>
    // Modal contexts and titles
    const MODAL_CONTEXTS = {
    	add: { title: 'Add', btn: 'Add' },
        edit: { title: 'Edit', btn: 'Update' },
        delete: { title: 'Delete', btn: 'Delete' }
    };

	export default {
		name: 'crud-table',
        props: {
	        hover: {
		        type: Boolean,
		        default: false
	        },
	        striped: {
		        type: Boolean,
		        default: false
	        },
	        bordered: {
		        type: Boolean,
		        default: false
	        },
	        small: {
		        type: Boolean,
		        default: false
	        },
	        fixed: {
		        type: Boolean,
		        default: false
	        },
		    resourceName: {
			    type: String,
			    default: 'Resource'
		    },
            resourceIcon: {
		    	type: String,
                default: 'fa-align-justify'
            },
            crudData: {
	        	type: Object,
                default: {}
            },
            perPage: {
	        	type: Number,
                default: 5
            }
        },
		data: () => {
			return {
				totalRows: 0,
                currentPage: 1,
                context: 'add'
			}
		},
        created() {
			// Inject the modify field so its always there
		    this.crudData.fields.push({key: "modify"});

		    // Set the navigation / url to the correct page for history
		    this.setPage();
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
			openModal(context) {
				// Show the modal
				this.$refs.addResourceModal.show();

				// Change the context
				this.context = context;
            },
			// Generate an add-item custom event
	        addItem(items) {
	        	// Emit the event
				this.$emit('add-item', items);
            },
	        // Generate an edit-item custom event
            editItem(item) {
	            this.$emit('edit-item', item);
            },
	        // Generate an delete-item custom event
	        deleteItem(id) {
				this.$emit('delete-item', id);
            },
            // Get the page count
	        getPageCount (items, perPage) {
		        return Math.ceil(items.length / perPage)
	        },
            // Set the current page in the url on load
	        setPage() {
		        let pageNum = parseInt(this.$route.hash.substr(1));

		        if(pageNum) {
			        this.currentPage = pageNum;
		        }
            }
        }
	}
</script>