import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import ErrorItem from './error.item.component/index.vue'
import * as events from '@/events/events.type'
import * as moment from 'moment'
import {
  ERRORS,
  LEVEL,
  PERCENT,
  QUANTITY, RESULT, TIME, TITLE,
} from '@/Scandinaver/Asset/Infrastructure/store/test/getters.type'
import { Getter } from '@/utils/getter.decorator'
import { REMOVE_ERROR } from '@/Scandinaver/Asset/Infrastructure/store/test/mutations.type'

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

  @Getter(ERRORS)
  public readonly _errors: number

  @Getter(TIME)
  public readonly _time: number

  created(): void {
    this.$eventHub.$on(events.REMOVE_ERROR_ITEM, this.removeErrorItem)
  }

  get formattedTime(): string {
    return moment.utc(this._time * 1000).format('HH:mm:ss')
  }

  private removeErrorItem(id: number): void {
    this.$store.commit(REMOVE_ERROR, id)
  }

  beforeDestroy(): void {
    this.$eventHub.$off(events.REMOVE_ERROR_ITEM)
  }
}
