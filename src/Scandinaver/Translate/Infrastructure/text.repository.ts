import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Translate/Infrastructure/api/text.api'
import { plainToClass } from 'class-transformer'
import { Translate } from '../Domain/Translate'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import TextAPI = API.TextAPI

@Service()
export default class TextRepository extends CommonRepository<Translate> {
  @Inject()
  protected readonly api: TextAPI

  public async one(id: number): Promise<Translate> {
    return this.api
      .getText(id)
      .then(response => plainToClass(Translate, response.data))
  }

  public async nextLevel(text: Translate): Promise<any> {
    return this.api
      .nextLevel(text)
      .then(response => plainToClass<Translate, Translate>(Translate, response.data))
  }
}
