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
            <img class="avatar-small" :src="_user.avatar" alt="" />
          </div>
          <div class="userinfo pull-left">
            <p class="userlogin">{{ _user.login }}</p>
            <p class="useremail">{{ _user.email }}</p>
          </div>
          <i class="el-icon-back hide-menu-button" @click="hide()"></i>
        </div>
        <div class="sidemenu-content" @click="hide()">
          <el-menu class="el-menu-vertical" mode="vertical" default-active="1">
            <el-menu-item index="1">
              <i class="ion-ios-home-outline ion"></i>
              <router-link to="/" exact="exact">{{ $t('mainPage') }}</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="ion-university ion"></i>
              <router-link :to="{ name: 'defaultAsset', params: { language: currentLanguage } }">
                {{ $t('assets') }}
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="ion-android-checkbox-outline ion"></i>
              <router-link :to="{ name: 'defaultTest', params: { language: currentLanguage } }">
                {{ $t('tests') }}
              </router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="ion-android-checkbox-outline ion"></i>
              <router-link
                :to="{
                      name: 'PersonalPage',
                      params: { id: favouriteId, language: currentLanguage },
                    }">
                {{ $t('personals') }}</router-link>
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
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { FAVOURITE_ASSET } from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Getter } from '@/utils/getter.decorator'
import { USER } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'
import { User } from '@/Scandinaver/Core/Domain/User'

@Component({})
export default class SideMenu extends Vue {
  @Getter(FAVOURITE_ASSET)
  private readonly _favouriteAsset: Asset

  @Getter(USER)
  private readonly _user: User

  get visible(): boolean {
    return this.$store.getters.isLeftMenuOpen
  }

  get backdrop(): number {
    return this.$store.getters.backdrop
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  get favouriteId(): number|string {
    if (this._favouriteAsset !== undefined) {
      return this._favouriteAsset.id
    }
    return ''
  }

  public hide(): void {
    this.$store.commit('setLeftMenuOpen', false)
    this.$store.commit('setBackdrop', 0)
  }

  mounted(): void {
    const data = this
    this.$eventHub.$on(events.SHOW_MENU, () => {
      data.$store.commit('setBackdrop', 1)
    })
  }

  beforeDestroy(): void {
    this.$eventHub.$off(events.SHOW_MENU)
  }
}
</script>

<style lang='scss' scoped>
@import "../../../assets/scss/variables";

.sidemenu-toolbar {
  position: relative;
  background-color: $blue-color;
  padding: 20px 0;
  overflow: hidden;
  i {
    color: #f9fafc;
    cursor: pointer;
  }
}

.hide-menu-button {
  float: right;
  font-size: 30px;
  margin: 10px;
}
</style>
