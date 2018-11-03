import { expect } from 'chai'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from "bootstrap-vue";
import bCard from 'bootstrap-vue/es/components/card/card';
import bTable from 'bootstrap-vue/es/components/table/table';
import VueRouter from 'vue-router'
import CrudTable from "../base/crud-table/CrudTable";

describe('CrudTable.vue', () => {
	const requiredData = {
		items: () => [],
		currentPage: 1,
		totalPages: 1,
		fields: []
	};

	let resourceNameProps = Object.assign({resourceName: "Users"}, requiredData);

	let localVue = createLocalVue();
	localVue.use(BootstrapVue);
	localVue.use(VueRouter);

	const wrapper = mount( CrudTable, { localVue, propsData: requiredData } );

	describe('Fields', () => {

		describe('Defaults', () => {

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

		});

	});

	describe('Card', () => {

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

		describe('Defaults', () => {

			it('the title in the header should equal the default', () => {
				wrapper.setProps({resourceName: "Resource"});

				expect(wrapper
					.find("#resource-title")
					.text().trim()
				).to.equal("Resource List");

			});

		});

	});

	describe('Table', () => {

		it('table exists', () => {
			expect(wrapper
				.find(bTable)
				.exists()
			).to.equal(true);
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