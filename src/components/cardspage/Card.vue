<template lang="pug">
  .list-item.list-item-card.el-row
    el-col(:span="21")
      p {{card.word.word}}
    el-col(:span="2")
      el-button(
        type="default",
        icon="el-icon-delete",
        size="mini",
        @click.stop="removeCard",
        plain)

    el-col(:span="24")
      p.no-margin.card-value {{card.translate.value}}

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
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ICard } from '@/models/Card'

@Component({
  name: 'Card',
})
export default class extends Vue {
  @Prop({ required: true })
  private card!: ICard

  @Prop({ required: true })
  private index!: number

  removeCard() {
    this.$eventHub.$emit('deleteCardFromAsset', { card: this.card, index: this.index })
  }
}
</script>
