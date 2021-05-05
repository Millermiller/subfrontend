<template>
  <i class="el-icon-d-arrow-right hidden-sm-and-up" id="left-menu" @click="showLeftMenu"></i>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as events from '@/events/events.type'

@Component({
  name: 'LeftMenuButton',
})
export default class LeftMenuButton extends Vue {
  showLeftMenu(): void {
    this.$store.commit('setLeftMenuOpen', true)
    this.$store.commit('setRightMenuOpen', false)
  }
}
</script>

<style>
#left-menu {
  position: relative;
  padding: 15px 0;
  font-size: 30px;
}
</style>
