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
import TextCard from '@/Scandinaver/Translate/UI/TextCardComponent.vue'
import { Getter } from '@/utils/getter.decorator'
import { TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/getters.type'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'

@Component({
  name: 'TextsComponent',
  components: {
    TextCard,
  },
})
export default class TextsComponent extends Vue {
  @Getter(TEXTS)
  public readonly texts: Translate[]
}
</script>
