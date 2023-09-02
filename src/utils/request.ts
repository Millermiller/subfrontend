import axios from 'axios'
import Vue from 'vue'
import { Notification } from 'element-ui';
import i18n from '@/utils/i18n'
import TokenService from '@/App/Core/Application/token.service';
import { deserialize } from 'json-api-deserialize'
import { store } from '@/Scandinaver/Core/Infrastructure/store';
import router from '@/router';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
request.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken()
    config.headers.common.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    Promise.reject(error).then(r => console.log(r))
  },
)

request.interceptors.response.use(response => ({
  ...response,
  ...deserialize(response.data),
}), async (error) => {
  const originalConfig = error.config
  if (error.response.status === 403) {
    store.commit('setAuth', false)
    store.commit('resetUser')
    await router.push('/login')
  }
  if (error.response.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;
    delete request.defaults.headers.common.Authorization;
    const rs = await request.post('/api/token/refresh', {
      refresh_token: TokenService.getRefreshToken(),
    }, {
      headers: { Authorization: '' }
    });
    originalConfig.headers.Authorization = `Bearer ${rs.data.token}`;
    TokenService.setToken(rs.data.token);
    TokenService.setRefreshToken(rs.data.refreshToken);
    return request(originalConfig);
  }
  if (error.response) {
    Notification.error({
      title: i18n.tc('error'),
      message: error.response.data,
      duration: 4000,
    })
  }
  return Promise.reject(error.response.data)
})

export default request
