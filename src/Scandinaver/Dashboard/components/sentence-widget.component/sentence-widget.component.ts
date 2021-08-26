import Component from 'vue-class-component'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import {
  COMPLETED_SENTENCES_ASSETS_COUNT,
  SENTENCE_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { SET_RESET_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import { BaseWidgetComponent } from '@/Scandinaver/Dashboard/components/base-widget.component/base-widget.component'
import { DEFAULT_ASSET_PAGE } from '@/Scandinaver/Asset/routes'

@Component
export default class SentenceWidgetComponent extends BaseWidgetComponent {
  @Getter(COMPLETED_SENTENCES_ASSETS_COUNT)
  public readonly _completed: number

  @Getter(SENTENCE_ASSETS)
  public readonly _sentences: Asset[]

  protected title: string = this.$root.$tc('sentences')
  protected link: string = DEFAULT_ASSET_PAGE

  get all(): number {
    return this._sentences.length
  }

  get completed() {
    return this._completed
  }

  public async goto(): Promise<void> {
    await this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, AssetType.SENTENCES)
    this.$store.commit(SET_RESET_ASSET_TYPE, false)
    await this.$router.push({
      name: this.link,
      params: { language: this.currentLanguage },
    })
  }
}
