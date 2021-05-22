import Component from 'vue-class-component'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'
import {
  COMPLETED_SENTENCES_ASSETS_COUNT,
  SENTENCE_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

@Component
export default class SentenceWidgetComponent extends BaseWidgetComponent {
  @Getter(COMPLETED_SENTENCES_ASSETS_COUNT)
  public readonly completed: number

  @Getter(SENTENCE_ASSETS)
  public readonly sentences: Asset[]

  title = this.$root.$tc('sentences')

  get all() {
    return this.sentences.length
  }

  goto(routeName: string) {
    this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, AssetType.SENTENCES)
    this.$router.push({
      name: routeName,
      params: { language: this.currentLanguage },
    })
  }
}
