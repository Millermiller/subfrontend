<template lang="pug">
  el-col#wordwidget(:span=8 :xs=24)
    el-card.widget-block.pointer(shadow="hover" @click.native="goto('/learn')")
      p.widget-title {{title}}
      p.widget-description {{active}}/{{all}}
      el-progress(type="circle" :percentage="percent")
</template>

<script lang="ts">
import Component from 'vue-class-component'
import BaseWidget from '@/components/home/BaseWidget'

@Component({
  name: 'WordWidget',
})
export default class WordWidget extends BaseWidget {
  title = this.$root.$i18n.tc('words')

  get all() {
    return this.$store.getters.words.length
  }

  get active() {
    return this.$store.getters.activeWords
  }
}
</script>
