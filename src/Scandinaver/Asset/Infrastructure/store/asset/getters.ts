import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/asset/state'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { Card } from '@/Scandinaver/Asset/Domain/Card'

export default class AssetGetters extends Getters<State> {
  get activeAssetType(): string {
    return this.state.activeAssetType.toString()
  }

  get activeAssetName() {
    return this.state.activePersonalAssetName !== ''
      ? this.state.activePersonalAssetName
      : ''
  }

  get activePersonalAssetEdit() {
    return this.state.activePersonalAssetEdit
  }

  get activeWords() {
    let count = 0

    this.state.words.forEach((element: Asset, index: number, array: Asset[]) => {
      if (element.active) count++
    })

    return count
  }

  get activeSentences() {
    let count = 0

    this.state.sentences.forEach(
      (element: ISentence, index: number, array: ISentence[]) => {
        if (element.active) count++
      },
    )

    return count
  }

  get words() {
    return this.state.words
  }

  get sentences() {
    return this.state.sentences
  }

  get personal(): Asset[] {
    return this.state.personal
  }

  get cards(): Card[] | null {
    if (
      typeof this.state.personal[this.state.activePersonalAssetIndex]
      !== 'undefined'
    ) {
      return this.state.personal[this.state.activePersonalAssetIndex].cards.all()
    }
    return null
  }

  getPersonalAssetById(id: number) {
    return this.personal.find(item => item.id === id)
  }

  get favouriteAsset(): Asset {
    return this.state.personal[0]
  }

  get activeAssetId(): number {
    return this.state.activeAssetId;
  }
}
