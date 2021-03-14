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
  private assetService: AssetService

  edited: boolean = false
  assetName: string = ''
  loading: boolean = false

  get selected(): boolean {
    return this.asset.getId() === this.$store.getters.activeAssetId
  }

  get isActive() {
    return this.$store.getters.isActive
  }

  get isFavourite(): boolean {
    return this.asset.type === AssetType.FAVORITES
  }

  created() {
    this.assetName = this.asset.title
  }

  showResponder = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  confirm(asset: any) {
    if (this.isActive) {
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

  load(): void {
    if (this.isActive && !this.selected) {
      this.$router.push({
        name: 'PersonalPage',
        params: {
          language: this.currentLanguage,
          id: this.asset.id.toString(),
        },
      })
    }
  }

  test(): void {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$router.push({
      name: 'Test',
      params: { language: this.currentLanguage, id: this.asset.getId().toString() },
    })
  }

  learn() {
    if (this.asset.active) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit(events.CLOSE_MENU)
      }
      this.$router.push({
        name: 'learnAsset',
        params: { language: this.currentLanguage, id: this.asset.getId().toString() },
      })
    }
  }

  openedit() {
    this.edited = true
  }

  closeedit() {
    this.edited = false
  }

  async applyedit() {
    this.loading = true
    const dto: AssetDTO = this.asset.toDTO()
    dto.title = this.assetName
    await this.assetService.updateAsset(this.asset, dto)
    this.edited = false
    this.loading = false
  }
}
