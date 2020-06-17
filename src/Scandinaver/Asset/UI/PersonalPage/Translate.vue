<template>
  <div class="list-item list-item-card el-row">
    <el-col :span="20">
      <p :class="['asset_title', { 'text-success': card.exist }]">
        {{ card.word.word }}
      </p>
    </el-col>
    <el-col :span="4">
      <i class="ion el-icon-circle-plus-outline pointer" @click="add"></i>
    </el-col>
    <el-col :span="24">
      <p :class="['no-margin', 'card-value', { 'text-success': card.exist }]">
        {{ card.value }}
      </p>
    </el-col>
    <el-col :span="24" v-if="card.word.creator">
      <el-popover placement="top-start" width="250" trigger="hover">
        <el-row>
          <el-col :span="6">
            <div class="avatar-wrapper-small pull-left">
              <div class="avatar">
                <img class="avatar-small" :src="card.word.user.avatar" />
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <p class="text-danger">{{ card.word.user.login }}</p>
            <p>Создано карточек: {{ card.word.user.cardsCreated }}</p>
          </el-col>
        </el-row>
        <span class="no-margin danger pull-right small" slot="reference">
          Добавлено: {{ card.word.user.login }}
        </span>
      </el-popover>
      <template v-if="user.id === card.word.user.id">
        <el-tooltip
          class="text-muted"
          v-if="card.word.is_public"
          effect="light"
          placement="top-start">
          <div slot="content">Эта карточка видна всем пользователям</div>
          <i class="ion-ios-people ion-small"></i>
        </el-tooltip>
        <el-tooltip
          class="text-muted"
          v-else
          effect="light"
          placement="top-start">
          <div slot="content">Эта карточка видна только вам</div>
          <i class="ion-ios-person ion-small"></i>
        </el-tooltip>
      </template>
    </el-col>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import * as events from '@/events/events.type'

@Component({
  name: 'Translate',
})
export default class extends Vue {
  @Prop({ required: true })
  private card!: Card

  @Prop({ required: true })
  private index!: number

  get user() {
    return this.$store.getters.user
  }

  add() {
    const data = {
      word: this.card.word,
      translate_id: this.card.id,
      asset_id: this.$store.getters.activeAsset,
      index: this.index,
    }
    this.$eventHub.$emit(events.ADD_CART_TO_ASSET, data)
  }
}
</script>
<style>
.card-value {
  border-top: 1px solid #ddd;
  padding-top: 5px;
}
</style>
