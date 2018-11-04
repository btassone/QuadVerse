// Test framework imports
import { shallowMount }						from '@vue/test-utils';
import { mount }							from '@vue/test-utils';
import { createLocalVue }					from '@vue/test-utils';
import { expect } 							from 'chai'

// Child components
import BootstrapVue 						from "bootstrap-vue";
import bCard 								from 'bootstrap-vue/es/components/card/card';
import bTable 								from 'bootstrap-vue/es/components/table/table';
import VueRouter 							from 'vue-router'

// Data factories for testing
import { paginatedResponseFactory } 		from "../../functions/utilities/TestUtilities";

// Tested component
import CrudTable 							from "../../components/admin/base/CrudTable";

// Models
let id = {
	key: "id",
	model: {
		type: "range"
	}
};
let name = {
	key: "name",
	model: {
		type: "name"
	}
};

let email = {
	key: "email",
	model: {
		type: "email"
	}
};

let created_at = {
	key: "created_at",
	model: {
		type: "date"
	}
};

let numOfResults = 100;
let resultsPerPage = 8;
let dataModels = [id, name, email, created_at];
let responseSort = { by: "id", desc: false };

function loadData(page) {
	let promise = new Promise( resolve => setTimeout( () => resolve(page), 1000) );

	return promise.then(data => {
		let users = data.data;

		return(users || []);
	});
}

describe('CrudTable.vue', () => {
	let requiredData;
	let localVue;
	let wrapper;
	let responses;

	before(() => {
		// CrudTable Setup
		requiredData = {
			items: () => [],
			currentPage: 1,
			totalPages: 1,
			fields: []
		};

		// Get random response data before tests.
		responses = paginatedResponseFactory(numOfResults, resultsPerPage, dataModels, responseSort);

		localVue = createLocalVue();
		localVue.use(BootstrapVue);
		localVue.use(VueRouter);

		wrapper = mount( CrudTable, { localVue, propsData: requiredData } );
	});

	describe('Props', () => {

		describe('Defaults', () => {

			describe('Fields', () => {

				it('empty prop array passed should still contain modify field', () => {

					expect(wrapper
						.vm
						.fields
						.length
					).to.equal(1);

				});

				it('empty prop array passed field that is injected should have key named modify', () => {
					expect(wrapper
						.vm
						.fields[0]
						.key
					).to.equal("modify");

				});

			})

		});

	});

	describe('Bootstrap', () => {

		describe('Card', () => {

			describe('Defaults', () => {

				it('the title in the header should equal the default', () => {
					wrapper.setProps({resourceName: "Resource"});

					expect(wrapper
						.find("#resource-title")
						.text().trim()
					).to.equal("Resource List");

				});

			});

			describe('General', () => {

				it('card exists', () => {

					expect(wrapper
						.find(bCard)
						.exists()
					).to.equal(true);

				});

				it('the title in the header should be ${resource} list', () => {
					wrapper.setProps({resourceName: "Users"});

					expect(wrapper
						.find("#users-title")
						.text().trim()
					).to.equal("Users List");

				});

			});

		});

		describe('Table', () => {

			describe('General', () => {

				it('table exists', () => {
					expect(wrapper
						.find(bTable)
						.exists()
					).to.equal(true);
				});

			});

			describe('Events', () => {

				it('table refreshed contains table reference on event and correct id', () => {
					wrapper.setProps({resourceName: "Users"});
					wrapper.vm.$emit('refreshed');

					expect(wrapper
						.emitted('table-refreshed')[0][0]
						.id
					).to.equal("users-table")
				});

			});

		});

	});

});