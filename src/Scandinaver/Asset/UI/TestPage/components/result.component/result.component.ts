import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import ErrorItem from './error.item.component/index.vue'
import * as events from '@/events/events.type'
import Question from '@/Scandinaver/Asset/Domain/Question'
import * as moment from 'moment'

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
  created() {
    this.$eventHub.$on(events.REMOVE_ERROR_ITEM, this.removeErrorItem)
  }

  get percent() {
    return this.$store.getters.percent
  }

  get quantity() {
    return this.$store.getters.quantity
  }

  get errors(): Question[] {
    return this.$store.getters.errors
  }

  get title(): string {
    return this.$store.getters.title
  }

  get result(): number {
    return this.$store.getters.result
  }

  get level(): number {
    return this.$store.getters.level
  }

  get time(): string {
    return moment.utc(this.$store.getters.time * 1000).format('HH:mm:ss')
  }

  removeErrorItem(id: number) {
    this.$store.commit('removeError', id)
  }

  beforeDestroy() {
    this.$eventHub.$off(events.REMOVE_ERROR_ITEM)
  }
}
