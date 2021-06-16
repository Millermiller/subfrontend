import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import ErrorItem from './error.item.component/index.vue'
import * as events from '@/events/events.type'
import * as moment from 'moment'
import {
  LEVEL,
  PERCENT,
  QUANTITY, RESULT, TIME, TITLE,
} from '@/Scandinaver/Asset/Infrastructure/store/test/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { Inject } from 'vue-typedi'
import TestService from '@/Scandinaver/Asset/Application/test.service'
import Question from '@/Scandinaver/Asset/Domain/Question'
import { Subscription } from 'rxjs'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'

@Component({
  name: 'Result',
  components: {
    ErrorItem,
  },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      //  overscrollEffect: 'bounce',
    })
  },
})
export default class Result extends Vue {
  @Inject()
  private readonly testService: TestService

  @Getter(PERCENT)
  public readonly _percent: number

  @Getter(QUANTITY)
  public readonly _quantity: number

  @Getter(LEVEL)
  public readonly _level: number

  @Getter(TITLE)
  public readonly _title: number

  @Getter(RESULT)
  public readonly _result: number

  @Getter(TIME)
  public readonly _time: number

  public errors: Collection<Question> = new Collection([])
  private subscriptions: Subscription = new Subscription();

  constructor() {
    super();
    this.subscriptions.add(
      this.testService.errorsBehaviorSubject.subscribe((data: Question) => {
        if (data === null) {
          this.errors.clear()
        } else if (data instanceof Question) {
          this.errors.add(data)
        }
      })
    )
  }

  created(): void {
    this.$eventHub.$on(events.REMOVE_ERROR_ITEM, this.removeErrorItem)
  }

  get formattedTime(): string {
    return moment.utc(this._time * 1000).format('HH:mm:ss')
  }

  private removeErrorItem(error: Question): void {
    // this.errors = this.errors.filter(item => item.getId() !== error.getId())
  }

  beforeDestroy(): void {
    this.$eventHub.$off(events.REMOVE_ERROR_ITEM)
    this.subscriptions.unsubscribe()
  }
}
