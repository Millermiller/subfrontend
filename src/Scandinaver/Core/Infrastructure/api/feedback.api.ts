import { AxiosResponse } from 'axios'
import { Feedback } from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'
import { Service } from 'typedi'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class FeedbackAPI extends BaseAPI<Feedback> {
    protected readonly type: ClassType<Feedback> = Feedback
    protected readonly baseUrl = 'feedback'

    public async all(): Promise<AxiosResponse<Feedback[]>> {
      throw new Error('method not implemented')
    }

    public async delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    public async one(id: number): Promise<AxiosResponse<Feedback>> {
      throw new Error('method not implemented')
    }

    public async update(id: number | string, data: any): Promise<AxiosResponse<Feedback>> {
      throw new Error('method not implemented')
    }
  }
}
