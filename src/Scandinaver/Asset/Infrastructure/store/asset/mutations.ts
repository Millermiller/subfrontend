import { Mutations } from 'vuex-smart-module'
import Vue from 'vue'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import {
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

export default class AssetMutations extends Mutations<State> {
  setPersonal(data: Asset[]) {
    this.state.personal = data
  }

  setWords(data: Word[]) {
    this.state.words = data
  }

  setSentences(data: ISentence[]) {
    this.state.sentences = data
  }

  setFavourites(data: any) {
    this.state.favourites = data
  }

  patchPersonal(asset: Asset) {
    const index = this.state.personal.findIndex((item: any) => item.id === asset.id)
    this.state.personal[index] = asset
  }

  incrementPersonalCounter(card: Card) {
    const index = this.state.personal.findIndex((item: any) => item.id === card.asset.id)
    this.state.personal[index].count++
  }

  decrementPersonalCounter(asset: Asset) {
    const index = this.state.personal.findIndex((item: any) => item.id === asset.getId())
    this.state.personal[index].count--
  }

  incrementFavouriteCounter(): void {
    this.state.personal[0].count++
  }

  decrementFavouriteCounter(): void {
    this.state.personal[0].count--
  }

  setSelection(asset: Asset) {
    this.state.personal.forEach((element: Asset, index: number, array: Asset[]) => {
      Vue.set(element, 'selected', element.id === asset.id)
    })
    this.state.sentences.forEach((element: ISentence, index: number, array: ISentence[]) => {
      Vue.set(element, 'selected', element.id === asset.id)
    })
    this.state.words.forEach((element: Word, index: number, array: Word[]) => {
      Vue.set(element, 'selected', element.id === asset.id)
    })

    if (asset.id >= 0) {
      // Vue.set(this.state.assets.personal[assetId], 'selected', true)
      this.state.activePersonalAsset = asset
      // this.state.activePersonalAssetName = this.state.assets.personal[assetId].title
      // this.state.activePersonalAssetIndex = assetId
    }
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
