import Vue from 'vue'
import Component from 'vue-class-component'
import SearchItemComponent from './search.item.component/index.vue'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm, {
  DictionaryForm,
} from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { Inject } from 'vue-typedi'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import * as events from '@/events/events.type'

@Component({
  components: {
    SearchItemComponent,
  },
})
export default class SearchComponent extends Vue {
  @Inject()
  private service: CardService

  dialogFormVisible: boolean = false
  word: string = ''
  sentence: boolean = false
  loading: boolean = false
  cards: Card[] = []
  message: boolean | string = false
  form: IDictionaryForm = new DictionaryForm()

  get isActive(): boolean {
    return this.$store.getters.isActive
  }

  livesearch() {
    if (this.word.length > 2) {
      this.search()
    }
  }

  search(): void {
    if (this.word !== '') {
      this.loading = true
      this.service.translate(this.word, this.sentence).then(
        (response): void => {
          this.loading = false
          if (!response.length) {
            this.message = this.$tc('noResult')
            this.cards = []
          } else {
            this.message = false
            this.cards = response

            const word_ids: number[] = []

            this.$store.getters.cards.forEach(
              (el: Card, i: number, ar: Card[]) => {
                word_ids.push(el.word!.id)
              },
            )

            this.cards.forEach((el: Card, index: number, array: Card[]) => {
              if (word_ids.indexOf(el.id) >= 0) el.exist = true
            })
          }
        },
        (response) => {
          if (response.data.errors.word) {
            response.data.errors.word.forEach((item: string) => {
              this.message = item
            })
            this.loading = false
          }
        },
      )
    }
  }

  openform() {
    if (this.isActive) {
      this.dialogFormVisible = true
    }
  }

  async submit() {
    this.form.is_public = this.form.is_public ? 1 : 0
    const card = await this.service.createCard(this.form)
    this.cards = [card]
    this.dialogFormVisible = false
  }

  beforeDestroy() {
    this.$eventHub.$off(events.ADD_CART_TO_ASSET)
  }
}
