<template lang="pug">
  div.navbar.navbar-static-topnavbar-fixed-left(role="navigation", ref="menu")
    a#left-menu(@click="showLeftMenu")
      button.navbar-toggle.collapsed
        span.icon-bar
        span.icon-bar
        span.icon-bar

    el-menu.el-menu-demo.main-menu.hidden-sm-and-down(mode="horizontal")
      router-link.el-menu-item.home(tag="li", to="/", exact)
        i.menu-icon.icon.ion-ios-home-outline
      router-link.el-menu-item.learn(tag="li", to="/learn") Словари
      router-link.el-menu-item.test(tag="li", to="/test") Тесты
      router-link.el-menu-item.cards(tag="li",  to="/cards") Мои словари
      router-link.el-menu-item.translates(tag="li", to="/translates") Тексты
      router-link.el-menu-item.puzzle(tag="li",  to="/puzzle") Паззлы
      el-menu-item.logout(index="3")
        a(@click="logout") выход

      li.el-menu-item.pull-right.userblock
        .avatar-wrapper-small.pull-left
          .avatar
            img.avatar-small(:src="user.avatar")
        span {{user.login}}

      li.el-menu-item.pull-right
        el-select(:model="url", @change="gotosite", size="small", :placeholder="(sites.length) ? sites[0].label : ''")
          el-option(
            v-for="item in sites",
            :key="item.value",
            :label="item.label",
            :value="item")
            img(style="float: left" :src="item.flag")
            span(style="float: left") {{ item.label }}

      hr(:style="{ left: offset + 'px', width: width + 'px'  }")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { LoginService } from '@/services/LoginService';
import { store } from '@/store';

  @Component({
    name: 'Header',
  })
export default class Header extends Vue {
    offset: number = 30

    width: number = 40

    private observer?: MutationObserver

    url: any = {
      value: 'https://is.scandinaver.local',
      title: 'Исландский',
    }

    showLeftMenu = (): void => {
      this.$root.$emit('show')
    }

    logout(): void {
      LoginService.logout().then((response) => {
        store.commit('setAuth', false)
        this.$router.push({ path: '/login' })
      })
    }

    gotosite = (): void => {
      window.location = this.url.value
    }

    setUnderline(target: any) {
      const clickedElement = target
      this.offset = clickedElement.getBoundingClientRect().left
      this.width = clickedElement.getBoundingClientRect().width
    }

    onClassChange(classAttrValue: any, target: Node) {
      const classList = classAttrValue.split(' ')

      if (classList.includes('router-link-active')) {
        this.setUnderline(target)
      }
    }

    get user() {
      return this.$store.getters.user
    }

    get sites() {
      return this.$store.getters.sites
    }

    mounted() {
      this.url = this.$store.getters.currentsite

      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          // @ts-ignore
          const newValue = m.target.getAttribute(m.attributeName)
          this.$nextTick(() => {
            this.onClassChange(newValue, m.target)
          })
        })
      })
      // @ts-ignore
      this.observer.observe(this.$refs.menu, {
        attributeFilter: ['class'],
        subtree: true,
      })
    }
}
</script>
