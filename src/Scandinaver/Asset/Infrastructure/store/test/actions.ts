import { Actions, Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/test/state'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import TestGetters from '@/Scandinaver/Asset/Infrastructure/store/test/getters'
import TestMutations from '@/Scandinaver/Asset/Infrastructure/store/test/mutations'

export default class TestActions extends Actions<State, TestGetters, TestMutations, TestActions> {
  resetTest(test: Test) {
    this.commit('setQuantity', test.quantity)
    this.commit('resetError')
    this.commit('resetPercent')
    this.commit('setTitle', test.asset.title)
    this.commit('setResult', test.asset.result)
    this.commit('setLevel', test.asset.level)
  }
}
