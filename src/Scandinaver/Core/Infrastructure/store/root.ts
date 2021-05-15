import { Getters, Mutations, Actions, Module, Context } from 'vuex-smart-module'
import { Store } from 'vuex'
import { text } from '@/Scandinaver/Translate/Infrastructure/store'
import { user } from '@/Scandinaver/Core/Infrastructure/store/user'
import { test } from '@/Scandinaver/Asset/Infrastructure/store/test'
import { assetModule } from '@/Scandinaver/Asset/Infrastructure/store/asset'
import { puzzleModule } from '@/Scandinaver/Puzzle/Infrastructure/store'
import { rbacModule } from '@/Scandinaver/RBAC/Infrastructure/store'
import {
  SET_FAVOURITES,
  SET_PERSONAL,
  SET_SENTENCES,
  SET_WORDS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { API } from '@/Scandinaver/Core/Infrastructure/api/common.api'
import { plainToClass } from 'class-transformer'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import Intro from '@/Scandinaver/Intro/Domain/Intro'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { Inject } from 'vue-typedi'
import IntroService from '@/Scandinaver/Intro/Application/intro.service'
import CommonAPI = API.CommonAPI

// State
class State {
  fullscreenLoading: boolean = false
  sites: [] = []
  currentsite = {}
  domain = ''
  info = {}
  backdrop = 0
  rightMenuOpen = false
  intro: Intro[] = []
  language: string = ''
}

// Getters
// Extend 'Getters' class with 'FooState' type
class CommonGetters extends Getters<State> {
  get fullscreenLoading(): boolean {
    return this.state.fullscreenLoading
  }

  get sites() {
    return this.state.sites
  }

  get currentsite() {
    return this.state.currentsite
  }

  get backdrop() {
    return this.state.backdrop
  }

  get rightMenuOpen() {
    return this.state.rightMenuOpen
  }

  get intro(): Intro[] {
    return this.state.intro
  }

  isShowIntro = (id: string) => {
    // return this.state.introNeed[id]
  }

  get language(): string {
    return this.state.language
  }
}

// Mutations
// Extend 'Mutations' class with 'FooState' type
class CommonMutations extends Mutations<State> {
  setInfo(info: any): void {
    this.state.info = info
  }

  setIntro(intro: any): void {
    this.state.intro = intro
  }

  setFullscreenLoading(loading: boolean): void {
    this.state.fullscreenLoading = loading
  }

  setBackdrop(data: number): void {
    this.state.backdrop = data
  }

  setMenuOpen(data: boolean): void {
    this.state.rightMenuOpen = data
  }

  setSites(sites: any) {
    this.state.sites = sites
  }

  setCurrentSite(site: any) {
    this.state.currentsite = site
  }

  setDomain(domain: string) {
    this.state.domain = domain
  }

  setLanguage(language: string) {
    this.state.language = language
  }
}

class CommonActions extends Actions<
  State,
  CommonGetters,
  CommonMutations,
  CommonActions
> {
  userstore!: Context<typeof user>
  assetstore!: Context<typeof assetModule>
  textstore!: Context<typeof text>
  puzzleStore!: Context<typeof puzzleModule>

  $init(store: Store<any>): void {
    this.userstore = user.context(store)
    this.assetstore = assetModule.context(store)
    this.textstore = text.context(store)
    this.puzzleStore = puzzleModule.context(store)
  }

  toggleBackdrop() {
    if (this.state.backdrop === 0 && this.state.rightMenuOpen) {
      this.commit('setBackdrop', 1)
    } else {
      this.commit('setBackdrop', 0)
    }
  }

  toggleMenuOpen() {
    this.commit('setMenuOpen', false)
  }
}

// Create a module with module asset classes
export const root = new Module({
  namespaced: false,
  state: State,
  getters: CommonGetters,
  mutations: CommonMutations,
  actions: CommonActions,
  modules: {
    user,
    assetModule,
    text,
    test,
    puzzleModule,
    rbacModule,
  },
})
