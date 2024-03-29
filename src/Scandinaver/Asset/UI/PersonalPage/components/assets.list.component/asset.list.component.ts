import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import AssetComponent from './asset.component/index.vue'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import AssetDTO from '@/Scandinaver/Asset/Domain/AssetDTO'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import {
  FAVOURITE_ASSET,
  PERSONAL_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { IS_ACTIVE } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'
import { PERSONAL_PAGE } from '@/Scandinaver/Asset/routes'

@Component({
  name: 'AssetsComponent',
  components: { AssetComponent },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      // overscrollEffect: 'bounce'
    })
  },
})
export default class AssetsComponent extends Vue {
  @Inject()
  private readonly assetService: AssetService

  @Getter(FAVOURITE_ASSET)
  private readonly _favouriteAsset: Asset

  @Getter(PERSONAL_ASSETS)
  private readonly _assets: Asset[]

  @Getter(IS_ACTIVE)
  private readonly _isActive: boolean

  public loading: boolean = false

  created(): void {
    this.$eventHub.$on(events.REMOVE_ASSET, this.remove)
  }

  public add(): void {
    if (this._isActive) {
      this.$prompt(this.$tc('title'), this.$tc('newAsset'), {
        confirmButtonText: this.$tc('create'),
        cancelButtonText: this.$tc('back'),
        inputPattern: /^.+$/,
        inputErrorMessage: this.$tc('titleLabel'),
      })
        .then(async (input: any) => {
          this.loading = true
          const dto: AssetDTO = {
            id: null,
            language: store.getters.language,
            level: 0,
            title: input.value,
            type: AssetType.PERSONAL,
            basic: false,
          }
          try {
            const newAsset = await this.assetService.create(dto)
            await this.assetService.addToPersonalAssets(newAsset)
            this.$notify.success({
              title: this.$tc('assetCreated'),
              message: input.value,
              duration: 4000,
            })
          } catch (error) {
            this.$notify.error({
              title: this.$tc('error'),
              message: error,
              duration: 4000,
            })
          } finally {
            this.loading = false
          }
        })
        .catch(() => {
          //
        })
    }
  }

  private async remove(asset: Asset): Promise<void> {
    this.loading = true
    await this.assetService.destroyAsset(asset)
    await this.assetService.removeFromPersonalAssets(asset)
    this.loading = false
    this.$notify.success({
      title: this.$tc('assetRemoved'),
      message: asset.title,
      duration: 4000,
    })
    await this.$router.push({
      name: PERSONAL_PAGE,
      params: {
        language: store.getters.language,
        id: this._favouriteAsset.id.toString(),
      },
    })
  }

  beforeDestroy(): void {
    this.$eventHub.$off(events.REMOVE_ASSET)
  }
}
