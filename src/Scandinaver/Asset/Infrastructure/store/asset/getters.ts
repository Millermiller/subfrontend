import { Getters } from 'vuex-smart-module'
import { Card } from 'element-ui'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default class AssetGetters extends Getters<State> {
  get activeAssetType(): string {
    return this.state.activeAssetType.toString()
  }

  get activeAssetName() {
    return this.state.activePersonalAssetName !== '' ? this.state.activePersonalAssetName : ''
  }

  get activePersonalAssetEdit() {
    return this.state.activePersonalAssetEdit
  }

  get activeWords() {
    let count = 0

    this.state.words.forEach((element: Word, index: number, array: Word[]) => {
      if (element.active) count++
    })

    return count
  }

  get activeSentences() {
    let count = 0

    this.state.sentences.forEach((element: ISentence, index: number, array: ISentence[]) => {
      if (element.active) count++
    })

    return count
  }

  get words() {
    return this.state.words
  }

  get sentences() {
    return this.state.sentences
  }

  get personal() {
    return this.state.personal
  }

  get cards(): Card[] | null {
    if (typeof this.state.personal[this.state.activePersonalAssetIndex] !== 'undefined') {
      return this.state.personal[this.state.activePersonalAssetIndex].cards
    }
    return null
  }

  get activeAsset() {
    return this.state.activePersonalAsset
  }

  get favouriteAsset(): Asset {
    return this.state.favourites
  }
}
