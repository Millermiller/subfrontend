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
  private assetService: AssetService

  @Getter(FAVOURITE_ASSET)
  private readonly favouriteAsset: Asset

  @Getter(PERSONAL_ASSETS)
  private readonly assets: Asset[]

  @Getter(IS_ACTIVE)
  private readonly isActive: boolean

  loading: boolean = false

  created() {
    this.$eventHub.$on(events.REMOVE_ASSET, this.remove)
  }

  add() {
    if (this.isActive) {
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

  async remove(asset: Asset) {
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
      name: 'PersonalPage',
      params: {
        language: store.getters.language,
        id: this.favouriteAsset.id.toString(),
      },
    })
  }

  beforeDestroy() {
    this.$eventHub.$off(events.REMOVE_ASSET)
  }
}
