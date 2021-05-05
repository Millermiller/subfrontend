<template>
  <header class="el-header" ref="menu">
    <LeftMenuButton v-if='showLeftMenuButton'></LeftMenuButton>
    <el-menu
      class="el-menu-demo main-menu hidden-sm-and-down"
      mode="horizontal"
    >
      <router-link
        class="el-menu-item home"
        tag="li"
        :to="{ name: 'MainPage', params: { language: currentLanguage } }"
        exact="exact"
      >
        <i class="el-icon-s-home"></i>
      </router-link>
      <router-link
        class="el-menu-item learn"
        tag="li"
        :to="{ name: 'defaultAsset', params: { language: currentLanguage } }"
      >
        {{ $t('assets') }}
      </router-link>
      <router-link
        class="el-menu-item test"
        tag="li"
        v-if="$can(permissions.VIEW_PAGE_TESTS)"
        :to="{ name: 'defaultTest', params: { language: currentLanguage } }"
      >
        {{ $t('tests') }}
      </router-link>
      <router-link
        class="el-menu-item cards"
        tag="li"
        exact="exact"
        v-if="$can(permissions.VIEW_PAGE_PERSONAL)"
        :to="{ name: 'PersonalPage', params: { id: favouriteId, language: currentLanguage } }"
      >
        {{ $t('personals') }}
      </router-link>
      <router-link
        class="el-menu-item translates"
        tag="li"
        v-if="$can(permissions.VIEW_PAGE_TEXTS)"
        :to="{ name: 'TextPage', params: { language: currentLanguage } }"
        >{{ $t('texts') }}
      </router-link>
      <router-link
        class="el-menu-item puzzle"
        tag="li"
        v-if="$can(permissions.VIEW_PAGE_PUZZLE, 'any')"
        :to="{ name: 'PuzzlePage', params: { language: currentLanguage } }"
        >{{ $t('puzzles') }}
      </router-link>
      <el-menu-item class="logout" index="3">
        <a @click="logout">{{ $t('logout') }}</a>
      </el-menu-item>
      <li class="el-menu-item pull-right userblock">
        <div class="avatar-wrapper-small pull-left">
          <div class="avatar">
            <img class="avatar-small" :src="user.avatar" alt="" />
          </div>
        </div>
        <span>{{ user.login }}</span>
      </li>
      <li class="el-menu-item pull-right">
        <el-select
          :value="currentLanguage"
          @change="gotosite"
          size="small"
          :placeholder="sites.length ? sites[0].label : ''"
        >
          <el-option
            v-for="item in sites"
            :key="item.value"
            :label="item.label"
            :value="item.letter"
          >
            <img style="float: left" :src="item.flag" alt="" /><span
              style="float: left"
              >{{ item.label }}</span
            >
          </el-option>
        </el-select>
      </li>
      <hr :style="{ left: offset + 'px', width: width + 'px' }" />
    </el-menu>
    <RightMenuButton v-if='showRightMenuButton'></RightMenuButton>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { LoginService } from '@/Scandinaver/Core/Application/login.service'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import LeftMenuButton from '@/Scandinaver/Core/UI/LeftMenuButton.vue'
import { Inject } from 'vue-typedi'
import { permissions } from '@/permissions/permission.type'
import RightMenuButton from '@/Scandinaver/Core/UI/RightMenuButton.vue'

@Component({
  name: 'Header',
  components: { LeftMenuButton, RightMenuButton },
})
export default class Header extends Vue {
  @Inject()
  private loginService: LoginService

  offset: number = 0
  width: number = 60
  private observer?: MutationObserver
  private permissions: {}

  constructor() {
    super()
    this.permissions = permissions
  }

  url: any = {
    value: 'https://is.scandinaver.local',
    title: 'Исландский',
  }

  get favouriteId() {
    const { favouriteAsset } = store.getters
    if (favouriteAsset !== undefined) {
      return favouriteAsset.id
    }
    return ''
  }

  get showLeftMenuButton():boolean {
    return store.getters.showLeftMenuButton
  }

