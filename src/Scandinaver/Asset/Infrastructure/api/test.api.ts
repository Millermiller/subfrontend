import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { Service } from 'typedi'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class TestAPI extends BaseAPI<Test> {
    protected readonly type: ClassType<Test> = Test
    protected readonly baseUrl = 'result'

    public async saveResult(test: Test, percent: number): Promise<AxiosResponse> {
      return request.post(`/result/${test.id}`, { result: percent })
    }

    public async complete(id: number, payload: {}): Promise<AxiosResponse<Test>> {
      return request.post(`/complete/${id}`, payload)
    }

    public async all(): Promise<AxiosResponse<Test[]>> {
      throw new Error('method not implemented')
    }

    public async create(data: any): Promise<AxiosResponse<Test>> {
      throw new Error('method not implemented')
    }

    public async delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    public async one(id: number): Promise<AxiosResponse<Test>> {
      throw new Error('method not implemented')
    }

    public async update(id: number | string, data: any): Promise<AxiosResponse<Test>> {
      throw new Error('method not implemented')
    }
  }
}
