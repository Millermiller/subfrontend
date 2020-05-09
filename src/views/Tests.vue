<template lang="pug">
  el-container
    a#right-menu(@click="toggleRightMenu")
      button.navbar-toggle.collapsed
        span.icon-bar
        span.icon-bar
        span.icon-bar
    el-main
      el-row(:gutter="20")
        Result
        router-view
        transition(
          name="custom-classes-transition"
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight")
          Tabs(v-show="visible")

    el-dialog(:title="$t('closed')", :visible.sync="dialogVisible")
      span
        a {{$t('subscription')}}
      span.dialog-footer(slot="footer")
        el-button(@click="dialogVisible = false") {{$t('close')}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Result from '@/components/testpage/Result.vue'
import Tabs from '@/components/testpage/Tabs.vue'

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
    this.$eventHub.$on('closeMenu', this.toggleRightMenu);
    this.$eventHub.$on('paidModal', this.modal);
  }

  modal(): void {
    this.dialogVisible = true
  }

  toggleRightMenu(): void {
    this.visible = !this.visible;
    this.$store.dispatch('toggleMenuOpen')
    this.$store.dispatch('toggleBackdrop')
  }

  mounted(): void {
    this.visible = window.innerWidth > 910
  }

  beforeDestroy() {
    // this.$store.dispatch('onCardsPageClose')
    this.$eventHub.$off('closeMenu');
    this.$eventHub.$off('paidModal');
  }
}
</script>
