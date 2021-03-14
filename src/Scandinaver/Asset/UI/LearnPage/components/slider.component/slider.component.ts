import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { Inject } from 'vue-typedi'
import SlideComponent from './slide.component/index.vue'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { RESET_ACTIVE_ASSET } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'

@Component({
  name: 'SliderComponent',
  components: { SlideComponent },
})
export default class SliderComponent extends Vue {
  @Inject()
  private assetService: AssetService

  @Watch('$route')
  private async onRouteChange(route: any) {
    if (route.params.id) {
      await this.getAsset(parseInt(route.params.id, 10))
    }
  }

  title: string = ''
  cards: Card[] = []
  loading: boolean = false
  swiperOption: any = {
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

  async getAsset(id: number) {
    this.loading = true
    const asset = await this.assetService.getAsset(id)
    this.cards = asset.cards.all()
    this.swiper.slideTo(0)
    this.loading = false
    this.title = asset.title
  }

  get swiper() {
    // @ts-ignore
    return this.$refs.mySwiperA.swiper
  }

  async created() {
    if (parseInt(this.$route.params.id, 10) > 0) {
      await this.getAsset(parseInt(this.$route.params.id, 10))
    } else {
      await this.$store.dispatch(RESET_ACTIVE_ASSET)
      const card = new Card()
      card.translate = new Translate(this.$tc('selectAsset'))
      card.nocontrols = true
      this.cards.push(card)
    }
  }
}
