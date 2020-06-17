import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@/Scandinaver/Dashboard/dashboard.module.vue';

describe('dashboard.module.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Home, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
