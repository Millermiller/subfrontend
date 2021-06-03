<template>
  <el-col class="right-panel" :span="8" :xs="{ span: 24, offset: 0 }">
    <el-card class="box-card puzzle-wrapper" v-loading.body="loading">
      <template>
        <PuzzleItemComponent
          v-for="(puzzle, index) in puzzles"
          :key="index"
          :index="index"
          :puzzle="puzzle"
        >
        </PuzzleItemComponent>
      </template>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PuzzleItemComponent from '@/Scandinaver/Puzzle/UI/PuzzleItemComponent.vue'
import { Inject } from 'vue-typedi'
import PuzzleService from '@/Scandinaver/Puzzle/Application/puzzle.service'
import {
  ON_BEFORE_PUZZLE_SELECTED,
  PUZZLE_SELECTED,
} from '@/events/events.type'
import { Puzzle } from '../Domain/Puzzle'

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
</script>

<style lang="scss" scoped></style>
