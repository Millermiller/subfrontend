import { Asset } from '@/models/Asset'
import { Word } from '@/models/Word'
import ISentence from '@/models/Sentence'

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
