<template lang="pug">
  transition(name="splash")
    el-row.errorcard

      el-col(:span="20")
        el-row(type="flex", align="middle")
          h4.no-margin {{item.word.word}}
        el-row.error-translate(type="flex" align="bottom")
          p {{item.translate.value}}

      el-col(:span="4")
        i.ion.ion-ios-close-empty.pointer(@click="remove(index)")
        i(:class="['ion pointer', item.favourite ? activeClass : defaultClass]" @click="favourite")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import cardAPI from '@/api/cardAPI'

  @Component({
    name: 'ErrorItem',
  })
export default class ErrorItem extends Vue {
    @Prop({ required: true })
    public item: any

    @Prop({ required: true })
    public index!: any

    activeClass: string = 'ion-ios-star'

    defaultClass: string = 'ion-ios-star-outline'

    remove(id: number) {
      this.$eventHub.$emit('removeErrorItem', id)
    }

    favourite() {
      const self = this
      if (!this.item.favourite) {
        cardAPI.addFavourite(this.item).then((response) => {
          if (response.status === 201) {
            self.item.favourite = true
            self.$notify.success({
              title: self.item.word.word,
              message: 'Добавлено в Избранное',
              duration: 2000,
            })
            this.$store.commit('addCardToFavorite')
          } else {
            console.log(response.data)
          }
        },
        (error) => {
          console.log(error)
        })
      } else {
        cardAPI.destroyFavourite(this.item).then((response) => {
          if (response.status === 204) {
            self.item.favourite = false
            self.$notify.success({
              title: self.item.word.word,
              message: 'Удалено из Избранного',
              duration: 2000,
            })
            this.$store.commit('removeCardFromFavorite')
          } else {
            console.log(response.data)
          }
        },
        (error) => {
          console.log(error)
        })
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
