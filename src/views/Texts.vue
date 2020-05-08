<template lang="pug">
  el-container
    el-main
      el-row(:gutter="20")
          TextCard(v-for="text in texts", :text="text", :key="text.id")
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import TextCard from '@/components/textpage/Textcard.vue'

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
