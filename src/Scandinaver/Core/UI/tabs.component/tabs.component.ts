import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import TabItemComponent from './tab-item.component/index.vue'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'TabsComponent',
  components: {
    TabItemComponent
  },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      //  overscrollEffect: 'bounce',
    })
  },
})
export default class TabsComponent extends Vue {
  @Prop({ required: true })
  private showLearnButton: boolean

  @Prop({ required: true })
  private showTestButton: boolean

  @Prop({ required: true })
  private loadAction: string

  wordTabName = AssetType.WORDS.toString()
  sentencesTabName = AssetType.SENTENCES.toString()
  personalTabName = AssetType.PERSONAL.toString()

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
    if (
      this.$store.getters.activeAssetType === AssetType.FAVORITES.toString()
    ) {
      return AssetType.PERSONAL.toString()
    }
    return this.$store.getters.activeAssetType
  }

  handleClick = () => {
    //
  }
}
