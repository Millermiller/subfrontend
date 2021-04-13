import Component from 'vue-class-component'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'

@Component
export default class SentenceWidgetComponent extends BaseWidgetComponent {
  title = this.$root.$tc('sentences')

  get all() {
    return this.$store.getters.sentences.length
  }

  get completed() {
    return this.$store.getters.completedSentencesAssetsCount
  }

  goto(routeName: string) {
    this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, AssetType.SENTENCES)
    this.$router.push({
      name: routeName,
      params: { language: this.currentLanguage },
    })
  }
}
