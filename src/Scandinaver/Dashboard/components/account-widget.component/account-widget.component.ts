import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from '@/utils/getter.decorator'
import { USER } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'
import { User } from '@/Scandinaver/Core/Domain/User'

@Component({ name: 'AccountWidgetComponent' })
export default class AccountWidgetComponent extends Vue {
  @Getter(USER)
  private readonly user: User

  color(value?: number): string {
    if (value === 2) {
      return 'text-center plan-title red-plan'
    }
    if (value === 3) {
      return 'text-center plan-title blue-plan'
    }
    return 'text-center plan-title green-plan'
  }
}
