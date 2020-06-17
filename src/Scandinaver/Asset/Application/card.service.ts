import { Inject, Service } from 'typedi'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardRepository from '@/Scandinaver/Asset/Infrastructure/card.repository'
import FavouriteRepository from '@/Scandinaver/Asset/Infrastructure/favourite.repository'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import {
  DECREMENT_FAVOURITE_COUNTER,
  INCREMENT_FAVOURITE_COUNTER,
  REMOVE_CARD,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { AxiosResponse } from 'axios'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'

@Service()
export default class CardService extends BaseService<Card> {
  @Inject()
  private cardRepository: CardRepository

  create(input: any): Card {
    throw new Error('Method not implemented.')
  }

  @Inject()
  private favouriteRepository: FavouriteRepository

  public async createCard(card: Card): Promise<Card> {
    return this.cardRepository.save(card)
    // store.commit(INCREMENT_PERSONAL_COUNTER, card.id)
  }

  public async addToFavourite(card: Card): Promise<Card> {
    await this.favouriteRepository.save(card)
    store.commit(INCREMENT_FAVOURITE_COUNTER)
    card.favourite = true
    return card
  }

  public async removeFromFavourite(card: Card): Promise<Card> {
    await this.favouriteRepository.delete(card)
    store.commit(DECREMENT_FAVOURITE_COUNTER)
    card.favourite = false
    return card
  }

  public async destroyCard(card: Card) {
    await this.cardRepository.delete(card)
    store.commit(REMOVE_CARD, card)
  }

  public async translate(word: string, sentence: boolean): Promise<AxiosResponse> {
    return this.cardRepository.translate(word, sentence)
  }

  async addWord(form: IDictionaryForm) {
    return this.cardRepository.addWord(form)
  }
}
