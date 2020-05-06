import { AxiosResponse } from 'axios'
import userAPI, { ILoginData } from '@/api/userAPI'
import Vue from 'vue'
import { store } from '@/store'

export class LoginService {
  public static login(payload: any): Promise<AxiosResponse<ILoginData>> {
    return new Promise((resolve, reject) => {
      userAPI.login(payload).then(
        (response) => {
          if (response.status === 200) {
            const token = `Bearer ${response.data.access_token}`
            Vue.$cookies.set('authfrontend._token.local', token, 90, '/', '.scandinaver.local')
            window.localStorage.setItem('authfrontend._token.local', token)
            this.fetchUser(token).then(() => resolve())
          } else {
            reject(response.data.message)
          }
        },
        (response) => {
          reject(response.response.data.message)
        },
      )
    })
  }

  public static checkAuth() {
    return new Promise((resolve, reject) => {
      const token = Vue.$cookies.get('authfrontend._token.local')
      if (Vue.$user !== undefined) {
        resolve()
      }
      if (Vue.$user === undefined) {
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

  public static logout() {
    return userAPI.logout()
  }

  private static fetchUser(token: string) {
    return new Promise((resolve, reject) => {
      store.commit('setFullscreenLoading', true)
      userAPI
        .fetch(token)
        .then(
          (response) => {
            Vue.$user = response.data
            store.commit('setUser', response.data)
            store.commit('setAuth', true)
            store.commit('setSelection', 0)
            store.dispatch('reloadStore').then((response) => {
              resolve()
            })
          },
          () => reject(),
        )
        .finally(() => store.commit('setFullscreenLoading', false))
    })
  }
}
