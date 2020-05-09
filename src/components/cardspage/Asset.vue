<template lang="pug">
  el-row(
    @click.native="loadAsset",
    v-loading.body="loading",
    :class="['list-item', 'pointer', 'open', {'selected': asset.selected,'muted': (!isActive && asset.title !== $t('favourite'))}]")

    el-row
      el-col(:span="22", style="height: 57px")
        span.asset-title.h4(v-if="edited === false", style="height: 57px;display:inline-block") {{assetName}}

        el-input(
          v-if="edited === true",
          size="small",
          :placeholder="$t('assetName')",
          v-model="assetName",
          @click.native="showResponder($event)")

          el-button(
            slot="append",
            type="danger",
            icon="el-icon-close",
            size="mini",
            @click.stop="closeedit",
            plain)

          el-button(
            slot="append",
            type="success",
            icon="el-icon-check",
            size="mini",
            @click.stop="applyedit"
            plain)

        el-button(
          v-if="asset.title !== $t('favourite') && edited === false",
          type="default",
          icon="el-icon-edit",
          size="mini",
          @click.stop="openedit",
          :disabled="!isActive",
          plain)

      el-col(:span="2")
        el-button(
          v-if="asset.title !== $t('favourite')",
          type="default",
          icon="el-icon-delete",
          size="mini",
          @click.stop="confirm(asset)",
          :disabled="!isActive",
          plain)

      el-col(:span="9")
        span.text-muted.small
          i.ion.ion-speedometer.ion-small
        span(:class="['small', {'success': asset.result > 80, 'warning': (asset.result > 50 && asset.result < 80), 'danger': asset.result < 50}]").
          {{asset.result}}%
        span.text-muted.small(style="padding-left: 15px")
          i.ion.ion-ios-browsers-outline.ion-small.
            {{asset.count}}

      el-col(:span="9")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { IAsset } from '@/models/Asset'
import assetAPI from '@/api/assetAPI'

@Component({
  name: 'Asset',
})
export default class Asset extends Vue {
  @Prop({ required: true })
  public asset!: any

  @Prop({ required: true })
  private index!: number

  edited: boolean = false
  assetName: string = ''
  loading: boolean = false

  get isActive() {
    return this.$store.getters.isActive
  }

  created() {
    this.assetName = this.asset.title
  }

  showResponder = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  confirm(asset: any) {
    if (this.isActive) {
      this.$confirm('Удалить словарь?', asset.title, {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning',
      })
        .then(() => {
          this.$eventHub.$emit('removeItem', this.asset)
        })
        .catch(() => {
          //
        })
    }
  }

  loadAsset(): void {
    if (this.isActive) {
      this.$eventHub.$emit('assetSelect', this.asset.id)
      this.$router.push(`/cards/${this.asset.id}`)
      this.$store.commit('showDictionary')
      this.$store.commit('setSelection', this.asset.id)
    }
  }

  openedit() {
    this.edited = true
  }

  closeedit() {
    this.edited = false
  }

  applyedit() {
    this.loading = true
    assetAPI.updateAsset(this.asset, this.assetName).then(
      (response) => {
        if (response.status === 200) {
          this.$store.commit('patchPersonal', { asset: response.data, index: this.index })
          if (this.asset.selected) {
            this.$store.commit('setActivePersonalassetName', this.assetName)
          }
          this.edited = false
          this.loading = false
        }
      },
      (response) => {
        console.log(response)
      },
    )
  }
}
</script>
