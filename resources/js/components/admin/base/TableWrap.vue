<template>
    <b-card>
        <template slot="header">
            <div class="row">
                <slot name="card-header"></slot>
            </div>
        </template>
        <slot name="table"></slot>
        <nav>
            <b-pagination :total-rows="getRowCount(tableData.items)" :per-page="tableData.perPage" v-model="tableData.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
    </b-card>
</template>

<script>

	export default {
		name: 'table-wrap',
		props: {
            tableData: {
				type: Object,
                default: {
                	items: [],
                    field: [],
                    currentPage: 1,
                    perPage: 5
                }
            }
		},
		data: () => {
			return {
				kids: "lol",
                totalRows: 0
			}
		},
		methods: {
			getRowCount (items) {
				return items.length
			}
		}
	}
</script>
