declare module 'vue-user' {
  import { PluginFunction } from 'vue'
  import { IUser } from '@/Scandinaver/Core/Domain/User'

  const install: PluginFunction<{}>

  module 'vue/types/vue' {
    interface VueConstructor {
      $user: IUser|undefined
    }
    interface Vue {
      $user: IUser
    }
  }
}
