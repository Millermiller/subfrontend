import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { Service } from 'typedi'

export namespace API {
  @Service()
  export class CardApi {
    createCard(card: Card): Promise<AxiosResponse<Card>> {
      return request.post(`/card/${card.word.id}/${card.translate.id}/${card.asset.id}`)
    }

    destroyCard(card: Card): Promise<AxiosResponse> {
      return request.delete(`/card/${card.id}`)
    }

    translate(word: string, sentence: boolean): Promise<AxiosResponse> {
      return request.get('/translate', { params: { word, sentence: +sentence } })
    }

    addWord(form: IDictionaryForm): Promise<AxiosResponse<Card>> {
      return request.post('/word', form)
    }

    addFavourite(item: Card): Promise<AxiosResponse> {
      return request.post(`/favourite/${item.word.id}/${item.translate.id}`)
    }

    destroyFavourite(item: Card): Promise<AxiosResponse> {
      return request.delete(`/favourite/${item.word.id}`)
    }
  }
}
