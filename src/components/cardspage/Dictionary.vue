<template lang="pug">
  el-col#dictblock(:span="8" :xs="24")
    el-card.box-card#dictionary_block
      .clearfix(slot="header")
        el-row
          el-col(:span="7")
            span.h3 Поиск
          el-col(:span="11")
            el-checkbox(v-model="sentence") В предложениях
          el-col(:span="6")
            el-popover(placement="top-start",
              width="200",
              trigger="click",
              :disabled="isActive",
              popper-class="text-left",
              content="Создание карточек недоступно базовым аккаунтам")
              el-button(slot="reference" @click="openform") Добавить

      el-input(placeholder="слово для поиска.." :model="word")
        el-button.el-icon-search(slot="append", @click="search")

      p.text-muted(v-if="message") {{message}}
      section(data-scrollbar, style="height: 65vh", v-loading.body="loading")
        transition-group(name="cards", tag="div")
          translate(v-for="(card, index) in cards",
            :key="card.id",
            :card="card",
            :index="index")

    el-dialog(title="Новая карточка", :visible.sync="dialogFormVisible")

      el-form(:model="form")
        el-form-item
          el-input(:model="form.orig", placeholder="Оригинал")
        el-form-item
          el-input(:model="form.translate" placeholder="Перевод")
        el-form-item
          el-checkbox(:model="form.is_public") Виден для всех

      el-collapse
        el-collapse-item(title="Что это?", name="1")
          p.
            Вы можете добавить в наш словарь собственные карточки. При установленном <span
            class="danger">"виден для всех"</span> ваша карточка будет
            подписана вашим логином и видна всем пользователям.
            Оставьте эту опцию отключенной, если не уверены в правильности перевода, ваша карточка
            не соответствует тематике сайта или вы просто не хотите, чтобы вашу карточку
            видели другие пользователи.
            Для удаления/редактирования пользовательских карточек обратитесь к администрации сайта.

      span.dialog-footer(slot="footer")
        el-button(type="warning", @click="dialogFormVisible = false") Отмена
        el-button(type="success", @click="submit") Сохранить
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Translate from '@/components/cardspage/Translate.vue'
import cardAPI from '@/api/cardAPI'
import { ICard } from '@/models/Card'
import IDictionaryForm, { DictionaryForm } from '@/api/IDictionaryForm'


  @Component({
    components: {
      translate: Translate,
    },
  })
export default class Dictionary extends Vue {
    dialogFormVisible: boolean = false

    word: string = ''

    sentence: boolean = false

    loading: boolean = false

    cards: ICard[] = []

    message: boolean | string = false

    form: IDictionaryForm = new DictionaryForm()

    get isActive(): boolean {
      return this.$store.getters.isActive
    }

    livesearch() {
      if (this.word.length > 2) {
        this.search()
      }
    }

    search(): void {
      if (this.word !== '') {
        this.loading = true
        cardAPI.translate(this.word, this.sentence).then(
          (response): void => {
            this.loading = false
            if (!response.data.length) {
              this.message = 'Ничего не найдено'
              this.cards = []
            } else {
              this.message = false
              this.cards = response.data

              const word_ids: number[] = []

              this.$store.getters.cards.forEach((el: ICard, i: number, ar: ICard[]) => {
                word_ids.push(el.word!.id)
              })

              this.cards.forEach((el: ICard, index: number, array: ICard[]) => {
                if (word_ids.indexOf(el.id) >= 0) el.exist = true
              })
            }
          },
          (response) => {
            if (response.data.errors.word) {
              response.data.errors.word.forEach((item: string) => {
                this.message = item
              })
              this.loading = false
            }
          },
        )
      }
    }

    openform() {
      if (this.isActive) {
        this.dialogFormVisible = true
      }
    }

    submit() {
      this.form.is_public = this.form.is_public ? 1 : 0
      cardAPI.addWord(this.form).then(
        (response) => {
          if (response.status === 201) {
            this.cards = [response.data]
            this.dialogFormVisible = false
          }
        },
        (response) => {
          console.log(response)
        },
      )
    }

    beforeDestroy() {
      this.$eventHub.$off('addCardToAsset')
    }
}
</script>
