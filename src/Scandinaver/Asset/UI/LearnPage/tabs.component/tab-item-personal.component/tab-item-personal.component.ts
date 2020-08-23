import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { IPersonal } from '@/Scandinaver/Asset/Domain/Personal'
import { SET_ASSET_AS_SELECTED } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import {
  SET_ACTIVE_PERSONAL_ASSET_EDIT,
  SET_SELECTION,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import * as events from '@/events/events.type'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Word } from '@/Scandinaver/Asset/Domain/Word'

@Component({
  name: 'TabItemPersonalComponent',
})
export default class TabItemPersonalComponent extends Vue {
  @Prop({ required: true })
  private item!: any

  @Prop({ required: true })
  private type!: any

  @Prop({ required: true })
  private index!: number

  words: Word[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  get isActive() {
    return this.$store.getters.isActive || this.item.type === 3
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  load(): void {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$router.push({
      name: 'learnAsset',
      params: { language: this.currentLanguage, id: this.item.id },
    })
  }

  cardspage() {
    if (this.isActive) {
      this.$store.dispatch(SET_ASSET_AS_SELECTED, this.item.id)
      this.$store.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, true)
      this.$router.push({
        name: 'CardsPage',
        params: { language: this.currentLanguage, id: this.item.id },
      })
    }
  }

  test(): void {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$store.commit(SET_SELECTION, this.item)
    this.$router.push({
      name: 'Test',
      params: { language: this.currentLanguage, id: this.item.id },
    })
  }
}
