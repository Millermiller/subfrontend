import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import IFeedbackForm, { Feedback } from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'
import { Service } from 'typedi'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class FeedbackAPI extends BaseAPI<Feedback> {
    protected type: ClassType<Feedback> = Feedback
    protected baseUrl = 'feedback'

    all(): Promise<AxiosResponse<Feedback[]>> {
      throw new Error('method not implemented')
    }

    delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    one(id: number): Promise<AxiosResponse<Feedback>> {
      throw new Error('method not implemented')
    }

    update(id: number | string, data: any): Promise<AxiosResponse<Feedback>> {
      throw new Error('method not implemented')
    }
  }
}
