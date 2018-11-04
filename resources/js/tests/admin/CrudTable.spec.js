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
import { paginatedResponseFactory } 		from "../../functions/factories/PaginatedResponseFactory";

// Generator functions
import { nameGenerator }					from "../../functions/generators/NameGenerator";
import { emailGenerator }					from "../../functions/generators/EmailGenerator";
import { rangeGenerator }					from "../../functions/generators/RangeGenerator";
import { dateGenerator }					from "../../functions/generators/DateGenerator";

// Tested component
import CrudTable 							from "../../components/admin/base/CrudTable";

// Map the generator function to the model type
let fieldTypeGeneratorMap = {
	range: rangeGenerator,
	name: nameGenerator,
	email: emailGenerator,
	date: dateGenerator
};

// Number of results to generate for our paginated data
let numOfResults = 100;

// The data items per pagination result
let resultsPerPage = 8;

// Key model map to the fields
let fieldKeyModelMap = [
	{ key: "id", model: { type: "range" } },
	{ key: "name", model: { type: "name" } },
	{ key: "email", model: { type: "email" } },
	{ key: "created_at", model: { type: "date" } }
];

// How to sort the response
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
		responses = paginatedResponseFactory(
			fieldTypeGeneratorMap,
			numOfResults,
			resultsPerPage,
			fieldKeyModelMap,
			responseSort
		);

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