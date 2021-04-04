import { Inject, Service } from 'typedi'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/assetAPI'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import { plainToClass } from 'class-transformer'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import AssetApi = API.AssetApi

@Service()
export default class AssetRepository extends CommonRepository<Asset> {
  @Inject()
  protected api: AssetApi

  async getPersonalAssets(): Promise<Asset[]> {
    return this.api.personal().then(response => plainToClass(Asset, response.data))
  }

  async removeCard(card: Card, asset: Asset): Promise<any> {
    return this.api.removeCard(asset.getId(), card.getId()).then(response => response)
  }

  async addCard(asset: Asset, card: Card): Promise<Card> {
    return this.api
      .addCard(asset.getId(), card.getId())
      .then(response => plainToClass(Card, response.data))
  }
}
