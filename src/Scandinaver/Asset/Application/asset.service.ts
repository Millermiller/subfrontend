import AssetRepository from '@/Scandinaver/Asset/Infrastructure/asset.repository'
import { Inject, Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import * as types from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import {
  ADD_PERSONAL,
  DECREMENT_PERSONAL_COUNTER,
  INCREMENT_PERSONAL_COUNTER,
  PATCH_PERSONAL, REMOVE_PERSONAL, SET_ACTIVE_ASSET_ID,
  SET_ACTIVE_PERSONAL_ASSET_NAME, SET_PERSONAL,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import AssetDTO from '@/Scandinaver/Asset/Domain/AssetDTO'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardRepository from '@/Scandinaver/Asset/Infrastructure/card.repository'

@Service()
export default class AssetService extends BaseService<Asset> {
  @Inject()
  private repository: AssetRepository

  @Inject()
  private cardRepository: CardRepository

  async create(data: AssetDTO): Promise<Asset> {
    return this.repository.create(data)
  }

  public async getAsset(assetId: number): Promise<Asset> {
    const asset = await this.repository.one(assetId)
    store.commit(SET_ACTIVE_ASSET_ID, asset.getId())
    // @ts-ignore
    await store.dispatch(types.RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, asset.type)
    return asset
  }

  async reloadPersonalAssets() {
    const assets = await this.repository.getPersonalAssets()
    store.commit(SET_PERSONAL, assets)
  }

  public addToPersonalAssets(asset: Asset): void {
    store.commit(ADD_PERSONAL, asset)
  }

  public removeFromPersonalAssets(asset: Asset): void {
    store.commit(REMOVE_PERSONAL, asset)
  }

  public async updateAsset(asset: Asset, data: any) {
    const response = await this.repository.update(asset, data)
    store.commit(PATCH_PERSONAL, response)
    return response
  }

  public async destroyAsset(asset: Asset) {
    await this.repository.delete(asset)
  }

  public async addCardToAsset(card: Card, asset: Asset): Promise<Card> {
    await this.repository.addCard(asset, card)
    asset.cards.add(card)
    store.commit(INCREMENT_PERSONAL_COUNTER, asset)
    return card
  }

  public async removeCardFromAsset(card: Card, asset: Asset): Promise<Card> {
    await this.repository.removeCard(card, asset)
    asset.cards.remove(card)
    await store.commit(DECREMENT_PERSONAL_COUNTER, asset)
    return card
  }
}
