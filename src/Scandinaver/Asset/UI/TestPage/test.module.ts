import Vue from 'vue'
import Component from 'vue-class-component'
import Result from './components/result.component/index.vue'
import TabsComponent from '../../../Core/UI/tabs.component/index.vue'
import * as events from '@/events/events.type'

@Component({
  name: 'Tests',
  components: {
    Result,
    TabsComponent,
  },
})
export default class Tests extends Vue {
  dialogVisible: boolean = false
  visible: boolean = false

  created(): void {
    this.$eventHub.$on(events.CLOSE_MENU, this.toggleRightMenu)
    this.$eventHub.$on(events.OPEN_PAID_MODAL, this.modal)
  }

  modal(): void {
    this.dialogVisible = true
  }

  toggleRightMenu(): void {
    this.visible = !this.visible
    this.$store.dispatch('toggleMenuOpen')
    this.$store.dispatch('toggleBackdrop')
  }

  mounted(): void {
    this.visible = window.innerWidth > 910
  }

  beforeDestroy() {
    // this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.CLOSE_MENU)
    this.$eventHub.$off(events.OPEN_PAID_MODAL)
  }
}
