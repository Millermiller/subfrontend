import Vue from 'vue';
import Component from 'vue-class-component';
import RightMenuButtonComponent from '@/Scandinaver/Core/UI/RightMenuButton.vue';
import * as events from '@/events/events.type'
import TabsComponent from './tabs.component/tabs.component.vue';
import SliderComponent from './slider.component/slider.component.vue';

@Component({
  name: 'LearnModule',
  components: {
    SliderComponent,
    TabsComponent,
    RightMenuButtonComponent,
  },
})
export default class LearnModule extends Vue {
  dialogVisible: boolean = false
  visible: boolean = false

  created() {
    this.$eventHub.$on(events.TOGGLE_RIGHT_MENU, this.toggleRightMenuR());
    this.$eventHub.$on(events.OPEN_PAID_MODAL, this.modal);
  }

  modal() {
    this.dialogVisible = true
  }

  async toggleRightMenuR() {
    this.visible = !this.visible;
    await this.$store.dispatch('toggleMenuOpen')
    await this.$store.dispatch('toggleBackdrop')
  }

  mounted() {
    this.visible = window.innerWidth > 910
  }

  beforeDestroy() {
    // this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.CLOSE_MENU);
    this.$eventHub.$off(events.OPEN_PAID_MODAL);
  }
}
