import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'
import { mapGetters } from 'vuex'
import { ACTIVE, PUZZLES } from '@/Scandinaver/Puzzle/Infrastructure/store/getters.type'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'

@Component({
  computed: mapGetters([PUZZLES, ACTIVE])
})
export default class PuzzleWidgetComponent extends BaseWidgetComponent {
  public title = this.$root.$tc('puzzles')
  public readonly puzzles: Puzzle[]
  public readonly active: number
}
