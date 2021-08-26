import { Actions } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import AssetGetters from '@/Scandinaver/Asset/Infrastructure/store/asset/getters'
import AssetMutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations'
import * as mutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import * as actions from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'

export default class AssetActions extends Actions<
  State,
  AssetGetters,
  AssetMutations,
  AssetActions
> {
  [actions.SET_ASSET_AS_SELECTED](data: any): void {
    // this.commit(SET_SELECTION, data)
  }

  [actions.RESOLVE_AND_SET_ACTIVE_ASSET_TYPE](data: number): void {
    this.commit(mutations.SET_ACTIVE_ASSET_TYPE, data)
  }

  [actions.ON_CARDS_PAGE_CLOSE](): void {
    this.commit(mutations.SET_ACTIVE_PERSONAL_ASSET_EDIT, false)
  }

  [actions.ON_CARDS_PAGE_OPEN]() {

  }

  [actions.RESET_ACTIVE_ASSET](): void {
    this.commit(mutations.SET_ACTIVE_ASSET_ID, 0)
    this.commit(mutations.SET_ACTIVE_ASSET_TYPE, AssetType.WORDS)
  }
}
