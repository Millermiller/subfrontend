import { Inject, Service } from 'typedi'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardRepository from '@/Scandinaver/Asset/Infrastructure/card.repository'
import FavouriteRepository from '@/Scandinaver/Asset/Infrastructure/favourite.repository'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import {
  DECREMENT_FAVOURITE_COUNTER, DECREMENT_PERSONAL_COUNTER,
  INCREMENT_FAVOURITE_COUNTER, INCREMENT_PERSONAL_COUNTER,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import IDictionaryForm from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

@Service()
export default class CardService extends BaseService<Card> {
  @Inject()
  private cardRepository: CardRepository

  create(input: any): Card {
    throw new Error('Method not implemented.')
  }

  @Inject()
  private favouriteRepository: FavouriteRepository

  public async createCard(form: IDictionaryForm): Promise<Card> {
    const card = new Card()
    card.word = new Word(form.orig)
    card.translate = new Translate(form.translate)
    await this.cardRepository.save(card)
    return card
  }

  public async addCardToAsset(card: Card): Promise<Card> {
    await this.cardRepository.add(card)
    store.commit(INCREMENT_PERSONAL_COUNTER, card)
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

  public async removeFromAsset(card: Card, asset: Asset): Promise<Card> {
    await this.cardRepository.removeFromAsset(card, asset)
    await store.commit(DECREMENT_PERSONAL_COUNTER, asset)
    return card
  }

  public async translate(word: string, sentence: boolean): Promise<Card[]> {
    return this.cardRepository.translate(word, sentence)
  }

  async addWord(form: IDictionaryForm) {
    return this.cardRepository.addWord(form)
  }
}
