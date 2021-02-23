import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default class State {
  words: Asset[] = []
  sentences: Asset[] = []
  favourites: Asset = new Asset()
  personal: Asset[] = []
  activePersonalAssetIndex: number = 0
  activePersonalAssetName: string = ''
  activePersonalAssetEdit: boolean = false
  activeAssetType: number = AssetType.WORDS
  activeAssetId: number = 0
}
