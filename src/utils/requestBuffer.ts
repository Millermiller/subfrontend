import axios from 'axios'
import Vue from 'vue'
import i18n from '@/utils/i18n'
import { Notification } from 'element-ui'

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
    const cookieName = (process.env.VUE_APP_COOKIE_NAME as string) || 'authfrontend._token'
    config.headers.common.Authorization = Vue.$cookies.get(cookieName)
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

requestBuffer.interceptors.response.use(undefined, (error) => {
  if (error.response) {
    Notification.error({
      title: i18n.tc('error'),
      message: error.response.data.message,
      duration: 4000,
    })
  }
  return Promise.reject(error.response.data)
})

export default requestBuffer
