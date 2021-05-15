<template>
  <el-footer height="45px">
    <el-row class="footer-inner">
      <el-col :span="12">
        <span class="copyright">{{ copy }} | {{ version }}</span>
      </el-col>
      <el-col :md="{ span: 4, offset: 8 }" :xs="{ span: 12 }">
        <el-button
          id="intro-target-help-button"
          type="text"
          style="color: #606266"
          @click="showHelp()">
          {{ $t('help') }}
        </el-button>
        <el-button
          id="intro-target-feedback-button"
          type="text"
          style="color: #606266"
          @click="dialogFormVisible = true">
          {{ $t('feedback') }}
        </el-button>
      </el-col>
    </el-row>
    <el-dialog title="Ваше сообщение:" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="messageform">
        <el-form-item prop="message">
          <el-input
            id="feedback_message"
            type="textarea"
            v-model="form.message"
            :placeholder="$t('message')"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogFormVisible = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="submit">{{$t('send')}}</el-button>
      </span>
    </el-dialog>
    <v-tour name="myTour" :steps="steps" :options="{startTimeout: 5}">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :step="tour.steps[tour.currentStep]"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :skip="tour.skip"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
            :highlight="!(tour.isFirst && page === 'MainPage')"
            :debug=false
          >
            <template>
              <div slot="actions" class='tour-buttons'>
                <el-button type="text" @click="tour.stop" v-if="!tour.isLast">
                  <i class='el-icon-close text-danger'></i>
                </el-button>
                <el-button type="text" @click="tour.previousStep" v-if="!tour.isFirst">
                  <i class='el-icon-back text-info'></i>
                </el-button>
                <el-button type="text" @click="tour.nextStep" v-if="!tour.isLast">
                  <i class='el-icon-right text-info'></i>
                </el-button>
                <el-button type="text" @click="tour.stop" v-if="tour.isLast">
                  <i class='el-icon-check text-success'></i>
                </el-button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </el-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import IFeedbackForm, {
  FeedbackForm,
} from '@/Scandinaver/Core/Domain/Contract/IFeedbackForm'
import FeedbackService from '@/Scandinaver/Core/Application/feedback.service'
import { Inject } from 'vue-typedi'
import IntroService from '@/Scandinaver/Intro/Application/intro.service'
import { Watch } from 'vue-property-decorator'
import { version } from '../../../../package.json'

@Component({ name: 'Footer' })
export default class Footer extends Vue {
  @Inject()
  private service: FeedbackService

  @Inject()
  private introService: IntroService

  private version: string = `v.${version}`
  private dialogFormVisible: boolean = false
  private copy: string = `scandinaver.org © ${(new Date()).getFullYear()}`
  private introVisible: boolean = false
  private form: IFeedbackForm = new FeedbackForm()
  private page: string = ''
  private steps: any[] = []

  rules: {} = {
    message: [
      {
        required: true,
        message: 'Поле не может быть пустым!',
        trigger: 'sumbit',
      },
    ],
  }

  @Watch('$route')
  private onRouteChange(route: any) {
    const isNeedIntro = window.localStorage.getItem('intro')
    if (isNeedIntro === null) {
      this.showHelp()
      window.localStorage.setItem('intro', 'true')
    }
  }

  submit() {
    // @ts-ignore
    this.$refs.messageform.validate(async (valid: any) => {
      if (valid) {
        await this.service.addFeedback(this.form)
        this.dialogFormVisible = false
        this.$notify.success({
          title: '',
          message: 'Сообщение отправлено',
          duration: 2000,
        })
        this.form = new FeedbackForm()
      }
    })
  }

  showHelp() {
    this.page = this.$route.matched[0].name
    this.steps = this.introService.getForPage(this.page)
    if (this.steps.length > 0) {
      setTimeout(() => this.$tours.myTour.start(), 100)
    }
  }
}
</script>

<style lang="scss" scoped>
#feedback_message {
  min-height: 240px !important;
}
.copyright {
  font-size: 14px;
  padding: 12px 0;
  display: block;
}
.footer-inner {
  width: 100%;
}
.el-footer {
  .el-button + .el-button {
    margin-left: 20px;
  }
}
</style>
