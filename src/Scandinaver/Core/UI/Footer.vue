<template>
  <el-footer height="45px">
    <el-row class="footer-inner">
      <el-col :span="12">
        <span class="copyright">{{ copy }} | {{ version }}</span>
      </el-col>
      <el-col :md="{ span: 4, offset: 8 }" :xs="{ span: 12 }">
        <el-button type="text" style="color: #606266;" @click="showIntro()"
          >Помощь</el-button
        >
        <el-button
          type="text"
          style="color: #606266;"
          @click="dialogFormVisible = true"
          >Обратная связь</el-button
        >
      </el-col>
    </el-row>
    <el-dialog title="Ваше сообщение:" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="messageform">
        <el-form-item prop="message">
          <el-input
            id="feedback_message"
            type="textarea"
            v-model="form.message"
            placeholder="Сообщение"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button type="primary" @click="submit">Отправить</el-button>
      </span>
    </el-dialog>
    <!-- <v-tour name="myTour" :steps="steps"></v-tour> -->
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
import Intro from '@/Scandinaver/Intro/Domain/Intro'
import { Watch } from 'vue-property-decorator'
import { version } from '../../../../package.json'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

@Component({ name: 'Footer' })
export default class Footer extends Vue {
  @Inject()
  private service: FeedbackService

  @Inject()
  private introService: IntroService

  private version: string = `v.${version}`

  dialogFormVisible: boolean = false
  copy: string = 'scandinaver.org © 2020'
  introVisible: boolean = false
  form: IFeedbackForm = new FeedbackForm()

  steps: Intro[] = store.getters.intro

  rules: {} = {
    message: [
      {
        required: true,
        message: 'Поле не может быть пустым!',
        trigger: 'sumbit',
      },
    ],
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

  showIntro() {
    this.$store.commit('setIntroVisibility', {
      page: this.$route.name,
      visible: true,
    })
  }

  startIntro(name: string) {
    this.$store.commit('setIntroVisibility', { page: name, visible: false })
  }

  @Watch('$route')
  private onRouteChange(route: any) {
    this.steps = this.introService.getForPage(route.name)
  }

  async mounted() {
    this.introService.stream.subscribe((data) => {
      const page = this.$route
      console.log(this.introService.getForPage(page))
      // this.$tours.myTour.start()
    })

    const self = this

    this.$store.watch(
      state => state.introNeed,
      (val) => {
        if (val.main && self.$route.name === 'main') self.startIntro('main')
        if (val.learnHome && self.$route.name === 'learnHome') {
          self.startIntro('learnHome')
        }
        if (val.learn && self.$route.name === 'learn') self.startIntro('learn')
        if (val.testHome && self.$route.name === 'testHome') {
          self.startIntro('testHome')
        }
        if (val.test && self.$route.name === 'test') self.startIntro('test')
        if (val.cards && self.$route.name === 'cards') self.startIntro('cards')
        if (val.texts && self.$route.name === 'texts') self.startIntro('texts')
        if (val.text && self.$route.name === 'text') self.startIntro('text')
      },
      { deep: true },
    )
    // this.$tours.myTour.start()
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
