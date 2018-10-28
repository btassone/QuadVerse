<template>
    <b-card>
        <template slot="header">
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
                ref="bTable"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                class="table-align-middle"
                stacked="md"
                @refreshed="tableRefreshed"
                responsive
                striped
                v-bind="options">
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
        <b-pagination-nav
                base-url="./"
                :number-of-pages="totalPages"
                :value="currentPage"
                prev-text="Prev"
                next-text="Next"
                ref="bPageNav"
                @input="navChanged"
                use-router>
        </b-pagination-nav>
        <b-modal
                ref="resourceModal"
                ok-variant="success"
                :ok-title="contextOkText"
                cancel-variant="danger"
                :title="contextTitle"
                centered
                @ok="contextItem">
            <slot name="modal-content"></slot>
        </b-modal>
    </b-card>
</template>
<script>
	import swal from "sweetalert2";

    // Modal contexts and titles
    const MODAL_CONTEXTS = {
    	add: { title: 'Add', btn: 'Add' },
        edit: { title: 'Edit', btn: 'Update' },
        delete: { title: 'Delete', btn: 'Delete' }
    };

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
		        required: true
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
                modalDataSet: null
			}
		},
        created() {
			// Inject the modify field so its always there
		    this.fields.push({ key: "modify", thStyle: { width: "1px" } });
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

				this.$emit('modal-open', this.context, this.modalDataSet);
            },
            // Open the delete dialog modal (yes, no)
            openDeleteDialogModal(context, data) {
	            this.setupContext(context, data);

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
		        /**
                 * Set the current page on the nav to whatever the pageId is. This is needed because
                 * in some scenarios the nav jumps ahead of the actual table page and breaks the nav
		         */
				this.$refs.bPageNav.currentPage = parseInt(this.$route.params.pageId);

		        // Emit custom event in case anything needs to be done on nav change
				this.$emit("table-nav-changed", page, this.$refs.bPageNav);
            }
        }
	}
</script>