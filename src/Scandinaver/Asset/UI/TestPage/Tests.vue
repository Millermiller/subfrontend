<template>
  <el-container>
    <a id="right-menu" @click="toggleRightMenu">
      <button class="navbar-toggle collapsed">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </a>
    <el-main>
      <el-row :gutter="20">
        <Result></Result>
        <router-view></router-view>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <Tabs v-show="visible"></Tabs>
        </transition>
      </el-row>
    </el-main>
    <el-dialog :title="$t('closed')" :visible.sync="dialogVisible">
      <span>
        <a>{{ $t('subscription') }}</a>
      </span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">{{ $t('close') }}</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Result from '@/Scandinaver/Asset/UI/TestPage/Result.vue'
import Tabs from '@/Scandinaver/Asset/UI/TestPage/Tabs.vue'
import * as events from '@/events/events.type'

@Component({
  name: 'Tests',
  components: {
    Result,
    Tabs,
  },
})
export default class Tests extends Vue {
  dialogVisible: boolean = false
  visible: boolean = false

  created(): void {
    this.$eventHub.$on(events.CLOSE_MENU, this.toggleRightMenu)
    this.$eventHub.$on(events.OPEN_PAID_MODAL, this.modal)
  }

  modal(): void {
    this.dialogVisible = true
  }

  toggleRightMenu(): void {
    this.visible = !this.visible
    this.$store.dispatch('toggleMenuOpen')
    this.$store.dispatch('toggleBackdrop')
  }

  mounted(): void {
    this.visible = window.innerWidth > 910
  }

  beforeDestroy() {
    // this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.CLOSE_MENU)
    this.$eventHub.$off(events.OPEN_PAID_MODAL)
  }
}
</script>
