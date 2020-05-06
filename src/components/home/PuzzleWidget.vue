<template lang="pug">
  el-col#puzzlewidget(:span=8 :xs=24)
    el-card(shadow="hover" @click.native="goto('/puzzle')").widget-block.pointer
      p.widget-title {{title}}
      p.widget-description {{active}}/{{all}}
      el-progress(type="circle" :percentage="percent")
</template>

<script lang="ts">
import Component from 'vue-class-component'
import puzzleAPI from '@/api/puzzleAPI'
import BaseWidget from '@/components/home/BaseWidget'

@Component({
  name: 'PuzzleWidget',
})
export default class PuzzleWidget extends BaseWidget {
  public title = this.$root.$i18n.tc('puzzles')
  public active = 0
  public all = 0
  timeout = 0

  created() {
    puzzleAPI.getPuzzles().then((response: any) => {
      this.all = response.data.length
      response.data.forEach((element: any, index: any, array: any) => {
        if (element.success) this.active++
      })
    }).then(() => {
      this.percent = Math.round((100 * this.active) / this.all) || 0
    })
  }
}
</script>
