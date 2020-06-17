import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class PersonalWidgetComponent extends BaseWidgetComponent {
  public title = this.$root.$tc('personals')

  get all() {
    return this.$store.getters.personal.length
  }

  personal() {
    this.$router.push('/cards')
  }
}
