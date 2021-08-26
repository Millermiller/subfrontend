import Component from 'vue-class-component'
import { Getter } from '@/utils/getter.decorator'
import { ACTIVE_TEXTS, TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/getters.type'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import { BaseWidgetComponent } from '@/Scandinaver/Dashboard/components/base-widget.component/base-widget.component'
import { TRANSLATES_LIST_PAGE } from '@/Scandinaver/Translate/routes'

@Component
export default class TextWidgetComponent extends BaseWidgetComponent {
  @Getter(TEXTS)
  public readonly _texts: Translate[]

  @Getter(ACTIVE_TEXTS)
  public readonly _active: Translate[]

  protected title: string = this.$root.$tc('translates')
  protected link: string = TRANSLATES_LIST_PAGE
}
