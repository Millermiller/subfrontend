<template lang="pug">
  a#left-menu(@click="showLeftMenu")
    button.navbar-toggle.collapsed
      span.icon-bar
      span.icon-bar
      span.icon-bar
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'LeftMenuButton',
})
export default class LeftMenuButton extends Vue {
  showLeftMenu = (): void => {
    this.$eventHub.$emit('show')
  }
}
</script>

<style>
#left-menu {
  position: absolute;
}
</style>
