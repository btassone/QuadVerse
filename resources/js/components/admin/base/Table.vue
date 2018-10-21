<template>
    <b-card>
        <template slot="header">
            <slot name="table-header"></slot>
        </template>
        <b-table
                :hover="tableStyles.indexOf('hover') !== -1"
                :striped="tableStyles.indexOf('striped') !== -1"
                :bordered="tableStyles.indexOf('bordered') !== -1"
                :small="tableStyles.indexOf('small') !== -1"
                :fixed="tableStyles.indexOf('fixed') !== -1"
                :responsive="responsive"
                :items="tableData.items"
                :fields="tableData.fields"
                :current-page="tableData.currentPage"
                :per-page="tableData.perPage"
                :class="{'text-nowrap': textNoWrap}">
        </b-table>
        <nav>
            <b-pagination :total-rows="getRowCount(tableData.items)" :per-page="tableData.perPage" v-model="tableData.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
    </b-card>
</template>

<script>
	export default {
		name: 'c-table',
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
            responsive: {
			    type: String | Boolean,
                default: true
            },
			fixed: {
				type: Boolean,
				default: false
			},
            tableData: {
				type: Object,
                default: {},
                required: true
            },
            tableStyles: {
				type: Array
            },
            textNoWrap: {
				type: Boolean,
                default: true
            }
		},
		data: () => {
			return {
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
