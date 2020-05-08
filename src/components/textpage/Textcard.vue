<template lang="pug">
  el-col#textblock(:lg="6", :sm="12", :xs="24")
    el-card(
      :class="['text', {'open': text.active, 'not-available': !text.available}]",
      :body-style="{ padding: '0px' }")
      .image(:style="{ 'background-image': 'url(' + text.image + ')' }")
      el-container
        el-main

          el-row
            el-col(:span="24")
              p.text-title {{text.title}}

          el-row(type="flex", justify="end")
            el-button(
              :type="buttontype",
              plain,
              @click="gototext()",
              :disabled="!text.available") {{ buttontext }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'TextCard',
})
export default class TextCard extends Vue {
  @Prop({ required: true })
  private text!: any

  get buttontype() {
    return !this.text.available ? 'info' : this.text.active ? 'primary' : 'warning'
  }

  get buttontext() {
    return !this.text.available
      ? 'Недоступно базовым аккаунтам'
      : this.text.active
      ? 'Перейти'
      : 'Закрыто'
  }

  gototext() {
    if (this.text.active && this.text.available) this.$router.push(`/translates/${this.text.id}`)
  }
}
</script>
<style>
.text {
  margin-bottom: 20px;
  position: relative;
  color: #d3dce6;
}
.text .image {
  height: 220px;
  background-size: cover;
  background-repeat: no-repeat;
}
.text.open {
  background: #fafafa;
  color: #333;
}
.text img {
  width: 100%;
  display: block;
}
</style>
