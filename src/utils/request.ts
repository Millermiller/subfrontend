import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import { store } from '@/store'

const service = axios.create({

  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.baseURL += `/${store.getters.language}`

    config.headers.common.Authorization = `${window.localStorage.getItem('auth._token.local')}`;

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export default service;
