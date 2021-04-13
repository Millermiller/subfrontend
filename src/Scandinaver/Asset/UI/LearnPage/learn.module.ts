import Vue from 'vue'
import Component from 'vue-class-component'
import RightMenuButtonComponent from '@/Scandinaver/Core/UI/RightMenuButton.vue'
import * as events from '@/events/events.type'
import TabsComponent from '../../../Core/UI/tabs.component/index.vue'
import SliderComponent from './components/slider.component/index.vue'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component({
  name: 'LearnModule',
  components: {
    SliderComponent,
    TabsComponent,
    RightMenuButtonComponent,
  },
})
export default class LearnModule extends Vue {
  visible: boolean = false

  created() {
    this.$eventHub.$on(events.TOGGLE_RIGHT_MENU, this.toggleRightMenuR())
  }

  async toggleRightMenuR() {
    this.visible = !this.visible
    await this.$store.dispatch('toggleMenuOpen')
    await this.$store.dispatch('toggleBackdrop')
  }

  mounted() {
    this.visible = window.innerWidth > 910
  }

  beforeDestroy() {
    // this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.TOGGLE_RIGHT_MENU)
  }
}
