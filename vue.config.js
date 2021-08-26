const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.output.chunkFilename('js/[name].[id].[chunkhash:8].js')
    config.resolve
      .plugin('tsconfig-paths')
      // eslint-disable-next-line global-require
      .use(require('tsconfig-paths-webpack-plugin'))
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
