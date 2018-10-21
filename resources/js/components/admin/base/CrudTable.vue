<template>
    <table-wrap :table-data="crudData">
        <!-- Header template for the b-card -->
        <template slot="card-header" :slot-scope="[resourceName, resourceIcon, crudData]">
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
        </template>
        <template slot="table">
            <b-table
                    striped
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
        </template>
    </table-wrap>
</template>
<script>
    import tableWrap from "./TableWrap";

	export default {
		name: 'crud-table',
		components: {
			tableWrap
		},
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
            }
        },
		data: () => {
			return {
				crudData: {
					items: [
						{ id: 1, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 2, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 3, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 4, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 5, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 6, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 7, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 8, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" },
						{ id: 9, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", modify: "" }
					],
					fields: [
						{key: "id"},
						{key: "name"},
						{key: "email"},
						{key: "created_at"},
						{key: "modify"}
					],
					currentPage: 1,
					perPage: 5
                },
                otherData: "some other data"
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
            }
        }
	}
</script>