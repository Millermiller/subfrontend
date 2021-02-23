<template>
  <div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
    >
      <div class="sidemenu" v-show="visible">
        <div class="sidemenu-toolbar">
          <div class="avatar-wrapper-small pull-left">
            <img class="avatar-small" :src="avatar" alt="" />
          </div>
          <div class="userinfo pull-left">
            <p class="userlogin">{{ login }}</p>
            <p class="useremail">{{ email }}</p>
          </div>
          <i class="ion-ios-close-empty ion-big" @click="toggle"></i>
        </div>
        <div class="sidemenu-content" @click="toggle">
          <el-menu class="el-menu-vertical" mode="vertical" default-active="1">
            <el-menu-item index="1">
              <i class="ion-ios-home-outline ion"></i>
              <router-link to="/" exact="exact">На главную</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="ion-university ion"></i>
              <router-link to="/learn">Обучение</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="ion-android-checkbox-outline ion"></i>
              <router-link to="/test">Тесты</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="ion-android-checkbox-outline ion"></i>
              <router-link to="/cards">Словари</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </transition>
    <div class="sidenav-backdrop" :style="{ opacity: backdrop }"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as events from '@/events/events.type'

@Component({})
export default class Sidemenu extends Vue {
  private visible: boolean = false

  get avatar() {
    return this.$store.getters.avatar
  }

  get login() {
    return this.$store.getters.login
  }

  get email() {
    return this.$store.getters.email
  }

  get backdrop() {
    return this.$store.getters.backdrop
  }

  toggle() {
    this.visible = !this.visible

    if (!this.$store.getters.rightMenuOpen) this.$store.commit('setBackdrop', 0)
  }

  mounted() {
    const data = this
    this.$eventHub.$on(events.SHOW_MENU, () => {
      data.visible = true
      data.$store.commit('setBackdrop', 1)
    })
  }

  beforeDestroy() {
    this.$eventHub.$off(events.SHOW_MENU)
  }
}
</script>
