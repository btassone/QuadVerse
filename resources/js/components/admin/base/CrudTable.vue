<template>
    <c-table :table-styles="crudTableStyles" :table-data="crudData">
        <template slot="table-header">
            <div class="d-flex align-items-center justify-content-between">
                <span>
                    <i class="fa" :class="icon"></i>&nbsp;{{crudName}} List
                </span>
                <b-button variant="success">
                    <i class="fa fa-plus"></i>&nbsp;Add {{crudName}}
                </b-button>
            </div>
        </template>
    </c-table>
</template>
<script>
	import cTable from "./Table";

	export default {
		components: {
			cTable
		},
        props: {
	        icon: {
		        type: String,
		        default: 'fa-users'
	        },
            crudName: {
	        	type: String,
                default: 'Users'
            },
            crudTableStyles: {
	            type: Array,
                default: () => ['striped']
            },
	        crudData: {
		        type: Object,
		        default: {},
		        required: true
	        }
        },
        data: () => {
		    return {

            }
        },
		beforeCreate() {

		},
		created() {

		},
		mounted() {

		}
	}
</script>