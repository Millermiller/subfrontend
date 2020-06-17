import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Core/Infrastructure/api/feedbackAPI'
import IFeedbackForm, { FeedbackForm } from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import { plainToClass } from 'class-transformer'
import FeedbackAPI = API.FeedbackAPI

@Service()
export default class FeedbackRepository extends BaseRepository<IFeedbackForm> {
  @Inject()
  private api: FeedbackAPI

  async all(): Promise<IFeedbackForm[]> {
    return Promise.resolve([])
  }

  async one(id: number): Promise<IFeedbackForm> {
    throw new Error('method not implemented')
  }

  async save(form: IFeedbackForm): Promise<IFeedbackForm> {
    return this.api.create(form).then(response => plainToClass(FeedbackForm, response.data))
  }

  async delete(entity: IFeedbackForm): Promise<any> {
    return Promise.resolve(undefined)
  }
}
