import Vue from 'vue';

export default class TokenService {
  public static getToken(): string {
    const tokenName = process.env.VUE_APP_TOKEN_NAME
    return window.localStorage.getItem(tokenName)
  }

  public static getRefreshToken(): string {
    const refreshTokenName = process.env.VUE_APP_REFRESH_TOKEN_NAME
    return window.localStorage.getItem(refreshTokenName)
  }

  public static setToken(token: string): void {
    const tokenName = process.env.VUE_APP_TOKEN_NAME
    console.log(tokenName)
    Vue.$cookies.set(tokenName, token, 8600, '/', process.env.VUE_APP_COOKIE_DOMAIN)
    window.localStorage.setItem(tokenName, token)
  }

  public static setRefreshToken(token: string): void {
    const refreshTokenName = process.env.VUE_APP_REFRESH_TOKEN_NAME as string
    Vue.$cookies.set(refreshTokenName, token, 8600, '/', process.env.VUE_APP_COOKIE_DOMAIN)
    window.localStorage.setItem(refreshTokenName, token)
  }

  public static updateRefreshToken(token: string): void {

  }

  public static deleteToken(): void {
    const tokenName = process.env.VUE_APP_TOKEN_NAME as string
    Vue.$cookies.remove(tokenName, '/', process.env.VUE_APP_COOKIE_DOMAIN)
    window.localStorage.removeItem(tokenName)
  }

  public static deleteRefreshToken(): void {
    const refreshTokenName = process.env.VUE_APP_REFRESH_TOKEN_NAME as string
    Vue.$cookies.remove(refreshTokenName, '/', process.env.VUE_APP_COOKIE_DOMAIN)
    window.localStorage.removeItem(refreshTokenName)
  }
}
