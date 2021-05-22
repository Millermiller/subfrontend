import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import TestService from '@/Scandinaver/Asset/Application/test.service'
import {
  RESET_ACTIVE_ASSET,
  RESOLVE_AND_SET_ACTIVE_ASSET_TYPE,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import Variant from '@/Scandinaver/Asset/Domain/Variant'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import CollectionException from '@/Scandinaver/Core/Domain/CollectionException'
import Question from '@/Scandinaver/Asset/Domain/Question'
import { RESET_TEST } from '@/Scandinaver/Asset/Infrastructure/store/test/action.type'
import { Subscription, timer } from 'rxjs'
import {
  RESET_ERROR,
  SET_ERROR,
  SET_PERCENT,
  SET_TIME,
} from '@/Scandinaver/Asset/Infrastructure/store/test/mutations.type'
import ResultModalComponent from './result.modal.component/index.vue'
import { CLOSE_RESULT_MODAL, RELOAD_TEST } from '@/events/events.type'
import { Getter } from '@/utils/getter.decorator'
import { TIME } from '@/Scandinaver/Asset/Infrastructure/store/test/getters.type'

@Component({
  name: 'TestComponent',
  components: {
    ResultModalComponent,
  },
})
export default class TestComponent extends Vue {
  @Inject()
  private assetService: AssetService

  @Inject()
  private testService: TestService

  @Getter(TIME)
  public readonly time: number

  @Watch('$route')
  private onRouteChange(route: any) {
    if (route.params.id) this.buildTest(parseInt(route.params.id, 10))
  }

  private test: Test | null = null
  private question: Question | null = null
  private dialogVisible: boolean = false
  private loading: boolean = false
  private isTestLoaded: boolean = false
  private subscriptions: Subscription = new Subscription()
  private isTestEnabled: boolean = true
  public isRotate: boolean = false

  async created() {
    this.$eventHub.$on(RELOAD_TEST, this.reload)
    this.$eventHub.$on(CLOSE_RESULT_MODAL, this.closeModal)
    this.$store.commit(RESET_ERROR)
    if (parseInt(this.$route.params.id, 10) > 0) {
      await this.buildTest(parseInt(this.$route.params.id, 10))
    } else {
      await this.$store.dispatch(RESET_ACTIVE_ASSET)
    }
  }

  async reload() {
    this.isRotate = true
    await this.buildTest(this.test.id)
    this.isRotate = false
    this.dialogVisible = false
  }

  async buildTest(id: number) {
    this.subscriptions.unsubscribe()
    this.loading = true
    this.$Progress.set(0)
    const asset = await this.assetService.getAsset(id)
    this.test = this.testService.create(asset)

    this.$store.commit(SET_TIME, 0)
    await this.$store.dispatch(RESET_TEST, this.test)
    await this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, asset.type)

    this.question = this.test.questions.current()
    this.isTestLoaded = true
    this.loading = false

    this.subscriptions = timer(0, 1000).subscribe((value) => {
      this.$store.commit(SET_TIME, value)
    })

    this.isTestEnabled = true
  }

  async check(variant: Variant) {
    this.test.answers++
    this.$Progress.set(
      Math.floor((this.test.answers * 100) / this.test.quantity),
    )
    if (variant.isCorrect()) {
      this.$Progress.setColor('#20A0FF')
      this.test.success++
      this.$store.commit(SET_PERCENT, this.test.percent)
    } else {
      this.$Progress.setColor('#FF4949')
      this.test.fail++
      if (this.question instanceof Question) {
        this.test.errors.push(this.question)
      }
      this.$store.commit(SET_ERROR, this.question)
    }
    await this.next()
  }

  async next() {
    try {
      this.question = this.test.questions.next()
    } catch (e) {
      if (e instanceof CollectionException) {
        this.subscriptions.unsubscribe()
        this.test.time = this.time
        this.dialogVisible = true
        await this.testService.complete(this.test)
      }
    }
  }

  closeModal() {
    this.dialogVisible = false
    this.isTestEnabled = false
  }

  beforeDestroy() {
    this.$eventHub.$off(RELOAD_TEST)
    this.$eventHub.$off(CLOSE_RESULT_MODAL)
    this.subscriptions.unsubscribe()
    this.$store.commit(SET_TIME, 0)
  }
}
