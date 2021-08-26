import { Inject, Service } from 'typedi'
import TestRepository from '@/Scandinaver/Asset/Infrastructure/test.repository'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { TestPayload } from '@/Scandinaver/Asset/Domain/TestPayload'
import Question from '@/Scandinaver/Asset/Domain/Question'
import { LoginService } from '@/Scandinaver/Core/Application/login.service'
import { CommonService } from '@/Scandinaver/Core/Application/common.service'
import { BehaviorSubject } from 'rxjs'

@Service()
export default class TestService extends BaseService<Test> {
  @Inject()
  private readonly commonService: CommonService

  @Inject()
  private readonly repository: TestRepository

  @Inject()
  private readonly service: LoginService

  public errorsBehaviorSubject: BehaviorSubject<Question> = new BehaviorSubject<Question>(undefined)

  create(asset: Asset): Test {
    return new Test(asset)
  }

  public async complete(test: Test): Promise<void> {
    const payload = new TestPayload()
    payload.id = test.id
    payload.percent = test.percent
    payload.time = test.time
    test.errors.forEach((error: Question) => {
      payload.addError(error.card)
    })
    await this.repository.complete(test, payload)
    await this.commonService.reloadStore()
  }
}
