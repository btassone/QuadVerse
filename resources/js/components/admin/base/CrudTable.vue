<template>
    <b-card>
        <!-- Header template for the b-card -->
        <template slot="header" :slot-scope="[resourceName, resourceIcon, crudData]">
            <div class="row">
                <div class="d-flex col-6 align-items-center">
                    <span>
                        <i class='fa' :class="resourceIcon"></i> {{resourceName}} List
                    </span>
                </div>
                <div class="d-flex col-6 justify-content-end">
                    <b-button variant="success" @click="crudData = addData(crudData)">
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
                :current-page="crudData.currentPage"
                :per-page="crudData.perPage"
                class="table-align-middle"
                responsive>
            <template slot="modify" slot-scope="{ item }">
                <div class="d-flex align-items-center">
                    <button class="btn btn-primary m-1" @click="editData(item)">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger m-1" @click="deleteData(item.id)">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </template>
        </b-table>
        <nav>
            <b-pagination :total-rows="getRowCount(crudData.items)" :per-page="crudData.perPage" v-model="crudData.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
    </b-card>
</template>
<script>
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
                default: {
                	items: [],
                    fields: [],
                    currentPage: 1,
                    perPage: 5
                }
            }
        },
		data: () => {
			return {
				totalRows: 0
			}
		},
        methods: {
	        addData(data) {
				data.items.push({ id: data.items.length+1, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "Edit / Delete" })

                return data;
            },
            editData(data) {
				console.log(data);
            },
	        deleteData(id) {
				console.log(id);
            },
	        getRowCount (items) {
		        return items.length
	        }
        }
	}
</script>