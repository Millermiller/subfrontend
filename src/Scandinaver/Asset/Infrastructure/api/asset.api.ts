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

    public async all(): Promise<AxiosResponse<Asset[]>> {
      throw new Error('Method not implemented.')
    }

    public async personal(): Promise<AxiosResponse<Asset[]>> {
      return request.get('/personal', {
        params: {
          lang: store.getters.language
        }
      })
    }

    public async addCard(asset: number, card: number): Promise<any> {
      return request.post(`/${this.baseUrl}/${asset}/${card}`)
    }

    public async removeCard(asset: number, card: number): Promise<void> {
      return request.delete(`/${this.baseUrl}/${asset}/${card}`)
    }
  }
}
