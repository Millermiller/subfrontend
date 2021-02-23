import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import * as events from '@/events/events.type'
import Question from '@/Scandinaver/Asset/Domain/Question'

@Component({
  name: 'ErrorItem',
})
export default class ErrorItem extends Vue {
  @Prop({ required: true })
  public item: Question

  @Prop({ required: true })
  public index!: any

  @Inject()
  private service: CardService

  activeClass: string = 'el-icon-star-on'
  defaultClass: string = 'el-icon-star-off'
  loading: boolean = false

  get favouriteButtonClass(): string {
    return this.item.card.favourite ? this.activeClass : this.defaultClass
  }

  remove(id: number) {
    this.$eventHub.$emit(events.REMOVE_ERROR_ITEM, id)
  }

  async favourite() {
    if (!this.loading) {
      this.loading = true
      if (!this.item.card.favourite) {
        this.item.card = await this.service.addToFavourite(this.item.card)
        this.$notify.success({
          title: this.item.card.word.getValue(),
          message: this.$tc('addToFavourite'),
          duration: 2000,
        })
      } else {
        this.item.card = await this.service.removeFromFavourite(this.item.card)
        this.$notify.success({
          title: this.item.card.word!.getValue(),
          message: this.$tc('removedFromFavourite'),
          duration: 2000,
        })
        this.loading = false
      }
    }
  }
}
