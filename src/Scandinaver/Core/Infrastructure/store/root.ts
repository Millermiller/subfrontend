import { Getters, Mutations, Actions, Module, Context } from 'vuex-smart-module'
import { Store } from 'vuex'
import { text } from '@/Scandinaver/Translate/Infrastructure/store'
import { user } from '@/Scandinaver/Core/Infrastructure/store/user'
import { test } from '@/Scandinaver/Asset/Infrastructure/store/test'
import { assetModule } from '@/Scandinaver/Asset/Infrastructure/store/asset'
import { puzzleModule } from '@/Scandinaver/Puzzle/Infrastructure/store'
import {
  SET_FAVOURITES,
  SET_PERSONAL,
  SET_SENTENCES,
  SET_WORDS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { API } from '@/Scandinaver/Core/Infrastructure/api/commonAPI'
import { plainToClass } from 'class-transformer'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import CommonAPI = API.CommonAPI

// State
class State {
  fullscreenLoading: boolean = false
  sites = []
  currentsite = {}
  domain = ''
  info = {}
  backdrop = 0
  rightMenuOpen = false
  showDictionary = true
  intro = []
  language: string = ''
  introNeed = {
    login: false,
    main: false,
    learnHome: false,
    learn: false,
    testHome: false,
    test: false,
    cards: false,
    texts: false,
    text: false,
  }
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

  get showDictionary() {
    return this.state.showDictionary
  }

  intro(id: number) {
    return this.state.intro[id]
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

  setFullscreenLoading(loading: boolean): void {
    this.state.fullscreenLoading = loading
  }

  showDictionary(): void {
    this.state.showDictionary = true
  }

  // setIntroVisibility = ({data}: { data: any }) => this.state.introNeed[data.page] = data.visible

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

class CommonActions extends Actions<State, CommonGetters, CommonMutations, CommonActions> {
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

  reloadStore() {
    CommonAPI.getState().then((response) => {
      this.assetstore.commit(SET_WORDS, response.data.words)
      this.assetstore.commit(SET_SENTENCES, response.data.sentences)
      this.assetstore.commit(SET_FAVOURITES, response.data.favourites)
      this.assetstore.commit(SET_PERSONAL, response.data.personal)
      this.textstore.commit('setTexts', plainToClass(Translate, response.data.texts))
      this.puzzleStore.commit('setPuzzles', response.data.puzzles)
      this.commit('setSites', response.data.sites)
      this.commit('setCurrentSite', response.data.currentsite)
      this.commit('setDomain', response.data.domain)
    })
  }

  toggleBackdrop() {
    if (this.state.backdrop === 0 && this.state.rightMenuOpen) this.commit('setBackdrop', 1)
    else this.commit('setBackdrop', 0)
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
  },
})
