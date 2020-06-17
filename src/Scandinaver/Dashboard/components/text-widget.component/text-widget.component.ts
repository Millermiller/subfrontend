import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class TextWidgetComponent extends BaseWidgetComponent {
  title = this.$root.$tc('texts')

  get all() {
    return this.$store.getters.texts.length
  }

  get active() {
    return this.$store.getters.activeTexts
  }
}
