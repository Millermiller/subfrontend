import Component from 'vue-class-component'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import { Getter } from '@/utils/getter.decorator'
import {
  COMPLETED_WORDS_ASSETS_COUNT,
  WORD_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { BaseWidgetComponent } from '@/Scandinaver/Dashboard/components/base-widget.component/base-widget.component'
import { DEFAULT_ASSET_PAGE } from '@/Scandinaver/Asset/routes'

@Component
export default class WordWidgetComponent extends BaseWidgetComponent {
  @Getter(COMPLETED_WORDS_ASSETS_COUNT)
  public readonly _completed: number

  @Getter(WORD_ASSETS)
  public readonly _words: Asset[]

  protected title = this.$root.$tc('words')
  protected link = DEFAULT_ASSET_PAGE

  get all(): number {
    return this._words.length
  }

  get completed() {
    return this._completed
  }

  public async goto(): Promise<void> {
    await this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, AssetType.WORDS)
    await this.$router.push({
      name: this.link,
      params: { language: this.currentLanguage },
    })
  }
}
