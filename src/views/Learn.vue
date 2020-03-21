<template lang="pug">
  el-container
    a#right-menu(@click="toggleRightMenu")
      button.navbar-toggle.collapsed
        span.icon-bar
        span.icon-bar
        span.icon-bar

    el-main
      el-row(:gutter='20')
        Slider
        transition(
          name="custom-classes-transition"
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight")
          Tabs

    el-dialog(title="Это закрытая часть сайта", :visible.sync="dialogVisible")
      span
        a Оплатите подписку</a> чтобы получить полный доступ
      span.dialog-footer(slot="footer")
        el-button(@click="dialogVisible = false") Закрыть
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Tabs from '@/components/learnpage/Tabs.vue';
import Slider from '@/components/learnpage/Slider.vue';

  @Component({
    name: 'Learn',
    components: {
      Slider,
      Tabs,
    },
  })
export default class Learn extends Vue {
    dialogVisible: boolean = false

    visible: boolean = false

    created() {
      // this.$eventHub.$on('closeMenu', this.closeMenu);
      this.$eventHub.$on('paidModal', this.modal);
    }

    modal() {
      this.dialogVisible = true
    }

    toggleRightMenu() {
      this.visible = !this.visible;
      this.$store.dispatch('toggleMenuOpen')
      this.$store.dispatch('toggleBackdrop')
    }

    mounted() {
      this.visible = window.innerWidth > 910
    }

    beforeDestroy() {
      // this.$store.dispatch('onCardsPageClose')
      this.$eventHub.$off('closeMenu');
      this.$eventHub.$off('paidModal');
    }
}
</script>
