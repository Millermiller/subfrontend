<template lang="pug">
  el-col#sentencewidget(:span=8 :xs=8)
    el-card.widget-block.pointer(shadow='hover' @click.native="goto('/learn')")
      p.widget-title {{title}}
      p.widget-description {{active}}/{{all}}
      el-progress(type='circle', :percentage='percent')
</template>

<script lang="ts">
import Component from 'vue-class-component'
import BaseWidget from '@/components/home/BaseWidget'

@Component({
  name: 'SentenceWidget',
})
export default class SentenceWidget extends BaseWidget {
  title = this.$root.$i18n.tc('sentences')

  get all() {
    return this.$store.getters.sentences.length
  }

  get active() {
    return this.$store.getters.activeSentences
  }

  goto() {
    this.$store.dispatch('setActiveAssetType', 2)
    this.$router.push('/learn')
  }
}
</script>
