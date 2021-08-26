import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import Variant from '@/Scandinaver/Asset/Domain/Variant'
import { Term } from '@/Scandinaver/Asset/Domain/Term'

export default interface IVariantsFactory {
  build(payload: Card | Asset, data: Term[]): Collection<Variant>
}
