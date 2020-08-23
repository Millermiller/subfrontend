import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { IPersonal } from '@/Scandinaver/Asset/Domain/Personal'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import * as events from '@/events/events.type'
import { SET_SELECTION } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { Word } from '@/Scandinaver/Asset/Domain/Word'

@Component({
  name: 'TabItemComponent',
})
export default class TabItemComponent extends Vue {
  @Prop({ required: true })
  private item!: any

  @Prop({ required: true })
  private type!: any

  @Prop({ required: true })
  private index!: number

  words: Word[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  get currentLanguage(): string {
    return store.getters.language
  }

  load() {
    if (this.item.active) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit(events.CLOSE_MENU)
      }
      this.$router.push({
        name: 'learnAsset',
        params: { language: this.currentLanguage, id: this.item.id },
      })
    }
  }

  test() {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$store.commit(SET_SELECTION, this.item)
    this.$router.push({
      name: 'Test',
      params: { language: this.currentLanguage, id: this.item.id },
    })
  }

  showModal() {
    this.$eventHub.$emit(events.OPEN_PAID_MODAL)
  }
}
