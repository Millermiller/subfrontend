import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import IWord from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { IPersonal } from '@/Scandinaver/Asset/Domain/Personal'
import { SET_ASSET_AS_SELECTED } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { SET_ACTIVE_PERSONAL_ASSET_EDIT, SET_SELECTION } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import * as events from '@/events/events.type'

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

  words: IWord[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  get isActive() {
    return this.$store.getters.isActive || this.item.type === 3
  }

  loadTest(): void {
    if (this.item.count > 1) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit(events.CLOSE_MENU)
      }
      this.$store.commit(SET_SELECTION, { asset: this.item, index: this.index })
      this.$router.push(`/learn/${this.item.id}`)
    }
  }

  cardspage() {
    if (this.isActive) {
      this.$store.dispatch(SET_ASSET_AS_SELECTED, this.item.id)
      this.$store.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, true)
      this.$router.push(`/cards/${this.item.id}`)
    }
  }

  test(): void {
    if (this.item.count > 1) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit(events.CLOSE_MENU)
      }
      //  this.$store.commit(SET_SELECTION, {asset: this.item, index: this.index})
      this.$router.push(`/test/${this.item.id}`)
    }
  }
}
