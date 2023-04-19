import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import TestService from '@Asset/Application/test.service'
import {
  RESET_ACTIVE_ASSET,
  RESOLVE_AND_SET_ACTIVE_ASSET_TYPE,
} from '@Asset/Infrastructure/store/asset/actions.type'
import Variant from '@Asset/Domain/Variant'
import { Test } from '@Asset/Domain/Test'
import CollectionException from '@/Scandinaver/Core/Domain/CollectionException'
import Question from '@Asset/Domain/Question'
import { RESET_TEST } from '@Asset/Infrastructure/store/test/action.type'
import { BehaviorSubject, Subscription, timer } from 'rxjs'
import {
  SET_PERCENT,
  SET_TIME,
} from '@Asset/Infrastructure/store/test/mutations.type'
import ResultModalComponent from './result.modal.component/index.vue'
import { CLOSE_RESULT_MODAL, RELOAD_TEST } from '@/events/events.type'
import { Getter } from '@/utils/getter.decorator'
import { TIME } from '@Asset/Infrastructure/store/test/getters.type'
import { Asset } from '@Asset/Domain/Asset'

@Component({
  name: 'TestComponent',
  components: {
    ResultModalComponent,
  },
})
export default class TestComponent extends Vue {
  @Prop({ required: true })
  private asset: BehaviorSubject<Asset>

  @Prop({ required: true })
  private loading: boolean

  @Inject()
  private readonly testService: TestService

  @Getter(TIME)
  public readonly _time: number

  public test: Test | null = null
  public question: Question | null = null
  public dialogVisible: boolean = false
  public isTestLoaded: boolean = false
  private subscriptions: Subscription = new Subscription()
  public isTestEnabled: boolean = true
  public isRotate: boolean = false

  created(): void {
    this.$eventHub.$on(CLOSE_RESULT_MODAL, this.closeModal)

    this.asset.subscribe(async (asset: Asset) => {
      if (asset.getId()) {
        await this.buildTest(asset)
      } else {
        await this.$store.dispatch(RESET_ACTIVE_ASSET)
      }
    })
  }

  reload(): void {
    this.isRotate = true
    this.$eventHub.$emit(RELOAD_TEST)
  }

  private async buildTest(asset: Asset): Promise<void> {
    this.isRotate = false
    this.subscriptions.unsubscribe()
    this.$Progress.set(0)

    this.test = this.testService.create(asset)

    this.testService.errorsBehaviorSubject.next(null)

    this.$store.commit(SET_TIME, 0)
    await this.$store.dispatch(RESET_TEST, this.test)
    await this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, asset.category)

    this.question = this.test.questions.current()
    this.isTestLoaded = true

    this.subscriptions = timer(0, 1000).subscribe((value) => {
      this.$store.commit(SET_TIME, value)
    })

    this.isTestEnabled = true
  }

  public async check(variant: Variant): Promise<void> {
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
      this.testService.errorsBehaviorSubject.next(this.question)
    }
    await this.next()
  }

  private async next(): Promise<void> {
    try {
      this.question = this.test.questions.next()
    } catch (e) {
      if (e instanceof CollectionException) {
        this.subscriptions.unsubscribe()
        this.test.time = this._time
        this.dialogVisible = true
        await this.testService.complete(this.test)
      }
    }
  }

  private closeModal(): void {
    this.dialogVisible = false
    this.isTestEnabled = false
  }

  beforeDestroy(): void {
    this.$eventHub.$off(CLOSE_RESULT_MODAL)
    this.testService.errorsBehaviorSubject.next(null)
    this.subscriptions.unsubscribe()
    this.$store.commit(SET_TIME, 0)
  }
}
