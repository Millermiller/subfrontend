import Vue from 'vue'
import Component from 'vue-class-component'
import TabsComponent from '../../../Core/UI/tabs.component/index.vue'
import SliderComponent from './components/slider.component/index.vue'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component({
  name: 'LearnModule',
  components: {
    SliderComponent,
    TabsComponent
  },
})
export default class LearnModule extends Vue {
  get showRightMenu(): boolean {
    return window.innerWidth > 480 || store.getters.isRightMenuOpen
  }

  mounted(): void {
    store.commit('setShowRightMenuButton', true)
  }

  beforeDestroy(): void {
    // this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    store.commit('setShowRightMenuButton', false)
  }
}
