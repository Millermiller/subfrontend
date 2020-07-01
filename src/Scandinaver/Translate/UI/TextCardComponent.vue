<template>
  <el-col id="textblock" :lg="6" :sm="12" :xs="24">
    <el-card
      :class="[
        'text',
        {
          open: text.active,
          'not-available': !text.available,
        },
      ]"
      :body-style="{ padding: '0px' }"
    >
      <div
        class="image"
        :style="{ 'background-image': 'url(' + text.image + ')' }"
      ></div>
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="24">
              <p class="text-title">{{ text.title }}</p>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-button
              :type="buttonType"
              plain="plain"
              @click="goToText"
              :disabled="!text.available"
            >
              {{ buttonText }}
            </el-button>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'

@Component({
  name: 'TextCardComponent',
})
export default class TextCardComponent extends Vue {
  @Prop({ required: true })
  private text!: Translate

  get currentLanguage(): string {
    return store.getters.language
  }

  get buttonType() {
    return !this.text.available
      ? 'info'
      : this.text.active
        ? 'primary'
        : 'warning'
  }

  get buttonText(): string {
    if (!this.text.available) {
      return this.$tc('notAvailable')
    }
    if (this.text.active) {
      return this.$tc('goTo')
    }
    return this.$tc('closed')
  }

  goToText() {
    if (this.text.active && this.text.available) {
      this.$router.push({
        name: 'TextItem',
        params: { language: this.currentLanguage, id: this.text.id.toString() },
      })
    }
  }
}
</script>
<style lang="scss">
.text {
  margin-bottom: 20px;
  position: relative;
  color: #d3dce6;
  .image {
    height: 220px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  img {
    width: 100%;
    display: block;
  }
}
.text.open {
  background: #fafafa;
  color: #333;
}
</style>
