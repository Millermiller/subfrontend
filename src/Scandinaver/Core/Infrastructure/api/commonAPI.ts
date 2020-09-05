import { AxiosResponse } from 'axios'
import { request } from '@/utils/request'
import { Service } from 'typedi'
import { Responses } from '../../Domain/Contract/Responses'

export namespace API {
  @Service()
  export class CommonAPI {
    static getState(): Promise<AxiosResponse<Responses.GetStateResponse>> {
      return request.get('/state')
    }
  }
}
