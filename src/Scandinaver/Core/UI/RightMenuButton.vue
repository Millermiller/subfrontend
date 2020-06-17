<template>
  <a id="left-menu" @click="showRightMenu"
    ><button class="navbar-toggle collapsed">
      <span class="icon-bar"></span><span class="icon-bar"></span
      ><span class="icon-bar"></span></button
  ></a>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as events from '@/events/events.type'
@Component({
  name: 'RightMenuButton',
})
export default class RightMenuButton extends Vue {
  showRightMenu = (): void => {
    this.$eventHub.$emit(events.TOGGLE_RIGHT_MENU)
  }
}
</script>

<style>
#left-menu {
  position: absolute;
}
.navbar-toggle {
  background: none;
}
.navbar-toggle .icon-bar {
  border: 1px solid #1d8ce0;
}

.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}

.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}
.navbar-toggle {
  position: relative;
  float: right;
  padding: 9px 10px;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  position: relative;
  float: left;
  padding: 9px 10px;
  background-image: none;
  border: 0 none;
  top: 0px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  outline: 0;
  opacity: 1;
  -webkit-transition: all 0.45s;
  -moz-transition: all 0.45s;
  transition: all 0.45s;
  float: left;
}
.open .navbar-toggle {
  top: -70px;
  opacity: 0;
}
@media (min-width: 991px) {
  .navbar-toggle {
    display: none;
  }
  .navbar-static-top {
    border-radius: 0;
  }
}
</style>
