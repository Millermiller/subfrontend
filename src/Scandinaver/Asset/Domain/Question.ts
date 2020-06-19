import VariantsCollection from '@/Scandinaver/Asset/Domain/VariantsCollection'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Container, Inject, Service } from 'typedi'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import VariantsFromAssetFactory from '@/Scandinaver/Asset/Domain/VariantsFromAssetFactory'

@Service()
export default class Question extends Entity {
  @Inject()
  private variantsFabric: VariantsFromAssetFactory
  variants: VariantsCollection
  card: Card

  constructor(card: Card, translates: Translate[]) {
    super()
    this.card = card
    this.variantsFabric = Container.get(VariantsFromAssetFactory)
    this.variants = this.variantsFabric.build(card, translates)
  }

  getId(): string {
    return this.subject
  }

  get subject(): string {
    return this.card.subject
  }
}
