import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Translate } from '../../Domain/Translate'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class TextAPI extends BaseAPI<Translate> {
    protected type: ClassType<Translate> = Translate
    protected baseUrl = 'text'

    all(): Promise<AxiosResponse<Translate[]>> {
      throw new Error('method not implemented')
    }

    create(data: any): Promise<AxiosResponse<Translate>> {
      throw new Error('method not implemented')
    }

    delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    one(id: number): Promise<AxiosResponse<Translate>> {
      throw new Error('method not implemented')
    }

    update(id: number | string, data: any): Promise<AxiosResponse<Translate>> {
      throw new Error('method not implemented')
    }

    getText(id: number): Promise<AxiosResponse> {
      return request.get(`/${this.baseUrl}/${id}`)
    }

    nextLevel(text: Translate): Promise<AxiosResponse<Translate>> {
      return request.post('/nextTLevel', { id: text.id })
    }
  }
}
