import Component from 'vue-class-component'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class PersonalWidgetComponent extends BaseWidgetComponent {
  public title = this.$root.$tc('personals')

  get all() {
    return this.$store.getters.personal.length
  }

  personal() {
    this.$router.push({
      name: 'CardsPage',
      params: { language: this.currentLanguage, id: this.favouriteId },
    })
  }

  get favouriteId() {
    return store.getters.favouriteAsset.id
  }
}
