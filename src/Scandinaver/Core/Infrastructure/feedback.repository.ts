import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Core/Infrastructure/api/feedback.api'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import { Feedback } from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'
import FeedbackAPI = API.FeedbackAPI

@Service()
export default class FeedbackRepository extends CommonRepository<Feedback> {
  @Inject()
  protected api: FeedbackAPI
}
