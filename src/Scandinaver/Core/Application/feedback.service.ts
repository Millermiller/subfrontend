import { Inject, Service } from 'typedi'
import FeedbackRepository from '@/Scandinaver/Core/Infrastructure/feedback.repository'
import IFeedbackForm, { FeedbackForm } from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'

@Service()
export default class FeedbackService {
  @Inject()
  private repository: FeedbackRepository

  async addFeedback(form: IFeedbackForm): Promise<FeedbackForm> {
    return this.repository.save(form)
  }
}
