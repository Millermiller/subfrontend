import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Inject } from 'vue-typedi'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import ReaderService from '@/Scandinaver/Asset/Application/reader.service'

@Component({
  name: 'SlideComponent',
})
export default class SlideComponent extends Vue {
  @Prop({ required: true })
  private item!: Card

  @Inject()
  private readonly service: CardService

  @Inject()
  private readonly readerService: ReaderService

  public activeClass: string = 'el-icon-star-on'
  public defaultClass: string = 'el-icon-star-off'
  public show: boolean = false
  public loading: boolean = false
  private waitReading: boolean = false

  get favouriteButtonClass(): string {
    return this.item.favourite ? this.activeClass : this.defaultClass
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any): void {
    this.show = false
  }

  public showTranslate(): void {
    this.show = !this.show
  }

  public async play(text: string): Promise<void> {
    if (this.waitReading === false) {
      this.waitReading = true
      await this.readerService.read(text)
      this.waitReading = false
    }
  }

  public async favourite(): Promise<void> {
    if (!this.loading) {
      this.loading = true
      if (!this.item.favourite) {
        await this.service.addToFavourite(this.item)
        this.$notify.success({
          title: this.item.value,
          message: this.$tc('addToFavourite'),
          duration: 2000,
        })
        this.loading = false
      } else {
        this.item = await this.service.removeFromFavourite(this.item)
        this.$notify.success({
          title: this.item.value,
          message: this.$tc('removedFromFavourite'),
          duration: 2000,
        })
        this.loading = false
      }
    }
  }
}
