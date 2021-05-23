import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Responses } from '../../Domain/Contract/Responses'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Getter } from '@/utils/getter.decorator'
import { CURRENT_LANGUAGE } from '@/Scandinaver/Core/Infrastructure/store/getters.type'

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
