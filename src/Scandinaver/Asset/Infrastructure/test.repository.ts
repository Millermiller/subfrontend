import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/testAPI'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { TestPayload } from '@/Scandinaver/Asset/Domain/TestPayload'
import TestAPI = API.TestAPI

@Service()
export default class TestRepository extends BaseRepository<Test> {
  @Inject()
  private api: TestAPI

  async all(): Promise<Test[]> {
    return Promise.resolve([])
  }

  async one(id: number): Promise<Test> {
    throw new Error('method not implemented')
  }

  async save(entity: Test): Promise<Test> {
    throw new Error('method not implemented')
  }

  async delete(entity: Test): Promise<any> {
    return Promise.resolve(undefined)
  }

  async update(test: Test, result: number): Promise<any> {
    this.api.saveResult(test, result).then(response => response)
  }

  async complete(test: Test, payload: TestPayload): Promise<any> {
    return this.api
      .complete(test.getId(), payload.toDTO())
      .then(response => response)
  }
}
