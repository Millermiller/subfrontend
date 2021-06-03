import Vue from 'vue'
import Component from 'vue-class-component'
import Result from './components/result.component/index.vue'
import TabsComponent from '../../../Core/UI/tabs.component/index.vue'
import * as events from '@/events/events.type'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component({
  name: 'Tests',
  components: {
    Result,
    TabsComponent,
  },
})
export default class Tests extends Vue {
  public dialogVisible: boolean = false

  created(): void {
    this.$eventHub.$on(events.OPEN_PAID_MODAL, this.modal)
  }

  mounted(): void {
    store.commit('setShowRightMenuButton', true)
  }

  modal(): void {
    this.dialogVisible = true
  }

  get showRightMenu(): boolean {
    return window.innerWidth > 480 || store.getters.isRightMenuOpen
  }

  beforeDestroy(): void {
    // this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.OPEN_PAID_MODAL)
    store.commit('setShowRightMenuButton', false)
  }
}
