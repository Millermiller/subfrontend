import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { Inject } from 'vue-typedi'
import SlideComponent from './slide.component/index.vue'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { RESET_ACTIVE_ASSET } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { Getter } from '@/utils/getter.decorator'
import {
  COMPLETED_SENTENCES_ASSETS_COUNT,
  NEED_RESET_ASSET_TYPE,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { SET_RESET_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'

@Component({
  name: 'SliderComponent',
  components: { SlideComponent },
})
export default class SliderComponent extends Vue {
  @Inject()
  private readonly assetService: AssetService

  @Getter(NEED_RESET_ASSET_TYPE)
  public readonly _needReset: boolean

  @Watch('$route')
  private async onRouteChange(route: any) {
    if (route.params.id) {
      await this.loadAsset(parseInt(route.params.id, 10))
    }
  }

  public title: string = ''
  public cards: Card[] = []
  public loading: boolean = false
  public readonly swiperOption: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.5,
  }

  private async loadAsset(id: number): Promise<void> {
    this.loading = true
    const asset = await this.assetService.getAsset(id)
    this.cards = asset.cards.all()
    this.swiper.slideTo(0)
    this.loading = false
    this.title = asset.title
  }

  get swiper(): any {
    // @ts-ignore
    return this.$refs.mySwiperA.swiper
  }

  async created(): Promise<void> {
    if (parseInt(this.$route.params.id, 10) > 0) {
      await this.loadAsset(parseInt(this.$route.params.id, 10))
    } else {
      if (this._needReset === true) {
        await this.$store.dispatch(RESET_ACTIVE_ASSET)
      }
      this.$store.commit(SET_RESET_ASSET_TYPE, true)
      const card = new Card()
      card.translate = new Translate(this.$tc('selectAsset'))
      card.nocontrols = true
      this.cards.push(card)
    }
  }
}
