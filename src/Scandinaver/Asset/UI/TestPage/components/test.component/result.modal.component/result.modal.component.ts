import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import { CLOSE_RESULT_MODAL, RELOAD_TEST } from '@/events/events.type'

@Component({
  name: 'ResultModalComponent'
})
export default class ResultModalComponent extends Vue {
  @Prop()
  private visible: boolean

  @Prop()
  public test!: Test

  reload() {
    this.$eventHub.$emit(RELOAD_TEST)
  }

  close() {
    if (this.visible === true) {
      this.$eventHub.$emit(CLOSE_RESULT_MODAL)
    }
  }
}
