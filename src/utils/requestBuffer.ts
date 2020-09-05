import axios from 'axios'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import Vue from 'vue'

const requestBuffer = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.VUE_APP_BASE_API
    : 'https://api.scandinaver.org',
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
requestBuffer.interceptors.request.use(
  (config) => {
    config.responseType = 'arraybuffer'
    config.baseURL += `/${store.getters.language}`
    config.headers.common.Authorization = Vue.$cookies.get('authfrontend._token.local')
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

requestBuffer.interceptors.response.use(undefined, (error) => {
  if (error.response) {
    Vue.$notify.error({
      title: Vue.$tc('error'),
      message: error.response.data.message,
      duration: 4000,
    })
  }
  return Promise.reject(error.response.data)
})

export default requestBuffer
