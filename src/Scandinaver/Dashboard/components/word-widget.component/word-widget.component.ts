import Component from 'vue-class-component'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'
import { Getter } from '@/utils/getter.decorator'
import {
  COMPLETED_WORDS_ASSETS_COUNT,
  WORD_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

@Component
export default class WordWidgetComponent extends BaseWidgetComponent {
  @Getter(COMPLETED_WORDS_ASSETS_COUNT)
  public readonly completed: number

  @Getter(WORD_ASSETS)
  public readonly words: Asset[]

  title = this.$root.$tc('words')

  get all(): number {
    return this.words.length
  }

  goto(routeName: string): void {
    this.$store
      .dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, AssetType.WORDS)
      .then((r) => {
        this.$router.push({
          name: routeName,
          params: { language: this.currentLanguage },
        })
      })
  }
}
