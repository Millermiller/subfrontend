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
  public showLearnButton: boolean

  @Prop({ required: true })
  public showTestButton: boolean

  @Prop({ required: true })
  public loadAction: string

  @Getter(ACTIVE_ASSET_TYPE)
  private readonly _activeAssetType: string

  @Getter(GET_ASSETS_BY_LEVEL_AND_TYPE)
  private readonly _getAssetByLevelAndType: (level: number, type: AssetType) => Asset

  @Getter(WORD_ASSETS)
  public readonly _words: Asset[]

  @Getter(SENTENCE_ASSETS)
  public readonly _sentences: Asset[]

  @Getter(PERSONAL_ASSETS)
  public readonly _personals: Asset[]

  public dialogVisible: boolean = false
  public dialogTitle: string = ''
  public dialogContent: string = ''
  public showTestLink: boolean = false
  private previousAsset: Asset = null
  public wordTabName = AssetType.WORDS.toString()
  public sentencesTabName = AssetType.SENTENCES.toString()
  public personalTabName = AssetType.PERSONAL.toString()

  created(): void {
    this.$eventHub.$on(events.OPEN_PAID_MODAL, this.paidModal)
    this.$eventHub.$on(events.OPEN_TEST_MODAL, this.testModal)
  }

  get active(): string {
    if (
      this._activeAssetType === AssetType.FAVORITES.toString()
    ) {
      return AssetType.PERSONAL.toString()
    }
    return this._activeAssetType
  }

  private paidModal(): void {
    this.showTestLink = false
    this.dialogTitle = this.$tc('assetNotAvailable')
    this.dialogContent = this.$tc('paidNotify')
    this.dialogVisible = true
  }

  private testModal(asset: Asset): void {
    this.showTestLink = true
    this.previousAsset = this._getAssetByLevelAndType(asset.level, asset.type)
    this.dialogTitle = this.$tc('assetClosed')
    this.dialogContent = this.$t('testNotify', {
      title: this.previousAsset.title
    }).toString()
    this.dialogVisible = true
  }

  public async goToTest(): Promise<void> {
    this.$router.push({
      name: 'Test',
      params: { language: store.getters.language, id: this.previousAsset.getId().toString() },
    })
  }

  beforeDestroy(): void {
    this.$eventHub.$off(events.OPEN_PAID_MODAL)
    this.$eventHub.$off(events.OPEN_TEST_MODAL)
  }
}
