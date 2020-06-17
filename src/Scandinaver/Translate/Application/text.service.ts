import { Service } from 'typedi'
import { Inject } from 'vue-typedi'
import TextRepository from '@/Scandinaver/Translate/Infrastructure/text.repository'
import { Text } from '@/Scandinaver/Translate/Domain/Text'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Service()
export default class TextService {
  @Inject()
  private repository: TextRepository

  public async getText(id: number) {
    return this.repository.one(id)
  }

  public async nextLevel(text: Text): Promise<Text> {
    const newtext = await this.repository.nextLevel(text)
    store.commit('setTexts', newtext)
    return newtext
  }
}