  get showRightMenuButton():boolean {
    return store.getters.showRightMenuButton
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  get user() {
    return this.$store.getters.user
  }

  get sites() {
    return this.$store.getters.sites
  }

  logout(): void {
    store.commit('setFullscreenLoading', true)
    this.loginService.logout().then((response) => {
      this.$router.push({ name: 'login' })
      store.commit('setFullscreenLoading', false)
    })
  }

  gotosite(letter: any): void {
    store.commit('setLanguage', letter)
    const routeName = this.$router.currentRoute.name as string
    const routeParams = this.$router.currentRoute.params
    routeParams.language = letter
    this.$router.push({ name: routeName, params: routeParams }).then(() => {
      store.dispatch('reloadStore')
    })
  }

  setUnderline(target: any) {
    const clickedElement = target
    this.offset = clickedElement.getBoundingClientRect().left - 20
    this.width = clickedElement.getBoundingClientRect().width
  }

  onClassChange(classAttrValue: any, target: Node) {
    const classList = classAttrValue.split(' ')

    if (classList.includes('router-link-active')) {
      this.setUnderline(target)
    }
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
<style lang="scss">
.el-header {
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  padding: 0 20px;
  height: 60px;
}

.navbar {
  position: relative;
  height: 50px;
  margin-bottom: 20px;
  border: 1px solid transparent;

  .navbar-nav > li > a {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}

.navbar {
  &:before {
    display: table;
    content: ' ';
  }
  &:after {
    display: table;
    content: ' ';
    clear: both;
  }
}

.navbar-collapse {
  max-height: 340px;
  padding-right: 15px;
  padding-left: 15px;
  overflow-x: visible;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  -webkit-overflow-scrolling: touch;
  &:before {
    display: table;
    content: ' ';
  }
  &:after {
    display: table;
    content: ' ';
    clear: both;
  }
}

.navbar-collapse.in {
  overflow-y: auto;
}

.navbar-static-top {
  z-index: 1000;
  border-width: 0 0 1px;
}

.el-menu.el-menu-vertical {
  width: 100%;
  min-height: 400px;
  display: block;
  border-radius: 0;
  a {
    width: 100%;
    padding: 0;
    display: inline-block;
  }
}

ul.el-menu.el-menu-vertical {
  li {
    border-top: 1px solid white;
    border-bottom: 1px solid #dfdfdf;
    i {
      width: 30px;
    }
  }
}

.el-menu-item {
  a {
    &:hover {
      text-decoration: none;
    }
  }
  .router-link-active {
    outline-offset: -2px;
  }
}
.el-menu {
  a {
    outline: none;
    padding: 20px;
    text-decoration: none;
  }
}

#app {
  .el-menu.el-menu--horizontal {
    border: none;
  }
}

.el-menu-item.is-active {
  color: #48576a;
}

.nav {
  > li {
    > a.router-link-active {
      outline-offset: -2px;
    }
  }
}

.main-menu {
  .el-menu-item {
    border-bottom: none;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
}

.main-menu {
  .el-menu-item {
    i {
      font-size: 26px;
    }
    &:hover {
      background: none;
      color: #20a0ff !important;
      border-bottom: none;
      > i {
        background: none;
        color: #20a0ff !important;
        border-bottom: none;
      }
    }
  }
  hr {
    height: 2px;
    margin: 0;
    background: #20a0ff;
    border: none;
    transition: 0.3s ease-in-out;
    position: absolute;
    bottom: -1px;
    left: 30px;
    width: 111px;
  }
}

.el-menu-item.logout {
  float: right;
  a {
    padding: 0px 0 0 10px;
    border-left: 1px solid #ddd;
    font-family: Segoe UI Light, Helvetica, Arial, sans-serif;
    font-size: 17px;
  }
}

.userblock {
  span {
    padding-left: 15px;
    font-family: Segoe UI Light, Helvetica, Arial, sans-serif;
    font-size: 17px;
  }
}

.el-menu-item {
  * {
    vertical-align: inherit !important;
  }
}

@media (max-width: 991px) {
  .navbar-default {
    background: rgba(255, 255, 255, 0.85);
    border: 0;
    color: #777;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
  }
  .navbar {
    height: 0;
  }
  .right-panel {
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
    border-radius: 4px;
  }
  .navbar-collapse {
    width: auto;
    border-top: 0;
    box-shadow: none;
    .navbar-nav.navbar-left {
      &:first-child {
        margin-left: -15px;
      }
    }
    .navbar-nav.navbar-right {
      &:last-child {
        margin-right: -15px;
      }
    }
    .navbar-text {
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .navbar-collapse.collapse {
    display: block;
  }
  .navbar-collapse.in {
    overflow-y: auto;
  }
  .el-menu--horizontal {
    > .el-menu-item {
      border-bottom: none !important;
    }
  }
}
</style>
