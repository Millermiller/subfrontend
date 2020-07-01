import { Inject, Service } from 'typedi'
import { plainToClass } from 'class-transformer'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/assetAPI'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import AssetApi = API.AssetApi

@Service()
export default class AssetRepository extends BaseRepository<Asset> {
  @Inject()
  private api: AssetApi

  public async all(): Promise<Asset[]> {
    throw new Error('method not implemented')
  }

  public async one(assetId: number): Promise<Asset> {
    return this.api.getAsset(assetId).then(response => plainToClass(Asset, response.data))
  }

  public async update(asset: Asset, data: any) {
    return this.api.updateAsset(asset, data).then(response => response)
  }

  public async delete(asset: Asset): Promise<any> {
    return this.api.destroyAsset(asset).then(response => response)
  }

  public async save(entity: Asset): Promise<Asset> {
    return Promise.resolve(new Asset())
  }
}
