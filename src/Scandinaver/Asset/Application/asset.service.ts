import AssetRepository from '@/Scandinaver/Asset/Infrastructure/asset.repository'
import { Inject, Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import * as types from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import {
  PATCH_PERSONAL, SET_ACTIVE_ASSET_ID,
  SET_ACTIVE_PERSONAL_ASSET_NAME
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'

@Service()
export default class AssetService {
  @Inject()
  private repository: AssetRepository

  public async getAsset(assetId: number): Promise<Asset> {
    const asset = await this.repository.one(assetId)
    store.commit(SET_ACTIVE_ASSET_ID, asset.getId())
    // @ts-ignore
    await store.dispatch(types.RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, asset.type)
    return asset
  }

  public async updateAsset(asset: Asset, data: any) {
    const response = await this.repository.update(asset, data)
    store.commit(PATCH_PERSONAL, response)
  }

  public async destroyAsset(asset: Asset) {
    await this.repository.delete(asset)
    await store.dispatch(types.RELOAD_PERSONAL_ASSETS)
  }
}
