import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class PuzzleWidgetComponent extends BaseWidgetComponent {
  public title = this.$root.$tc('puzzles')

  get all() {
    return this.$store.getters.puzzles.length
  }

  get active() {
    return this.$store.getters.active
  }
}
