<template lang="pug">
  el-col.right-panel#cardsblock(:span="8", :xs="24")
    el-card.box-card.tab-navigation
      el-tabs(:value="active", @tab-click="handleClick")

        el-tab-pane(label="Слова", name="words")
          section(data-scrollbar)
            .steps-wrapper
              tabItem(
                v-for="(word, index) in words"
                :item="word"
                :index="index"
                :key="word.id"
                type="asset")

        el-tab-pane(label="Предложения" name="sentences")
          section(data-scrollbar)
            .steps-wrapper
              tabItem(
                v-for="(sentence, index) in sentences"
                :item="sentence"
                :index="index"
                :key="sentence.id"
                type="asset")

        el-tab-pane(label="Мои словари" name="personal")
          section(data-scrollbar)
            .steps-wrapper
                TabItemPersonal(
                  v-for="(personal, index) in personals"
                  :item="personal"
                  :index="index"
                  :key="personal.id"
                  type="personal")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import TabItem from '@/components/testpage/TabItem.vue'
import TabItemPersonal from '@/components/testpage/TabItemPersonal.vue'

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
export default class Tabs extends Vue {
  activeName: string = 'first'

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
