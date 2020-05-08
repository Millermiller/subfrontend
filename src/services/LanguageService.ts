export default class LanguageService {
  public static extract(): string {
    const hostnameArr = window.location.hostname.split('.')

    if (hostnameArr.length === 3 && hostnameArr[0].length === 2) {
      return hostnameArr[0]
    }
    return ''
  }
}
