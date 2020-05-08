<template lang="pug">
  el-col#assetsblock(:span="8", :xs="24")
    el-card.box-card

      .clearfix(slot="header")
        el-row(type="flex" justify="space-between")
          span.h3 {{$t('myAssets')}}
          el-popover(placement="top-start",
            width="200",
            trigger="click",
            :disabled="isActive",
            popper-class="text-left",
            content="Создание словарей недоступно базовым аккаунтам")
            el-button(slot="reference", @click="add") {{$t('create')}}

      section(data-scrollbar, style="height: 65vh;overflow: visible !important", v-loading.body="loading")
        transition-group(name="splash", tag="div")
          Asset(
            v-for="(asset, index) in assetws",
            :asset="asset",
            :index="index",
            :key="asset.id")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Scrollbar from 'smooth-scrollbar'
import assetAPI from '@/api/assetAPI'
import { IAsset } from '@/models/Asset'
import Asset from '@/components/cardspage/Asset.vue'

@Component({
  name: 'Assets',
  components: { Asset },
  mounted() {
    Scrollbar.initAll({
      alwaysShowTracks: true,
      // overscrollEffect: 'bounce'
    })
  },
})
export default class Assets extends Vue {
  loading: boolean = false

  get assetws() {
    return this.$store.getters.personal
  }

  get isActive() {
    return this.$store.getters.isActive
  }

  created() {
    this.$eventHub.$on('removeItem', this.remove)
  }

  add() {
    if (this.isActive) {
      this.$prompt('Название:', 'Новый словарь', {
        confirmButtonText: 'Создать',
        cancelButtonText: 'Назад',
        inputPattern: /^.+$/,
        inputErrorMessage: 'Введите название',
      })
        .then((input: any) => {
          this.loading = true
          this.$store.dispatch('addPersonalAsset', input.value).then(
            (response) => {
              this.$notify.success({
                title: 'Словарь создан',
                message: input.value,
                duration: 4000,
              })
              this.loading = false
            },
            (error) => {
              this.$notify.error({
                title: 'Ошибка',
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

  remove(asset: IAsset) {
    this.loading = true
    assetAPI.destroyAsset(asset).then(
      (response) => {
        if (response.status === 204) {
          this.$notify.success({
            title: 'Словарь удален',
            message: asset.title,
            duration: 4000,
          })
        }
        this.$store.dispatch('reloadPersonal').then(
          (response) => {
            this.loading = false
          },
          (error) => {},
        )
      },
      (response) => {
        console.log(response.data)
      },
    )
  }

  beforeDestroy() {
    this.$eventHub.$off('removeItem')
  }
}
</script>
