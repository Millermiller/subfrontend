import Vue from 'vue'
import Component from 'vue-class-component'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

// @ts-ignore
@Component
export abstract class BaseWidgetComponent extends Vue {
  protected abstract title: string
  protected abstract link: string

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

  public async goto(): Promise<void> {
    await this.$router.push({
      name: this.link,
      params: { language: this.currentLanguage },
    })
  }
}
