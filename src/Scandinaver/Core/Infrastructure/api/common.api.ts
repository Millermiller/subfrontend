import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Responses } from '../../Domain/Contract/Responses'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

export namespace API {
  @Service()
  export class CommonAPI {
    getState(): Promise<AxiosResponse<Responses.GetStateResponse>> {
      return request.get('/state', {
        params: {
          lang: store.getters.language
        }
      })
    }
  }
}
