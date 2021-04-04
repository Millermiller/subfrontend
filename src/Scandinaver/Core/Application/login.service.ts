import { AxiosResponse } from 'axios'
import { API, ILoginData } from '@/Scandinaver/Core/Infrastructure/api/userAPI'
import Vue from 'vue'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import IntroService from '@/Scandinaver/Intro/Application/intro.service'
import { Inject, Service } from 'vue-typedi'
import { INITIALISE_RBAC } from '@/Scandinaver/RBAC/Infrastructure/store/actions.type'
import UserAPI = API.UserAPI

@Service()
export class LoginService {
  @Inject()
  private introService: IntroService

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
      store.commit('setAuth', false)
      store.commit('resetUser')
      Vue.$cookies.remove(
        cookieName,
        '/',
        process.env.VUE_APP_COOKIE_DOMAIN || '.scandinaver.org',
      )
    })
  }

  private fetchUser(token: string) {
    return new Promise((resolve, reject) => {
      store.commit('setFullscreenLoading', true)
      UserAPI.fetch(token)
        .then(
          (response) => {
            store.commit('setUser', response.data)
            store.commit('setAuth', true)
            store.commit('setActive', response.data.active)
            store.dispatch('reloadStore').then((r) => {
              store.dispatch(INITIALISE_RBAC, response.data).then(() => {
                resolve()
              })
            })
          },
          () => reject(),
        )
        .finally(() => {
          store.commit('setFullscreenLoading', false)
          this.introService.stream.next(true)
        })
    })
  }
}
