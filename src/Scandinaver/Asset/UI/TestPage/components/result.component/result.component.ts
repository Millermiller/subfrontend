import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import ErrorItem from './error.item.component/index.vue'
import * as events from '@/events/events.type'
import Question from '@/Scandinaver/Asset/Domain/Question'
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
  public readonly percent: number

  @Getter(QUANTITY)
  public readonly quantity: number

  @Getter(LEVEL)
  public readonly level: number

  @Getter(TITLE)
  public readonly title: number

  @Getter(RESULT)
  public readonly result: number

  @Getter(ERRORS)
  public readonly errors: number

  @Getter(TIME)
  public readonly time: number

  created() {
    this.$eventHub.$on(events.REMOVE_ERROR_ITEM, this.removeErrorItem)
  }

  get formattedTime(): string {
    return moment.utc(this.time * 1000).format('HH:mm:ss')
  }

  removeErrorItem(id: number) {
    this.$store.commit(REMOVE_ERROR, id)
  }

  beforeDestroy() {
    this.$eventHub.$off(events.REMOVE_ERROR_ITEM)
  }
}
