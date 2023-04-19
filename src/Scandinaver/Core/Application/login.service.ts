import { AxiosResponse } from 'axios'
import { API, ILoginData } from '@/Scandinaver/Core/Infrastructure/api/user.api'
import Vue from 'vue'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import IntroService from '@/Scandinaver/Intro/Application/intro.service'
import { Inject, Service } from 'vue-typedi'
import { INITIALISE_RBAC } from '@/Scandinaver/RBAC/Infrastructure/store/actions.type'
import {
  RESET_USER, SET_ACTIVE,
  SET_AUTH,
  SET_USER,
} from '@/Scandinaver/Core/Infrastructure/store/user/mutations.type'
import { CommonService } from '@/Scandinaver/Core/Application/common.service'
import UserAPI = API.UserAPI

@Service()
export class LoginService {
  @Inject()
  private readonly commonService: CommonService

  @Inject()
  private readonly introService: IntroService

  @Inject()
  private readonly userApi: UserAPI

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

  public checkAuth(): Promise<any> {
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

  public logout(): Promise<any> {
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

  private async fetchUser(token: string): Promise<void> {
    store.commit('setFullscreenLoading', true)

    const response = await this.userApi.fetch()

    store.commit(SET_USER, response.data)
    store.commit(SET_AUTH, true)
    store.commit(SET_ACTIVE, response.data.active)
    await store.dispatch(INITIALISE_RBAC, response.data)

    await this.commonService.reloadStore()
  }
}
