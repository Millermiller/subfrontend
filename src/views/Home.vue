<template lang="pug">
  el-container
    el-main
      el-row(:gutter="20")

        <!--  <wordsblock v-on:modal="modal"></wordsblock>
          <sentencesblock v-on:modal="modal"></sentencesblock>
          <personalblock></personalblock> -->

        account

        el-col(:md="18", :xs="24", :sm="16")
          el-row#widgetblock(:gutter="20")
            WordWidget
            SentenceWidget
            TextWidget
            PersonalWidget
            PuzzleWidget

      el-dialog(title="Это закрытая часть сайта", :visible.sync="dialogVisible")
        span
          a Оплатите подписку чтобы получить полный доступ
        span.dialog-footer(slot="footer")
           el-button(@click="dialogVisible = false") Закрыть

      el-dialog(title="Привет!", :visible.sync="greetingVisible")
        span Добро пожаловать, {{username}}!
        span.dialog-footer(slot="footer")
          el-button(@click="greetingVisible = false") Закрыть
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Account from '@/components/home/AccountBlock.vue'
import WordWidget from '@/components/home/WordWidget.vue'
import SentenceWidget from '@/components/home/SentenceWidget.vue'
import TextWidget from '@/components/home/TextWidget.vue'
import PersonalWidget from '@/components/home/PersonalWidget.vue'
import PuzzleWidget from '@/components/home/PuzzleWidget.vue'

@Component({
  name: 'Home',
  components: {
    Account,
    WordWidget,
    SentenceWidget,
    TextWidget,
    PersonalWidget,
    PuzzleWidget,
  },
  mounted() {
    if (!localStorage.getItem('myFirstAdventure')) {
      //   this.greetingVisible = true;
      //   localStorage.setItem('myFirstAdventure', true)
    }
  },
})
export default class extends Vue {
  name: string = 'Hello!'
  metaInfo: any = { title: 'Icelandic | Scandinaver' }
  dialogVisible: boolean = false
  greetingVisible: boolean = false

  modal() {
    this.dialogVisible = true
  }

  get username() {
    return this.$store.getters.login
  }
}
</script>
