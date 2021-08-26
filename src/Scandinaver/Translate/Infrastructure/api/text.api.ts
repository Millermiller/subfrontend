import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Translate } from '../../Domain/Translate'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class TextAPI extends BaseAPI<Translate> {
    protected readonly type: ClassType<Translate> = Translate
    protected readonly baseUrl = 'text'

    public async all(): Promise<AxiosResponse<Translate[]>> {
      throw new Error('method not implemented')
    }

    public async create(data: any): Promise<AxiosResponse<Translate>> {
      throw new Error('method not implemented')
    }

    public async delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    public async one(id: number): Promise<AxiosResponse<Translate>> {
      throw new Error('method not implemented')
    }

    public async update(id: number | string, data: any): Promise<AxiosResponse<Translate>> {
      throw new Error('method not implemented')
    }

    public async getText(id: number): Promise<AxiosResponse> {
      return request.get(`/${this.baseUrl}/${id}`)
    }

    public async nextLevel(text: Translate): Promise<AxiosResponse<Translate>> {
      return request.post('/nextTLevel', { id: text.id })
    }
  }
}
