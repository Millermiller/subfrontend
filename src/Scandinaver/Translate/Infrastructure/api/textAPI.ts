import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Service } from 'typedi'
import { Text } from '@/Scandinaver/Translate/Domain/Text'

export namespace API {
  @Service()
  export class TextAPI {
    getText(id: number): Promise<AxiosResponse> {
      return request.get(`/text/${id}`)
    }

    nextLevel(text: Text): Promise<AxiosResponse<Text>> {
      return request.post('/nextTLevel', { id: text.id })
    }
  }
}
