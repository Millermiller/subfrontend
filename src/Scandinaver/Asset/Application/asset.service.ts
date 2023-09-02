import AssetRepository from '@/Scandinaver/Asset/Infrastructure/asset.repository'
import { Inject, Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import * as types from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import * as mutations from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import AssetDTO from '@/Scandinaver/Asset/Domain/AssetDTO'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardRepository from '@/Scandinaver/Asset/Infrastructure/card.repository'

@Service()
export default class AssetService extends BaseService<Asset> {
  @Inject()
  private readonly repository: AssetRepository

  @Inject()
  private readonly cardRepository: CardRepository

  async create(data: AssetDTO): Promise<Asset> {
    return this.repository.create(data)
  }

  public async getAsset(assetId: string): Promise<Asset> {
    const asset = await this.repository.one(assetId)
    store.commit(mutations.SET_ACTIVE_ASSET_ID, asset.getId())
    await store.dispatch(types.RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, asset.type)
    return asset
  }

  async reloadPersonalAssets(): Promise<void> {
    const assets = await this.repository.getPersonalAssets()
    store.commit(mutations.SET_PERSONAL, assets)
  }

  public addToPersonalAssets(asset: Asset): void {
    store.commit(mutations.ADD_PERSONAL, asset)
  }

  public removeFromPersonalAssets(asset: Asset): void {
    store.commit(mutations.REMOVE_PERSONAL, asset)
  }

  public async updateAsset(asset: Asset, data: any): Promise<Asset> {
    const response = await this.repository.update(asset, data)
    store.commit(mutations.PATCH_PERSONAL, response)
    return response
  }

  public async destroyAsset(asset: Asset): Promise<any> {
    await this.repository.delete(asset)
  }

  public async addCardToAsset(card: Card, asset: Asset): Promise<Card> {
    await this.repository.addCard(asset, card)
    asset.cards.add(card)
    store.commit(mutations.INCREMENT_PERSONAL_COUNTER, asset)
    return card
  }

  public async removeCardFromAsset(card: Card, asset: Asset): Promise<Card> {
    await this.repository.removeCard(card, asset)
    asset.cards.remove(card)
    await store.commit(mutations.DECREMENT_PERSONAL_COUNTER, asset)
    return card
  }
}
