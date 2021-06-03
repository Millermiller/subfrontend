import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import Variant from '@/Scandinaver/Asset/Domain/Variant'

export default interface IVariantsFactory {
  build(payload: Card | Asset, data: Translate[]): Collection<Variant>
}
