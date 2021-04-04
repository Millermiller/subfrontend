import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'

export class CommonRepository<D extends Entity> {
  protected api: BaseAPI<D>
  private type: ClassType<D>

  constructor(api: BaseAPI<D>) {
    this.api = api
  }

  public async all(): Promise<D[]> {
    return this.api.all().then(response => plainToClass(this.api.class, response.data))
  }

  public async one(id: number): Promise<D> {
    return this.api.one(id).then(response => plainToClass(this.api.class, response.data))
  }

  public async create(data: any): Promise<D> {
    return this.api.create(data).then(response => plainToClass(this.api.class, response.data))
  }

  public async update(entity: D, data: any): Promise<D> {
    return this.api.update(entity.getId(), data).then(response => plainToClass(this.api.class, response.data))
  }

  public async delete(entity: D): Promise<any> {
    return this.api.delete(entity.getId()).then(response => plainToClass(this.api.class, response.data))
  }
}
