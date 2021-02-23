<template>
  <el-container>
    <el-main>
      <RightMenuButton></RightMenuButton>
      <template v-if="!access">Forbidden</template>
      <el-row v-if="access" :gutter="20" type="flex" justify="center">
        <el-col :lg="{ span: 12 }" :xs="{ span: 24, offset: 0 }">
          <el-card class="box-card" :style="{ position: 'relative' }">
            <vue-progress-bar></vue-progress-bar>
            <h3 class="text-center" v-if="puzzle.text">
              {{ puzzle.text }}
              <i
                @click="refresh(puzzle)"
                v-if="puzzle"
                :class="[
                  'el-icon-refresh-right',
                  'pointer',
                  { rotating: isRotate },
                ]"
              ></i>
            </h3>
            <div class="drop-wrapper">
              <drop
                class="drop list zone class"
                v-for="(zone, index) in dropZones"
                :key="index"
                @drop="handleDrop(zone, ...arguments)"
                @dragenter="handleDragEnter(zone, ...arguments)"
                @dragleave="handleDragLeave(zone, ...arguments)"
              >
                <transition name="bounce">
                  <drag
                    class="drag"
                    :key="index"
                    v-for="(item, index) in zone.content"
                    :transfer-data="{
                      zone: zone,
                      item: item,
                      list: zone.content,
                    }"
                    >{{ item.word }}
                  </drag>
                </transition>
              </drop>
            </div>
            <el-row :gutter="20" type="flex" justify="center">
              <el-col :span="14" v-if="puzzle">
                <p :style="{ margin: '20px 0' }" class="text-center">
                  {{ $t('placeInCorrectOrder') }}
                  <i class="el-icon-d-caret"></i>
                </p>
              </el-col>
              <el-col :span="14" v-else>
                <p class="text-center" :style="{ margin: '20px 0' }">
                  {{ $t('selectSentence') }}
                </p>
                <i class="ion ion-arrow-right-c" style="font-size: 16px"></i>
              </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="center">
              <el-col :span="20">
                <drop
                  v-if="puzzle.pieces"
                  :class="[
                    'drop-wrapper',
                    { 'gray-bordered': puzzle.pieces.count() > 0 },
                  ]"
                  @drop="handleBackDrop(puzzle.pieces, ...arguments)"
                >
                  <drag
                    class="drag elem"
                    v-for="item in puzzle.pieces.all()"
                    :key="item.word"
                    :transfer-data="{
                      item: item,
                      list: puzzle.pieces.all(),
                      example: 'lists',
                    }"
                    >{{ item.word }}
                  </drag>
                </drop>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <PuzzleListComponent></PuzzleListComponent>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { Inject } from 'vue-typedi'
import PuzzleService from '@/Scandinaver/Puzzle/Application/puzzle.service'
import { PUZZLE_SELECTED } from '@/events/events.type'
import * as events from '@/events/events.type'
import PuzzleListComponent from '@/Scandinaver/Puzzle/UI/PuzzleListComponent.vue'
import RightMenuButton from '@/Scandinaver/Core/UI/RightMenuButton.vue'
import PieceCollection from '@/Scandinaver/Puzzle/Domain/PieceCollection'
import { Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  name: 'PuzzleComponent',
  components: { PuzzleListComponent, RightMenuButton },
})
export default class PuzzleComponent extends Vue {
  @Inject()
  private service: PuzzleService

  private access: boolean = false
  public puzzle: Puzzle = new Puzzle()
  public words: string[] = []
  public dropZones: {}[] = []
  public success: number = 0
  public isRotate: boolean = false
  private wordsCount: number = 0

  created() {
    this.access = this.$ability.can(this.$route.meta.permission)
    this.$eventHub.$on(events.PUZZLE_SELECTED, this.createPuzzle)
  }

  @Watch('$route')
  private onRouteChange(route: Route) {
    this.access = this.$ability.can(route.meta.permission)
  }

  async createPuzzle(puzzle: Puzzle) {
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

  async refresh(puzzle: Puzzle) {
    this.isRotate = true
    await this.createPuzzle(puzzle)
    setTimeout(() => {
      this.isRotate = false
    }, 1000)
  }

  handleDrop(toList: any, data: any) {
    const fromList = data.list
    if (data.item.word === toList.for) {
      toList.content.push(data.item)
      fromList.splice(fromList.indexOf(data.item), 1)
      this.success++
      this.$Progress.set(Math.floor((this.success * 100) / this.wordsCount))

      if (this.$Progress.get() === 100) {
        this.attach(this.puzzle!)
      }
    } else {
      toList.class = 'dragover'
    }
  }

  handleBackDrop(toList: PieceCollection, data: any) {
    const fromList = data.list
    if (data.zone) {
      toList.add(data.item)
      fromList.splice(fromList.indexOf(data.item), 1)
      data.zone.class = 'dragover'
      this.success--
      this.$Progress.set(Math.floor((this.success * 100) / this.wordsCount))
    }
  }

  handleDragEnter = (ev: any): void => {
    ev.class = 'dragenter'
  }

  handleDragLeave = (ev: any): void => {
    if (!ev.content.length) ev.class = 'dragover'
  }

  async attach(puzzle: Puzzle) {
    await this.service.processPuzzle(puzzle)
    this.$notify.success({
      title: this.$tc('puzzleComplete'),
      message: '',
      duration: 2000,
    })
  }

  beforeDestroy() {
    this.$eventHub.$off(PUZZLE_SELECTED)
  }
}
</script>
<style lang="scss">
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
.puzzle-wrapper {
  > .el-card__body {
    display: flex;
    flex-wrap: wrap;
  }
}
.puzzle-item {
  border: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.puzzle-item.success {
  color: #13ce66;
}
.puzzle-item.active {
  color: #ff4949;
}
.drag {
  font-family: sans-serif;
  position: relative;
  text-align: center;
  vertical-align: top;
  padding: 5px 10px;
  cursor: grab;
}
.drop {
  font-family: sans-serif;
  position: relative;
  text-align: center;
  vertical-align: top;
  background: #fff;
  border: 1px solid #ccc;
  height: 50px;
  min-width: 50px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dragenter {
  border-color: rgb(32, 160, 255);
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
.rotating {
  animation: loading-rotate 0.5s linear 1;
}
.drop-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.drag.elem {
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 5px;
}
.gray-bordered {
  border: 1px solid #e7e7e7;
}
.ion-android-refresh {
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover {
    color: #ff4949;
  }
}
</style>
