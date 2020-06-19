import Vue from 'vue'
import Component from 'vue-class-component'
import AccountWidgetComponent from './components/account-widget.component/account-widget.component.vue'
import WordWidgetComponent from './components/word-widget.component/word-widget.component.vue'
import TextWidgetComponent from './components/text-widget.component/text-widget.component.vue'
import PersonalWidgetComponent from './components/personal-widget.component/personal-widget.component.vue'
import SentenceWidgetComponent from './components/sentence-widget.component/sentence-widget.component.vue'
import PuzzleWidgetComponent from './components/puzzle-widget.component/puzzle-widget.component.vue'

@Component<HomeModule>({
  name: 'HomeModule',
  components: {
    AccountWidgetComponent,
    WordWidgetComponent,
    SentenceWidgetComponent,
    TextWidgetComponent,
    PersonalWidgetComponent,
    PuzzleWidgetComponent,
  },
  mounted() {
    if (!localStorage.getItem('myFirstAdventure')) {
      //   this.greetingVisible = true;
      //   localStorage.setItem('myFirstAdventure', true)
    }
  },
})
export default class HomeModule extends Vue {
  dialogVisible: boolean = false
  greetingVisible: boolean = false

  metaInfo() {
    return {
      title: 'Scandinaver',
    }
  }

  get username() {
    return this.$store.getters.login
  }

  modal() {
    this.dialogVisible = true
  }
}
