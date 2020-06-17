import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class WordWidgetComponent extends BaseWidgetComponent {
  title = this.$root.$tc('words')

  get all() {
    return this.$store.getters.words.length
  }

  get active() {
    return this.$store.getters.activeWords
  }
}
