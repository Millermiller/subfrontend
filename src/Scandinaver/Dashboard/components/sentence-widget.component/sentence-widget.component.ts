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
import { SET_RESET_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'

@Component
export default class SentenceWidgetComponent extends BaseWidgetComponent {
  @Getter(COMPLETED_SENTENCES_ASSETS_COUNT)
  public readonly _completed: number

  @Getter(SENTENCE_ASSETS)
  public readonly _sentences: Asset[]

  protected title = this.$root.$tc('sentences')

  get all(): number {
    return this._sentences.length
  }

  get completed() {
    return this._completed
  }

  async goto(routeName: string): Promise<void> {
    await this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, AssetType.SENTENCES)
    this.$store.commit(SET_RESET_ASSET_TYPE, false)
    await this.$router.push({
      name: routeName,
      params: { language: this.currentLanguage },
    })
  }
}
