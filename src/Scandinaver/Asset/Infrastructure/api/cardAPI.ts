import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { Service } from 'typedi'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

export namespace API {
  @Service()
  export class CardApi {
    addCardToAsset(card: Card): Promise<AxiosResponse<Card>> {
      return request.post(
        `/card/${card.getId()}/${card.asset.getId()}`,
      )
    }

    createCard(card: Card): Promise<AxiosResponse<Card>> {
      return request.post('/card/create', {
        word: card.word.getValue(),
        translate: card.translate.getValue(),
      })
    }

    destroyCard(card: Card, asset: Asset): Promise<AxiosResponse> {
      return request.delete(`/card/${card.getId()}/${asset.getId()}`)
    }

    translate(word: string, sentence: boolean): Promise<AxiosResponse<Card[]>> {
      return request.get('/translate', {
        params: { word, sentence: +sentence },
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
