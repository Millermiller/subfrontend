import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import CardComponent from './card.component/index.vue'

@Component({
  name: 'CardsComponent',
  components: { CardComponent },
})
export default class CardsListComponent extends Vue {
  @Prop()
  private name: string

  @Prop()
  private cards: any

  @Prop({ required: true })
  private loading: boolean

  private loadingbody: boolean = false
}
