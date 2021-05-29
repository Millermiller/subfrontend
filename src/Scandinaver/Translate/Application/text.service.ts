import { Service } from 'typedi'
import { Inject } from 'vue-typedi'
import TextRepository from '@/Scandinaver/Translate/Infrastructure/text.repository'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Translate } from '../Domain/Translate'
import { SET_TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/mutations.type'

@Service()
export default class TextService {
  @Inject()
  private repository: TextRepository

  public async getText(id: number) {
    return this.repository.one(id)
  }

  public async nextLevel(text: Translate): Promise<Translate> {
    const newtext = await this.repository.nextLevel(text)
    store.commit(SET_TEXTS, newtext)
    return newtext
  }
}
