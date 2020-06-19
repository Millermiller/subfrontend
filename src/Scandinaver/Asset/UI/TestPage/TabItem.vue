<template>
  <el-row
    :class="[
      'list-item',
      'pointer',
      {
        open: item.active,
        tested: item.canopen,
        'not-available': !item.available,
        selected: item.selected,
      },
    ]"
    @click.native="load()"
  >
    <el-col :span="24">
      <p class="asset-title">{{ item.title }}</p>
      <p class="asset-description">{{ item.description }}</p>
    </el-col>
    <el-row>
      <el-col :span="6">
        <span class="small text-muted">
          {{ $t('level', { level: item.level }) }}
        </span>
      </el-col>
      <el-col :span="9">
        <span class="text-muted small">
          <i class="el-icon-odometer tab-icon"></i>
        </span>
        <span
          :class="['small', {
            success: item.result &gt; 80,
            warning: (item.result &gt; 50 &amp;&amp; item.result &lt; 80),
            danger: item.result &lt; 50}]"
          >{{ item.result }}%
        </span>
        <span class="text-muted small" style="padding-left: 15px">
          <i class="el-icon-document-copy tab-icon"></i>
        </span>
        <span>{{ item.count }}</span>
      </el-col>
      <el-col class="text-right" :span="9">
        <template v-if="item.active">
          <el-button type="primary" size="mini" icon="el-icon-data-analysis" @click.stop="learn()">
            {{ $t('learn') }}
            <i class="el-icon-arrow-righ el-icon-right"></i>
          </el-button>
        </template>
        <template v-else>
          <span class="small text-muted">{{ $t('closed') }}</span>
        </template>
      </el-col>
      <i class="el-icon-lock" @click="showModal" v-if="!item.available"></i>
    </el-row>
  </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import IWord from '@/Scandinaver/Asset/Domain/Word'
import ISentence from '@/Scandinaver/Asset/Domain/Sentence'
import { IPersonal } from '@/Scandinaver/Asset/Domain/Personal'
import * as events from '@/events/events.type'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { SET_SELECTION } from '@/Scandinaver/Asset/Infrastructure/store/asset/mutations.type'

@Component({
  name: 'TabItem',
})
export default class TabItem extends Vue {
  @Prop({ required: true })
  private item!: any

  @Prop({ required: true })
  private type!: any

  @Prop({ required: true })
  private index!: any

  words: IWord[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  get currentLanguage(): string {
    return store.getters.language
  }

  learn() {
    if (this.item.active) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit(events.CLOSE_MENU)
      }
      this.$router.push({
        name: 'learnAsset',
        params: { language: this.currentLanguage, id: this.item.id },
      })
    }
  }

  load() {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit(events.CLOSE_MENU)
    }
    this.$store.commit(SET_SELECTION, this.item.id)
    this.$router.push({
      name: 'Test',
      params: { language: this.currentLanguage, id: this.item.id },
    })
  }

  showModal() {
    this.$eventHub.$emit(events.OPEN_PAID_MODAL)
  }
}
</script>
