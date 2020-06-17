import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'

export namespace API {
  @Service()
  export class CommonAPI {
    static getState(): Promise<AxiosResponse<any>> {
      return request.get('/state')
    }
  }
}
