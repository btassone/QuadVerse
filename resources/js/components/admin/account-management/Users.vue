<template>
    <div class="animated fadeIn">
        <h1 class="mb-3">Manage Users</h1>
        <b-row>
            <b-col lg="12">
                <crud-table :crud-data="userTable">
                </crud-table>
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
                userTable: {
                	items: [
		                { id: 1, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 2, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 3, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 4, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 5, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 6, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 7, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 8, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" },
		                { id: 9, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018", status: "Active" }
                    ],
                    fields: [
                        {key: "id"},
                        {key: "name"},
                        {key: "email"},
                        {key: "created_at"},
                        {key: "status"}
                    ],
                    currentPage: 1,
                    perPage: 20,
                }
            }
        },
		created() {

		},
		mounted() {

		}
	}
</script>