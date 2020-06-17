declare module 'vue-notify' {
  import { IUser } from '@/Scandinaver/Core/Domain/User'
  import { ElNotification } from 'element-ui/types/notification'

  module 'vue/types/vue' {
    interface VueConstructor {
      $notify: ElNotification
    }
    interface Vue {
      $notify: ElNotification
    }
  }
}
