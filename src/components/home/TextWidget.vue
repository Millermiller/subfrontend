<template lang="pug">
  el-col#textwidget(:span=8 :xs=24)
    el-card.widget-block.pointer(shadow='hover' @click.native="goto('/translates')")
      p.widget-title {{title}}
      p.widget-description {{active}}/{{all}}
      el-progress(type='circle' :percentage='percent')
</template>

<script lang="ts">
import Component from 'vue-class-component'
import BaseWidget from '@/components/home/BaseWidget'

@Component({
  name: 'TextWidget',
})
export default class TextWidget extends BaseWidget {
  title = this.$root.$i18n.tc('texts')
  active = this.$store.getters.activeTexts
  all = this.$store.getters.texts.length
  timeout = 400
}
</script>
