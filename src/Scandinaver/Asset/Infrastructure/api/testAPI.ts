import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { Service } from 'typedi'

export namespace API {
  @Service()
  export class TestAPI {
    saveResult(test: Test, percent: number): Promise<AxiosResponse> {
      return request.post(`/result/${test.id}`, { result: percent })
    }

    complete(id: number, payload: {}): Promise<AxiosResponse<Test>> {
      return request.post(`/complete/${id}`, payload)
    }
  }
}
