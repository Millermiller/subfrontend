import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import { TRANSLATE_PAGE } from '@/Scandinaver/Translate/routes'

@Component({
  name: 'TranslateItemComponent',
})
export default class TranslateItemComponent extends Vue {
  @Prop({ required: true })
  private translate: Translate

  get currentLanguage(): string {
    return store.getters.language
  }

  get buttonType() {
    return !this.translate.available
      ? 'info'
      : this.translate.active
        ? 'primary'
        : 'warning'
  }

  get buttonText(): string {
    if (!this.translate.available) {
      return this.$tc('notAvailable')
    }
    if (this.translate.active) {
      return this.$tc('goTo')
    }
    return this.$tc('closed')
  }

  goToText() {
    if (this.translate.active && this.translate.available) {
      this.$router.push({
        name: TRANSLATE_PAGE,
        params: { language: this.currentLanguage, id: this.translate.getId().toString() },
      })
    }
  }
}
