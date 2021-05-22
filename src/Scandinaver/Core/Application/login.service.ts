import { AxiosResponse } from 'axios'
import { API, ILoginData } from '@/Scandinaver/Core/Infrastructure/api/user.api'
import Vue from 'vue'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import IntroService from '@/Scandinaver/Intro/Application/intro.service'
import { Inject, Service } from 'vue-typedi'
import { INITIALISE_RBAC } from '@/Scandinaver/RBAC/Infrastructure/store/actions.type'
import { API as commonApi } from '@/Scandinaver/Core/Infrastructure/api/common.api'
import {
  SET_FAVOURITES,
  SET_PERSONAL,
  SET_SENTENCES,
  SET_WORDS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { plainToClass } from 'class-transformer'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import Intro from '@/Scandinaver/Intro/Domain/Intro'
import {
  RESET_USER, SET_ACTIVE,
  SET_AUTH,
  SET_USER,
} from '@/Scandinaver/Core/Infrastructure/store/user/mutations.type'
import { SET_PUZZLES } from '@/Scandinaver/Puzzle/Infrastructure/store/mutations.type'
import { SET_TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/mutations.type'
import UserAPI = API.UserAPI
import CommonAPI = commonApi.CommonAPI


@Service()
export class LoginService {
  @Inject()
  private introService: IntroService

  @Inject()
  private commonApi: CommonAPI

  @Inject()
  private userApi: UserAPI

  public login(payload: any): Promise<AxiosResponse<ILoginData>> {
    return new Promise((resolve, reject) => {
      UserAPI.login(payload).then(
        (response) => {
          if (response.status === 200) {
            const token = `Bearer ${response.data.access_token}`
            const cookieName = (process.env.VUE_APP_COOKIE_NAME as string)
              || 'authfrontend._token'
            Vue.$cookies.set(
              cookieName,
              token,
              8600,
              '/',
              process.env.VUE_APP_COOKIE_DOMAIN || '.scandinaver.org',
            )
            window.localStorage.setItem(cookieName, token)
            this.fetchUser(token).then(() => resolve())
          } else {
            reject(response.data.message)
          }
        },
        (response) => {
          reject(response.response.data)
        },
      )
    })
  }

  public checkAuth() {
    return new Promise((resolve, reject) => {
      const cookieName = (process.env.VUE_APP_COOKIE_NAME as string) || 'authfrontend._token'
      const token = Vue.$cookies.get(cookieName)
      const { auth } = store.getters
      if (auth !== false) {
        resolve()
      }
      if (auth === false) {
        if (token !== null) {
          this.fetchUser(token).then(
            () => resolve(),
            () => reject(),
          )
        } else {
          reject()
        }
      }
    })
  }

  public logout() {
    const cookieName = (process.env.VUE_APP_COOKIE_NAME as string) || 'authfrontend._token'
    const token = Vue.$cookies.get(cookieName)
    return UserAPI.logout(token).then((response) => {
      store.commit(SET_AUTH, false)
      store.commit(RESET_USER)
      Vue.$cookies.remove(
        cookieName,
        '/',
        process.env.VUE_APP_COOKIE_DOMAIN || '.scandinaver.org',
      )
    })
  }

  private async fetchUser(token: string) {
    store.commit('setFullscreenLoading', true)

    const response = await this.userApi.fetch(token)

    store.commit(SET_USER, response.data)
    store.commit(SET_AUTH, true)
    store.commit(SET_ACTIVE, response.data.active)
    store.dispatch(INITIALISE_RBAC, response.data)

    await this.reloadStore()
  }

  async reloadStore() {
    const stateResponse = await this.commonApi.getState()
    store.commit(SET_WORDS, plainToClass(Asset, stateResponse.data.words))
    store.commit(SET_SENTENCES, plainToClass(Asset, stateResponse.data.sentences))
    store.commit(SET_PERSONAL, plainToClass(Asset, plainToClass(Asset, stateResponse.data.personal)))
    store.commit(SET_FAVOURITES, plainToClass(Asset, plainToClass(Asset, stateResponse.data.favourite)))
    store.commit(SET_TEXTS, plainToClass(Translate, stateResponse.data.texts))
    store.commit(SET_PUZZLES, plainToClass(Puzzle, stateResponse.data.puzzles))
    store.commit('setSites', stateResponse.data.sites)
    store.commit('setCurrentSite', stateResponse.data.currentsite)
    store.commit('setDomain', stateResponse.data.domain)
    store.commit('setIntro', plainToClass(Intro, stateResponse.data.intro))
    store.commit('setFullscreenLoading', false)

    this.introService.stream.next(true)
    store.commit('setFullscreenLoading', false)
  }
}
