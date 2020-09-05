import { Service } from 'typedi'
import { AxiosResponse } from 'axios'
import { requestBuffer } from '@/utils/request'

export namespace API {
  @Service()
  export class ReaderAPI {
    read(text: string): Promise<AxiosResponse> {
      requestBuffer.interceptors.request.use(
        (config) => {
          config.responseType = 'arraybuffer'
          return config
        },
      )
      return requestBuffer.get(`/read?text=${text}`)
    }
  }
}
