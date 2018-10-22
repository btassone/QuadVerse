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
					    { id: 1, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 2, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 3, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 4, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 5, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 6, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 7, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 8, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" },
					    { id: 9, name: "Brandon Tassone", email: "brandontassone@gmail.com", created_at: "July 28, 2018" }
				    ],
				    fields: [
					    {key: "id"},
					    {key: "name"},
					    {key: "email"},
					    {key: "created_at"}
				    ]
			    }
            }
        }
	}
</script>