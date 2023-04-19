import axios, { AxiosResponse } from 'axios'
import ILoginForm from '@/Scandinaver/Core/Domain/Contract/ILoginForm'
import { Service } from 'typedi'
import request from '@/utils/request'

export interface ILoginData {
  state: any
  message: string
  access_token: string
}

export namespace API {
  @Service()
  export class UserAPI {
    public static async login(data: ILoginForm): Promise<AxiosResponse<ILoginData>> {
      const request = axios.create({
        baseURL: process.env.VUE_APP_BASE_API || 'https://api.scandinaver.org',
        timeout: 5000,
      })
      return request.post('/login', data)
    }

    public static async logout(token: string): Promise<AxiosResponse> {
      const request = axios.create({
        baseURL: process.env.VUE_APP_BASE_API || 'https://api.scandinaver.org',
        timeout: 5000,
        headers: {
          post: {
            Authorization: token,
          },
        },
      })
      return request.post('/logout')
    }

    public async fetch(): Promise<AxiosResponse> {
      return request.get('/me')
    }
  }
}
