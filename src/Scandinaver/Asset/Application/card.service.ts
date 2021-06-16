import { Inject, Service } from 'typedi'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardRepository from '@/Scandinaver/Asset/Infrastructure/card.repository'
import FavouriteRepository from '@/Scandinaver/Asset/Infrastructure/favourite.repository'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import {
  DECREMENT_FAVOURITE_COUNTER,
  INCREMENT_FAVOURITE_COUNTER,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import { Term } from '@/Scandinaver/Asset/Domain/Term'
import Translate from '@/Scandinaver/Asset/Domain/Translate'

@Service()
export default class CardService extends BaseService<Card> {
  @Inject()
  private readonly cardRepository: CardRepository

  @Inject()
  private readonly favouriteRepository: FavouriteRepository

  create(input: any): Card {
    throw new Error('Method not implemented.')
  }

  public async createCard(form: IDictionaryForm): Promise<Card> {
    const card = new Card()
    card.term = new Term(form.orig)
    card.translate = new Translate(form.translate)
    await this.cardRepository.save(card)
    return card
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

  public async translate(word: string, sentence: boolean): Promise<Card[]> {
    return this.cardRepository.translate(word, sentence)
  }
}
