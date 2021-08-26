import Vue from 'vue'
import { Watch } from 'vue-property-decorator'
import Component from 'vue-class-component'
import type { Route } from 'vue-router'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component
export class Module extends Vue {
  public access: boolean = false

  created(): void {
    this.access = this.$ability.can(this.$route.meta.permission)
  }

  @Watch('$route')
  private onRouteChange(route: Route): void {
    this.access = this.$ability.can(route.meta.permission)
  }

  mounted(): void {
    store.commit('setShowRightMenuButton', true)
  }

  beforeDestroy(): void {
    store.commit('setShowRightMenuButton', false)
  }
}
