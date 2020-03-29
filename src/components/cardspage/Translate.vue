<template lang="pug">
  .list-item.list-item-card.el-row
    el-col(:span="20")
      p(:class="['asset_title', {'text-success' : card.exist}]") {{card.word.word}}
    el-col(:span="4")
      i.ion.el-icon-circle-plus-outline.pointer(@click="add")
    el-col(:span="24")
      p(:class="['no-margin', 'card-value', {'text-success' : card.exist}]") {{card.value}}
    el-col(:span="24", v-if="card.word.creator")
      el-popover(placement="top-start", width="250", trigger="hover")
        el-row
          el-col(:span="6")
            .avatar-wrapper-small.pull-left
              .avatar
                img.avatar-small(:src="card.word.user.avatar")
          el-col(:span="18")
            p.text-danger {{card.word.user.login}}
            p Создано карточек: {{card.word.user.cardsCreated}}
        span.no-margin.danger.pull-right.small(slot="reference").
          Добавлено: {{card.word.user.login}}

      template(v-if="user.id === card.word.user.id")
        el-tooltip.text-muted(v-if="card.word.is_public", effect="light", placement="top-start")
          div(slot="content") Эта карточка видна всем пользователям
          i.ion-ios-people.ion-small
        el-tooltip.text-muted(v-else effect="light" placement="top-start")
          div(slot="content") Эта карточка видна только вам
          i.ion-ios-person.ion-small
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ICard } from '@/models/Card'

  @Component({
    name: 'Translate',
  })
export default class extends Vue {
    @Prop({ required: true })
    private card!: ICard

    @Prop({ required: true })
    private index!: number

    add() {
      const data = {
        word: this.card.word,
        translate_id: this.card.id,
        asset_id: this.$store.getters.activeAsset,
        index: this.index,
      }
      this.$eventHub.$emit('addCardToAsset', data)
    }

    get user() {
      return this.$store.getters.user
    }
}
</script>
<style>
  .card-value {
    border-top: 1px solid #ddd;
    padding-top: 5px;
  }
</style>
