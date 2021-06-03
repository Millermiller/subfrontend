<template>
  <el-container id="app" v-loading.fullscreen.lock="fullscreenLoading">
    <Header v-if="_auth"></Header>
    <Sidemenu v-if="_auth"></Sidemenu>
    <router-view></router-view>
    <Footer v-if="_auth"></Footer>
  </el-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import Header from '@/Scandinaver/Core/UI/Header.vue'
import Footer from '@/Scandinaver/Core/UI/Footer.vue'
import SideMenu from '@/Scandinaver/Core/UI/Sidemenu.vue'
import LanguageService from '@/Scandinaver/Core/Application/language.service'
import { Getter } from '@/utils/getter.decorator'
import { IS_AUTH } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'

@Component({
  name: 'App',
  components: {
    SideMenu,
    Header,
    Footer,
  },
})
export default class App extends Vue {
  @Getter(IS_AUTH)
  public readonly _auth: boolean

  get fullscreenLoading(): boolean {
    return this.$store.getters.fullscreenLoading
  }

  mounted(): void {
    document.body.classList.add('app-body')
    this.$store.commit('setLanguage', LanguageService.extract())
  }
}
</script>
<style>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
