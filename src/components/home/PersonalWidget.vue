<template lang="pug">
  el-col#personalwidget(:span=8 :xs=24)
    el-card(shadow='hover' @click.native='personal()').widget-block.personal-widget-block.pointer
      p.widget-title {{title}}
      p.widget-description {{all}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'PersonaWidget',
})
export default class extends Vue {
  private title = this.$root.$i18n.tc('personals')

  get all() {
    return this.$store.getters.personal.length
  }

  personal() {
    this.$router.push('/cards')
  }
}
</script>
<style>
.personal-widget-block .widget-description {
  width: 100%;
  text-align: right;
  padding-right: 10px;
  font-size: 48px;
}
</style>
