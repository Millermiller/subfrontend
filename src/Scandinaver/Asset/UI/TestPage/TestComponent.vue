<template>
  <el-col id="testblock" :span="8" :xs="24">
    <el-card class="box-card" v-loading.body="loading">
      <div class="clearfix" slot="header">
        <vue-progress-bar></vue-progress-bar>
        <h3 class="text-center" style="height: 76px">
          <template v-if="isTestLoaded">
            {{ question.subject }}
          </template>
          <template v-else>
            {{ $t('selectAsset') }}
          </template>
        </h3>
      </div>
      <div class="variants" v-if="isTestLoaded">
        <p class="pointer" v-for="(variant, index) of question.variants.all()" @click="check(variant)" :key="index">
          {{ variant.value }}
        </p>
      </div>
    </el-card>
    <el-dialog title="Результаты:" v-if="dialogVisible" :visible.sync="dialogVisible">
      <el-row type="flex" align="middle">
        <el-col :md="18">
          <p class="success" v-if="percent &gt;= 80">{{ $t('newLevel') }}</p>
          <p class="text-danger" v-if="percent &lt; 80">{{ $t('testFail') }}</p>
          <p>{{ $t('correctAnswers', { success: success, all: quantity }) }}</p>
        </el-col>
        <el-col :md="6">
          <span :class="['percentage',  percent &lt; 80 ? 'warning' : 'success']">{{ percent }}%</span>
        </el-col>
      </el-row>
      <template v-if="fail &gt; 0">
        <el-row>
          <p>{{ $t('errors') }}:</p>
          <p v-for="(error, index) in errors" :key="index">{{ error.word.word }} - {{ error.translate.value }}</p>
        </el-row>
      </template>
      <span class="dialog-footer" slot="footer">
        <el-button v-if="percent &lt; 80" @click="reload">
          {{ $t('repeat') }}
        </el-button>
        <el-button @click="dialogVisible = false">
          {{ $t('close') }}
        </el-button>
      </span>
    </el-dialog>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import TestService from '@/Scandinaver/Asset/Application/test.service'
import { RESOLVE_AND_SET_ACTIVE_ASSET_TYPE } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { SET_SELECTION } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import Variant from '@/Scandinaver/Asset/Domain/Variant'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import CollectionException from '@/Scandinaver/Core/Domain/CollectionException'
import Question from '@/Scandinaver/Asset/Domain/Question'
import { RESET_TEST } from '@/Scandinaver/Asset/Infrastructure/store/test/action.type'

@Component({
  name: 'TestComponent',
})
export default class TestComponent extends Vue {
  @Inject()
  private assetService: AssetService

  @Inject()
  private testService: TestService

  @Watch('$route')
  private onRouteChange(route: any) {
    if (route.params.id) this.buildTest(parseInt(route.params.id, 10))
  }

  private test: Test
  private question: Question | null = null
  private dialogVisible: boolean = false
  private loading: boolean = false
  private isTestLoaded: boolean = false

  created() {
    this.$store.commit('resetError')
    if (parseInt(this.$route.params.id, 10) > 0) {
      this.buildTest(parseInt(this.$route.params.id, 10))
    }
  }

  reload() {
    this.buildTest(this.test.id).then(() => {
      this.dialogVisible = false
    })
  }

  async buildTest(id: number) {
    this.loading = true
    this.$Progress.set(0)
    const asset = await this.assetService.getAsset(id)
    this.test = this.testService.create(asset)

    this.$store.commit(SET_SELECTION, asset)
    await this.$store.dispatch(RESET_TEST, this.test)
    await this.$store.dispatch(RESOLVE_AND_SET_ACTIVE_ASSET_TYPE, asset.type)

    this.next()
    this.isTestLoaded = true
    this.loading = false
  }

  check(variant: Variant) {
    this.test.answers++
    this.$Progress.set(Math.floor((this.test.answers * 100) / this.test.quantity))
    if (variant.isCorrect()) {
      this.$Progress.setColor('#20A0FF')
      this.test.success++
      this.$store.commit('setPercent', this.test.percent)
    } else {
      this.$Progress.setColor('#FF4949')
      this.test.fail++
      if (this.question instanceof Question) {
        this.test.errors.push(this.question)
      }
      this.$store.commit('setError', this.question)
    }
    this.next()
  }

  next() {
    try {
      this.question = this.test.questions.next()
    } catch (e) {
      if (e instanceof CollectionException) {
        this.dialogVisible = true
        if (this.test.percent > this.$store.getters.result) this.save()
        if (this.test.percent > 80) this.nextLevel()
      }
    }
  }

  save() {
    this.testService.saveResult(this.test)
  }

  nextLevel() {
    this.testService.getNextLevel(this.test)
  }
}
</script>

<style lang="scss">
.variants {
  p {
    text-align: center;
    padding: 16px 10px;
    margin: 0;
    &:hover {
      color: #20a0ff;
    }
  }
}
</style>
