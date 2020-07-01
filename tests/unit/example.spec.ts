import 'reflect-metadata'
import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Home from '@/Scandinaver/Dashboard/dashboard.module.vue';
import { createStore } from 'vuex-smart-module'
import { root } from '@/Scandinaver/Core/Infrastructure/store/root'

describe('dashboard.module.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      // toggleDevice: jest.fn()
    }
    store = createStore(root)
  })

  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Home, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
})
