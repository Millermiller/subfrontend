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
import { Getter } from '@/utils/getter.decorator'
import { ACTIVE_PERSONAL_ASSET_CARDS } from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { IS_ACTIVE } from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'

@Component({
  components: {
    SearchItemComponent,
  },
})
export default class SearchComponent extends Vue {
  @Inject()
  private readonly service: CardService

  @Getter(ACTIVE_PERSONAL_ASSET_CARDS)
  private readonly _activePersonalAssetCards: Card[]

  @Getter(IS_ACTIVE)
  private readonly _isActive: boolean

  public dialogFormVisible: boolean = false
  public word: string = ''
  public sentence: boolean = false
  public loading: boolean = false
  public cards: Card[] = []
  public message: boolean | string = false
  public form: IDictionaryForm = new DictionaryForm()

  public liveSearch(): void {
    if (this.word.length > 2) {
      this.search()
    }
  }

  public search(): void {
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

            this._activePersonalAssetCards.forEach(
              (el: Card, i: number, ar: Card[]) => {
                word_ids.push(el.term!.id)
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

  public openForm(): void {
    if (this._isActive) {
      this.dialogFormVisible = true
    }
  }

  public async submit(): Promise<void> {
    this.form.is_public = this.form.is_public ? 1 : 0
    const card = await this.service.createCard(this.form)
    this.cards = [card]
    this.dialogFormVisible = false
  }

  beforeDestroy(): void {
    this.$eventHub.$off(events.ADD_CART_TO_ASSET)
  }
}
