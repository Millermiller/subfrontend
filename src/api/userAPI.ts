import axios, { AxiosResponse } from 'axios'
import request from '@/utils/request'
import ILoginForm from '@/api/ILoginForm'
import IState from '@/models/State'
import { store } from '@/store'

export interface ILoginData {
  state: IState
  message: string
  access_token: string
}

export default {
  login(data: ILoginForm): Promise<AxiosResponse<ILoginData>> {
    const request = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 5000,
    })
    return request.post('/login', data)
  },
  logout(): Promise<AxiosResponse> {
    return request.post('/logout')
  },
  fetch(token: string): Promise<AxiosResponse> {
    const request = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 5000,
      headers: {
        get: {
          Authorization: token,
        },
      },
    })
    return request.get('/user')
  },
}
