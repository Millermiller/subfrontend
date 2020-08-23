<template>
  <el-col id="dictblock" :span="8" :xs="24">
    <el-card class="box-card" id="dictionary_block">
      <div class="clearfix" slot="header">
        <el-row>
          <el-col :span="7">
            <span class="h3">
              {{ $t('search') }}
            </span>
          </el-col>
          <el-col :span="11">
            <el-checkbox v-model="sentence">
              {{ $t('inSentences') }}
            </el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              :disabled="isActive"
              popper-class="text-left"
              :content="$t('createCardNotAvailable')"
            >
              <el-button slot="reference" @click="openform">
                {{ $t('add') }}
              </el-button>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <el-input placeholder="слово для поиска.." v-model="word">
        <el-button
          class="el-icon-search"
          slot="append"
          @click="search"
        ></el-button>
      </el-input>
      <p class="text-muted" v-if="message">{{ message }}</p>
      <section
        data-scrollbar="data-scrollbar"
        style="height: 65vh"
        v-loading.body="loading"
      >
        <transition-group name="cards" tag="div">
          <translate
            v-for="(card, index) in cards"
            :key="index"
            :card="card"
            :index="index"
          ></translate>
        </transition-group>
      </section>
    </el-card>
    <el-dialog :title="$t('newCard')" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.orig" placeholder="Оригинал"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.translate" placeholder="Перевод"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :model="form.is_public">
            {{ $t('visibleForAll') }}</el-checkbox
          >
        </el-form-item>
      </el-form>
      <el-collapse>
        <el-collapse-item title="Что это?" name="1">
          <p v-html="$t('visibleDescription')"></p>
        </el-collapse-item>
      </el-collapse>
      <span class="dialog-footer" slot="footer">
        <el-button type="warning" @click="dialogFormVisible = false">
          {{ $t('cancel') }}
        </el-button>
        <el-button type="success" @click="submit">
          {{ $t('save') }}
        </el-button>
      </span>
    </el-dialog>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Translate from '@/Scandinaver/Asset/UI/PersonalPage/TranslateComponent.vue'
import { Card } from '@/Scandinaver/Asset/Domain/Card'
import IDictionaryForm, {
  DictionaryForm,
} from '@/Scandinaver/Core/Domain/Contract/IDictionaryForm'
import { Inject } from 'vue-typedi'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import * as events from '@/events/events.type'

@Component({
  components: {
    translate: Translate,
  },
})
export default class Dictionary extends Vue {
  @Inject()
  private service: CardService

  dialogFormVisible: boolean = false
  word: string = ''
  sentence: boolean = false
  loading: boolean = false
  cards: Card[] = []
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
      this.service.translate(this.word, this.sentence).then(
        (response): void => {
          this.loading = false
          if (!response.length) {
            this.message = this.$tc('noResult')
            this.cards = []
          } else {
            this.message = false
            this.cards = response

            const word_ids: number[] = []

            this.$store.getters.cards.forEach(
              (el: Card, i: number, ar: Card[]) => {
                word_ids.push(el.word!.id)
              },
            )

            this.cards.forEach((el: Card, index: number, array: Card[]) => {
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

  async submit() {
    this.form.is_public = this.form.is_public ? 1 : 0
    const card = await this.service.createCard(this.form)
    this.cards = [card]
    this.dialogFormVisible = false
  }

  beforeDestroy() {
    this.$eventHub.$off(events.ADD_CART_TO_ASSET)
  }
}
</script>

<style lang="scss" scoped>
.el-collapse {
  p {
    word-break: break-word;
  }
}
</style>
