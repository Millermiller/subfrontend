import Vue from 'vue'
import Component from 'vue-class-component'
import ResultComponent from './result.component/index.vue'
import TabsComponent from '@/Scandinaver/Core/UI/tabs.component/index.vue'
import { Watch } from 'vue-property-decorator'
import type { Route } from 'vue-router'
import { Inject } from 'vue-typedi'
import AssetService from '@Asset/Application/asset.service'
import TestComponent from './test.component/index.vue'
import { Asset } from '@Asset/Domain/Asset'
import { BehaviorSubject } from 'rxjs'
import { RELOAD_TEST } from '@/events/events.type'

@Component({
  components: {
    ResultComponent,
    TabsComponent,
    TestComponent
  },
})
export default class TestPageComponent extends Vue {
  @Inject()
  private readonly assetService: AssetService

  public asset: BehaviorSubject<Asset> = new BehaviorSubject<Asset>(new Asset())
  public loading: boolean = false
  public dialogVisible: boolean = false

  @Watch('$route')
  private async onRouteChange(route: Route): Promise<void> {
    if (route.params.id) {
      await this.load(route.params.id)
    }
  }

  async created() {
    this.$eventHub.$on(RELOAD_TEST, this.reload)
    if (this.$route.params.id) {
      await this.load(this.$route.params.id)
    }
  }

  private async load(id: string): Promise<void> {
    this.loading = true
    const asset = await this.assetService.getAsset(id)
    this.asset.next(asset)
    this.loading = false
  }

  public async reload(): Promise<void> {
    await this.load(this.$route.params.id)
  }

  beforeDestroy() {
    this.$eventHub.$off(RELOAD_TEST)
  }
}
