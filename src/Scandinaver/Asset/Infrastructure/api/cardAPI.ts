import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

export namespace API {
  @Service()
  export class CardApi {
    createCard(card: Card): Promise<AxiosResponse<Card>> {
      return request.post('/card/create', {
        word: card.word.getValue(),
        translate: card.translate.getValue(),
      })
    }

    translate(query: string, sentence: boolean): Promise<AxiosResponse<Card[]>> {
      return request.get('/card/search', {
        params: { query, sentence: +sentence, lang: store.getters.language },
      })
    }

    addWord(form: IDictionaryForm): Promise<AxiosResponse<Card>> {
      return request.post('/word', form)
    }

    addFavourite(card: Card): Promise<AxiosResponse> {
      return request.post(`/favourite/${card.getId()}`)
    }

    destroyFavourite(card: Card): Promise<AxiosResponse> {
      return request.delete(`/favourite/${card.getId()}`)
    }
  }
}
