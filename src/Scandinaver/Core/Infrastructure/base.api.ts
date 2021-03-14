import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { AxiosResponse } from 'axios'
import { ClassType } from 'class-transformer/ClassTransformer'

export abstract class BaseAPI<D extends Entity> {
  protected type: ClassType<D>

  get class(): ClassType<D> {
    return this.type
  }

  abstract all(): Promise<AxiosResponse<D[]>>
  abstract one(id: number): Promise<AxiosResponse<D>>
  abstract create(data: any): Promise<AxiosResponse<D>>
  abstract update(id: number|string, data: any): Promise<AxiosResponse<D>>
  abstract delete(id: number|string): Promise<any>
}
