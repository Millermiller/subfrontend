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
              :type="buttontype"
              plain="plain"
              @click="gototext()"
              :disabled="!text.available"
            >
              {{ buttontext }}
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

@Component({
  name: 'TextCard',
})
export default class TextCard extends Vue {
  @Prop({ required: true })
  private text!: any

  get buttontype() {
    return !this.text.available
      ? 'info'
      : this.text.active
        ? 'primary'
        : 'warning'
  }

  get buttontext(): string {
    if (!this.text.available) {
      return this.$tc('notAvailable')
    }
    if (this.text.active) {
      return this.$tc('goTo')
    }
    return this.$tc('closed')
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
