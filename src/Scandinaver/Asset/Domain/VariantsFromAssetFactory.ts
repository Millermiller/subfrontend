import IVariantsFabric from '@/Scandinaver/Asset/Domain/IVariantsFabric'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import VariantsCollection from '@/Scandinaver/Asset/Domain/VariantsCollection'
import { Service } from 'typedi'
import { TranslatesCollection } from '@/Scandinaver/Translate/Domain/TranslatesCollection'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import Variant from '@/Scandinaver/Asset/Domain/Variant'

@Service()
export default class VariantsFromAssetFactory implements IVariantsFabric {
  private count: number = 4

  build(payload: Card, data: Translate[]): VariantsCollection {
    const variants = new VariantsCollection([])
    const rightTranslate = payload.translate
    const rightVariant = new Variant(rightTranslate.value)
    rightVariant.correct = true
    variants.add(rightVariant)

    const indexes = []
    const translates = new TranslatesCollection(data)
    translates.remove(rightTranslate)

    while (variants.count() < (translates.count() > this.count ? this.count : translates.count())) {
      const l = Math.floor(Math.random() * translates.count())

      //  if (indexes.indexOf(l) === -1) {
      indexes.push(l)
      const variant: Variant = new Variant(translates.get(l).value)
      // console.log(variant)
      variant.correct = false
      variants.add(variant)
      //  }
    }

    variants.shuffle()

    return variants
  }
}
