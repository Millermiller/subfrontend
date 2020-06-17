import { Module } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import AssetMutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations'
import AssetGetters from '@/Scandinaver/Asset/Infrastructure/store/asset/getters'
import AssetActions from '@/Scandinaver/Asset/Infrastructure/store/asset/actions'

export const assetModule = new Module({
  namespaced: false,
  state: State,
  getters: AssetGetters,
  mutations: AssetMutations,
  actions: AssetActions,
})
