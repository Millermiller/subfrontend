import { AxiosResponse } from 'axios'
import request from '@/utils/request'

export default {
  getState(): Promise<AxiosResponse<any>> {
    return request.get('/state')
  },
}
