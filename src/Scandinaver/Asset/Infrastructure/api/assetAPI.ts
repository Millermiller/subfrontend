import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import AssetDTO from '@/Scandinaver/Asset/Domain/AssetDTO'

export namespace API {
  @Service()
  export class AssetApi extends BaseAPI<Asset> {
    protected type: ClassType<Asset> = Asset

    all(): Promise<AxiosResponse<Asset[]>> {
      throw new Error('Method not implemented.')
    }

    create(data: AssetDTO): Promise<AxiosResponse<Asset>> {
      return request.post('/asset', data)
    }

    delete(id: number | string): Promise<any> {
      return request.delete(`/asset/${id}`)
    }

    one(id: number): Promise<AxiosResponse<Asset>> {
      return request.get(`/asset/${id}`)
    }

    update(id: number | string, data: AssetDTO): Promise<AxiosResponse<Asset>> {
      return request.put(`/asset/${id}`, data)
    }

    personal(): Promise<AxiosResponse<Asset[]>> {
      return request.get('/personal', {
        params: {
          lang: store.getters.language
        }
      })
    }

    addCard(asset: number, card: number): Promise<any> {
      return request.post(`/asset/${asset}/${card}`)
    }

    removeCard(asset: number, card: number) {
      return request.delete(`/asset/${asset}/${card}`)
    }
  }
}
