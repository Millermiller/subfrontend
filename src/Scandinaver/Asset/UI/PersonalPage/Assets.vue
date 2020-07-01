<template>
  <el-col id="assetsblock" :span="8" :xs="24">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <el-row type="flex" justify="space-between">
          <span class="h3">{{ $t('myAssets') }}</span>
          <el-popover
            placement="top-start"
            width="200"
            trigger="click"
            :disabled="isActive"
            popper-class="text-left"
            content="Создание словарей недоступно базовым аккаунтам"
          >
            <el-button slot="reference" @click="add">
              {{ $t('create') }}
            </el-button>
          </el-popover>
        </el-row>
      </div>
      <section
        data-scrollbar="data-scrollbar"
        style="height: 65vh;overflow: visible !important"
        v-loading.body="loading"
      >
        <transition-group name="splash" tag="div">
          <AssetComponent
            v-for="(asset, index) in assets"
            :asset="asset"
            :index="index"
            :key="asset.id"
          ></AssetComponent>
        </transition-group>
      </section>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import AssetComponent from '@/Scandinaver/Asset/UI/PersonalPage/Asset.vue'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { ADD_PERSONAL_ASSET } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import * as events from '@/events/events.type'

@Component({
  name: 'AssetsComponent',
  components: { AssetComponent },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      // overscrollEffect: 'bounce'
    })
  },
})
export default class AssetsComponent extends Vue {
  @Inject()
  private assetService: AssetService

  loading: boolean = false

  get assets() {
    return this.$store.getters.personal
  }

  get isActive() {
    return this.$store.getters.isActive
  }

  created() {
    this.$eventHub.$on(events.REMOVE_ASSET, this.remove)
  }

  add() {
    if (this.isActive) {
      this.$prompt(this.$tc('title'), this.$tc('newAsset'), {
        confirmButtonText: this.$tc('create'),
        cancelButtonText: this.$tc('back'),
        inputPattern: /^.+$/,
        inputErrorMessage: this.$tc('titleLabel'),
      })
        .then((input: any) => {
          this.loading = true
          this.$store.dispatch(ADD_PERSONAL_ASSET, input.value).then(
            (response) => {
              this.$notify.success({
                title: this.$tc('assetCreated'),
                message: input.value,
                duration: 4000,
              })
              this.loading = false
            },
            (error) => {
              this.$notify.error({
                title: this.$tc('error'),
                message: '',
                duration: 4000,
              })
            },
          )
        })
        .catch(() => {
          //
        })
    }
  }

  async remove(asset: any) {
    this.loading = true
    await this.assetService.destroyAsset(asset)
    this.loading = false
    this.$notify.success({
      title: this.$tc('assetRemoved'),
      message: asset.title,
      duration: 4000,
    })
  }

  beforeDestroy() {
    this.$eventHub.$off(events.REMOVE_ASSET)
  }
}
</script>
