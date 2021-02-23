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

  build(card: Card, data: Translate[]): VariantsCollection {
    const variants = new VariantsCollection([])
    const rightTranslate: Translate = card.word
    const rightVariant: Variant = new Variant(rightTranslate.value)
    rightVariant.correct = true
    variants.add(rightVariant)

    const indexes = []
    const tempData: Translate[] = data.slice(0)
    const translates = new TranslatesCollection(tempData)
    translates.remove(rightTranslate)

    while (variants.count() < 4) {
      const l = Math.floor(Math.random() * translates.count())
      const falseTranslate = translates.get(l)
      translates.remove(falseTranslate)
      const variant: Variant = new Variant(falseTranslate.value)
      variant.correct = false
      variants.add(variant)
    }

    variants.shuffle()
    // console.log(variants)
    return variants
  }
}
