<template>
  <a id="left-menu" @click="showLeftMenu">
    <button class="navbar-toggle collapsed">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span></button
  ></a>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as events from '@/events/events.type'

@Component({
  name: 'LeftMenuButton',
})
export default class LeftMenuButton extends Vue {
  showLeftMenu = (): void => {
    this.$eventHub.$emit(events.TOGGLE_LEFT_MENU)
  }
}
</script>

<style>
#left-menu {
  position: absolute;
}
</style>
