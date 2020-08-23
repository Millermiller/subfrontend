<template>
  <el-col id="cardsblock" :span="8" :xs="24" v-loading.body="loading">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span class="h3" style="line-height: 38px">
          {{ $t('cardsOfAssets') }}
        </span>
        <el-tag v-if="name" type="info">{{ name }}</el-tag>
      </div>
      <section
        data-scrollbar="data-scrollbar"
        style="height: 65vh"
        v-loading.body="loadingbody"
      >
        <transition-group name="cards" tag="div">
          <card
            v-for="(card, index) in cards"
            :card="card"
            :index="index"
            :key="card.id"
          ></card>
        </transition-group>
      </section>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import CardComponent from '@/Scandinaver/Asset/UI/PersonalPage/Card.vue'

@Component({
  name: 'CardsComponent',
  components: {
    card: CardComponent,
  },
})
export default class CardsComponent extends Vue {
  @Prop()
  private name: string

  @Prop()
  private cards: any

  @Prop({ required: true })
  private loading: boolean

  private loadingbody: boolean = false
}
</script>
