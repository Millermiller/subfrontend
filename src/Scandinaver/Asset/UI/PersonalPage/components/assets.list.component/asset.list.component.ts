import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import AssetComponent from './asset.component/index.vue'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { ADD_PERSONAL_ASSET } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

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

  loading: boolean = false

  get assets(): Asset[] {
    return this.$store.getters.personal
  }

  get isActive() {
    return this.$store.getters.isActive
  }

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
        .then((input: any) => {
          this.loading = true
          this.$store.dispatch(ADD_PERSONAL_ASSET, input.value).then(
            (response) => {
              this.$notify.success({
                title: this.$tc('assetCreated'),
                message: input.value,
                duration: 4000,
              })
              this.loading = false
            },
            (error) => {
              this.$notify.error({
                title: this.$tc('error'),
                message: '',
                duration: 4000,
              })
            },
          )
        })
        .catch(() => {
          //
        })
    }
  }

  async remove(asset: any) {
    this.loading = true
    await this.assetService.destroyAsset(asset)
    this.loading = false
    this.$notify.success({
      title: this.$tc('assetRemoved'),
      message: asset.title,
      duration: 4000,
    })
  }

  beforeDestroy() {
    this.$eventHub.$off(events.REMOVE_ASSET)
  }
}
