import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'
import {
  FAVOURITE_ASSET,
  PERSONAL_ASSETS,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

@Component
export default class PersonalWidgetComponent extends BaseWidgetComponent {
  @Getter(FAVOURITE_ASSET)
  private readonly favouriteAsset: Asset

  @Getter(PERSONAL_ASSETS)
  private readonly personalAssets: Asset[]

  public title = this.$root.$tc('personals')

  get all() {
    return this.personalAssets.length
  }

  personal() {
    this.$router.push({
      name: 'PersonalPage',
      params: { language: this.currentLanguage, id: this.favouriteAsset.id.toString() },
    })
  }
}
