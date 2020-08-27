<template>
  <el-row
    @click.native="loadAsset"
    v-loading.body="loading"
    :class="['list-item',
    'pointer',
    'open', {
      'selected': asset.selected,
      'muted': (!isActive &amp;&amp; asset.title !== $t('favourite'))
    }]"
  >
    <el-row>
      <el-col :span="22" style="height: 57px">
        <span
          class="asset-title h4"
          v-if="edited === false"
          style="height: 57px;display:inline-block"
        >
          {{ assetName }}
        </span>
        <el-input
          v-if="edited === true"
          size="small"
          :placeholder="$t('assetName')"
          v-model="assetName"
          @click.native="showResponder($event)"
        >
          <el-button
            slot="append"
            type="danger"
            icon="el-icon-close"
            size="mini"
            @click.stop="closeedit"
            plain="plain"
          ></el-button>
          <el-button
            slot="append"
            type="success"
            icon="el-icon-check"
            size="mini"
            @click.stop="applyedit"
            plain="plain"
          ></el-button>
        </el-input>
        <el-button
          v-if="asset.title !== $t('favourite') &amp;&amp; edited === false"
          type="default"
          icon="el-icon-edit"
          size="mini"
          @click.stop="openedit"
          :disabled="!isActive"
          plain="plain"
        ></el-button>
      </el-col>
      <el-col :span="2">
        <el-button
          v-if="asset.title !== $t('favourite')"
          type="default"
          icon="el-icon-delete"
          size="mini"
          @click.stop="confirm(asset)"
          :disabled="!isActive"
          plain="plain"
        >
        </el-button>
      </el-col>
      <el-col :span="9">
        <span class="text-muted small">
          <i class="ion ion-speedometer ion-small"></i>
        </span>
        <span
          :class="['small', {
            'success': asset.result &gt; 80,
            'warning': (asset.result &gt; 50 &amp;&amp; asset.result &lt; 80),
            'danger': asset.result &lt; 50
          }]"
        >
          {{ asset.result }}%
        </span>
        <span class="text-muted small" style="padding-left: 15px">
          <i class="ion ion-ios-browsers-outline ion-small">
            {{ asset.count }}
          </i>
        </span>
      </el-col>
      <el-col :span="9"></el-col>
    </el-row>
  </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { SET_SELECTION } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import * as events from '@/events/events.type'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

@Component({
  name: 'AssetComponent',
})
export default class AssetComponent extends Vue {
  @Prop({ required: true })
  public asset!: Asset

  @Prop({ required: true })
  private index!: number

  @Inject()
  private assetService: AssetService

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
      this.$confirm(this.$tc('removeAssetConfirm'), asset.title, {
        confirmButtonText: this.$tc('yes'),
        cancelButtonText: this.$tc('no'),
        type: 'warning',
      })
        .then(() => {
          this.$eventHub.$emit(events.REMOVE_ASSET, this.asset)
        })
        .catch(() => {
          //
        })
    }
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  loadAsset(): void {
    if (this.isActive && !this.asset.selected) {
      this.$router.push({
        name: 'CardsPage',
        params: { language: this.currentLanguage, id: this.asset.id.toString() },
      })
    }
  }

  openedit() {
    this.edited = true
  }

  closeedit() {
    this.edited = false
  }

  async applyedit() {
    this.loading = true
    await this.assetService.updateAsset(this.asset, this.assetName)
    this.edited = false
    this.loading = false
  }
}
</script>
