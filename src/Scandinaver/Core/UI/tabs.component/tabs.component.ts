import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import TabItemComponent from './tab-item.component/index.vue'
import { Prop } from 'vue-property-decorator'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

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

  dialogVisible: boolean = false
  dialogTitle: string = ''
  dialogContent: string = ''
  showTestLink: boolean = false
  previousAsset: Asset = null
  wordTabName = AssetType.WORDS.toString()
  sentencesTabName = AssetType.SENTENCES.toString()
  personalTabName = AssetType.PERSONAL.toString()

  created() {
    this.$eventHub.$on(events.OPEN_PAID_MODAL, this.paidModal)
    this.$eventHub.$on(events.OPEN_TEST_MODAL, this.testModal)
  }

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

  paidModal() {
    this.showTestLink = false
    this.dialogTitle = this.$tc('assetNotAvailable')
    this.dialogContent = this.$tc('paidNotify')
    this.dialogVisible = true
  }

  testModal(asset: Asset) {
    this.showTestLink = true
    this.previousAsset = this.$store.getters.getAssetByLevelAndType(asset.level, asset.type)
    this.dialogTitle = this.$tc('assetClosed')
    this.dialogContent = this.$t('testNotify', {
      title: this.previousAsset.title
    }).toString()
    this.dialogVisible = true
  }

  goToTest() {
    this.$router.push({
      name: 'Test',
      params: { language: store.getters.language, id: this.previousAsset.getId().toString() },
    })
  }

  beforeDestroy() {
    this.$eventHub.$off(events.OPEN_PAID_MODAL)
    this.$eventHub.$off(events.OPEN_TEST_MODAL)
  }
}
