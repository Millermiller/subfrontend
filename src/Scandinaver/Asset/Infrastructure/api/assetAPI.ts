import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Responses } from '../../../Core/Domain/Contract/Responses'

export namespace API {
  @Service()
  export class AssetApi {
    getAsset(id: number): Promise<AxiosResponse<Responses.GetAssetResponse>> {
      return request.get(`/asset/${id}`)
    }
    updateAsset(asset: Asset, title: string): Promise<AxiosResponse> {
      return request.put(`/asset/${asset.id}`, { title })
    }
    destroyAsset(asset: Asset): Promise<AxiosResponse> {
      return request.delete(`/asset/${asset.id}`)
    }
  }
}
