import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import TextService from '@/Scandinaver/Translate/Application/text.service'
import { BehaviorSubject, Subject, Observable, ObservedValueOf, from } from 'rxjs'
import { Translate } from '../../Domain/Translate'
import DictionaryItem from '../../Domain/DictionaryItem'
import Synonym from '../../Domain/Synonym'
import Tooltip from '@/Scandinaver/Translate/Domain/Tooltip'

@Component({
  name: 'TranslateComponent',
})
export default class TranslateComponent extends Vue {
  @Inject()
  private readonly service: TextService

  public textEntity: Translate = new Translate()
  private showedTooltip: string = ''
  private length: number = 0
  public loading: boolean = false
  private inputStream: string = ''
  public input: Subject<string> = new Subject<string>()
  private textSequence: {
    text: string
    selected: boolean
    progress: number
  }[] = [{ text: '', selected: false, progress: 0 }]
  private inputObservables: Subject<{ index: number; parts: string[] }>[] = []
  private outputObservables: Observable<ObservedValueOf<string>>[] = []
  private currentSentenceSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
    >(0)

  async mounted() {
    await this.load(Number(this.$route.params.id))
  }

  @Watch('inputStream')
  private onInputChanged(val: string): void {
    this.input.next(val)
  }

  @Watch('$route')
  private onRouteChange(route: any): void {
    if (route.params.id) this.load(parseInt(route.params.id, 10))
  }

  // @Watch('progress')
  // private async onChange(progress: any): Promise<void> {
  //   this.$Progress.set(progress)
  //   if (progress > 90) {
  //     const text: Translate = await this.service.nextLevel(this.text)
  //     this.nextTextId = text.id
  //     this.$notify.success({
  //       title: this.text.title,
  //       message: this.$tc('translateComplete'),
  //       duration: 3000,
  //     })
  //   }
  // }

  created() {
    this.input.subscribe((data) => {
      const index = this.currentSentenceSubject.getValue()
      const parts = this.inputStream.split('.')[index].split(' ')
      if (index <= this.textSequence.length - 1) {
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
  }

  async load(id: number): Promise<void> {
    this.loading = true
    this.textEntity = await this.service.getText(id);
    this.textEntity.dictionary.map((item: DictionaryItem) => {
      item.values.push(item.value.toLowerCase())
      return item.synonyms.map((synonym: Synonym) => item.values.push(synonym.value.toLowerCase()))
    })

    this.outputObservables = this.textEntity.text
      .split('.').filter(chunk => chunk !== '')
      .map(chunk => from(chunk))

    this.inputObservables = this.textEntity.text
      .split('.')
      .map(chunk => new Subject<{ index: number; parts: string[] }>())

    this.inputObservables.forEach((observable) => {
      observable.subscribe((data) => {
        this.rebuild(data)
      })
    })

    this.textSequence = this.textEntity.text
      .split('.')
      .filter(chunk => chunk !== '')
      .map(chunk => ({ text: chunk, selected: false, progress: 0 }))

    this.length = this.textEntity.dictionary.length
    this.loading = false
  }

  get progress(): number {
    const count = this.textSequence.reduce(
      (accumulator, currentValue) => accumulator + currentValue.progress, 0
    )
    return Math.floor((count * 100) / this.length)
  }

  // create result text from textSequence
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

    if (this.showedTooltip !== '' && this.showedTooltip !== undefined) {
      output = output.replace(
        new RegExp(`(^|\\s|>)(${this.showedTooltip.trim()})([^\\w]|$|<)`, 'gi'),
        '$1<span class="warning-text">$2</span>$3',
      )
    }

    return output
  }

  private findDictionaryItem(search: string, sentenceNum: number): DictionaryItem {
    search = search.replace(',', '').toLowerCase()
    return this.textEntity.dictionary.find(item => item.sentenceNum === sentenceNum && item.values.includes(search))
  }

  // highlight text
  private rebuild(data: { index: number; parts: string[] }): void {
    console.time('rebuild2')
    data.parts = data.parts.filter(item => item !== '')

    const usedDictionaryItems: DictionaryItem[] = []

    data.parts.forEach((el: any) => {
      const dictionaryItem = this.findDictionaryItem(el, data.index)
      if (dictionaryItem !== undefined && usedDictionaryItems.find(el => el.id === dictionaryItem.id) === undefined) {
        dictionaryItem.value = el
        usedDictionaryItems.push(dictionaryItem)
      }
    })

    const coordinates: any[][] = usedDictionaryItems.map(item => item.coordinates)
    const starts: number[] = coordinates.map(item => item.map(subitem => subitem[0])).flat()
    const ends: number[] = coordinates.map(item => item.map(subitem => subitem[1])).flat()

    let output = ''
    let counter = 0
    let chunk = ''

    this.outputObservables[data.index].subscribe((data: string) => {
      chunk = data
      // const position1 = starts.includes(counter)
      const position1 = usedDictionaryItems.find((item: DictionaryItem) => item.coordinates.find((coord: any) => coord[0] === counter))
      if (position1) {
        chunk = `<span class="extra" style="--tooltip-color:${position1.color}; background-color: ${position1.color}" tooltip="${position1.value}">${chunk}`
      }

      const position2 = ends.includes(counter)
      if (position2) {
        chunk = `${chunk}</span>`
      }

      output += chunk
      counter++
    })

    this.textSequence[data.index].text = output

    this.textSequence[data.index].progress = [...new Set(usedDictionaryItems)].length
    console.timeEnd('rebuild2')
  }

  public findPosition(ev: any): void {
    this.currentSentenceSubject.next(
      this.inputStream.substring(0, ev.target.selectionStart).split('.').length - 1,
    )
  }

  public showTooltip(tooltip: Tooltip): void {
    this.showedTooltip = tooltip.object
  }

  public clearTooltip(): void {
    this.showedTooltip = ''
  }

  async clear() {
    await this.load(Number(this.$route.params.id))
    this.currentSentenceSubject.next(0)
    this.inputStream = ''
  }

  public goToNext(): void {
    // this.$router.push(`/translates/${this.nextTextId}`)
  }
}
