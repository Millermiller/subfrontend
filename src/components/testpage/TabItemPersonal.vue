<template lang="pug">
  el-row(:class="['list-item', 'pointer', 'open', {'selected': item.selected}]")

    el-col(:span="24")
      p.asset-title(style="height: 57px") {{item.title}}

    el-row
      el-col(:span="9", :md="8")
        span.small.text-muted
          i.ion.ion-speedometer.ion-small

        span( :class="['small', {success: item.result > 80,warning: (item.result > 50 && item.result < 80), danger: item.result < 50}]").
          {{item.result}}%

        span.small.text-muted(style="padding-left: 15px")
          i.ion.ion-ios-browsers-outline.ion-small
          span {{item.count}}

      el-col.text-right(:span="15" :md="16")
        template
          span(:class="[isActive ? 'text-primary' : 'text-muted', 'pointer', 'small']", @click="cardspage()")
            i.ion.ion-edit.ion-small изменить

          span.text-primary.small |
          span(:class="['text-primary', 'pointer', 'small', {'muted': item.count < 1}]", @click="loadTest()")
            i.ion.ion-ios-redo.ion-small
              span учить

          span.text-primary.small |
          span(:class="['text-primary', 'pointer', 'small', {'muted': item.count < 1}]", @click="test()")
            i.ion.ion-ios-checkmark-outline.ion-small
              span тест
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import IWord from '@/models/Word'
import ISentence from '@/models/Sentence'
import { IPersonal } from '@/models/Personal'

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

  words: IWord[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  get isActive() {
    return this.$store.getters.isActive || this.item.type === 3
  }

  cardspage() {
    if (this.isActive) {
      this.$store.dispatch('loadAsset', this.item.id)
      this.$store.commit('setActiveAssetEdit', true)
      this.$router.push(`/cards/${this.item.id}`)
    }
  }

  loadTest(): void {
    if (this.item.count > 1) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit('closeMenu')
      }

      this.$store.commit('setSelection', { asset: this.item, index: this.index })
      this.$router.push(`/learn/${this.item.id}`)
    }
  }

  test(): void {
    if (this.item.count > 1) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit('closeMenu')
      }
      //  this.$store.commit('setSelection', {asset: this.item, index: this.index})
      this.$router.push(`/test/${this.item.id}`)
    }
  }
}
</script>
