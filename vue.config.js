const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.output.chunkFilename('js/[name].[id].[chunkhash:8].js')
  },
  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
}
