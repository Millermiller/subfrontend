import Vue from 'vue'
import Component from 'vue-class-component'
import { Inject } from 'vue-typedi'
import PuzzleService from '@Puzzle/Application/puzzle.service'
import {
  ON_BEFORE_PUZZLE_SELECTED,
  PUZZLE_SELECTED,
} from '@/events/events.type'
import PuzzleItemComponent from './puzzle.item.component/index.vue'
import { Puzzle } from '@Puzzle/Domain/Puzzle'

@Component({
  name: 'PuzzleListComponent',
  components: { PuzzleItemComponent },
})
export default class PuzzleListComponent extends Vue {
  @Inject()
  private readonly service: PuzzleService

  public puzzles: Puzzle[] = []
  public loading: boolean = false

  created(): void {
    this.$eventHub.$on(ON_BEFORE_PUZZLE_SELECTED, () => {
      this.puzzles.forEach((puzzle): any => {
        puzzle.active = false
      })
    })
    this.load()
  }

  private async load(): Promise<void> {
    this.loading = true
    this.puzzles = await this.service.getPuzzles()
    this.loading = false
  }

  beforeDestroy(): void {
    this.$eventHub.$off(PUZZLE_SELECTED)
  }
}
