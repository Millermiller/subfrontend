<template>
  <el-col class="hidden-sm-and-down" :span="8">
    <el-card class="box-card result-card">
      <div class="clearfix" id="infoblock" slot="header">
        <el-row :gutter="20">
          <el-col class="diagram" :span="8">
            <el-progress type="circle" :percentage="percent" :width="100"></el-progress>
          </el-col>
          <el-col class="asset-info" :span="16">
            <template v-if="title">
              <p v-if="level &gt; 0">{{ $t('level', { level: level }) }}</p>
              <p>{{ $t('questionsCount', { quantity: quantity }) }}</p>
              <p>{{ $t('bestResult', { result: result }) }}</p>
            </template>
          </el-col>
        </el-row>
      </div>
      <section id="errorsblock" data-scrollbar="data-scrollbar" style="height: 55vh;overflow: hidden">
        <transition-group name="splash" tag="div">
          <ErrorItem class="splash-item"
                     v-for="(error, index) in errors"
                     :item="error"
                     :index="index"
                     :key="index">
          </ErrorItem>
        </transition-group>
      </section>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import ErrorItem from '@/Scandinaver/Asset/UI/TestPage/ErrorItem.vue'
import * as events from '@/events/events.type'
import Question from '@/Scandinaver/Asset/Domain/Question'

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
    this.$eventHub.$on(events.REMOVE_ERROR_ITEM, this.removeErrorItem)
  }

  get percent() {
    return this.$store.getters.percent
  }

  get quantity() {
    return this.$store.getters.quantity
  }

  get errors(): Question[] {
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
    this.$eventHub.$off(events.REMOVE_ERROR_ITEM)
  }
}
</script>
<style>
.result-card .el-card__body {
  padding-right: 0;
}
.diagram {
  border-right: 1px solid #ddd;
  padding-right: 20px;
}
</style>
