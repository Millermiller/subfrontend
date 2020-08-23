<template>
  <el-row
    :class="['list-item', 'pointer', 'open', { selected: item.selected }]"
    @click.native="load()"
  >
    <el-col :span="24">
      <p class="asset-title" style="height: 57px">{{ item.title }}</p>
    </el-col>
    <el-row>
      <el-col :span="9" :md="8">
        <span class="small text-muted">
          <i class="ion ion-speedometer ion-small"></i>
        </span>
        <span
          :class="['small', {
            success: item.result &gt; 80,
            warning: (item.result &gt; 50 &amp;&amp; item.result &lt; 80),
            danger: item.result &lt; 50}]"
          >{{ item.result }}% </span>
        <span class="small text-muted" style="padding-left: 15px">
          <i class="ion ion-ios-browsers-outline ion-small"></i>
          <span>{{ item.count }}</span>
        </span>
      </el-col>
      <el-col class="text-right" :span="15" :md="16">
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-document-checked"
          @click.stop="cardspage()"
          >{{ $t('edit') }}<i class="el-icon-arrow-righ el-icon-right"></i>
        </el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-data-analysis"
          style="margin-left: 5px;"
          @click.stop="learn()"
          >{{ $t('learn') }}<i class="el-icon-arrow-righ el-icon-right"></i>
        </el-button>
      </el-col>
    </el-row>
  </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { IPersonal } from '@/Scandinaver/Asset/Domain/Personal'
import { SET_ASSET_AS_SELECTED } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import {
  SET_ACTIVE_PERSONAL_ASSET_EDIT,
  SET_SELECTION,
} from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'
import * as events from '@/events/events.type'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Word } from '@/Scandinaver/Asset/Domain/Word'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

@Component({
  name: 'TabItemPersonal',
})
export default class TabItemPersonal extends Vue {
  @Prop({ required: true })
  private item!: any

  @Prop({ required: true })
  private type!: any

  @Prop({ required: true })
  private index!: any

  words: Word[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  get isActive() {
    return this.$store.getters.isActive || this.item.type === AssetType.PERSONAL
  }

  cardspage() {
    if (this.isActive) {
      this.$store.dispatch(SET_ASSET_AS_SELECTED, this.item.id)
      this.$store.commit(SET_ACTIVE_PERSONAL_ASSET_EDIT, true)
      this.$router.push({
        name: 'CardsPage',
        params: { language: this.currentLanguage, id: this.item.id },
      })
    }
  }

  get currentLanguage(): string {
    return store.getters.language
  }

  load() {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$store.commit(SET_SELECTION, this.item)
    this.$router.push({
      name: 'Test',
      params: { language: this.currentLanguage, id: this.item.id },
    })
  }

  learn() {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$store.commit(SET_SELECTION, this.item)
    this.$router.push({
      name: 'learnAsset',
      params: { language: this.currentLanguage, id: this.item.id },
    })
  }
}
</script>
