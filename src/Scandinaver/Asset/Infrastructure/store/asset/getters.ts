import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import * as getters from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'

export default class AssetGetters extends Getters<State> {
  get [getters.ACTIVE_ASSET_TYPE](): string {
    return this.state.activeAssetType.toString()
  }

  get [getters.COMPLETED_WORDS_ASSETS_COUNT](): number {
    return this.state.words.filter((asset: Asset) => asset.completed === true).length
  }

  get [getters.COMPLETED_SENTENCES_ASSETS_COUNT](): number {
    return this.state.sentences.filter((asset: Asset) => asset.completed === true).length
  }

  public [getters.GET_ASSETS_BY_LEVEL_AND_TYPE](level: number, type: AssetType): Asset {
    const previousLevel = level - 1
    if (type === AssetType.WORDS) {
      return this.state.words.find((asset: Asset) => asset.level === previousLevel)
    }

    return this.state.sentences.find((asset: Asset) => asset.level === previousLevel)
  }

  get [getters.WORD_ASSETS](): Asset[] {
    return this.state.words
  }

  get [getters.SENTENCE_ASSETS](): Asset[] {
    return this.state.sentences
  }

  get [getters.PERSONAL_ASSETS](): Asset[] {
    return this.state.personal
  }

  get [getters.ACTIVE_PERSONAL_ASSET_CARDS](): Card[] | null {
    if (
      typeof this.state.personal[this.state.activePersonalAssetIndex]
      !== 'undefined'
    ) {
      return this.state.personal[this.state.activePersonalAssetIndex].cards.all()
    }
    return null
  }

  get [getters.FAVOURITE_ASSET](): Asset {
    return this.state.personal[0]
  }

  get [getters.ACTIVE_ASSET_ID](): number {
    return this.state.activeAssetId;
  }

  get [getters.NEED_RESET_ASSET_TYPE](): boolean {
    return this.state.resetAssetType;
  }
}
