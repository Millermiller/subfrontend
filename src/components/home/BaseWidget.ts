import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class BaseWidget extends Vue {
  title: string
  active: number
  all: number
  percent: number = 0
  timeout: number = 0

  created() {
    setTimeout(() => {
      this.percent = Math.round((100 * this.active) / this.all) || 0
    }, this.timeout)
  }

  goto(to: any) {
    this.$router.push(to)
  }
}
