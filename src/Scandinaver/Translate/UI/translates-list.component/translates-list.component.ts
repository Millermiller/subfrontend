import Component from 'vue-class-component'
import Vue from 'vue'
import { Getter } from '@/utils/getter.decorator'
import { TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/getters.type'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import TranslateItemComponent
  from '@/Scandinaver/Translate/UI/translates-list.component/translate-item.component/index.vue'

@Component({
  name: 'TranslatesListComponent',
  components: {
    TranslateItemComponent,
  },
})
export default class TranslatesListComponent extends Vue {
  @Getter(TEXTS)
  public readonly _translates: Translate[]
}
