<template>
  <el-col class="right-panel" id="cardsblock" :span="8" :xs="24">
    <el-card class="box-card tab-navigation">
      <el-tabs :value="active" @tab-click="handleClick">
        <el-tab-pane label="Слова" :name="wordTabName">
          <section data-scrollbar="data-scrollbar">
            <div class="steps-wrapper">
              <tabItem
                v-for="(word, index) in words"
                :item="word"
                :index="index"
                :key="word.id"
                type="asset"
              ></tabItem>
            </div>
          </section>
        </el-tab-pane>
        <el-tab-pane label="Предложения" :name="sentencesTabName">
          <section data-scrollbar="data-scrollbar">
            <div class="steps-wrapper">
              <tabItem
                v-for="(sentence, index) in sentences"
                :item="sentence"
                :index="index"
                :key="sentence.id"
                type="asset"
              ></tabItem>
            </div>
          </section>
        </el-tab-pane>
        <el-tab-pane label="Мои словари" :name="personalTabName">
          <section data-scrollbar="data-scrollbar">
            <div class="steps-wrapper">
              <TabItemPersonal
                v-for="(personal, index) in personals"
                :item="personal"
                :index="index"
                :key="personal.id"
                type="personal"
              ></TabItemPersonal>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import TabItem from '@/Scandinaver/Asset/UI/TestPage/TabItem.vue'
import TabItemPersonal from '@/Scandinaver/Asset/UI/TestPage/TabItemPersonal.vue'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

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
  wordTabName = AssetType.WORDS.toString()
  sentencesTabName = AssetType.SENTENCES.toString()
  personalTabName = AssetType.PERSONAL.toString()

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
