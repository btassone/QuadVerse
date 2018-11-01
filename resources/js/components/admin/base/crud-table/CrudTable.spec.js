import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from "bootstrap-vue";
import CrudTable from "./CrudTable";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CrudTable.vue', () => {
	it('CrudTable set up correctly', () => {
		const wrapper = shallowMount(CrudTable, {
			localVue,
			propsData: {
				items: () => [],
				currentPage: 1,
				totalPages: 1,
				fields: []
			}
		});
	})
});