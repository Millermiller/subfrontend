import { Getters } from 'vuex-smart-module'
import { Card } from 'element-ui'
import State from '@/store/modules/asset/state'
import { Word } from '@/models/Word'
import { Asset } from '@/models/Asset'
import ISentence from '@/models/Sentence'

export default class AssetGetters extends Getters<State> {
  get activeAssetType() {
    return this.state.activeAssetType !== '' ? this.state.activeAssetType : 'words'
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
