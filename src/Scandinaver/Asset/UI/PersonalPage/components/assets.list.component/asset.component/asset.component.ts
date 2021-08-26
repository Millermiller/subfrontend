import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import * as events from '@/events/events.type'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import AssetDTO from '@/Scandinaver/Asset/Domain/AssetDTO'
import { Getter } from '@/utils/getter.decorator'
import { ACTIVE_ASSET_ID } from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { IS_ACTIVE } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'
import { LEARN_ASSET_PAGE, PERSONAL_PAGE, TEST_PAGE } from '@/Scandinaver/Asset/routes'

@Component({
  name: 'AssetComponent',
})
export default class AssetComponent extends Vue {
  @Prop({ required: true })
  public asset!: Asset

  @Prop({ required: true })
  private index!: number

  @Prop({ required: true })
  private showLearnButton: boolean

  @Prop({ required: true })
  private showTestButton: boolean

  @Inject()
  private readonly assetService: AssetService

  @Getter(ACTIVE_ASSET_ID)
  private readonly _activeAssetId: number

  @Getter(IS_ACTIVE)
  private readonly _isActive: boolean

  public edited: boolean = false
  public assetName: string = ''
  public loading: boolean = false

  get selected(): boolean {
    return this.asset.getId() === this._activeAssetId
  }

  get isFavourite(): boolean {
    return this.asset.type === AssetType.FAVORITES
  }

  public showResponder = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  public confirm(asset: any): void {
    if (this._isActive) {
      this.$confirm(this.$tc('removeAssetConfirm'), asset.title, {
        confirmButtonText: this.$tc('yes'),
        cancelButtonText: this.$tc('no'),
        type: 'warning',
      })
        .then(() => {
          this.$eventHub.$emit(events.REMOVE_ASSET, this.asset)
        })
        .catch(() => {
          //
        })
    }
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  public load(): void {
    if (this._isActive && !this.selected) {
      this.$router.push({
        name: PERSONAL_PAGE,
        params: {
          language: this.currentLanguage,
          id: this.asset.id.toString(),
        },
      })
    }
  }

  public test(): void {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$router.push({
      name: TEST_PAGE,
      params: { language: this.currentLanguage, id: this.asset.getId().toString() },
    })
  }

  public learn(): void {
    if (this.asset.active) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit(events.CLOSE_MENU)
      }
      this.$router.push({
        name: LEARN_ASSET_PAGE,
        params: { language: this.currentLanguage, id: this.asset.getId().toString() },
      })
    }
  }

  public openEdit(): void {
    this.assetName = this.asset.title
    this.edited = true
  }

  public closeEdit(): void {
    this.edited = false
  }

  public async applyEdit(): Promise<void> {
    this.loading = true
    const dto: AssetDTO = this.asset.toDTO()
    dto.title = this.assetName
    await this.assetService.updateAsset(this.asset, dto)
    this.edited = false
    this.loading = false
  }
}
