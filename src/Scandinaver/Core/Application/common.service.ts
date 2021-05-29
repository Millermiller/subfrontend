import { Inject, Service } from 'vue-typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import {
  SET_FAVOURITES,
  SET_PERSONAL,
  SET_SENTENCES,
  SET_WORDS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { plainToClass } from 'class-transformer'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { SET_TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/mutations.type'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import { SET_PUZZLES } from '@/Scandinaver/Puzzle/Infrastructure/store/mutations.type'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { Language } from '@/Scandinaver/Core/Domain/Language'
import Intro from '@/Scandinaver/Intro/Domain/Intro'
import IntroService from '@/Scandinaver/Intro/Application/intro.service'
import { API } from '@/Scandinaver/Core/Infrastructure/api/common.api'
import { BehaviorSubject } from 'rxjs'
import CommonAPI = API.CommonAPI

@Service()
export class CommonService {
  @Inject()
  private introService: IntroService

  @Inject()
  private commonApi: CommonAPI

  public languageSubject: BehaviorSubject<Language> = new BehaviorSubject<Language>(null)

  async reloadStore() {
    const stateResponse = await this.commonApi.getState()
    store.commit(SET_WORDS, plainToClass(Asset, stateResponse.data.words))
    store.commit(SET_SENTENCES, plainToClass(Asset, stateResponse.data.sentences))
    store.commit(SET_PERSONAL, plainToClass(Asset, plainToClass(Asset, stateResponse.data.personal)))
    store.commit(SET_FAVOURITES, plainToClass(Asset, plainToClass(Asset, stateResponse.data.favourite)))
    store.commit(SET_TEXTS, plainToClass(Translate, stateResponse.data.texts))
    store.commit(SET_PUZZLES, plainToClass(Puzzle, stateResponse.data.puzzles))
    store.commit('setSites', plainToClass(Language, stateResponse.data.languages))
    store.commit('setCurrentLanguage', plainToClass(Language, stateResponse.data.currentLanguage))
    store.commit('setIntro', plainToClass(Intro, stateResponse.data.intro))
    store.commit('setFullscreenLoading', false)

    this.languageSubject.next(plainToClass(Language, stateResponse.data.currentLanguage))

    this.introService.stream.next(true)
    store.commit('setFullscreenLoading', false)
  }
}
