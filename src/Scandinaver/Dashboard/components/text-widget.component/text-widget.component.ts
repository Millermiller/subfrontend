import Component from 'vue-class-component'
import BaseWidgetComponent from '../base-widget.component/base-widget.component'
import { Getter } from '@/utils/getter.decorator'
import { ACTIVE_TEXTS, TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/getters.type'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'

@Component
export default class TextWidgetComponent extends BaseWidgetComponent {
  @Getter(TEXTS)
  public readonly _texts: Translate[]

  @Getter(ACTIVE_TEXTS)
  public readonly _active: Translate[]

  protected title = this.$root.$tc('translates')
}
