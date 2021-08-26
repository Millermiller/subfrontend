import Vue from 'vue'
import Component from 'vue-class-component'
import { Puzzle } from '@Puzzle/Domain/Puzzle'
import { Inject } from 'vue-typedi'
import { PUZZLE_SELECTED } from '@/events/events.type'
import * as events from '@/events/events.type'
import RightMenuButton from '@/Scandinaver/Core/UI/RightMenuButton.vue'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import Piece from '@Puzzle/Domain/Piece'
import PuzzleListComponent from './puzzle.list.component/index.vue'
import PuzzleService from '@Puzzle/Application/puzzle.service'

@Component({
  name: 'PuzzleComponent',
  components: { PuzzleListComponent, RightMenuButton },
})
export default class PuzzleComponent extends Vue {
  @Inject()
  private readonly service: PuzzleService

  public access: boolean = false
  public puzzle: Puzzle = new Puzzle()
  public words: string[] = []
  public dropZones: {}[] = []
  public success: number = 0
  public isRotate: boolean = false
  public wordsCount: number = 0

  created(): void {
    this.access = this.$ability.can(this.$route.meta.permission)
    this.$eventHub.$on(events.PUZZLE_SELECTED, this.createPuzzle)
  }

  private async createPuzzle(puzzle: Puzzle): Promise<void> {
    this.puzzle = this.service.create(puzzle)
    puzzle.active = true
    this.success = 0
    this.$Progress.set(0)
    this.wordsCount = this.puzzle.pieces.count()
    this.words = this.puzzle.translate.split(' ')
    this.dropZones = []

    for (let i = 0; i < this.words.length; i++) {
      this.dropZones.push({
        for: this.words[i],
        content: [],
        class: 'dragover',
      })
    }
  }

  public async refresh(puzzle: Puzzle): Promise<void> {
    this.isRotate = true
    await this.createPuzzle(puzzle)
    setTimeout(() => {
      this.isRotate = false
    }, 1000)
  }

  public async handleDrop(toList: any, data: any): Promise<void> {
    const fromList = data.list
    if (data.item.word === toList.for) {
      toList.content.push(data.item)
      fromList.splice(fromList.indexOf(data.item), 1)
      this.success++
      this.$Progress.set(Math.floor((this.success * 100) / this.wordsCount))

      if (this.$Progress.get() === 100) {
        await this.attach(this.puzzle!)
      }
    } else {
      toList.class = 'dragover'
    }
  }

  public handleBackDrop(toList: Collection<Piece>, data: any): void {
    const fromList = data.list
    if (data.zone) {
      toList.add(data.item)
      fromList.splice(fromList.indexOf(data.item), 1)
      data.zone.class = 'dragover'
      this.success--
      this.$Progress.set(Math.floor((this.success * 100) / this.wordsCount))
    }
  }

  public handleDragEnter = (ev: any): void => {
    ev.class = 'dragenter'
  }

  public handleDragLeave = (ev: any): void => {
    if (!ev.content.length) ev.class = 'dragover'
  }

  private async attach(puzzle: Puzzle): Promise<void> {
    await this.service.processPuzzle(puzzle)
    this.$notify.success({
      title: this.$tc('puzzleComplete'),
      message: '',
      duration: 2000,
    })
  }

  beforeDestroy(): void {
    this.$eventHub.$off(PUZZLE_SELECTED)
  }
}
