<template lang="pug">
  div
    transition(
      name="custom-classes-transition",
      enter-active-class="animated slideInLeft",
      leave-active-class="animated slideOutLeft")
      div.sidemenu(v-show="visible")

        div.sidemenu-toolbar
          div.avatar-wrapper-small.pull-left
            img.avatar-small(:src="avatar")
          div.userinfo.pull-left
            p.userlogin {{login}}
            p.useremail {{email}}
          i.ion-ios-close-empty.ion-big(@click="toggle")

        div.sidemenu-content(@click="toggle")
          el-menu.el-menu-vertical(mode="vertical", default-active="1")
            el-menu-item(index="1")
              i.ion-ios-home-outline.ion
              router-link(to="/", exact) На главную
            el-menu-item(index="2")
              i.ion-university.ion
              router-link(to="/learn") Обучение
            el-menu-item(index="3")
              i.ion-android-checkbox-outline.ion
              router-link(to="/test") Тесты
            el-menu-item(index="4")
              i.ion-android-checkbox-outline.ion
              router-link(to="/cards") Словари
    .sidenav-backdrop(:style="{opacity: backdrop}")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Sidemenu extends Vue {
    private visible: boolean = false

    get avatar() {
      return this.$store.getters.avatar
    }

    get login() {
      return this.$store.getters.login;
    }

    get email() {
      return this.$store.getters.email;
    }

    get backdrop() {
      return this.$store.getters.backdrop;
    }

    toggle() {
      this.visible = !this.visible;

      if (!this.$store.getters.rightMenuOpen) this.$store.commit('setBackdrop', 0)
    }

    mounted() {
      const data = this;
      this.$root.$on('show', () => {
        data.visible = true;
        data.$store.commit('setBackdrop', 1)
      })
    }
}
</script>
