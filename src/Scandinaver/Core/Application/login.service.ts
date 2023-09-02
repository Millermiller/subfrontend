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
import TokenService from '@/App/Core/Application/token.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';

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
            const decoded = jwtDecode<JwtPayload>(response.data.token)
            const { token } = response.data
            const { refreshToken } = response.data
            TokenService.setToken(token)
            TokenService.setRefreshToken(refreshToken)
            this.fetchUser(`Bearer ${token}`).then(() => resolve())
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
      const token = TokenService.getToken()
      const { auth } = store.getters
      if (auth !== false) {
        resolve()
      }
      if (auth === false) {
        if (token !== null) {
          this.fetchUser(`Bearer ${token}`).then(
            () => resolve(),
            () => reject(),
          )
        } else {
          reject()
        }
      }
    })
  }

  public logout(): void {
    TokenService.deleteToken()
    TokenService.deleteRefreshToken()
    store.commit('setAuth', false)
    store.commit('resetUser')
  }

  private async fetchUser(token: string): Promise<void> {
    store.commit('setFullscreenLoading', true)

    const response = await this.userApi.fetch(token)

    store.commit(SET_USER, response.data)
    store.commit(SET_AUTH, true)
    store.commit(SET_ACTIVE, response.data.active)
    await store.dispatch(INITIALISE_RBAC, response.data)

    await this.commonService.reloadStore()
  }
}
