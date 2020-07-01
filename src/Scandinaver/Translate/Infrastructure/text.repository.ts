import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Translate/Infrastructure/api/textAPI'
import { plainToClass } from 'class-transformer'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import { Translate } from '../Domain/Translate'
import TextAPI = API.TextAPI

@Service()
export default class TextRepository extends BaseRepository<Translate> {
  @Inject()
  private api: TextAPI

  async all(): Promise<Translate[]> {
    throw new Error('method not implemented')
  }

  async one(id: number): Promise<Translate> {
    return this.api.getText(id).then(response => plainToClass(Translate, response.data))
  }

  async save(entity: Translate): Promise<Translate> {
    throw new Error('method not implemented')
  }

  async delete(entity: Translate): Promise<any> {
    throw new Error('method not implemented')
  }

  nextLevel(text: Translate) {
    return this.api.nextLevel(text).then(response => plainToClass<Translate, Translate>(Translate, response.data))
  }
}
