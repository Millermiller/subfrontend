<template lang="pug">
  el-col#cardsblock.right-panel(:span='8', :xs='{span: 24, offset: 0}')
    el-card.box-card.tab-navigation
      el-tabs(@tab-click='handleClick', :value='active')

        el-tab-pane(:label="$t('words')", name='words')
          section(data-scrollbar)
            ul.nav.nav-list
              TabItem(v-for='(word, index) in words', :item='word', :index='index', :key='word.id', type='asset').


        el-tab-pane(:label="$t('sentences')", name='sentences')
          section(data-scrollbar)
            ul.nav.nav-list
              TabItem(v-for='(sentence, index) in sentences', :item='sentence', :index='index', :key='sentence.id', type='asset').


        el-tab-pane(:label="$t('personals')", name='personal')
          section(data-scrollbar)
            ul.nav.nav-list
              TabItemPersonal(v-for='(personal, index) in personals', :item='personal', :index='index', :key='personal.id', type='personal').
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import TabItem from '@/components/learnpage/TabItem.vue'
import TabItemPersonal from '@/components/learnpage/TabItemPersonal.vue'

@Component({
  name: 'Tabs',
  components: {
    TabItem,
    TabItemPersonal,
  },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      //  overscrollEffect: 'bounce',
    })
  },
})
export default class extends Vue {
  get personals() {
    return this.$store.getters.personal
  }

  get words() {
    return this.$store.getters.words
  }

  get sentences() {
    return this.$store.getters.sentences
  }

  get active() {
    return this.$store.getters.activeAssetType
  }

  handleClick = () => {
    //
  }
}
</script>
