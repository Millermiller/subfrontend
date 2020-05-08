<template lang="pug">
  el-row(:class="['list-item', 'pointer', {'open': item.active,'tested': item.canopen,'not-available': !item.available,'selected': item.selected,}]", @click.native="load()")
    el-col(:span="24")
      p.asset-title {{item.title}}
      p.asset-description {{item.description}}

    el-row
      el-col(:span="6")
        span.small.text-muted {{$t('level', {level: item.level})}}

      el-col(:span="9")
        span.text-muted.small
          i.el-icon-odometer.tab-icon
        span(:class="['small', {success: item.result > 80, warning: (item.result > 50 && item.result < 80), danger: item.result < 50}]").
          {{item.result}}%

        span.text-muted.small(style="padding-left: 15px")
          i.el-icon-document-copy.tab-icon
        span {{item.count}}

      el-col.text-right(:span="9")
        template(v-if="item.active")
          el-button(
              type="danger",
              size="mini",
              icon="el-icon-document-checked",
              @click.stop="test()") {{$t('test')}}

        template(v-else)
          span.small.text-muted {{$t('closed')}}

    i.el-icon-lock(@click="showModal" v-if="!item.available")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import IWord from '@/models/Word'
import ISentence from '@/models/Sentence'
import { IPersonal } from '@/models/Personal'

@Component({
  name: 'TabItem',
})
export default class extends Vue {
  @Prop({ required: true })
  private item!: any

  @Prop({ required: true })
  private type!: any

  @Prop({ required: true })
  private index!: number

  words: IWord[] = []
  sentences: ISentence[] = []
  personal: IPersonal[] = []

  load() {
    if (this.item.active) {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit('closeMenu')
      }
      this.$router.push(`/learn/${this.item.id}`)
    }
  }

  test() {
    if (window.innerWidth <= 910) {
      this.$eventHub.$emit('closeMenu')
    }
    //  this.$store.commit('setSelection', {asset: this.item, index: this.index})
    this.$router.push(`/test/${this.item.id}`)
  }

  showModal() {
    this.$eventHub.$emit('paidModal')
  }
}
</script>
