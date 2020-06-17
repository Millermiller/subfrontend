import Component from 'vue-class-component'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class SentenceWidgetComponent extends BaseWidgetComponent {
  title = this.$root.$tc('sentences')

  get all() {
    return this.$store.getters.sentences.length
  }

  get active() {
    return this.$store.getters.activeSentences
  }

  goto() {
    this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, 2)
    this.$router.push('/learn')
  }
}
