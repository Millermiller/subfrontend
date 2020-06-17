import { Inject, Service } from 'typedi'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/testAPI'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { plainToClass } from 'class-transformer'
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

  async getNextLevel(test: Test): Promise<Test> {
    return this.api.nextLevel(test).then(response => plainToClass(Test, response.data))
  }
}
