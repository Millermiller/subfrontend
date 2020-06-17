import { Actions } from 'vuex-smart-module'
import request from '@/utils/request'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import AssetGetters from '@/Scandinaver/Asset/Infrastructure/store/asset/getters'
import AssetMutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations'
import { RELOAD_PERSONAL_ASSETS } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import {
  SET_ACTIVE_ASSET_TYPE,
  SET_ACTIVE_PERSONAL_ASSET_EDIT,
  SET_PERSONAL,
  SET_SELECTION,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'

export default class AssetActions extends Actions<
  State,
  AssetGetters,
  AssetMutations,
  AssetActions
> {
  addPersonalAsset(title: string) {
    return new Promise((resolve, reject) => {
      request.post('/asset', { title }).then(
        (response: any) => {
          if (response.status === 201) {
            this.dispatch(RELOAD_PERSONAL_ASSETS)
            this.commit(SET_SELECTION, 1)
            resolve(response)
          }
        },
        (response: any) => {
          console.log(response.data)
          reject()
        },
      )
    })
  }

  reload_personal_assets() {
    return new Promise((resolve, reject) => {
      request.get('/personal').then(
        (response: any) => {
          this.commit(SET_PERSONAL, response.data)
          resolve(response)
        },
        (response: any) => {
          console.log(response.data)
          reject()
        },
      )
    })
  }

  loadAsset(data: any) {
    this.commit(SET_SELECTION, data)
  }

  setActiveAssetType(data: number) {
    let type = ''

    if (data === 1) type = 'words'
    else if (data === 2) type = 'sentences'
    else type = 'personal'

    this.commit(SET_ACTIVE_ASSET_TYPE, type)
  }

  onCardsPageClose() {
    this.commit(SET_SELECTION, 1)
    this.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, false)
  }

  onCardsPageOpen() {
    const asset = { type: 3 }
    if (!this.state.activePersonalAssetEdit) {
      this.commit(SET_SELECTION, this.getters.favouriteAsset.id)
    }
  }
}
