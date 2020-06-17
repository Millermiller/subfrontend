import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'AccountWidgetComponent' })
export default class AccountWidgetComponent extends Vue {
  color(value?: number): string {
    if (value === 2) {
      return 'text-center plan-title red-plan'
    }
    if (value === 3) {
      return 'text-center plan-title blue-plan'
    }
    return 'text-center plan-title green-plan'
  }

  get user() {
    return this.$store.getters.user
  }

  get plan() {
    return this.$store.getters.plan
  }

  get active_to() {
    return this.$store.getters.active_to
  }
}
