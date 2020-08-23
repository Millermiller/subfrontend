<template>
  <div class="list-item list-item-card el-row">
    <el-col :span="21">
      <p>{{ card.word.word }}</p>
    </el-col>
    <el-col :span="2">
      <el-button
        type="default"
        icon="el-icon-delete"
        size="mini"
        @click.stop="removeCard"
        plain="plain"
      ></el-button>
    </el-col>
    <el-col :span="24">
      <p class="no-margin card-value">{{ card.translate.value }}</p>
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
  name: 'CardComponent',
})
export default class CardComponent extends Vue {
  @Prop({ required: true })
  private card!: Card

  @Prop({ required: true })
  private index!: number

  removeCard() {
    const asset = this.$store.getters.activeAsset
    this.$eventHub.$emit(events.DELETE_CART_FROM_ASSET, {
      card: this.card,
      index: this.index,
      asset,
    })
  }
}
</script>
