<template>
    <div class="animated fadeIn">
        <h1 class="mb-3">Manage Users</h1>
        <b-row>
            <b-col lg="12">
                <crud-table resource-icon="fa-users" resource-name="Users"></crud-table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import crudTable from "../base/CrudTable";

	export default {
		components: {
			crudTable
		},
        data: () => {
		    return {
            }
        },
		methods: {
        }
	}
</script>