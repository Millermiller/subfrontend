import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Service } from 'typedi'
import Variant from '@/Scandinaver/Asset/Domain/Variant'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import IVariantsFactory from '@/Scandinaver/Asset/Domain/IVariantsFactory'
import { Term } from '@/Scandinaver/Asset/Domain/Term'

@Service()
export default class VariantsFromAssetFactory implements IVariantsFactory {
  private readonly count: number = 4

  build(card: Card, data: Term[]): Collection<Variant> {
    const variants = new Collection<Variant>([])
    const rightTranslate: Term = card.term
    const rightVariant: Variant = new Variant(rightTranslate.getValue())
    rightVariant.correct = true
    variants.add(rightVariant)

    const indexes = []
    const tempData: Term[] = data.slice(0)
    const translates = new Collection<Term>(tempData)
    translates.remove(rightTranslate)

    while (variants.count() < 4) {
      const l = Math.floor(Math.random() * translates.count())
      const falseTranslate = translates.get(l)
      translates.remove(falseTranslate)
      const variant: Variant = new Variant(falseTranslate.getValue())
      variant.correct = false
      variants.add(variant)
    }

    variants.shuffle()
    return variants
  }
}
