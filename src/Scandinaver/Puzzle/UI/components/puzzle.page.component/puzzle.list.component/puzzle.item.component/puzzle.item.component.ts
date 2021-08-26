import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import {
  ON_BEFORE_PUZZLE_SELECTED,
  PUZZLE_SELECTED,
} from '@/events/events.type'
import { Puzzle } from '@Puzzle/Domain/Puzzle'

@Component({
  name: 'PuzzleItemComponent',
})
export default class PuzzleItemComponent extends Vue {
  @Prop({ required: true })
  public puzzle: Puzzle

  @Prop({ required: true })
  public index: number

  public createPuzzle(puzzle: Puzzle): void {
    this.$eventHub.$emit(ON_BEFORE_PUZZLE_SELECTED)
    this.$eventHub.$emit(PUZZLE_SELECTED, puzzle)
  }
}
