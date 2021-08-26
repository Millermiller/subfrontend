import Component from 'vue-class-component'
import {
  FAVOURITE_ASSET,
  PERSONAL_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { PERSONAL_PAGE } from '@/Scandinaver/Asset/routes'
import { BaseWidgetComponent } from '@/Scandinaver/Dashboard/components/base-widget.component/base-widget.component'

@Component
export default class PersonalWidgetComponent extends BaseWidgetComponent {
  @Getter(FAVOURITE_ASSET)
  private readonly _favouriteAsset: Asset

  @Getter(PERSONAL_ASSETS)
  private readonly _personalAssets: Asset[]

  protected title = this.$root.$tc('personals')
  protected link: string = PERSONAL_PAGE

  get all(): number {
    return this._personalAssets.length
  }
}
