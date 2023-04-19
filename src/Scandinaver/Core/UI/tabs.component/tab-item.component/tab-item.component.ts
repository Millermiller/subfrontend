import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { SET_ASSET_AS_SELECTED } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { SET_ACTIVE_PERSONAL_ASSET_EDIT } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import { LEARN_ASSET_PAGE, PERSONAL_PAGE, TEST_PAGE } from '@/Scandinaver/Asset/routes'
import { Getter } from '@/utils/getter.decorator'
import {
  ACTIVE_ASSET_ID,
} from '@Asset/Infrastructure/store/asset/getters.type'

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

  @Getter(ACTIVE_ASSET_ID)
  public readonly _active_asset_id: string

  get currentLanguage(): string {
    return store.getters.language
  }

  get selected(): boolean {
    return this.asset.getId() === this._active_asset_id
  }

  get isPersonal(): boolean {
    return this.asset.category === AssetType.PERSONAL || this.asset.category === AssetType.FAVORITES
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
    if (this.asset.active || this.isPersonal) {
      this.$router.push({
        name: TEST_PAGE,
        params: { language: this.currentLanguage, id: this.asset.getId().toString() },
      }).then(() => {
        this.$store.commit('setRightMenuOpen', false)
      }).catch(() => {});
    }
  }

  public learn() {
    if (this.asset.active || this.isPersonal) {
      this.$router.push({
        name: LEARN_ASSET_PAGE,
        params: { language: this.currentLanguage, id: this.asset.getId() },
      }).then(() => {
        this.$store.commit('setRightMenuOpen', false)
      }).catch(() => {});
    }
  }

  public async update() {
    if (this.asset.active || this.isPersonal) {
      await this.$store.dispatch(SET_ASSET_AS_SELECTED, this.asset.getId())
      this.$store.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, true)
      this.$router.push({
        name: PERSONAL_PAGE,
        params: { language: this.currentLanguage, id: this.asset.getId().toString() },
      }).then(() => {
        this.$store.commit('setRightMenuOpen', false)
      }).catch(() => {
      });
    }
  }

  public showTestModal(): void {
    this.$eventHub.$emit(events.OPEN_TEST_MODAL, this.asset)
  }

  public showPaidModal(): void {
    this.$eventHub.$emit(events.OPEN_PAID_MODAL)
  }
}
