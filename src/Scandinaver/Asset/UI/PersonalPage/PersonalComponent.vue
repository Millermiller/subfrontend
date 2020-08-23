<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <Assets></Assets>
        <Cards :cards="asset.cards"
               :name="asset.title"
               :loading="loading"></Cards>
        <Dictionary></Dictionary>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Assets from '@/Scandinaver/Asset/UI/PersonalPage/Assets.vue'
import Dictionary from '@/Scandinaver/Asset/UI/PersonalPage/Dictionary.vue'
import Cards from '@/Scandinaver/Asset/UI/PersonalPage/Cards.vue'
import { ON_CARDS_PAGE_CLOSE, ON_CARDS_PAGE_OPEN } from '@/Scandinaver/Asset/Infrastructure/store/asset/actions.type'
import { Inject } from 'vue-typedi'
import AssetService from '@/Scandinaver/Asset/Application/asset.service'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import * as events from '@/events/events.type'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Watch } from 'vue-property-decorator'

@Component({
  name: 'PersonalComponent',
  components: {
    Assets,
    Cards,
    Dictionary,
  },
})
export default class PersonalComponent extends Vue {
  @Inject()
  private assetService: AssetService

  @Inject()
  private cardService: CardService

  @Watch('$route')
  private onRouteChange(route: any) {
    if (parseInt(this.$route.params.id, 10) > 0) {
      this.load(parseInt(this.$route.params.id, 10))
    } else {
      this.load(this.$store.getters.activeAsset)
    }
  }

  asset: Asset = new Asset()
  loading: boolean = false

  created() {
    this.$eventHub.$on(events.SELECT_ASSET, this.load)
    this.$eventHub.$on(events.ADD_CART_TO_ASSET, this.add)
    this.$eventHub.$on(events.DELETE_CART_FROM_ASSET, this.removeCard)

    if (parseInt(this.$route.params.id, 10) > 0) {
      this.load(parseInt(this.$route.params.id, 10))
    } else {
      this.$store.dispatch(ON_CARDS_PAGE_OPEN)
      this.load(this.$store.getters.activeAsset)
    }
  }

  async load(id: number) {
    this.loading = true
    this.asset = await this.assetService.getAsset(id)
    this.loading = false
  }

  async add(card: Card) {
    this.loading = true

    const asset = this.$store.getters.activeAsset
    card.asset = asset

    await this.cardService.addCardToAsset(card)
    this.loading = false
    await this.load(asset.getId())
    this.$notify.success({
      title: this.$tc('cardAdded'),
      message: card.word.getValue(),
      duration: 4000,
    })
  }

  async removeCard(data: any) {
    this.loading = true
    const asset = this.$store.getters.activeAsset
    await this.cardService.removeFromAsset(data.card, data.asset)
    await this.load(asset.getId())
    this.$notify.success({
      title: this.$tc('cardRemoved'),
      message: data.card.word!.getValue(),
      duration: 4000,
    })
  }

  beforeDestroy() {
    this.$store.dispatch(ON_CARDS_PAGE_CLOSE)
    this.$eventHub.$off(events.SELECT_ASSET)
    this.$eventHub.$off(events.DELETE_CART_FROM_ASSET)
    this.$eventHub.$off(events.ADD_CART_TO_ASSET)
    this.$eventHub.$off(events.DELETE_CART_FROM_ASSET)
  }
}
</script>
