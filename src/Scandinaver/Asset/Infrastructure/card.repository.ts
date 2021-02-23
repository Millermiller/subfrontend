import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/cardAPI'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { plainToClass } from 'class-transformer'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import CardApi = API.CardApi

@Service()
export default class CardRepository extends BaseRepository<Card> {
  @Inject()
  private api: CardApi

  public async all(): Promise<Card[]> {
    throw new Error('method not implemented')
  }

  public async one(id: number): Promise<Card> {
    throw new Error('method not implemented')
  }

  async delete(entity: Card): Promise<any> {
    throw new Error('method not implemented')
  }

  async removeFromAsset(card: Card, asset: Asset): Promise<any> {
    return this.api.destroyCard(card, asset).then(response => response)
  }

  public async save(card: Card): Promise<Card> {
    return this.api
      .createCard(card)
      .then(response => plainToClass(Card, response.data))
  }

  public async add(card: Card, asset: Asset): Promise<Card> {
    return this.api
      .addCardToAsset(card.getId(), asset.getId())
      .then(response => plainToClass(Card, response.data))
  }

  public async translate(word: string, sentence: boolean): Promise<Card[]> {
    return this.api
      .translate(word, sentence)
      .then(response => plainToClass(Card, response.data))
  }

  public async addWord(form: IDictionaryForm) {
    return this.api
      .addWord(form)
      .then(response => plainToClass<Card, Card>(Card, response.data))
  }
}
