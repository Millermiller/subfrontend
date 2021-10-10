import { Service } from 'typedi'
import { AxiosResponse } from 'axios'
import requestBuffer from '@/utils/requestBuffer'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

export namespace API {
  @Service()
  export class ReaderAPI {
    public async read(text: string): Promise<AxiosResponse> {
      requestBuffer.interceptors.request.use((config) => {
        config.responseType = 'arraybuffer'
        return config
      })
      return requestBuffer.get('/read', {
        params: {
          text,
          language: store.getters.language
        },
      })
    }
  }
}
