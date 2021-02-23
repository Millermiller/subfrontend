import { Inject, Service } from 'typedi'
import TestRepository from '@/Scandinaver/Asset/Infrastructure/test.repository'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

@Service()
export default class TestService extends BaseService<Test> {
  @Inject()
  private repository: TestRepository

  create(asset: Asset): Test {
    return new Test(asset)
  }

  async complete(test: Test) {
    await this.repository.complete(test)
    await store.dispatch('reloadStore')
  }
}
