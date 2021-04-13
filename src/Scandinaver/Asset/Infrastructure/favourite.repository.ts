import { Inject, Service } from 'typedi'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/card.api'
import { plainToClass } from 'class-transformer'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import CardApi = API.CardApi

@Service()
export default class FavouriteRepository extends CommonRepository<Card> {
  @Inject()
  protected api: CardApi

  async save(card: Card): Promise<Card> {
    return this.api
      .addFavourite(card)
      .then(response => plainToClass(Card, response.data))
  }

  async delete(card: Card): Promise<any> {
    this.api.destroyFavourite(card).then(response => response)
  }
}
