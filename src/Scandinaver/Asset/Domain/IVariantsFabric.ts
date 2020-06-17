import VariantsCollection from '@/Scandinaver/Asset/Domain/VariantsCollection'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import Translate from '@/Scandinaver/Asset/Domain/Translate'

export default interface IVariantsFabric {
  build(payload: Card | Asset, data: Translate[]): VariantsCollection
}
