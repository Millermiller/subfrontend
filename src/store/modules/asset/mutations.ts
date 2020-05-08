import { Mutations } from 'vuex-smart-module'
import Vue from 'vue'
import State from '@/store/modules/asset/state'
import { Word } from '@/models/Word'
import ISentence from '@/models/Sentence'
import { IPersonal } from '@/models/Personal'
import { Card } from '@/models/Card'
import { Asset } from '@/models/Asset'

export default class AssetMutations extends Mutations<State> {
  setPersonal(data: IPersonal[]) {
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

  removePersonal(id: number) {
    this.state.personal.splice(id, 1)
  }

  addPersonal(asset: IPersonal) {
    this.state.personal.push(asset)
  }

  /**
   *
   * @param data
   * @param data.index
   * @param data.asset
   */
  patchPersonal(data: any) {
    this.state.personal[data.index] = data.asset
  }

  /**
   *
   * @param card
   * @param card.id
   * @param card.asset_id
   */
  removeCard(card: Card) {
    const index = this.state.personal.findIndex((item: any) => item.id === card.asset_id)
    this.state.personal[index].count--
  }

  addCardToFavorite(): void {
    this.state.personal[0].count++
  }

  removeCardFromFavorite(): void {
    this.state.personal[0].count--
  }

  /**
   * @param asset_id
   */
  addCard(asset_id: number) {
    const index = this.state.personal.findIndex((item: any) => item.id === asset_id)
    this.state.personal[index].count++
  }

  setSelection(assetId: number) {
    this.state.personal.forEach((element: IPersonal, index: number, array: IPersonal[]) => {
      Vue.set(element, 'selected', element.id === assetId)
    })
    this.state.sentences.forEach((element: ISentence, index: number, array: ISentence[]) => {
      Vue.set(element, 'selected', element.id === assetId)
    })
    this.state.words.forEach((element: Word, index: number, array: Word[]) => {
      Vue.set(element, 'selected', element.id === assetId)
    })

    if (assetId >= 0) {
      // Vue.set(this.state.assets.personal[assetId], 'selected', true)
      this.state.activePersonalAsset = assetId
      // this.state.activePersonalAssetName = this.state.assets.personal[assetId].title
      // this.state.activePersonalAssetIndex = assetId
    }
  }

  setActivePersonalAssetName(data: string): void {
    this.state.activePersonalAssetName = data
  }

  setActiveAssetType(data: string): void {
    this.state.activeAssetType = data
  }

  setActiveAssetEdit(data: boolean): void {
    this.state.activePersonalAssetEdit = data
  }
}
