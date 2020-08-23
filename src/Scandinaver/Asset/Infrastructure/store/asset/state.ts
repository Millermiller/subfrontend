import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default class State {
  words: Word[] = []
  sentences: ISentence[] = []
  favourites: Asset = new Asset()
  personal: Asset[] = []
  activePersonalAsset: Asset = new Asset()
  activePersonalAssetIndex: number = 0
  activePersonalAssetName: string = ''
  activePersonalAssetEdit: boolean = false
  activeAssetType: number = AssetType.WORDS
}
