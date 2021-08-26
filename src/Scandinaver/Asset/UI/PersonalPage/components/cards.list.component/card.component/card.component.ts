import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import * as events from '@/events/events.type'

@Component({
  name: 'CardComponent',
})
export default class CardComponent extends Vue {
  @Prop({ required: true })
  private card: Card

  @Prop({ required: true })
  private index: number

  public removeCard(): void {
    this.$eventHub.$emit(events.DELETE_CART_FROM_ASSET, {
      card: this.card,
      index: this.index,
    })
  }
}
