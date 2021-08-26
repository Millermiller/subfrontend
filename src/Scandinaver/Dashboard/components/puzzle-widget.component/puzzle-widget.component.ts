import Component from 'vue-class-component'
import { mapGetters } from 'vuex'
import { ACTIVE, PUZZLES } from '@/Scandinaver/Puzzle/Infrastructure/store/getters.type'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { BaseWidgetComponent } from '@/Scandinaver/Dashboard/components/base-widget.component/base-widget.component'
import { PUZZLE_PAGE } from '@/Scandinaver/Puzzle/routes'

@Component({
  computed: mapGetters([PUZZLES, ACTIVE])
})
export default class PuzzleWidgetComponent extends BaseWidgetComponent {
  public title = this.$root.$tc('puzzles')
  public readonly puzzles: Puzzle[]
  public readonly active: number
  protected link = PUZZLE_PAGE
}
