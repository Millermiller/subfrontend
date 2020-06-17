import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Inject } from 'vue-typedi'
import CardService from '@/Scandinaver/Asset/Application/card.service'

@Component({
  name: 'SlideComponent',
})
export default class SlideComponent extends Vue {
  @Prop({ required: true })
  private item!: Card

  @Inject()
  private service: CardService

  activeClass: string = 'el-icon-star-on'
  defaultClass: string = 'el-icon-star-off'
  show: boolean = false
  loading: boolean = false

  get favouriteButtonClass(): string {
    return this.item.favourite ? this.activeClass : this.defaultClass
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    this.show = false
  }

  showTranslate() {
    this.show = !this.show
  }

  play(audio: string) {
    new Audio(process.env.VUE_APP_BASE_API + audio).play()
  }

  async favourite() {
    if (!this.loading) {
      this.loading = true
      if (!this.item.favourite) {
        this.item = await this.service.addToFavourite(this.item)
        this.$notify.success({
          title: this.item.word!.word,
          message: this.$tc('addToFavourite'),
          duration: 2000,
        })
        this.loading = false
      } else {
        this.item = await this.service.removeFromFavourite(this.item)
        this.$notify.success({
          title: this.item.word!.word,
          message: this.$tc('removedFromFavourite'),
          duration: 2000,
        })
        this.loading = false
      }
    }
  }
}
