import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class BaseWidget extends Vue {
  title: string

  get all(): number {
    return 0
  }

  get active(): number {
    return 0
  }

  get percent() {
    return Math.round((100 * this.active) / this.all) || 0
  }

  goto(to: any) {
    this.$router.push(to)
  }
}
