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
            const cookieName = process.env.VUE_APP_COOKIE_NAME as string
            Vue.$cookies.set(cookieName, token, 8600, '/', process.env.VUE_APP_COOKIE_DOMAIN)
            window.localStorage.setItem(cookieName, token)
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
      const cookieName = process.env.VUE_APP_COOKIE_NAME as string
      const token = Vue.$cookies.get(cookieName)
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
    const cookieName = process.env.VUE_APP_COOKIE_NAME as string
    const token = Vue.$cookies.get(cookieName)
    return userAPI.logout(token).then((response) => {
      store.commit('setAuth', false)
      Vue.$cookies.remove(cookieName, '/', process.env.VUE_APP_COOKIE_DOMAIN)
    })
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
            store.commit('setActive', response.data.premium)
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
