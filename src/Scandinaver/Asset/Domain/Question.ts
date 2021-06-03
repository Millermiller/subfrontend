import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Container, Inject, Service } from 'typedi'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import VariantsFromAssetFactory from '@/Scandinaver/Asset/Domain/VariantsFromAssetFactory'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import Variant from '@/Scandinaver/Asset/Domain/Variant'

@Service()
export default class Question extends Entity {
  @Inject()
  private readonly variantsFabric: VariantsFromAssetFactory
  public variants: Collection<Variant>
  public card: Card

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

  get value(): string {
    return this.card.value
  }
}
