import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import TabItemComponent from './tab-item.component/tab-item.component.vue'
import TabItemPersonalComponent from './tab-item-personal.component/tab-item-personal.component.vue'

@Component({
  name: 'TabsComponent',
  components: {
    TabItemComponent,
    TabItemPersonalComponent,
  },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      //  overscrollEffect: 'bounce',
    })
  },
})
export default class TabsComponent extends Vue {
  get personals() {
    return this.$store.getters.personal
  }

  get words() {
    return this.$store.getters.words
  }

  get sentences() {
    return this.$store.getters.sentences
  }

  get active() {
    return this.$store.getters.activeAssetType
  }

  handleClick = () => {
    //
  }
}
