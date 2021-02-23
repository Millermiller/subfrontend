import { Actions } from 'vuex-smart-module'
import request from '@/utils/request'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import AssetGetters from '@/Scandinaver/Asset/Infrastructure/store/asset/getters'
import AssetMutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations'
import { RELOAD_PERSONAL_ASSETS } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import {
  SET_ACTIVE_ASSET_ID,
  SET_ACTIVE_ASSET_TYPE,
  SET_ACTIVE_PERSONAL_ASSET_EDIT,
  SET_PERSONAL,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { plainToClass } from 'class-transformer'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { AxiosResponse } from 'axios'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

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
            // this.commit(SET_SELECTION, 1)
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
      request
        .get<Asset[], AxiosResponse<Asset[]>>('/personal')
        .then(async (response: AxiosResponse<Asset[]>) => {
          this.commit(
            SET_PERSONAL,
            await plainToClass<Asset, Asset>(Asset, response.data),
          )
          resolve(response)
        })
    })
  }

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
