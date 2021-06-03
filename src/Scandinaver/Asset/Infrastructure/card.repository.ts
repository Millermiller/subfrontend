import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/card.api'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { plainToClass } from 'class-transformer'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import CardApi = API.CardApi

@Service()
export default class CardRepository extends CommonRepository<Card> {
  @Inject()
  protected readonly api: CardApi

  public async all(): Promise<Card[]> {
    throw new Error('method not implemented')
  }

  public async one(id: number): Promise<Card> {
    throw new Error('method not implemented')
  }

  async delete(entity: Card): Promise<any> {
    throw new Error('method not implemented')
  }

  public async save(card: Card): Promise<Card> {
    return this.api
      .createCard(card)
      .then(response => plainToClass(Card, response.data))
  }

  public async translate(word: string, sentence: boolean): Promise<Card[]> {
    return this.api
      .translate(word, sentence)
      .then(response => plainToClass(Card, response.data))
  }
}
