import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import CardComponent from './card.component/index.vue'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import { Card } from '@/Scandinaver/Asset/Domain/Card'

@Component({
  name: 'CardsComponent',
  components: { CardComponent },
})
export default class CardsListComponent extends Vue {
  @Prop()
  private name: string

  @Prop()
  private cards: Collection<Card>

  @Prop({ required: true })
  private loading: boolean

  private loadingbody: boolean = false
}
