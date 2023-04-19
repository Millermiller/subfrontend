import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { AxiosResponse } from 'axios'
import { ClassType } from 'class-transformer/ClassTransformer'
import request from '@/utils/request'

export abstract class BaseAPI<D extends Entity> {
  protected readonly type: ClassType<D>
  protected readonly abstract baseUrl: string

  get class(): ClassType<D> {
    return this.type
  }

  public async abstract all(): Promise<AxiosResponse<D[]>>

  public async one(id: number|string): Promise<AxiosResponse<D>> {
    return request.get(`/${this.baseUrl}/${id}`)
  }

  public async create(form: any): Promise<AxiosResponse<D>> {
    return request.post(`/${this.baseUrl}/`, form)
  }

  public async update(id: number|string, form: any): Promise<AxiosResponse<D>> {
    return request.put(`/${this.baseUrl}/${id}`, form)
  }

  public async delete(id: number|string): Promise<any> {
    return request.delete(`/${this.baseUrl}/${id}`)
  }
}
