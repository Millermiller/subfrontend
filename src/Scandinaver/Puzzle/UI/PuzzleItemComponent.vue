<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="puzzle.text"
    placement="top-start"
  >
    <div
      :class="[
        'puzzle-item',
        { active: puzzle.active, success: puzzle.success },
      ]"
      @click="createPuzzle(puzzle)"
    >
      {{ index + 1 }}
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import {
  ON_BEFORE_PUZZLE_SELECTED,
  PUZZLE_SELECTED,
} from '@/events/events.type'
import { Puzzle } from '../Domain/Puzzle'

@Component({
  name: 'PuzzleItemComponent',
})
export default class PuzzleItemComponent extends Vue {
  @Prop({ required: true })
  private puzzle: Puzzle

  @Prop({ required: true })
  private index: number

  createPuzzle(puzzle: Puzzle) {
    this.$eventHub.$emit(ON_BEFORE_PUZZLE_SELECTED)
    this.$eventHub.$emit(PUZZLE_SELECTED, puzzle)
  }
}
</script>

<style lang="scss" scoped></style>
