<template lang="pug">
  #app
    Header(v-if="auth")
    Sidemenu(v-if="auth")
    router-view
    Footer(v-if="auth")
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue';
import Header from '@/views/Header.vue';
import Footer from '@/views/Footer.vue';
import Sidemenu from '@/views/Sidemenu.vue';
import LanguageService from '@/services/LanguageService';

  @Component({
    name: 'App',
    components: {
      Sidemenu, Header, Footer,
    },
  })
export default class App extends Vue {
  get auth(): boolean {
    return this.$store.getters.auth;
  }

  created() {
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
