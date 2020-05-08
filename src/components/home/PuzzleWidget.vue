<template lang="pug">
  el-col#puzzlewidget(:span=8 :xs=24)
    el-card(shadow="hover" @click.native="goto('/puzzle')").widget-block.pointer
      p.widget-title {{title}}
      p.widget-description {{active}}/{{all}}
      el-progress(type="circle" :percentage="percent")
</template>

<script lang="ts">
import Component from 'vue-class-component'
import BaseWidget from '@/components/home/BaseWidget'

@Component({
  name: 'PuzzleWidget',
})
export default class PuzzleWidget extends BaseWidget {
  public title = this.$root.$i18n.tc('puzzles')

  get all() {
    return this.$store.getters.puzzles.length
  }

  get active() {
    return this.$store.getters.active
  }
}
</script>
