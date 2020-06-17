declare module 'vue-translate' {
  import VueI18n from 'vue-i18n'

  module 'vue/types/vue' {
    interface VueConstructor {
      $tc: typeof VueI18n.prototype.tc
    }
  }
}
