import { AxiosResponse } from 'axios';
import userAPI, { ILoginData } from '@/api/userAPI'
import Vue from 'vue';

export class LoginService {
  public static execute(payload: any): Promise<AxiosResponse<ILoginData>> {
    return new Promise((resolve, reject) => {
      userAPI.login(payload).then((response) => {
        if (response.status === 200) {
          Vue.$cookies.set('auth._token.local', `Bearer ${response.data.access_token}`);
          window.localStorage.setItem('auth._token.local', `Bearer ${response.data.access_token}`)
          resolve(response)
        } else {
          reject(response.data.message)
        }
      }, (response) => {
        reject(response.response.data.message)
      })
    })
  }

  public static logout() {
    return userAPI.logout()
  }
}
