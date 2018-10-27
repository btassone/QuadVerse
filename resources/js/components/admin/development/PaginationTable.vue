<template>
    <div>
        <b-table
                striped="striped"
                :items="items"
                :fields="fields"
                :current-page="parsedPageId"
                :per-page="perPage"
                class="table-align-middle"
                responsive>
        </b-table>
        <b-pagination-nav
                base-url="./"
                use-router
                :number-of-pages="totalPages"
                :value="parsedPageId"
                prev-text="Prev"
                next-text="Next">
        </b-pagination-nav>
    </div>
</template>
<script>
    export default {
    	name: 'page-table',
	    props: {
		    pageId: {
			    type: String
		    }
	    },
	    data: () => {
		    return {
			    items: [],
			    fields: [
				    {key: "id"},
				    {key: "name"},
				    {key: "email"},
				    {key: "created_at"},
				    {key: "modify"}
			    ],
			    perPage: 5,
			    currentPage: 1
		    }
	    },
        computed: {
    	    parsedPageId() {
    	    	return parseInt(this.pageId);
            },
            totalPages() {
    	    	let totalPages = this.items.length / this.perPage;

    	    	return (totalPages > 0) ? totalPages : 1;
            }
        },
    	created() {
    		console.log("Pagination testing created");
        }
    }
</script>
