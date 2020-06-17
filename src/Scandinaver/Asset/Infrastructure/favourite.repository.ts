import { Inject, Service } from 'typedi'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/cardAPI'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import { plainToClass } from 'class-transformer'
import CardApi = API.CardApi

@Service()
export default class FavouriteRepository extends BaseRepository<Card> {
  @Inject()
  private api: CardApi

  async all(): Promise<Card[]> {
    return Promise.resolve([])
  }

  async one(id: number): Promise<Card> {
    return Promise.resolve(new Card())
  }

  async save(card: Card): Promise<Card> {
    return this.api.addFavourite(card).then(response => plainToClass(Card, response.data))
  }

  async delete(card: Card): Promise<any> {
    this.api.destroyFavourite(card).then(response => response)
  }
}
