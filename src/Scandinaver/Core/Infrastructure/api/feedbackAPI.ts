import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import IFeedbackForm from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'
import { Service } from 'typedi'

export namespace API {
  @Service()
  export class FeedbackAPI {
    create(form: IFeedbackForm): Promise<AxiosResponse<IFeedbackForm>> {
      return request.post('feedback', { message: form.message })
    }
  }
}
