declare module 'vue-user' {
  import { PluginFunction } from 'vue'
  import { IUser } from '@/models/User'

  const install: PluginFunction<{}>

  export { install as default }

  module 'vue/types/vue' {
    interface VueConstructor {
      $user: IUser
    }
    interface Vue {
      $user: IUser
    }
  }
}
