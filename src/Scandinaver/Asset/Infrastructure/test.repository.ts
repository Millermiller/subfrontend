import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/test.api'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { TestPayload } from '@/Scandinaver/Asset/Domain/TestPayload'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import TestAPI = API.TestAPI

@Service()
export default class TestRepository extends CommonRepository<Test> {
  @Inject()
  protected readonly api: TestAPI

  public async all(): Promise<Test[]> {
    return Promise.resolve([])
  }

  public async one(id: number): Promise<Test> {
    throw new Error('method not implemented')
  }

  public async save(entity: Test): Promise<Test> {
    throw new Error('method not implemented')
  }

  public async delete(entity: Test): Promise<any> {
    return Promise.resolve(undefined)
  }

  public async update(test: Test, result: number): Promise<any> {
    this.api.saveResult(test, result).then(response => response)
  }

  async complete(test: Test, payload: TestPayload): Promise<any> {
    return this.api
      .complete(test.getId(), payload.toDTO())
      .then(response => response)
  }
}
