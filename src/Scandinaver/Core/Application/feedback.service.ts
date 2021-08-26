import { Inject, Service } from 'typedi'
import FeedbackRepository from '@/Scandinaver/Core/Infrastructure/feedback.repository'
import IFeedbackForm, {
  FeedbackForm,
} from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'

@Service()
export default class FeedbackService {
  @Inject()
  private readonly repository: FeedbackRepository

  public async addFeedback(form: IFeedbackForm): Promise<FeedbackForm> {
    return this.repository.create(form)
  }
}
