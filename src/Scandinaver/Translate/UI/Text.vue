<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card id="origtext" style="position: relative">
            <vue-progress-bar></vue-progress-bar>
            <p class="origtext" v-html="output"></p>
          </el-card>
          <el-collapse id="helpblock">
            <el-collapse-item title="Помощь">
              <template v-for="(extra, index) in text.extra">
                <el-col :span="12" :key="index">
                  <p
                    class="pointer"
                    @mouseover="showExtra(extra)"
                    @mouseout="clearExtra"
                  >
                    <span> {{ extra.orig }} - {{ extra.extra }} </span>
                  </p>
                </el-col>
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col id="textarea" :span="12">
          <label for="transarea"></label>
          <textarea
            class="panel"
            id="transarea"
            style="height: 280px"
            placeholder="Поле для перевода"
            v-loading.body="loading"
            v-model="inputStream"
            @input="findPosition"
            @click="findPosition"
          ></textarea>
          <el-row>
            <el-col :span="24">
              <el-button class="pull-right" :plain="true" @click="clear">
                {{ $t('clear') }}
              </el-button>
              <el-button
                class="pull-right"
                v-if="nextTextId"
                type="success"
                @click="gotonext()"
              >
                {{ $t('nextText') }}
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Inject } from 'vue-typedi'
import TextService from '@/Scandinaver/Translate/Application/text.service'
import { BehaviorSubject, Subject } from 'rxjs'
import { Translate } from '../Domain/Translate'

@Component({
  name: 'TextItem',
})
export default class TextItem extends Vue {
  @Inject()
  private service: TextService

  private text: Translate = new Translate()
  private inputStream: string = ''
  private input: Subject<string> = new Subject<string>()
  private textSequence: {
    text: string
    selected: boolean
    progress: number
  }[] = [{ text: '', selected: false, progress: 0 }]
  private inputSequence: string[] = []
  private inputObservables: Subject<{ index: number; parts: string[] }>[] = []
  private currentSentenceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private showedExtra: string = ''
  private length: number = 0
  private dictionary: any = []
  private nextTextId: number = 0
  private loading: boolean = false

  @Watch('inputStream')
  private onInputChanged(val: string) {
    this.input.next(val)
  }

  @Watch('$route')
  private onRouteChange(route: Route) {
    if (route.params.id) this.loadText(parseInt(route.params.id, 10))
  }

  @Watch('progress')
  private async onChange(progress: any) {
    this.$Progress.set(progress)
    if (progress > 90) {
      const text: Translate = await this.service.nextLevel(this.text)
      this.nextTextId = text.id
      this.$notify.success({
        title: this.text.title,
        message: this.$tc('translateComplete'),
        duration: 3000,
      })
    }
  }

  created() {
    this.input.subscribe((data) => {
      this.inputSequence = this.inputStream.split('.')
      const index = this.currentSentenceSubject.getValue()
      if (index <= this.textSequence.length - 1) {
        console.log(index)
        console.log(this.textSequence.length - 1)
        const parts = this.inputSequence[index].split(' ')
        this.inputObservables[index].next({ index, parts })
      }
    })

    this.currentSentenceSubject.subscribe((data) => {
      this.textSequence.forEach((sequence) => {
        sequence.selected = false
      })
      if (data <= this.textSequence.length - 1) {
        this.textSequence[data].selected = true
      }
    })

    this.loadText(parseInt(this.$route.params.id, 10))
  }

  get output(): string {
    let output: string

    output = this.textSequence
      .map((sentence) => {
        if (sentence.selected) {
          return `<span class="active-sentence">${sentence.text}</span>`
        }
        return sentence.text
      })
      .join('. ')

    if (this.showedExtra !== '') {
      output = output.replace(
        new RegExp(`(^|\\s|>)(${this.showedExtra.trim()})([^\\w]|$|<)`, 'gi'),
        '$1<span class="warning-text">$2</span>$3',
      )
    }

    return output
  }

  get progress(): number {
    const count = this.textSequence.reduce(
      (accumulator, currentValue) => accumulator + currentValue.progress,
      0,
    )
    return Math.floor((count * 100) / this.length)
  }

  async loadText(id: number) {
    this.loading = true
    const text: Translate = await this.service.getText(id)
    this.inputObservables = text.text
      .split('.')
      .map(chunk => new Subject<{ index: number; parts: string[] }>())
    this.inputObservables.forEach((observable) => {
      observable.subscribe((data) => {
        if (data.index <= this.textSequence.length - 1) {
          this.rebuild(data)
        }
      })
    })
    this.textSequence = text.text
      .split('.')
      .filter(chunk => chunk !== '')
      .map(chunk => ({ text: chunk, selected: false, progress: 0 }))
    // this.clear()
    this.text = text
    this.length = [...new Set(text.text.split(' '))].length
    this.dictionary = this.text.synonyms
    this.nextTextId = 0
    this.loading = false
  }

  rebuild(data: { index: number; parts: string[] }) {
    data.parts = data.parts.filter(item => item !== '')

    const origs: { [key: string]: string } = {}
    const origparts: string[] = []

    data.parts.forEach((el: any) => {
      el = el.toLowerCase()
      if (el !== '' && el in this.dictionary) {
        origparts.push(this.dictionary[el][0])
        origs[this.dictionary[el]] = el
      }
    })

    const searchString: string = origparts.join('|')
    this.textSequence[data.index].text = this.text.text
      .split('.')[data.index].replace(
        new RegExp(searchString, 'gi'),
        (match: string) => {
          if (match !== '') {
            return `<span class="success-text" tooltip=${origs[match]}>${match}</span>`
          }
          return match
        },
      )
    this.textSequence[data.index].progress = [...new Set(origparts)].length
  }

  findPosition(ev: any) {
    this.currentSentenceSubject.next(
      this.inputStream.substring(0, ev.target.selectionStart).split('.')
        .length - 1,
    )
  }

  showExtra(extra: any) {
    this.showedExtra = extra.orig
  }

  clearExtra() {
    this.showedExtra = ''
  }

  async clear() {
    await this.loadText(parseInt(this.$route.params.id, 10))
    this.currentSentenceSubject.next(0)
    this.inputStream = ''
  }

  gotonext() {
    this.$router.push(`/translates/${this.nextTextId}`)
  }
}
</script>
<style lang="scss">
@import '../../../assets/css/variables';

.active-sentence {
  background-color: rgba(238, 195, 115, 0.86);
  #border-bottom: 1px solid $blue-color;
}
#origtext {
  overflow: visible;

  .el-card__body {
    overflow: visible;
  }

  .origtext {
    word-spacing: 1px;
  }
}
#transarea {
  height: 100px;
  padding: 15px;
  font-family: 'Open Sans', sans-serif;
}
.text-success {
  cursor: pointer;
  margin: 0 2px 4px 0;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-block;
}
</style>
