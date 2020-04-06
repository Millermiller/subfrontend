import axios, { AxiosResponse } from 'axios'
import request from '@/utils/request'
import ILoginForm from '@/api/ILoginForm'
import IState from '@/models/State'

export interface ILoginData {
  state: IState
  message: string,
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
}
