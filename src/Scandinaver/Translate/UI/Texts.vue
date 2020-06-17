<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <TextCard v-for="text in texts" :text="text" :key="text.id"></TextCard>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import TextCard from '@/Scandinaver/Translate/UI/Textcard.vue'

@Component({
  name: 'TextPage',
  components: {
    TextCard,
  },
})
export default class extends Vue {
  metaInfo: any = { title: 'Переводы' }

  get texts() {
    return this.$store.getters.texts
  }
}
</script>
