<template>
  <i :class="[iconClass, 'hidden-sm-and-up']" id="right-menu" @click="toggleRightMenu"></i>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component({
  name: 'RightMenuButton',
})
export default class RightMenuButton extends Vue {
  private opened: boolean = false
  readonly classOpened: string = 'el-icon-d-arrow-left'
  readonly classClosed: string = 'el-icon-close'

  get iconClass(): string {
    return store.getters.isRightMenuOpen ? this.classClosed : this.classOpened
  }

  toggleRightMenu(): void{
    this.$store.commit('setRightMenuOpen', !store.getters.isRightMenuOpen)
    this.$store.commit('setLeftMenuOpen', false)
    this.opened = store.getters.isRightMenuOpen
  }
}
</script>

<style lang="scss" scoped>
#right-menu {
  position: relative;
  padding: 15px 0;
  font-size: 30px;
  float: right;
}
.navbar-toggle {
  float: right;
  padding: 9px 10px;
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
  background: transparent none;
  border: 0 none;
  top: 0;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  outline: 0;
  opacity: 1;
  -webkit-transition: all 0.45s;
  -moz-transition: all 0.45s;
  transition: all 0.45s;
  .icon-bar {
    border: 1px solid #1d8ce0;
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
    + {
      .icon-bar {
        margin-top: 4px;
      }
    }
  }
}
.open {
  .navbar-toggle {
    top: -70px;
    opacity: 0;
  }
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
