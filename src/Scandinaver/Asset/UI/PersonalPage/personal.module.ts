import Vue from 'vue'
import Component from 'vue-class-component'
import AssetsListComponent from './components/assets.list.component/index.vue'
import SearchComponent from './components/search.component/index.vue'
import CardsListComponent from './components/cards.list.component/index.vue'
import {
  ON_CARDS_PAGE_CLOSE,
  RESET_ACTIVE_ASSET,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Watch } from 'vue-property-decorator'

@Component({
  name: 'PersonalComponent',
  components: {
    AssetsListComponent,
    CardsListComponent,
    SearchComponent,
  },
})
export default class PersonalComponent extends Vue {
  @Inject()
  private readonly assetService: AssetService

  @Inject()
  private readonly cardService: CardService

  @Watch('$route')
  private async onRouteChange(route: any): Promise<void> {
    if (this.$route.params.id) {
      await this.load(this.$route.params.id)
    }
  }

  public asset: Asset = new Asset()
  public loading: boolean = false

  async created(): Promise<void> {
    this.$eventHub.$on(events.ADD_CART_TO_ASSET, this.add)
    this.$eventHub.$on(events.DELETE_CART_FROM_ASSET, this.removeCard)

    if (this.$route.params.id) {
      await this.load(this.$route.params.id)
    } else {
      await this.$store.dispatch(RESET_ACTIVE_ASSET)
    }
  }

  private async load(id: string): Promise<void> {
    this.loading = true
    this.asset = await this.assetService.getAsset(id)
    this.loading = false
  }

  private async add(card: Card): Promise<void> {
    this.loading = true
    try {
      await this.assetService.addCardToAsset(card, this.asset)
      this.loading = false
      this.$notify.success({
        title: this.$tc('cardAdded'),
        message: card.term.getValue(),
        duration: 4000,
      })
    } catch (error) {
      this.loading = false
    }
  }

  private async removeCard(data: { card: Card, index: number }): Promise<void> {
    this.loading = true
    await this.assetService.removeCardFromAsset(data.card, this.asset)
    this.loading = false
    this.$notify.success({
      title: this.$tc('cardRemoved'),
      message: data.card.term!.getValue(),
      duration: 4000,
    })
  }

  async beforeDestroy(): Promise<void> {
    await this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.DELETE_CART_FROM_ASSET)
    this.$eventHub.$off(events.ADD_CART_TO_ASSET)
    this.$eventHub.$off(events.DELETE_CART_FROM_ASSET)
  }
}
