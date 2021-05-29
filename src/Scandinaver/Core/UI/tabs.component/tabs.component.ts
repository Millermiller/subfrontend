import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import TabItemComponent from './tab-item.component/index.vue'
import { Prop } from 'vue-property-decorator'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { mapGetters } from 'vuex'
import {
  ACTIVE_ASSET_TYPE,
  GET_ASSETS_BY_LEVEL_AND_TYPE, PERSONAL_ASSETS, SENTENCE_ASSETS, WORD_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'

@Component({
  name: 'TabsComponent',
  components: {
    TabItemComponent
  },
  computed: mapGetters([ACTIVE_ASSET_TYPE]),
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

  @Getter(ACTIVE_ASSET_TYPE)
  private readonly activeAssetType: string

  @Getter(GET_ASSETS_BY_LEVEL_AND_TYPE)
  private readonly getAssetByLevelAndType: (level: number, type: AssetType) => Asset

  @Getter(WORD_ASSETS)
  private readonly words: Asset[]

  @Getter(SENTENCE_ASSETS)
  private readonly sentences: Asset[]

  @Getter(PERSONAL_ASSETS)
  private readonly personals: Asset[]

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

  get active() {
    if (
      this.activeAssetType === AssetType.FAVORITES.toString()
    ) {
      return AssetType.PERSONAL.toString()
    }
    return this.activeAssetType
  }

  paidModal() {
    this.showTestLink = false
    this.dialogTitle = this.$tc('assetNotAvailable')
    this.dialogContent = this.$tc('paidNotify')
    this.dialogVisible = true
  }

  testModal(asset: Asset) {
    this.showTestLink = true
    this.previousAsset = this.getAssetByLevelAndType(asset.level, asset.type)
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
