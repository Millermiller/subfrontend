<template lang="pug">
  el-row(:class="['list-item', 'pointer', {'open': item.active,'tested': item.canopen,'not-available': !item.available,'selected': item.selected,}]")
    el-col(:span="24")
      p.asset-title {{item.title}}
      p.asset-description {{item.description}}

    el-row
      el-col(:span="6")
        span.small.text-muted.
          уровень: {{item.level}}

      el-col(:span="9")
        span.small.text-muted
          i.ion.ion-speedometer.ion-small
        span(:class="[ 'small', { success: item.result > 80, warning: (item.result > 50 && item.result < 80), danger: item.result < 50 } ]").
          {{item.result}}%

        span.small.text-muted(style="padding-left: 15px")
          i.ion.ion-ios-browsers-outline.ion-small
          span {{item.count}}

      el-col(:span="9")
        template(v-if="item.active")
          span(:class="['text-primary', 'pointer', 'small']" @click="loadTest()")
            i.ion.ion-ios-redo.ion-small
              span учить

          span.text-primary.small |
          span.text-primary.pointer.small(@click="test()")
            i.ion.ion-ios-checkmark-outline.ion-small
            span тест

        template(v-else)
          span.small.text-muted закрыто

    i.ion-locked(@click="showModal", v-if="!item.available")
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

    loadTest() {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit('closeMenu')
      }

      this.$router.push(`/learn/${this.item.id}`)
    }

    test() {
      if (window.innerWidth <= 910) {
        this.$eventHub.$emit('closeMenu')
      }
      //  this.$store.commit('setSelection', {asset: this.item, index: this.index})
      this.$router.push(`/test/${this.item.id}`)
    }

    showModal() {
      this.$eventHub.$emit('modal')
    }
}
</script>
