import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class CardApi extends BaseAPI<Card> {
    protected readonly type: ClassType<Card> = Card
    protected readonly baseUrl = 'card'

    public async all(): Promise<AxiosResponse<Card[]>> {
      throw new Error('method not implemented')
    }

    public async create(data: any): Promise<AxiosResponse<Card>> {
      throw new Error('method not implemented')
    }

    public async delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    public async one(id: number): Promise<AxiosResponse<Card>> {
      throw new Error('method not implemented')
    }

    public async update(id: number | string, data: any): Promise<AxiosResponse<Card>> {
      throw new Error('method not implemented')
    }

    public async createCard(card: Card): Promise<AxiosResponse<Card>> {
      return request.post(`/${this.baseUrl}/create`, {
        word: card.term.getValue(),
        translate: card.translate.getValue(),
      })
    }

    public async translate(query: string, sentence: boolean): Promise<AxiosResponse<Card[]>> {
      return request.get(`/${this.baseUrl}/search`, {
        params: { query, sentence: +sentence, lang: store.getters.language },
      })
    }

    public async addFavourite(card: Card): Promise<AxiosResponse> {
      return request.post(`/favourite/${card.getId()}`)
    }

    public async destroyFavourite(card: Card): Promise<AxiosResponse> {
      return request.delete(`/favourite/${card.getId()}`)
    }
  }
}
