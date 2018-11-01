<template>
	<b-card>
		<template slot="header">
			<div class="row">
				<div class="d-flex col-4 align-items-center">
					<span><i class='fa' :class="resourceIcon"></i> {{resourceName}} List</span>
				</div>
				<div class="d-flex col-8 justify-content-end">
					<input @input="filterResults" placeholder="Search" class="search-input mr-2 form-control"/>
					<b-button variant="success" @click="openModal('add')">
						<i class="fa fa-plus"></i> Add {{resourceName}}
					</b-button>
				</div>
			</div>
		</template>
		<b-table ref="bTable" :items="items" :fields="fields" :filter="searchText" :current-page="currentPage"
				 :per-page="perPage" v-bind="options" empty-text="There are no records to show"
				 empty-filtered-text="There are no records matching your request" class="table-align-middle" stacked="md"
				 @refreshed="tableRefreshed" @context-changed="contextChanged" show-empty responsive striped>
			<template slot="modify" slot-scope="{ item }">
				<div class="d-flex align-items-center">
					<button class="btn btn-primary m-1" @click="openModal('edit', item)">
						<i class="fa fa-edit"></i>
					</button>
					<button class="btn btn-danger m-1" @click="openDeleteDialogModal('delete', item.id)">
						<i class="fa fa-trash"></i>
					</button>
				</div>
			</template>
		</b-table>
		<b-pagination-nav base-url="./" :number-of-pages="totalPages" :value="currentPage" prev-text="Prev" next-text="Next"
			ref="bPageNav" @input="navChanged" :disabled="disableNav" use-router>
		</b-pagination-nav>
		<b-modal ref="resourceModal" ok-variant="success" :ok-title="contextOkText" cancel-variant="danger" :title="contextTitle"
			centered @ok="contextItem">
			<slot name="modal-content"></slot>
		</b-modal>
	</b-card>
</template>
<script src="./CrudTable.js"></script>
<style scoped src="./CrudTable.css"></style>