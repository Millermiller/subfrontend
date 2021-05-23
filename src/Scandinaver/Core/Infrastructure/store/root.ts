import { Getters, Mutations, Actions, Module, Context } from 'vuex-smart-module'
import { Store } from 'vuex'
import { text } from '@/Scandinaver/Translate/Infrastructure/store'
import { user } from '@/Scandinaver/Core/Infrastructure/store/user'
import { test } from '@/Scandinaver/Asset/Infrastructure/store/test'
import { assetModule } from '@/Scandinaver/Asset/Infrastructure/store/asset'
import { puzzleModule } from '@/Scandinaver/Puzzle/Infrastructure/store'
import { rbacModule } from '@/Scandinaver/RBAC/Infrastructure/store'
import Intro from '@/Scandinaver/Intro/Domain/Intro'
import { Language } from '@/Scandinaver/Core/Domain/Language'

// State
class State {
  fullscreenLoading: boolean = false
  languages: Language[] = []
  currentLanguage: Language = new Language()
  domain = ''
  info = {}
  backdrop = 0
  showLeftMenuButton = true
  showRightMenuButton = false
  rightMenuOpen: boolean = false
  leftMenuOpen: boolean = false
  intro: Intro[] = []
  language: string = ''
}

// Getters
// Extend 'Getters' class with 'FooState' type
class CommonGetters extends Getters<State> {
  get fullscreenLoading(): boolean {
    return this.state.fullscreenLoading
  }

  get languages(): Language[] {
    return this.state.languages
  }

  get currentLanguage() {
    return this.state.currentLanguage
  }

  get backdrop() {
    return this.state.backdrop
  }

  get isRightMenuOpen(): boolean {
    return this.state.rightMenuOpen
  }

  get isLeftMenuOpen(): boolean {
    return this.state.leftMenuOpen
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

  get showLeftMenuButton(): boolean {
    return this.state.showLeftMenuButton
  }

  get showRightMenuButton(): boolean {
    return this.state.showRightMenuButton
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

  setSites(languages: any): void {
    this.state.languages = languages
  }

  setCurrentLanguage(language: Language): void {
    this.state.currentLanguage = language
  }

  setLanguage(language: string): void {
    this.state.language = language
  }

  setShowLeftMenuButton(visible: boolean): void {
    this.state.showLeftMenuButton = visible
  }

  setShowRightMenuButton(visible: boolean): void {
    this.state.showRightMenuButton = visible
  }

  setRightMenuOpen(visible: boolean): void {
    this.state.rightMenuOpen = visible
  }

  setLeftMenuOpen(visible: boolean): void {
    this.state.leftMenuOpen = visible
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
