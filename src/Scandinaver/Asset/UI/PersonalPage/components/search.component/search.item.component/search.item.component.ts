import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import * as events from '@/events/events.type'

@Component({
  name: 'TranslateComponent',
})
export default class SearchItemComponent extends Vue {
  @Prop({ required: true })
  private card: Card

  @Prop({ required: true })
  private index!: number

  get user() {
    return this.$store.getters.user
  }

  add() {
    this.$eventHub.$emit(events.ADD_CART_TO_ASSET, this.card)
  }
}
