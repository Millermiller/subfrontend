import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'

export default class State {
  words: Word[] = []
  sentences: ISentence[] = []
  favourites: Asset = new Asset()
  personal: any[] = []
  activePersonalAsset: number = 0
  activePersonalAssetIndex: number = 0
  activePersonalAssetName: string = ''
  activePersonalAssetEdit: boolean = false
  activeAssetType: string = ''
}
