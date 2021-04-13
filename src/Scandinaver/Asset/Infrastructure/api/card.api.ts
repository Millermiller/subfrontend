import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class CardApi extends BaseAPI<Card> {
    protected type: ClassType<Card> = Card

    all(): Promise<AxiosResponse<Card[]>> {
      throw new Error('method not implemented')
    }

    create(data: any): Promise<AxiosResponse<Card>> {
      throw new Error('method not implemented')
    }

    delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    one(id: number): Promise<AxiosResponse<Card>> {
      throw new Error('method not implemented')
    }

    update(id: number | string, data: any): Promise<AxiosResponse<Card>> {
      throw new Error('method not implemented')
    }

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
