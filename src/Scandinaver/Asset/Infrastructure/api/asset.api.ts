import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

export namespace API {
  @Service()
  export class AssetApi extends BaseAPI<Asset> {
    protected type: ClassType<Asset> = Asset
    protected baseUrl = 'asset'

    all(): Promise<AxiosResponse<Asset[]>> {
      throw new Error('Method not implemented.')
    }

    personal(): Promise<AxiosResponse<Asset[]>> {
      return request.get('/personal', {
        params: {
          lang: store.getters.language
        }
      })
    }

    addCard(asset: number, card: number): Promise<any> {
      return request.post(`/${this.baseUrl}/${asset}/${card}`)
    }

    removeCard(asset: number, card: number) {
      return request.delete(`/${this.baseUrl}/${asset}/${card}`)
    }
  }
}
