import { Asset } from '@/models/Asset';

export default class State {
  assets: any = {
    words: [],
    sentences: [],
    favourites: Asset,
    personal: [],
  }

  activePersonalAsset = 0

  activePersonalAssetIndex = 0

  activePersonalAssetName = ''

  activePersonalAssetEdit = false

  activeAssetType = ''
}
