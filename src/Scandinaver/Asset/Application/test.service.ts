import { Inject, Service } from 'typedi'
import TestRepository from '@/Scandinaver/Asset/Infrastructure/test.repository'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { TestPayload } from '@/Scandinaver/Asset/Domain/TestPayload'
import Question from '@/Scandinaver/Asset/Domain/Question'

@Service()
export default class TestService extends BaseService<Test> {
  @Inject()
  private repository: TestRepository

  create(asset: Asset): Test {
    return new Test(asset)
  }

  async complete(test: Test) {
    const payload = new TestPayload()
    payload.id = test.id
    payload.percent = test.percent
    payload.time = test.time
    test.errors.forEach((error: Question) => {
      payload.addError(error.card)
    })
    await this.repository.complete(test, payload)
    await store.dispatch('reloadStore')
  }
}
