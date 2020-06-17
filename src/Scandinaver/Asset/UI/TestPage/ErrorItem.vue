<template>
  <transition name="splash">
    <el-row class="errorcard">
      <el-col :span="20">
        <el-row type="flex" align="middle">
          <h4 class="no-margin">{{ item.word.word }}</h4>
        </el-row>
        <el-row class="error-translate" type="flex" align="bottom">
          <p>{{ item.translate.value }}</p>
        </el-row>
      </el-col>
      <el-col :span="4">
        <i class="ion ion-ios-close-empty pointer" @click="remove(index)"></i>
        <i
          :class="[
            'favourite-button pointer',
            favouriteButtonClass,
            { 'rotated muted': loading },
          ]"
          @click="favourite"
        >
        </i>
      </el-col>
    </el-row>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-typedi'
import CardService from '@/Scandinaver/Asset/Application/card.service'
import * as events from '@/events/events.type'

@Component({
  name: 'ErrorItem',
})
export default class ErrorItem extends Vue {
  @Prop({ required: true })
  public item: any

  @Prop({ required: true })
  public index!: any

  @Inject()
  private service: CardService

  activeClass: string = 'ion-ios-star'
  defaultClass: string = 'ion-ios-star-outline'
  loading: boolean = false

  get favouriteButtonClass(): string {
    return this.item.favourite ? this.activeClass : this.defaultClass
  }

  remove(id: number) {
    this.$eventHub.$emit(events.REMOVE_ERROR_ITEM, id)
  }

  async favourite() {
    if (!this.loading) {
      this.loading = true
      if (!this.item.favourite) {
        this.item = await this.service.addToFavourite(this.item)
        this.$notify.success({
          title: this.item.word.word,
          message: this.$tc('addToFavourite'),
          duration: 2000,
        })
      } else {
        this.item = await this.service.removeFromFavourite(this.item)
        this.$notify.success({
          title: this.item.word!.word,
          message: this.$tc('removedFromFavourite'),
          duration: 2000,
        })
        this.loading = false
      }
    }
  }
}
</script>
<style>
.errorcard {
  background-color: #fff;
  margin-right: 10px;
  transition: all 1s;
  height: 112px;
  border: 1px solid #ddd;
  padding: 10px;
  width: auto;
  margin-bottom: 10px;
}
.errorcard > .el-col {
  height: 100%;
}
.errorcard .ion-ios-star-outline,
.errorcard .ion-ios-star {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.error-translate {
  position: absolute;
  bottom: 0;
}
</style>
