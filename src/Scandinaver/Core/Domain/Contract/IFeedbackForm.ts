import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default interface IFeedbackForm {
  subject: string
  message: string
}

export class FeedbackForm implements IFeedbackForm {
  message: string = ''
  subject: string = ''
}

export class Feedback extends Entity {
  id: any
  subject: string
  message: string

  getId(): number | string {
    return this.id;
  }
}
