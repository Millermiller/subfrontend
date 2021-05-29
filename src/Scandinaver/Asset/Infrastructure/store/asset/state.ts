import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default class State {
  words: Asset[] = []
  sentences: Asset[] = []
  personal: Asset[] = []
  activePersonalAssetIndex: number = 0
  activePersonalAssetEdit: boolean = false
  activeAssetType: number = AssetType.WORDS
  activeAssetId: number = 0
}
