import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from "bootstrap-vue";
import VueRouter from 'vue-router'
import CrudTable from "./CrudTable.vue";

describe('CrudTable.vue', () => {
	const defaultPropsData = { items: () => [], currentPage: 1, totalPages: 1, fields: [] };
	let localVue = {};

	beforeEach(() => {
		localVue = createLocalVue();
		localVue.use(BootstrapVue);
		localVue.use(VueRouter);
	});

	describe('Fields', () => {
		it('empty prop array passed should still contain modify field', () => {
			const wrapper = shallowMount( CrudTable, { localVue, propsData: defaultPropsData } );

			expect(wrapper.vm.fields.length).to.equal(1);
		});

		it('empty prop array passed field that is injected should have key named modify', () => {
			const wrapper = shallowMount( CrudTable, { localVue, propsData: defaultPropsData } );

			expect(wrapper.vm.fields[0].key).to.equal("modify");
		});
	});
});