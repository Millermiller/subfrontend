<template lang="pug">
  div.navbar.navbar-static-topnavbar-fixed-left(role="navigation", ref="menu")

    LeftMenuButton

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
import LeftMenuButton from '@/components/LeftMenuButton.vue';

  @Component({
    name: 'Header',
    components: { LeftMenuButton },
  })
export default class Header extends Vue {
    offset: number = 30

    width: number = 40

    private observer?: MutationObserver

    url: any = {
      value: 'https://is.scandinaver.local',
      title: 'Исландский',
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
<style>
  .navbar .navbar-nav > li > a{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .navbar {
    position: relative;
    height: 50px;
    margin-bottom: 20px;
    border: 1px solid transparent
  }

  .navbar:before, .navbar:after {
    display: table;
    content: " "
  }

  .navbar:after {
    clear: both
  }

  .navbar:before, .navbar:after {
    display: table;
    content: " "
  }

  .navbar:after {
    clear: both
  }
  .navbar-collapse {
    max-height: 340px;
    padding-right: 15px;
    padding-left: 15px;
    overflow-x: visible;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    -webkit-overflow-scrolling: touch
  }

  .navbar-collapse:before, .navbar-collapse:after {
    display: table;
    content: " "
  }

  .navbar-collapse:after {
    clear: both
  }

  .navbar-collapse:before, .navbar-collapse:after {
    display: table;
    content: " "
  }

  .navbar-collapse:after {
    clear: both
  }

  .navbar-collapse.in {
    overflow-y: auto
  }

  .navbar-static-top {
    z-index: 1000;
    border-width: 0 0 1px
  }
  .el-menu.el-menu-vertical {
    width: 100%;
    min-height: 400px;
    display: block;
    border-radius: 0;
  }
  .el-menu.el-menu-vertical a{
    width: 100%;
    padding: 0;
    display: inline-block;
  }
  ul.el-menu.el-menu-vertical li{
    border-top: 1px solid white;
    border-bottom: 1px solid #dfdfdf;
  }
  ul.el-menu.el-menu-vertical li i{
    width: 30px;
  }
  .el-menu-item a:hover {
    text-decoration: none;
  }
  .el-menu a {
    outline: none;
    padding: 20px;
    text-decoration: none;
  }
  .el-menu-item.is-active{
    color: #48576a;
  }
  .el-menu-item .router-link-active,
  .nav > li > a.router-link-active{
    outline-offset: -2px;
  }
  .main-menu{
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    background-color: #fff;
    padding: 0 20px;
  }

  .main-menu .el-menu-item{
    border-bottom: none;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
  .main-menu .el-menu-item i{
    font-size:26px;
  }

  .main-menu .el-menu-item:hover,
  .main-menu .el-menu-item:hover > i{
    background: none;
    color: #20a0ff !important;
    border-bottom: none;
  }
  .main-menu hr{
    height: 2px;
    margin: 0;
    background: #20a0ff;
    border: none;
    transition: .3s ease-in-out;
    position: absolute;
    bottom: -1px;
    left: 30px;
    width: 111px;
  }
  .el-menu-item.logout{
    float: right;
  }
  .el-menu-item.logout a{
    padding: 0px 0 0 10px;
    border-left: 1px solid #ddd;
    font-family: Segoe UI Light, Helvetica, Arial, sans-serif;
    font-size: 17px;
  }
  .userblock span{
    padding-left: 15px;
    font-family: Segoe UI Light, Helvetica, Arial, sans-serif;
    font-size: 17px;
  }
  .el-menu-item * {
    vertical-align: inherit !important;
  }

  @media (max-width: 991px){
    .navbar-default {
      background: rgba(255,255,255,.85);
      border: 0;
      color: #777;
      text-transform: uppercase;
      display: inline-block;
      text-align: center;
    }
    .navbar{
      height: 0px;
    }
    .right-panel{
      position: absolute;
      z-index: 9999;
      width: 70%;
      right: 0;
    }
    .slideInRight {
      -webkit-animation-name: slideInRight;
      animation-name: slideInRight;
    }
    .slideOutRight {
      -webkit-animation-name: slideOutRight;
      animation-name: slideOutRight;
    }
  }

  @media (min-width: 768px) {
    .navbar {
      border-radius: 4px
    }
    .navbar-collapse {
      width: auto;
      border-top: 0;
      box-shadow: none
    }

    .navbar-collapse.collapse {
      display: block;
    }

    .navbar-collapse.in {
      overflow-y: auto
    }

    .navbar-collapse .navbar-nav.navbar-left:first-child {
      margin-left: -15px
    }

    .navbar-collapse .navbar-nav.navbar-right:last-child {
      margin-right: -15px
    }

    .navbar-collapse .navbar-text:last-child {
      margin-right: 0
    }
  }

</style>
