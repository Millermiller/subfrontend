<template lang="pug">
  el-col.hidden-sm-and-down(:span="8")
    el-card.box-card.result-card

      .clearfix#infoblock(slot="header")
        el-row(:gutter="20")
          el-col.diagram(:span="8")
            el-progress(type="circle", :percentage="percent", :width="100")
          el-col.asset-info(:span="16")
            template(v-if="title")
              p(v-if="level > 0") {{level}} уровень
              p вопросов: {{quantity}}
              p Лучший результат: {{result}}%

      section#errorsblock(data-scrollbar, style="height: 55vh;overflow: hidden")
        transition-group(name="splash", tag="div")
          ErrorItem(
          v-for="(error, index) in errors",
            :item="error"
            :index="index"
            :key="index"
            class="splash-item")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import ErrorItem from '@/components/testpage/ErrorItem.vue'

@Component({
  name: 'Result',
  components: {
    ErrorItem,
  },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      //  overscrollEffect: 'bounce',
    })
  },
})
export default class Result extends Vue {
  created() {
    this.$eventHub.$on('removeErrorItem', this.removeErrorItem)
  }

  get percent() {
    return this.$store.getters.percent
  }

  get quantity() {
    return this.$store.getters.quantity
  }

  get errors() {
    return this.$store.getters.errors
  }

  get title() {
    return this.$store.getters.title
  }

  get result() {
    return this.$store.getters.result
  }

  get level() {
    return this.$store.getters.level
  }

  removeErrorItem(id: number) {
    this.$store.commit('removeError', id)
  }

  beforeDestroy() {
    this.$eventHub.$off('removeErrorItem')
  }
}
</script>
