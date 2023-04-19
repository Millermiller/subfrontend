import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import * as mutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

export default class AssetMutations extends Mutations<State> {
  [mutations.SET_PERSONAL](data: Asset[]): void {
    this.state.personal = data
  }

  [mutations.ADD_PERSONAL](asset: Asset): void {
    this.state.personal.push(asset)
  }

  [mutations.REMOVE_PERSONAL](asset: Asset): void {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.id,
    )
    this.state.personal.splice(index, 1)
  }

  [mutations.SET_WORDS](data: Asset[]): void {
    this.state.words = data
  }

  [mutations.SET_SENTENCES](data: Asset[]): void {
    this.state.sentences = data
  }

  [mutations.SET_FAVOURITES](data: Asset): void {
    this.state.personal.unshift(data)
  }

  [mutations.PATCH_PERSONAL](asset: Asset): void {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.id,
    )
    const updatedAsset = this.state.personal[index]
    updatedAsset.title = asset.title
    updatedAsset.category = asset.category
    updatedAsset.level = asset.level
    updatedAsset.basic = asset.basic
    updatedAsset.count = asset.count
  }

  [mutations.INCREMENT_PERSONAL_COUNTER](asset: Asset): void {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.id,
    )
    this.state.personal[index].count++
  }

  [mutations.DECREMENT_PERSONAL_COUNTER](asset: Asset): void {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.getId(),
    )
    this.state.personal[index].count--
  }

  [mutations.INCREMENT_FAVOURITE_COUNTER](): void {
    this.state.personal[0].count++
  }

  [mutations.DECREMENT_FAVOURITE_COUNTER](): void {
    this.state.personal[0].count--
  }

  [mutations.SET_ACTIVE_ASSET_ID](id: number): void {
    this.state.activeAssetId = id
  }

  [mutations.SET_ACTIVE_ASSET_TYPE](data: number): void {
    this.state.activeAssetType = data
  }

  [mutations.SET_ACTIVE_PERSONAL_ASSET_EDIT](data: boolean): void {
    this.state.activePersonalAssetEdit = data
  }

  [mutations.SET_RESET_ASSET_TYPE](data: boolean): void {
    this.state.resetAssetType = data
  }
}
