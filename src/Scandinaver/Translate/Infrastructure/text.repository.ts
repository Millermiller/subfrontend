import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Translate/Infrastructure/api/textAPI'
import { Text } from '@/Scandinaver/Translate/Domain/Text'
import { plainToClass } from 'class-transformer'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import TextAPI = API.TextAPI

@Service()
export default class TextRepository extends BaseRepository<Text> {
  @Inject()
  private api: TextAPI

  async all(): Promise<Text[]> {
    throw new Error('method not implemented')
  }

  async one(id: number): Promise<Text> {
    return this.api.getText(id).then(response => plainToClass(Text, response.data))
  }

  async save(entity: Text): Promise<Text> {
    throw new Error('method not implemented')
  }

  async delete(entity: Text): Promise<any> {
    throw new Error('method not implemented')
  }

  nextLevel(text: Text) {
    return this.api.nextLevel(text).then(response => plainToClass<Text, Text>(Text, response.data))
  }
}
