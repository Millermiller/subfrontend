export default class LanguageService {
  public static extract(): string {
    const hostnameArr = window.location.pathname.split('/')

    if (hostnameArr[1].length === 2) {
      return hostnameArr[1]
    }
    return 'is'
  }
}
