import { Actions } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import AssetGetters from '@/Scandinaver/Asset/Infrastructure/store/asset/getters'
import AssetMutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations'
import {
  SET_ACTIVE_ASSET_ID,
  SET_ACTIVE_ASSET_TYPE,
  SET_ACTIVE_PERSONAL_ASSET_EDIT,
  SET_PERSONAL,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default class AssetActions extends Actions<
  State,
  AssetGetters,
  AssetMutations,
  AssetActions
> {
  loadAsset(data: any) {
    // this.commit(SET_SELECTION, data)
  }

  setActiveAssetType(data: number) {
    this.commit(SET_ACTIVE_ASSET_TYPE, data)
  }

  onCardsPageClose() {
    this.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, false)
  }

  onCardsPageOpen() {

  }

  resetActiveAsset() {
    this.commit(SET_ACTIVE_ASSET_ID, 0)
    this.commit(SET_ACTIVE_ASSET_TYPE, AssetType.WORDS)
  }
}
