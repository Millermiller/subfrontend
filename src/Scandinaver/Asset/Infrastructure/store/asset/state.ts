import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default class State {
  words: Word[] = []
  sentences: ISentence[] = []
  favourites: Asset = new Asset()
  personal: any[] = []
  activePersonalAsset: number = 0
  activePersonalAssetIndex: number = 0
  activePersonalAssetName: string = ''
  activePersonalAssetEdit: boolean = false
  activeAssetType: number = AssetType.WORDS
}
