import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { AxiosResponse } from 'axios'
import { ClassType } from 'class-transformer/ClassTransformer'
import request from '@/utils/request'

export abstract class BaseAPI<D extends Entity> {
  protected type: ClassType<D>
  protected abstract baseUrl: string

  get class(): ClassType<D> {
    return this.type
  }

  abstract all(): Promise<AxiosResponse<D[]>>

  one(id: number): Promise<AxiosResponse<D>> {
    return request.get(`/${this.baseUrl}/${id}`)
  }

  create(form: any): Promise<AxiosResponse<D>> {
    return request.post(`/${this.baseUrl}/`, form)
  }

  update(id: number|string, form: any): Promise<AxiosResponse<D>> {
    return request.put(`/${this.baseUrl}/${id}`, form)
  }

  delete(id: number|string): Promise<any> {
    return request.delete(`/${this.baseUrl}/${id}`)
  }
}
