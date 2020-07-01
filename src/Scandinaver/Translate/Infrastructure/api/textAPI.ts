import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Translate } from '../../Domain/Translate'

export namespace API {
  @Service()
  export class TextAPI {
    getText(id: number): Promise<AxiosResponse> {
      return request.get(`/text/${id}`)
    }

    nextLevel(text: Translate): Promise<AxiosResponse<Translate>> {
      return request.post('/nextTLevel', { id: text.id })
    }
  }
}
