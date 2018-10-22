<template>
    <div class="animated fadeIn">
        <h1 class="mb-3">Manage Users</h1>
        <b-row>
            <b-col lg="12">
                <crud-table :crud-data="userData" resource-icon="fa-users" resource-name="Users" striped></crud-table>
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
			    userData: {
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
			    }
            }
        }
	}
</script>