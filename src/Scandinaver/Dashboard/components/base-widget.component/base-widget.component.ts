import Vue from 'vue'
import Component from 'vue-class-component'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component
export default class BaseWidgetComponent extends Vue {
  title: string

  get all(): number {
    return 0
  }

  get completed(): number {
    return 0
  }

  get percent() {
    return Math.round((100 * this.completed) / this.all) || 0
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  goto(routeName: string) {
    this.$router.push({
      name: routeName,
      params: { language: this.currentLanguage },
    })
  }
}
