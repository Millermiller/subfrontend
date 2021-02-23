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
  private assetService: AssetService

  @Inject()
  private cardService: CardService

  @Watch('$route')
  private onRouteChange(route: any) {
    if (parseInt(this.$route.params.id, 10) > 0) {
      this.load(parseInt(this.$route.params.id, 10))
    }
  }

  asset: Asset = new Asset()
  loading: boolean = false

  created() {
    this.$eventHub.$on(events.ADD_CART_TO_ASSET, this.add)
    this.$eventHub.$on(events.DELETE_CART_FROM_ASSET, this.removeCard)

    if (parseInt(this.$route.params.id, 10) > 0) {
      this.load(parseInt(this.$route.params.id, 10))
    } else {
      this.$store.dispatch(RESET_ACTIVE_ASSET)
    }
  }

  async load(id: number) {
    this.loading = true
    this.asset = await this.assetService.getAsset(id)
    this.loading = false
  }

  async add(card: Card) {
    this.loading = true
    await this.cardService.addCardToAsset(card, this.asset)
    this.loading = false
    await this.load(this.asset.getId())
    this.$notify.success({
      title: this.$tc('cardAdded'),
      message: card.word.getValue(),
      duration: 4000,
    })
  }

  async removeCard(data: any) {
    this.loading = true
    await this.cardService.removeFromAsset(data.card, this.asset)
    await this.load(this.asset.getId())
    this.$notify.success({
      title: this.$tc('cardRemoved'),
      message: data.card.word!.getValue(),
      duration: 4000,
    })
  }

  beforeDestroy() {
    this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.DELETE_CART_FROM_ASSET)
    this.$eventHub.$off(events.ADD_CART_TO_ASSET)
    this.$eventHub.$off(events.DELETE_CART_FROM_ASSET)
  }
}
