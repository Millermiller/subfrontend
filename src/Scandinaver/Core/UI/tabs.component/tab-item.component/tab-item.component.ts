import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { SET_ASSET_AS_SELECTED } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { SET_ACTIVE_PERSONAL_ASSET_EDIT } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

@Component({
  name: 'TabItemComponent',
})
export default class TabItemComponent extends Vue {
  @Prop({ required: true })
  public asset: Asset

  @Prop({ required: true })
  private type: any

  @Prop({ required: true })
  private index: number

  @Prop({ required: true })
  public showLearnButton: boolean

  @Prop({ required: true })
  public showTestButton: boolean

  @Prop({ required: true })
  public showEditButton: boolean

  @Prop({ required: true })
  private loadAction: string

  get currentLanguage(): string {
    return store.getters.language
  }

  get selected(): boolean {
    return this.asset.getId() === this.$store.getters.activeAssetId
  }

  get isPersonal(): boolean {
    return this.asset.type === AssetType.PERSONAL || this.asset.type === AssetType.FAVORITES
  }

  public load(): void {
    const actionName: string = this.loadAction;
    if (!this.selected) {
      (this as any)[actionName]()
    }
  }

  public test(): void {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$router.push({
      name: 'Test',
      params: { language: this.currentLanguage, id: this.asset.getId().toString() },
    }).then(() => {
      this.$store.commit('setRightMenuOpen', false)
    })
  }

  public learn() {
    if (this.asset.active || this.isPersonal) {
      this.$router.push({
        name: 'learnAsset',
        params: { language: this.currentLanguage, id: this.asset.getId().toString() },
      }).then(() => {
        this.$store.commit('setRightMenuOpen', false)
      })
    }
  }

  public update() {
    if (this.asset.active || this.isPersonal) {
      this.$store.dispatch(SET_ASSET_AS_SELECTED, this.asset.getId())
      this.$store.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, true)
      this.$router.push({
        name: 'PersonalPage',
        params: { language: this.currentLanguage, id: this.asset.getId().toString() },
      }).then(() => {
        this.$store.commit('setRightMenuOpen', false)
      })
    }
  }

  public showTestModal(): void {
    this.$eventHub.$emit(events.OPEN_TEST_MODAL, this.asset)
  }

  public showPaidModal(): void {
    this.$eventHub.$emit(events.OPEN_PAID_MODAL)
  }
}
