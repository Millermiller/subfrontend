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
        :to="{ name: mainPage, params: { language: currentLanguage.letter } }"
        exact="exact"
      >
        <i class="el-icon-s-home"></i>
      </router-link>
      <router-link
        class="el-menu-item learn"
        tag="li"
        :to="{ name: defaultAssetPage, params: { language: currentLanguage.letter } }"
      >
        {{ $t('assets') }}
      </router-link>
      <router-link
        class="el-menu-item test"
        tag="li"
        v-if="$can(permissions.VIEW_PAGE_TESTS)"
        :to="{ name: defaultTestPage, params: { language: currentLanguage.letter } }"
      >
        {{ $t('tests') }}
      </router-link>
      <router-link
        class="el-menu-item cards"
        tag="li"
        exact="exact"
        v-if="$can(permissions.VIEW_PAGE_PERSONAL)"
        :to="{ name: personalPage, params: { id: favouriteId, language: currentLanguage.letter } }"
      >
        {{ $t('personals') }}
      </router-link>
      <router-link
        class="el-menu-item translates"
        tag="li"
        v-if="$can(permissions.VIEW_PAGE_TEXTS)"
        :to="{ name: translatesListPage, params: { language: currentLanguage.letter } }"
        >{{ $t('texts') }}
      </router-link>
      <router-link
        class="el-menu-item puzzle"
        tag="li"
        v-if="$can(permissions.VIEW_PAGE_PUZZLE, 'any')"
        :to="{ name: puzzlePage, params: { language: currentLanguage.letter } }"
        >{{ $t('puzzles') }}
      </router-link>
      <el-menu-item class="logout" index="3">
        <a @click="logout()">{{ $t('logout') }}</a>
      </el-menu-item>
      <li class="el-menu-item pull-right userblock">
        <div class="avatar-wrapper-small pull-left">
          <div class="avatar">
            <img class="avatar-small" :src="_user.avatar" alt="" />
          </div>
        </div>
        <span>{{ _user.login }}</span>
      </li>
      <li class="el-menu-item pull-right">
        <el-select
          v-model='model'
          value-key="letter"
          @change="changeLanguage($event)"
          size="small"
        >
          <template v-slot:prefix>
            <img style="float: left" :src="model.flag" alt="" />
          </template>
          <el-option
            v-for="(item, i)  in languages"
            :key="i"
            :label="item.title"
            :value="item"
          >
            <img style="float: left" :src="item.flag" alt="" />
            <span style="float: left">{{ item.title }}</span>
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
import { FAVOURITE_ASSET } from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { USER } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'
import { User } from '@/Scandinaver/Core/Domain/User'
import { Language } from '@/Scandinaver/Core/Domain/Language'
import { CommonService } from '@/Scandinaver/Core/Application/common.service'
import { DEFAULT_ASSET_PAGE, DEFAULT_TEST_PAGE, PERSONAL_PAGE } from '@/Scandinaver/Asset/routes'
import { MAIN_PAGE, LOGIN_PAGE } from '../routes'
import { PUZZLE_PAGE } from '@/Scandinaver/Puzzle/routes'
import { TRANSLATES_LIST_PAGE } from '@/Scandinaver/Translate/routes'

@Component({
  name: 'Header',
  components: { LeftMenuButton, RightMenuButton },
})
export default class Header extends Vue {
  @Inject()
  private readonly loginService: LoginService

  @Inject()
  private readonly commonService: CommonService

  @Getter(FAVOURITE_ASSET)
  private readonly _favouriteAsset: Asset

  @Getter(USER)
  private readonly _user: User

  public readonly mainPage: string = MAIN_PAGE
  public readonly defaultAssetPage: string = DEFAULT_ASSET_PAGE
  public readonly defaultTestPage: string = DEFAULT_TEST_PAGE
  public readonly personalPage: string = PERSONAL_PAGE
  public readonly puzzlePage: string = PUZZLE_PAGE
  public readonly translatesListPage: string = TRANSLATES_LIST_PAGE
  public offset: number = 0
  public width: number = 60
  private observer?: MutationObserver
  public permissions: {}

  public model: any = {
    letter: '',
    title: ''
  }

  constructor() {
    super()
    this.permissions = permissions
    this.commonService.languageSubject.subscribe((language) => {
      if (language !== null) {
        this.model.letter = language.letter
        this.model.flag = language.flag
      }
    })
  }

  get favouriteId(): number|string {
    if (this._favouriteAsset !== undefined) {
      return this._favouriteAsset.id
    }
    return ''
  }

  get showLeftMenuButton(): boolean {
    return store.getters.showLeftMenuButton
  }

  get showRightMenuButton(): boolean {
    return store.getters.showRightMenuButton
  }

  get currentLanguage(): Language {
    return store.getters.currentLanguage
  }

  get languages(): Language[] {
    return this.$store.getters.languages
  }

  public logout(): void {
    store.commit('setFullscreenLoading', true)
    this.loginService.logout().then((response) => {
      this.$router.push({ name: LOGIN_PAGE })
      store.commit('setFullscreenLoading', false)
    })
  }

  public async changeLanguage(language: Language): Promise<void> {
    if (language.letter !== store.getters.currentLanguage.letter) {
      store.commit('setFullscreenLoading', true)
      store.commit('setCurrentLanguage', language)
      store.commit('setLanguage', language.letter)
      this.commonService.languageSubject.next(language)
      await this.commonService.reloadStore()
      await this.$router.push({ name: MAIN_PAGE, params: { language: language.letter } })
    }
  }

  private setUnderline(target: any): void {
    const clickedElement = target
    this.offset = clickedElement.getBoundingClientRect().left - 20
    this.width = clickedElement.getBoundingClientRect().width
  }

  private onClassChange(classAttrValue: any, target: Node): void {
    const classList = classAttrValue.split(' ')

    if (classList.includes('router-link-active')) {
      this.setUnderline(target)
    }
  }

  mounted(): void {
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
    height: 60px;
    line-height: 60px;
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

.el-input__prefix {
  top: 12px !important;
}

.el-select-dropdown__item, .el-input__prefix {
  img {
    top: 12px;
    width: 20px;
    float: left;
    margin: 7px 8px 8px 0;
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
