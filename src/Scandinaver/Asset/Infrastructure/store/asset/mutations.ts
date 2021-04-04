import { Mutations } from 'vuex-smart-module'
import Vue from 'vue'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import {} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

export default class AssetMutations extends Mutations<State> {
  setPersonal(data: Asset[]) {
    this.state.personal = data
  }

  addPersonal(asset: Asset) {
    this.state.personal.push(asset)
  }

  removePersonal(asset: Asset) {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.id,
    )
    this.state.personal.splice(index, 1)
  }

  setWords(data: Asset[]) {
    this.state.words = data
  }

  setSentences(data: Asset[]) {
    this.state.sentences = data
  }

  setFavourites(data: Asset) {
    this.state.personal.unshift(data)
  }

  patchPersonal(asset: Asset) {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.id,
    )
    const updatedAsset = this.state.personal[index]
    updatedAsset.title = asset.title
    updatedAsset.type = asset.type
    updatedAsset.level = asset.level
    updatedAsset.basic = asset.basic
    updatedAsset.count = asset.count
  }

  incrementPersonalCounter(asset: Asset) {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.id,
    )
    this.state.personal[index].count++
  }

  decrementPersonalCounter(asset: Asset) {
    const index = this.state.personal.findIndex(
      (item: any) => item.id === asset.getId(),
    )
    this.state.personal[index].count--
  }

  incrementFavouriteCounter(): void {
    this.state.personal[0].count++
  }

  decrementFavouriteCounter(): void {
    this.state.personal[0].count--
  }

  setActiveAssetId(id: number): void {
    this.state.activeAssetId = id
  }

  setActivePersonalAssetName(data: string): void {
    this.state.activePersonalAssetName = data
  }

  setActiveAssetType(data: number): void {
    this.state.activeAssetType = data
  }

  setActiveAssetEdit(data: boolean): void {
    this.state.activePersonalAssetEdit = data
  }
}
