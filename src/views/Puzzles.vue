<template lang="pug">
  el-container
    el-main
      a#right-menu(@click="toggleRightMenu")
        button.navbar-toggle.collapsed
          span.icon-bar
          span.icon-bar
          span.icon-bar
      el-row(:gutter="20", type="flex", justify="center")
        el-col(:lg="{span: 12}", :xs="{span: 24, offset: 0}")
          el-card.box-card(:style="{position: 'relative'}")
            vue-progress-bar

            h3.text-center {{text}}
              i(@click="refresh", v-if="activePuzzle", :class="['ion', 'ion-android-refresh', 'pointer', {'rotating': isRotate}]")

            div.drop-wrapper
              drop.drop.list.zone.class(
                v-for="(zone, index) in dropzones",
                :key="index",
                @drop="handleDrop(zone, ...arguments)",
                @dragenter="handleDragEnter(zone, ...arguments)",
                @dragleave="handleDragLeave(zone, ...arguments)")
                transition(name="bounce")
                  drag.drag(
                    :key="item",
                    v-for="item in zone.content",
                    :transfer-data="{zone: zone, item: item, list: zone.content}") {{ item }}


            el-row(:gutter="20", type="flex", justify="center")
              el-col(:span="14", v-if="activePuzzle")
                p(:style="{margin: '20px 0'}") {{$t('placeInCorrectOrder')}}
                  i.ion.ion-android-arrow-up
              el-col(:span="14", v-else)
                p.text-center(:style="{margin: '20px 0'}") {{$t('selectSentence')}}
                i.ion.ion-arrow-right-c(style="font-size: 16px")

            el-row(:gutter="20", type="flex", justify="center")
              el-col(:span="20")
                drop(:class="['drop-wrapper', {'gray-bordered': shufflewords.length > 0}]" @drop="handleBackDrop(shufflewords, ...arguments)")
                  drag(
                    v-for="item in shufflewords",
                    class="drag elem",
                    :key="item",
                    :transfer-data="{ item: item, list: shufflewords, example: 'lists' }") {{ item }}

        el-col.right-panel(:span="8" ,:xs="{span: 24, offset: 0}")
          el-card.box-card.puzzle-wrapper(v-loading.body="loading")
            template
              el-tooltip(
                v-for="(puzzle, index) in puzzles",
                :key="index" class="item" effect="dark",
                :content="puzzle.text",
                placement="top-start")
                div(:class="['puzzle-item', {active: puzzle.active, success: puzzle.success}]", @click="createPuzzle(puzzle)").
                  {{index + 1}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { AxiosError, AxiosResponse } from 'axios'
// import Item from '@/components/puzzle/Item.vue'
import puzzleApi from '@/api/puzzleAPI'

import { IPuzzle } from '@/models/Puzzle'

@Component({
  name: 'Puzzles',
  components: {
    //   Item,
  },
})
export default class Puzzles extends Vue {
  metaInfo: any = { title: 'Паззлы' }

  private puzzles: IPuzzle[] = []
  private activePuzzle?: IPuzzle | null = null
  private text: string = ''
  private translate: string = ''
  private words: string[] = []
  protected shufflewords: string[] = []
  protected dropzones: {}[] = []
  private success: number = 0
  private words_count: number = 0
  private isRotate: boolean = false
  private loading: boolean = false
  private visible: boolean = false

  created() {
    this.load()
  }

  load() {
    this.loading = true
    puzzleApi.getPuzzles().then(
      (response: AxiosResponse) => {
        this.puzzles = response.data
        this.loading = false
      },
      (response: AxiosError) => {
        console.log(response.message)
      },
    )
  }

  createPuzzle(puzzle: IPuzzle) {
    this.puzzles.forEach((puzzle): any => {
      puzzle.active = false
    })
    this.success = 0
    this.$Progress.set(0)
    this.activePuzzle = puzzle
    puzzle.active = true
    this.text = puzzle.text
    this.translate = puzzle.translate
    this.words = this.translate.split(' ')
    this.shufflewords = this.shuffle(this.translate.split(' '))
    this.words_count = this.words.length
    this.dropzones = []

    for (let i = 0; i < this.words.length; i++) {
      this.dropzones.push({
        for: this.words[i],
        content: [],
        class: 'dragover',
      })
    }
  }

  private shuffle = (data: string[]): string[] => {
    let i = data.length
    let j
    let tmp

    if (i === 0) {
      return data
    }

    while (--i) {
      j = Math.floor(Math.random() * (i + 1))
      tmp = data[i]
      data[i] = data[j]
      data[j] = tmp
    }
    return data
  }

  handleDrop(toList: any, data: any) {
    const fromList = data.list
    if (data.item === toList.for) {
      toList.content.push(data.item)
      fromList.splice(fromList.indexOf(data.item), 1)
      this.success++
      this.$Progress.set(Math.floor((this.success * 100) / this.words_count))

      if (this.$Progress.get() === 100) {
        this.attach(this.activePuzzle!)
      }
    } else {
      toList.class = 'dragover'
    }
  }

  handleBackDrop(toList: any, data: any) {
    const fromList = data.list

    if (data.zone) {
      toList.push(data.item)
      fromList.splice(fromList.indexOf(data.item), 1)
      data.zone.class = 'dragover'
      this.success--
      this.$Progress.set(Math.floor((this.success * 100) / this.words_count))
    }
  }

  handleDragEnter = (ev: any): void => {
    ev.class = 'dragenter'
  }

  handleDragLeave = (ev: any): void => {
    if (!ev.content.length) ev.class = 'dragover'
  }

  refresh() {
    const self = this
    this.isRotate = true
    this.words = this.translate.split(' ')
    this.shufflewords = this.shuffle(this.translate.split(' '))
    this.dropzones = []
    this.$Progress.set(0)
    this.success = 0
    this.words_count = this.words.length

    for (let i = 0; i < this.words.length; i++) {
      this.dropzones.push({
        for: this.words[i],
        content: [],
        class: 'dragover',
      })
    }

    setTimeout(() => {
      self.isRotate = false
    }, 1000)
  }

  toggleRightMenu() {
    this.visible = !this.visible
    this.$store.dispatch('toggleMenuOpen')
    this.$store.dispatch('toggleBackdrop')
  }

  attach(puzzle: IPuzzle) {
    puzzleApi.processPuzzle(puzzle).then(
      (response) => {
        this.$notify.success({
          title: 'Все правильно!',
          message: '',
          duration: 2000,
        })
        puzzle.success = true
      },
      (response) => {
        console.log(response)
      },
    )
  }
}
</script>
<style>
.puzzle-wrapper > .el-card__body {
  display: flex;
  flex-wrap: wrap;
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
.drag,
.drop {
  font-family: sans-serif;
  position: relative;
  text-align: center;
  vertical-align: top;
}
.drag {
  padding: 5px 10px;
  cursor: grab;
}
.drop {
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
}
.ion-android-refresh:hover {
  color: #ff4949;
}
</style>
